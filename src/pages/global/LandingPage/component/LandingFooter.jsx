import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

const LandingFooter = ({ contact = null }) => {
  if (!contact) return null;

  const handlePhoneClick = () => {
    window.location.href = `tel:${contact.phone.replace(/[-\s]/g, "")}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  const handleMapClick = () => {
    window.open(
      `https://maps.google.com/?q=${encodeURIComponent(contact.address)}`,
      "_blank",
    );
  };

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="pbs-footer" id="footer-kontak">
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={6} lg={4}>
            <h5 className="text-white">Paguyuban Usaha Sukses</h5>
            <p>
              Membangun ekonomi umat yang kuat, amanah, dan penuh keberkahan.
            </p>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <h6 className="text-white">Layanan</h6>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleScrollToSection("layanan")}
            >
              Pinjaman Lunak
            </p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleScrollToSection("layanan")}
            >
              Pelatihan Usaha
            </p>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => handleScrollToSection("layanan")}
            >
              Kemitraan Produk
            </p>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <h6 className="text-white">Hubungi Kami</h6>
            <p style={{ cursor: "pointer" }} onClick={handlePhoneClick}>
              <FaPhoneAlt /> {contact.phone}
            </p>
            <p style={{ cursor: "pointer" }} onClick={handleEmailClick}>
              <FaEnvelope /> {contact.email}
            </p>
            <p style={{ cursor: "pointer" }} onClick={handleMapClick}>
              <FaMapMarkedAlt /> {contact.address}
            </p>
          </Col>
        </Row>

        <hr className="border-light opacity-25" />

        <p className="text-center mb-0">© 2025 Paguyuban Usaha Sukses</p>
      </Container>
    </footer>
  );
};

export default React.memo(LandingFooter);
