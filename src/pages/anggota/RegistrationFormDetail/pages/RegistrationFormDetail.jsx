import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ProgressBar,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCircle,
  FaArrowRight,
  FaSave,
} from "react-icons/fa";
import AnggotaService from "../services/AnggotaService";
import { jwtEncode } from "../../../../utils/helpers";

// Step Components
import Step1PersonalData from "../components/steps/Step1PersonalData";
import Step2Account from "../components/steps/Step2Account";
import Step3CaptureKTP from "../components/steps/Step3CaptureKTP.jsx";
import Step4Swafoto from "../components/steps/Step4Swafoto";
import Step5Employment from "../components/steps/Step5Employment";
import Step6EmergencyContact from "../components/steps/Step6EmergencyContact";
import Step7BankData from "../components/steps/Step7BankData";
import Step8Summary from "../components/steps/Step8Summary";

const totalSteps = 8;

export default function RegistrationFormDetail() {
  const navigate = useNavigate();
  const profileLoading = false;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("temp_reg_data");
    return saved ? JSON.parse(saved) : {};
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommitmentChecked, setIsCommitmentChecked] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isLastStep = step === totalSteps;

  useEffect(() => {
    localStorage.setItem("temp_reg_data", JSON.stringify(formData));
  }, [formData]);

  const handleBack = useCallback(() => {
    navigate(`/${jwtEncode({ page: "registrationPage" })}`);
  }, [navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSetCapturedImage = useCallback((fieldName, base64Image) => {
    setFormData((prev) => ({ ...prev, [fieldName]: base64Image }));
    setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  }, []);

  const validateStep = (currentStep, data) => {
    let stepErrors = {};
    if (currentStep === 1) {
      if (!data.nik_ktp || data.nik_ktp.length !== 16)
        stepErrors.nik_ktp = "NIK harus 16 digit.";
      if (!data.full_name) stepErrors.full_name = "Nama lengkap wajib diisi.";
      if (!data.alamat_ktp) stepErrors.alamat_ktp = "Alamat wajib diisi.";
      if (!data.province_id) stepErrors.province_id = "Provinsi wajib dipilih.";
      if (!data.city_id) stepErrors.city_id = "Kota/Kabupaten wajib dipilih.";
      if (!data.district_id)
        stepErrors.district_id = "Kecamatan wajib dipilih.";
      if (!data.subdistrict_id)
        stepErrors.subdistrict_id = "Kelurahan wajib dipilih.";
    }
    if (currentStep === 2) {
      if (!data.tipeAnggota)
        stepErrors.tipeAnggota = "Tipe anggota wajib dipilih.";
      if (!data.phone_number) stepErrors.phone_number = "Nomor HP wajib diisi.";
      if (!data.email) stepErrors.email = "Email wajib diisi.";
    }
    if (currentStep === 3 && !data.foto_ktp) {
      stepErrors.foto_ktp = "Foto KTP wajib diambil.";
    }
    if (currentStep === 4 && !data.foto_swafoto) {
      stepErrors.foto_swafoto = "Swafoto wajib diambil.";
    }
    if (currentStep === 5) {
      if (!data.occupation) stepErrors.occupation = "Pekerjaan wajib diisi.";
      if (!data.employer_name)
        stepErrors.employer_name = "Nama tempat bekerja wajib diisi.";
      if (!data.employer_address)
        stepErrors.employer_address = "Alamat tempat bekerja wajib diisi.";
    }
    if (currentStep === 6) {
      if (!data.contact_name)
        stepErrors.contact_name = "Nama kontak darurat wajib diisi.";
      if (!data.phone_number_emergency)
        stepErrors.phone_number_emergency =
          "No. HP kontak darurat wajib diisi.";
      if (!data.relation) stepErrors.relation = "Hubungan wajib diisi.";
    }
    if (currentStep === 7) {
      if (!data.bank_name) stepErrors.bank_name = "Nama bank wajib diisi.";
      if (!data.bank_account_no)
        stepErrors.bank_account_no = "Nomor rekening wajib diisi.";
      if (!data.account_holder)
        stepErrors.account_holder = "Nama pemilik rekening wajib diisi.";
    }
    return stepErrors;
  };

  const nextStep = () => {
    const currentErrors = validateStep(step, formData);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    setErrors({});
    if (step < totalSteps) setStep((s) => s + 1);
  };

  const handleSubmit = async () => {
    if (!isCommitmentChecked) return;

    const finalErrors = {};
    for (let i = 1; i < totalSteps; i += 1) {
      Object.assign(finalErrors, validateStep(i, formData));
    }
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      setSubmitError("Masih ada data yang belum lengkap. Silakan cek kembali.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await AnggotaService.submitRegistration(formData);
      if (response.data?.status === true) {
        localStorage.removeItem("temp_reg_data");
        navigate(`/${jwtEncode({ page: "registrationPage" })}`);
      } else {
        setSubmitError(
          response.data?.message || "Gagal mengirim data permohonan.",
        );
      }
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ||
          "Terjadi kesalahan sistem saat pengiriman data.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = useMemo(() => {
    const props = {
      formData,
      handleChange,
      errors,
      setFormData,
      handleSetCapturedImage,
    };
    switch (step) {
      case 1:
        return <Step1PersonalData {...props} />;
      case 2:
        return <Step2Account {...props} isDataLoaded={false} />;
      case 3:
        return <Step3CaptureKTP {...props} />;
      case 4:
        return <Step4Swafoto {...props} />;
      case 5:
        return <Step5Employment {...props} />;
      case 6:
        return <Step6EmergencyContact {...props} />;
      case 7:
        return <Step7BankData {...props} />;
      case 8:
        return (
          <Step8Summary
            {...props}
            isCommitmentChecked={isCommitmentChecked}
            setIsCommitmentChecked={setIsCommitmentChecked}
            handleEditStep={setStep}
          />
        );
      default:
        return null;
    }
  }, [
    step,
    formData,
    errors,
    isCommitmentChecked,
    handleSetCapturedImage,
    handleChange,
  ]);

  return (
    <div className="container-fluid px-0 pb-5">
      <div className="px-0">
        <Row className="g-0">
          <Col xs={12}>
            <Card className="border-0 shadow-none rounded-0 overflow-hidden min-vh-100">
              <ProgressBar
                now={(step / totalSteps) * 100}
                variant="primary"
                className="rounded-0"
                style={{ height: "6px" }}
              />
              <CardHeader className="bg-white border-0 p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{ width: "35px", height: "35px" }}
                    >
                      {step}
                    </div>
                    <h5 className="mb-0 fw-bold">Data Keanggotaan</h5>
                  </div>
                  <Badge
                    bg="light"
                    className="text-primary border px-3 py-2 rounded-pill"
                  >
                    <FaUserCircle className="me-1" /> Calon
                  </Badge>
                </div>
              </CardHeader>
              <CardBody className="p-4 p-md-5 pt-0">
                {submitError && (
                  <Alert variant="danger" className="rounded-12">
                    {submitError}
                  </Alert>
                )}
                <div className="step-container">{renderStep}</div>
                <div className="d-flex justify-content-between mt-5 pt-4 border-top">
                  <Button
                    variant="light"
                    className="px-4 py-2 fw-bold text-muted rounded-12"
                    onClick={() =>
                      step === 1 ? handleBack() : setStep((s) => s - 1)
                    }
                    disabled={isSubmitting}
                  >
                    {step === 1 ? "Batalkan" : "Sebelumnya"}
                  </Button>
                  {isLastStep ? (
                    <Button
                      variant="primary"
                      className="px-5 py-2 fw-bold shadow-sm rounded-12"
                      onClick={handleSubmit}
                      disabled={!isCommitmentChecked || isSubmitting}
                    >
                      {isSubmitting ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <FaSave className="me-2" /> Kirim Sekarang
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="px-5 py-2 fw-bold shadow-sm rounded-12"
                      onClick={nextStep}
                    >
                      Selanjutnya <FaArrowRight className="ms-2" />
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
