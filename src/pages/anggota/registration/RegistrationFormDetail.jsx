// src/pages/anggota/registration/RegistrationFormDetail.jsx (Orkestrator)

import React, { useState, useCallback } from "react";
import { Card, Button, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import DashboardLayout from "../../../components/layout/DashboardLayout";

// Impor komponen langkah-langkah dari sub-direktori steps/
import Step1PersonalData from "./steps/Step1PersonalData";
import Step2Address from "./steps/Step2Address";
import Step3CaptureKTP from "./steps/Step3CaptureKTP";
import Step4Swafoto from "./steps/Step4Swafoto";
import Step5BankData from "./steps/Step5BankData";
import Step6Summary from "./steps/Step6Summary";

// --- DATA MOCKUP & STEP DEFINITION (Tetap disini) ---
const MOCK_DATA = {
  /* ... data mock ... */
};
const STEPS = [
  "Data Pribadi",
  "Alamat Tinggal",
  "Capture KTP",
  "Swafoto",
  "Data Bank",
  "Konfirmasi & Kirim Data",
];
// ----------------------------------------------------

export default function RegistrationFormDetail() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(MOCK_DATA);

  // Handlers untuk manipulasi state formulir
  const handleChange = useCallback((e) => {
    /* ... implementasi ... */
  }, []);
  const handleSetCapturedImage = useCallback((fieldName, imageData) => {
    /* ... implementasi ... */
  }, []);
  const handleBackToRegistrationPage = useCallback(() => {
    /* ... implementasi ... */
  }, [navigate]);
  const handleNext = useCallback(() => {
    /* ... implementasi ... */
  }, [currentStep]);
  const handlePrev = useCallback(() => {
    /* ... implementasi ... */
  }, [currentStep]);
  const handleEditStep = useCallback((stepIndex) => {
    setCurrentStep(stepIndex);
  }, []);
  const handleSubmit = useCallback(
    (e) => {
      /* ... implementasi ... */
    },
    [currentStep, formData, navigate]
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1PersonalData formData={formData} handleChange={handleChange} />
        );
      case 1:
        return <Step2Address formData={formData} handleChange={handleChange} />;
      case 2:
        return (
          <Step3CaptureKTP
            formData={formData}
            handleSetCapturedImage={handleSetCapturedImage}
          />
        );
      case 3:
        return (
          <Step4Swafoto
            formData={formData}
            handleSetCapturedImage={handleSetCapturedImage}
          />
        );
      case 4:
        return (
          <Step5BankData formData={formData} handleChange={handleChange} />
        );
      case 5:
        return (
          <Step6Summary formData={formData} handleEditStep={handleEditStep} />
        );
      default:
        return <div>Langkah pendaftaran tidak valid.</div>;
    }
  };

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <DashboardLayout>
      {/* ... JSX Judul, Card, ProgressBar, Tombol Navigasi ... */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            {/* Tombol Back */}
            <span
              role="button"
              onClick={handleBackToRegistrationPage}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Isi Form Permohonan Anggota
          </h3>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-10 col-xl-8 mx-auto">
          <Card className="shadow-lg">
            <Card.Header className="bg-primary text-white">
              Langkah {currentStep + 1}: **{STEPS[currentStep]}**
            </Card.Header>
            <Card.Body>
              <ProgressBar
                now={progressPercent}
                label={`Langkah ${currentStep + 1} dari ${STEPS.length}`}
                className="mb-4"
                variant="primary"
              />

              <Form onSubmit={handleSubmit}>
                {renderStepContent()}

                <div className="d-flex justify-content-between mt-5">
                  <Button
                    variant="secondary"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                  >
                    <FaArrowLeft className="me-2" /> Kembali
                  </Button>

                  {currentStep < STEPS.length - 1 ? (
                    <Button variant="primary" onClick={handleNext}>
                      Lanjut ({STEPS[currentStep + 1]}){" "}
                      <i className="fa fa-arrow-right ms-2"></i>
                    </Button>
                  ) : (
                    <Button variant="success" type="submit">
                      <FaSave className="me-2" /> Kirim Permohonan
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
