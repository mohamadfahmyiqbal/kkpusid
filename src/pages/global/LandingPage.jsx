// pages/auth/LandingPage.jsx (DISESUAIKAN DENGAN DESAIN)

import React from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers"; // Diperlukan untuk enkripsi rute

export default function LandingPage() {
  const navigate = useNavigate();

  // Menggunakan warna dari gradient yang ditentukan di SplashScreen
  const PRIMARY_COLOR = "#13547A";
  const SECONDARY_COLOR = "#80D0C7";

  // Style untuk Hero Section dengan gradient background
  const heroStyle = {
    background: `linear-gradient(180deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
    minHeight: "80vh",
    display: "flex",
    alignItems: "flex-start", // Ubah ke flex-start agar fokus ke teks atas
    padding: "100px 0 50px 0",
    color: "#fff",
  };

  // -----------------------------------------------------
  // Fungsi Navigasi Terenkripsi
  // -----------------------------------------------------

  const navigateToEncrypted = (pageKey) => {
    const encryptedPath = jwtEncode({ page: pageKey });
    navigate(`/${encryptedPath}`);
  };

  return (
    <div id="landing-page">
      {/* 1. HEADER / NAVBAR - Minimalis Sesuai Desain */}
      <Navbar
        variant="dark"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          background: "transparent",
        }}
      >
        <Container>
          {/* Logo PUS */}
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            PUS
          </Navbar.Brand>

          <Nav className="ms-auto">
            {/* Tombol Panah (Login) */}
            <Button
              variant="link"
              className="p-0 border-0"
              onClick={() => navigateToEncrypted("authLogin")} // Menggunakan kunci dari authRoutes.jsx
              style={{ color: "#fff", fontSize: "1.5rem" }}
              aria-label="Login"
            >
              <i className="ti-arrow-right"></i>{" "}
              {/* Menggunakan icon panah (ti-arrow-right) */}
            </Button>
            {/* Tombol Hamburger (Menu) */}
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="ms-3 p-0 border-0"
            >
              <i
                className="ti-menu"
                style={{ color: "#fff", fontSize: "1.5rem" }}
              ></i>
            </Navbar.Toggle>
          </Nav>
        </Container>
      </Navbar>

      {/* 2. HERO SECTION */}
      <section style={heroStyle}>
        <Container>
          <Row>
            {/* Judul Utama (Lebih dominan dan ringkas) */}
            <Col md={12} className="text-center mb-5 mt-5">
              <h1
                className="display-2 fw-bolder animated fadeInDown"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                  fontSize: "4.5rem",
                }}
              >
                DISCOVER.
                <br />
                LEARN.
                <br />
                ENJOY.
              </h1>
              {/* Subtitle / Deskripsi */}
              <p
                className="lead mt-4 mb-5 animated fadeInUp fw-light"
                style={{ animationDelay: "0.3s", fontSize: "1.5rem" }}
              >
                platform for creatives
                <br />
                around the world
              </p>
            </Col>

            {/* 3. BAGIAN KONTEN (PINJAMAN LUNAK) */}
            <Col
              md={12}
              className="animated fadeInUp"
              style={{ animationDelay: "0.6s" }}
            >
              <div
                className="bg-white p-4 p-md-5 rounded-3 shadow-lg"
                style={{ color: PRIMARY_COLOR }}
              >
                <h3 className="fw-bold mb-3">Pinjaman Lunak</h3>
                <p className="mb-4">
                  When you search for free CSS templates, you will notice that
                  TemplateMo is one of the best websites.
                </p>
                {/* Ilustrasi Placeholder */}
                <div className="text-center">
                  {/*  */}
                  <div
                    style={{
                      height: "150px",
                      background:
                        "url(/assets/img/pinjaman_lunak_illus.png) center center/contain no-repeat",
                    }}
                  ></div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. FOOTER */}
      <footer
        style={{
          background: PRIMARY_COLOR,
          color: "#fff",
          padding: "15px 0",
          fontSize: "0.8rem",
        }}
      >
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col xs={6}>Paguyuban Usaha Sukses @2025</Col>
            <Col xs={6} className="text-end">
              Powered By Manova
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}
