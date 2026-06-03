import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, InputGroup } from "react-bootstrap";
import {
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { jwtEncode } from "../../../utils/helpers";
import useAccountRegister from "../hooks/useAccountRegister";
import "./AccountRegisterPage.css";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    formData,
    loading,
    errors,
    handleInputChange,
    handleRegister,
  } = useAccountRegister();

  return (
    <div className="pbs-register-v2">
      {/* Header Topbar */}
      <header className="pbs-register-topbar">
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
              <span className="d-none d-sm-inline text-white-50 small">Sudah punya akun?</span>
              <a href={LOGIN_PATH} className="pbs-topbar-login-btn">
                Login
              </a>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Area */}
      <main className="pbs-register-content py-4">
        <Container fluid="lg">
          <Row className="g-5 justify-content-center">
            
            {/* LEFT SIDE - Info & Benefits */}
            <Col lg={5} className="d-none d-lg-block">
              <section className="pbs-register-left-v2">
                <div className="mosque-overlay"></div>
                <div className="pbs-register-info-wrap">
                  <div className="mb-4">
                    <span className="badge rounded-pill bg-success bg-opacity-25 text-success px-3 py-2 mb-3 pbs-register-badge">PAGUYUBAN USAHA</span>
                    <h1 className="display-5 fw-bold text-white mb-3 pbs-register-title">
                      Bergabung Dengan<br />
                      Paguyuban Usaha<br />
                      <span className="pbs-text-highlight">Sukses</span>
                    </h1>
                    <p className="text-white-50 pbs-register-desc">
                      Daftar sekarang dan kembangkan usaha Anda bersama komunitas kami. Nikmati berbagai kemudahan dan dukungan untuk kesuksesan bersama.
                    </p>
                  </div>

                  <div className="text-center my-5">
                    <img
                      src="/assets/images/register_illustration.png"
                      alt="Illustration"
                      className="img-fluid animate-float pbs-register-illustration"
                    />
                  </div>

                  <div className="d-flex flex-column gap-4">
                    {[
                      { icon: <FaShieldAlt size={22} />, title: "Aman & Terpercaya", desc: "Komunitas yang berfokus pada kesuksesan bersama." },
                      { icon: <FaUsers size={22} />, title: "Jaringan Luas", desc: "Berhubung dengan ribuan pengusaha lainnya." },
                      { icon: <FaChartLine size={22} />, title: "Dukungan Usaha", desc: "Akses ke sumber daya dan pelatihan bisnis." },
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
                      <small className="d-block text-white-50">Butuh bantuan?</small>
                      <span className="text-white fw-bold small">
                        Hubungi kami di 0812-3456-7890
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </Col>

            {/* RIGHT SIDE - Simplified Form */}
            <Col lg={6} md={10} xs={12}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="pbs-register-card-v2">
                  <div className="pbs-register-card-body">
                    <div className="text-center mb-4">
                      <div className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle pbs-card-icon-container">
                        <FaUserPlus size={30} />
                      </div>
                      <h3 className="fw-bold text-dark mb-1">Buat Akun</h3>
                      <p className="text-muted small">Mulai perjalanan sukses Anda hari ini</p>
                    </div>

                    <Form onSubmit={handleRegister} noValidate>
                      <Row className="g-3">
                        <Col md={12}>
                          <Form.Label>Nama Lengkap</Form.Label>
                          <InputGroup hasValidation>
                            <InputGroup.Text><FaUser /></InputGroup.Text>
                            <Form.Control
                              name="nama"
                              value={formData.nama || ""}
                              onChange={handleInputChange}
                              isInvalid={!!errors.nama}
                              placeholder="Masukkan nama lengkap Anda"
                            />
                            <Form.Control.Feedback type="invalid">{errors.nama}</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={12}>
                          <Form.Label>Email Aktif</Form.Label>
                          <InputGroup hasValidation>
                            <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email || ""}
                              onChange={handleInputChange}
                              isInvalid={!!errors.email}
                              placeholder="nama@email.com"
                            />
                            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={12}>
                          <Form.Label>Password</Form.Label>
                          <InputGroup hasValidation>
                            <InputGroup.Text><FaLock /></InputGroup.Text>
                            <Form.Control
                              type={showPassword ? "text" : "password"}
                              name="password"
                              value={formData.password || ""}
                              onChange={handleInputChange}
                              isInvalid={!!errors.password}
                              placeholder="Buat password minimal 8 karakter"
                            />
                            <Button
                              variant="light"
                              className="border border-start-0 text-muted pbs-password-eye-btn"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={12}>
                          <Form.Label>Konfirmasi Password</Form.Label>
                          <InputGroup hasValidation>
                            <InputGroup.Text><FaLock /></InputGroup.Text>
                            <Form.Control
                              type={showConfirmPassword ? "text" : "password"}
                              name="confirmPassword"
                              value={formData.confirmPassword || ""}
                              onChange={handleInputChange}
                              isInvalid={!!errors.confirmPassword}
                              placeholder="Masukkan kembali password Anda"
                            />
                            <Button
                              variant="light"
                              className="border border-start-0 text-muted pbs-password-eye-btn"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                          </InputGroup>
                        </Col>

                        <Col md={12} className="mt-4">
                          <Button
                            type="submit"
                            disabled={loading}
                            className="pbs-submit-v2 w-100 d-flex align-items-center justify-content-center gap-2"
                          >
                            {loading ? (
                              <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Memproses...
                              </>
                            ) : (
                              <>
                                Daftar Sekarang <FaCheckCircle />
                              </>
                            )}
                          </Button>
                        </Col>

                        <Col md={12} className="text-center mt-3">
                          <span className="text-muted pbs-terms-text">
                            Dengan mendaftar, Anda telah menyetujui <a href="#" className="text-decoration-none">Syarat & Ketentuan</a> Paguyuban Usaha Sukses.
                          </span>
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
