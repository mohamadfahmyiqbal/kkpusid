// pages/auth/ResetPasswordPage.jsx
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

// PATH FIXES:
import { jwtEncode } from "../../routes/helpers";
import LandingHeader from "../global/landing/component/LandingHeader";
import LandingFooter from "../global/landing/component/LandingFooter";

// Halaman tujuan setelah password berhasil direset
const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`; // <--- Path Login

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [resetToken, setResetToken] = useState("mock-reset-token-from-otp");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (
      !newPassword ||
      !confirmPassword ||
      newPassword !== confirmPassword ||
      newPassword.length < 6
    ) {
      // ... (Error handling)
      if (!newPassword || !confirmPassword) {
        setError("Semua bidang password wajib diisi.");
      } else if (newPassword !== confirmPassword) {
        setError("Password baru dan konfirmasi password tidak cocok.");
      } else if (newPassword.length < 6) {
        setError("Password baru harus memiliki minimal 6 karakter.");
      }
      setLoading(false);
      return;
    }

    try {
      // --- SIMULASI API RESET PASSWORD ---
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Password berhasil direset.");

      // ✅ LOGIKA REDIRECT KE LOGIN SETELAH SUKSES
      alert("Password berhasil diubah. Silakan login kembali.");
      navigate(LOGIN_PATH, { replace: true });
    } catch (err) {
      console.error("Reset Password gagal:", err);
      const apiErrorMessage =
        "Gagal mengatur ulang password. Token mungkin tidak valid.";
      setError(apiErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="l-main-wrapper" className="d-flex flex-column min-vh-100">
      <LandingHeader
        targetPageName="globalSplash"
        linkText="Batal"
        iconType="back"
      />

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
                    <h3 className="fw-bold mb-0">Atur Ulang Password</h3>
                    <p className="text-muted small mt-2">
                      Masukkan password baru Anda.
                    </p>
                  </div>
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleResetPassword} noValidate>
                    <Form.Group className="mb-3" controlId="formNewPassword">
                      <Form.Label className="fw-normal">
                        Password Baru
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Masukkan password baru (min. 6 karakter)"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setError(null);
                        }}
                        required
                        disabled={loading}
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="formConfirmPassword"
                    >
                      <Form.Label className="fw-normal">
                        Konfirmasi Password Baru
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Ulangi password baru"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
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
                          Reset Password
                        </>
                      ) : (
                        "Reset Password"
                      )}
                    </Button>
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

export default ResetPasswordPage;
