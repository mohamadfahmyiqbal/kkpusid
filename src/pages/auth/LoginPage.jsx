// pages/auth/LoginPage.jsx
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
import UAuth from "../../utils/api/UAuth"; // Import modul API UAuth

// PATH FIXES:
import { jwtEncode } from "../../routes/helpers";
import LandingHeader from "../global/landing/component/LandingHeader";
import LandingFooter from "../global/landing/component/LandingFooter";

// --- DATA MOCKUP YANG SAMA DENGAN REGISTER ---
const MOCKUP_EMAIL_HP = "mohamadfahmyiqbal@gmail.com";
const MOCKUP_PASSWORD = "qwerty123!!";
// ----------------------------------------------

// PATHS
const DASHBOARD_PATH = `/${jwtEncode({ page: "dashboard" })}`;
const REGISTER_PATH = `/${jwtEncode({ page: "accountRegisterPage" })}`;
const FORGOT_PASSWORD_PATH = `/${jwtEncode({ page: "authForgotPassword" })}`;

const LoginPage = () => {
 // --- STATE DENGAN MOCKUP DATA ---
 const [emailHp, setEmailHp] = useState(MOCKUP_EMAIL_HP);
 const [password, setPassword] = useState(MOCKUP_PASSWORD);
 // --------------------------------

 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const [emailHpInvalid, setEmailHpInvalid] = useState(false);
 const [passwordInvalid, setPasswordInvalid] = useState(false);
 const navigate = useNavigate();

 // --- FUNGSI LOGIN DENGAN API CALL ---
 const handleLogin = async (e) => {
  e.preventDefault();
  setError(null);
  setEmailHpInvalid(false);
  setPasswordInvalid(false);

  // 1. Validasi Sisi Klien
  if (!emailHp || !password) {
   if (!emailHp) setEmailHpInvalid(true);
   if (!password) setPasswordInvalid(true);
   setError("Email/Nomor Handphone dan Password wajib diisi.");
   return;
  }

  setLoading(true);

  try {
   // 2. Panggil API Login
   const response = await UAuth.accountLogin({
    emailHp: emailHp,
    password: password,
   });
   console.log(response);
   

   // 3. Penanganan Sukses (Status 200)
   if (response.status === 200 && response.data.success) {

    // Simpan JWT Token dan Data Pengguna ke Local Storage
    const { token, user } = response.data.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(user));

    // Redirect ke halaman Dashboard
    navigate(DASHBOARD_PATH);
   } else {
    // Ini menangani kasus jika API merespon 200 tapi success: false
    setError(response.data.message || 'Login gagal. Silakan coba lagi.');
   }
  } catch (apiError) {
   console.log(apiError);
   
   // 4. Penanganan Kesalahan API
   const errorMessage = apiError.response?.data?.message || 'Terjadi kesalahan saat menghubungi server.';
   setError(errorMessage);
  } finally {
   // 5. Akhiri Loading
   setLoading(false);
  }
 };
 // ------------------------------------

 return (
  <div className="d-flex flex-column min-vh-100">
   <LandingHeader />

   <div className="flex-grow-1 d-flex align-items-center py-5">
    <Container>
     <Row className="justify-content-center">
      <Col md={8} lg={6} xl={5}>
       <Card className="shadow-sm">
        <Card.Body className="p-4 p-md-5">
         <div className="text-center mb-4">
          <img
           src="/assets/icons/pusLogo.png"
           alt="PUS Logo"
           className="mb-3"
           style={{ height: "60px" }}
          />
          <h2 className="fw-bold mb-0">Login Anggota</h2>
          <p className="text-muted">Akses ke Dashboard Koperasi</p>
         </div>

         {/* Tampilkan Error Alert */}
         {error && <Alert variant="danger">{error}</Alert>}

         <Form onSubmit={handleLogin}>
          {/* Input Email / Nomor Handphone */}
          <Form.Group className="mb-3">
           <Form.Label className="fw-bold">
            Email / Nomor Handphone
           </Form.Label>
           <Form.Control
            type="text"
            placeholder="Masukkan Email atau Nomor HP"
            value={emailHp}
            onChange={(e) => setEmailHp(e.target.value)}
            isInvalid={emailHpInvalid}
            autoComplete="username"
           />
           <Form.Control.Feedback type="invalid">
            Wajib diisi.
           </Form.Control.Feedback>
          </Form.Group>

          {/* Input Password */}
          <Form.Group className="mb-4">
           <Form.Label className="fw-bold">Password</Form.Label>
           <Form.Control
            type="password"
            placeholder="Masukkan Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={passwordInvalid}
            autoComplete="current-password"
           />
           <Form.Control.Feedback type="invalid">
            Wajib diisi.
           </Form.Control.Feedback>
          </Form.Group>

          {/* Link Lupa Password */}
          <div className="text-end mb-4">
           <a
            href={FORGOT_PASSWORD_PATH}
            className="text-decoration-none"
           >
            Lupa Password? <span className="fw-bold">Klik disini</span>
           </a>
          </div>

          {/* Tombol Login */}
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
             Login
            </>
           ) : (
            "Login"
           )}
          </Button>

          {/* Link Belum memiliki akun? */}
          <div className="text-center mt-3">
           <p className="mb-0">
            Belum memiliki akun?{" "}
            <a
             href={REGISTER_PATH}
             className="text-decoration-none fw-bold"
            >
             Klik disini
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

export default LoginPage;