import React, { memo, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaEye, FaBullseye } from "react-icons/fa";

const AboutUsSection = ({ about = null }) => {
  const handleScrollToContact = useCallback((e) => {
    e.preventDefault();
    const contactSection = document.getElementById("kontak");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  if (!about) return null;

  return (
    <section id="tentang" className="pbs-section">
      <Container>
        <Row className="align-items-center g-5">
          <Col xs={12} lg={6}>
            <span className="pbs-badge">Tentang Kami</span>

            <h2 className="pbs-title-section mt-3">{about?.title || "Membangun Ekonomi Umat"}</h2>

            <p className="pbs-subtitle-section text-start m-0 mt-3 mb-4">
              {about?.description || "Paguyuban Usaha Sukses hadir sebagai wadah koperasi modern yang berfokus pada pemberdayaan ekonomi umat."}
            </p>

            <div className="mt-4 pt-2">
              <a
                href="#kontak"
                className="pbs-btn-primary"
                onClick={handleScrollToContact}
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
                    <p className="mb-0 text-white-50 lh-base">{about?.vision || "Menjadi koperasi syariah terpercaya dalam membangun kemandirian ekonomi umat."}</p>
                  </div>
                </div>

                <div className="pbs-about-item">
                  <div className="pbs-about-icon" style={{ background: "rgba(24, 119, 242, 0.15)", color: "#1877f2" }}>
                    <FaBullseye />
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-2">Misi</h5>
                    <p className="mb-0 text-white-50 lh-base">{about?.mission || "Memberikan layanan pembiayaan syariah yang adil dan memberdayakan usaha anggota."}</p>
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

export default memo(AboutUsSection);
