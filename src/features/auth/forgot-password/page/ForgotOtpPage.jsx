// Forgot OTP Page
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Badge} from "react-bootstrap";
import {
  FaShieldAlt,
  FaClock,
  FaSyncAlt,
  FaUsers,
  FaGift,
  FaHeadset,
} from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";
import { useOtpVerification } from "../hooks/useOtpVerification";
import { AUTH_CONSTANTS } from "../../constants/authConstants";
import Alert from "../../../../components/ui/SwalAlert";


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
      const newOtpCode = pastedData.padEnd(6, " ");
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
      <header className="pbs-register-topbar">
        <Container fluid>
          <div className="pbs-topbar-wrap">
            <div className="pbs-topbar-brand">
              <a
                href={`/${jwtEncode({ page: "globalSplash" })}`}
                className="d-flex align-items-center gap-3 text-decoration-none"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/PUSlogo.png`}
                  alt="PBS"
                />
                <div>
                  <strong>Paguyuban Usaha</strong>
                  <span>Sukses</span>
                </div>
              </a>
            </div>

            <div className="pbs-topbar-login">
              <span>Ingat password?</span>
              <a href={LOGIN_PATH}>Login</a>
            </div>
          </div>
        </Container>
      </header>

      <main className="pbs-register-content">
        <Container fluid>
          <Row className="g-0 align-items-stretch">
            {/* LEFT */}
            <Col lg={5}>
              <section className="pbs-register-left-v2">
                <span className="pbs-mini-badge">KOPERASI SYARIAH</span>

                <h1>
                  Verifikasi
                  <br />
                  Kode
                  <br />
                  <span>OTP</span>
                </h1>

                <p>
                  Masukkan kode 6 digit yang telah dikirim ke{" "}
                  {sessionData?.emailHp || "email Anda"} untuk
                  melanjutkan proses reset password.
                </p>

                <div className="pbs-left-illustration">
                  <FaShieldAlt className="pbs-hero-icon" />
                </div>

                <div className="pbs-feature-list">
                  <h4>Informasi OTP</h4>

                  <div className="pbs-feature-item">
                    <FaClock />
                    <div>
                      <strong>Berlaku 5 Menit</strong>
                      <span>Kode OTP akan kadaluarsa dalam 5 menit.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaSyncAlt />
                    <div>
                      <strong>Bisa Kirim Ulang</strong>
                      <span>Request ulang jika tidak menerima kode.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaUsers />
                    <div>
                      <strong>Aman & Privat</strong>
                      <span>Kode hanya dikirim ke nomor terdaftar.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaGift />
                    <div>
                      <strong>Proses Otomatis</strong>
                      <span>Setelah verifikasi, lanjut ke reset password.</span>
                    </div>
                  </div>
                </div>

                <div className="pbs-help-box">
                  <FaHeadset />
                  <div>
                    <strong>Butuh bantuan?</strong>
                    <span>0812-3456-7890</span>
                    <small>info@pbs.co.id</small>
                  </div>
                </div>
              </section>
            </Col>

            {/* RIGHT */}
            <Col lg={7}>
              <section className="pbs-register-right-v2">
                <Card className="pbs-register-card-v2 border-0">
                  <Card.Body>
                    <div className="pbs-form-icon">
                      <FaShieldAlt />
                    </div>

                    <h2>Verifikasi OTP</h2>
                    <p>
                      Kode dikirim ke{" "}
                      {sessionData?.emailHp || "email Anda"}
                    </p>

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

                    {error && (
                      <div className="alert alert-danger mb-4 p-3">{error}</div>
                    )}

                    {isSuccess ? (
                      <div className="text-center py-4">
                        <div
                          className="text-success mb-3"
                          style={{ fontSize: "80px" }}
                        >
                          ✓
                        </div>
                        <h4 className="text-success mb-2">OTP Berhasil!</h4>
                        <p className="text-muted">
                          Mengalihkan ke reset password...
                        </p>
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

                            <div className="d-flex justify-content-end mb-2">
                              <Button
                                variant="link"
                                size="sm"
                                className="text-decoration-none p-0"
                                onClick={() =>
                                  setUseSeparateInputs(!useSeparateInputs)
                                }
                              >
                                {useSeparateInputs
                                  ? "Gunakan input tunggal"
                                  : "Gunakan input terpisah"}
                              </Button>
                            </div>

                            {useSeparateInputs ? (
                              <div
                                className="d-flex gap-2"
                                onPaste={handleSeparatePaste}
                              >
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                  <Form.Control
                                    key={index}
                                    ref={(el) =>
                                      (inputRefs.current[index] = el)
                                    }
                                    type="text"
                                    className="text-center"
                                    style={{
                                      width: "50px",
                                      height: "58px",
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                    }}
                                    value={otpCode[index] || ""}
                                    onChange={(e) =>
                                      handleInputChange(index, e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    maxLength={1}
                                    required
                                    disabled={loading || isBlocked}
                                    inputMode="numeric"
                                    autoComplete="one-time-code"
                                  />
                                ))}
                              </div>
                            ) : (
                              <Form.Control
                                type="text"
                                placeholder={
                                  AUTH_CONSTANTS.PLACEHOLDERS.OTP_CODE
                                }
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                                onPaste={handlePaste}
                                maxLength={6}
                                required
                                disabled={loading || isBlocked}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                style={{
                                  letterSpacing: "8px",
                                  fontSize: "24px",
                                  fontWeight: "bold",
                                  textAlign: "center",
                                }}
                              />
                            )}
                          </Col>

                          <Col md={12}>
                            <Button
                              type="submit"
                              disabled={
                                loading ||
                                isBlocked ||
                                otpCode.replace(/\s/g, "").length !== 6
                              }
                              className="pbs-submit-v2"
                            >
                              {loading ? "Memverifikasi..." : "Verifikasi Kode"}
                            </Button>

                            <div className="text-center mt-3">
                              <p className="mb-2 small">
                                Tidak menerima kode?
                                <button
                                  type="button"
                                  onClick={handleResendOtp}
                                  disabled={resendLoading}
                                  className="btn btn-link p-0 text-decoration-none fw-bold ms-1"
                                >
                                  {resendLoading
                                    ? "Mengirim..."
                                    : "Kirim Ulang"}
                                </button>
                              </p>

                              {isBlocked && (
                                <Alert variant="warning" className="mt-2">
                                  <FaClock className="me-2" />
                                  Terlalu banyak percobaan. Coba lagi dalam{" "}
                                  {formatBlockTime(blockTime)}.
                                </Alert>
                              )}

                              <p className="mb-0">
                                <a
                                  href={LOGIN_PATH}
                                  className="text-decoration-none"
                                >
                                  Batal dan Kembali ke Login
                                </a>
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
