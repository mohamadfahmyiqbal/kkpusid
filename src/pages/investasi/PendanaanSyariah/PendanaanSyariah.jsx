import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  
  Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import { 
  FaStore, 
  FaPlus, 
  FaWallet, 
  FaSyncAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaFileSignature,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaInfoCircle,
  FaHistory
} from "react-icons/fa";
import { usePendanaanData } from "./hooks/usePendanaanData";
import Alert from "../../../components/ui/SwalAlert";


const PendanaanSyariah = () => {
  const navigate = useNavigate();
  const {
    pengajuanData,
    hasPengajuan,
    loading,
    error,
    refreshData,
  } = usePendanaanData();

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  const handlePengajuanBaru = useCallback(() => {
    const token = jwtEncode({ page: "formPendanaanSyariah" });
    navigate(`/${token}`);
  }, [navigate]);

  const handleViewPortofolio = useCallback(() => {
    // TODO: Navigate to portofolio page
  }, []);

  const handleSetoran = useCallback(() => {
    if (!pengajuanData?.financing_id) return;
    const token = jwtEncode({ 
      page: "billingPage", 
      return: "investasiPage", 
      category: "FINANCING",
      financingId: pengajuanData.financing_id,
      productName: pengajuanData.category || "Pembiayaan"
    });
    navigate(`/${token}`);
  }, [navigate, pengajuanData]);

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "investasiPage" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted fw-semibold">Memuat data pendanaan...</p>
      </div>
    );
  }

  return (
    <div className="investasi-wrapper pb-5 bg-light min-vh-100">
     
      <Container fluid className="px-0 mt-4 font-outfit">
        <Row>
          <Col lg={12}>
            {error && (
              <Alert variant="danger" className="mb-4 shadow-sm border-0 rounded-4 d-flex align-items-center justify-content-between p-4">
                <div className="d-flex align-items-center">
                  <FaInfoCircle className="fs-4 me-3" />
                  <span className="fw-medium">{error}</span>
                </div>
                <Button size="sm" variant="outline-danger" className="rounded-pill px-3" onClick={refreshData}>
                  <FaSyncAlt className="me-2" /> Coba Lagi
                </Button>
              </Alert>
            )}

            {!hasPengajuan ? (
              // Status: Belum memiliki pengajuan
              <Card
                className="premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card mb-4"
                style={{ 
                  background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)", 
                  boxShadow: "0 20px 40px -10px rgba(7, 89, 133, 0.3)",
                  borderRadius: "16px"
                }}
              >
                <div className="glass-sheen" />
                <Card.Body className="p-4 p-md-5 relative card-body-front text-center">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect bg-white bg-opacity-10 border border-white border-opacity-25">
                      <FaStore size={14} className="text-light" />
                      <span className="fw-bold tracking-wider card-type-label" style={{ letterSpacing: '1px', fontSize: '11px' }}>PENGAJUAN BARU</span>
                    </div>
                  </div>
                  <div className="text-white mb-3" style={{ fontSize: "60px" }}>
                    <FaStore className="opacity-75" />
                  </div>
                  <h3 className="fw-bold mb-3 text-white">Mulai Ajukan Pendanaan</h3>
                  <p className="text-white opacity-75 mb-4 mx-auto" style={{ maxWidth: '600px' }}>
                    Anda belum memiliki pengajuan pendanaan aktif. Ajukan pendanaan baru untuk usaha Anda dan dapatkan bantuan permodalan dengan prinsip syariah yang adil dan menentramkan.
                  </p>
                  <Button
                    variant="light"
                    className="px-4 py-2 fw-bold rounded-pill text-primary shadow-sm transition-transform hover-scale mt-2"
                    onClick={handlePengajuanBaru}
                  >
                    <FaPlus className="me-2 mb-1" />
                    Ajukan Pendanaan Sekarang
                  </Button>
                </Card.Body>
              </Card>
            ) : pengajuanData?.status === 'PENDING' || pengajuanData?.status === 'REVIEW' ? (
              // Status: Menunggu Approval
              <Card
                className="premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card mb-4"
                style={{ 
                  background: "linear-gradient(135deg, #92400e 0%, #d97706 40%, #f59e0b 100%)", 
                  boxShadow: "0 20px 40px -10px rgba(217, 119, 6, 0.3)",
                  borderRadius: "16px"
                }}
              >
                <div className="glass-sheen" />
                <Card.Body className="p-4 p-md-5 relative card-body-front">
                   <div className="d-flex justify-content-center mb-4">
                    <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect bg-white bg-opacity-10 border border-white border-opacity-25">
                      <FaHistory size={14} className="text-light" />
                      <span className="fw-bold tracking-wider card-type-label" style={{ letterSpacing: '1px', fontSize: '11px' }}>STATUS PENGAJUAN</span>
                    </div>
                  </div>
                  <div className="text-center mb-5">
                    <h3 className="fw-bold mb-3 text-white">Pengajuan Dalam Proses</h3>
                    <p className="text-white opacity-75 mx-auto" style={{ maxWidth: '650px' }}>
                      Pengajuan <strong>{pengajuanData.category || "Pembiayaan"}</strong> Anda sedang dalam tahap tinjauan pengurus. 
                      Berikut adalah detail status persetujuan saat ini:
                    </p>
                  </div>

                  {pengajuanData?.approvalChain && pengajuanData.approvalChain.length > 0 && (
                    <div className="mx-auto" style={{ maxWidth: '800px' }}>
                      <h5 className="fw-bold mb-4 text-white d-flex align-items-center">
                        <FaCheckCircle className="text-white opacity-75 me-2" /> Riwayat Persetujuan
                      </h5>
                      <div className="bg-white bg-opacity-10 border border-white border-opacity-25 rounded-4 p-4 shadow-sm text-start">
                        {pengajuanData.approvalChain.map((step, idx) => (
                          <div key={idx} className={`d-flex align-items-start ${idx !== pengajuanData.approvalChain.length - 1 ? 'mb-4 position-relative' : ''}`}>
                            {idx !== pengajuanData.approvalChain.length - 1 && (
                              <div className="position-absolute bg-white bg-opacity-25" style={{ width: '2px', height: '100%', left: '15px', top: '30px', zIndex: 0 }}></div>
                            )}
                            <div className="position-relative z-1" style={{ paddingRight: '15px' }}>
                              {step.decision === 'APPROVED' ? (
                                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><FaCheckCircle className="text-white" /></div>
                              ) : step.decision === 'REJECTED' ? (
                                <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><FaTimesCircle className="text-white" /></div>
                              ) : (
                                <div className="bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}><FaClock className="text-white" /></div>
                              )}
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="fw-bold text-white fs-5">{step.role || step.stepName}</span>
                                <Badge bg={step.decision === 'APPROVED' ? 'success' : step.decision === 'REJECTED' ? 'danger' : 'light'} className={step.decision === 'PENDING' || !step.decision ? 'text-dark rounded-pill px-3 py-2' : 'rounded-pill px-3 py-2'}>
                                  {step.decision || 'PENDING'}
                                </Badge>
                              </div>
                              {step.approverName ? (
                                <p className="text-white opacity-75 mb-0">Ditinjau oleh: <strong>{step.approverName}</strong></p>
                              ) : (
                                <p className="text-white opacity-50 mb-0 fst-italic">Menunggu tinjauan</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ) : (
              // Status: Memiliki pendanaan aktif (Approved / Active)
              <Card
                className="premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card mb-4"
                style={{ 
                  background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)", 
                  boxShadow: "0 20px 40px -10px rgba(7, 89, 133, 0.3)",
                  borderRadius: "16px"
                }}
              >
                <div className="glass-sheen" />
                <Card.Body className="p-4 p-md-5 relative card-body-front">
                  {/* Card Top */}
                  <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect bg-white bg-opacity-10 border border-white border-opacity-25 mb-2 mb-md-0">
                      <FaWallet size={14} className="text-light" />
                      <span className="fw-bold tracking-wider card-type-label" style={{ letterSpacing: '1px', fontSize: '11px' }}>REKENING PENDANAAN</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Badge bg="light" text="primary" className="px-3 py-1 rounded-pill fw-bold" style={{ fontSize: '12px' }}>
                        AKTIF
                      </Badge>
                    </div>
                  </div>

                  {/* Saldo Display */}
                  <div className="dc-saldo-display mb-4">
                    <div className="small text-white-50 mb-1 fw-medium">Nilai Pembiayaan</div>
                    <h1 className="fw-bold mb-0 text-white font-outfit" style={{ fontSize: '3rem' }}>
                      Rp {formatCurrency(pengajuanData?.amount_requested || pengajuanData?.nominal_kredit || 0)}
                    </h1>
                  </div>

                  {/* Info Details */}
                  <div className="row g-4 mb-5 pt-4 border-top border-white border-opacity-25 text-start">
                    <div className="col-sm-6 col-md-4">
                      <div className="text-uppercase text-white-50 fw-bold mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>NAMA ANGGOTA</div>
                      <div className="fw-bold text-white fs-5">{pengajuanData?.member?.full_name || pengajuanData?.nama_nasabah || "-"}</div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <div className="text-uppercase text-white-50 fw-bold mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>AKAD</div>
                      <div className="fw-bold text-white fs-5">{pengajuanData?.akad_type || "Mudharabah"}</div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <div className="text-uppercase text-white-50 fw-bold mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>TANGGAL BUKA</div>
                      <div className="fw-bold text-white fs-5">
                        {pengajuanData?.createdAt ? new Date(pengajuanData.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : pengajuanData?.created_at ? new Date(pengajuanData.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-flex flex-wrap gap-2 pt-4 border-top border-white border-opacity-25 justify-content-start">
                    <Button variant="light" className="px-4 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center text-primary transition-transform hover-scale" onClick={handleSetoran}>
                      <FaMoneyBillWave className="me-2" /> Setoran
                    </Button>
                    <Button variant="outline-light" className="px-4 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center transition-transform hover-scale" onClick={handleViewPortofolio}>
                      <FaBriefcase className="me-2" /> Portofolio
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            <div className="text-center mt-5 mb-3">
              <Button
                variant="light"
                className="px-5 py-3 fw-bold text-secondary rounded-pill shadow-sm bg-white hover-scale border"
                onClick={handleBack}
              >
                Kembali ke Pusat Investasi
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      
      <style>{`
        .tracking-wider { letter-spacing: 0.05em; }
        .transition-hover { transition: all 0.3s ease; }
        .transition-hover:hover { transform: translateY(-5px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
};

export default PendanaanSyariah;
