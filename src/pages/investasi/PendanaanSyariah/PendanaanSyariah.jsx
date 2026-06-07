import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
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
  FaInfoCircle
} from "react-icons/fa";
import { usePendanaanData } from "./hooks/usePendanaanData";

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
      <div className="row page-titles pt-4 pb-4 border-bottom mb-4 mx-0 bg-white shadow-sm">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold d-flex align-items-center">
            <div className="bg-primary bg-opacity-10 text-primary p-2 rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
              <FaStore size={24} />
            </div>
            Pendanaan Syariah UMKM
          </h3>
          <p className="text-muted mt-2 mb-0 ms-5 ps-2">Dukung pertumbuhan UMKM melalui pendanaan berbasis syariah</p>
        </div>
      </div>

      <Container fluid className="px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
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
              <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
                <Card.Body className="p-5 text-center position-relative">
                  <div className="position-absolute top-0 start-50 translate-middle-x bg-primary bg-opacity-10 w-100" style={{ height: '120px', borderRadius: '0 0 50% 50%' }}></div>
                  <div className="text-primary mb-4 position-relative z-1 mt-4" style={{ fontSize: "72px" }}>
                    <FaStore className="drop-shadow" />
                  </div>
                  <h3 className="fw-bold mb-3 text-dark mt-4">Mulai Ajukan Pendanaan</h3>
                  <p className="text-muted mb-4 mx-auto fs-5" style={{ maxWidth: '600px' }}>
                    Anda belum memiliki pengajuan pendanaan aktif. Ajukan pendanaan baru
                    untuk usaha Anda dan dapatkan bantuan permodalan dengan prinsip syariah.
                  </p>
                  <Button
                    variant="primary"
                    className="px-5 py-3 fs-5 fw-bold rounded-pill shadow-lg mt-2 transition-all"
                    onClick={handlePengajuanBaru}
                  >
                    <FaPlus className="me-2 mb-1" />
                    Ajukan Pendanaan Sekarang
                  </Button>
                </Card.Body>
              </Card>
            ) : pengajuanData?.status === 'PENDING' || pengajuanData?.status === 'REVIEW' ? (
              // Status: Menunggu Approval
              <Card className="shadow-sm border-0 mb-4 rounded-4 overflow-hidden">
                <Card.Header className="bg-warning bg-gradient text-white p-4 border-bottom-0">
                  <h4 className="mb-0 fw-bold d-flex align-items-center">
                    <FaClock className="me-3 fs-3" /> Pengajuan Dalam Proses
                  </h4>
                </Card.Header>
                <Card.Body className="p-5">
                  <div className="text-center mb-5">
                    <Spinner animation="grow" variant="warning" className="mb-4 shadow-sm" style={{ width: '5rem', height: '5rem' }} />
                    <h3 className="fw-bold mb-3 text-dark">Pengajuan Anda Sedang Dievaluasi</h3>
                    <p className="text-muted mx-auto fs-5" style={{ maxWidth: '600px' }}>
                      Mohon bersabar, pengajuan pendanaan Anda saat ini berada pada tahap:<br/>
                      <Badge bg="warning" text="dark" className="fs-6 mt-3 px-4 py-2 rounded-pill shadow-sm">
                        {pengajuanData?.currentStep?.step_name || 'Menunggu Reviewer'}
                      </Badge>
                    </p>
                  </div>

                  {pengajuanData?.approvalChain && pengajuanData.approvalChain.length > 0 && (
                    <div className="mt-5 mx-auto" style={{ maxWidth: '600px' }}>
                      <h5 className="fw-bold mb-4 text-dark d-flex align-items-center">
                        <FaCheckCircle className="text-success me-2" /> Riwayat Persetujuan
                      </h5>
                      <div className="bg-white border rounded-4 p-4 shadow-sm">
                        {pengajuanData.approvalChain.map((step, idx) => (
                          <div key={idx} className={`d-flex align-items-start ${idx !== pengajuanData.approvalChain.length - 1 ? 'mb-4 position-relative' : ''}`}>
                            {idx !== pengajuanData.approvalChain.length - 1 && (
                              <div className="position-absolute bg-light" style={{ width: '2px', height: '100%', left: '15px', top: '30px', zIndex: 0 }}></div>
                            )}
                            <div className="position-relative z-1 bg-white" style={{ paddingRight: '15px' }}>
                              {step.decision === 'APPROVED' ? (
                                <FaCheckCircle className="text-success fs-4" />
                              ) : step.decision === 'REJECTED' ? (
                                <FaTimesCircle className="text-danger fs-4" />
                              ) : (
                                <FaClock className="text-warning fs-4" />
                              )}
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="fw-bold text-dark">{step.role || step.stepName}</span>
                                <Badge bg={step.decision === 'APPROVED' ? 'success' : step.decision === 'REJECTED' ? 'danger' : 'warning'} className="rounded-pill">
                                  {step.decision || 'PENDING'}
                                </Badge>
                              </div>
                              {step.approverName ? (
                                <p className="text-muted small mb-0">Ditinjau oleh: {step.approverName}</p>
                              ) : (
                                <p className="text-muted small mb-0 fst-italic">Menunggu tinjauan</p>
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
              <Card className="shadow-lg border-0 mb-4 rounded-4 overflow-hidden">
                <Card.Header className="bg-primary bg-gradient text-white p-4 border-bottom-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 fw-bold d-flex align-items-center">
                      <FaWallet className="me-3 fs-3" /> Informasi Rekening Pendanaan
                    </h4>
                    <Badge bg="light" text="primary" className="px-3 py-2 rounded-pill fw-bold fs-6 shadow-sm">
                      Aktif
                    </Badge>
                  </div>
                </Card.Header>
                <Card.Body className="p-4 p-md-5 bg-light">
                  <Row className="gy-4 mb-5">
                    <Col md={6}>
                      <div className="p-4 bg-white border rounded-4 h-100 shadow-sm transition-hover">
                        <span className="text-muted d-block mb-2 small fw-semibold text-uppercase tracking-wider">Nama Anggota</span>
                        <span className="fw-bold fs-4 text-dark">{pengajuanData?.member?.full_name || pengajuanData?.nama_nasabah || "-"}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 bg-white border rounded-4 h-100 shadow-sm transition-hover">
                        <span className="text-muted d-block mb-2 small fw-semibold text-uppercase tracking-wider">Akad</span>
                        <span className="fw-bold fs-4 text-dark">{pengajuanData?.akad_type || "Mudharabah"}</span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 bg-white border rounded-4 h-100 shadow-sm transition-hover">
                        <span className="text-muted d-block mb-2 small fw-semibold text-uppercase tracking-wider">Tanggal Buka</span>
                        <span className="fw-bold fs-4 text-dark">
                          {pengajuanData?.createdAt ? new Date(pengajuanData.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : pengajuanData?.created_at ? new Date(pengajuanData.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' }) : "-"}
                        </span>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="p-4 bg-primary bg-opacity-10 border border-primary border-opacity-25 rounded-4 h-100 shadow-sm transition-hover">
                        <span className="text-primary d-block mb-2 small fw-bold text-uppercase tracking-wider">Saldo Akhir (Pembiayaan)</span>
                        <span className="fw-bold fs-3 text-primary">
                          Rp {formatCurrency(pengajuanData?.amount_requested || pengajuanData?.nominal_kredit || 0)}
                        </span>
                      </div>
                    </Col>
                  </Row>
                  
                  <div className="d-flex flex-column flex-md-row gap-3 pt-2">
                    <Button variant="success" className="px-4 py-3 fw-bold rounded-pill shadow-sm flex-grow-1 d-flex align-items-center justify-content-center fs-5 transition-transform hover-scale">
                      <FaMoneyBillWave className="me-2" /> Setoran
                    </Button>
                    <Button variant="primary" className="px-4 py-3 fw-bold rounded-pill shadow-sm flex-grow-1 d-flex align-items-center justify-content-center fs-5 transition-transform hover-scale" onClick={handleViewPortofolio}>
                      <FaBriefcase className="me-2" /> Portofolio
                    </Button>
                    <Button variant="outline-primary" className="px-4 py-3 fw-bold rounded-pill shadow-sm flex-grow-1 d-flex align-items-center justify-content-center fs-5 transition-transform hover-scale bg-white" onClick={handlePengajuanBaru}>
                      <FaFileSignature className="me-2" /> Pengajuan Baru
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            <div className="text-center mt-5">
              <Button
                variant="outline-secondary"
                className="px-5 py-2 fw-medium rounded-pill shadow-sm"
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
