// pages/program/pinjaman/PinjamanReceiptPage.jsx
// Halaman Resi Pembayaran Pinjaman (mirip Invoice)

import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Table,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtEncode } from "../../../utils/helpers";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://localhost:3445/api";

// Helper format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

// Helper format date
const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export default function PinjamanReceiptPage({ decodedToken }) {
  const navigate = useNavigate();
  const [receiptData, setReceiptData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const financingId = decodedToken?.financingId;

  const fetchReceiptData = async (financingId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const baseUrl = API_BASE_URL.endsWith("/api")
        ? API_BASE_URL.slice(0, -4)
        : API_BASE_URL;

      // Gunakan endpoint detail yang sama (sudah berisi semua data)
      const response = await fetch(
        `${baseUrl}/api/financing/detail/${financingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data resi");
      }

      return result;
    } catch (error) {
      console.error("Error fetching receipt:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!financingId) {
          throw new Error("Financing ID tidak ditemukan.");
        }

        const result = await fetchReceiptData(financingId);

        // Validasi: hanya tampilkan jika semua approval selesai
        const isAllApproved =
          result.data?.is_approved_pengawas &&
          result.data?.is_approved_ketua &&
          result.data?.is_approved_bendahara;

        if (!isAllApproved) {
          throw new Error("Pinjaman belum disetujui sepenuhnya.");
        }

        setReceiptData(result.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal Memuat Resi",
          text: error.message,
          confirmButtonText: "Kembali",
          confirmButtonColor: "#dc3545",
        }).then(() => {
          navigate(`/${jwtEncode({ page: "programPage" })}`);
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [financingId, navigate]);

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    Swal.fire({
      icon: "info",
      title: "Download PDF",
      text: "Fitur download PDF sedang dalam pengembangan.",
      confirmButtonColor: "#0d6efd",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={12} md={12}>
            <Card className="shadow-lg border-0">
              <Card.Body className="text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Memuat resi pembayaran...</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!receiptData) {
    return null;
  }

  return (
    <div className="container-fluid px-0 mt-4 pb-5">
      <Row className="justify-content-center mx-0">
        <Col xs={12} md={12} lg={12} className="px-3 px-md-4">
          {/* Header Actions */}
          <div className="d-flex justify-content-end align-items-center mb-3 no-print">
            <div>
              <Button
                variant="outline-primary"
                className="fw-bold me-2"
                onClick={handlePrint}
              >
                🖨️ Print
              </Button>
              <Button
                variant="primary"
                className="fw-bold"
                onClick={handleDownloadPDF}
              >
                📥 Download PDF
              </Button>
            </div>
          </div>

          {/* Receipt Card */}
          <Card className="shadow-lg border-0 print-area">
            {/* Header */}
            <Card.Header className="bg-primary text-white p-4">
              <Row className="align-items-center">
                <Col xs={6}>
                  <h4 className="mb-0 fw-bold">KOPERASI PUS</h4>
                  <small>Resi Pembayaran Pinjaman</small>
                </Col>
                <Col xs={6} className="text-end">
                  <Badge bg="success" className="fs-6 px-3 py-2">
                    ✅ DISETUJUI
                  </Badge>
                </Col>
              </Row>
            </Card.Header>

            <Card.Body className="p-4">
              {/* Info Section */}
              <Row className="mb-4">
                <Col md={6}>
                  <h6 className="text-muted mb-2">Informasi Pinjaman</h6>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td className="text-muted" style={{ width: "40%" }}>
                          No. Pinjaman
                        </td>
                        <td className="fw-bold">
                          {receiptData.financing_id || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted">Tanggal Pengajuan</td>
                        <td>{formatDate(receiptData.createdAt)}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Akad</td>
                        <td className="fw-bold">
                          {receiptData.akad_type || "Murabahah"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted mb-2">Informasi Nasabah</h6>
                  <table className="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td className="text-muted" style={{ width: "40%" }}>
                          Nama
                        </td>
                        <td className="fw-bold">
                          {receiptData.member?.full_name || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-muted">No. Anggota</td>
                        <td>{receiptData.member?.member_no || "-"}</td>
                      </tr>
                      <tr>
                        <td className="text-muted">Email</td>
                        <td>{receiptData.member?.email || "-"}</td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>

              <hr />

              {/* Detail Pinjaman */}
              <h6 className="text-muted mb-3">Detail Pinjaman</h6>
              <Table bordered className="mb-4">
                <tbody>
                  <tr>
                    <td className="bg-light" style={{ width: "40%" }}>
                      <strong>Jumlah Pinjaman</strong>
                    </td>
                    <td className="text-end fw-bold fs-5">
                      {formatCurrency(receiptData.amount_requested)}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-light">
                      <strong>Jangka Waktu</strong>
                    </td>
                    <td className="text-end">
                      {receiptData.cooperation_months || 0} Bulan
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-light">
                      <strong>Angsuran per Bulan</strong>
                    </td>
                    <td className="text-end fw-bold text-primary">
                      {formatCurrency(receiptData.monthly_installment)}
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-light">
                      <strong>Metode Pencairan</strong>
                    </td>
                    <td className="text-end">
                      {receiptData.metode_pencairan || "Tunai"}
                    </td>
                  </tr>
                  {receiptData.metode_pencairan !== "Tunai" && (
                    <>
                      <tr>
                        <td className="bg-light">
                          <strong>Bank Tujuan</strong>
                        </td>
                        <td className="text-end">
                          {receiptData.bank_tujuan || "-"}
                        </td>
                      </tr>
                      <tr>
                        <td className="bg-light">
                          <strong>No. Rekening</strong>
                        </td>
                        <td className="text-end">
                          {receiptData.no_rekening || "-"}
                        </td>
                      </tr>
                    </>
                  )}
                  {receiptData.metode_pencairan === "Tunai" && (
                    <tr>
                      <td className="bg-light">
                        <strong>Lokasi Pencairan</strong>
                      </td>
                      <td className="text-end">
                        {receiptData.lokasi_pencairan || "-"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>

              <hr />

              {/* Lampiran Bukti Transfer */}
              <h6 className="text-muted mb-3">Lampiran Bukti Transfer (Pencairan)</h6>
              <div className="text-center mb-4">
                <img 
                  src="/mockup_transfer.png" 
                  alt="Bukti Transfer Mockup" 
                  className="img-fluid rounded border shadow-sm"
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                />
                <div className="mt-2 text-muted small">
                  *Bukti transfer ini diunggah secara manual oleh Bendahara
                </div>
              </div>

              <hr />

              {/* Approval Chain */}
              <h6 className="text-muted mb-3">Status Approval</h6>
              <Row className="text-center mb-4">
                <Col xs={4}>
                  <div
                    className="p-3 rounded"
                    style={{
                      backgroundColor: receiptData.is_approved_pengawas
                        ? "#e8f5e9"
                        : "#f8f9fa",
                      border: receiptData.is_approved_pengawas
                        ? "2px solid #28a745"
                        : "2px dashed #dee2e6",
                    }}
                  >
                    <div className="fw-bold text-success">✓</div>
                    <small className="d-block mt-1">PENGAWAS</small>
                    <small className="text-muted">
                      {receiptData.is_approved_pengawas ? "Disetujui" : "-"}
                    </small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div
                    className="p-3 rounded"
                    style={{
                      backgroundColor: receiptData.is_approved_ketua
                        ? "#e8f5e9"
                        : "#f8f9fa",
                      border: receiptData.is_approved_ketua
                        ? "2px solid #28a745"
                        : "2px dashed #dee2e6",
                    }}
                  >
                    <div className="fw-bold text-success">✓</div>
                    <small className="d-block mt-1">KETUA</small>
                    <small className="text-muted">
                      {receiptData.is_approved_ketua ? "Disetujui" : "-"}
                    </small>
                  </div>
                </Col>
                <Col xs={4}>
                  <div
                    className="p-3 rounded"
                    style={{
                      backgroundColor: receiptData.is_approved_bendahara
                        ? "#e8f5e9"
                        : "#f8f9fa",
                      border: receiptData.is_approved_bendahara
                        ? "2px solid #28a745"
                        : "2px dashed #dee2e6",
                    }}
                  >
                    <div className="fw-bold text-success">✓</div>
                    <small className="d-block mt-1">BENDAHARA</small>
                    <small className="text-muted">
                      {receiptData.is_approved_bendahara ? "Disetujui" : "-"}
                    </small>
                  </div>
                </Col>
              </Row>

              {/* Footer Note */}
              <div className="text-center text-muted small">
                <p className="mb-1">
                  <strong>
                    Resi ini adalah bukti sah pembayaran/pencairan pinjaman.
                  </strong>
                </p>
                <p>Dicetak pada: {new Date().toLocaleString("id-ID")}</p>
              </div>
            </Card.Body>
          </Card>

          {/* Mobile Actions */}
          <div className="d-md-none mt-3 no-print">
            <Button
              variant="primary"
              className="w-100 fw-bold mb-2"
              onClick={handleDownloadPDF}
            >
              📥 Download PDF
            </Button>
            <Button
              variant="outline-secondary"
              className="w-100 fw-bold"
              onClick={handlePrint}
            >
              🖨️ Print
            </Button>
          </div>
        </Col>
      </Row>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-area {
            box-shadow: none !important;
            border: 1px solid #dee2e6 !important;
          }
        }
      `}</style>
    </div>
  );
}
