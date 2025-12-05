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
import UAuth from "../../utils/api/UAuth"; 
import { jwtEncode } from "../../routes/helpers"; 
import LandingHeader from "../global/landing/component/LandingHeader";
import LandingFooter from "../global/landing/component/LandingFooter";

// --- DATA DUMMY DEFAULT ---
const DEFAULT_EMAIL = "mohamadfahmyiqbal@gmail.com";
const DEFAULT_NAMA = "Fahmy";
const DEFAULT_TELP = "081234567890";
const DEFAULT_PASSWORD = "qwerty123!!";

// PATHS
const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;

const AccountRegisterPage = () => {
  // --- STATE DENGAN NILAI DEFAULT DUMMY ---
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [nama, setNama] = useState(DEFAULT_NAMA);
  const [nomorTelepon, setNomorTelepon] = useState(DEFAULT_TELP);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  
  // --- STATE UNTUK UI/LOADING & ERROR ---
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- HANDLER SUBMIT FORM ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // --- VALIDASI CLIENT-SIDE DASAR ---
    if (!email || !nama || !nomorTelepon || !password) {
        setError("Semua field wajib diisi.");
        setLoading(false);
        return;
    }
    if (!email.includes('@') || !email.includes('.')) {
        setError("Format email tidak valid.");
        setLoading(false);
        return;
    }
    if (password.length < 8) {
        setError("Password minimal harus 8 karakter.");
        setLoading(false);
        return;
    }

    try {
        // PANGGILAN API MENGGUNAKAN UAuth.accountRegister
        const response = await UAuth.accountRegister({ 
            email,
            name: nama,
            phone_number: nomorTelepon,
            password
        });
        
        if (response.status === 201 || response.data.success) {
            alert("Pendaftaran berhasil! Silakan login untuk melanjutkan.");
            navigate(LOGIN_PATH);
        } else {
            setError(response.data.message || "Pendaftaran gagal dengan status tidak terduga.");
        }

    } catch (apiError) {
        console.error("Registration API Error:", apiError);
        const errorMessage = apiError.response?.data?.message || "Pendaftaran gagal. Server tidak merespons atau terjadi kesalahan.";
        setError(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div id="l-main-wrapper"> 
      {/* HEADER */}
      <LandingHeader
        targetPageName="authLogin"
        linkText="Login"
        iconType="login"
      />

      {/* CONTENT: Form Pendaftaran */}
      <div className="l-content d-flex align-items-center justify-content-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={5}>
              <Card className="shadow-lg rounded-4 border-0">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="text-center mb-4 fw-bold">
                    <img
                      src="/assets/icons/pusLogo.png" 
                      alt="Logo PUS"
                      className="me-2"
                      style={{ height: "30px" }}
                    />
                    Daftar Akun
                  </h3>

                  <p className="text-center text-muted mb-4">
                    Silakan mengisi formulir di bawah ini
                  </p>
                  
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleRegister}>
                    
                    {/* Input Email */}
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="fw-bold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukkan Email"
                        value={email} // <-- Menggunakan state email (default: dummy)
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="p-3" 
                        autoComplete="email"
                      />
                    </Form.Group>

                    {/* Input Nama */}
                    <Form.Group className="mb-3" controlId="formNama">
                      <Form.Label className="fw-bold">Nama</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Masukkan Nama Lengkap"
                        value={nama} // <-- Menggunakan state nama (default: dummy)
                        onChange={(e) => setNama(e.target.value)}
                        required
                        className="p-3"
                        autoComplete="name"
                      />
                    </Form.Group>

                    {/* Input Nomor Telepon */}
                    <Form.Group className="mb-3" controlId="formNomorTelepon">
                      <Form.Label className="fw-bold">Nomor Telepon</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Masukkan Nomor Telepon"
                        value={nomorTelepon} // <-- Menggunakan state nomorTelepon (default: dummy)
                        onChange={(e) => setNomorTelepon(e.target.value)}
                        required
                        className="p-3"
                        autoComplete="tel"
                      />
                    </Form.Group>

                    {/* Input Password */}
                    <Form.Group className="mb-4" controlId="formPassword">
                      <Form.Label className="fw-bold">Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Masukkan Password"
                        value={password} // <-- Menggunakan state password (default: dummy)
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="p-3"
                        autoComplete="new-password"
                      />
                    </Form.Group>

                    {/* Tombol Create Account */}
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 fw-bold p-3"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Memproses...
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>

                    {/* Link Sudah memiliki akun? */}
                    <div className="text-center mt-3">
                      <p className="mb-0">
                        Sudah memiliki akun?{" "}
                        <a
                          href={LOGIN_PATH}
                          className="text-decoration-none fw-bold"
                        >
                          Login disini
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

export default AccountRegisterPage;