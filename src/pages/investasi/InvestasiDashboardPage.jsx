import React, { useState, useCallback } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaCertificate, FaStore } from "react-icons/fa";
import LayoutGlobal from "../../components/layout/components/LayoutGlobal";
import { jwtEncode } from "../../utils/helpers";

const INVESTASI_OPTIONS = [
  {
    label: "Investasi Halal",
    key: "investasiHalal",
    icon: <FaCertificate size={40} />,
    color: "success",
    description: "Investasi dalam produk Sukuk yang syariah",
  },
  {
    label: "Pendanaan Syariah",
    key: "pendanaanSyariah",
    icon: <FaStore size={40} />,
    color: "primary",
    description: "Pendanaan untuk usaha kecil dan menengah",
  },
];

const InvestasiCard = ({ option, onClick }) => (
  <Card
    className="h-100 border-0 shadow-sm hover-shadow transition-all"
    style={{ cursor: "pointer" }}
    onClick={onClick}
  >
    <Card.Body className="p-4 text-center">
      <div className={`text-${option.color} mb-3`} style={{ fontSize: "48px" }}>
        {option.icon}
      </div>
      <h5 className="fw-bold mb-2">{option.label}</h5>
      <p className="text-muted small mb-0">{option.description}</p>
    </Card.Body>
  </Card>
);

const InvestasiDashboardPage = () => {
  const navigate = useNavigate();

  const handleOptionClick = useCallback(
    (key) => {
      if (key === "investasiHalal") {
        const token = jwtEncode({ page: "investasiHalal" });
        navigate(`/${token}`);
      } else if (key === "pendanaanSyariah") {
        const token = jwtEncode({ page: "pendanaanSyariah" });
        navigate(`/${token}`);
      }
    },
    [navigate],
  );

  return (
    <LayoutGlobal title="Investasi">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaChartLine className="me-2" />
            Investasi
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">Pilih Jenis Investasi</h5>
                <p className="text-muted mb-4">
                  Pilih jenis investasi yang sesuai dengan kebutuhan dan
                  preferensi Anda.
                </p>
                <Row className="g-4">
                  {INVESTASI_OPTIONS.map((option) => (
                    <Col md={6} key={option.key}>
                      <InvestasiCard
                        option={option}
                        onClick={() => handleOptionClick(option.key)}
                      />
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LayoutGlobal>
  );
};

export default InvestasiDashboardPage;
