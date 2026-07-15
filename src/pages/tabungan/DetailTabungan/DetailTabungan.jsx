import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  
  Badge,
  Table,
  Modal,
  Form,
  Spinner
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import http from "../../../utils/api/common";
import Swal from "sweetalert2";
import {
  FaKaaba,
  FaGraduationCap,
  FaUtensils,
  FaPlus,
  FaHistory,
  FaArrowLeft,
} from "react-icons/fa";
import "./DetailTabungan.css";
import Alert from "../../../components/ui/SwalAlert";
import { useProfile } from "../../../components/layout/contexts";


// Product configurations
const TABUNGAN_CONFIG = {
  haji: {
    label: "Tabungan Haji",
    icon: <FaKaaba size={32} />,
    color: "success",
  },
  umrah: {
    label: "Tabungan Umrah",
    icon: <FaKaaba size={32} />,
    color: "primary",
  },
  pendidikan: {
    label: "Tabungan Pendidikan",
    icon: <FaGraduationCap size={32} />,
    color: "info",
  },
  qurban: {
    label: "Tabungan Qurban",
    icon: <FaUtensils size={32} />,
    color: "warning",
  },
};

const normalizeBankName = (bankName) => {
  if (!bankName) return "Bank Syariah Indonesia";
  const name = bankName.toLowerCase();
  if (name.includes("syariah") || name.includes("bsi")) return "Bank Syariah Indonesia";
  if (name.includes("mandiri")) return "Bank Mandiri";
  if (name.includes("bca") || name.includes("central asia")) return "BCA";
  if (name.includes("bri") || name.includes("rakyat indonesia")) return "BRI";
  if (name.includes("bni") || name.includes("negara indonesia")) return "BNI";
  return "Bank Syariah Indonesia";
};

// ── Skeleton Loader ──

const DetailSkeleton = () => (
  <div className="detail-animate-pulse">
    <div className="d-flex align-items-center gap-3 mb-4">
      <div
        className="bg-light rounded-3"
        style={{ width: 56, height: 56 }}
      />
      <div className="flex-grow-1">
        <div className="bg-light rounded-3 mb-2" style={{ width: 180, height: 20 }} />
        <div className="bg-light rounded-3" style={{ width: 140, height: 14 }} />
      </div>
      <div className="bg-light rounded-pill" style={{ width: 70, height: 28 }} />
    </div>
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <div className="detail-skeleton-balance" />
      </div>
      <div className="col-md-6">
        <div className="detail-skeleton-balance" />
      </div>
    </div>
    <div className="detail-skeleton-progress mb-4" />
    <div className="row g-3">
      <div className="col-4">
        <div className="detail-skeleton-stat" />
      </div>
      <div className="col-4">
        <div className="detail-skeleton-stat" />
      </div>
      <div className="col-4">
        <div className="detail-skeleton-stat" />
      </div>
    </div>
  </div>
);

// ── Main Component ──

const DetailTabungan = () => {
  const navigate = useNavigate();
  const { userData } = useProfile();
  const [productType, setProductType] = useState("haji");
  const [tabunganId, setTabunganId] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    method: "TRANSFER",
    bank_name: "",
    bank_account_no: "",
    cash_name: "",
    cash_time: "",
    cash_location: ""
  });

  useEffect(() => {
    if (userData) {
      const rawBankName = userData.bank_name || userData.bank_info?.bank_name || "";
      const defaultBankName = normalizeBankName(rawBankName);
      const defaultAccountNo = userData.bank_account_no || userData.bank_info?.bank_account_no || "";

      setWithdrawData((prev) => ({
        ...prev,
        bank_name: prev.bank_name || defaultBankName,
        bank_account_no: prev.bank_account_no || defaultAccountNo,
      }));
    }
  }, [userData]);

  const productConfig = TABUNGAN_CONFIG[productType] || TABUNGAN_CONFIG.haji;

  const [autoOpenWithdraw, setAutoOpenWithdraw] = useState(false);

  useEffect(() => {
    // Get product from URL
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      if (decoded?.product && TABUNGAN_CONFIG[decoded.product]) {
        setProductType(decoded.product);
      }
      if (decoded?.tabunganId) {
        setTabunganId(decoded.tabunganId);
      }
      if (decoded?.action === "withdraw") {
        setAutoOpenWithdraw(true);
      }
    } catch (e) {
      console.error("Error decoding URL:", e);
    }

    // TODO: Fetch account data from API
    // fetchAccountData();

    // Mock data for now
    setTimeout(() => {
      setAccountData({
        accountNumber: "TBG-2024-001234",
        accountName: "Ahmad Fauzi",
        targetAmount: 25000000,
        currentBalance: 25000000,
        initialDeposit: 500000,
        tenor: 60,
        startDate: "2024-01-15",
        endDate: "2029-01-15",
        monthlyTarget: 416667,
        status: "active",
        transactions: [
          {
            date: "2024-01-15",
            type: "Setoran Awal",
            amount: 500000,
            balance: 500000,
          },
          {
            date: "2024-02-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 916667,
          },
          {
            date: "2024-03-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 1333334,
          },
          {
            date: "2024-04-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 1750001,
          },
          {
            date: "2024-05-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 2166668,
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  const progressPercentage = accountData
    ? Math.round((accountData.currentBalance / accountData.targetAmount) * 100)
    : 0;

  useEffect(() => {
    if (accountData && autoOpenWithdraw) {
      if (progressPercentage >= 100) {
        setShowWithdrawModal(true);
      }
      setAutoOpenWithdraw(false); // Only do it once
    }
  }, [accountData, autoOpenWithdraw, progressPercentage]);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const handleSetoran = useCallback(() => {
    const token = jwtEncode({
      page: "setoranTabungan",
      product: productType,
    });
    navigate(`/${token}`);
  }, [navigate, productType]);

  const handlePengajuanBaru = useCallback(() => {
    const token = jwtEncode({
      page: "formPengajuanTabungan",
      product: productType,
    });
    navigate(`/${token}`);
  }, [navigate, productType]);

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "tabunganPage" });
    navigate(`/${token}`);
  }, [navigate]);



  const handlePencairanClick = useCallback(() => {
    if (progressPercentage < 100) {
      Swal.fire({
        title: "Perhatian",
        text: "Tabungan baru bisa dicairkan jika target nominal terpenuhi.",
        icon: "warning"
      });
      return;
    }
    setShowWithdrawModal(true);
  }, [progressPercentage]);

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Use actual tabunganId from token or fallback to mock
      const targetId = tabunganId || accountData?.memberSavingTargetId || "dummy-id";
      
      const payload = {
        method: withdrawData.method,
        bank_name: withdrawData.method === "TRANSFER" ? withdrawData.bank_name : null,
        bank_account_no: withdrawData.method === "TRANSFER" ? withdrawData.bank_account_no : null,
        cash_name: withdrawData.method === "TUNAI" ? withdrawData.cash_name : null,
        cash_time: withdrawData.method === "TUNAI" ? withdrawData.cash_time : null,
        cash_location: withdrawData.method === "TUNAI" ? withdrawData.cash_location : null,
      };

      const res = await http.post(`/tabungan/pengajuan/${targetId}/withdraw`, payload);
      
      const withdrawalId = res.data?.data?.withdrawal_id || res.data?.data?.id;

      setShowWithdrawModal(false);
      Swal.fire({
        title: "Berhasil",
        text: "Pengajuan pencairan tabungan berhasil dikirim. Menunggu persetujuan.",
        icon: "success"
      }).then(() => {
        const token = jwtEncode({
          page: "transactionDetailPage",
          withdrawalId: withdrawalId,
          tabunganId: targetId,
          return: "tabunganPage",
          product: productConfig?.label || "Tabungan",
        });
        navigate(`/${token}`);
      });
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Gagal mengajukan pencairan",
        icon: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Loading State ──

  if (loading) {
    return (
      <div className="detail-loading-state p-4">
        <div className="w-100" style={{ maxWidth: 800 }}>
          <div className="detail-tabungan-header pb-3 mb-4 border-bottom">
            <h3 className="fw-bold mb-0">Detail Tabungan</h3>
          </div>
          <DetailSkeleton />
        </div>
      </div>
    );
  }

  // ── Error State ──

  if (error) {
    return (
      <div className="detail-error-state">
        <div className="w-100" style={{ maxWidth: 800 }}>
          <div className="detail-tabungan-header pb-3 mb-4 border-bottom">
            <h3 className="fw-bold mb-0">Detail Tabungan</h3>
          </div>
          <Alert variant="danger" className="shadow-sm">
            {error}
          </Alert>
          <Button
            variant="light"
            className="detail-back-btn px-4 py-2"
            onClick={handleBack}
          >
            <FaArrowLeft className="me-2" />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  // ── Main Render ──

  return (
    <div className="detail-tabungan-page pb-5">
      <div className="px-3">
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          {/* Header */}
          <div className="detail-tabungan-header pt-3 pb-3 mb-4 border-bottom">
            <h3 className="fw-bold mb-0">
              Detail {productConfig.label}
            </h3>
          </div>

          <div className="detail-animate-fade-in">
            {/* Account Info Card */}
            <Card className="shadow-lg border-0 mb-4 detail-tabungan-main-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div className="d-flex align-items-center">
                    <div
                      className={`detail-icon-wrapper bg-light rounded-3 me-3 text-${productConfig.color}`}
                    >
                      {productConfig.icon}
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{productConfig.label}</h5>
                      <p className="text-muted mb-0 small">
                        No. Rekening: {accountData.accountNumber}
                      </p>
                    </div>
                  </div>
                  <Badge bg="success" className="detail-status-badge px-3 py-2">
                    Aktif
                  </Badge>
                </div>

                <Row className="g-3">
                  <Col md={6}>
                    <Card className="bg-light border-0 h-100 detail-balance-card">
                      <Card.Body className="p-3">
                        <p className="text-muted mb-1 small">Saldo Saat Ini</p>
                        <h4 className="fw-bold text-primary mb-0">
                          Rp {formatCurrency(accountData.currentBalance)}
                        </h4>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="bg-light border-0 h-100 detail-balance-card">
                      <Card.Body className="p-3">
                        <p className="text-muted mb-1 small">Target Saldo</p>
                        <h4 className="fw-bold text-success mb-0">
                          Rp {formatCurrency(accountData.targetAmount)}
                        </h4>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                {/* Progress */}
                <div className="mt-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted small">Progress</span>
                    <span className="fw-bold small">{progressPercentage}%</span>
                  </div>
                  <div className="detail-progress">
                    <div
                      className="detail-progress-bar bg-success"
                      style={{ width: `${progressPercentage}%` }}
                      role="progressbar"
                      aria-valuenow={progressPercentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                {/* Stats */}
                <Row className="mt-4 g-3">
                  <Col md={4} xs={4}>
                    <div className="text-center p-3 bg-light detail-stat-item">
                      <p className="text-muted mb-1">Setoran Awal</p>
                      <p className="fw-bold mb-0">
                        Rp {formatCurrency(accountData.initialDeposit)}
                      </p>
                    </div>
                  </Col>
                  <Col md={4} xs={4}>
                    <div className="text-center p-3 bg-light detail-stat-item">
                      <p className="text-muted mb-1">Target Bulanan</p>
                      <p className="fw-bold mb-0">
                        Rp {formatCurrency(accountData.monthlyTarget)}
                      </p>
                    </div>
                  </Col>
                  <Col md={4} xs={4}>
                    <div className="text-center p-3 bg-light detail-stat-item">
                      <p className="text-muted mb-1">Sisa Tenor</p>
                      <p className="fw-bold mb-0">{accountData.tenor} Bulan</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Action Buttons */}
            <Card className="shadow-sm border-0 mb-4 detail-actions-card">
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-3">Menu Aksi</h6>
                <div className="d-flex gap-2 flex-wrap">
                  {progressPercentage < 100 ? (
                    <Button
                      variant="primary"
                      className="px-4 py-2 shadow-sm"
                      onClick={handleSetoran}
                    >
                      <FaPlus className="me-2" />
                      Setoran
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      className="px-4 py-2 shadow-sm"
                      onClick={handlePencairanClick}
                    >
                      Pencairan
                    </Button>
                  )}
                  <Button
                    variant="outline-secondary"
                    className="px-4 py-2"
                    onClick={handlePengajuanBaru}
                  >
                    <FaPlus className="me-2" />
                    Pengajuan Baru
                  </Button>
                </div>
              </Card.Body>
            </Card>

            {/* Transaction History */}
            <Card className="shadow-sm border-0 detail-history-card">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-bold mb-0">
                    <FaHistory className="me-2" />
                    Riwayat Transaksi
                  </h6>
                </div>
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Tanggal</th>
                        <th>Jenis Transaksi</th>
                        <th className="text-end">Nominal</th>
                        <th className="text-end">Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountData.transactions.map((tx, index) => (
                        <tr key={index}>
                          <td className="text-nowrap">{formatDate(tx.date)}</td>
                          <td>{tx.type}</td>
                          <td className="text-end text-success fw-medium">
                            +Rp {formatCurrency(tx.amount)}
                          </td>
                          <td className="text-end fw-bold">
                            Rp {formatCurrency(tx.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Back Button */}
            <div className="mt-4">
              <Button
                variant="light"
                className="detail-back-btn px-4 py-2 fw-bold"
                onClick={handleBack}
              >
                <FaArrowLeft className="me-2" />
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Pencairan */}
      <Modal show={showWithdrawModal} onHide={() => setShowWithdrawModal(false)} centered>
        <Form onSubmit={handleWithdrawSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Form Pencairan Tabungan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert variant="info" className="mb-3">
              Anda akan mencairkan seluruh saldo terkumpul sebesar <strong>Rp {formatCurrency(accountData?.currentBalance || 0)}</strong>.
            </Alert>
            <Form.Group className="mb-3">
              <Form.Label>Metode Pencairan</Form.Label>
              <Form.Select 
                value={withdrawData.method} 
                onChange={(e) => setWithdrawData({...withdrawData, method: e.target.value})}
              >
                <option value="TRANSFER">Transfer Bank</option>
                <option value="TUNAI">Ambil Tunai</option>
                <option value="SIMPANAN">Pindahkan ke Saldo Simpanan Koperasi</option>
              </Form.Select>
            </Form.Group>

            {withdrawData.method === "TRANSFER" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Bank</Form.Label>
                  <Form.Control 
                    required 
                    placeholder="Contoh: BCA, BSI, Mandiri"
                    value={withdrawData.bank_name}
                    onChange={(e) => setWithdrawData({...withdrawData, bank_name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>No Rekening</Form.Label>
                  <Form.Control 
                    required 
                    placeholder="Nomor rekening tujuan"
                    value={withdrawData.bank_account_no}
                    onChange={(e) => setWithdrawData({...withdrawData, bank_account_no: e.target.value})}
                  />
                </Form.Group>
              </>
            )}

            {withdrawData.method === "SIMPANAN" && (
              <Alert variant="info" className="mb-3">
                Dana pencairan akan dipindahkan ke saldo Simpanan Koperasi Anda dan bisa dicairkan kapan saja melalui menu Tarik Tunai.
              </Alert>
            )}

            {withdrawData.method === "TUNAI" && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Nama Pengambil</Form.Label>
                  <Form.Control 
                    required 
                    value={withdrawData.cash_name}
                    onChange={(e) => setWithdrawData({...withdrawData, cash_name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Lokasi Pengambilan</Form.Label>
                  <Form.Control 
                    required 
                    placeholder="Contoh: Kantor Cabang Utama"
                    value={withdrawData.cash_location}
                    onChange={(e) => setWithdrawData({...withdrawData, cash_location: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Waktu Pengambilan</Form.Label>
                  <Form.Control 
                    type="date"
                    required 
                    value={withdrawData.cash_time}
                    onChange={(e) => setWithdrawData({...withdrawData, cash_time: e.target.value})}
                  />
                </Form.Group>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowWithdrawModal(false)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner size="sm" animation="border" /> : "Ajukan Pencairan"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default DetailTabungan;