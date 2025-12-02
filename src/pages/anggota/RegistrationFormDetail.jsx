// src/pages/anggota/RegistrationFormDetail.jsx

import React, { useState, useCallback } from "react";
import { Card, Button, Form, ProgressBar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// Asumsi jwtEncode ada di routes/helpers.jsx
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft, FaSave } from "react-icons/fa";
// Import dari components/layout
import DashboardLayout from "../../components/layout/DashboardLayout";

// Import komponen langkah-langkah
import Step1PersonalData from "../../components/anggota/regsitrationForm/steps/Step1PersonalData";
import Step2Address from "../../components/anggota/regsitrationForm/steps/Step2Address";
import Step3CaptureKTP from "../../components/anggota/regsitrationForm/steps/Step3CaptureKTP";
import Step4Swafoto from "../../components/anggota/regsitrationForm/steps/Step4Swafoto";
import Step5BankData from "../../components/anggota/regsitrationForm/steps/Step5BankData";
import Step6Summary from "../../components/anggota/regsitrationForm/steps/Step6Summary";

// --- DATA MOCKUP (DUMMY DATA) ---
const MOCK_DATA = {
  nama: "Budi Santoso",
  ktp: "3201010010010001",
  pekerjaan: "Wiraswasta",
  tglLahir: "1990-01-01",
  alamat: "Jl. Contoh No. 123",
  kota: "Bekasi",
  provinsi: "Jawa Barat",
  kodePos: "17510",
  bankName: "Mandiri",
  accountNumber: "1234567890",
  ktpPhoto: null,
  selfiePhoto: null,
  // 💡 Digunakan untuk simulasi navigasi ke InvoicePage
  isApproved: true,
};

const STEPS = [
  "Data Pribadi",
  "Alamat",
  "Foto KTP",
  "Swafoto",
  "Data Bank",
  "Ringkasan",
];

export default function RegistrationFormDetail() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(MOCK_DATA);

  // --- HANDLER DASAR ---
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSetCapturedImage = useCallback((name, image) => {
    setFormData((prev) => ({ ...prev, [name]: image }));
  }, []);

  const handleBackToRegistrationPage = useCallback(() => {
    const token = jwtEncode({ page: "registrationPage" });
    navigate(`/${token}`);
  }, [navigate]);

  // --- HANDLER NAVIGASI STEP ---
  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleEditStep = useCallback((stepIndex) => {
    setCurrentStep(stepIndex);
  }, []);

  // --- FUNGSI SUBMIT (AKSI FINAL) ---
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (currentStep === STEPS.length - 1) {
        console.log("Data Pendaftaran Akhir Dikirim:", formData);

        // --- LOGIKA PENGECEKAN APPROVAL ---

        if (formData.isApproved) {
          alert("Pendaftaran disetujui! Lanjut ke Halaman Invoice.");
          console.log("Navigasi ke Halaman Invoice.");

          // Navigasi ke halaman Invoice (pages/global/invoice/InvoicePage.jsx)
          const token = jwtEncode({
            page: "invoicePage",
            // 💡 Menambahkan return key agar tombol kembali di InvoicePage mengarah ke sini
            return: "registrationFormDetail",
          });
          navigate(`/${token}`);
        } else {
          alert(
            "Formulir pendaftaran berhasil dikirim! Silakan tunggu verifikasi dan approval."
          );
          console.log("Navigasi ke Halaman Dashboard/Status.");

          // Navigasi ke Halaman Dashboard
          const token = jwtEncode({ page: "dashboardPage" });
          navigate(`/${token}`);
        }
      } else {
        console.warn("Mencoba submit sebelum langkah terakhir.");
      }
    },
    [currentStep, formData, navigate]
  );

  // --- RENDERING KONTEN BERDASARKAN STEP ---
  const renderStepContent = useCallback(() => {
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
        return <div>Langkah tidak ditemukan.</div>;
    }
  }, [
    currentStep,
    formData,
    handleChange,
    handleSetCapturedImage,
    handleEditStep,
  ]);

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <DashboardLayout>
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBackToRegistrationPage}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Form Pendaftaran Anggota
          </h3>
        </div>
      </div>

      {/* --- KONTEN STEPPER --- */}
      <div className="row">
        <div className="col-lg-10 col-xl-8 mx-auto">
          <Card className="shadow-lg">
            <Card.Body>
              {/* Progress Bar (Stepper Visual) */}
              <ProgressBar
                now={progressPercent}
                label={`Langkah ${currentStep + 1} dari ${STEPS.length}`}
                className="mb-4"
                variant="primary"
              />

              <Form onSubmit={handleSubmit}>
                {renderStepContent()}

                {/* Tombol Navigasi Form */}
                <div className="d-flex justify-content-between mt-5">
                  <Button
                    variant="secondary"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                  >
                    <FaArrowLeft className="me-2" /> Kembali
                  </Button>

                  {/* Logika Tombol Akhir */}
                  {currentStep < STEPS.length - 1 ? (
                    <Button
                      variant="primary"
                      onClick={handleNext}
                      type="button" // Mencegah tombol Lanjut memicu form submit
                    >
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
