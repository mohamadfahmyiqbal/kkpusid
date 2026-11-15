import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaHandHoldingUsd,
  FaChalkboardTeacher,
  FaHandshake,
  FaUsers,
} from "react-icons/fa";

const iconMap = {
  FaHandHoldingUsd,
  FaChalkboardTeacher,
  FaHandshake,
  FaUsers,
};

const ServicesSection = ({ services = [] }) => {
  const handleServiceClick = (serviceTitle) => {
    // Navigate to service detail page or show modal

    // For now, scroll to contact section
    const contactSection = document.getElementById("kontak");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter out any duplicate services by title to ensure clean layout
  const uniqueServices = services.reduce((acc, current) => {
    const hasDuplicate = acc.some(item => item.title === current.title);
    if (!hasDuplicate) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <section className="py-5" id="layanan">
      <Container>
        <h2 className="pbs-title-section text-center mb-5">
          Layanan Unggulan Kami
        </h2>

        <Row className="g-4">
          {uniqueServices.map((item, i) => {
            const IconComponent = iconMap[item.icon] || FaHandHoldingUsd;
            return (
              <Col xs={12} sm={6} md={6} lg={3} key={item.id || i}>
                <Card className="pbs-card h-100 border-0">
                  <Card.Body className="p-4 text-center">
                    <div
                      className="pbs-icon mx-auto mb-3 d-flex align-items-center justify-content-center"
                      style={{ background: item.color }}
                    >
                      <IconComponent size={24} color="#ffffff" />
                    </div>
                    <h5>{item.title}</h5>
                    <p>{item.description || item.desc}</p>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleServiceClick(item.title);
                      }}
                    >
                      Selengkapnya →
                    </a>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default React.memo(ServicesSection);
