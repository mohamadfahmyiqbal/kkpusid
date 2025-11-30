// pages/auth/LoginPage.jsx
import React, { useState } from "react";
// ... (imports lainnya)
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// PATH FIXES:
import { jwtEncode } from "../../routes/helpers";
import LandingHeader from "../global/landing/component/LandingHeader";
import LandingFooter from "../global/landing/component/LandingFooter";

const DASHBOARD_PATH = `/${jwtEncode({ page: "dashboard" })}`;
const REGISTER_PATH = `/${jwtEncode({ page: "authRegister" })}`;
const FORGOT_PASSWORD_PATH = `/${jwtEncode({ page: "authForgotPassword" })}`;

const LoginPage = () => {
  // ... (state dan handleLogin function tetap sama) ...
  const [emailHp, setEmailHp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailHpInvalid, setEmailHpInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setEmailHpInvalid(false);
    setPasswordInvalid(false);

    let isValid = true;
    if (!emailHp || !password) {
      if (!emailHp) setEmailHpInvalid(true);
      if (!password) setPasswordInvalid(true);
      isValid = false;
    }

    if (!isValid) {
      setLoading(false);
      setError("Silakan lengkapi semua bidang yang diperlukan.");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (emailHp === "123456" && password === "123456") {
        localStorage.setItem("token", "mock-auth-token-123");
        navigate(DASHBOARD_PATH, { replace: true });
      } else {
        setError("Email/Nomor HP atau Password salah.");
        setEmailHpInvalid(true);
        setPasswordInvalid(true);
      }
    } catch (err) {
      console.error("Login gagal:", err);
      setError("Terjadi kesalahan saat menghubungi server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="l-main-wrapper" className="d-flex flex-column min-vh-100">
      {/* MENGIRIM PROPS UNTUK HEADER DINAMIS */}
      <LandingHeader targetPageName="landingPage" linkText="" iconType="back" />

      {/* Konten Login di tengah layar */}
      <div className="l-content flex-grow-1 d-flex align-items-center justify-content-center">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={5}>
              <Card className="shadow-lg rounded-4 p-4">
                <Card.Body>
                  <div className="text-center mb-4">
                    <img
                      src="/assets/icons/pusLogo.png"
                      alt="Logo PUS"
                      className="mb-2"
                      style={{ height: "40px" }}
                    />
                    <h3 className="fw-bold mb-0">Masuk Ke Akun PUS</h3>
                  </div>

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleLogin} noValidate>
                    <Form.Group className="mb-3" controlId="formBasicEmailHp">
                      <Form.Label className="fw-normal">
                        Email atau Nomor HP
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Email/Nomor HP"
                        value={emailHp}
                        onChange={(e) => {
                          setEmailHp(e.target.value);
                          setEmailHpInvalid(false);
                        }}
                        required
                        isInvalid={emailHpInvalid}
                        isValid={!emailHpInvalid && emailHp.length > 0}
                        className={
                          !emailHpInvalid && emailHp.length > 0
                            ? "is-valid-custom"
                            : emailHpInvalid
                            ? "is-invalid-custom"
                            : ""
                        }
                        disabled={loading}
                      />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="formBasicPassword">
                      <Form.Label className="fw-normal">Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Masukkan Password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordInvalid(false);
                        }}
                        required
                        isInvalid={passwordInvalid}
                        isValid={!passwordInvalid && password.length > 0}
                        className={
                          !passwordInvalid && password.length > 0
                            ? "is-valid-custom"
                            : passwordInvalid
                            ? "is-invalid-custom"
                            : ""
                        }
                        disabled={loading}
                      />
                    </Form.Group>

                    {/* Link Lupa Sandi? */}
                    <div className="text-end mb-4">
                      <a
                        href={FORGOT_PASSWORD_PATH}
                        className="text-decoration-none"
                      >
                        Lupa Sandi? <span className="fw-bold">Klik disini</span>
                      </a>
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 fw-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Login
                        </>
                      ) : (
                        "Login"
                      )}
                    </Button>

                    {/* Link Belum memiliki akun? */}
                    <div className="text-center mt-3">
                      <p className="mb-0">
                        Belum memiliki akun?{" "}
                        <a
                          href={REGISTER_PATH}
                          className="text-decoration-none fw-bold"
                        >
                          Klik disini
                        </a>
                      </p>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <LandingFooter />
    </div>
  );
};

export default LoginPage;
