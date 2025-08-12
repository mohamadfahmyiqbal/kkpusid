import React, { useState, useCallback } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import UAnggota from "../../utils/UAnggota";
import Notification from "../../comp/global/Notification";
import { jwtEncode } from "../../routes/helpers"; // Import fungsi enkripsi

const INITIAL_FORM = { email: "", password: "" };

const validate = ({ email, password }) => {
  const errors = {};
  if (!email) errors.email = "Email/Nomor HP wajib diisi";
  if (!password) errors.password = "Password wajib diisi";
  return errors;
};

export default function LoginScreen() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setErrors({});

      const newErrors = validate(formData);
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        setLoading(false);
        return;
      }

      try {
        const res = await UAnggota.login(formData);
        Notification(res);

        // Enkripsi data sebelum berpindah halaman
        const token = jwtEncode({ page: "dashboard" });

        // Jika login berhasil, arahkan ke dashboard (terenkripsi) dalam 3 detik
        setTimeout(() => {
          navigate(`/page/${token}`, { replace: true });
        }, 3000);
      } catch (error) {
        // error bisa berupa error object atau response error
        Notification(error?.response || error);
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate]
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
              <FaSignInAlt color="white" size={32} title="Sign In" />
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
                  <h2 className="fw-bold text-white mb-1">Masuk Ke Akun PUS</h2>
                  <p className="text-white-50 mb-0">
                    Silakan masukkan email/nomor HP dan password Anda
                  </p>
                </div>

                <Form onSubmit={handleSubmit} autoComplete="off">
                  <Form.Group className="mb-3" controlId="login-email">
                    <Form.Label className="text-white">
                      Email / Nomor HP
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      placeholder="Masukkan Email / Nomor HP"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      disabled={loading}
                      autoComplete="email"
                      spellCheck={false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="login-password">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Masukkan Password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      disabled={loading}
                      autoComplete="current-password"
                      spellCheck={false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Row>
                    <Col xs={12}>
                      <span className="text-white me-2">Lupa Sandi?</span>
                      <Link
                        to="/forgot"
                        className="text-white text-decoration-none"
                      >
                        <span className="fw-bold text-white">
                          Klik untuk reset sandi
                        </span>
                      </Link>
                    </Col>
                    <Col xs={12}>
                      <span className="text-white me-2">
                        Belum punya account?
                      </span>
                      <Link
                        to="/register"
                        className="text-white text-decoration-none"
                      >
                        <span className="fw-bold text-info">
                          Klik disini untuk buat account
                        </span>
                      </Link>
                    </Col>
                  </Row>
                  <Button
                    type="submit"
                    className="w-100 fw-bold text-uppercase py-2 mt-3"
                    style={{
                      backgroundColor: "#13547A",
                      border: "none",
                      letterSpacing: 1,
                    }}
                    disabled={loading}
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
                      "Login"
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
