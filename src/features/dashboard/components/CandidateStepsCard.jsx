import React, { useCallback, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import FinancialScrollButtons from "./financial/FinancialScrollButtons";

const StepItem = React.memo(({ item, onNavigate }) => {
  const handleClick = useCallback((e) => {
    if (item.status === "pending") return;
    onNavigate("registrationPage");
  }, [item.status, onNavigate]);

  const handleButtonClick = useCallback((e) => {
    e.stopPropagation();
    onNavigate("registrationPage");
  }, [onNavigate]);

  return (
    <div 
      className={`dc-step ${item.status}`}
      style={{ 
        padding: "12px 6px",
        cursor: item.status !== "pending" ? "pointer" : "default"
      }}
      onClick={handleClick}
    >
      <div 
        className="dc-step-icon" 
        style={{ width: "34px", height: "34px", fontSize: "14px" }}
      >
        {item.icon}
      </div>
      <strong 
        className="fw-bold mt-1 text-center" 
        style={{ fontSize: "11px", lineHeight: "1.2", minHeight: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        {item.title}
      </strong>
      {item.no === 2 && item.status === "active" ? (
        <Button
          size="sm"
          variant="primary"
          className="mt-2 py-1 px-2 fw-bold text-nowrap"
          style={{ fontSize: "9px", borderRadius: "6px" }}
          onClick={handleButtonClick}
        >
          Daftar Sekarang
        </Button>
      ) : item.no === 3 && item.status === "active" ? (
        <Button
          size="sm"
          variant="primary"
          className="mt-2 py-1 px-2 fw-bold text-nowrap"
          style={{ fontSize: "9px", borderRadius: "6px" }}
          onClick={handleButtonClick}
        >
          Lihat Detail
        </Button>
      ) : (
        <small style={{ fontSize: "10px" }} className="opacity-75">{item.desc}</small>
      )}
    </div>
  );
});

const CandidateStepsCard = ({ steps, onNavigate }) => {
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  }, []);

  const handleScrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  }, []);

  const handleViewDetail = useCallback(() => {
    onNavigate("registrationPage");
  }, [onNavigate]);

  return (
    <Card className="mb-4 border-0 shadow-sm dc-card-modern">
      <Card.Header className="bg-transparent border-0 pt-3 px-4 d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: "15px" }}>
          Status Pendaftaran Anggota
        </h5>
        <Button
          variant="link"
          className="p-0 text-decoration-none fw-bold"
          style={{ fontSize: "12px" }}
          onClick={handleViewDetail}
        >
          Lihat Detail
        </Button>
      </Card.Header>
      <Card.Body className="px-4 pb-3 pt-1">
        <p className="text-muted small mb-0" style={{ fontSize: "12px" }}>
          Lengkapi semua tahapan untuk menjadi anggota koperasi secara resmi.
        </p>

        <div className="dc-info-box" style={{ padding: "10px 14px", marginTop: "12px" }}>
          <FaCheckCircle style={{ fontSize: "14px", flexShrink: 0 }} />
          <span style={{ fontSize: "11px", lineHeight: "1.4" }}>
            Untuk dapat mengakses keseluruhan fitur. (*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023.
            Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)
          </span>
        </div>

        <div className="position-relative">
          <FinancialScrollButtons onScrollLeft={handleScrollLeft} onScrollRight={handleScrollRight} />
          <div className="dc-steps custom-scrollbar" style={{ marginTop: "16px" }} ref={scrollContainerRef}>
            {steps.map((item) => (
              <StepItem key={item.no} item={item} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(CandidateStepsCard);
