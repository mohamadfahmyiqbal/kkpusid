// pages/auth/ForgotPasswordPage.jsx
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom"; // Import useNavigate

// PATH FIXES:
import { jwtEncode } from "../../routes/helpers";
import LandingHeader from "../global/landing/component/LandingHeader";
import LandingFooter from "../global/landing/component/LandingFooter";

// Halaman tujuan setelah sukses mengirimkan email
const FORGOT_OTP_PATH = `/${jwtEncode({ page: "authForgotOtp" })}`;
const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

const ForgotPasswordPage = () => {
  const [emailHp, setEmailHp] = useState("");
  const [error, setError] = useState(null);
  // Hapus state 'success' karena kita akan langsung redirect
  const [loading, setLoading] = useState(false);
  const [emailHpInvalid, setEmailHpInvalid] = useState(false);
  const navigate = useNavigate(); // Inisiasi useNavigate

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!emailHp.trim()) {
      setLoading(false);
      setError("Email atau Nomor HP wajib diisi.");
      setEmailHpInvalid(true);
      return;
    }

    try {
      // --- LOGIKA API PENGIRIMAN OTP DI SINI ---
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (emailHp.toLowerCase() === "error@test.com") {
        setError("Akun tidak ditemukan.");
        setEmailHpInvalid(true);
      } else {
        // --- PENGALIHAN (REDIRECT) KE HALAMAN OTP ---
        // Redirect ke halaman OTP, idealnya membawa ID user/session untuk verifikasi
        console.log(`Mengirim OTP ke: ${emailHp}. Mengalihkan ke OTP Page.`);

        // Untuk simulasi, kita redirect tanpa membawa data via state/query param yang kompleks:
        navigate(FORGOT_OTP_PATH, { replace: true });
      }
    } catch (err) {
      console.error("Lupa Password gagal:", err);
      setError("Terjadi kesalahan koneksi atau server.");
      setEmailHpInvalid(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="l-main-wrapper" className="d-flex flex-column min-vh-100">
      <LandingHeader
        targetPageName="authLogin"
        linkText="Login"
        iconType="login"
      />

      <div className="l-content flex-grow-1 d-flex align-items-center justify-content-center">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={5}>
              <Card className="shadow-lg rounded-4 p-4">
                <Card.Body>
                  {/* LOGO PUS dan Judul */}
                  <div className="text-center mb-4">
                    <img
                      src="/assets/icons/pusLogo.png"
                      alt="Logo PUS"
                      className="mb-2"
                      style={{ height: "40px" }}
                    />
                    <h3 className="fw-bold mb-0">Lupa Password</h3>
                    <p className="text-muted small mt-2">
                      Masukkan Email atau Nomor HP Anda yang terdaftar untuk
                      menerima instruksi reset password.
                    </p>
                  </div>
                  {/* END LOGO PUS */}

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleForgotPassword} noValidate>
                    <Form.Group className="mb-4" controlId="formBasicEmailHp">
                      <Form.Label className="fw-normal">
                        Email atau Nomor HP
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Email/Nomor HP"
                        value={emailHp}
                        onChange={(e) => {
                          setEmailHp(e.target.value);
                          setError(null);
                        }}
                        required
                        disabled={loading}
                      />
                    </Form.Group>

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
                          Kirim OTP
                        </>
                      ) : (
                        "Kirim OTP"
                      )}
                    </Button>

                    {/* Link Kembali ke Login */}
                    <div className="text-center mt-3">
                      <p className="mb-0">
                        <a
                          href={LOGIN_PATH}
                          className="text-decoration-none fw-bold"
                        >
                          Kembali ke Login
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

export default ForgotPasswordPage;
