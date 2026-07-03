// pages/global/ReceiptPage/ReceiptPage.jsx
// Halaman Resi Pembayaran / Penarikan

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtEncode } from "../../../utils/helpers";
import { motion } from "framer-motion";
import { FaCheckCircle, FaRegFileAlt, FaFileInvoiceDollar, FaPrint, FaDownload, FaArrowLeft } from "react-icons/fa";
import api from "../../../utils/api/common";

const ProtectedFileViewer = ({ url, title }) => {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let objectUrl = null;
    const fetchFile = async () => {
      try {
        setLoading(true);
        const response = await api.get(url, { responseType: 'blob' });
        objectUrl = URL.createObjectURL(response.data);
        setBlobUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load protected file:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (url && url !== '#') {
      fetchFile();
    } else {
      setLoading(false);
    }
    
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  if (loading) return <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-light text-secondary"><Spinner size="sm" animation="border" className="me-2"/> Memuat...</div>;
  if (error || !url || url === '#') return <div className="d-flex align-items-center justify-content-center w-100 h-100 bg-light text-danger small">Gagal memuat dokumen</div>;

  return <iframe src={blobUrl} title={title} style={{ width: '100%', height: '100%', border: 'none' }} />;
};

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

export default function ReceiptPage({ decodedToken }) {
  const navigate = useNavigate();
  const [receiptData, setReceiptData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const financingId = decodedToken?.financingId;
  const withdrawalId = decodedToken?.withdrawalId;
  const isWithdrawal = !!withdrawalId;

  const fetchReceiptData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const baseUrl = API_BASE_URL.endsWith("/api")
        ? API_BASE_URL.slice(0, -4)
        : API_BASE_URL;

      const endpoint = isWithdrawal
        ? `/api/simpanan/penarikan/detail/${withdrawalId}`
        : `/api/financing/detail/${financingId}`;

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

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
        if (!financingId && !withdrawalId) {
          throw new Error("ID Transaksi tidak ditemukan.");
        }

        const result = await fetchReceiptData();

        const flags = result.data?.approval_status || result.data || {};
        const pengawasDone = flags.is_approved_pengawas || false;
        const ketuaDone = flags.is_approved_ketua || false;
        const bendaharaDone = flags.is_approved_bendahara || false;

        const isAllApproved = pengawasDone && ketuaDone && bendaharaDone;

        if (!isAllApproved) {
          throw new Error("Transaksi belum disetujui sepenuhnya.");
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
  }, [financingId, withdrawalId, isWithdrawal, navigate]);

  const handleDownloadPDF = () => {
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
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <Spinner animation="grow" variant="primary" />
          <p className="mt-3 text-muted fw-semibold">Menyiapkan Resi Anda...</p>
        </div>
      </div>
    );
  }

  if (!receiptData) {
    return null;
  }

  const approvalFlags = receiptData.approval_status || receiptData || {};
  const isPaid = true; // Always true since this page is only for approved receipts
  const isPendanaanSyariah = receiptData?.category === 'Pendanaan Syariah UMKM' || receiptData?.category === 'Pendanaan Syariah';

  const getFileUrl = (transaction, type) => {
    const txId = transaction?.id || transaction?.financing_id;
    if (!txId) return '#';
    let url = `${api.defaults.baseURL}/financing/evidence/${txId}/download`;
    if (type) {
      url += `?type=${type}`;
    }
    return url;
  };

  const getProofUrl = () => {
    if (!receiptData?.transfer_proof_path) return null;
    const baseUrl = API_BASE_URL.endsWith("/api") ? API_BASE_URL.slice(0, -4) : API_BASE_URL;
    return `${baseUrl}/${receiptData.transfer_proof_path}`;
  };

  const proofUrl = getProofUrl();
  const isProofPdf = proofUrl && proofUrl.toLowerCase().endsWith('.pdf');

  return (
    <Container fluid className="py-3 px-0">
      {/* Header Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4 no-print flex-wrap gap-3">
        <Button 
          variant="light" 
          className="rounded-pill px-4 fw-semibold border shadow-sm text-secondary d-flex align-items-center" 
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" /> Kembali
        </Button>
        <div className="d-flex gap-2">
          <Button 
            variant="outline-primary" 
            className="rounded-pill px-4 fw-semibold d-flex align-items-center" 
            onClick={handlePrint}
          >
            <FaPrint className="me-2" /> Cetak Resi
          </Button>
          <Button 
            variant="primary" 
            className="rounded-pill px-4 fw-semibold shadow-sm d-flex align-items-center" 
            onClick={handleDownloadPDF}
          >
            <FaDownload className="me-2" /> Download PDF
          </Button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-0 shadow-lg rounded-4 overflow-hidden position-relative print-area bg-white">
          {/* Background Decorative Element */}
          <div 
            className="position-absolute no-print" 
            style={{ 
              top: "-50px", 
              right: "-50px", 
              width: "200px", 
              height: "200px", 
              borderRadius: "50%", 
              background: isPaid ? "rgba(40, 167, 69, 0.05)" : "rgba(0, 123, 255, 0.05)",
              zIndex: 0
            }} 
          />

          {/* Banner Status with Gradient */}
          <div
            className={`text-center py-5 position-relative bg-gradient-success text-white`}
            style={{
              background: "linear-gradient(45deg, #28a745, #20c997)",
              zIndex: 1
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <FaCheckCircle size={60} className="mb-3" />
              <h3 className="fw-bold mb-1 text-white">RESI {isWithdrawal ? "PENARIKAN" : "PINJAMAN"} BERHASIL</h3>
              <p className="opacity-75 mb-0 text-white">Transaksi telah disetujui dan diproses oleh koperasi</p>
            </motion.div>
          </div>

          <Card.Body className="p-4 p-md-5 position-relative" style={{ zIndex: 1 }}>
            <Row className="mb-5 gy-4">
              <Col md={6}>
                <div className="mb-4">
                  <small className="text-uppercase text-muted fw-bold ls-1 d-block mb-2">
                    Diterbitkan Untuk:
                  </small>
                  <h4 className="fw-bold text-dark mb-1">
                    {receiptData.member?.full_name || "-"}
                  </h4>
                  <p className="text-primary fw-semibold mb-0">
                    {receiptData.member?.member_no || "-"}
                  </p>
                  <small className="text-muted d-block mt-1">
                    Email: {receiptData.member?.email || "-"}
                  </small>
                </div>
              </Col>
              <Col md={6} className="text-md-end">
                <div>
                  <small className="text-uppercase text-muted fw-bold ls-1 d-block mb-2">
                    Detail Transaksi:
                  </small>
                  <h5 className="fw-bold text-dark mb-1">
                    #{isWithdrawal ? (receiptData.id || receiptData.withdrawal_id || "-") : (receiptData.financing_id || "-")}
                  </h5>
                  <small className="text-muted d-block fw-medium">
                    Kategori: {isWithdrawal ? (receiptData.account?.product?.name || receiptData.category || "Penarikan Simpanan") : (receiptData.akad_type || "Murabahah")}
                  </small>
                  <small className="text-muted d-block fw-medium">
                    Tanggal: {formatDate(receiptData.createdAt)}
                  </small>
                </div>
              </Col>
            </Row>

            {/* Table Styling */}
            <div className="table-responsive-custom mb-5">
              <Table borderless className="align-middle mb-0">
                <thead>
                  <tr className="border-bottom border-2 border-light">
                    <th className="py-3 px-2 text-muted small text-uppercase fw-bold ls-1" style={{ width: "60%" }}>DESKRIPSI ITEM</th>
                    <th className="py-3 px-2 text-end text-muted small text-uppercase fw-bold ls-1">KETERANGAN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-bottom border-light">
                    <td className="py-4 px-2">
                      <div className="fw-bold text-dark">{isPendanaanSyariah ? "Target Dana yang Dibutuhkan" : `Jumlah ${isWithdrawal ? "Penarikan" : "Pinjaman"}`}</div>
                      <small className="text-muted">Nominal transaksi yang diajukan</small>
                    </td>
                    <td className="py-4 px-2 text-end">
                      <span className="fw-bold text-dark h5 mb-0">
                        {formatCurrency(isWithdrawal ? receiptData.amount : receiptData.amount_requested)}
                      </span>
                    </td>
                  </tr>

                  {isPendanaanSyariah && (
                    <>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Nama Usaha</div>
                          <small className="text-muted">Identitas bisnis UMKM</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-dark h5 mb-0">
                            {receiptData.business_name || receiptData.business_profile?.business_name || "-"}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Sektor Bisnis Utama</div>
                          <small className="text-muted">Kategori industri/bidang usaha</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-dark h6 mb-0">
                            {receiptData.business_sector || receiptData.business_profile?.business_sector || "-"}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Alamat Tempat Usaha</div>
                          <small className="text-muted">Lokasi operasional bisnis</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-dark h6 mb-0 text-wrap" style={{maxWidth: '300px', display: 'inline-block'}}>
                            {receiptData.business_address || receiptData.business_profile?.business_address || "-"}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Estimasi Omset Tahunan Saat Ini</div>
                          <small className="text-muted">Pendapatan kotor setahun</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-dark h5 mb-0">
                            {formatCurrency(receiptData.estimated_yearly_turnover || (receiptData.business_profile?.monthly_revenue * 12) || 0)}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Tujuan Penggunaan Dana</div>
                          <small className="text-muted">Rencana alokasi dana</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-dark h6 mb-0 text-wrap" style={{maxWidth: '300px', display: 'inline-block'}}>
                            {receiptData.purpose || receiptData.funding_purpose || "-"}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Estimasi Omset (Bulanan)</div>
                          <small className="text-muted">Selama periode pendanaan</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-dark h5 mb-0">
                            {formatCurrency(receiptData.estimated_monthly_turnover || receiptData.business_profile?.monthly_revenue || 0)}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Tawaran Bagi Hasil Investor</div>
                          <small className="text-muted">Persentase bagi hasil keuntungan</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-success h5 mb-0">
                            {receiptData.investor_profit_share || receiptData.profit_share || 0}%
                          </span>
                        </td>
                      </tr>
                    </>
                  )}

                  {!isWithdrawal && (
                    <>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">{isPendanaanSyariah ? "Periode Pengembalian Modal" : "Jangka Waktu"}</div>
                          <small className="text-muted">{isPendanaanSyariah ? "Durasi pendanaan" : "Durasi pinjaman"}</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <span className="fw-bold text-dark h5 mb-0">
                            {receiptData.cooperation_months || 0} Bulan
                          </span>
                        </td>
                      </tr>
                      {!isPendanaanSyariah && (
                        <tr className="border-bottom border-light">
                          <td className="py-4 px-2">
                            <div className="fw-bold text-dark">Angsuran per Bulan</div>
                            <small className="text-muted">Kewajiban bulanan</small>
                          </td>
                          <td className="py-4 px-2 text-end">
                            <span className="fw-bold text-dark h5 mb-0">
                              {formatCurrency(receiptData.monthly_installment)}
                            </span>
                          </td>
                        </tr>
                      )}
                    </>
                  )}

                  <tr className="border-bottom border-light">
                    <td className="py-4 px-2">
                      <div className="fw-bold text-dark">Metode Pencairan</div>
                      <small className="text-muted">Cara penyaluran dana</small>
                    </td>
                    <td className="py-4 px-2 text-end">
                      <span className="fw-bold text-dark h5 mb-0">
                        {isWithdrawal ? (receiptData.method || "Transfer") : (receiptData.metode_pencairan || "Tunai")}
                      </span>
                    </td>
                  </tr>

                  {((isWithdrawal && receiptData.method !== "TUNAI") || (!isWithdrawal && receiptData.metode_pencairan !== "Tunai")) && (
                    <>
                      <tr className="border-bottom border-light">
                        <td className="py-4 px-2">
                          <div className="fw-bold text-dark">Tujuan Pencairan</div>
                          <small className="text-muted">Bank dan Nomor Rekening</small>
                        </td>
                        <td className="py-4 px-2 text-end">
                          <div className="fw-bold text-dark h6 mb-1">
                            {isWithdrawal 
                              ? (receiptData.bank_name || receiptData.bank?.bankName || "-") 
                              : (receiptData.bank_tujuan || "-")}
                          </div>
                          <small className="text-muted d-block">
                            {isWithdrawal 
                              ? (receiptData.bank_account_no || receiptData.bank?.accountNo || "-") 
                              : (receiptData.no_rekening || "-")}
                          </small>
                          {isWithdrawal && (
                            <small className="text-muted d-block">
                              a.n. {receiptData.bank_account_name || receiptData.bank?.accountName || "-"}
                            </small>
                          )}
                        </td>
                      </tr>
                    </>
                  )}

                  {!isWithdrawal && receiptData.metode_pencairan === "Tunai" && (
                    <tr className="border-bottom border-light">
                      <td className="py-4 px-2">
                        <div className="fw-bold text-dark">Lokasi Pencairan</div>
                        <small className="text-muted">Tempat pengambilan dana</small>
                      </td>
                      <td className="py-4 px-2 text-end">
                        <span className="fw-bold text-dark h5 mb-0">
                          {receiptData.lokasi_pencairan || "-"}
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {isPendanaanSyariah && (
              <div className="mb-5">
                <h6 className="text-uppercase text-muted fw-bold ls-1 mb-3">Dokumen Legalitas & Pendukung</h6>
                <Row className="gy-4">
                  <Col md={4}>
                    <div className="border rounded overflow-hidden shadow-sm bg-light" style={{ height: '300px' }}>
                      <ProtectedFileViewer url={receiptData.file_evidence ? getFileUrl(receiptData, 'evidence') : '#'} title="Bukti Kepemilikan" />
                    </div>
                    <div className="text-center mt-2 fw-semibold text-dark small">Bukti Kepemilikan Usaha</div>
                  </Col>
                  <Col md={4}>
                    <div className="border rounded overflow-hidden shadow-sm bg-light" style={{ height: '300px' }}>
                      <ProtectedFileViewer url={receiptData.contract_proof ? getFileUrl(receiptData, 'contract_proof') : '#'} title="Bukti Kerjasama" />
                    </div>
                    <div className="text-center mt-2 fw-semibold text-dark small">Bukti Kerjasama / Kontrak</div>
                  </Col>
                  <Col md={4}>
                    <div className="border rounded overflow-hidden shadow-sm bg-light" style={{ height: '300px' }}>
                      <ProtectedFileViewer url={receiptData.additional_documents ? getFileUrl(receiptData, 'additional_documents') : '#'} title="Dokumen Pendukung" />
                    </div>
                    <div className="text-center mt-2 fw-semibold text-dark small">Dokumen Pendukung Tambahan</div>
                  </Col>
                </Row>
              </div>
            )}

            {/* Approval Chain using nice badges */}
            <h6 className="text-uppercase text-muted fw-bold ls-1 mb-3">Status Persetujuan</h6>
            <Row className="mb-5 gy-3">
              {[
                { role: "Pengawas", done: approvalFlags.is_approved_pengawas },
                { role: "Ketua", done: approvalFlags.is_approved_ketua },
                { role: "Bendahara", done: approvalFlags.is_approved_bendahara }
              ].map((step, idx) => (
                <Col xs={4} key={idx}>
                  <div className={`p-3 rounded-4 text-center h-100 d-flex flex-column justify-content-center align-items-center ${step.done ? 'bg-success bg-opacity-10 border border-success border-opacity-25' : 'bg-light border'}`}>
                    <div className={`mb-2 ${step.done ? 'text-success' : 'text-muted'}`}>
                      {step.done ? <FaCheckCircle size={24} /> : <div className="spinner-grow spinner-grow-sm" role="status"><span className="visually-hidden">Loading...</span></div>}
                    </div>
                    <small className="d-block fw-bold text-dark mb-1">{step.role}</small>
                    <small className={`fw-medium ${step.done ? 'text-success' : 'text-muted'}`}>
                      {step.done ? "Disetujui" : "Menunggu"}
                    </small>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Lampiran Bukti Transfer */}
            {((isWithdrawal && receiptData.method !== "TUNAI") || (!isWithdrawal && receiptData.metode_pencairan !== "Tunai")) && (
              <div className="mt-4 pt-4 border-top">
                <h6 className="text-uppercase text-muted fw-bold ls-1 mb-3">Lampiran Bukti Transfer</h6>
                <div className="text-center mb-4">
                  {proofUrl ? (
                    isProofPdf ? (
                      <div className="border rounded overflow-hidden shadow-sm bg-light w-100" style={{ height: '800px' }}>
                        <ProtectedFileViewer url={proofUrl} title="Bukti Transfer" />
                      </div>
                    ) : (
                      <img 
                        src={proofUrl} 
                        alt="Bukti Transfer" 
                        className="img-fluid rounded-4 border shadow-sm"
                        style={{ maxHeight: "300px", objectFit: "contain" }}
                      />
                    )
                  ) : (
                    <div className="p-4 border rounded-4 d-inline-block bg-light shadow-sm text-muted">
                      <p className="mb-0">Belum ada bukti transfer yang diunggah.</p>
                    </div>
                  )}
                  <div className="mt-2 text-muted small">
                    *Bukti transfer ini diunggah oleh Bendahara saat persetujuan.
                  </div>
                </div>
              </div>
            )}

            {/* Summary Section like Invoice */}
            <Row className="justify-content-between align-items-end mt-4">
              <Col md={6} className="mb-4 mb-md-0">
                <div className="d-flex align-items-center gap-3 text-muted small">
                  <div className="bg-light p-2 rounded-3 no-print">
                    <FaCheckCircle className="text-success" />
                  </div>
                  <div>
                    <div className="fw-bold text-dark">Transaksi Sah & Teregistrasi</div>
                    <div>Dicetak pada: {new Date().toLocaleString("id-ID")}</div>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="p-4 rounded-4 bg-light border-0 shadow-sm overflow-hidden position-relative">
                  <div 
                    className="position-absolute no-print" 
                    style={{ 
                      bottom: "-10px", 
                      right: "-10px", 
                      opacity: 0.1, 
                      transform: "rotate(-15deg)" 
                    }}
                  >
                    <FaRegFileAlt size={80} />
                  </div>
                  <p className="text-muted mb-2 fw-bold small text-uppercase ls-1 position-relative z-1">
                    Total {isWithdrawal ? "Pencairan" : "Pinjaman"}
                  </p>
                  <h2 className="fw-bold text-success mb-0 position-relative z-1">
                    {formatCurrency(isWithdrawal ? receiptData.amount : receiptData.amount_requested)}
                  </h2>
                </div>
              </Col>
            </Row>

          </Card.Body>
        </Card>
      </motion.div>

      {/* Footer Branding d-print-none */}
      <div className="text-center mt-5 d-print-none opacity-50">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Koperasi Digital - System Generated Receipt
        </small>
      </div>

      {/* Custom Styles for this component */}
      <style>{`
        .ls-1 { letter-spacing: 1px; }
        .bg-gradient-success { background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important; }
        .table-responsive-custom { border-radius: 12px; }
        
        @media print {
          body { background: white !important; }
          .container { padding: 0 !important; max-width: 100% !important; margin: 0 !important; }
          .card { border: none !important; box-shadow: none !important; }
          .bg-gradient-success { 
            -webkit-print-color-adjust: exact !important; 
            color-adjust: exact !important;
            background: #28a745 !important;
            color: white !important;
          }
          .bg-gradient-success h3, .bg-gradient-success p {
            color: white !important;
          }
          .d-print-none, .no-print { display: none !important; }
        }
      `}</style>
    </Container>
  );
}
