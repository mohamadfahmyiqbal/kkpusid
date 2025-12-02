// pages/global/TransactionDetailPage.jsx

import React, { useMemo, useCallback, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// 💡 Tambahkan FaMoneyBillWave untuk tombol redirect
import {
  FaArrowLeft,
  FaPrint,
  FaRegEnvelope,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import DashboardLayout from "../../components/layout/DashboardLayout";

// Import komponen ApprovalPlaceholder
import ApprovalPlaceholder from "../../components/ui/ApprovalPlaceholder";

// --- FUNGSI PEMBANTU (Sama) ---
const formatBalance = (amount) => {
  if (typeof amount !== "number") {
    amount = parseFloat(String(amount).replace(/[^0-9\.]/g, "")) || 0;
  }
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

const getPageDataFromToken = (token) => {
  if (!token)
    return { pageData: null, returnKey: "dashboardPage", actionType: "detail" };
  try {
    const [, payload] = token.split(".");
    const json = decodeURIComponent(
      escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    );
    const data = JSON.parse(json);

    return {
      pageData: data.data || null,
      returnKey: data.return || "dashboardPage",
      actionType: data.action || "detail",
    };
  } catch (err) {
    console.warn("Token tidak valid:", err);
    return { pageData: null, returnKey: "dashboardPage", actionType: "detail" };
  }
};

const APPROVAL_CHAIN = [{ role: "Pengawas" }, { role: "Ketua" }];

export default function TransactionDetailPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    pageData: initialPageData,
    returnKey,
    actionType,
  } = useMemo(() => getPageDataFromToken(token), [token]);
  const [pageData, setPageData] = useState(initialPageData);

  const handleBack = useCallback(() => {
    const nextToken = jwtEncode({ page: returnKey });
    navigate(`/${nextToken}`);
  }, [navigate, returnKey]);

  const handleCancel = useCallback(() => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin membatalkan pengajuan pencairan ini?"
      )
    ) {
      console.log(`Membatalkan transaksi ${pageData.invoiceNumber}`);

      setPageData((prev) => ({
        ...prev,
        status: "Dibatalkan",
        catatan: `Pengajuan dibatalkan oleh pengguna pada ${new Date().toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        )}.`,
      }));

      alert("Pengajuan telah dibatalkan.");
    }
  }, [pageData]);

  // 💡 Handler untuk Redirect ke Halaman Pembayaran/Setoran
  const handleRedirectToPayment = useCallback(() => {
    const payload = {
      // Redirect ke halaman billing/setoran
      page: "invoicePage",
      // Kunci kembali ke halaman detail transaksi ini
      return: returnKey,
    };
    const nextToken = jwtEncode(payload);
    navigate(`/${nextToken}`);
  }, [navigate, returnKey]);

  if (!pageData) {
    return (
      <DashboardLayout>
        <div className="text-center mt-5">Data transaksi tidak ditemukan.</div>
        <div className="text-center mt-3">
          <Button onClick={handleBack}>Kembali</Button>
        </div>
      </DashboardLayout>
    );
  }

  const { invoiceNumber, status, details, total, catatan, tanggalPengajuan } =
    pageData;

  const title =
    actionType === "withdrawalDetail"
      ? "Detail Pencairan Simpanan"
      : "Detail Transaksi";
  const isPending = status === "Menunggu Persetujuan";

  // Menentukan badge color
  let statusBg;
  if (isPending) {
    statusBg = "warning text-dark";
  } else if (status === "Dibatalkan") {
    statusBg = "danger";
  } else if (status === "Approved") {
    statusBg = "success";
  } else {
    statusBg = "secondary";
  }

  return (
    <DashboardLayout>
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBack}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            {title}
          </h3>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <FaCheckCircle className="me-2" /> Transaksi: {invoiceNumber}
              </h5>
              <span className={`badge bg-${statusBg} p-2`}>{status}</span>
            </Card.Header>

            <Card.Body>
              {/* Header Info */}
              <Row className="mb-4">
                <Col md={6}>
                  <small className="text-muted d-block">
                    Tanggal Pengajuan
                  </small>
                  <strong className="d-block text-dark">
                    {tanggalPengajuan}
                  </strong>
                </Col>
                <Col md={6} className="text-md-end mt-2 mt-md-0">
                  <small className="text-muted d-block">ID Transaksi</small>
                  <strong className="d-block text-dark">{invoiceNumber}</strong>
                </Col>
              </Row>

              {/* Detail Item */}
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead className="bg-light">
                    <tr className="text-dark">
                      <th>Keterangan</th>
                      <th className="text-end" style={{ width: "35%" }}>
                        Nominal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((item, index) => (
                      <tr key={index} className="text-dark">
                        <td>{item.description}</td>
                        <td className="text-end">
                          {formatBalance(item.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-info text-white fw-bold">
                      <td>Total Dana Diproses</td>
                      <td className="text-end">{formatBalance(total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Catatan Status Persetujuan */}
              <div className="mt-4 p-3 border rounded">
                <h6 className="fw-bold text-primary">Catatan Status</h6>
                <p className="mb-0 text-dark">{catatan}</p>
              </div>

              {/* BAGIAN APPROVAL CHAIN */}
              {isPending && (
                <div className="mt-4 p-3 border rounded bg-light">
                  <h6 className="fw-bold text-dark mb-3">
                    Langkah Persetujuan yang Diperlukan
                  </h6>
                  <Row className="text-center">
                    {APPROVAL_CHAIN.map((approval, index) => (
                      <Col xs={6} key={index}>
                        <ApprovalPlaceholder role={approval.role} />
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
              {/* AKHIR BAGIAN APPROVAL CHAIN */}
            </Card.Body>
            <Card.Footer className="text-center">
              {/* 💡 TOMBOL REDIRECT KE PEMBAYARAN/SETORAN */}
              <Button
                variant="warning"
                className="me-3 text-dark fw-bold"
                onClick={handleRedirectToPayment}
              >
                <FaMoneyBillWave className="me-2" /> Proses Pembayaran/Setoran
              </Button>

              {/* Tombol Batalkan hanya jika Pending */}
              {isPending && (
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={handleCancel}
                >
                  <FaTimesCircle className="me-2" /> Batalkan Pengajuan
                </Button>
              )}

              {/* Tombol Aksi Umum */}
              <Button variant="secondary" className="me-2">
                <FaPrint className="me-2" /> Cetak Detail
              </Button>
              <Button variant="info">
                <FaRegEnvelope className="me-2" /> Kirim Email
              </Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
