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
import UAnggota from "../../utils/api/UAnggota";
import { useProfile } from "../../contexts/ProfileContext";
import { jwtEncode } from "../../routes/helpers";

// Step Components
import Step1PersonalData from "../../components/anggota/regsitrationForm/steps/Step1PersonalData";
import Step2Account from "../../components/anggota/regsitrationForm/steps/Step2Account";
import Step3CaptureKTP from "../../components/anggota/regsitrationForm/steps/Step3CaptureKTP.jsx";
import Step4Swafoto from "../../components/anggota/regsitrationForm/steps/Step4Swafoto";
import Step5Employment from "../../components/anggota/regsitrationForm/steps/Step5Employment";
import Step6EmergencyContact from "../../components/anggota/regsitrationForm/steps/Step6EmergencyContact";
import Step7BankData from "../../components/anggota/regsitrationForm/steps/Step7BankData";
import Step8Summary from "../../components/anggota/regsitrationForm/steps/Step8Summary";

const totalSteps = 8;

export default function RegistrationFormDetail() {
  const navigate = useNavigate();
  const { userData, loading: profileLoading } = useProfile();

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

  useEffect(() => {
    if (userData && Object.keys(formData).length === 0) {
      setFormData({
        full_name: userData.full_name || "",
        nik_ktp: userData.nik || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
        account_holder: userData.full_name || "",
      });
    }
  }, [userData]);

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
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await UAnggota.submitRegistration(formData);
      if (response.data?.status || response.status) {
        localStorage.removeItem("temp_reg_data");
        navigate(`/${jwtEncode({ page: "registrationPage" })}`);
      } else {
        setSubmitError(response.message || "Gagal mengirim data permohonan.");
      }
    } catch (err) {
      setSubmitError("Terjadi kesalahan sistem saat pengiriman data.");
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
        return <Step2Account {...props} isDataLoaded={!!userData} />;
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
    userData,
    handleSetCapturedImage,
    handleChange,
  ]);

  if (profileLoading)
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="grow" variant="primary" />
      </div>
    );

  return (
    <div className="container-fluid px-0 pb-5">
      <div className="page-titles pt-3 mb-4 px-4 d-flex align-items-center">
        <button
          onClick={handleBack}
          className="btn btn-white shadow-sm rounded-circle me-3 border-0"
        >
          <FaArrowLeft className="text-primary" />
        </button>
        <div>
          <h3 className="fw-bold mb-0">Formulir Pendaftaran</h3>
          <small className="text-muted">
            Tahap {step} dari {totalSteps}
          </small>
        </div>
      </div>

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
                    <FaUserCircle className="me-1" />{" "}
                    {userData?.full_name || "Calon"}
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
