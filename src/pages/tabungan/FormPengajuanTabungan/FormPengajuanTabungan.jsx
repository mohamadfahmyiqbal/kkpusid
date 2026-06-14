import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  Card,
  Form,
  Button,
  Spinner,
  Alert,
  ProgressBar,
  Badge,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import { FaKaaba, FaGraduationCap, FaUtensils, FaInfoCircle, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { TabunganService } from "../../../services/tabungan.service";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "../../../components/layout/contexts";
import "./FormPengajuanTabungan.css";

// Product configurations
const TABUNGAN_CONFIG = {
  haji: {
    label: "Tabungan Haji",
    icon: "haji",
    color: "success",
    description: "Tabungan untuk persiapan ibadah haji",
    minTarget: 25000000,
    minSetoran: 500000,
    maxTenor: 120,
  },
  umrah: {
    label: "Tabungan Umrah",
    icon: "umrah",
    color: "primary",
    description: "Tabungan untuk persiapan ibadah umrah",
    minTarget: 10000000,
    minSetoran: 300000,
    maxTenor: 60,
  },
  pendidikan: {
    label: "Tabungan Pendidikan",
    icon: "pendidikan",
    color: "info",
    description: "Tabungan untuk biaya pendidikan",
    minTarget: 5000000,
    minSetoran: 200000,
    maxTenor: 84,
  },
  qurban: {
    label: "Tabungan Qurban",
    icon: "qurban",
    color: "warning",
    description: "Tabungan untuk persiapan qurban",
    minTarget: 3000000,
    minSetoran: 100000,
    maxTenor: 36,
  },
};

const TENOR_OPTIONS = [
  { label: "6 Bulan", value: 6 },
  { label: "12 Bulan", value: 12 },
  { label: "18 Bulan", value: 18 },
  { label: "24 Bulan", value: 24 },
  { label: "36 Bulan", value: 36 },
  { label: "48 Bulan", value: 48 },
  { label: "60 Bulan", value: 60 },
  { label: "84 Bulan", value: 84 },
  { label: "120 Bulan", value: 120 },
];

const PRODUCT_ICONS = {
  haji: FaKaaba,
  umrah: FaKaaba,
  pendidikan: FaGraduationCap,
  qurban: FaUtensils,
};

// --- Form Input Field Sub-component ---
const FormInputField = React.memo(
  ({
    label,
    value,
    name,
    type = "text",
    readOnly = false,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    icon: Icon,
    helperText,
  }) => (
    <Form.Group className="mb-4 custom-input-group">
      <Form.Label className="form-label d-flex align-items-center fw-semibold">
        {Icon && <Icon className="me-2 text-teal opacity-75" size={14} />}
        {label}
        {required && <span className="text-danger ms-1">*</span>}
        {helperText && <span className="text-muted ms-2 small fw-normal">{helperText}</span>}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        className={`custom-flat-input ${error ? "border-danger error-shake" : ""}`}
        isInvalid={!!error}
        inputMode={type === "text" ? "numeric" : undefined}
      />
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Form.Control.Feedback type="invalid" className="d-block mt-1">
              <small className="text-danger fw-bold">{error}</small>
            </Form.Control.Feedback>
          </motion.div>
        )}
      </AnimatePresence>
    </Form.Group>
  )
);

const FormPengajuanTabungan = () => {
  const navigate = useNavigate();
  const firstInputRef = useRef(null);
  const { userData } = useProfile();

  const [productType, setProductType] = useState("haji");
  const [formData, setFormData] = useState({
    nominalTarget: "",
    tenor: 12,
    setoranAwal: "",
    akadAgreed: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const productConfig = TABUNGAN_CONFIG[productType] || TABUNGAN_CONFIG.haji;
  const ProductIcon = PRODUCT_ICONS[productConfig.icon] || FaKaaba;

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const formatCurrency = useCallback((value) => {
    if (!value) return "";
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  const parseCurrency = useCallback((value) => {
    return value.replace(/\D/g, "");
  }, []);

  const handleNominalChange = useCallback(
    (e) => {
      const rawValue = parseCurrency(e.target.value);
      setFormData((prev) => ({
        ...prev,
        nominalTarget: rawValue,
      }));
      setErrors((prev) => ({ ...prev, nominalTarget: "" }));
    },
    [parseCurrency]
  );

  const handleSetoranChange = useCallback(
    (e) => {
      const rawValue = parseCurrency(e.target.value);
      setFormData((prev) => ({
        ...prev,
        setoranAwal: rawValue,
      }));
      setErrors((prev) => ({ ...prev, setoranAwal: "" }));
    },
    [parseCurrency]
  );

  const handleTenorChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      tenor: parseInt(e.target.value, 10),
    }));
  }, []);

  const handleAkadChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      akadAgreed: e.target.checked,
    }));
  }, []);

  const estimatedMonthly = useMemo(() => {
    const target = parseInt(formData.nominalTarget.replace(/\D/g, ""), 10) || 0;
    const initial = parseInt(formData.setoranAwal.replace(/\D/g, ""), 10) || 0;
    const remaining = target - initial;
    const months = formData.tenor;
    if (remaining <= 0 || months <= 0) return 0;
    return Math.ceil(remaining / months);
  }, [formData.nominalTarget, formData.setoranAwal, formData.tenor]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const target = parseInt(formData.nominalTarget.replace(/\D/g, ""), 10) || 0;
    const setoran = parseInt(formData.setoranAwal.replace(/\D/g, ""), 10) || 0;

    if (!formData.nominalTarget || target < productConfig.minTarget) {
      newErrors.nominalTarget = `Minimal target: Rp ${formatCurrency(productConfig.minTarget)}`;
    }

    if (!formData.setoranAwal || setoran < productConfig.minSetoran) {
      newErrors.setoranAwal = `Minimal setoran awal: Rp ${formatCurrency(productConfig.minSetoran)}`;
    }

    if (setoran >= target) {
      newErrors.setoranAwal = "Setoran awal tidak boleh melebihi target";
    }

    if (!formData.akadAgreed) {
      newErrors.akadAgreed = "Anda harus menyetujui akad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, productConfig, formatCurrency]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSubmitError(null);

    try {
      const payload = {
        productType,
        nominalTarget: parseInt(formData.nominalTarget.replace(/\D/g, ""), 10),
        tenor: formData.tenor,
        setoranAwal: parseInt(formData.setoranAwal.replace(/\D/g, ""), 10),
      };

      const response = await TabunganService.submitApplication(payload);
      const responseData = response?.data?.data || response?.data || {};
      const applicationId = responseData.member_saving_target_id || responseData.id || null;

      const mappedData = {
        id: applicationId,
        amount: payload.nominalTarget,
        item_price: payload.setoranAwal,
        monthly_installment: estimatedMonthly,
        cooperation_months: payload.tenor,
        purpose: TABUNGAN_CONFIG[productType]?.label || productType,
        item_name: TABUNGAN_CONFIG[productType]?.label || productType,
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
          target_name: TABUNGAN_CONFIG[productType]?.label || productType,
          category: productType,
          target_amount: payload.nominalTarget,
          term_months: payload.tenor,
          min_monthly_deposit: estimatedMonthly
        }
      };

      const token = jwtEncode({
        page: "transactionDetailPage",
        tabunganId: applicationId,
        return: "tabunganPage",
        product: productType,
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
                <Card className="premium-form-card border-0 p-3 p-md-4 mb-4 shadow-sm">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-4 pb-3 border-bottom">
                      <div className={`p-3 rounded-circle bg-${productConfig.color} bg-opacity-10 text-${productConfig.color} me-3`}>
                        <ProductIcon size={24} />
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1 text-dark">{productConfig.label}</h5>
                        <p className="text-muted small mb-0">{productConfig.description}</p>
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
                        Detail Target Simpanan
                      </h6>
                    </div>

                    <Form.Group className="mb-4 custom-input-group">
                      <Form.Label className="form-label d-flex align-items-center fw-semibold">
                        <FaInfoCircle className="me-2 text-teal opacity-75" size={14} />
                        Nominal Target
                        <span className="text-danger ms-1">*</span>
                        <span className="text-muted ms-2 small fw-normal">
                          (Min: Rp {formatCurrency(productConfig.minTarget)})
                        </span>
                      </Form.Label>
                      <Form.Control
                        ref={firstInputRef}
                        type="text"
                        name="nominalTarget"
                        value={formData.nominalTarget ? `Rp ${formatCurrency(formData.nominalTarget)}` : ""}
                        onChange={handleNominalChange}
                        placeholder="Contoh: Rp 25.000.000"
                        className={`custom-flat-input ${errors.nominalTarget ? "border-danger error-shake" : ""}`}
                        isInvalid={!!errors.nominalTarget}
                        disabled={loading}
                        inputMode="numeric"
                      />
                      <AnimatePresence>
                        {errors.nominalTarget && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                            <Form.Control.Feedback type="invalid" className="d-block mt-1">
                              <small className="text-danger fw-bold">{errors.nominalTarget}</small>
                            </Form.Control.Feedback>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-4 custom-input-group">
                          <Form.Label className="form-label d-flex align-items-center fw-semibold">
                            Tenor / Periode
                          </Form.Label>
                          <Form.Select
                            value={formData.tenor}
                            onChange={handleTenorChange}
                            disabled={loading}
                            className="custom-flat-input"
                          >
                            {TENOR_OPTIONS.filter((opt) => opt.value <= productConfig.maxTenor).map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </Form.Select>
                          <small className="text-muted mt-1 d-block">
                            Maksimal: {productConfig.maxTenor} bulan
                          </small>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-4 custom-input-group">
                          <Form.Label className="form-label d-flex align-items-center fw-semibold">
                            Setoran Awal
                            <span className="text-danger ms-1">*</span>
                            <span className="text-muted ms-2 small fw-normal">
                              (Min: Rp {formatCurrency(productConfig.minSetoran)})
                            </span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="setoranAwal"
                            value={formData.setoranAwal ? `Rp ${formatCurrency(formData.setoranAwal)}` : ""}
                            onChange={handleSetoranChange}
                            placeholder="Contoh: Rp 500.000"
                            className={`custom-flat-input ${errors.setoranAwal ? "border-danger error-shake" : ""}`}
                            isInvalid={!!errors.setoranAwal}
                            disabled={loading}
                            inputMode="numeric"
                          />
                          <AnimatePresence>
                            {errors.setoranAwal && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                                <Form.Control.Feedback type="invalid" className="d-block mt-1">
                                  <small className="text-danger fw-bold">{errors.setoranAwal}</small>
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
                <Card className="premium-form-card border-0 p-3 p-md-4 shadow-sm">
                  <Card.Body>
                    <div className="form-section-header">
                      <h6 className="fw-bold font-outfit mb-0 text-dark">
                        Akad Perjanjian (Wadiah)
                      </h6>
                    </div>
                    <p className="small text-muted mb-0 mt-3 leading-relaxed font-plus-jakarta">
                      Dengan menyetujui, Anda menyatakan sepakat untuk membuka simpanan <strong>{productConfig.label}</strong> dengan sistem titipan murni (Wadiah Yad Dhamanah). Dana dapat diambil kembali sesuai dengan ketentuan periode dan target yang disepakati.
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
                    <div className="summary-badge-premium text-white">Estimasi</div>
                  </div>
                  <div className="p-4 bg-white rounded-bottom-4 shadow-sm">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted small fw-bold">Setoran Bulanan</span>
                      <span className="fw-bold fs-5 text-primary">Rp {formatCurrency(estimatedMonthly)}</span>
                    </div>
                    {estimatedMonthly > 0 && (
                      <ProgressBar
                        now={100}
                        variant={productConfig.color || "primary"}
                        className="form-pengajuan-progress mb-2"
                        style={{ height: '6px' }}
                      />
                    )}
                    <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                      <span className="text-muted small">Target Terkumpul</span>
                      <span className="fw-bold">Rp {formatCurrency(formData.nominalTarget)}</span>
                    </div>
                  </div>
                </div>

                {/* Agreement Checkboxes */}
                <Card className="premium-form-card border-0 p-4 shadow-sm">
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
                      Saya menyetujui akad Wadiah dan syarat ketentuan yang berlaku untuk {productConfig.label}.
                    </label>
                  </div>
                  {errors.akadAgreed && <div className="text-danger small mt-1 fw-bold">{errors.akadAgreed}</div>}
                </Card>

                {/* Action Button */}
                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    disabled={loading || !formData.akadAgreed}
                    className="btn-submit-premium w-100 d-flex flex-column align-items-center justify-content-center py-3 shadow-md border-0"
                    style={{ background: 'var(--primary-color, #0d6efd)' }}
                  >
                    {loading ? (
                      <div className="d-flex align-items-center gap-2">
                        <Spinner animation="border" size="sm" variant="light" />
                        <span className="fw-bold">Memproses Pengajuan...</span>
                      </div>
                    ) : (
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