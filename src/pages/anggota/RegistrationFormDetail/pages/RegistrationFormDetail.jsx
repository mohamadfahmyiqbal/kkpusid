import React, { useCallback, useState, useEffect, useRef } from "react";
import { Card, CardBody, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaFileSignature } from "react-icons/fa";

import AnggotaService from "../services/AnggotaService";
import { jwtEncode } from "../../../../utils/helpers";
import { useProfile } from "../hooks/useProfile";
import Alert from "../../../../components/ui/SwalAlert";

import {
  TOTAL_STEPS,
  STEP_LABELS,
  validateStep,
  validateRegistration,
  normalizeRegistrationData,
  FIELD_STEP_MAP,
} from "../components/registrationFormHelpers";
import RegistrationProgressBar from "../components/RegistrationProgressBar";
import RegistrationStepContent from "../components/RegistrationStepContent";
import RegistrationFormFooter from "../components/RegistrationFormFooter";

import "./RegistrationFormDetail.css";

export default function RegistrationFormDetail() {
  const navigate = useNavigate();
  const stepContainerRef = useRef(null);
  const { userData } = useProfile();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem("temp_reg_data");
      return saved ? JSON.parse(saved) : {};
    } catch {
      localStorage.removeItem("temp_reg_data");
      return {};
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCommitmentChecked, setIsCommitmentChecked] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  // One-shot focus request: hanya diisi oleh aksi Next/Submit yang diblokir
  // validasi, bukan oleh setiap perubahan `errors` (lihat plan perbaikan
  // handler validasi tanggal 2026-11-28). `token` memastikan permintaan
  // fokus yang sama tidak dikonsumsi dua kali oleh efek di bawah.
  const [focusRequest, setFocusRequest] = useState(null);
  const focusTokenRef = useRef(0);

  const isLastStep = step === TOTAL_STEPS;
  const progressPercent = (step / TOTAL_STEPS) * 100;

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
        if (
          userData.phone_number &&
          prev.phone_number !== userData.phone_number
        ) {
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

  // Foto identitas tidak boleh bertahan di browser storage.
  useEffect(() => {
    try {
      const { foto_ktp, foto_swafoto, ...safeDraft } = formData;
      localStorage.setItem("temp_reg_data", JSON.stringify(safeDraft));
    } catch (err) {
      console.warn(
        "Gagal menyimpan draf pendaftaran ke localStorage:",
        err?.name || err,
      );
    }
  }, [formData]);

  // Fokus hanya dipindahkan sebagai reaksi satu-kali terhadap aksi Next/Submit
  // yang diblokir validasi (diisi lewat `focusRequest`), bukan setiap kali
  // object `errors` berubah. Dengan begitu mengetik untuk memperbaiki field
  // yang error tidak akan memindahkan fokus ke field lain.
  useEffect(() => {
    if (!focusRequest) return undefined;
    const { fieldName, token } = focusRequest;
    const timer = window.setTimeout(() => {
      document.getElementById(`registration-${fieldName}`)?.focus();
      setFocusRequest((current) => (current?.token === token ? null : current));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [focusRequest]);

  const requestFocus = useCallback((fieldName) => {
    if (!fieldName) return;
    focusTokenRef.current += 1;
    setFocusRequest({ fieldName, token: focusTokenRef.current });
  }, []);

  const handleBack = useCallback(() => {
    navigate(`/${jwtEncode({ page: "registrationPage" })}`);
  }, [navigate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors[name];
      return nextErrors;
    });
  }, []);

  const handleFieldChange = useCallback((name, value) => {
    const updates = typeof name === "object" ? name : { [name]: value };
    setFormData((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => {
      const nextErrors = { ...prev };
      Object.keys(updates).forEach((field) => {
        delete nextErrors[field];
      });
      return nextErrors;
    });
  }, []);

  const handleFieldBlur = useCallback((name) => {
    setFormData((currentData) => {
      const fieldStep = FIELD_STEP_MAP[name];
      if (!fieldStep) return currentData;
      const fieldError = validateStep(fieldStep, currentData)[name];
      setErrors((prev) => {
        const nextErrors = { ...prev };
        if (fieldError) {
          nextErrors[name] = fieldError;
        } else {
          // Jangan simpan key dengan nilai undefined/kosong; Object.keys(errors)
          // dipakai di tempat lain untuk mendeteksi "ada error", sehingga key
          // yang bernilai undefined akan salah terbaca sebagai error.
          delete nextErrors[name];
        }
        return nextErrors;
      });
      return currentData;
    });
  }, []);

  const handleSetCapturedImage = useCallback(
    (fieldName, base64Image) => {
      handleFieldChange(fieldName, base64Image);
    },
    [handleFieldChange],
  );

  const nextStep = useCallback(() => {
    const currentErrors = validateStep(step, formData);
    const invalidFields = Object.keys(currentErrors);
    if (invalidFields.length > 0) {
      setErrors(currentErrors);
      requestFocus(invalidFields[0]);
      return;
    }
    setErrors({});
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  }, [step, formData, requestFocus]);

  const prevStep = useCallback(() => {
    setErrors({});
    if (step > 1) setStep((s) => s - 1);
  }, [step]);

  const handleSubmit = useCallback(async () => {
    if (!isCommitmentChecked) return;

    const normalizedData = normalizeRegistrationData(formData);
    const { errors: finalErrors, firstInvalidStep } =
      validateRegistration(normalizedData);
    if (Object.keys(finalErrors).length > 0) {
      setErrors(finalErrors);
      setSubmitError("Masih ada data yang belum lengkap. Silakan cek kembali.");
      setStep(firstInvalidStep);
      const firstInvalidField = Object.keys(
        validateStep(firstInvalidStep, normalizedData),
      )[0];
      requestFocus(firstInvalidField);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await AnggotaService.submitRegistration(normalizedData);
      if (response.data?.status === true) {
        localStorage.removeItem("temp_reg_data");
        const regLink = `/${jwtEncode({ page: "registrationPage" })}`;
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pengajuan pendaftaran anggota berhasil dikirim.",
          confirmButtonText: "Lihat Status Pendaftaran",
        }).then(() => {
          navigate(regLink);
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
  }, [isCommitmentChecked, formData, navigate, requestFocus]);

  return (
    <div className="pb-5 dash-fade-in dashboard-shell">
      <div className="px-0">
        <Row className="g-0 justify-content-center">
          <Col xs={12}>
            <Card className="border-0 shadow-none rounded-0 overflow-hidden min-vh-100">
              <RegistrationProgressBar
                step={step}
                totalSteps={TOTAL_STEPS}
                stepLabels={STEP_LABELS}
                progressPercent={progressPercent}
                onStepClick={setStep}
              />

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
                  <RegistrationStepContent
                    step={step}
                    formData={formData}
                    errors={errors}
                    handleChange={handleChange}
                    handleFieldChange={handleFieldChange}
                    handleFieldBlur={handleFieldBlur}
                    handleSetCapturedImage={handleSetCapturedImage}
                    isCommitmentChecked={isCommitmentChecked}
                    setIsCommitmentChecked={setIsCommitmentChecked}
                    setStep={setStep}
                  />
                </div>

                <RegistrationFormFooter
                  step={step}
                  isLastStep={isLastStep}
                  isSubmitting={isSubmitting}
                  isCommitmentChecked={isCommitmentChecked}
                  onBack={handleBack}
                  onPrev={prevStep}
                  onNext={nextStep}
                  onSubmit={handleSubmit}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
