// components/program/ProgramAccountCard.jsx

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaMoneyBillWave, FaFileAlt } from "react-icons/fa";

const ProgramAccountCard = ({
  accountData,
  handleSetoran,
  handlePengajuan,
}) => {
  // Guard clause for null/undefined data
  if (!accountData) {
    return (
      <Card className="premium-card premium-card-active border-0 shadow-lg font-outfit text-white">
        <div className="glass-sheen" />
        <Card.Body className="p-5 text-center relative z-2">
          <div className="spinner-border text-teal mb-3" role="status">
            <span className="visually-hidden">Memuat...</span>
          </div>
          <p className="mb-0 text-white-50">Memuat data rekening...</p>
        </Card.Body>
      </Card>
    );
  }

  const isArisan = accountData?.akad?.toLowerCase().includes("peserta") || accountData?.produk?.toLowerCase().includes("arisan");

  return (
    <Card className="premium-card premium-card-active border-0 shadow-lg font-outfit text-white">
      {/* Sheen reflection overlay */}
      <div className="glass-sheen" />
      
      <Card.Body className="p-4 relative z-2">
        {/* Header: Title and Status Badge */}
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <span className="card-type-label text-uppercase text-white-50 fw-bold d-block mb-1" style={{ letterSpacing: "1.5px", fontSize: "9px" }}>
              Digital Program Card
            </span>
            <h5 className="fw-bold mb-0 text-white font-outfit" style={{ letterSpacing: "0.5px" }}>KOPERASI KARYAWAN</h5>
          </div>
          {accountData?.statusLabel && (
            <span className="premium-status-badge">
              {accountData.statusLabel}
            </span>
          )}
        </div>

        {/* EMV Chip and contactless logo mockup */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="card-chip">
            <div className="card-chip-line v1" />
            <div className="card-chip-line v2" />
            <div className="card-chip-line h" />
          </div>
          <div className="text-white-50 fw-bold" style={{ fontSize: "11px", letterSpacing: "1px" }}>
            {isArisan ? "ARISAN PROGRAM" : "FINANCING ACCOUNT"}
          </div>
        </div>

        {/* Account Number display */}
        <div className="mb-4">
          <span className="card-number-display">
            {accountData?.financingId 
              ? `**** **** **** ${String(accountData.financingId).slice(-4)}`
              : isArisan && accountData?.akad?.includes("No. Peserta")
                ? `PARTICIPANT ID: ${accountData.akad.split(": ")[1] || "••••"}`
                : "•••• •••• •••• ••••"
            }
          </span>
        </div>

        {/* Info Grid: Nama, Produk, Akad, Tanggal Buka */}
        <Row className="mb-4 g-3">
          <Col xs={6}>
            <small className="d-block text-white-50 text-uppercase fw-bold" style={{ fontSize: "8px", letterSpacing: "1px" }}>Nama Anggota</small>
            <h6 className="fw-bold text-truncate text-white mb-0" style={{ fontSize: "13px" }}>
              {accountData?.nama ?? "-"}
            </h6>
          </Col>
          <Col xs={6}>
            <small className="d-block text-white-50 text-uppercase fw-bold" style={{ fontSize: "8px", letterSpacing: "1px" }}>Produk Program</small>
            <h6 className="fw-bold text-truncate text-white mb-0" style={{ fontSize: "13px" }}>
              {accountData?.produk ?? "-"}
            </h6>
          </Col>
          <Col xs={6}>
            <small className="d-block text-white-50 text-uppercase fw-bold" style={{ fontSize: "8px", letterSpacing: "1px" }}>Akad / Detail</small>
            <h6 className="fw-bold text-truncate text-white mb-0" style={{ fontSize: "13px" }}>
              {accountData?.akad ?? "-"}
            </h6>
          </Col>
          <Col xs={6}>
            <small className="d-block text-white-50 text-uppercase fw-bold" style={{ fontSize: "8px", letterSpacing: "1px" }}>Tanggal Buka</small>
            <h6 className="fw-bold text-truncate text-white mb-0" style={{ fontSize: "13px" }}>
              {accountData?.tanggalBuka ?? "-"}
            </h6>
          </Col>
        </Row>

        {/* Balance Section */}
        <div className="d-flex justify-content-between align-items-center border-top border-white border-opacity-10 pt-3">
          <div>
            <small className="d-block text-white-50 text-uppercase fw-bold" style={{ fontSize: "8px", letterSpacing: "1px" }}>
              {isArisan ? "SALDO ARISAN" : "NOMINAL PINJAMAN"}
            </small>
            <h3 className="fw-bold text-white mb-0 mt-1 font-outfit" style={{ fontSize: "1.6rem" }}>
              {accountData?.saldoAkhir ?? "-"}
            </h3>
          </div>
        </div>
      </Card.Body>

      {/* Reworked transparent footer with premium action wrappers */}
      <Card.Footer className="premium-actions-footer border-0 bg-transparent py-3">
        <div className="d-flex justify-content-around align-items-center">
          <div 
            className="action-icon-wrapper" 
            role="button" 
            tabIndex={0} 
            onClick={handleSetoran}
            onKeyDown={(e) => e.key === "Enter" && handleSetoran?.()}
          >
            <div className="action-icon-circle">
              <FaMoneyBillWave size={20} />
            </div>
            <span className="action-icon-text">Bayar Setoran</span>
          </div>

          {!accountData?.isApproved && (
            <div 
              className="action-icon-wrapper" 
              role="button" 
              tabIndex={0} 
              onClick={handlePengajuan}
              onKeyDown={(e) => e.key === "Enter" && handlePengajuan?.()}
            >
              <div className="action-icon-circle">
                <FaFileAlt size={18} />
              </div>
              <span className="action-icon-text">Lihat Pengajuan</span>
            </div>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProgramAccountCard;
