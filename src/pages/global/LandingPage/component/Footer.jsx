import React, { memo } from "react";
import { Link } from "react-router-dom";
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

import { jwtEncode } from "../../../../utils/helpers";

const Footer = () => {
  const services = [
    { name: "Pinjaman Lunak", path: `/${jwtEncode({ page: "servicesPinjaman" })}` },
    { name: "Pelatihan Usaha", path: `/${jwtEncode({ page: "servicesPelatihan" })}` },
    { name: "Kemitraan Produk", path: `/${jwtEncode({ page: "servicesKemitraan" })}` },
    { name: "Pendampingan Bisnis", path: `/${jwtEncode({ page: "servicesPendampingan" })}` },
  ];

  const information = [
    { name: "Tentang Kami", path: `/${jwtEncode({ page: "about" })}` },
    { name: "Cara Kerja", path: `/${jwtEncode({ page: "howItWorks" })}` },
    { name: "Artikel", path: `/${jwtEncode({ page: "articles" })}` },
    { name: "FAQ", path: `/${jwtEncode({ page: "faq" })}` },
  ];

  const help = [
    { name: "Pusat Bantuan", path: `/${jwtEncode({ page: "helpCenter" })}` },
    { name: "Syarat & Ketentuan", path: `/${jwtEncode({ page: "termsConditions" })}` },
    { name: "Kebijakan Privasi", path: `/${jwtEncode({ page: "privacyPolicy" })}` },
    { name: "Kontak Kami", path: `/${jwtEncode({ page: "contact" })}` },
  ];

  const socialLinks = [
    { icon: RiFacebookFill, name: "Facebook", path: "#" },
    { icon: RiInstagramLine, name: "Instagram", path: "#" },
    { icon: RiYoutubeFill, name: "YouTube", path: "#" },
    { icon: RiLinkedinFill, name: "LinkedIn", path: "#" },
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
                  href={social.path}
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
                  <Link to={service.path}>{service.name}</Link>
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
                  <Link to={info.path}>{info.name}</Link>
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
                  <Link to={item.path}>{item.name}</Link>
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
              <p>© 2025 KKPUS (Koperasi & Layanan Pembiayaan Usaha Syariah). All rights reserved.</p>
              <div className="regulatory-info" style={{ marginTop: '10px', fontSize: '0.9rem', color: '#a0a0a0' }}>
                <p>Nomor Badan Hukum Koperasi: <strong>12345/BH/M.KUKM.2/XI/2025</strong> | Izin Usaha Simpan Pinjam: <strong>No. 98765/USP/2025</strong></p>
                <p>Terdaftar & Diawasi oleh <strong>Kementerian Koperasi dan UKM</strong> serta <strong>Dewan Pengawas Syariah (DPS)</strong> guna memastikan kepatuhan terhadap prinsip-prinsip syariah.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default memo(Footer);
