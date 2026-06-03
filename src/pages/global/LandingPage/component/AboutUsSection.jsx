import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEye, FaBullseye } from "react-icons/fa";

const AboutUsSection = ({ about = null }) => {
  const handleScrollToContact = () => {
    const contactSection = document.getElementById("kontak");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!about) return null;

  return (
    <section id="tentang" className="pbs-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col xs={12} lg={6}>
            <span className="pbs-badge">Tentang Kami</span>

            <h2 className="pbs-title-section mt-3">{about.title}</h2>

            <p className="pbs-subtitle-section text-start m-0 mt-3 mb-4">
              {about.description}
            </p>

            <div className="mt-4 pt-2">
              <a
                href="#kontak"
                className="pbs-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToContact();
                }}
              >
                Hubungi Kami
              </a>
            </div>
          </Col>

          <Col xs={12} lg={6}>
            <div className="pbs-card-glass p-4 p-lg-5">
              <div className="d-flex flex-column gap-5">
                <div className="pbs-about-item">
                  <div className="pbs-about-icon">
                    <FaEye />
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-2">Visi</h5>
                    <p className="mb-0 text-white-50 lh-base">{about.vision}</p>
                  </div>
                </div>

                <div className="pbs-about-item">
                  <div className="pbs-about-icon" style={{ background: "rgba(24, 119, 242, 0.15)", color: "#1877f2" }}>
                    <FaBullseye />
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-2">Misi</h5>
                    <p className="mb-0 text-white-50 lh-base">{about.mission}</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUsSection;
