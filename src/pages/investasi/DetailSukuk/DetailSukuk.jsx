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
import LayoutGlobal from "../../../components/layout/components/LayoutGlobal";
import { FaCertificate, FaArrowLeft } from "react-icons/fa";

const DetailSukuk = () => {
  const navigate = useNavigate();
  const [sukukData, setSukukData] = useState(null);
  const [formData, setFormData] = useState({
    nominal: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get sukukId from URL
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      const sukukId = decoded?.sukukId;

      // TODO: Fetch sukuk data from API
      // fetchSukukData(sukukId);

      // Mock data
      setTimeout(() => {
        setSukukData({
          id: sukukId || 1,
          name: "Sukuk Ritel SR016",
          issuer: "Pemerintah RI",
          type: "Sukuk Ritel",
          coupon: "6.50%",
          maturity: "2027-03-15",
          minInvestment: 1000000,
          price: 102.5,
          description:
            "Sukuk Ritel pemerintah dengan imbal hasil tetap dan risiko rendah",
          riskLevel: "Rendah",
          rating: "AAA",
        });
        setLoading(false);
      }, 1000);
    } catch (e) {
      console.error("Error decoding URL:", e);
      setError("Invalid URL");
      setLoading(false);
    }
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

  const handleNominalChange = useCallback((e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, nominal: rawValue }));
    setErrors((prev) => ({ ...prev, nominal: "" }));
  }, []);

  const estimatedUnits = useMemo(() => {
    if (!sukukData || !formData.nominal) return 0;
    const nominal = parseInt(formData.nominal, 10) || 0;
    const price = sukukData.price;
    return Math.floor(nominal / (price * 10000));
  }, [sukukData, formData.nominal]);

  const estimatedReturn = useMemo(() => {
    if (!sukukData || !formData.nominal) return 0;
    const nominal = parseInt(formData.nominal, 10) || 0;
    const coupon = parseFloat(sukukData.coupon) / 100;
    return nominal * coupon;
  }, [sukukData, formData.nominal]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const nominal = parseInt(formData.nominal, 10) || 0;

    if (!formData.nominal || nominal < sukukData?.minInvestment) {
      newErrors.nominal = `Minimal investasi: Rp ${formatCurrency(sukukData?.minInvestment)}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, sukukData, formatCurrency]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setError(null);

    try {
      // TODO: Call API to submit investment
      // const response = await InvestasiService.submitInvestment({
      //   sukuk_id: sukukData.id,
      //   nominal: parseInt(formData.nominal, 10),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to waiting approval page
      const token = jwtEncode({
        page: "investasiHalal",
      });
      navigate(`/${token}`);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Gagal mengirim pengajuan investasi",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "investasiHalal" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <LayoutGlobal title="Detail Sukuk">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Memuat detail sukuk...</p>
        </div>
      </LayoutGlobal>
    );
  }

  if (error) {
    return (
      <LayoutGlobal title="Detail Sukuk">
        <Container className="mt-4">
          <Alert variant="danger">{error}</Alert>
          <Button onClick={handleBack}>Kembali</Button>
        </Container>
      </LayoutGlobal>
    );
  }

  return (
    <LayoutGlobal title="Detail Sukuk">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaCertificate className="me-2" />
            Detail Sukuk
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {/* Sukuk Info Card */}
            <Card className="shadow-lg border-0 mb-4">
              <Card.Body className="p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <h4 className="fw-bold mb-2">{sukukData.name}</h4>
                    <p className="text-muted mb-0">{sukukData.issuer}</p>
                  </div>
                  <Badge bg="success" className="px-3 py-2">
                    {sukukData.status === "available"
                      ? "Tersedia"
                      : "Tidak Tersedia"}
                  </Badge>
                </div>

                <Row className="g-3 mb-4">
                  <Col md={6}>
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1 small">Tipe</p>
                      <p className="fw-bold mb-0">{sukukData.type}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1 small">Kupon</p>
                      <p className="fw-bold text-success mb-0">
                        {sukukData.coupon}
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1 small">Jatuh Tempo</p>
                      <p className="fw-bold mb-0">
                        {formatDate(sukukData.maturity)}
                      </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1 small">Harga</p>
                      <p className="fw-bold mb-0">{sukukData.price}%</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1 small">Rating</p>
                      <p className="fw-bold mb-0">{sukukData.rating}</p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1 small">Tingkat Risiko</p>
                      <p className="fw-bold mb-0">{sukukData.riskLevel}</p>
                    </div>
                  </Col>
                </Row>

                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Deskripsi</h6>
                  <p className="text-muted">{sukukData.description}</p>
                </div>
              </Card.Body>
            </Card>

            {/* Investment Form */}
            <Card className="shadow-lg border-0">
              <Card.Body className="p-4 p-md-5">
                <h5 className="fw-bold mb-4">Formulir Investasi</h5>

                {error && (
                  <Alert variant="danger" className="mb-4">
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold" htmlFor="nominal">
                      Nominal Investasi
                      <span className="text-muted ms-2 small">
                        (Min: Rp {formatCurrency(sukukData.minInvestment)})
                      </span>
                    </Form.Label>
                    <Form.Control
                      id="nominal"
                      type="text"
                      value={
                        formData.nominal
                          ? `Rp ${formatCurrency(formData.nominal)}`
                          : ""
                      }
                      onChange={handleNominalChange}
                      placeholder="Contoh: Rp 1.000.000"
                      isInvalid={!!errors.nominal}
                      disabled={submitting}
                      inputMode="numeric"
                      aria-describedby="nominal-error"
                    />
                    <Form.Control.Feedback id="nominal-error" type="invalid">
                      {errors.nominal}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Investment Summary */}
                  {formData.nominal && (
                    <Card className="bg-light border-0 mb-4">
                      <Card.Body className="p-3">
                        <h6 className="fw-bold mb-3">Estimasi Investasi</h6>
                        <Row className="g-3">
                          <Col md={6}>
                            <p className="text-muted mb-1 small">
                              Unit yang Diperoleh
                            </p>
                            <p className="fw-bold mb-0">
                              {estimatedUnits} unit
                            </p>
                          </Col>
                          <Col md={6}>
                            <p className="text-muted mb-1 small">
                              Estimasi Imbal Hasil/Tahun
                            </p>
                            <p className="fw-bold text-success mb-0">
                              Rp {formatCurrency(estimatedReturn)}
                            </p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  )}

                  <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                    <Button
                      variant="light"
                      className="px-4 py-2 fw-bold text-muted"
                      onClick={handleBack}
                      disabled={submitting}
                    >
                      <FaArrowLeft className="me-2" />
                      Kembali
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-5 py-2 fw-bold shadow-sm"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Memproses...
                        </>
                      ) : (
                        "Investasi Sekarang"
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LayoutGlobal>
  );
};

export default DetailSukuk;
