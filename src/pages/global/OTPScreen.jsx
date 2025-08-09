import React, { useState, useCallback, useMemo } from "react";
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

const INITIAL_FORM = { otp: "" };

const validate = ({ otp }) => {
  const errors = {};
  const trimmedOtp = (otp || "").trim();
  if (!trimmedOtp) {
    errors.otp = "Kode OTP wajib diisi";
  } else if (!/^\d{6}$/.test(trimmedOtp)) {
    errors.otp = "Kode OTP harus berupa 6 digit angka";
  }
  return errors;
};

export default function OTPScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    // Hanya izinkan angka dan maksimal 6 digit
    if (name === "otp") {
      const sanitized = value.replace(/\D/g, "").slice(0, 6);
      setFormData((prev) => ({ ...prev, [name]: sanitized }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

      try {
        const trimmedOtp = formData.otp.trim();
        const res = await UAnggota.verifikasiOTP({ otp: trimmedOtp });
        Notification(res);
        setFormData(INITIAL_FORM);

        // Kirim OTP ke resetPasswordScreen lewat sessionStorage
        sessionStorage.setItem("otp", trimmedOtp);

        setTimeout(() => {
          window.location.assign(`/resetPasswordScreen`);
        }, 2000);
      } catch (error) {
        Notification(error?.response || error);
      } finally {
        setLoading(false);
      }
    },
    [formData, loading]
  );

  const isSubmitDisabled = useMemo(
    () => loading || !(formData.otp && formData.otp.trim().length === 6),
    [loading, formData.otp]
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
                  <h2 className="fw-bold text-white mb-1">Verifikasi OTP</h2>
                  <p className="text-white-50 mb-0">
                    Silakan masukkan kode OTP 6 digit yang telah dikirim ke
                    email Anda.
                  </p>
                </div>

                <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <Form.Group className="mb-3" controlId="forgot-otp">
                    <Form.Label className="text-white">Kode OTP</Form.Label>
                    <Form.Control
                      type="text"
                      name="otp"
                      inputMode="numeric"
                      pattern="\d{6}"
                      placeholder="Masukkan kode OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      isInvalid={!!errors.otp}
                      disabled={loading}
                      autoComplete="one-time-code"
                      spellCheck={false}
                      maxLength={6}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.otp}
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
                    disabled={isSubmitDisabled}
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
                      "Verifikasi OTP"
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
