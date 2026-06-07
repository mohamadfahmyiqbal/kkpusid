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
import { FaStore, FaArrowLeft, FaUpload, FaFileAlt } from "react-icons/fa";

import { profileService } from "../../../services/profileService";
import api from "../../../utils/api/common";

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
    const fetchProfile = async () => {
      try {
        const response = await profileService.getProfile();
        const profileData = response.data || response;
        const mappedProfile = profileService.mapBackendToFrontend(profileData);
        
        setFormData(prev => ({
          ...prev,
          pemilikUsaha: mappedProfile.nama || "",
          alamat: mappedProfile.alamat || ""
        }));
      } catch (err) {
        console.error("Gagal mengambil profil", err);
      }
    };
    
    fetchProfile();

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
      const payload = {
        category: "Pendanaan Syariah UMKM",
        item_name: formData.tujuanPendanaan,
        amount_requested: parseInt(String(formData.targetDana).replace(/\D/g, "")),
        down_payment: 0,
        principal_amount: parseInt(String(formData.targetDana).replace(/\D/g, "")),
        tenure: formData.periodeModal,
        monthly_installment: 0,
        metode_pencairan: "Non Tunai",
        nama_nasabah: formData.pemilikUsaha,
        no_rekening: "0000000000",
        bank_tujuan: "Bank Syariah"
      };

      const response = await api.post("/financing/apply", payload);
      const financingId = response.data?.data?.financing_id;

      if (financingId) {
        const mappedData = {
          id: financingId,
          amount: payload.principal_amount,
          item_price: payload.amount_requested,
          monthly_installment: 0,
          cooperation_months: payload.tenure,
          purpose: payload.item_name,
          item_name: payload.item_name,
          account_type: "Pendanaan Syariah",
          akad_type: "Murabahah",
          method: "Non Tunai",
          status: "PENDING",
          created_at: new Date().toISOString(),
          is_approved_pengawas: false,
          is_approved_ketua: false,
          is_approved_bendahara: false,
          is_rejected: false,
          member: {
            full_name: payload.nama_nasabah,
            member_code: "-",
            member_type: "Reguler",
          },
          bank_name: payload.bank_tujuan,
          bank_account_name: payload.nama_nasabah,
          bank_account_no: payload.no_rekening,
          catalog: {
            target_name: payload.item_name,
            category: payload.category,
            target_amount: payload.principal_amount,
            term_months: payload.tenure,
          }
        };

        const token = jwtEncode({
          page: "transactionDetailPage",
          financingId: financingId,
          return: "pendanaanSyariah",
          data: mappedData,
        });
        navigate(`/${token}`);
      } else {
        throw new Error("Gagal mendapatkan ID Pengajuan");
      }
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
    <div className="investasi-wrapper pb-5 bg-light min-vh-100">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0 bg-white">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaFileAlt className="me-2 text-primary" />
            Form Pengajuan Pendanaan
          </h3>
          <p className="text-muted mt-2 mb-0">Isi data usaha Anda secara lengkap untuk proses verifikasi pendanaan UMKM.</p>
        </div>
      </div>

      <Container fluid className="px-4">
        <Row className="justify-content-center">
          <Col lg={12}>
            {/* Progress Bar */}
            <Card className="shadow-sm border-0 mb-4 rounded-4">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-muted fw-semibold">Kelengkapan Formulir</span>
                  <span className="fw-bold text-primary px-3 py-1 bg-light rounded-pill">{formProgress}%</span>
                </div>
                <ProgressBar
                  now={formProgress}
                  variant={formProgress === 100 ? "success" : "primary"}
                  style={{ height: "10px", borderRadius: "10px" }}
                  className="bg-light"
                />
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-5">
              <Card.Body className="p-4 p-md-5">
                {submitError && (
                  <Alert variant="danger" className="mb-4 border-0 shadow-sm rounded-3">
                    {submitError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <Col md={12} className="mb-4">
                      <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">
                        1. Informasi Usaha
                      </h5>
                    </Col>

                    <Col md={12} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="nama-usaha">
                        Nama Usaha
                      </Form.Label>
                      <Form.Control
                        id="nama-usaha"
                        ref={firstInputRef}
                        name="namaUsaha"
                        value={formData.namaUsaha}
                        onChange={handleChange}
                        placeholder="Contoh: Kedai Kopi Nusantara"
                        className="p-3 bg-light border-0"
                        isInvalid={!!errors.namaUsaha}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.namaUsaha}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="pemilik">
                        Nama Pemilik Usaha
                      </Form.Label>
                      <Form.Control
                        id="pemilik"
                        name="pemilikUsaha"
                        value={formData.pemilikUsaha}
                        onChange={handleChange}
                        placeholder="Sesuai KTP"
                        className="p-3 bg-light border-0"
                        isInvalid={!!errors.pemilikUsaha}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.pemilikUsaha}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="sektor">
                        Sektor Bisnis Utama
                      </Form.Label>
                      <Form.Select
                        id="sektor"
                        name="sektor"
                        value={formData.sektor}
                        onChange={handleChange}
                        className="p-3 bg-light border-0"
                        disabled={loading}
                      >
                        <option value="">-- Pilih sektor industri --</option>
                        {SECTOR_OPTIONS.map((sector) => (
                          <option key={sector} value={sector}>
                            {sector}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={12} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="alamat">
                        Alamat Lengkap Tempat Usaha
                      </Form.Label>
                      <Form.Control
                        id="alamat"
                        as="textarea"
                        rows={3}
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleChange}
                        placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
                        className="p-3 bg-light border-0"
                        isInvalid={!!errors.alamat}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.alamat}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={12} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="omset">
                        Estimasi Omset Tahunan Saat Ini
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
                        placeholder="Min. Rp 10.000.000"
                        className="p-3 bg-light border-0 fw-bold text-success"
                        isInvalid={!!errors.omsetTahunan}
                        disabled={loading}
                        inputMode="numeric"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.omsetTahunan}
                      </Form.Control.Feedback>
                    </Col>

                    {/* Informasi Pendanaan */}
                    <Col md={12} className="mb-4 mt-5">
                      <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">
                        2. Rencana Pendanaan
                      </h5>
                    </Col>

                    <Col md={12} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="tujuan">
                        Tujuan Penggunaan Dana
                      </Form.Label>
                      <Form.Control
                        id="tujuan"
                        as="textarea"
                        rows={3}
                        name="tujuanPendanaan"
                        value={formData.tujuanPendanaan}
                        onChange={handleChange}
                        placeholder="Contoh: Penambahan modal kerja untuk membeli stok bahan baku menjelang Idul Fitri"
                        className="p-3 bg-light border-0"
                        isInvalid={!!errors.tujuanPendanaan}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.tujuanPendanaan}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="target">
                        Target Dana yang Dibutuhkan
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
                        placeholder="Min. Rp 5.000.000"
                        className="p-3 bg-light border-0 fw-bold text-primary"
                        isInvalid={!!errors.targetDana}
                        disabled={loading}
                        inputMode="numeric"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.targetDana}
                      </Form.Control.Feedback>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="periode">
                        Periode Pengembalian Modal
                      </Form.Label>
                      <Form.Select
                        id="periode"
                        name="periodeModal"
                        value={formData.periodeModal}
                        onChange={handleChange}
                        className="p-3 bg-light border-0"
                        disabled={loading}
                      >
                        {[6, 12, 18, 24, 36].map((periode) => (
                          <option key={periode} value={periode}>
                            {periode} Bulan
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label
                        className="fw-semibold text-dark"
                        htmlFor="omset-kerjasama"
                      >
                        Estimasi Omset Selama Periode Pendanaan (Bulanan)
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
                        placeholder="Cth: Rp 5.000.000"
                        className="p-3 bg-light border-0"
                        disabled={loading}
                        inputMode="numeric"
                      />
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label className="fw-semibold text-dark" htmlFor="bagi-hasil">
                        Tawaran Bagi Hasil Investor (%)
                      </Form.Label>
                      <Form.Control
                        id="bagi-hasil"
                        type="number"
                        name="bagiHasil"
                        value={formData.bagiHasil}
                        onChange={handleChange}
                        placeholder="Contoh: 15"
                        className="p-3 bg-light border-0 fw-bold text-success"
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
                    <Col md={12} className="mb-4 mt-5">
                      <h5 className="fw-bold mb-3 pb-2 border-bottom text-dark">
                        3. Dokumen Legalitas & Pendukung
                      </h5>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label
                        className="fw-semibold text-dark"
                        htmlFor="bukti-kepemilikan"
                      >
                        Bukti Kepemilikan Usaha (NIB/SIUP/SKDU) <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        id="bukti-kepemilikan"
                        type="file"
                        onChange={(e) =>
                          handleFileChange("buktiKepemilikan", e)
                        }
                        className="p-3 bg-light border-0"
                        isInvalid={!!errors.buktiKepemilikan}
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.buktiKepemilikan}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted d-block mt-2">
                        Format: PDF, JPG, PNG (Maks 5MB)
                      </Form.Text>
                    </Col>

                    <Col md={6} className="mb-4">
                      <Form.Label
                        className="fw-semibold text-dark"
                        htmlFor="bukti-kerjasama"
                      >
                        Bukti Kerjasama / Kontrak (Opsional)
                      </Form.Label>
                      <Form.Control
                        id="bukti-kerjasama"
                        type="file"
                        className="p-3 bg-light border-0"
                        onChange={(e) => handleFileChange("buktiKerjasama", e)}
                        disabled={loading}
                      />
                      <Form.Text className="text-muted d-block mt-2">
                        Format: PDF, JPG, PNG (Maks 5MB)
                      </Form.Text>
                    </Col>

                    <Col md={12} className="mb-4">
                      <Form.Label
                        className="fw-semibold text-dark"
                        htmlFor="file-pendukung"
                      >
                        Dokumen Pendukung Tambahan (Opsional)
                      </Form.Label>
                      <Form.Control
                        id="file-pendukung"
                        type="file"
                        className="p-3 bg-light border-0"
                        onChange={(e) => handleFileChange("filePendukung", e)}
                        disabled={loading}
                      />
                      <Form.Text className="text-muted d-block mt-2">
                        Seperti proposal bisnis atau rekap laporan keuangan.
                      </Form.Text>
                    </Col>

                    {/* Akad */}
                    <Col md={12} className="mb-4 mt-5">
                      <div className="bg-light p-4 rounded-4 border">
                        <Form.Check
                          type="checkbox"
                          id="akad-agreement"
                          checked={formData.akadAgreed}
                          onChange={handleAkadChange}
                          isInvalid={!!errors.akadAgreed}
                          disabled={loading}
                          label={
                            <span className="fw-semibold text-dark ms-2">
                              Saya menyatakan bahwa seluruh data yang diberikan adalah benar, serta menyetujui seluruh ketentuan dan akad pembiayaan syariah yang berlaku di Koperasi.
                            </span>
                          }
                        />
                        {errors.akadAgreed && (
                          <div className="text-danger small mt-2 ms-4 fw-bold">
                            {errors.akadAgreed}
                          </div>
                        )}
                      </div>
                    </Col>
                  </Row>

                  <div className="d-flex flex-column flex-md-row justify-content-between mt-5 pt-4 border-top">
                    <Button
                      variant="light"
                      className="px-5 py-3 fw-bold text-muted mb-3 mb-md-0 rounded-pill shadow-sm"
                      onClick={handleBack}
                      disabled={loading}
                    >
                      Batal
                    </Button>
                    <Button
                      variant="primary"
                      type="submit"
                      className="px-5 py-3 fw-bold shadow rounded-pill"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Memproses Pengajuan...
                        </>
                      ) : (
                        <>
                          <FaUpload className="me-2" />
                          Kirim Pengajuan Pendanaan
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
    </div>
  );
};

export default FormPendanaanSyariah;
