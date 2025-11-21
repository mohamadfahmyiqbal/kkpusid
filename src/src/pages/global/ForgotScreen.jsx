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

const INITIAL_FORM = { email: "" };

const validate = ({ email }) => {
  const errors = {};
  const trimmedEmail = (email || "").trim();
  if (!trimmedEmail) {
    errors.email = "Email/Nomor HP wajib diisi";
  } else if (
    !/^([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|\d{10,15})$/.test(
      trimmedEmail
    )
  ) {
    errors.email = "Format email/nomor HP tidak valid";
  }
  return errors;
};

export default function ForgotScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

      try {
        const res = await UAnggota.forgot({ email: formData.email.trim() });
        Notification(res);
        setFormData(INITIAL_FORM);

        // Redirect ke validasiOTP setelah 3 detik jika berhasil
        setTimeout(() => {
          window.location.assign("/verifikasiOTP");
        }, 3000);
      } catch (error) {
        Notification(error?.response || error);
      } finally {
        setLoading(false);
      }
    },
    [formData, loading]
  );

  const isSubmitDisabled = useMemo(
    () => loading || !(formData.email && formData.email.trim()),
    [loading, formData.email]
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
                  <h2 className="fw-bold text-white mb-1">Lupa Password</h2>
                  <p className="text-white-50 mb-0">
                    Silakan masukkan email atau nomor HP yang terdaftar di PUS
                  </p>
                </div>

                <Form onSubmit={handleSubmit} autoComplete="off" noValidate>
                  <Form.Group className="mb-3" controlId="forgot-email">
                    <Form.Label className="text-white">
                      Email / Nomor HP
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Masukkan Email atau Nomor HP"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      disabled={loading}
                      autoComplete="email"
                      spellCheck={false}
                      maxLength={50}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
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
                      "Kirim Permintaan"
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
              Paguyuban Usaha Sukses &copy;2025
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
