import React, { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  RiFacebookFill,
  RiInstagramLine,
  RiYoutubeFill,
  RiLinkedinFill,
  RiMapPinLine,
  RiMailLine,
  RiPhoneLine,
} from "react-icons/ri";

const Footer = () => {
  const services = [
    "Pinjaman Lunak",
    "Pelatihan Usaha",
    "Kemitraan Produk",
    "Pendampingan Bisnis",
  ];

  const information = [
    "Tentang Kami",
    "Cara Kerja",
    "Artikel",
    "FAQ",
  ];

  const help = [
    "Pusat Bantuan",
    "Syarat & Ketentuan",
    "Kebijakan Privasi",
    "Kontak Kami",
  ];

  const socialLinks = [
    { icon: RiFacebookFill, name: "Facebook" },
    { icon: RiInstagramLine, name: "Instagram" },
    { icon: RiYoutubeFill, name: "YouTube" },
    { icon: RiLinkedinFill, name: "LinkedIn" },
  ];

  return (
    <footer className="landing-footer">
      <Container>
        <Row className="footer-content">
          {/* Logo and Description */}
          <Col lg={4} md={6} className="footer-brand">
            <div className="footer-logo">
              <h3 className="footer-brand-name">Paguyuban Usaha Sukses</h3>
            </div>
            <p className="footer-description">
              Membangun ekonomi umat yang kuat, amanah, dan penuh keberkahan
              sesuai prinsip syariah Islam.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className="social-link"
                  aria-label={social.name}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </Col>

          {/* Services */}
          <Col lg={2} md={6} className="footer-links">
            <h4 className="footer-title">Layanan</h4>
            <ul className="footer-list">
              {services.map((service, index) => (
                <li key={index}>
                  <a href="#">{service}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Information */}
          <Col lg={2} md={6} className="footer-links">
            <h4 className="footer-title">Informasi</h4>
            <ul className="footer-list">
              {information.map((info, index) => (
                <li key={index}>
                  <a href="#">{info}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Help */}
          <Col lg={2} md={6} className="footer-links">
            <h4 className="footer-title">Bantuan</h4>
            <ul className="footer-list">
              {help.map((item, index) => (
                <li key={index}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact */}
          <Col lg={2} md={6} className="footer-contact">
            <h4 className="footer-title">Hubungi Kami</h4>
            <div className="contact-item">
              <RiPhoneLine size={20} />
              <span>0812-3456-7890</span>
            </div>
            <div className="contact-item">
              <RiMailLine size={20} />
              <span>info@pbs.co.id</span>
            </div>
            <div className="contact-item">
              <RiMapPinLine size={20} />
              <span>Jl. Merdeka No. 10, Jakarta Indonesia</span>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="footer-bottom">
          <Col xs={12}>
            <div className="footer-copyright">
              <p>© 2025 Paguyuban Usaha Sukses. All rights reserved.</p>
              <p className="regulatory-info">
                Terdaftar & Diawasi oleh Dewan Pengawas Syariah (DPS)
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default memo(Footer);
