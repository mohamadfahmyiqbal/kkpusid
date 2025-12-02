// pages/auth/ForgotOtpPage.jsx
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
import { useNavigate } from "react-router-dom";

// PATH FIXES: Disesuaikan dengan struktur folder
import { jwtEncode } from "../../routes/helpers";
import LandingHeader from "../global/landing/component/LandingHeader";
import LandingFooter from "../global/landing/component/LandingFooter";
// import UAuth from "../../utils/api/UAuth"; // Import jika API sudah siap

// Halaman tujuan setelah OTP terverifikasi
const RESET_PASSWORD_PATH = `/${jwtEncode({ page: "authResetPassword" })}`;
const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

const ForgotOtpPage = () => {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // SIMULASI: Data yang seharusnya dibawa dari halaman ForgotPasswordPage
  // Dalam implementasi nyata, data ini harus diambil dari state React Router atau URL Query Param
  const [targetId, setTargetId] = useState("user@example.com");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!otpCode.trim()) {
      setLoading(false);
      setError("Kode OTP wajib diisi.");
      return;
    }

    try {
      // --- LOGIKA API VERIFIKASI OTP DI SINI ---
      // Contoh API call: await UAuth.verifyOtp(targetId, otpCode);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (otpCode === "123456") {
        // Jika verifikasi sukses, arahkan ke halaman reset password
        // Di sini, Anda harus menyimpan token reset yang diberikan oleh server setelah verifikasi OTP
        navigate(RESET_PASSWORD_PATH, { replace: true });
      } else {
        setError("Kode OTP tidak valid atau sudah kadaluarsa.");
      }
    } catch (err) {
      console.error("Verifikasi OTP gagal:", err);
      // const apiErrorMessage = err.response?.data?.message || "Terjadi kesalahan saat memverifikasi kode.";
      setError("Terjadi kesalahan saat memverifikasi kode.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="l-main-wrapper" className="d-flex flex-column min-vh-100">
      {/* Header akan mengarahkan kembali ke Landing Page */}
      <LandingHeader
        targetPageName="globalSplash"
        linkText="Kembali"
        iconType="back"
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
                    <h3 className="fw-bold mb-0">Verifikasi Kode OTP</h3>
                    <p className="text-muted small mt-2">
                      Kode 6 digit telah dikirimkan ke **{targetId}**. Masukkan
                      kode tersebut di bawah ini.
                    </p>
                  </div>
                  {/* END LOGO PUS */}

                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleVerifyOtp} noValidate>
                    <Form.Group className="mb-4" controlId="formOtpCode">
                      <Form.Label className="fw-normal">Kode OTP</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan kode OTP (6 digit)"
                        value={otpCode}
                        onChange={(e) => {
                          setOtpCode(e.target.value);
                          setError(null);
                        }}
                        maxLength={6}
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
                          Verifikasi
                        </>
                      ) : (
                        "Verifikasi Kode"
                      )}
                    </Button>

                    {/* Link Kirim Ulang dan Batal */}
                    <div className="text-center mt-3">
                      <p className="mb-0 small">
                        Tidak menerima kode?
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Resend OTP logic triggered");
                          }}
                          className="text-decoration-none fw-bold ms-1"
                        >
                          Kirim Ulang
                        </a>
                      </p>
                      <p className="mb-0">
                        <a
                          href={LOGIN_PATH}
                          className="text-decoration-none fw-bold"
                        >
                          Batal dan Kembali ke Login
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

export default ForgotOtpPage;
