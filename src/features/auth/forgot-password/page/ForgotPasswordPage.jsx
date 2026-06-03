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
  FaKey,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaGift,
  FaHeadset,
} from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";
import { useForgotPassword } from "../hooks/useForgotPassword";
import { AUTH_CONSTANTS } from "../../constants/authConstants";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

export default function ForgotPasswordPage() {
  const {
    emailHp,
    error,
    loading,
    setEmailHp,
    handleSendOtp,
    validateEmailPhone,
  } = useForgotPassword();

  const [fieldError, setFieldError] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setEmailHp(value);

    if (fieldError && value) {
      setFieldError("");
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
                  Lupa
                  <br />
                  Password?
                  <br />
                  <span>Jangan Khawatir</span>
                </h1>

                <p>
                  Kami akan membantu Anda mereset password. Masukkan email atau
                  nomor WhatsApp yang terdaftar untuk menerima kode OTP.
                </p>

                <div className="pbs-left-illustration">
                  <FaKey className="pbs-hero-icon" />
                </div>

                <div className="pbs-feature-list">
                  <h4>Keamanan Akun Anda</h4>

                  <div className="pbs-feature-item">
                    <FaShieldAlt />
                    <div>
                      <strong>Verifikasi Aman</strong>
                      <span>OTP dikirim ke email/HP terdaftar.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaUsers />
                    <div>
                      <strong>Privasi Terjaga</strong>
                      <span>Data Anda aman dan terenkripsi.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaChartLine />
                    <div>
                      <strong>Proses Cepat</strong>
                      <span>Reset password dalam hitungan menit.</span>
                    </div>
                  </div>

                  <div className="pbs-feature-item">
                    <FaGift />
                    <div>
                      <strong>Bantuan Tersedia</strong>
                      <span>Tim support siap membantu Anda.</span>
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
                      <FaKey />
                    </div>

                    <h2>Reset Password</h2>
                    <p>Masukkan email atau nomor WhatsApp Anda</p>

                    {error && (
                      <div className="alert alert-danger mb-4 p-3">{error}</div>
                    )}

                    {fieldError && (
                      <div className="text-danger small mb-3">{fieldError}</div>
                    )}

                    <Form onSubmit={handleSendOtp} noValidate>
                      <Row className="g-3">
                        <Col md={12}>
                          <Form.Label>Email atau Nomor WA</Form.Label>
                          <Form.Control
                            value={emailHp}
                            onChange={handleInputChange}
                            isInvalid={!!fieldError}
                            placeholder={
                              AUTH_CONSTANTS.PLACEHOLDERS.EMAIL_OR_PHONE
                            }
                            type={emailHp.includes("@") ? "email" : "tel"}
                          />
                          {fieldError && (
                            <div className="text-danger small mt-1">
                              {fieldError}
                            </div>
                          )}
                        </Col>

                        <Col md={12}>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="pbs-submit-v2"
                          >
                            {loading ? "Mengirim OTP..." : "Kirim OTP"}
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
