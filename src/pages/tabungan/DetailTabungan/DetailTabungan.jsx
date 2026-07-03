import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  
  Badge,
  Table} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
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
  const [productType, setProductType] = useState("haji");
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const productConfig = TABUNGAN_CONFIG[productType] || TABUNGAN_CONFIG.haji;

  useEffect(() => {
    // Get product from URL
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      if (decoded?.product && TABUNGAN_CONFIG[decoded.product]) {
        setProductType(decoded.product);
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
        currentBalance: 12500000,
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

  const progressPercentage = accountData
    ? Math.round((accountData.currentBalance / accountData.targetAmount) * 100)
    : 0;

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
                  <Button
                    variant="primary"
                    className="px-4 py-2 shadow-sm"
                    onClick={handleSetoran}
                  >
                    <FaPlus className="me-2" />
                    Setoran
                  </Button>
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
    </div>
  );
};

export default DetailTabungan;