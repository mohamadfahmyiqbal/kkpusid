import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import {
  Form,
  Spinner,
  ProgressBar,
  Row,
  Col,
  Container
} from "react-bootstrap";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import { FaKaaba, FaGraduationCap, FaUtensils, FaExclamationTriangle } from "react-icons/fa";
import { TabunganService } from "../../../services/tabungan.service";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../../components/layout/contexts";
import "./FormPengajuanTabungan.css";
import Alert from "../../../components/ui/SwalAlert";


const getIconForCategory = (category) => {
  const cat = category?.toLowerCase() || '';
  if (cat.includes('haji')) return FaKaaba;
  if (cat.includes('umrah')) return FaKaaba;
  if (cat.includes('pendidikan')) return FaGraduationCap;
  if (cat.includes('qurban')) return FaUtensils;
  return FaKaaba;
};

const FormPengajuanTabungan = () => {
  const navigate = useNavigate();
  const firstInputRef = useRef(null);
  const { userData } = useProfile();

  const [programData, setProgramData] = useState(null);
  const [formData, setFormData] = useState({
    monthly_deposit: "",
    term_months: "",
    akadAgreed: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      if (decoded?.program) {
        setProgramData(decoded.program);
      }
    } catch (e) {
      console.error("Error decoding URL:", e);
    }
  }, []);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const formatCurrency = useCallback((value) => {
    if (!value && value !== 0) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  const parseCurrency = useCallback((value) => {
    return value.replace(/\D/g, "");
  }, []);

  const handleSetoranChange = useCallback(
    (e) => {
      const rawValue = parseCurrency(e.target.value);
      setFormData((prev) => ({
        ...prev,
        monthly_deposit: rawValue,
      }));
      setErrors((prev) => ({ ...prev, monthly_deposit: "" }));
    },
    [parseCurrency]
  );

  const handleTermChange = useCallback(
    (e) => {
      const val = e.target.value.replace(/\D/g, "");
      setFormData((prev) => ({
        ...prev,
        term_months: val,
      }));
      setErrors((prev) => ({ ...prev, term_months: "" }));
    },
    []
  );

  const handleAkadChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      akadAgreed: e.target.checked,
    }));
  }, []);

  const calculatedTarget = useMemo(() => {
    const deposit = parseInt(formData.monthly_deposit, 10) || 0;
    const term = parseInt(formData.term_months, 10) || 0;
    return deposit * term;
  }, [formData.monthly_deposit, formData.term_months]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const setoran = parseInt(formData.monthly_deposit, 10) || 0;
    const term = parseInt(formData.term_months, 10) || 0;
    
    if (setoran <= 0) {
      newErrors.monthly_deposit = "Setoran bulanan harus lebih dari 0";
    }

    if (term <= 0) {
      newErrors.term_months = "Durasi harus lebih dari 0";
    }

    if (!formData.akadAgreed) {
      newErrors.akadAgreed = "Anda harus menyetujui akad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const payload = {
        saving_target_id: programData.saving_target_id,
        monthly_deposit: parseInt(formData.monthly_deposit, 10),
        term_months: parseInt(formData.term_months, 10),
      };

      const response = await TabunganService.submitApplication(payload);
      const responseData = response?.data?.data || response?.data || {};
      const applicationId = responseData.member_saving_target_id || responseData.id || null;

      const mappedData = {
        id: applicationId,
        amount: calculatedTarget,
        item_price: payload.monthly_deposit,
        cooperation_months: payload.term_months,
        purpose: programData.target_name,
        item_name: programData.target_name,
        account_type: "Simpanan Target",
        akad_type: "Wadiah",
        method: "Autodebet - Setoran",
        status: "PENDING",
        created_at: new Date().toISOString(),
        is_approved_pengawas: false,
        is_approved_ketua: false,
        is_approved_bendahara: false,
        is_rejected: false,
        member: {
          full_name: responseData?.member?.full_name || responseData?.member_name || userData?.name || "-",
          member_code: responseData?.member?.member_code || responseData?.member_no || "-",
          member_type: "Reguler",
        },
        bank_name: responseData?.bank_name || "-",
        bank_account_name: responseData?.bank_account_name || "-",
        bank_account_no: responseData?.bank_account_no || "-",
        catalog: {
          target_name: programData.target_name,
          category: programData.category,
          target_amount: calculatedTarget,
          term_months: payload.term_months
        }
      };

      const token = jwtEncode({
        page: "transactionDetailPage",
        tabunganId: applicationId,
        return: "tabunganPage",
        product: programData.target_name,
        data: mappedData,
      });
      navigate(`/${token}`);
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message || "Gagal mengirim pengajuan"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "tabunganPage" });
    navigate(`/${token}`);
  }, [navigate]);

  if (!programData) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Memuat Data Program...</p>
      </Container>
    );
  }

  const ProductIcon = getIconForCategory(programData.category);

  return (
    <div className="form-pengajuan-page pb-5 px-0">
      <Container fluid className="px-0 mt-4 font-outfit">
        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-4">
            {/* LEFT COLUMN: Input Fields */}
            <Col lg={7} xl={8}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="form" className="p-3 p-md-4 mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                      <div className="p-3 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                        <ProductIcon size={24} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1 text-dark">{programData.target_name}</h5>
                        <p className="text-muted small mb-0">Program Tabungan Koperasi</p>
                      </div>
                    </div>

                    {submitError && (
                      <Alert variant="danger" className="mb-4 d-flex align-items-center" dismissible onClose={() => setSubmitError(null)}>
                        <FaExclamationTriangle className="me-2" />
                        {submitError}
                      </Alert>
                    )}

                    <div className="form-section-header mb-4">
                      <h6 className="fw-bold font-outfit mb-0 text-dark">
                        Detail Program Simpanan
                      </h6>
                    </div>

                    <Row className="mb-4">
                      <Col md={12}>
                        <div className="p-3 bg-light rounded-3 mb-3 mb-md-0 border">
                          <span className="small text-muted d-block mb-1">Target Nominal (Otomatis dari Setoran Bulanan × Durasi)</span>
                          <span className="fw-bold text-dark fs-5">Rp {formatCurrency(calculatedTarget)}</span>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mb-4">
                      <Col md={6}>
                        <Form.Group className="custom-input-group">
                          <Form.Label className="form-label d-flex align-items-center fw-semibold">
                            Setoran Bulanan
                            <span className="text-danger ms-1">*</span>
                          </Form.Label>
                          <Form.Control
                            ref={firstInputRef}
                            type="text"
                            name="monthly_deposit"
                            value={formData.monthly_deposit ? `Rp ${formatCurrency(formData.monthly_deposit)}` : ""}
                            onChange={handleSetoranChange}
                            placeholder="Contoh: Rp 500.000"
                            className={`custom-flat-input ${errors.monthly_deposit ? "border-danger error-shake" : ""}`}
                            isInvalid={!!errors.monthly_deposit}
                            disabled={loading}
                            inputMode="numeric"
                          />
                          <AnimatePresence>
                            {errors.monthly_deposit && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                                <Form.Control.Feedback type="invalid" className="d-block mt-1">
                                  <small className="text-danger fw-bold">{errors.monthly_deposit}</small>
                                </Form.Control.Feedback>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="custom-input-group">
                          <Form.Label className="form-label d-flex align-items-center fw-semibold">
                            Durasi Program (Bulan)
                            <span className="text-danger ms-1">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="term_months"
                            value={formData.term_months}
                            onChange={handleTermChange}
                            placeholder="Contoh: 12"
                            className={`custom-flat-input ${errors.term_months ? "border-danger error-shake" : ""}`}
                            isInvalid={!!errors.term_months}
                            disabled={loading}
                            inputMode="numeric"
                          />
                          <AnimatePresence>
                            {errors.term_months && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                                <Form.Control.Feedback type="invalid" className="d-block mt-1">
                                  <small className="text-danger fw-bold">{errors.term_months}</small>
                                </Form.Control.Feedback>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Akad details card */}
                <Card variant="form" className="p-3 p-md-4">
                  <Card.Body>
                    <div className="form-section-header">
                      <h6 className="fw-bold font-outfit mb-0 text-dark">
                        Akad Perjanjian (Wadiah)
                      </h6>
                    </div>
                    <p className="small text-muted mb-0 mt-3 leading-relaxed font-plus-jakarta">
                      Dengan menyetujui, Anda menyatakan sepakat untuk membuka simpanan <strong>{programData.target_name}</strong> dengan sistem titipan murni (Wadiah Yad Dhamanah). Dana dapat diambil kembali sesuai dengan ketentuan periode dan target yang disepakati.
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            {/* RIGHT COLUMN: Sticky Summary & Agreements */}
            <Col lg={5} xl={4} className="sticky-summary-column">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="d-flex flex-column gap-4"
              >
                {/* Summary Info */}
                <div className="summary-gradient-card">
                  <div className="summary-accent-header d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0 font-outfit text-dark">Ringkasan Tabungan</h5>
                    <div className="summary-badge-premium text-white">Program</div>
                  </div>
                  <div className="p-4 bg-white rounded-bottom-4 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted small fw-bold">Durasi Program</span>
                      <span className="fw-bold fs-5 text-primary">{formData.term_months || 0} Bulan</span>
                    </div>
                    <ProgressBar
                      now={100}
                      variant="primary"
                      className="form-pengajuan-progress mb-2"
                      style={{ height: '6px' }}
                    />
                    <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                      <span className="text-muted small">Target Terkumpul</span>
                      <span className="fw-bold">Rp {formatCurrency(calculatedTarget)}</span>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkboxes */}
                <Card variant="form" className="p-4">
                  <div className="form-section-header mb-3">
                    <h6 className="fw-bold font-outfit mb-0 text-dark">
                      Pernyataan Persetujuan
                    </h6>
                  </div>

                  <div className="custom-checkbox-premium">
                    <input
                      type="checkbox"
                      id="akadAgreed"
                      checked={formData.akadAgreed}
                      onChange={handleAkadChange}
                      className={`form-check-input ${errors.akadAgreed ? 'is-invalid' : ''}`}
                      disabled={loading}
                    />
                    <label htmlFor="akadAgreed" className="form-check-label small ms-2">
                      Saya menyetujui akad Wadiah dan syarat ketentuan yang berlaku untuk program ini.
                    </label>
                  </div>
                  {errors.akadAgreed && <div className="text-danger small mt-1 fw-bold">{errors.akadAgreed}</div>}
                </Card>

                {/* Action Button */}
                <div className="d-grid gap-2">
                  <Button
                    variant="form"
                    type="submit"
                    isLoading={loading}
                    loadingText="Memproses Pengajuan..."
                    disabled={!formData.akadAgreed}
                    className="w-100 d-flex flex-column align-items-center justify-content-center py-3"
                  >
                    {!loading && (
                      <>
                        <span className="fw-bold" style={{ fontSize: "16px" }}>Ajukan Sekarang</span>
                        <small className="opacity-75" style={{ fontSize: "11px" }}>Konfirmasi Pembukaan Rekening</small>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="light"
                    className="w-100 py-2 fw-bold text-muted border-0 shadow-sm"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Batal & Kembali
                  </Button>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default FormPengajuanTabungan;