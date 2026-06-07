import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import { FaCertificate, FaArrowLeft, FaShieldAlt, FaChartLine } from "react-icons/fa";
import { useDetailSukuk } from "./hooks/useDetailSukuk";
import "./DetailSukuk.css";

const DetailSukuk = () => {
  const navigate = useNavigate();
  const { sukukData, loading, error: fetchError, submitting, fetchSukukDetail, submitInvestment } = useDetailSukuk();
  
  const [formData, setFormData] = useState({ nominal: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      const sukukId = decoded?.sukukId;
      if (sukukId) {
        fetchSukukDetail(sukukId);
      } else {
        setSubmitError("ID Sukuk tidak ditemukan pada URL");
      }
    } catch (e) {
      console.error("Error decoding URL:", e);
      setSubmitError("URL tidak valid");
    }
  }, [fetchSukukDetail]);

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

  const calculateTenor = useCallback((start, end) => {
    if (!start || !end) return "-";
    const startDate = new Date(start);
    const endDate = new Date(end);
    let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
    months -= startDate.getMonth();
    months += endDate.getMonth();
    return `${months > 0 ? months : 1} Bulan`;
  }, []);

  const handleNominalChange = useCallback((e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, nominal: rawValue }));
    setErrors((prev) => ({ ...prev, nominal: "" }));
  }, []);

  const estimatedUnits = useMemo(() => {
    if (!sukukData || !formData.nominal) return 0;
    const nominal = parseInt(formData.nominal, 10) || 0;
    const price = sukukData.price || 100;
    return Math.floor(nominal / (price * 10000));
  }, [sukukData, formData.nominal]);

  const estimatedReturn = useMemo(() => {
    if (!sukukData || !formData.nominal) return 0;
    const nominal = parseInt(formData.nominal, 10) || 0;
    const couponStr = sukukData.coupon ? sukukData.coupon.replace('%', '') : '0';
    const coupon = parseFloat(couponStr) / 100;
    return nominal * coupon;
  }, [sukukData, formData.nominal]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const nominal = parseInt(formData.nominal, 10) || 0;

    if (!formData.nominal) {
      newErrors.nominal = "Nominal investasi wajib diisi";
    } else if (nominal < sukukData?.minInvestment) {
      newErrors.nominal = `Minimal investasi: Rp ${formatCurrency(sukukData?.minInvestment)}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, sukukData, formatCurrency]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitError(null);

    try {
      const res = await submitInvestment(sukukData.id, parseInt(formData.nominal, 10));
      
      const token = jwtEncode({
        page: "transactionDetailPage",
        financingId: res?.data?.order_id,
        sukukOrder: true,
        return: "investasiHalal",
      });
      navigate(`/${token}`);
    } catch (err) {
      setSubmitError(err?.response?.data?.message || "Gagal mengirim pengajuan investasi");
    }
  };

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "investasiHalal" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Memuat detail sukuk...</p>
      </div>
    );
  }

  if (fetchError && !sukukData) {
    return (
      <Container fluid className="mt-4">
        <Alert variant="danger">{fetchError}</Alert>
        <Button variant="outline-secondary" onClick={handleBack}>Kembali</Button>
      </Container>
    );
  }

  return (
    <div className="sukuk-detail-wrapper">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0 bg-white">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaCertificate className="me-2 text-primary" />
            Detail Sukuk
          </h3>
        </div>
      </div>

      <Container fluid className="px-4">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card className="sukuk-detail-card mb-4">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex flex-wrap justify-content-between align-items-start mb-4">
                  <div className="mb-3 mb-md-0">
                    <h3 className="fw-bold mb-2 text-dark">{sukukData?.name}</h3>
                    <p className="text-muted mb-0 d-flex align-items-center">
                      <FaShieldAlt className="me-2 text-success" />
                      Diterbitkan oleh: <strong>{sukukData?.issuer}</strong>
                    </p>
                  </div>
                  <Badge bg={sukukData?.status === "OPEN" ? "success" : "secondary"} className="px-4 py-2 rounded-pill fs-6">
                    {sukukData?.status === "OPEN" ? "Masa Penawaran" : "Ditutup"}
                  </Badge>
                </div>

                <Row className="g-4 mb-5">
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Kategori</p>
                      <p className="info-value">{sukukData?.type}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Akad Sukuk</p>
                      <p className="info-value text-primary">{sukukData?.type === 'Sukuk Ritel' ? 'Ijarah' : 'Mudharabah'}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Nilai Pendanaan</p>
                      <p className="info-value">Rp {formatCurrency(sukukData?.totalAmount || 0)}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Imbal Hasil / Kupon</p>
                      <p className="info-value text-success d-flex align-items-center">
                        <FaChartLine className="me-2" />
                        {sukukData?.coupon} p.a.
                      </p>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Tenor</p>
                      <p className="info-value fw-bold">{calculateTenor(sukukData?.startDate, sukukData?.maturity)}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Minimum Investasi</p>
                      <p className="info-value">Rp {formatCurrency(sukukData?.minInvestment || 0)}</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Jenis Bisnis</p>
                      <p className="info-value">Infrastruktur</p>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="info-box">
                      <p className="info-label">Status Bisnis</p>
                      <p className="info-value text-success">Berjalan</p>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4">
                  <h5 className="fw-bold mb-3 border-bottom pb-2">Deskripsi Produk</h5>
                  <p className="text-muted lh-lg">{sukukData?.description}</p>
                </div>
              </Card.Body>
            </Card>

            <Card className="sukuk-detail-card mb-5">
              <Card.Body className="p-4 p-md-5">
                <h4 className="fw-bold mb-4 text-dark">Formulir Investasi</h4>

                {(submitError || fetchError) && (
                  <Alert variant="danger" className="mb-4 rounded-3">
                    {submitError || fetchError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark fs-5" htmlFor="nominal">
                      Nominal Pembelian
                      <span className="text-muted ms-2 fs-6 fw-normal">
                        (Minimal: Rp {formatCurrency(sukukData?.minInvestment)})
                      </span>
                    </Form.Label>
                    <Form.Control
                      id="nominal"
                      className="nominal-input"
                      type="text"
                      value={formData.nominal ? `Rp ${formatCurrency(formData.nominal)}` : ""}
                      onChange={handleNominalChange}
                      placeholder="Contoh: Rp 1.000.000"
                      isInvalid={!!errors.nominal}
                      disabled={submitting || sukukData?.status !== "OPEN"}
                      inputMode="numeric"
                    />
                    <Form.Control.Feedback type="invalid" className="fs-6 mt-2">
                      {errors.nominal}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {formData.nominal && !errors.nominal && (
                    <div className="summary-card p-4 mb-4">
                      <h6 className="fw-bold mb-3 text-success">Estimasi Ringkasan Investasi</h6>
                      <Row className="g-3">
                        <Col sm={6}>
                          <p className="text-muted mb-1">Estimasi Imbal Hasil per Tahun</p>
                          <p className="fs-5 fw-bold text-success mb-0">
                            Rp {formatCurrency(estimatedReturn)}
                          </p>
                        </Col>
                        <Col sm={6}>
                          <p className="text-muted mb-1">Total Unit yang Didapat</p>
                          <p className="fs-5 fw-bold mb-0 text-dark">
                            ~{estimatedUnits} unit
                          </p>
                        </Col>
                      </Row>
                    </div>
                  )}

                  <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
                    <Button
                      variant="light"
                      className="px-4 py-2 fw-bold text-secondary rounded-pill"
                      onClick={handleBack}
                      disabled={submitting}
                    >
                      <FaArrowLeft className="me-2" />
                      Kembali
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-invest rounded-pill"
                      disabled={submitting || sukukData?.status !== "OPEN" || !!errors.nominal || !formData.nominal}
                    >
                      {submitting ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Memproses...
                        </>
                      ) : (
                        "Proses Pembelian"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailSukuk;
