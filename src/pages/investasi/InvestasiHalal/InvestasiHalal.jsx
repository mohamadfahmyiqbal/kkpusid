import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  
  Table,
  Tabs,
  Tab} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import { FaCertificate, FaWallet } from "react-icons/fa";
import { useInvestasiData } from "./hooks/useInvestasiData";
import "./InvestasiHalal.css";
import Alert from "../../../components/ui/SwalAlert";


const InvestasiHalal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sukuk");
  const { sukukList, portofolioList, loading, error } = useInvestasiData();

  const activePortofolio = React.useMemo(() => {
    return portofolioList.filter(item => ['pending', 'ready_to_pay', 'paid', 'approved', 'completed'].includes(item.status));
  }, [portofolioList]);

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

  const handleBack = useCallback(() => {
    navigate('/investasiPage');
  }, [navigate]);

  const calculateTenor = (start, end) => {
    if (!start || !end) return "-";
    const startDate = new Date(start);
    const endDate = new Date(end);
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return `${months > 0 ? months : 1} Bulan`;
  };

  const handleInvestSukuk = useCallback(
    (sukukId) => {
      const token = jwtEncode({
        page: "detailSukuk",
        sukukId,
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const handleRedeem = useCallback(
    (portofolioId) => {
      const token = jwtEncode({
        page: "pengembalianModal",
        portofolioId,
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
        <p className="mt-3 text-muted">Memuat data investasi...</p>
      </div>
    );
  }

  return (
    <div className="investasi-halal-container">
      <Container fluid className="px-0">
        {/* Hero Section */}
        <div className="investasi-halal-hero">
          <div className="investasi-halal-hero-content">
            <div className="investasi-halal-icon-wrap">
              <FaCertificate />
            </div>
            <div>
              <h1 className="investasi-halal-title">Investasi Halal</h1>
              <p className="investasi-halal-subtitle">
                Temukan peluang investasi yang aman dan menguntungkan dalam produk Sukuk syariah. Tumbuhkan aset Anda dengan penuh keberkahan dan transparansi.
              </p>
            </div>
          </div>
        </div>

        <Row className="justify-content-center">
          <Col lg={12}>
            {error && (
              <Alert variant="danger" className="mb-4 rounded-4 border-0 shadow-sm">
                {error}
              </Alert>
            )}

            <Card className="halal-card">
              <Card.Body className="p-4">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="halal-tabs mb-4"
                >
                  <Tab
                    eventKey="sukuk"
                    title={
                      <div className="d-flex align-items-center gap-2">
                        <FaCertificate />
                        <span>Katalog Produk</span>
                      </div>
                    }
                  >
                    <h5 className="fw-bold mb-3 mt-2 text-dark">Daftar Sukuk Tersedia</h5>
                    <div className="mt-3">
                      <Row>
                        {sukukList.map((sukuk) => {
                          return (
                          <Col lg={4} md={6} sm={12} key={sukuk.id} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 sukuk-item-card">
                              <Card.Body className="d-flex flex-column p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <div>
                                    <h5 className="fw-bold text-dark mb-1">{sukuk.name}</h5>
                                    <small className="text-muted">{sukuk.issuer}</small>
                                  </div>
                                  <span className="badge-soft-success px-2 py-1">{sukuk.type === 'Sukuk Ritel' ? 'Ijarah' : 'Mudharabah'}</span>
                                </div>
                                
                                <div className="sukuk-details mb-4 flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Kategori</span>
                                    <span className="fw-bold text-dark">{sukuk.type}</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Nilai Pendanaan</span>
                                    <span className="fw-bold text-dark">Rp {formatCurrency(sukuk.totalAmount || 0)}</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Minimum Investasi</span>
                                    <span className="fw-bold text-dark">Rp {formatCurrency(sukuk.minInvestment || 0)}</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Tenor</span>
                                    <span className="fw-bold text-dark">{calculateTenor(sukuk.startDate, sukuk.maturity)}</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Jenis Bisnis</span>
                                    <span className="fw-bold text-dark">Infrastruktur</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted small">Status Bisnis</span>
                                    <span className="fw-bold text-dark">Berjalan</span>
                                  </div>
                                </div>

                                <div className="mt-auto">
                                  <button
                                    className="btn btn-invest w-100 py-2 rounded-3 fw-bold"
                                    onClick={() => handleInvestSukuk(sukuk.id)}
                                  >
                                    Detail Sukuk
                                  </button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        )})}
                      </Row>
                    </div>
                    {sukukList.length === 0 && (
                      <div className="text-center py-5 text-muted">
                        Tidak ada produk sukuk tersedia saat ini
                      </div>
                    )}
                  </Tab>

                  <Tab
                    eventKey="portofolio"
                    title={
                      <div className="d-flex align-items-center gap-2">
                        <FaWallet />
                        <span>Portofolio Saya</span>
                      </div>
                    }
                  >
                    <h5 className="fw-bold mb-3 mt-2 text-dark">Portofolio Investasi Anda</h5>
                    <div className="mt-3">
                      <Row>
                        {activePortofolio.map((item) => (
                          <Col lg={4} md={6} sm={12} key={item.id} className="mb-4">
                            <Card className="h-100 shadow-sm border-0 sukuk-item-card">
                              <Card.Body className="d-flex flex-column p-4">
                                <div className="d-flex justify-content-between align-items-start mb-3">
                                  <div>
                                    <h5 className="fw-bold text-dark mb-1">{item.name}</h5>
                                    <small className="text-muted">Tgl Beli: {formatDate(item.purchaseDate)}</small>
                                  </div>
                                  <span className="badge-soft-success px-2 py-1">Aktif</span>
                                </div>
                                
                                <div className="sukuk-details mb-4 flex-grow-1">
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Unit Dimiliki</span>
                                    <span className="fw-bold text-dark">{item.units}</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Harga Beli</span>
                                    <span className="fw-bold text-dark">{item.purchasePrice}%</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="text-muted small">Nilai Saat Ini</span>
                                    <span className="fw-bold text-dark">{item.currentValue}%</span>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="text-muted small">Keuntungan</span>
                                    <span className="fw-bold text-success">+{item.profit}%</span>
                                  </div>
                                </div>

                                <div className="mt-auto">
                                  <button
                                    className="btn-redeem w-100 py-2 rounded-3 fw-bold"
                                    onClick={() => handleRedeem(item.id)}
                                  >
                                    Pencairan Dana
                                  </button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                    {activePortofolio.length === 0 && (
                      <div className="text-center py-5 text-muted">
                        Anda belum memiliki portofolio sukuk
                      </div>
                    )}
                  </Tab>
                </Tabs>

                <div className="mt-4 pt-3 border-top text-end">
                  <button
                    className="btn btn-light px-4 py-2 fw-bold text-muted"
                    onClick={handleBack}
                    style={{ borderRadius: '8px' }}
                  >
                    Kembali ke Pusat
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InvestasiHalal;
