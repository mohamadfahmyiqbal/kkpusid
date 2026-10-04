import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import { profileService } from "../../../services/profileService";
import api from "../../../utils/api/common";
import Alert from "../../../components/ui/SwalAlert";

import FormProgressBar from "./components/FormProgressBar";
import BusinessInfoSection from "./components/BusinessInfoSection";
import FundingPlanSection from "./components/FundingPlanSection";
import DocumentUploadSection from "./components/DocumentUploadSection";
import AgreementAndActions from "./components/AgreementAndActions";
import {
  INITIAL_FORM_DATA,
  parseCurrency,
  calculateProgress,
} from "./components/formHelpers";

const FormPendanaanSyariah = () => {
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileService.getProfile();
        const profileData = response.data || response;
        const mappedProfile = profileService.mapBackendToFrontend(profileData);

        setFormData((prev) => ({
          ...prev,
          pemilikUsaha: mappedProfile.nama || "",
          alamat: mappedProfile.alamat || "",
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

  const handleCurrencyChange = useCallback(
    (field, e) => {
      const rawValue = parseCurrency(e.target.value);
      setFormData((prev) => ({ ...prev, [field]: rawValue }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    },
    []
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
      parseInt(String(formData.targetDana).replace(/\D/g, ""), 10) || 0;
    const omsetTahunan =
      parseInt(String(formData.omsetTahunan).replace(/\D/g, ""), 10) || 0;

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
      const targetDanaNum = parseInt(
        String(formData.targetDana).replace(/\D/g, ""),
        10
      );
      const tenureNum = parseInt(formData.periodeModal, 10);
      const monthlyInstallment = Math.round(targetDanaNum / tenureNum);

      const payload = {
        category: "Pendanaan Syariah UMKM",
        item_name: formData.tujuanPendanaan,
        amount_requested: targetDanaNum,
        down_payment: 0,
        principal_amount: targetDanaNum,
        tenure: tenureNum,
        monthly_installment: monthlyInstallment,
        metode_pencairan: "Non Tunai",
        nama_nasabah: formData.pemilikUsaha,
        no_rekening: "0000000000",
        bank_tujuan: "Bank Syariah",
        business_name: formData.namaUsaha,
        business_sector: formData.sektor,
        business_address: formData.alamat,
        estimated_yearly_turnover:
          parseInt(String(formData.omsetTahunan).replace(/\D/g, ""), 10) || 0,
        estimated_monthly_turnover:
          parseInt(String(formData.omsetKerjasama).replace(/\D/g, ""), 10) || 0,
        investor_profit_share: parseFloat(formData.bagiHasil) || 0,
      };

      const response = await api.post("/financing/apply", payload);
      const financingId = response.data?.data?.financing_id;

      if (financingId) {
        if (
          formData.buktiKepemilikan ||
          formData.buktiKerjasama ||
          formData.filePendukung
        ) {
          const uploadData = new FormData();
          if (formData.buktiKepemilikan)
            uploadData.append("evidence", formData.buktiKepemilikan);
          if (formData.buktiKerjasama)
            uploadData.append("buktiKerjasama", formData.buktiKerjasama);
          if (formData.filePendukung)
            uploadData.append("filePendukung", formData.filePendukung);

          try {
            await api.post(`/financing/evidence/${financingId}`, uploadData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          } catch (uploadError) {
            console.error("Upload error:", uploadError);
          }
        }

        const mappedData = {
          id: financingId,
          amount: payload.principal_amount,
          item_price: payload.amount_requested,
          monthly_installment: monthlyInstallment,
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
          },
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
        err?.response?.data?.message || "Gagal mengirim pengajuan"
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
    return calculateProgress(formData);
  }, [formData]);

  return (
    <div className="pb-5">
      <Container fluid className="px-3 px-md-4 mt-4">
        <Row className="justify-content-center">
          <Col xl={10} className="mx-auto">
            {/* Progress Bar */}
            <FormProgressBar progress={formProgress} />

            <Card className="shadow-sm border-0 rounded-4 overflow-hidden mb-5">
              {/* Decorative Header */}
              <div
                style={{
                  height: "8px",
                  background:
                    "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
                }}
              />
              <Card.Body className="p-4 p-md-5">
                {submitError && (
                  <Alert
                    variant="danger"
                    className="mb-4 border-0 shadow-sm rounded-3"
                  >
                    {submitError}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Row>
                    <BusinessInfoSection
                      formData={formData}
                      errors={errors}
                      loading={loading}
                      firstInputRef={firstInputRef}
                      onChange={handleChange}
                      onCurrencyChange={handleCurrencyChange}
                    />

                    <FundingPlanSection
                      formData={formData}
                      errors={errors}
                      loading={loading}
                      onChange={handleChange}
                      onCurrencyChange={handleCurrencyChange}
                    />

                    <DocumentUploadSection
                      errors={errors}
                      loading={loading}
                      onFileChange={handleFileChange}
                    />

                    <AgreementAndActions
                      akadAgreed={formData.akadAgreed}
                      error={errors.akadAgreed}
                      loading={loading}
                      onAkadChange={handleAkadChange}
                      onBack={handleBack}
                    />
                  </Row>
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
