// pages/auth/LandingPage.jsx

import React from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// Anggap Anda menggunakan path yang sama untuk logo
// import LogoImage from '../../assets/icons/PUSlogo.png';

export default function LandingPage() {
  const navigate = useNavigate();

  // Menggunakan warna dari gradient yang Anda tentukan di SplashScreen
  const PRIMARY_COLOR = "#13547A";
  const SECONDARY_COLOR = "#80D0C7";

  // Style untuk Hero Section dengan gradient background
  const heroStyle = {
    background: `linear-gradient(180deg, ${PRIMARY_COLOR} 0%, ${SECONDARY_COLOR} 100%)`,
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    padding: "100px 0",
    color: "#fff",
  };

  return (
    <div id="landing-page">
      {/* 1. HEADER / NAVBAR */}
      <Navbar expand="lg" bg="white" variant="light" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {/* Logo Aplikasi - menggunakan img atau h4 jika tidak ada logo */}
            <img
              src="/assets/icons/PUSlogo.png" // Ganti dengan path logo Anda
              alt="Logo PUS"
              height="30"
              className="d-inline-block align-top"
            />
            <span className="fw-bold ms-2" style={{ color: PRIMARY_COLOR }}>
              PUS
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {/* Tombol Login */}
              <Button
                variant="outline-primary" // Menggunakan warna primary dari Bootstrap
                className="me-2"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </Button>
              {/* Tombol Daftar Anggota (CTA) */}
              <Button
                variant="primary"
                className="btn-rounded" // Menggunakan kelas utilitas Monster Admin
                onClick={() => navigate("/pendaftaran-anggota")}
              >
                Daftar Anggota
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 2. HERO SECTION */}
      <section style={heroStyle}>
        <Container>
          <Row className="align-items-center">
            <Col md={7} className="text-md-start text-center mb-5 mb-md-0">
              {/* Judul Utama */}
              <h1
                className="display-4 fw-bold animated fadeInDown"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.2)" }}
              >
                Koperasi Syariah Mandiri Sejahtera
              </h1>
              {/* Subtitle / Deskripsi */}
              <p
                className="lead mt-4 mb-5 animated fadeInUp"
                style={{ animationDelay: "0.3s" }}
              >
                Melayani Simpanan, Pinjaman, Investasi dan Program Pengembangan
                Anggota yang Berbasis Syariah.
              </p>

              {/* Call to Action Utama */}
              <Button
                variant="light" // Kontras dengan background gradient
                size="lg"
                className="fw-bold btn-rounded animated fadeInUp"
                style={{ animationDelay: "0.6s" }}
                onClick={() => navigate("/pendaftaran-anggota")}
              >
                Gabung Sekarang!
              </Button>
            </Col>

            {/* 3. BAGIAN ILUSTRASI / GAMBAR */}
            <Col md={5} className="text-center">
              {/* Placeholder untuk Ilustrasi atau Foto */}
              <div
                className="p-4 shadow-lg rounded-3 animated zoomIn"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  animationDelay: "0.9s",
                }}
              >
                <i
                  className="icon-badge display-1"
                  style={{ color: "#fff" }}
                ></i>
                <h3 className="mt-3">#MajuBersamaSyariah</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* 4. FOOTER - (Anda bisa menambahkan Footer.jsx di sini jika sudah ada) */}
    </div>
  );
}
