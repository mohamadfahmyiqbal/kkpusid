import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { jwtEncode } from "../../../../utils/helpers";

const LandingHeader = () => {
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRegister = () => {
    window.location.href = "/" + jwtEncode({ page: "accountRegisterPage" });
  };

  const handleLogin = () => {
    window.location.href = "/" + jwtEncode({ page: "authLogin" });
  };

  return (
    <Navbar expand="lg" fixed="top" variant="dark" className="pbs-navbar py-2">
      <Container fluid className="px-3 px-md-5">
        <Navbar.Brand
          className="text-white d-flex align-items-center gap-2"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{ fontSize: "14px" }}
        >
          <img
            src="/assets/icons/PUSlogo.png"
            alt="PUS Logo"
            style={{ height: "30px", width: "auto" }}
          />
          <div style={{ lineHeight: "1.1", fontWeight: "700" }}>
            Paguyuban Usaha
            <br />
            <span style={{ fontSize: "10px", fontWeight: "600", color: "#00c6a7", textTransform: "uppercase", letterSpacing: "0.5px" }}>Sukses</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="landing-navbar-nav" />
        <Navbar.Collapse id="landing-navbar-nav">
          <Nav className="mx-auto gap-2">
            <Nav.Link
              className="text-white"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              Beranda
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="#layanan"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("layanan");
              }}
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              Layanan
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="#tentang"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("tentang");
              }}
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              Tentang Kami
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="#cara-kerja"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("cara-kerja");
              }}
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              Cara Kerja
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="#artikel"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("artikel");
              }}
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              Artikel
            </Nav.Link>
            <Nav.Link
              className="text-white"
              href="#kontak"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("kontak");
              }}
              style={{ fontSize: "13px", fontWeight: "500" }}
            >
              Kontak
            </Nav.Link>
          </Nav>

          <Button
            variant="light"
            className="rounded-pill px-3 me-2"
            onClick={handleRegister}
            style={{ fontSize: "12.5px", fontWeight: "600", padding: "5px 14px" }}
          >
            Daftar Sekarang
          </Button>
          <Button
            variant="outline-light"
            className="rounded-pill px-3"
            onClick={handleLogin}
            style={{ fontSize: "12.5px", fontWeight: "600", padding: "5px 14px" }}
          >
            Login
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default React.memo(LandingHeader);
