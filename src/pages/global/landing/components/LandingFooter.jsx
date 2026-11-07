import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa";

const LandingFooter = ({ contact = null }) => {
  if (!contact) return null;

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
            <a
              href="#layanan"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("layanan");
              }}
            >
              Pinjaman Lunak
            </a>
            <a
              href="#layanan"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("layanan");
              }}
            >
              Pelatihan Usaha
            </a>
            <a
              href="#layanan"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToSection("layanan");
              }}
            >
              Kemitraan Produk
            </a>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <h6 className="text-white">Hubungi Kami</h6>
            <a href={`tel:${contact.phone.replace(/[-\s]/g, "")}`}>
              <FaPhoneAlt /> {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`}>
              <FaEnvelope /> {contact.email}
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkedAlt /> {contact.address}
            </a>
          </Col>
        </Row>

        <hr className="border-light opacity-25" />

        <p className="text-center mb-0">© 2025 Paguyuban Usaha Sukses</p>
      </Container>
    </footer>
  );
};

export default React.memo(LandingFooter);
