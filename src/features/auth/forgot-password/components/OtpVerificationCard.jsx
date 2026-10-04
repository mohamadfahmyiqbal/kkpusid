import React from "react";
import { Card, Form, Row, Col, Badge } from "react-bootstrap";
import { FaShieldAlt, FaClock } from "react-icons/fa";
import OtpInputFields from "./OtpInputFields";
import OtpVerificationFormActions from "./OtpVerificationFormActions";

export default function OtpVerificationCard({
  sessionData,
  timeLeft,
  formatTime,
  isSuccess,
  error,
  attempts,
  useSeparateInputs,
  setUseSeparateInputs,
  otpCode,
  setOtpCode,
  inputRefs,
  handleInputChange,
  handleKeyDown,
  handleSeparatePaste,
  handlePaste,
  loading,
  isBlocked,
  handleVerifyOtp,
  resendLoading,
  handleResendOtp,
  blockTime,
  formatBlockTime,
  loginPath,
}) {
  return (
    <Card className="pbs-register-card-v2 border-0">
      <Card.Body>
        <div className="pbs-form-icon">
          <FaShieldAlt />
        </div>

        <h2>Verifikasi OTP</h2>
        <p>Kode dikirim ke {sessionData?.emailHp || "email Anda"}</p>

        {timeLeft > 0 && !isSuccess && (
          <div className="mb-3">
            <Badge
              bg={
                timeLeft > 120
                  ? "success"
                  : timeLeft > 60
                  ? "warning"
                  : "danger"
              }
              className="px-3 py-2"
            >
              <FaClock className="me-1" />
              Berlaku: {formatTime(timeLeft)}
            </Badge>
          </div>
        )}

        {error && <div className="alert alert-danger mb-4 p-3">{error}</div>}

        {isSuccess ? (
          <div className="text-center py-4">
            <div className="text-success mb-3" style={{ fontSize: "80px" }}>
              ✓
            </div>
            <h4 className="text-success mb-2">OTP Berhasil!</h4>
            <p className="text-muted">Mengalihkan ke reset password...</p>
          </div>
        ) : (
          <Form onSubmit={handleVerifyOtp} noValidate>
            <Row className="g-3">
              <Col md={12}>
                <Form.Label>
                  Kode OTP
                  {attempts > 0 && (
                    <Badge bg="secondary" className="ms-2" pill>
                      Percobaan: {attempts}/3
                    </Badge>
                  )}
                </Form.Label>

                <OtpInputFields
                  useSeparateInputs={useSeparateInputs}
                  onToggleMode={() =>
                    setUseSeparateInputs(!useSeparateInputs)
                  }
                  otpCode={otpCode}
                  setOtpCode={setOtpCode}
                  inputRefs={inputRefs}
                  onInputChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  onSeparatePaste={handleSeparatePaste}
                  onPaste={handlePaste}
                  loading={loading}
                  isBlocked={isBlocked}
                />
              </Col>

              <Col md={12}>
                <OtpVerificationFormActions
                  loading={loading}
                  isBlocked={isBlocked}
                  otpCode={otpCode}
                  resendLoading={resendLoading}
                  onResendOtp={handleResendOtp}
                  blockTime={blockTime}
                  formatBlockTime={formatBlockTime}
                  loginPath={loginPath}
                />
              </Col>
            </Row>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}
