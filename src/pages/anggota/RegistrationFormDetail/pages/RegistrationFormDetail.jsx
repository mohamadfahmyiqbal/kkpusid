import React, { useCallback, useState, useEffect, useMemo, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  ProgressBar,
  Badge,
  Spinner
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUserCircle, FaArrowRight, FaSave, FaArrowLeft, FaFileSignature } from "react-icons/fa";
import AnggotaService from "../services/AnggotaService";
import { jwtEncode } from "../../../../utils/helpers";
import { useProfile } from "../hooks/useProfile";
import "./RegistrationFormDetail.css";

// Step Components
import Step1PersonalData from "../components/steps/Step1PersonalData";
import Step2Account from "../components/steps/Step2Account";
import Step3CaptureKTP from "../components/steps/Step3CaptureKTP.jsx";
import Step4Swafoto from "../components/steps/Step4Swafoto";
import Step5Employment from "../components/steps/Step5Employment";
import Step6EmergencyContact from "../components/steps/Step6EmergencyContact";
import Step7BankData from "../components/steps/Step7BankData";
import Step8Summary from "../components/steps/Step8Summary";
import Alert from "../../../../components/ui/SwalAlert";
const totalSteps = 8;

const stepLabels = [
  "Data Pribadi",
  "Akun & Kontak",
  "Foto KTP",
  "Swafoto",
  "Pekerjaan",
  "Kontak Darurat",
  "Rekening Bank",
  "Ringkasan",
];

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

export default function RegistrationFormDetail() {
  const navigate = useNavigate();
  const stepContainerRef = useRef(null);
  const { userData } = useProfile();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("temp_reg_data");
    return saved ? JSON.parse(saved) : {};
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommitmentChecked, setIsCommitmentChecked] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [animDir, setAnimDir] = useState("next");

  const isLastStep = step === totalSteps;
  const progressPercent = (step / totalSteps) * 100;

  // Auto-scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  // Sync phone_number and email from backend profile data
  useEffect(() => {
    if (userData) {
      setFormData((prev) => {
        let updated = false;
        const next = { ...prev };
        if (userData.phone_number && prev.phone_number !== userData.phone_number) {
          next.phone_number = userData.phone_number;
          updated = true;
        }
        if (userData.email && prev.email !== userData.email) {
          next.email = userData.email;
          updated = true;
        }
        return updated ? next : prev;
      });
    }
  }, [userData]);

  // Save to localStorage on data change
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

  const nextStep = useCallback(() => {
    const currentErrors = validateStep(step, formData);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }
    setAnimDir("next");
    setErrors({});
    if (step < totalSteps) setStep((s) => s + 1);
  }, [step, formData]);

  const prevStep = useCallback(() => {
    setAnimDir("prev");
    setErrors({});
    if (step > 1) setStep((s) => s - 1);
  }, [step]);

  const handleSubmit = useCallback(async () => {
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
        const regLink = `/${jwtEncode({ page: "registrationPage" })}`;
        Swal.fire({
          icon: 'success',
          title: 'Berhasil',
          html: `Pengajuan pendaftaran anggota berhasil dikirim.<br><br><a href="${regLink}" class="btn btn-primary btn-sm mt-2">Lihat Status Pendaftaran</a>`,
          showConfirmButton: false,
          showCloseButton: true
        });
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
  }, [isCommitmentChecked, formData, navigate]);

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
    <div className="pb-5 dash-fade-in dashboard-shell">
      <div className="px-0">
        <Row className="g-0 justify-content-center">
          <Col xs={12}>
            <Card className="border-0 shadow-none rounded-0 overflow-hidden min-vh-100">
              {/* Progress Bar with percentage */}
              <div className="position-relative">
                <ProgressBar
                  now={progressPercent}
                  variant="primary"
                  className="rounded-0"
                  style={{ height: "6px" }}
                />
                <div
                  className="position-absolute top-0 end-0 small fw-bold text-primary pe-3"
                  style={{ marginTop: "-20px", fontSize: "11px" }}
                >
                  {Math.round(progressPercent)}%
                </div>
              </div>

              {/* Header */}
              <CardHeader className="bg-white border-0 p-3 p-md-4 pb-2">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                  <div className="d-flex align-items-center">
                    <div
                      className="step-badge-counter bg-primary text-white me-3"
                    >
                      {step}
                    </div>
                    <div>
                      <h5 className="mb-0 fw-bold">{stepLabels[step - 1]}</h5>
                      <small className="text-muted">
                        Langkah {step} dari {totalSteps}
                      </small>
                    </div>
                  </div>
                  <Badge
                    bg="light"
                    className="text-primary border px-3 py-2 rounded-pill"
                  >
                    <FaUserCircle className="me-1" /> Calon Anggota
                  </Badge>
                </div>

                {/* Step Indicator Dots */}
                <div className="step-indicators">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div
                      key={i}
                      className={`step-dot ${
                        i + 1 === step
                          ? "active"
                          : i + 1 < step
                          ? "completed"
                          : ""
                      }`}
                      title={`Langkah ${i + 1}: ${stepLabels[i]}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (i + 1 < step) {
                          setStep(i + 1);
                        }
                      }}
                    />
                  ))}
                </div>
              </CardHeader>

              {/* Body */}
              <CardBody className="p-3 p-md-4 pt-0">
                {submitError && (
                  <Alert
                    variant="danger"
                    className="rounded-12 border-0 shadow-sm d-flex align-items-center"
                    dismissible
                    onClose={() => setSubmitError(null)}
                  >
                    <FaFileSignature className="me-2" />
                    {submitError}
                  </Alert>
                )}

                <div className="step-container" ref={stepContainerRef}>
                  {renderStep}
                </div>

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top">
                  <Button
                    variant={step === 1 ? "outline-danger" : "light"}
                    className={`px-4 py-2 fw-bold rounded-12 ${
                      step === 1
                        ? "text-danger"
                        : "text-muted"
                    }`}
                    onClick={() =>
                      step === 1 ? handleBack() : prevStep()
                    }
                    disabled={isSubmitting}
                  >
                    <FaArrowLeft className="me-2" />
                    {step === 1 ? "Batalkan" : "Sebelumnya"}
                  </Button>

                  <div className="d-flex align-items-center gap-2">
                    {isLastStep ? (
                      <Button
                        variant="primary"
                        className="px-4 px-md-5 py-2 fw-bold shadow-sm rounded-12"
                        onClick={handleSubmit}
                        disabled={!isCommitmentChecked || isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Spinner
                              size="sm"
                              className="me-2"
                              animation="border"
                            />
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <FaSave className="me-2" /> Kirim Sekarang
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        className="px-4 px-md-5 py-2 fw-bold shadow-sm rounded-12"
                        onClick={nextStep}
                      >
                        Selanjutnya{" "}
                        <FaArrowRight className="ms-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}