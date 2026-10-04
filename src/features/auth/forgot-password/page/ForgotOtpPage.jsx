// Forgot OTP Page
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { jwtEncode } from "../../../../utils/helpers";
import { useOtpVerification } from "../hooks/useOtpVerification";

import ForgotOtpTopbar from "../components/ForgotOtpTopbar";
import ForgotOtpSidebar from "../components/ForgotOtpSidebar";
import OtpVerificationCard from "../components/OtpVerificationCard";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

export default function ForgotOtpPage() {
  const inputRefs = useRef([]);
  const [useSeparateInputs, setUseSeparateInputs] = useState(true);
  const {
    otpCode,
    loading,
    error,
    sessionData,
    resendLoading,
    attempts,
    isSuccess,
    isBlocked,
    timeLeft,
    blockTime,
    formatTime,
    formatBlockTime,
    setOtpCode,
    handleVerifyOtp,
    handleResendOtp,
    handlePaste,
  } = useOtpVerification();

  useEffect(() => {
    if (inputRefs.current[0] && !isSuccess) {
      inputRefs.current[0].focus();
    }
  }, [isSuccess]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      const pastedData = value.replace(/\D/g, "").slice(0, 6);
      setOtpCode(pastedData);
      const focusIndex = Math.min(pastedData.length, 5);
      if (inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    } else {
      const newOtpCode = otpCode.split("");
      newOtpCode[index] = value;
      setOtpCode(newOtpCode.join(""));
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpCode[index] && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowRight" && index < 5) {
      if (inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSeparatePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = pastedData[i];
      }
    }

    setOtpCode(pastedData);
    const focusIndex = Math.min(pastedData.length, 5);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  return (
    <div className="pbs-register-v2">
      <ForgotOtpTopbar loginPath={LOGIN_PATH} />

      <main className="pbs-register-content">
        <Container fluid>
          <Row className="g-0 align-items-stretch">
            {/* LEFT SIDEBAR */}
            <Col lg={5}>
              <ForgotOtpSidebar emailHp={sessionData?.emailHp} />
            </Col>

            {/* RIGHT FORM */}
            <Col lg={7}>
              <section className="pbs-register-right-v2">
                <OtpVerificationCard
                  sessionData={sessionData}
                  timeLeft={timeLeft}
                  formatTime={formatTime}
                  isSuccess={isSuccess}
                  error={error}
                  attempts={attempts}
                  useSeparateInputs={useSeparateInputs}
                  setUseSeparateInputs={setUseSeparateInputs}
                  otpCode={otpCode}
                  setOtpCode={setOtpCode}
                  inputRefs={inputRefs}
                  handleInputChange={handleInputChange}
                  handleKeyDown={handleKeyDown}
                  handleSeparatePaste={handleSeparatePaste}
                  handlePaste={handlePaste}
                  loading={loading}
                  isBlocked={isBlocked}
                  handleVerifyOtp={handleVerifyOtp}
                  resendLoading={resendLoading}
                  handleResendOtp={handleResendOtp}
                  blockTime={blockTime}
                  formatBlockTime={formatBlockTime}
                  loginPath={LOGIN_PATH}
                />
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
