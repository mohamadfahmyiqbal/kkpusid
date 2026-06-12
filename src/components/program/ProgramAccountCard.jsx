// components/program/ProgramAccountCard.jsx

import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FaMoneyBillWave, FaFileAlt } from "react-icons/fa";

const ProgramAccountCard = ({
  accountData,
  handleSetoran,
  handlePengajuan,
}) => {
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
  const isPending = !accountData?.isApproved;

  return (
    <Card className="premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg">
      <div className="glass-sheen" />
      <Card.Body className="p-4 relative" style={{ zIndex: 2 }}>
        {/* Card Top */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect">
            <span className="fw-bold tracking-wider card-type-label">
              {isArisan ? "INFORMASI ARISAN" : "INFORMASI PINJAMAN"}
            </span>
          </div>
          <span className="premium-status-badge">
            {accountData.statusLabel || "AKTIF"}
          </span>
        </div>

        {/* Saldo Display */}
        <div className="dc-saldo-display mb-4">
          <div className="small opacity-75 mb-1 fw-medium">
            {isArisan ? "Saldo Arisan" : "Total Pinjaman"}
          </div>
          <h2 className="fw-bold mb-0 text-white font-outfit card-amount-value" style={{ fontSize: '30px' }}>
            {accountData?.saldoAkhir ?? "-"}
          </h2>
        </div>

        {/* Info Details */}
        <div className="row g-3 mb-4 pt-3 border-top border-white border-opacity-10 text-start">
          <div className="col-4">
            <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">NAMA PRODUK</div>
            <div className="fw-bold small text-white-90">{accountData?.produk ?? "-"}</div>
          </div>
          <div className="col-4">
            <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">
              {isArisan ? "STATUS/NO. PESERTA" : "NAMA ANGGOTA"}
            </div>
            <div className="fw-bold small text-white-90">{isArisan ? accountData?.akad : accountData?.nama}</div>
          </div>
          <div className="col-4">
            <div className="text-uppercase opacity-50 fw-bold mb-1 card-grid-label">TANGGAL BUKA</div>
            <div className="fw-bold small text-white-90">{accountData?.tanggalBuka ?? "-"}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          {!isPending && (
            <Button 
              variant="light" 
              className="w-100 border-0 shadow-sm rounded-3 py-2.5 fw-bold text-teal d-flex align-items-center justify-content-center gap-2 premium-btn-hover premium-btn-text"
              onClick={handleSetoran}
            >
              Bayar Setoran
            </Button>
          )}

          {isPending && (
            <Button 
              variant="light" 
              className="w-100 border-0 shadow-sm rounded-3 py-2.5 fw-bold text-warning d-flex align-items-center justify-content-center gap-2 premium-btn-hover premium-btn-text"
              onClick={handlePengajuan}
            >
              Lihat Pengajuan
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProgramAccountCard;
