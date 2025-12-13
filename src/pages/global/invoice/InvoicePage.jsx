// 📁 pages/global/InvoicePage.jsx (FINAL KOREKSI UNTUK SNAP CALLBACK)

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Card, Button, Spinner, Alert, Row, Col, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { jwtEncode } from "../../../routes/helpers";
import UBilling from "../../../utils/api/UBilling"; // Pastikan path ini benar

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

  const { billId, returnPage } = useMemo(() => {
    const id = getValueFromToken(token, "billId");
    const page = getValueFromToken(token, "return") || "registrationPage";
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
    // Menghitung Base Amount dari item detail
    return billData.details.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
  }, [billData]);

  // ... (Logika status mapping) ...
  const billStatus = billData?.bill_status || "UNPAID";
  const isUnpaid = billStatus === "UNPAID";
  const isPending = billStatus === "PENDING";
  const isPaid = billStatus === "PAID" || billStatus === "SETTLED";

  let statusVariant = "secondary";
  let statusText = "Tidak Diketahui";

  if (isUnpaid) {
    statusVariant = "danger";
    statusText = "Belum Dibayar (UNPAID)";
  } else if (isPending) {
    statusVariant = "warning";
    statusText = "Menunggu Konfirmasi Pembayaran (PENDING)";
  } else if (isPaid) {
    statusVariant = "success";
    statusText = "Sudah Dibayar (PAID/SETTLED)";
  }

  const handleBack = useCallback(() => {
    const encodedToken = jwtEncode({ page: returnPage });
    navigate(`/${encodedToken}`);
  }, [navigate, returnPage]);

  // 5. HANDLER PEMBAYARAN (INTEGRASI MIDTRANS)
  const handlePay = useCallback(async () => {
    if (!billId) return;

    setLoading(true);
    setError(null);
    const TRANSACTION_CATEGORY = "MEMBER_REGISTRATION";
    try {
      // 1. Panggil Endpoint Backend untuk mendapatkan Snap Token
      // 🛑 KOREKSI: Pastikan payload yang dikirim ke backend benar (misal: {bill_id: '123'})
      const response = await UBilling.createMidtransTransaction({
        bill_id: billId,
        tx_category: TRANSACTION_CATEGORY, // 🛑 KIRIM JENIS TRANSAKSI
      });
      const snapToken = response.data?.snapToken;

      // 2. Buka Pop-up Midtrans Snap
      if (snapToken && window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function (result) {
            /* Pembayaran Sukses (SETTLEMENT) */
            console.log("Payment success:", result);
            // 🛑 KOREKSI: Gunakan navigate untuk UX yang lebih baik
            navigate("/payment-status/success", {
              state: { transactionResult: result },
            });
            // TIDAK perlu fetchBillDetail, karena webhook akan mengurus status PAID.
          },
          onPending: function (result) {
            /* Pembayaran Pending (VA, QRIS) */
            console.log("Payment pending:", result);
            navigate("/payment-status/pending", {
              state: { transactionResult: result },
            });
            // 🛑 PENTING: Refresh untuk mengambil status PENDING yang sudah dicatat backend
            fetchBillDetail();
          },
          onError: function (result) {
            /* Gagal di Midtrans */
            console.log("Payment error:", result);
            navigate("/payment-status/error", {
              state: { transactionResult: result },
            });
            // 🛑 PENTING: Refresh untuk mengambil status UNPAID/apapun
            fetchBillDetail();
          },
          onClose: function () {
            /* User menutup pop-up */
            console.log("User closed the popup.");
            // 🛑 PENTING: Refresh untuk mengambil status PENDING (jika sudah buat VA/QRIS)
            fetchBillDetail();
          },
        });
      } else if (!snapToken) {
        setError(
          response.message || "Gagal mendapatkan Snap Token dari server."
        );
      } else {
        setError(
          "Midtrans Snap script belum dimuat. Pastikan Anda sudah mengimpornya di index.html."
        );
      }
    } catch (err) {
      console.error("Error creating Midtrans transaction:", err);
      const errMsg = err.response?.data?.message || "Gagal memproses Midtrans.";
      setError(errMsg);
    } finally {
      // Hentikan loading di frontend. Snap Pop-up akan mengambil alih.
      setLoading(false);
    }
  }, [billId, fetchBillDetail, navigate]);

  // 6. RENDER KONDISIONAL
  // ... (Logika Loading, Error, Not Found) ...

  // DESTRUCTURING DATA INVOICE
  const { member_no, full_name, due_date, details } = billData || {};

  return (
    <div className="container-fluid">
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      {/* ... (Header dan Breadcrumb) ... */}

      <Row>
        <Col lg={12}>
          <Card className="shadow-lg mb-4">
            {/* ... (Card Header dan Detail Anggota) ... */}
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Tagihan Anggota (Kewajiban Awal)</h5>
            </Card.Header>
            <Card.Body>
              {/* ... (Detail Anggota) ... */}
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
                  {/* ... (Table Head dan Body) ... */}
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
                        {/* 🛑 Tampilkan BASE AMOUNT (Rp700.000) */}
                        {formatCurrency(totalAmount)}
                      </th>
                    </tr>
                  </tfoot>
                </Table>
              </div>

              {/* Status dan Metode Pembayaran */}
              {/* ... (Status Display) ... */}
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
                      <Spinner animation="border" size="sm" className="me-2" />{" "}
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
                Cetak Invoice
              </Button>
              <Button variant="secondary" className="ms-2">
                Bantuan
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
