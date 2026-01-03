import React, { useCallback, useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  Row,
  ProgressBar,
  Alert,
  Badge,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCheckCircle,
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
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommitmentChecked, setIsCommitmentChecked] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isLastStep = step === totalSteps;

  // Sinkronisasi data profil
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        full_name: userData.full_name || "",
        nik_ktp: userData.nik || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
        account_holder: userData.full_name || "",
      }));
    }
  }, [userData]);

  const handleBack = useCallback(() => {
    navigate(`/${jwtEncode({ page: "registrationPage" })}`);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

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
      if (!data.city_id) stepErrors.city_id = "Kota wajib dipilih.";
      if (!data.district_id)
        stepErrors.district_id = "Kecamatan wajib dipilih.";
      if (!data.subdistrict_id)
        stepErrors.subdistrict_id = "Kelurahan wajib dipilih.";
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
    if (!isCommitmentChecked) {
      setErrors({ commitment: "Anda harus menyetujui komitmen." });
      return;
    }
    setIsSubmitting(true);
    console.log(formData);

    try {
      const response = await UAnggota.submitRegistration(formData);
      if (response.status) {
        navigate(`/${jwtEncode({ page: "registrationPage" })}`);
      } else {
        setSubmitError(response.message || "Gagal mengirim data.");
      }
    } catch (err) {
      setSubmitError("Kesalahan sistem, coba lagi nanti.");
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
  ]);

  if (profileLoading)
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );

  return (
    <div className="container-fluid pb-5">
      <div className="row page-titles pt-3 mb-4">
        <div className="col-12 d-flex align-items-center">
          <button
            onClick={handleBack}
            className="btn btn-white shadow-sm rounded-circle me-3"
          >
            <FaArrowLeft className="text-primary" />
          </button>
          <div>
            <h3 className="fw-bold mb-0">Formulir Pendaftaran</h3>
            <small className="text-muted">
              Lengkapi 8 tahap data keanggotaan Anda
            </small>
          </div>
        </div>
      </div>

      <Container>
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card className="border-0 shadow-lg rounded-20 overflow-hidden">
              <div className="bg-primary p-1">
                <ProgressBar
                  now={(step / totalSteps) * 100}
                  variant="success"
                  className="rounded-0"
                  style={{ height: "8px" }}
                />
              </div>

              <CardHeader className="bg-white border-bottom p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="step-number-circle me-3 bg-primary-soft text-primary fw-bold">
                      {step}
                    </div>
                    <h5 className="mb-0 fw-bold text-dark">
                      Langkah {step} dari {totalSteps}
                    </h5>
                  </div>
                  <Badge bg="info" className="px-3 py-2 rounded-pill">
                    <FaUserCircle className="me-2" />
                    {userData?.full_name || "Calon Anggota"}
                  </Badge>
                </div>
              </CardHeader>

              <CardBody className="p-4 p-md-5">
                {submitError && (
                  <Alert variant="danger" className="rounded-12">
                    {submitError}
                  </Alert>
                )}

                <div className="step-content-area min-vh-40">{renderStep}</div>

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
                      variant="success"
                      className="px-5 py-2 fw-bold shadow-sm rounded-12"
                      onClick={handleSubmit}
                      disabled={!isCommitmentChecked || isSubmitting}
                    >
                      {isSubmitting ? (
                        <Spinner size="sm" />
                      ) : (
                        <>
                          <FaSave className="me-2" /> Kirim Permohonan
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
      </Container>
    </div>
  );
}
