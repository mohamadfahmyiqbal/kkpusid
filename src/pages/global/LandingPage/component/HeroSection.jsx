import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCheckCircle, FaShieldAlt, FaHandshake } from "react-icons/fa";
import masjidImage from "../../../../assets/images/masjid.png";

const HeroSection = () => {
  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pbs-hero" id="beranda">
      <Container>
        <Row className="align-items-center gy-5">
          <Col xs={{ span: 12, order: 2 }} lg={{ span: 6, order: 1 }}>
            <span className="pbs-badge">
              Koperasi & Layanan Pembiayaan Usaha Syariah
            </span>

            <h1 className="pbs-title mt-4">
              Paguyuban Usaha Sukses
              <br />
              Kekal & Berkah
            </h1>

            <p className="pbs-desc mt-3">
              Jadikan transaksi usaha Anda sesuai syariat Islam, demi keberkahan
              dunia dan akhirat.
            </p>

            <div className="d-flex gap-3 mt-4 flex-wrap">
              <Button
                className="pbs-btn-main rounded-pill px-4"
                onClick={() => handleScrollToSection("layanan")}
              >
                Lihat Layanan
              </Button>

              <Button
                variant="outline-light"
                className="rounded-pill px-4"
                onClick={() => handleScrollToSection("tentang")}
              >
                Tentang Kami
              </Button>
            </div>

            <Row className="mt-5 g-4">
              <Col xs={12} sm={4}>
                <div className="pbs-feature">
                  <FaCheckCircle />
                  <span>Sesuai Syariah</span>
                </div>
              </Col>

              <Col xs={12} sm={4}>
                <div className="pbs-feature">
                  <FaShieldAlt />
                  <span>Aman & Terpercaya</span>
                </div>
              </Col>

              <Col xs={12} sm={4}>
                <div className="pbs-feature">
                  <FaHandshake />
                  <span>Berkah & Bermanfaat</span>
                </div>
              </Col>
            </Row>
          </Col>

          <Col
            xs={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 2 }}
            className="text-center text-lg-end d-none d-lg-block"
          >
            <div className="pbs-hero-img-wrapper">
              <img
                src={masjidImage}
                alt="Hero"
                className="pbs-hero-img"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
