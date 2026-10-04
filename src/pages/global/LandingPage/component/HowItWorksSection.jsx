import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaUserPlus, FaClipboardList, FaShieldAlt, FaUserCheck } from "react-icons/fa";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Buat Akun",
      description: "Daftar akun baru menggunakan nama, email, dan password Anda.",
      color: "#1877f2"
    },
    {
      icon: <FaClipboardList />,
      title: "Daftar Menjadi Anggota",
      description: "Lengkapi formulir pendaftaran anggota beserta dokumen pendukung.",
      color: "#00c6a7"
    },
    {
      icon: <FaShieldAlt />,
      title: "Approval",
      description: "Proses verifikasi dan persetujuan berkas pendaftaran oleh pengurus.",
      color: "#f59e0b"
    },
    {
      icon: <FaUserCheck />,
      title: "Menjadi Anggota Koperasi",
      description: "Secara resmi terdaftar sebagai anggota koperasi dan akses semua layanan.",
      color: "#2563eb"
    }
  ];

  return (
    <section id="cara-kerja" className="pbs-section">
      <Container>
        <div className="text-center mb-5 pb-lg-4">
          <span className="pbs-badge">Langkah Mudah</span>
          <h2 className="pbs-title-section mt-3">Cara Kerja Kami</h2>
          <p className="pbs-subtitle-section mx-auto mt-3">
            Proses yang transparan dan cepat untuk mendukung pertumbuhan bisnis Anda sesuai prinsip syariah.
          </p>
        </div>

        <div className="pbs-stepper-mobile d-lg-none">
          {steps.map((step, index) => (
            <div key={index} className="pbs-step-item">
              <div className="text-center p-4 h-100">
                <div 
                  className="pbs-step-icon"
                  style={{ 
                    background: `${step.color}15`,
                    color: step.color,
                    border: `1px solid ${step.color}30`
                  }}
                >
                  <div className="pbs-step-number">{index + 1}</div>
                  {step.icon}
                </div>
                <h5 className="text-white fw-bold mb-3">{step.title}</h5>
                <p className="text-white-50 mb-0">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="pbs-step-connector-mobile"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        <Row className="g-4 d-none d-lg-flex">
          {steps.map((step, index) => (
            <Col key={index} lg={3} className="pbs-step-item">
              <div className="text-center p-4 h-100">
                <div 
                  className="pbs-step-icon"
                  style={{ 
                    background: `${step.color}15`,
                    color: step.color,
                    border: `1px solid ${step.color}30`
                  }}
                >
                  <div className="pbs-step-number">{index + 1}</div>
                  {step.icon}
                </div>
                <h5 className="text-white fw-bold mb-3">{step.title}</h5>
                <p className="text-white-50 mb-0">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="pbs-step-connector"></div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default React.memo(HowItWorksSection);
