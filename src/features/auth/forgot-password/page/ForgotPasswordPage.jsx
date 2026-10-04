import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  FloatingLabel,
  Spinner,
} from "react-bootstrap";
import {
  FaKey,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaPaperPlane,
  FaArrowLeft,
} from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";
import { useForgotPassword } from "../hooks/useForgotPassword";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

export default function ForgotPasswordPage() {
  const {
    emailHp,
    error,
    loading,
    setEmailHp,
    handleSendOtp,
  } = useForgotPassword();

  const handleInputChange = (e) => {
    setEmailHp(e.target.value);
  };

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
                  <span className="text-white-50 small fw-medium" style={{ letterSpacing: "1px" }}>Sukses</span>
                </div>
              </a>
            </div>

            {/* Login Call-to-Action */}
            <div className="d-flex align-items-center gap-3">
              <span className="text-white d-none d-md-inline fw-medium">Ingat password?</span>
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
                    Lupa
                    <br />
                    Password?
                    <br />
                    <span className="text-white-50 fs-2 d-block mt-2">Jangan Khawatir</span>
                  </h1>

                  <p className="text-white-50 fs-5 mb-5 lh-lg" style={{ maxWidth: "400px" }}>
                    Kami akan membantu Anda mereset password. Masukkan email
                    yang terdaftar untuk menerima kode OTP.
                  </p>

                  <div className="pbs-left-illustration mb-5">
                    <div className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg" style={{ width: "80px", height: "80px", fontSize: "2.5rem" }}>
                      <FaKey />
                    </div>
                  </div>

                  <div className="pbs-feature-list bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur shadow-sm border border-white border-opacity-25 mb-4">
                    <h4 className="text-white fw-semibold mb-4 fs-5">Keamanan Akun Anda</h4>

                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex align-items-start gap-3 text-white">
                        <div className="bg-white bg-opacity-25 p-2 rounded text-white mt-1">
                          <FaShieldAlt size={18} />
                        </div>
                        <div>
                          <strong className="d-block fw-semibold">Verifikasi Aman</strong>
                          <span className="text-white-50 small">OTP dikirim ke email terdaftar.</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3 text-white">
                        <div className="bg-white bg-opacity-25 p-2 rounded text-white mt-1">
                          <FaUsers size={18} />
                        </div>
                        <div>
                          <strong className="d-block fw-semibold">Privasi Terjaga</strong>
                          <span className="text-white-50 small">Data Anda aman dan terenkripsi.</span>
                        </div>
                      </div>

                      <div className="d-flex align-items-start gap-3 text-white">
                        <div className="bg-white bg-opacity-25 p-2 rounded text-white mt-1">
                          <FaChartLine size={18} />
                        </div>
                        <div>
                          <strong className="d-block fw-semibold">Proses Cepat</strong>
                          <span className="text-white-50 small">Reset password dalam hitungan menit.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-3 text-white mt-auto pt-4 border-top border-white border-opacity-25">
                    <div className="bg-white text-primary rounded-circle p-3 shadow-sm">
                      <FaHeadset size={24} />
                    </div>
                    <div>
                      <strong className="d-block fw-semibold mb-1">Butuh bantuan?</strong>
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

            {/* --- RIGHT SECTION: Forgot Password Form --- */}
            <Col lg={7}>
              <section className="pbs-register-right-v2">
                <Card className="pbs-register-card-v2 border-0 shadow-lg" style={{ borderRadius: "1.5rem" }}>
                  <Card.Body className="p-4 p-md-5">
                    <div className="pbs-form-icon mb-4 text-primary" style={{ fontSize: "2rem" }}>
                      <FaKey />
                    </div>

                    <h2 className="fw-bold mb-2">Reset Password</h2>
                    <p className="text-muted mb-4">Masukkan email Anda untuk menerima kode OTP</p>

                    {/* Error Alert Box */}
                    {error && (
                      <Alert variant="danger" className="mb-4 shadow-sm border-0" style={{ borderRadius: "10px" }}>
                        {error}
                      </Alert>
                    )}

                    <Form onSubmit={handleSendOtp} noValidate>
                      <Row className="g-4">
                        {/* Email Input Field */}
                        <Col md={12}>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Email"
                            className="mb-1"
                          >
                            <Form.Control
                              value={emailHp}
                              onChange={handleInputChange}
                              isInvalid={!!error}
                              placeholder="Masukkan alamat email Anda"
                              type="email"
                              autoFocus
                              className="shadow-none border-secondary-subtle"
                              style={{ borderRadius: "10px" }}
                            />
                            <Form.Control.Feedback type="invalid">
                              {error && error.includes("Email") ? error : "Format email tidak valid."}
                            </Form.Control.Feedback>
                          </FloatingLabel>
                        </Col>

                        {/* Submit Button & Navigation */}
                        <Col md={12}>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="pbs-submit-v2 w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                            style={{ padding: "14px", fontWeight: "600", borderRadius: "10px", transition: "all 0.3s ease" }}
                          >
                            {loading ? (
                              <>
                                <Spinner animation="border" size="sm" />
                                <span>Mengirim OTP...</span>
                              </>
                            ) : (
                              <>
                                <span>Kirim OTP</span>
                                <FaPaperPlane />
                              </>
                            )}
                          </Button>
                          
                          <div className="text-center mt-4 pt-2 border-top">
                            <a
                              href={LOGIN_PATH}
                              className="text-decoration-none text-muted d-inline-flex align-items-center gap-2 pbs-back-link"
                              style={{ transition: "color 0.2s" }}
                              onMouseEnter={(e) => (e.currentTarget.className = "text-decoration-none text-primary d-inline-flex align-items-center gap-2")}
                              onMouseLeave={(e) => (e.currentTarget.className = "text-decoration-none text-muted d-inline-flex align-items-center gap-2")}
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
