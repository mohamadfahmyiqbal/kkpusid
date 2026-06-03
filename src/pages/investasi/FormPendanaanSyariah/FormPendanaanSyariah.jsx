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
  ProgressBar,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import LayoutGlobal from "../../../components/layout/components/LayoutGlobal";
import { FaStore, FaArrowLeft, FaUpload } from "react-icons/fa";

const SECTOR_OPTIONS = [
  "Retail",
  "Food & Beverage",
  "Jasa",
  "Manufaktur",
  "Pertanian",
  "Lainnya",
];

const FormPendanaanSyariah = () => {
  const navigate = useNavigate();
  const firstInputRef = React.useRef(null);

  const [formData, setFormData] = useState({
    namaUsaha: "",
    pemilikUsaha: "",
    alamat: "",
    omsetTahunan: "",
    tujuanPendanaan: "",
    targetDana: "",
    periodeModal: 12,
    omsetKerjasama: "",
    bagiHasil: "",
    buktiKepemilikan: null,
    buktiKerjasama: null,
    filePendukung: null,
    akadAgreed: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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

  const handleCurrencyChange = useCallback(
    (field, e) => {
      const rawValue = parseCurrency(e.target.value);
      setFormData((prev) => ({ ...prev, [field]: rawValue }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    },
    [parseCurrency],
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleFileChange = useCallback((field, e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const handleAkadChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      akadAgreed: e.target.checked,
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const targetDana =
      parseInt(formData.targetDana.replace(/\D/g, ""), 10) || 0;
    const omsetTahunan =
      parseInt(formData.omsetTahunan.replace(/\D/g, ""), 10) || 0;

    if (!formData.namaUsaha) newErrors.namaUsaha = "Nama usaha wajib diisi";
    if (!formData.pemilikUsaha)
      newErrors.pemilikUsaha = "Pemilik usaha wajib diisi";
    if (!formData.alamat) newErrors.alamat = "Alamat wajib diisi";
    if (!formData.omsetTahunan || omsetTahunan < 10000000) {
      newErrors.omsetTahunan = "Minimal omset tahunan: Rp 10.000.000";
    }
    if (!formData.tujuanPendanaan)
      newErrors.tujuanPendanaan = "Tujuan pendanaan wajib diisi";
    if (!formData.targetDana || targetDana < 5000000) {
      newErrors.targetDana = "Minimal target dana: Rp 5.000.000";
    }
    if (!formData.bagiHasil) newErrors.bagiHasil = "Bagi hasil wajib diisi";
    if (!formData.buktiKepemilikan)
      newErrors.buktiKepemilikan = "Bukti kepemilikan wajib diupload";
    if (!formData.akadAgreed)
      newErrors.akadAgreed = "Anda harus menyetujui akad";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSubmitError(null);

    try {
      // TODO: Call API to submit pendanaan application
      // const response = await InvestasiService.submitPendanaan(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to detail page
      const token = jwtEncode({ page: "pendanaanSyariah" });
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
    const token = jwtEncode({ page: "pendanaanSyariah" });
    navigate(`/${token}`);
  }, [navigate]);

  const formProgress = useMemo(() => {
    const fields = [
      "namaUsaha",
      "pemilikUsaha",
      "alamat",
      "omsetTahunan",
      "tujuanPendanaan",
      "targetDana",
      "bagiHasil",
      "buktiKepemilikan",
      "akadAgreed",
    ];
    const filled = fields.filter((field) => {
      if (field === "akadAgreed") return formData[field];
      if (field === "buktiKepemilikan") return formData[field] !== null;
      return formData[field] && formData[field].trim() !== "";
    }).length;
    return Math.round((filled / fields.length) * 100);
  }, [formData]);

  return (
    <LayoutGlobal title="Form Pendanaan Syariah">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaStore className="me-2" />
            Form Pendanaan Syariah
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={8} md={10}>
            {/* Progress Bar */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Progress Formulir</span>
                  <span className="fw-bold small">{formProgress}%</span>
                </div>
                <ProgressBar
                  now={formProgress}
                  variant="success"
                  style={{ height: "8px" }}
                />
              </Card.Body>
            </Card>

            <Card className="shadow-lg border-0">
              <Card.Body className="p-4 p-md-5">
                {submitError && (
                  <Alert variant="danger" className="mb-4">
                    {submitError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    {/* Informasi Usaha */}
                    <Col md={12} className="mb-4">
                      <h6 className="fw-bold mb-3 pb-2 border-bottom">
                        Informasi Usaha
                      </h6>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="nama-usaha">
                        Nama Usaha
                      </Form.Label>
                      <Form.Control
                        id="nama-usaha"
                        ref={firstInputRef}
                        name="namaUsaha"
                        value={formData.namaUsaha}
                        onChange={handleChange}
                        placeholder="Masukkan nama usaha"
                        isInvalid={!!errors.namaUsaha}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.namaUsaha}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="pemilik">
                        Nama Pemilik
                      </Form.Label>
                      <Form.Control
                        id="pemilik"
                        name="pemilikUsaha"
                        value={formData.pemilikUsaha}
                        onChange={handleChange}
                        placeholder="Nama pemilik usaha"
                        isInvalid={!!errors.pemilikUsaha}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pemilikUsaha}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="sektor">
                        Sektor Usaha
                      </Form.Label>
                      <Form.Select
                        id="sektor"
                        name="sektor"
                        value={formData.sektor}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="">Pilih sektor</option>
                        {SECTOR_OPTIONS.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="alamat">
                        Alamat Usaha
                      </Form.Label>
                      <Form.Control
                        id="alamat"
                        as="textarea"
                        rows={3}
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        placeholder="Alamat lengkap usaha"
                        isInvalid={!!errors.alamat}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.alamat}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="omset">
                        Omset Tahunan
                        <span className="text-muted ms-2 small">
                          (Min: Rp 10.000.000)
                        </span>
                      </Form.Label>
                      <Form.Control
                        id="omset"
                        type="text"
                        value={
                          formData.omsetTahunan
                            ? `Rp ${formatCurrency(formData.omsetTahunan)}`
                            : ""
                        }
                        onChange={(e) =>
                          handleCurrencyChange("omsetTahunan", e)
                        }
                        placeholder="Contoh: Rp 50.000.000"
                        isInvalid={!!errors.omsetTahunan}
                        disabled={loading}
                        inputMode="numeric"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.omsetTahunan}
                      </Form.Control.Feedback>
                    </Col>

                    {/* Informasi Pendanaan */}
                    <Col md={12} className="mb-4 mt-4">
                      <h6 className="fw-bold mb-3 pb-2 border-bottom">
                        Informasi Pendanaan
                      </h6>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="tujuan">
                        Tujuan Pendanaan
                      </Form.Label>
                      <Form.Control
                        id="tujuan"
                        as="textarea"
                        rows={2}
                        name="tujuanPendanaan"
                        value={formData.tujuanPendanaan}
                        onChange={handleChange}
                        placeholder="Jelaskan tujuan penggunaan dana"
                        isInvalid={!!errors.tujuanPendanaan}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tujuanPendanaan}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="target">
                        Target Dana
                        <span className="text-muted ms-2 small">
                          (Min: Rp 5.000.000)
                        </span>
                      </Form.Label>
                      <Form.Control
                        id="target"
                        type="text"
                        value={
                          formData.targetDana
                            ? `Rp ${formatCurrency(formData.targetDana)}`
                            : ""
                        }
                        onChange={(e) => handleCurrencyChange("targetDana", e)}
                        placeholder="Contoh: Rp 20.000.000"
                        isInvalid={!!errors.targetDana}
                        disabled={loading}
                        inputMode="numeric"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.targetDana}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="periode">
                        Periode Modal (bulan)
                      </Form.Label>
                      <Form.Select
                        id="periode"
                        name="periodeModal"
                        value={formData.periodeModal}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        {[6, 12, 18, 24, 36].map((periode) => (
                          <option key={periode} value={periode}>
                            {periode} Bulan
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label
                        className="fw-semibold"
                        htmlFor="omset-kerjasama"
                      >
                        Omset Kerjasama (per bulan)
                      </Form.Label>
                      <Form.Control
                        id="omset-kerjasama"
                        type="text"
                        value={
                          formData.omsetKerjasama
                            ? `Rp ${formatCurrency(formData.omsetKerjasama)}`
                            : ""
                        }
                        onChange={(e) =>
                          handleCurrencyChange("omsetKerjasama", e)
                        }
                        placeholder="Contoh: Rp 5.000.000"
                        disabled={loading}
                        inputMode="numeric"
                      />
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label className="fw-semibold" htmlFor="bagi-hasil">
                        Bagi Hasil (%)
                      </Form.Label>
                      <Form.Control
                        id="bagi-hasil"
                        type="number"
                        name="bagiHasil"
                        value={formData.bagiHasil}
                        onChange={handleChange}
                        placeholder="Contoh: 15"
                        isInvalid={!!errors.bagiHasil}
                        disabled={loading}
                        min="1"
                        max="50"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.bagiHasil}
                      </Form.Control.Feedback>
                    </Col>

                    {/* Dokumen */}
                    <Col md={12} className="mb-4 mt-4">
                      <h6 className="fw-bold mb-3 pb-2 border-bottom">
                        Dokumen Pendukung
                      </h6>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label
                        className="fw-semibold"
                        htmlFor="bukti-kepemilikan"
                      >
                        Bukti Kepemilikan Usaha
                      </Form.Label>
                      <Form.Control
                        id="bukti-kepemilikan"
                        type="file"
                        onChange={(e) =>
                          handleFileChange("buktiKepemilikan", e)
                        }
                        isInvalid={!!errors.buktiKepemilikan}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.buktiKepemilikan}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Format: PDF, JPG, PNG (Max 5MB)
                      </Form.Text>
                    </Col>

                    <Col md={6} className="mb-3">
                      <Form.Label
                        className="fw-semibold"
                        htmlFor="bukti-kerjasama"
                      >
                        Bukti Kerjasama (opsional)
                      </Form.Label>
                      <Form.Control
                        id="bukti-kerjasama"
                        type="file"
                        onChange={(e) => handleFileChange("buktiKerjasama", e)}
                        disabled={loading}
                      />
                      <Form.Text className="text-muted">
                        Format: PDF, JPG, PNG (Max 5MB)
                      </Form.Text>
                    </Col>

                    <Col md={12} className="mb-3">
                      <Form.Label
                        className="fw-semibold"
                        htmlFor="file-pendukung"
                      >
                        File Pendukung Lainnya (opsional)
                      </Form.Label>
                      <Form.Control
                        id="file-pendukung"
                        type="file"
                        onChange={(e) => handleFileChange("filePendukung", e)}
                        disabled={loading}
                      />
                      <Form.Text className="text-muted">
                        Format: PDF, JPG, PNG (Max 5MB)
                      </Form.Text>
                    </Col>

                    {/* Akad */}
                    <Col md={12} className="mb-4 mt-4">
                      <Form.Check
                        type="checkbox"
                        id="akad-agreement"
                        checked={formData.akadAgreed}
                        onChange={handleAkadChange}
                        isInvalid={!!errors.akadAgreed}
                        disabled={loading}
                        label={
                          <span className="small">
                            Saya menyetujui akad dan syarat ketentuan pendanaan
                            syariah yang berlaku
                          </span>
                        }
                      />
                      {errors.akadAgreed && (
                        <div className="text-danger small mt-1">
                          {errors.akadAgreed}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                    <Button
                      variant="light"
                      className="px-4 py-2 fw-bold text-muted"
                      onClick={handleBack}
                      disabled={loading}
                    >
                      <FaArrowLeft className="me-2" />
                      Kembali
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-5 py-2 fw-bold shadow-sm"
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
                        <>
                          <FaUpload className="me-2" />
                          Kirim Pengajuan
                        </>
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

export default FormPendanaanSyariah;
