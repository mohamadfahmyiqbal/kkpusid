import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="pbs-footer">
      <Container>
        <Row className="g-4">
          <Col lg={4}>
            <div className="pbs-footer-brand">
              <img
                src={`${process.env.PUBLIC_URL}/assets/icons/PUSlogo.png`}
                alt="PBS"
                className="pbs-footer-logo"
              />

              <div>
                <h4>Paguyuban Usaha Sukses</h4>
                <p>
                  Membangun ekonomi umat melalui koperasi modern, amanah,
                  profesional, dan penuh keberkahan.
                </p>
              </div>
            </div>
          </Col>

          <Col lg={2} md={6}>
            <h6 className="pbs-footer-title">Menu</h6>

            <a href="#beranda">Beranda</a>
            <a href="#layanan">Layanan</a>
            <a href="#tentang">Tentang Kami</a>
            <a href="#artikel">Artikel</a>
          </Col>

          <Col lg={3} md={6}>
            <h6 className="pbs-footer-title">Layanan</h6>

            <a href="/">Pinjaman Lunak</a>
            <a href="/">Pelatihan Usaha</a>
            <a href="/">Kemitraan Produk</a>
            <a href="/">Pendampingan</a>
          </Col>

          <Col lg={3}>
            <h6 className="pbs-footer-title">Kontak</h6>

            <div className="pbs-footer-contact">
              <span>
                <FaPhoneAlt />
              </span>
              <p>0812-3456-7890</p>
            </div>

            <div className="pbs-footer-contact">
              <span>
                <FaEnvelope />
              </span>
              <p>info@pbs.co.id</p>
            </div>

            <div className="pbs-footer-contact">
              <span>
                <FaMapMarkerAlt />
              </span>
              <p>Jakarta, Indonesia</p>
            </div>

            <div className="pbs-footer-social">
              <a href="/">
                <FaFacebookF />
              </a>
              <a href="/">
                <FaInstagram />
              </a>
              <a href="/">
                <FaWhatsapp />
              </a>
            </div>
          </Col>
        </Row>

        <div className="pbs-footer-bottom">
          © 2025 Paguyuban Usaha Sukses. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
