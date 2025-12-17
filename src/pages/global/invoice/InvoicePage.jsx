// 📁 pages/global/InvoicePage.jsx (KODE FINAL DAN LENGKAP - Tombol Kembali Menggunakan JWT)

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Card, Button, Spinner, Alert, Row, Col, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaCheckCircle,
  FaPrint,
  FaQuestionCircle,
} from "react-icons/fa";
import { jwtEncode } from "../../../routes/helpers";
import UBilling from "../../../utils/api/UBilling";

// --- HELPER FUNCTIONS ---
const getValueFromToken = (token, key) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const json = decodeURIComponent(
      escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    );
    const decodedPayload = JSON.parse(json);
    return decodedPayload?.[key] ?? null;
  } catch (err) {
    console.error("[getValueFromToken] Gagal decoding token:", err);
    return null;
  }
};

const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return "N/A";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDateWithTime = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const datePart = date.toLocaleDateString("id-ID", dateOptions);
  const timePart = date.toLocaleTimeString("id-ID", timeOptions);

  return `${datePart} Pukul ${timePart} WIB`;
};

// --- KOMPONEN UTAMA ---
export default function InvoicePage() {
  const navigate = useNavigate();
  const { token } = useParams();

  // 1. DECODING TOKEN (billId, returnPage)
  const { billId, returnPage } = useMemo(() => {
    const id = getValueFromToken(token, "billId");
    // Mengambil nilai 'return' dari token, default ke 'dashboard' jika tidak ada
    const page = getValueFromToken(token, "return") || "dashboard";
    return { billId: id, returnPage: page };
  }, [token]);

  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. FETCH DATA INVOICE
  const fetchBillDetail = useCallback(async () => {
    if (!billId) {
      setError("ID Tagihan tidak ditemukan atau tidak valid.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await UBilling.getInvoiceDetail(billId);

      if (response.status && response.data) {
        setBillData(response.data.data);
      } else {
        setError(response.message || "Gagal mengambil detail tagihan.");
      }
    } catch (err) {
      console.error("Fetch Bill Detail Error:", err);
      setError("Terjadi kesalahan koneksi saat mengambil data tagihan.");
    } finally {
      setLoading(false);
    }
  }, [billId]);

  useEffect(() => {
    fetchBillDetail();
  }, [fetchBillDetail]);

  // 3. LOGIKA PERHITUNGAN DAN STATUS
  const totalAmount = useMemo(() => {
    if (!billData || !billData.details) return 0;
    return billData.details.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
  }, [billData]);

  const billStatus = billData?.bill_status || "UNPAID";
  const isUnpaid = billStatus === "UNPAID";
  const isPending = billStatus === "PENDING";
  const isPaid = billStatus === "PAID" || billStatus === "SETTLED";

  let statusText = "Tidak Diketahui";
  if (isUnpaid) {
    statusText = "Belum Dibayar (UNPAID)";
  } else if (isPending) {
    statusText = "Menunggu Konfirmasi Pembayaran (PENDING)";
  } else if (isPaid) {
    statusText = "Sudah Dibayar (PAID/SETTLED)";
  }

  // ✅ 4. HANDLER TOMBOL KEMBALI DINAMIS (MENGGUNAKAN JWT ENCODE)
  const handleBack = useCallback(() => {
    // 🚨 Gunakan jwtEncode dengan payload hanya berisi halaman tujuan (`returnPage`)
    const backToken = jwtEncode({
      page: returnPage, // 'registrationPage' atau 'billingPage'
    });

    // Navigasi menggunakan format token: /token
    navigate(`/${backToken}`);
  }, [navigate, returnPage]);

  // 5. HANDLER PEMBAYARAN (INTEGRASI MIDTRANS)
  const handlePay = useCallback(async () => {
    if (!billId) return;

    setLoading(true);
    setError(null);
    try {
      const response = await UBilling.createMidtransTransaction({
        bill_id: billId,
        tx_category: "MEMBER_REGISTRATION",
      });
      const snapToken =
        response.data?.data?.snapToken || response.data?.snapToken;
      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function (result) {
            // ✅ MEMBERIKAN JEDA 3 DETIK SEBELUM REFRESH DATA
            // Agar backend memiliki waktu untuk memproses notifikasi Midtrans
            const successToken = jwtEncode({
              page: "invoicePage",
              billId: billId,
              return: returnPage,
              status: "success",
            });

            setTimeout(() => {
              navigate(`/${successToken}`);
              fetchBillDetail();
            }, 3000);
          },
          onPending: function (result) {
            const pendingToken = jwtEncode({
              page: "invoicePage",
              billId: billId,
              return: returnPage,
              status: "pending",
            });
            setTimeout(() => {
              navigate(`/${pendingToken}`);
              fetchBillDetail();
            }, 2000);
          },
          onError: function (result) {
            fetchBillDetail();
          },
          onClose: function () {
            fetchBillDetail();
          },
        });
      } else {
        setError("Gagal mendapatkan Snap Token.");
      }
    } catch (err) {
      console.error("Error Midtrans:", err);
      setError("Gagal memproses pembayaran.");
    } finally {
      setLoading(false);
    }
  }, [billId, fetchBillDetail, navigate, returnPage]);

  // 6. RENDER KONDISIONAL
  if (loading && !billData) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> <p>Memuat data tagihan...</p>
      </div>
    );
  }
  if (error || !billData) {
    return (
      <div className="container mt-5 text-center">
        <Alert variant="danger">
          {error || "Data tagihan tidak ditemukan."}
        </Alert>
        <Button onClick={() => navigate("/dashboard")}>
          Kembali ke Dashboard
        </Button>
      </div>
    );
  }

  const { member_no, full_name, due_date, details } = billData;

  const RenderStatusDisplay = () => {
    if (isPaid)
      return (
        <Alert variant="success" className="mb-3 text-center">
          <FaCheckCircle className="me-2" /> Tagihan Sudah Lunas
        </Alert>
      );
    if (isPending)
      return (
        <Alert variant="warning" className="mb-3 text-center">
          <Spinner animation="border" size="sm" className="me-2" /> Menunggu
          Pembayaran
        </Alert>
      );
    if (isUnpaid)
      return (
        <Alert variant="danger" className="mb-3 text-center">
          Pembayaran Belum Berhasil
        </Alert>
      );
    return null;
  };

  return (
    <div className="container-fluid">
      <Row className="justify-content-center">
        <Col lg={12} xl={12}>
          {/* ✅ TOMBOL KEMBALI DINAMIS (MENGGUNAKAN LOGIKA returnPage) */}
          <Button
            onClick={handleBack}
            variant="outline-secondary"
            className="mb-3"
          >
            <FaArrowLeft className="me-2" /> Kembali
            {returnPage === "registrationPage"
              ? " ke Ringkasan Pendaftaran"
              : " ke Halaman Utama"}
          </Button>

          <Card className="shadow-lg mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Tagihan Anggota (Kewajiban Awal)</h5>
            </Card.Header>
            <Card.Body>
              <RenderStatusDisplay />

              {/* Detail Anggota dan Tagihan */}
              <div className="p-3 border-bottom">
                <Row className="mb-3">
                  <Col md={6}>
                    <small className="d-block text-muted">Nomor Tagihan</small>
                    <strong className="d-block fs-5">#{billId}</strong>
                  </Col>
                  <Col md={6} className="text-md-end">
                    <small className="d-block text-muted">
                      Tanggal Jatuh Tempo
                    </small>
                    <strong className="d-block fs-5 text-danger">
                      {formatDateWithTime(due_date)}
                    </strong>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <small className="d-block text-muted">Nama Anggota</small>
                    <strong className="d-block fs-6">{full_name}</strong>
                  </Col>
                  <Col md={6} className="text-md-end">
                    <small className="d-block text-muted">Nomor Anggota</small>
                    <strong className="d-block fs-6">{member_no}</strong>
                  </Col>
                </Row>
              </div>

              {/* Detail Item Tagihan */}
              <div className="p-3">
                <h6 className="mt-0 mb-3 fw-bold">Rincian Tagihan</h6>
                <Table responsive striped bordered size="sm">
                  <thead>
                    <tr>
                      <th style={{ width: "5%" }}>#</th>
                      <th style={{ width: "65%" }}>Deskripsi</th>
                      <th style={{ width: "30%" }} className="text-end">
                        Jumlah
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details && details.length > 0 ? (
                      details.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.description}</td>
                          <td className="text-end">
                            {formatCurrency(item.amount)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          Tidak ada rincian tagihan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="2" className="text-end">
                        Total Pembayaran
                      </th>
                      <th className="text-end text-danger fs-5">
                        {formatCurrency(totalAmount)}
                      </th>
                    </tr>
                  </tfoot>
                </Table>
              </div>
            </Card.Body>
            <Card.Footer className="text-center">
              {/* Tombol Bayar Midtrans */}
              {(isUnpaid || isPending) && (
                <Button
                  onClick={handlePay}
                  variant="success"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Mempersiapkan Pembayaran
                    </>
                  ) : (
                    <>
                      <FaMoneyBillWave className="me-2" /> Bayar Sekarang
                      (Midtrans)
                    </>
                  )}
                </Button>
              )}

              {/* Tombol Jika Sudah Dibayar */}
              {isPaid && (
                <Button variant="outline-success" disabled>
                  <FaCheckCircle className="me-2" /> Sudah Dibayar
                </Button>
              )}

              {/* Tombol Cetak/Bantuan */}
              <Button variant="info" className="ms-2">
                <FaPrint className="me-2" /> Cetak Invoice
              </Button>
              <Button variant="secondary" className="ms-2">
                <FaQuestionCircle className="me-2" /> Bantuan
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
