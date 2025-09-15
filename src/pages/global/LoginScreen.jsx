import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  Navbar,
  Container,
  Nav,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import UAnggota from "../../utils/UAnggota";
import Notification from "../../comp/global/Notification"; // pastikan import Notification

/**
 * LoginScreen lengkap:
 * - memaksimalkan React-Bootstrap
 * - background gradient pada <main>
 * - sticky footer
 * - notifikasi dari Notification (bukan toast)
 * - simple validation
 */

/* initial form (memo supaya tidak dibuat ulang) */
const useInitialForm = () =>
  useMemo(
    () => ({
      email: "",
      password: "",
      remember: false,
    }),
    []
  );

/* validasi sederhana */
const validate = (values) => {
  const errors = {};
  if (!values.email?.trim()) errors.email = "Email / Nomor HP wajib diisi";
  if (!values.password) errors.password = "Password wajib diisi";
  if (values.password && values.password.length < 6)
    errors.password = "Password minimal 6 karakter";
  return errors;
};

export default function LoginScreen() {
  const INITIAL_FORM = useInitialForm();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const emailRef = useRef(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    if (emailRef.current) emailRef.current.focus();
    return () => {
      isMounted.current = false;
    };
  }, []);

  /* styles minimal, gunakan React-Bootstrap utk lainnya */
  const styles = useMemo(
    () => ({
      glassCard: {
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(6px)",
        borderRadius: 12,
      },
      loginBtn: { letterSpacing: 0.6 },
    }),
    []
  );

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((p) => ({ ...p, [name]: val }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  }, []);

  const handleClick = useCallback(
    (link) => {
      const token = jwtEncode({ page: link.replace(/^\//, "") });
      navigate(`/${token}`, { replace: true });
    },
    [navigate]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (loading) return;

      const newErrors = validate(formData);
      if (Object.keys(newErrors).length) {
        setErrors(newErrors);
        if (newErrors.email && emailRef.current) emailRef.current.focus();
        return;
      }

      setLoading(true);
      try {
        const res = await UAnggota.login({
          email: formData.email,
          password: formData.password,
        });

        // Tampilkan notifikasi dari Notification (bukan toast)
        Notification(res);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          const token = jwtEncode({ page: "dashboard" });
          navigate(`/${token}`);
        }, 3000);
        // }
      } catch (err) {
        const errSrc = err?.response || err;
        Notification(errSrc);
        if (emailRef.current) emailRef.current.focus();
      } finally {
        if (isMounted.current) setLoading(false);
      }
    },
    [formData, loading, navigate]
  );

  const isFormValid = useMemo(
    () => Object.keys(validate(formData)).length === 0,
    [formData]
  );

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar fixed top (React-Bootstrap) */}
      <Navbar
        variant="dark"
        expand="md"
        fixed="top"
        className="shadow-sm border-bottom"
      >
        <Container fluid>
          <Navbar.Brand
            role="button"
            tabIndex={0}
            onClick={() => handleClick("landing")}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && handleClick("landing")
            }
            aria-label="Beranda"
            style={{ cursor: "pointer" }}
          >
            <img src="/assets/icons/pusLogo.png" alt="Logo PUS" height={36} />
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Item>
              <Nav.Link
                onClick={() => handleClick("register")}
                className="d-flex align-items-center text-white"
              >
                <FaSignInAlt className="me-1" /> Register
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>

      {/* Main: gradient background, mengisi ruang (flex-fill) */}
      <main
        className="flex-fill d-flex align-items-center"
        style={{
          paddingTop: 74, // agar tidak tertutup navbar fixed
          background: "linear-gradient(164deg, #13547A 0%, #44938A 78%)",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className="d-flex">
              <Card
                className="w-100 shadow-lg border-0"
                style={styles.glassCard}
                aria-live="polite"
              >
                <Card.Body className="p-4">
                  <h2 className="fw-bold text-white mb-1">Masuk Ke Akun PUS</h2>
                  <p className="text-white-50 mb-3">
                    Masukkan email/nomor HP dan kata sandi Anda.
                  </p>

                  <Form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Form.Group className="mb-3" controlId="login-email">
                      <Form.Label className="text-white">
                        Email / Nomor HP
                      </Form.Label>
                      <Form.Control
                        ref={emailRef}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contoh@domain.com atau 0812xxxx"
                        isInvalid={!!errors.email}
                        disabled={loading}
                        autoComplete="email"
                        spellCheck={false}
                        aria-invalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                      <Form.Text className="text-white-50">
                        Gunakan email atau nomor HP yang terdaftar.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="login-password">
                      <Form.Label className="text-white">Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Masukkan Password"
                          type={showPassword ? "text" : "password"}
                          isInvalid={!!errors.password}
                          disabled={loading}
                          autoComplete="current-password"
                          spellCheck={false}
                          aria-invalid={!!errors.password}
                        />
                        <Button
                          variant="light"
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          disabled={loading}
                          aria-label={
                            showPassword
                              ? "Sembunyikan password"
                              : "Tampilkan password"
                          }
                          aria-pressed={showPassword}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </Button>
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                      <Form.Text className="text-white-50">
                        Jangan bagikan password Anda.
                      </Form.Text>
                    </Form.Group>

                    {/* password strength dihilangkan */}

                    <Row className="mb-2">
                      <Col xs={12} className="mb-1">
                        <span className="text-white me-2">Lupa Sandi?</span>
                        <Link
                          to="/forgot"
                          className="text-white text-decoration-none fw-bold"
                        >
                          Klik untuk reset sandi
                        </Link>
                      </Col>
                      <Col xs={12}>
                        <span className="text-white me-2">
                          Belum punya akun?
                        </span>
                        <Link
                          to="/register"
                          className="text-white text-decoration-none fw-bold"
                        >
                          Klik disini untuk buat akun
                        </Link>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      className="w-100 fw-bold text-uppercase py-2 mt-3"
                      style={styles.loginBtn}
                      disabled={loading || !isFormValid}
                      aria-disabled={loading || !isFormValid}
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
                          Masuk...
                        </>
                      ) : (
                        "Masuk"
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      {/* Sticky footer */}
      <footer className="mt-auto py-2" style={{ background: "#13547A" }}>
        <Container>
          <Row className="align-items-center">
            <Col xs={6} className="text-start small fw-bold text-white">
              PUS @2025
            </Col>
            <Col xs={6} className="text-end small fw-bold text-white">
              Powered By Manova
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
