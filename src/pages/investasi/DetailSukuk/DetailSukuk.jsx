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
import { motion, AnimatePresence } from "framer-motion";
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
      <Container fluid className="px-0 mt-4">
        <Alert variant="danger">{fetchError}</Alert>
        <Button variant="outline-secondary" onClick={handleBack}>Kembali</Button>
      </Container>
    );
  }

  return (
    <div className="sukuk-detail-wrapper pb-5 px-0">
      <Container fluid className="px-0 mt-4 font-outfit">
        <Row className="g-4">
          <Col lg={7} xl={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="sukuk-detail-card border-0 p-3 p-md-4 mb-4 shadow-sm">
                <Card.Body>
                  <div className="d-flex flex-wrap justify-content-between align-items-start mb-4 pb-3 border-bottom">
                    <div className="d-flex align-items-center mb-3 mb-md-0">
                      <div className="p-3 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                        <FaCertificate size={24} />
                      </div>
                      <div>
                        <h4 className="fw-bold mb-1 text-dark">{sukukData?.name}</h4>
                        <p className="text-muted small mb-0 d-flex align-items-center">
                          <FaShieldAlt className="me-1 text-success" />
                          Diterbitkan oleh: <strong className="ms-1">{sukukData?.issuer}</strong>
                        </p>
                      </div>
                    </div>
                    <Badge bg={sukukData?.status === "OPEN" ? "success" : "secondary"} className="px-4 py-2 rounded-pill fs-6">
                      {sukukData?.status === "OPEN" ? "Masa Penawaran" : "Ditutup"}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <h6 className="fw-bold mb-3">Informasi Pendanaan</h6>
                    <ul className="list-unstyled mb-0 border rounded-3 overflow-hidden">
                      <li className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                        <span className="text-muted small">Kategori</span>
                        <span className="fw-bold text-dark">{sukukData?.type}</span>
                      </li>
                      <li className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
                        <span className="text-muted small">Akad Sukuk</span>
                        <span className="fw-bold text-primary">{sukukData?.type === 'Sukuk Ritel' ? 'Ijarah' : 'Mudharabah'}</span>
                      </li>
                      <li className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                        <span className="text-muted small">Nilai Pendanaan</span>
                        <span className="fw-bold text-dark">Rp {formatCurrency(sukukData?.totalAmount || 0)}</span>
                      </li>
                      <li className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom">
                        <span className="text-muted small">Imbal Hasil / Kupon</span>
                        <span className="fw-bold text-success d-flex align-items-center">
                          <FaChartLine className="me-2" />
                          {sukukData?.coupon} p.a.
                        </span>
                      </li>
                      <li className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                        <span className="text-muted small">Tenor</span>
                        <span className="fw-bold text-dark">{calculateTenor(sukukData?.startDate, sukukData?.maturity)}</span>
                      </li>
                      <li className="d-flex justify-content-between align-items-center p-3 bg-white">
                        <span className="text-muted small">Minimum Investasi</span>
                        <span className="fw-bold text-dark">Rp {formatCurrency(sukukData?.minInvestment || 0)}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="fw-bold mb-3 border-bottom pb-2">Deskripsi Produk</h6>
                    <p className="text-muted lh-lg small">{sukukData?.description || "Deskripsi produk belum tersedia."}</p>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col lg={5} xl={4} className="sticky-summary-column">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="d-flex flex-column gap-4"
            >
              <Card className="sukuk-detail-card border-0 p-4 shadow-sm">
                <div className="form-section-header mb-3">
                  <h5 className="fw-bold font-outfit mb-0 text-dark">
                    Formulir Investasi
                  </h5>
                </div>

                {(submitError || fetchError) && (
                  <Alert variant="danger" className="mb-4 rounded-3 text-sm">
                    {submitError || fetchError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-dark small" htmlFor="nominal">
                      Nominal Pembelian
                      <span className="text-danger ms-1">*</span>
                    </Form.Label>
                    <Form.Control
                      id="nominal"
                      className={`nominal-input bg-light border-0 ${errors.nominal ? "border-danger" : ""}`}
                      type="text"
                      value={formData.nominal ? `Rp ${formatCurrency(formData.nominal)}` : ""}
                      onChange={handleNominalChange}
                      placeholder={`Min: Rp ${formatCurrency(sukukData?.minInvestment)}`}
                      isInvalid={!!errors.nominal}
                      disabled={submitting || sukukData?.status !== "OPEN"}
                      inputMode="numeric"
                    />
                    <AnimatePresence>
                      {errors.nominal && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                          <Form.Control.Feedback type="invalid" className="d-block mt-1">
                            <small className="text-danger fw-bold">{errors.nominal}</small>
                          </Form.Control.Feedback>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Form.Group>

                  {formData.nominal && !errors.nominal && (
                    <div className="summary-card p-3 mb-4 rounded-3 border-0 bg-success bg-opacity-10">
                      <h6 className="fw-bold mb-3 text-success">Estimasi Ringkasan Investasi</h6>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted small">Imbal Hasil Tahunan</span>
                        <span className="fw-bold text-success">Rp {formatCurrency(estimatedReturn)}</span>
                      </div>
                      <div className="d-flex justify-content-between border-top pt-2 mt-2">
                        <span className="text-muted small">Total Unit Didapat</span>
                        <span className="fw-bold text-dark">~{estimatedUnits} unit</span>
                      </div>
                    </div>
                  )}

                  <div className="d-grid gap-2 mt-4 pt-2 border-top">
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-invest w-100 py-3 shadow-md border-0 d-flex align-items-center justify-content-center"
                      disabled={submitting || sukukData?.status !== "OPEN" || !!errors.nominal || !formData.nominal}
                    >
                      {submitting ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          <span className="fw-bold">Memproses...</span>
                        </>
                      ) : (
                        <span className="fw-bold">Proses Pembelian</span>
                      )}
                    </Button>
                    <Button
                      variant="light"
                      className="w-100 py-2 fw-bold text-muted border-0 shadow-sm mt-2"
                      onClick={handleBack}
                      disabled={submitting}
                    >
                      Batal & Kembali
                    </Button>
                  </div>
                </Form>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailSukuk;

