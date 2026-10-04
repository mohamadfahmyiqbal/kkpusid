import React, { useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaChartLine, FaCertificate, FaStore, FaArrowRight } from "react-icons/fa";
import { jwtEncode } from "../../utils/helpers";
import "./InvestasiDashboardPage.css";

const INVESTASI_OPTIONS = [
  {
    label: "Investasi Halal",
    key: "investasiHalal",
    icon: <FaCertificate size={32} />,
    color: "success",
    description: "Investasi dalam produk Sukuk dan reksadana syariah yang aman, menguntungkan, dan bebas riba.",
    cta: "Mulai Investasi"
  },
  {
    label: "Pendanaan Syariah",
    key: "pendanaanSyariah",
    icon: <FaStore size={32} />,
    color: "primary",
    description: "Dukung pertumbuhan usaha kecil menengah (UKM) dengan prinsip bagi hasil yang adil dan memberdayakan.",
    cta: "Lihat Peluang"
  },
];

const InvestasiCard = ({ option, onClick }) => (
  <div 
    className={`investasi-option-card ${option.color}`}
    onClick={onClick}
  >
    <div className={`investasi-card-icon-wrapper ${option.color}`}>
      {option.icon}
    </div>
    <h3 className="investasi-card-title">{option.label}</h3>
    <p className="investasi-card-desc">{option.description}</p>
    
    <div className={`investasi-card-footer ${option.color}`}>
      <span>{option.cta}</span>
      <FaArrowRight className="investasi-card-footer-icon" size={14} />
    </div>
  </div>
);

const InvestasiDashboardPage = () => {
  const navigate = useNavigate();

  const handleOptionClick = useCallback(
    (key) => {
      const token = jwtEncode({ page: key });
      navigate(`/${token}`);
    },
    [navigate],
  );

  return (
    <div className="investasi-page-container investasi-fade-in">
      <Container fluid className="px-0">
          {/* Hero Section */}
          <div className="investasi-hero">
            <div className="investasi-hero-content">
              <h1 className="investasi-hero-title">
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '16px', display: 'inline-flex', backdropFilter: 'blur(10px)' }}>
                  <FaChartLine size={30} color="#ffffff" />
                </div>
                Pusat Investasi Syariah
              </h1>
              <p className="investasi-hero-subtitle">
                Kembangkan aset Anda dengan aman dan penuh berkah. Jelajahi berbagai instrumen investasi dan pendanaan produktif yang dikelola secara transparan dan sesuai syariat.
              </p>
            </div>
          </div>

          {/* Content Section */}
          <Row className="justify-content-center">
            <Col lg={12}>
              <div className="mb-4 text-center">
                <h2 className="investasi-section-title">Instrumen Pilihan</h2>
                <p className="investasi-section-desc">Pilih jenis produk pendanaan atau investasi yang sesuai dengan tujuan finansial Anda.</p>
              </div>
              <Row className="g-4">
                {INVESTASI_OPTIONS.map((option, idx) => (
                  <Col md={6} key={option.key} style={{ animationDelay: `${idx * 0.15}s` }} className="investasi-fade-in">
                    <InvestasiCard
                      option={option}
                      onClick={() => handleOptionClick(option.key)}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
    </div>
  );
};

export default InvestasiDashboardPage;
