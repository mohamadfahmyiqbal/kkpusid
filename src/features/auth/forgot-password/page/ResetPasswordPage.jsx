// Reset Password Page
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  FaLock,
  FaShieldAlt,
  FaKey,
  FaCheckCircle,
  FaTimesCircle,
  FaHeadset,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";
import { useResetPassword } from "../hooks/useResetPassword";
import { AUTH_CONSTANTS } from "../../constants/authConstants";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    newPassword,
    confirmPassword,
    loading,
    error,
    success,
    setNewPassword,
    setConfirmPassword,
    handleResetPassword,
  } = useResetPassword();

  // Detail requirement checks
  const checks = {
    minLength: newPassword.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH,
    hasLower: /[a-z]/.test(newPassword),
    hasUpper: /[A-Z]/.test(newPassword),
    hasNumber: /\d/.test(newPassword),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-~+=/\\\[\]]/.test(newPassword),
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>_\-~+=/\\\[\]]/.test(password)) strength += 20;
    return strength;
  };

  const getPasswordStrengthVariant = () => {
    if (passwordStrength <= 40) return "danger";
    if (passwordStrength <= 60) return "warning";
    if (passwordStrength <= 80) return "info";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 40) return "Lemah";
    if (passwordStrength <= 60) return "Cukup";
    if (passwordStrength <= 80) return "Kuat";
    return "Sangat Kuat";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const handleConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordValid =
    checks.minLength &&
    checks.hasLower &&
    checks.hasUpper &&
    checks.hasNumber &&
    checks.hasSpecial;

  const isMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const isMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="pbs-register-v2">
      {/* --- TOPBAR SECTION --- */}
      <header className="pbs-register-topbar">
        <Container fluid className="px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            {/* Brand Logo & Name */}
            <div className="pbs-topbar-brand">
              <a
                href={`/${jwtEncode({ page: "globalSplash" })}`}
                className="d-flex text-white align-items-center gap-3 text-decoration-none"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/assets/icons/PUSlogo.png`}
                  alt="PBS"
                  width="45"
                  height="45"
                  className="object-fit-contain"
                />
                <div className="d-flex flex-column text-white">
                  <strong className="fs-5 lh-1 fw-bold">Paguyuban Usaha</strong>
                  <span
                    className="text-white-50 small fw-medium"
                    style={{ letterSpacing: "1px" }}
                  >
                    Sukses
                  </span>
                </div>
              </a>
            </div>

            {/* Login Call-to-Action */}
            <div className="d-flex align-items-center gap-3">
              <span className="text-white d-none d-md-inline fw-medium">
                Sudah ingat password?
              </span>
              <a
                href={LOGIN_PATH}
                className="btn btn-outline-primary px-4 rounded-pill fw-semibold"
                style={{ transition: "all 0.3s ease" }}
              >
                Masuk
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* --- MAIN CONTENT SECTION --- */}
      <main className="pbs-register-content">
        <Container fluid>
          <Row className="g-0 align-items-stretch">
            {/* --- LEFT SECTION: Informational & Branding --- */}
            <Col lg={5}>
              <section className="pbs-register-left-v2 h-100 d-flex flex-column justify-content-center p-5 position-relative">
                <div className="z-1">
                  <span className="badge bg-white bg-opacity-25 text-white mb-4 px-3 py-2 rounded-pill fw-semibold letter-spacing-1">
                    KOPERASI SYARIAH
                  </span>

                  <h1 className="text-white fw-bold display-5 mb-4">
                    Buat Password
                    <br />
                    Baru yang
                    <br />
                    <span className="text-white-50 fs-2 d-block mt-2">
                      Lebih Aman
                    </span>
                  </h1>

                  <p
                    className="text-white-50 fs-5 mb-5 lh-lg"
                    style={{ maxWidth: "420px" }}
                  >
                    Perbarui kata sandi akun Anda untuk menjaga kerahasiaan dan
                    keamanan transaksi di portal Paguyuban Usaha Sukses.
                  </p>

                  <div className="pbs-left-illustration mb-5">
                    <div
                      className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg"
                      style={{
                        width: "80px",
                        height: "80px",
                        fontSize: "2.3rem",
                      }}
                    >
                      <FaLock />
                    </div>
                  </div>

                  {/* Feature Checklist */}
                  <div className="pbs-feature-list bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur shadow-sm border border-white border-opacity-25 mb-4">
                    <h4 className="text-white fw-semibold mb-4 fs-5">
                      Standar Keamanan Kata Sandi
                    </h4>

                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-start gap-3 text-white">
                        <div className="bg-white bg-opacity-25 p-2 rounded text-white mt-1">
                          <FaShieldAlt size={18} />
                        </div>
                        <div>
                          <strong className="d-block fw-semibold">
                            Enkripsi End-to-End
                          </strong>
                          <span className="text-white-50 small">
                            Kata sandi baru Anda dienkripsi secara penuh.
                          </span>
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3 text-white">
                        <div className="bg-white bg-opacity-25 p-2 rounded text-white mt-1">
                          <FaKey size={18} />
                        </div>
                        <div>
                          <strong className="d-block fw-semibold">
                            Akses Eksklusif
                          </strong>
                          <span className="text-white-50 small">
                            Hanya Anda yang berhak mengetahui kata sandi akun.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Help Support Box */}
                  <div className="d-flex align-items-center gap-3 text-white mt-auto pt-4 border-top border-white border-opacity-25">
                    <div className="bg-white text-primary rounded-circle p-3 shadow-sm">
                      <FaHeadset size={24} />
                    </div>
                    <div>
                      <strong className="d-block fw-semibold mb-1">
                        Butuh bantuan?
                      </strong>
                      <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold">0812-3456-7890</span>
                        <span className="text-white-50 mx-1">•</span>
                        <small className="text-white-50">info@pbs.co.id</small>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Col>

            {/* --- RIGHT SECTION: Reset Password Form --- */}
            <Col lg={7}>
              <section className="pbs-register-right-v2">
                <Card
                  className="pbs-register-card-v2 border-0 shadow-lg"
                  style={{ borderRadius: "1.5rem" }}
                >
                  <Card.Body className="p-4 p-md-5">
                    <div
                      className="pbs-form-icon mb-4 text-primary"
                      style={{ fontSize: "2rem" }}
                    >
                      <FaLock />
                    </div>

                    <h2 className="fw-bold mb-2">Reset Password</h2>
                    <p className="text-muted mb-4">
                      Silakan tentukan kata sandi baru untuk akun Anda.
                    </p>

                    {/* Alert Notifications */}
                    {error && (
                      <Alert
                        variant="danger"
                        className="mb-4 shadow-sm border-0 d-flex align-items-center gap-2"
                        style={{ borderRadius: "10px" }}
                      >
                        <FaTimesCircle className="flex-shrink-0" />
                        <div>{error}</div>
                      </Alert>
                    )}

                    {success && (
                      <Alert
                        variant="success"
                        className="mb-4 shadow-sm border-0 d-flex align-items-center gap-2"
                        style={{ borderRadius: "10px" }}
                      >
                        <FaCheckCircle className="flex-shrink-0" />
                        <div>
                          {AUTH_CONSTANTS.SUCCESS_MESSAGES.PASSWORD_RESET}
                          <div className="small text-muted mt-1">
                            Mengarahkan Anda ke halaman login...
                          </div>
                        </div>
                      </Alert>
                    )}

                    <Form onSubmit={handleResetPassword} noValidate>
                      <Row className="g-4">
                        {/* New Password */}
                        <Col md={12}>
                          <Form.Label className="fw-semibold small text-secondary mb-2">
                            Password Baru <span className="text-danger">*</span>
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              value={newPassword}
                              onChange={handlePasswordChange}
                              type={showPassword ? "text" : "password"}
                              placeholder={
                                AUTH_CONSTANTS.PLACEHOLDERS.NEW_PASSWORD
                              }
                              disabled={loading || success}
                              autoFocus
                              className="shadow-none border-secondary-subtle pe-5"
                              style={{
                                borderRadius: "10px",
                                minHeight: "48px",
                              }}
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              aria-label={
                                showPassword
                                  ? "Sembunyikan password"
                                  : "Tampilkan password"
                              }
                              onClick={() => setShowPassword(!showPassword)}
                              className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted pe-3 text-decoration-none border-0"
                              style={{ zIndex: 5 }}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>

                          {/* Password Strength Indicator & Checklist */}
                          {newPassword && (
                            <div className="mt-2 p-3 bg-light rounded-3 border border-light-subtle">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <span className="small text-muted">
                                  Kekuatan Password:
                                </span>
                                <span
                                  className={`badge bg-${getPasswordStrengthVariant()} text-white fw-semibold`}
                                >
                                  {getPasswordStrengthText()}
                                </span>
                              </div>
                              <div
                                className="progress mb-3"
                                style={{
                                  height: "6px",
                                  backgroundColor: "#e2e8f0",
                                }}
                              >
                                <div
                                  className={`progress-bar bg-${getPasswordStrengthVariant()}`}
                                  style={{
                                    width: `${passwordStrength}%`,
                                    transition: "width 0.3s ease",
                                  }}
                                />
                              </div>

                              {/* Checklist Requirements */}
                              <div className="row g-2 small text-muted">
                                <div className="col-sm-6 d-flex align-items-center gap-2">
                                  {checks.minLength ? (
                                    <FaCheck className="text-success flex-shrink-0" />
                                  ) : (
                                    <span
                                      className="d-inline-block rounded-circle bg-secondary-subtle"
                                      style={{ width: "8px", height: "8px" }}
                                    />
                                  )}
                                  <span
                                    className={
                                      checks.minLength
                                        ? "text-success fw-medium"
                                        : ""
                                    }
                                  >
                                    Min. 8 Karakter
                                  </span>
                                </div>
                                <div className="col-sm-6 d-flex align-items-center gap-2">
                                  {checks.hasUpper ? (
                                    <FaCheck className="text-success flex-shrink-0" />
                                  ) : (
                                    <span
                                      className="d-inline-block rounded-circle bg-secondary-subtle"
                                      style={{ width: "8px", height: "8px" }}
                                    />
                                  )}
                                  <span
                                    className={
                                      checks.hasUpper
                                        ? "text-success fw-medium"
                                        : ""
                                    }
                                  >
                                    Huruf Besar (A-Z)
                                  </span>
                                </div>
                                <div className="col-sm-6 d-flex align-items-center gap-2">
                                  {checks.hasLower ? (
                                    <FaCheck className="text-success flex-shrink-0" />
                                  ) : (
                                    <span
                                      className="d-inline-block rounded-circle bg-secondary-subtle"
                                      style={{ width: "8px", height: "8px" }}
                                    />
                                  )}
                                  <span
                                    className={
                                      checks.hasLower
                                        ? "text-success fw-medium"
                                        : ""
                                    }
                                  >
                                    Huruf Kecil (a-z)
                                  </span>
                                </div>
                                <div className="col-sm-6 d-flex align-items-center gap-2">
                                  {checks.hasNumber ? (
                                    <FaCheck className="text-success flex-shrink-0" />
                                  ) : (
                                    <span
                                      className="d-inline-block rounded-circle bg-secondary-subtle"
                                      style={{ width: "8px", height: "8px" }}
                                    />
                                  )}
                                  <span
                                    className={
                                      checks.hasNumber
                                        ? "text-success fw-medium"
                                        : ""
                                    }
                                  >
                                    Angka (0-9)
                                  </span>
                                </div>
                                <div className="col-sm-12 d-flex align-items-center gap-2">
                                  {checks.hasSpecial ? (
                                    <FaCheck className="text-success flex-shrink-0" />
                                  ) : (
                                    <span
                                      className="d-inline-block rounded-circle bg-secondary-subtle"
                                      style={{ width: "8px", height: "8px" }}
                                    />
                                  )}
                                  <span
                                    className={
                                      checks.hasSpecial
                                        ? "text-success fw-medium"
                                        : ""
                                    }
                                  >
                                    Karakter Khusus / Simbol (@$!%*?&#...)
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Col>

                        {/* Confirm Password */}
                        <Col md={12}>
                          <Form.Label className="fw-semibold small text-secondary mb-2">
                            Konfirmasi Password Baru{" "}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <div className="position-relative">
                            <Form.Control
                              value={confirmPassword}
                              onChange={handleConfirmChange}
                              type={showConfirm ? "text" : "password"}
                              placeholder={
                                AUTH_CONSTANTS.PLACEHOLDERS.CONFIRM_PASSWORD
                              }
                              disabled={loading || success}
                              isInvalid={isMismatch}
                              isValid={isMatch}
                              className="shadow-none border-secondary-subtle pe-5"
                              style={{
                                borderRadius: "10px",
                                minHeight: "48px",
                              }}
                            />
                            <button
                              type="button"
                              tabIndex={-1}
                              aria-label={
                                showConfirm
                                  ? "Sembunyikan konfirmasi password"
                                  : "Tampilkan konfirmasi password"
                              }
                              onClick={() => setShowConfirm(!showConfirm)}
                              className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted pe-3 text-decoration-none border-0"
                              style={{ zIndex: 5 }}
                            >
                              {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          {confirmPassword && (
                            <div className="mt-2 d-flex align-items-center gap-1 small">
                              {isMatch ? (
                                <span className="text-success d-inline-flex align-items-center gap-1">
                                  <FaCheckCircle /> Password cocok
                                </span>
                              ) : (
                                <span className="text-danger d-inline-flex align-items-center gap-1">
                                  <FaTimesCircle /> Password belum cocok
                                </span>
                              )}
                            </div>
                          )}
                        </Col>

                        {/* Action Buttons */}
                        <Col md={12}>
                          <Button
                            type="submit"
                            disabled={
                              loading ||
                              success ||
                              !isPasswordValid ||
                              !isMatch
                            }
                            className="pbs-submit-v2 w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                            style={{
                              padding: "14px",
                              fontWeight: "600",
                              borderRadius: "10px",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" />
                                <span>Menyimpan Password...</span>
                              </>
                            ) : (
                              <>
                                <span>Reset Password</span>
                                <FaLock size={14} />
                              </>
                            )}
                          </Button>

                          <div className="text-center mt-4 pt-2 border-top">
                            <a
                              href={LOGIN_PATH}
                              className="text-decoration-none text-muted d-inline-flex align-items-center gap-2 pbs-back-link"
                              style={{ transition: "color 0.2s" }}
                              onMouseEnter={(e) =>
                                (e.currentTarget.className =
                                  "text-decoration-none text-primary d-inline-flex align-items-center gap-2")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.className =
                                  "text-decoration-none text-muted d-inline-flex align-items-center gap-2")
                              }
                            >
                              <FaArrowLeft size={14} />
                              <span>Kembali ke Login</span>
                            </a>
                          </div>
                        </Col>
                      </Row>
                    </Form>
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
