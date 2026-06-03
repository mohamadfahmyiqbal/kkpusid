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
} from "react-bootstrap";
import {
  FaLock,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaGift,
  FaHeadset,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";
import { useResetPassword } from "../hooks/useResetPassword";
import { AUTH_CONSTANTS } from "../../constants/authConstants";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPasswordMatch, setShowPasswordMatch] = useState(false);

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

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthVariant = () => {
    if (passwordStrength <= 25) return "danger";
    if (passwordStrength <= 50) return "warning";
    if (passwordStrength <= 75) return "info";
    return "success";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 25) return "Lemah";
    if (passwordStrength <= 50) return "Sedang";
    if (passwordStrength <= 75) return "Kuat";
    return "Sangat Kuat";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const handleConfirmChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setShowPasswordMatch(newPassword === value);
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
                  Buat Password
                  <br />
                  Baru
                  <br />
                  <span>Aman</span>
                </h1>

                <p>
                  Buat password baru yang kuat dan mudah diingat. Gunakan
                  kombinasi huruf besar, kecil, angka, dan simbol untuk keamanan
                  maksimal.
                </p>

                <div className="pbs-left-illustration">
                  <FaLock className="pbs-hero-icon" />
                </div>

                <div className="pbs-feature-list">
                  <h4>Tips Password Aman</h4>

                  <div className="pbs-feature-item">
                    <FaShieldAlt />
                    <div>
                      <strong>Minimal 8 Karakter</strong>
                      <span>Semakin panjang, semakin aman.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaUsers />
                    <div>
                      <strong>Kombinasi Karakter</strong>
                      <span>Gunakan huruf, angka, dan simbol.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaChartLine />
                    <div>
                      <strong>Hindar Kata Umum</strong>
                      <span>Jangan gunakan tanggal lahir atau nama.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaGift />
                    <div>
                      <strong>Ganti Berkala</strong>
                      <span>Update password setiap 3-6 bulan.</span>
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
                      <FaLock />
                    </div>

                    <h2>Reset Password</h2>
                    <p>Masukkan password baru Anda</p>

                    {error && (
                      <div className="alert alert-danger mb-4 p-3">{error}</div>
                    )}

                    {success && (
                      <div className="alert alert-success mb-4 p-3">
                        {AUTH_CONSTANTS.SUCCESS_MESSAGES.PASSWORD_RESET}
                      </div>
                    )}

                    <Form onSubmit={handleResetPassword} noValidate>
                      <Row className="g-3">
                        <Col md={12}>
                          <Form.Label>Password Baru</Form.Label>
                          <div className="pbs-pass-wrap">
                            <Form.Control
                              value={newPassword}
                              onChange={handlePasswordChange}
                              type={showPassword ? "text" : "password"}
                              placeholder={
                                AUTH_CONSTANTS.PLACEHOLDERS.NEW_PASSWORD
                              }
                              disabled={loading || success}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          {newPassword && (
                            <div className="mt-2">
                              <div
                                className="progress"
                                style={{ height: "6px" }}
                              >
                                <div
                                  className={`progress-bar bg-${getPasswordStrengthVariant()}`}
                                  style={{ width: `${passwordStrength}%` }}
                                />
                              </div>
                              <small
                                className={`text-${getPasswordStrengthVariant()} mt-1 d-block`}
                              >
                                Kekuatan: {getPasswordStrengthText()}
                              </small>
                            </div>
                          )}
                        </Col>

                        <Col md={12}>
                          <Form.Label>Konfirmasi Password Baru</Form.Label>
                          <div className="pbs-pass-wrap">
                            <Form.Control
                              value={confirmPassword}
                              onChange={handleConfirmChange}
                              type={showConfirm ? "text" : "password"}
                              placeholder={
                                AUTH_CONSTANTS.PLACEHOLDERS.CONFIRM_PASSWORD
                              }
                              disabled={loading || success}
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirm(!showConfirm)}
                            >
                              {showConfirm ? <FaEyeSlash /> : <FaEye />}
                            </button>
                          </div>
                          {confirmPassword && (
                            <div className="mt-1">
                              <small
                                className={
                                  showPasswordMatch
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {showPasswordMatch
                                  ? "✓ Password cocok"
                                  : "✗ Password tidak cocok"}
                              </small>
                            </div>
                          )}
                        </Col>

                        <Col md={12}>
                          <Button
                            type="submit"
                            disabled={loading || success}
                            className="pbs-submit-v2"
                          >
                            {loading ? "Memproses..." : "Reset Password"}
                          </Button>

                          <small className="pbs-bottom-note">
                            Kembali ke{" "}
                            <a
                              href={LOGIN_PATH}
                              className="text-decoration-none"
                            >
                              Login
                            </a>
                          </small>
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
