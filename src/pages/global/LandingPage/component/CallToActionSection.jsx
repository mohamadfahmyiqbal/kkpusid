import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { jwtEncode } from "../../../../utils/helpers";

const CallToActionSection = () => {
  const handleApplyNow = () => {
    // Navigate to registration page using JWT routing
    window.location.href = "/" + jwtEncode({ page: "accountRegisterPage" });
  };

  const handleContactUs = () => {
    // Scroll to contact section or navigate to contact page
    const contactSection = document.getElementById("kontak");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/contact";
    }
  };

  return (
    <section className="pb-5" id="kontak">
      <Container>
        <div className="pbs-cta">
          <Row className="align-items-center gy-4">
            <Col xs={12} lg={7}>
              <h2>Siap Mengembangkan Usaha Anda?</h2>
              <p>Bergabung sekarang dan rasakan manfaatnya.</p>
            </Col>

            <Col xs={12} lg={5} className="text-center text-lg-end">
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-lg-end">
                <Button
                  className="pbs-btn-main rounded-pill px-4"
                  onClick={handleApplyNow}
                >
                  Ajukan Sekarang
                </Button>

                <Button
                  variant="outline-light"
                  className="rounded-pill px-4"
                  onClick={handleContactUs}
                >
                  Hubungi Kami
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default React.memo(CallToActionSection);
