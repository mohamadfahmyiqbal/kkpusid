import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import {
  FaSignInAlt,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { jwtEncode } from "../../../../utils/helpers";
import { useLoginForm } from "../hooks/useLoginForm";
import { AUTH_CONSTANTS } from "../../constants/authConstants";
import "./LoginPage.css";

const REGISTER_PATH = `/${jwtEncode({ page: "accountRegisterPage" })}`;
const FORGOT_PASSWORD_PATH = `/${jwtEncode({ page: "authForgotPassword" })}`;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    emailHp,
    password,
    loading,
    error,
    emailHpInvalid,
    passwordInvalid,
    setEmailHp,
    setPassword,
    handleLogin,
  } = useLoginForm();

  return (
    <div className="pbs-login-v2">
      {/* Header Topbar */}
      <header className="pbs-login-topbar" id="header-topbar" name="header-topbar">
        <Container fluid="lg">
          <div className="pbs-topbar-wrap py-3 d-flex justify-content-between align-items-center">
            <div className="pbs-topbar-brand">
              <a
                href={`/${jwtEncode({ page: "globalSplash" })}`}
                className="d-flex align-items-center gap-3 text-decoration-none"
              >
                <img
                  src="/assets/icons/PUSlogo.png"
                  alt="PUS Logo"
                  className="pbs-brand-logo"
                />
                <div>
                  <strong className="text-white d-block fs-5 mb-0 pbs-brand-title">
                    Paguyuban Usaha Sukses
                  </strong>
                </div>
              </a>
            </div>

            <div className="pbs-topbar-login d-flex align-items-center gap-3">
              <span className="d-none d-sm-inline text-white-50 small">Belum punya akun?</span>
              <a href={REGISTER_PATH} className="pbs-topbar-register-btn">
                Daftar
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="pbs-login-content py-5" id="main-content-area" name="main-content-area">
        <Container fluid="lg">
          <Row className="g-5 align-items-stretch justify-content-center">
            
            {/* LEFT SIDE - Info & Benefits */}
            <Col lg={6} className="d-none d-lg-block" id="left-side-info-benefits" name="left-side-info-benefits">
              <section className="pbs-login-left-v2">
                <div className="mosque-overlay"></div>
                <div className="pbs-login-info-wrap">
                  <div className="mb-4">
                    <span className="badge rounded-pill bg-success bg-opacity-25 text-success px-3 py-2 mb-3 pbs-login-badge">PAGUYUBAN USAHA</span>
                    <h1 className="display-5 fw-bold text-white mb-3 pbs-login-title">
                      Selamat Datang<br />
                      Kembali di<br />
                      <span className="pbs-text-highlight">PUS Mobile</span>
                    </h1>
                    <p className="text-white-50 pbs-login-desc">
                      Kelola usaha, pantau simpanan, dan akses layanan pembiayaan syariah dalam satu genggaman. Bersama membangun ekonomi yang lebih berkah.
                    </p>
                  </div>

                  <div className="text-center my-5">
                    <img
                      src="/assets/images/login_illustration.png"
                      alt="Illustration"
                      className="img-fluid animate-float pbs-login-illustration"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/images/register_illustration.png"; // Fallback to register illustration if login one missing
                      }}
                    />
                  </div>

                  <div className="d-flex flex-column gap-4">
                    {[
                      { icon: <FaShieldAlt size={22} />, title: "Transparan & Aman", desc: "Sistem amanah dengan pantauan real-time." },
                      { icon: <FaUsers size={22} />, title: "Komunitas Solid", desc: "Akses jaringan pengusaha di seluruh Indonesia." },
                      { icon: <FaChartLine size={22} />, title: "Pantau Pertumbuhan", desc: "Lihat perkembangan saldo dan bagi hasil Anda." },
                    ].map((item, idx) => (
                      <div className="d-flex align-items-start gap-3" key={idx}>
                        <div className="d-flex align-items-center justify-content-center rounded-3 pbs-benefit-icon-container">
                          {item.icon}
                        </div>
                        <div>
                          <h6 className="text-white fw-bold mb-1">{item.title}</h6>
                          <small className="text-white-50 d-block">{item.desc}</small>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="d-flex align-items-center gap-3 bg-white bg-opacity-5 p-4 rounded-4 border border-white border-opacity-10 mt-5">
                    <div className="bg-success bg-opacity-20 p-2 rounded-circle d-flex align-items-center justify-content-center pbs-support-icon-container">
                      <FaHeadset className="pbs-support-icon" />
                    </div>
                    <div>
                      <small className="d-block text-muted">Butuh bantuan?</small>
                      <span className="text-dark fw-bold small">
                        Hubungi kami di 0812-3456-7890
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </Col>

            {/* RIGHT SIDE - Login Form */}
            <Col lg={6} md={10} xs={12} id="right-side-login-form" name="right-side-login-form">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="pbs-login-card-v2">
                  <div className="pbs-login-card-body">
                    <div className="text-center mb-4">
                      <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle pbs-card-icon-container">
                        <FaSignInAlt size={30} />
                      </div>
                      <h3 className="fw-bold text-dark mb-1">Masuk ke Akun</h3>
                      <p className="text-muted small">Silakan masukkan detail akun Anda</p>
                    </div>

                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="alert alert-danger mb-4 p-3 d-flex align-items-center gap-3 border-0 rounded-4 pbs-login-error-alert"
                      >
                        <div className="bg-danger bg-opacity-10 p-2 rounded-circle d-flex align-items-center justify-content-center pbs-login-error-icon-wrap">
                          <span className="fw-bold">!</span>
                        </div>
                        <span className="small fw-semibold">{error}</span>
                      </motion.div>
                    )}

                    <Form onSubmit={handleLogin} noValidate>
                      <Row className="g-4">
                        <Col md={12}>
                          <Form.Label>Email atau Nomor WhatsApp</Form.Label>
                          <InputGroup>
                            <InputGroup.Text><FaUser /></InputGroup.Text>
                            <Form.Control
                              value={emailHp}
                              onChange={(e) => setEmailHp(e.target.value)}
                              isInvalid={emailHpInvalid}
                              placeholder={AUTH_CONSTANTS.PLACEHOLDERS.EMAIL_OR_PHONE}
                            />
                            <Form.Control.Feedback type="invalid">
                              {AUTH_CONSTANTS.ERROR_MESSAGES.EMAIL_OR_PHONE_INVALID}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={12}>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <Form.Label className="mb-0">Password</Form.Label>
                            <a href={FORGOT_PASSWORD_PATH} className="pbs-forgot-link">
                              Lupa Password?
                            </a>
                          </div>
                          <InputGroup>
                            <InputGroup.Text><FaLock /></InputGroup.Text>
                            <Form.Control
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              isInvalid={passwordInvalid}
                              type={showPassword ? "text" : "password"}
                              placeholder={AUTH_CONSTANTS.PLACEHOLDERS.LOGIN_PASSWORD}
                            />
                            <Button
                              variant="light"
                              className="border border-start-0 text-muted pbs-password-eye-btn"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            <Form.Control.Feedback type="invalid">
                              {AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={12} className="mt-4 pt-2">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="pbs-submit-v2"
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Memproses...
                              </>
                            ) : (
                              <>
                                Masuk Sekarang <FaArrowRight size={14} />
                              </>
                            )}
                          </Button>
                        </Col>

                        <Col md={12} className="text-center mt-4 pt-2">
                          <p className="text-muted small">
                            Belum memiliki akun anggota?{" "}
                            <a href={REGISTER_PATH} className="text-decoration-none fw-bold text-primary">
                              Daftar di Sini
                            </a>
                          </p>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
