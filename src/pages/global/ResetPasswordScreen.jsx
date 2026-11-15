import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import UAnggota from "../../utils/UAnggota";
import Notification from "../../comp/global/Notification";

const INITIAL_FORM = { password: "", rePassword: "" };

// Validasi password: minimal 6 karakter, boleh huruf, angka, dan simbol
const validate = ({ password, rePassword }) => {
  const errors = {};
  const trimmedPassword = (password || "").trim();
  const trimmedRePassword = (rePassword || "").trim();

  if (!trimmedPassword) {
    errors.password = "Password wajib diisi";
  } else if (trimmedPassword.length < 6) {
    errors.password = "Password minimal 6 karakter (huruf, angka, simbol)";
  }

  if (!trimmedRePassword) {
    errors.rePassword = "Retype Password wajib diisi";
  } else if (trimmedRePassword.length < 6) {
    errors.rePassword =
      "Retype Password minimal 6 karakter (huruf, angka, simbol)";
  }

  if (
    trimmedPassword &&
    trimmedRePassword &&
    trimmedPassword !== trimmedRePassword
  ) {
    errors.rePassword = "Password dan Retype Password tidak sama";
  }

  return errors;
};

export default function ResetPasswordScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  // Ambil OTP dari sessionStorage saat komponen mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const otpFromSession = sessionStorage.getItem("otp") || "";
      setOtp(otpFromSession);
    }
  }, []);

  // Tidak ada pembatasan karakter, hanya batasi panjang maksimal 32 karakter
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    const sanitized = value.slice(0, 32); // batasi maksimal 32 karakter
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;
      setLoading(true);
      setErrors({});

      const newErrors = validate(formData);
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      if (!otp) {
        Notification({
          message:
            "Kode OTP tidak ditemukan. Silakan ulangi proses reset password.",
        });
        setLoading(false);
        return;
      }

      try {
        // Kirim password baru dan OTP ke backend
        const res = await UAnggota.resetPassword({
          password: formData.password.trim(),
          otp: otp.trim(),
        });
        Notification(res);
        setFormData(INITIAL_FORM);
        // Hapus OTP dari sessionStorage setelah berhasil reset password
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("otp");
        }
        setTimeout(() => {
          window.location.assign("/login");
        }, 2000);
      } catch (error) {
        Notification(error?.response || error);
      } finally {
        setLoading(false);
      }
    },
    [formData, loading, otp]
  );

  // Password minimal 6 karakter, tidak harus angka, boleh huruf/simbol
  const isSubmitDisabled = useMemo(
    () =>
      loading ||
      !(
        formData.password &&
        formData.rePassword &&
        formData.password.length >= 6 &&
        formData.rePassword.length >= 6 &&
        formData.password === formData.rePassword
      ),
    [loading, formData.password, formData.rePassword]
  );

  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100 p-0"
      style={{
        background: "linear-gradient(164deg, #13547A 0%, #44938A 78%)",
      }}
    >
      {/* Header */}
      <header
        className="border-bottom border-white"
        style={{ background: "#13547A" }}
      >
        <Container fluid="lg">
          <Row className="align-items-center py-2">
            <Col xs="auto">
              <h3 className="m-0 fw-bold text-white">PUS</h3>
            </Col>
            <Col className="d-flex justify-content-end">
              <FaSignInAlt
                color="white"
                size={32}
                title="Sign In"
                style={{ cursor: "pointer" }}
                onClick={() => window.location.assign("/login")}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.location.assign("/login");
                  }
                }}
                aria-label="Sign In"
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* Form Card */}
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5} xl={4}>
            <Card
              className="shadow-lg border-0 my-4"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
              }}
            >
              <Card.Body className="p-4">
                <div className="mb-4">
                  <h2 className="fw-bold text-white mb-1">Reset Password</h2>
                  <p className="text-white-50 mb-0">
                    Silakan masukkan password baru (minimal 6 karakter, boleh
                    huruf, angka, dan simbol).
                  </p>
                  {!otp && (
                    <div className="alert alert-warning mt-3 py-2 px-3">
                      Kode OTP tidak ditemukan. Silakan ulangi proses reset
                      password.
                    </div>
                  )}
                </div>

                <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <Form.Group className="mb-3" controlId="reset-password">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      disabled={loading}
                      autoComplete="new-password"
                      spellCheck={false}
                      minLength={6}
                      maxLength={32}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="reset-repassword">
                    <Form.Label className="text-white">
                      Retype Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="rePassword"
                      placeholder="Retype Password"
                      value={formData.rePassword}
                      onChange={handleChange}
                      isInvalid={!!errors.rePassword}
                      disabled={loading}
                      autoComplete="new-password"
                      minLength={6}
                      maxLength={32}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.rePassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button
                    type="submit"
                    className="w-100 fw-bold text-uppercase py-2 mt-3"
                    style={{
                      backgroundColor: "#13547A",
                      border: "none",
                      letterSpacing: 1,
                    }}
                    disabled={isSubmitDisabled || !otp}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Loading...
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

      {/* Footer */}
      <footer
        className="w-100 border-top border-white text-white py-2"
        style={{ background: "#13547A" }}
      >
        <Container>
          <Row className="align-items-center">
            <Col xs={6} className="text-start small fw-bold">
              Paguyuban Usaha Sukses @2025
            </Col>
            <Col xs={6} className="text-end small fw-bold">
              Powered By Manova
            </Col>
          </Row>
        </Container>
      </footer>
    </Container>
  );
}
