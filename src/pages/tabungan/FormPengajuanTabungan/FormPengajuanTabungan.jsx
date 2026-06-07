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
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import { FaKaaba, FaGraduationCap, FaUtensils } from "react-icons/fa";
import { TabunganService } from "../../../services/tabungan.service";
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

const FormPengajuanTabungan = () => {
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

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
    [parseCurrency],
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
    [parseCurrency],
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

      // Map savings response to TransactionDetailPage expected format
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
          full_name: responseData?.member?.full_name || responseData?.member_name || "-",
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
        err?.response?.data?.message || "Gagal mengirim pengajuan",
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
    <div className="form-pengajuan-page pb-5">
      <div className="px-3 mt-4">
        <div className="form-pengajuan-max-width mx-auto">
          

          {/* Form Card */}
          <Card className="shadow-lg border-0 form-pengajuan-form-card">
            <Card.Body className="p-4 p-md-5">
              {submitError && (
                <Alert variant="danger" className="mb-4" dismissible onClose={() => setSubmitError(null)}>
                  {submitError}
                </Alert>
              )}

              <Form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <Form.Label className="fw-semibold" htmlFor="nominal-target">
                    Nominal Target
                    <span className="text-muted ms-2 small">
                      (Min: Rp {formatCurrency(productConfig.minTarget)})
                    </span>
                  </Form.Label>
                  <Form.Control
                    id="nominal-target"
                    ref={firstInputRef}
                    type="text"
                    value={
                      formData.nominalTarget
                        ? `Rp ${formatCurrency(formData.nominalTarget)}`
                        : ""
                    }
                    onChange={handleNominalChange}
                    placeholder="Contoh: Rp 25.000.000"
                    isInvalid={!!errors.nominalTarget}
                    disabled={loading}
                    inputMode="numeric"
                    className="form-pengajuan-input"
                    aria-describedby="nominal-target-error"
                  />
                  <Form.Control.Feedback
                    id="nominal-target-error"
                    type="invalid"
                  >
                    {errors.nominalTarget}
                  </Form.Control.Feedback>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-4">
                    <Form.Label className="fw-semibold" htmlFor="tenor">
                      Tenor / Periode
                    </Form.Label>
                    <Form.Select
                      id="tenor"
                      value={formData.tenor}
                      onChange={handleTenorChange}
                      disabled={loading}
                      className="form-pengajuan-input"
                      aria-describedby="tenor-help"
                    >
                      {TENOR_OPTIONS.filter(
                        (opt) => opt.value <= productConfig.maxTenor,
                      ).map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Text id="tenor-help" className="text-muted">
                      Maksimal: {productConfig.maxTenor} bulan
                    </Form.Text>
                  </div>

                  <div className="col-md-6 mb-4">
                    <Form.Label className="fw-semibold" htmlFor="setoran-awal">
                      Setoran Awal
                      <span className="text-muted ms-2 small">
                        (Min: Rp {formatCurrency(productConfig.minSetoran)})
                      </span>
                    </Form.Label>
                    <Form.Control
                      id="setoran-awal"
                      type="text"
                      value={
                        formData.setoranAwal
                          ? `Rp ${formatCurrency(formData.setoranAwal)}`
                          : ""
                      }
                      onChange={handleSetoranChange}
                      placeholder="Contoh: Rp 500.000"
                      isInvalid={!!errors.setoranAwal}
                      disabled={loading}
                      inputMode="numeric"
                      className="form-pengajuan-input"
                      aria-describedby="setoran-awal-error"
                    />
                    <Form.Control.Feedback
                      id="setoran-awal-error"
                      type="invalid"
                    >
                      {errors.setoranAwal}
                    </Form.Control.Feedback>
                  </div>
                </div>

                {/* Summary Card */}
                <div className="mb-4">
                  <Card className="bg-light border-0 form-pengajuan-summary">
                    <Card.Body className="p-3">
                      <h6 className="fw-bold mb-3">
                        Estimasi Setoran Bulanan
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">
                          Perkiraan setoran per bulan:
                        </span>
                        <Badge bg="primary" className="fs-6 px-3 py-2">
                          Rp {formatCurrency(estimatedMonthly)}
                        </Badge>
                      </div>
                      {estimatedMonthly > 0 && (
                        <ProgressBar
                          now={100}
                          variant="success"
                          className="mt-2 form-pengajuan-progress"
                        />
                      )}
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-4">
                  <Form.Check
                    type="checkbox"
                    id="akad-agreement"
                    checked={formData.akadAgreed}
                    onChange={handleAkadChange}
                    isInvalid={!!errors.akadAgreed}
                    disabled={loading}
                    label={
                      <span className="small">
                        Saya menyetujui akad dan syarat ketentuan yang
                        berlaku untuk {productConfig.label}
                      </span>
                    }
                    aria-describedby="akad-error"
                  />
                  {errors.akadAgreed && (
                    <div id="akad-error" className="text-danger small mt-1">
                      {errors.akadAgreed}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                  <Button
                    variant="light"
                    className="px-4 py-2 fw-bold text-muted"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Kembali
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-5 py-2 fw-bold shadow-sm form-pengajuan-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                        Memproses...
                      </>
                    ) : (
                      "Ajukan Sekarang"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FormPengajuanTabungan;