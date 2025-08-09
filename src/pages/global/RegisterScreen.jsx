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

const INITIAL_FORM = {
  nama: "",
  email: "",
  hp: "",
  password: "",
  rePassword: "",
};

const validate = ({ nama, email, hp, password, rePassword }) => {
  const errors = {};
  if (!nama.trim()) errors.nama = "Nama wajib diisi";
  if (!email.trim()) {
    errors.email = "Email wajib diisi";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email.trim())
  ) {
    errors.email = "Format email tidak valid";
  }
  if (!hp.trim()) {
    errors.hp = "Nomor HP wajib diisi";
  } else if (!/^\d{10,15}$/.test(hp.trim())) {
    errors.hp = "Format nomor HP tidak valid";
  }
  if (!password) {
    errors.password = "Password wajib diisi";
  } else if (password.length < 6) {
    errors.password = "Password minimal 6 karakter";
  }
  if (!rePassword) {
    errors.rePassword = "Ulangi password wajib diisi";
  } else if (password !== rePassword) {
    errors.rePassword = "Password tidak sama";
  }
  return errors;
};

const RegisterScreen = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const isSubmitDisabled = useMemo(() => {
    return (
      loading ||
      !formData.nama.trim() ||
      !formData.email.trim() ||
      !formData.hp.trim() ||
      !formData.password ||
      !formData.rePassword
    );
  }, [
    loading,
    formData.nama,
    formData.email,
    formData.hp,
    formData.password,
    formData.rePassword,
  ]);

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
        const res = await UAnggota.register({
          nama: formData.nama.trim(),
          email: formData.email.trim(),
          no_tlp: formData.hp.trim(),
          password: formData.password,
          rePassword: formData.rePassword,
        });
        Notification(res);
        setFormData(INITIAL_FORM);

        // Jika berhasil, setelah 3 detik arahkan ke halaman login
        setTimeout(() => {
          window.location.assign("/login");
        }, 3000);
      } catch (error) {
        Notification(error?.response || error);
      } finally {
        setLoading(false);
      }
    },
    [formData]
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
                  <h2 className="fw-bold text-white mb-1">Register</h2>
                  <p className="text-white mb-0">
                    Silakan lengkapi formulir dibawah ini
                  </p>
                </div>

                <Form onSubmit={handleSubmit} autoComplete="off">
                  <Form.Group className="mb-3" controlId="register-nama">
                    <Form.Label className="text-white">Nama</Form.Label>
                    <Form.Control
                      type="text"
                      name="nama"
                      placeholder="Masukkan Nama Lengkap"
                      value={formData.nama}
                      onChange={handleChange}
                      isInvalid={!!errors.nama}
                      disabled={loading}
                      autoComplete="name"
                      spellCheck={false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nama}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="register-email">
                    <Form.Label className="text-white">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Masukkan Email"
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

                  <Form.Group className="mb-3" controlId="register-hp">
                    <Form.Label className="text-white">Nomor HP</Form.Label>
                    <Form.Control
                      type="text"
                      name="hp"
                      placeholder="Masukkan Nomor HP"
                      value={formData.hp}
                      onChange={handleChange}
                      isInvalid={!!errors.hp}
                      disabled={loading}
                      autoComplete="tel"
                      spellCheck={false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.hp}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="register-password">
                    <Form.Label className="text-white">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Masukkan Password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      disabled={loading}
                      autoComplete="new-password"
                      spellCheck={false}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="register-rePassword">
                    <Form.Label className="text-white">
                      Ulangi Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="rePassword"
                      placeholder="Ulangi Password"
                      value={formData.rePassword}
                      onChange={handleChange}
                      isInvalid={!!errors.rePassword}
                      disabled={loading}
                      autoComplete="new-password"
                      spellCheck={false}
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
                      "Daftar"
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
};

export default RegisterScreen;
