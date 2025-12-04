// components/program/ProgramAccountCard.jsx (Optimized)

import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FaMoneyBillWave, FaFileAlt } from 'react-icons/fa'; // Impor ikon

// --- Komponen Pembantu ---

const IconAction = ({ text, onClick }) => {
  const IconComponent = text === 'Setoran' ? FaMoneyBillWave : FaFileAlt;
  
  return (
    <div 
      className="d-flex flex-column align-items-center cursor-pointer" 
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div 
        className="d-flex justify-content-center align-items-center rounded-circle bg-white shadow-sm mb-1" 
        style={{ width: '50px', height: '50px', border: '1px solid #ccc' }}
      >
        <IconComponent size={20} className="text-secondary" />
      </div>
      <span className="text-secondary small fw-bold">{text}</span>
    </div>
  );
};

// --- Komponen Utama ---

const ProgramAccountCard = ({ accountData, handleSetoran, handlePengajuan }) => {
  return (
    <Card className="shadow-lg border-0">
      <Card.Body className="p-4 bg-primary text-white">
        <h4 className="fw-bold mb-3">Informasi Rekening</h4>

        {/* Detail Informasi Rekening */}
        <Row className="mb-4 small">
          <Col xs={6}>
            <small className="d-block text-white-50">Nama</small>
            <h6 className="fw-bold text-truncate">{accountData.nama}</h6>
            <small className="d-block mt-2 text-white-50">Produk</small>
            <h6 className="fw-bold text-truncate">{accountData.produk}</h6>
          </Col>
          <Col xs={6}>
            <small className="d-block text-white-50">Akad</small>
            <h6 className="fw-bold text-truncate">{accountData.akad}</h6>
            <small className="d-block mt-2 text-white-50">Tanggal Buka</small>
            <h6 className="fw-bold text-truncate">{accountData.tanggalBuka}</h6>
          </Col>
        </Row>

        {/* Saldo Akhir */}
        <div className="d-flex justify-content-between align-items-center border-top border-white pt-3">
          <small className="d-block text-white-50">Saldo Akhir</small>
          <h4 className="fw-bold">{accountData.saldoAkhir}</h4>
        </div>
      </Card.Body>

      {/* Quick Action Buttons */}
      <Card.Footer className="bg-white p-3">
        <div className="d-flex justify-content-around">
          <IconAction text="Setoran" onClick={handleSetoran} />
          <IconAction text="Pengajuan" onClick={handlePengajuan} />
        </div>
      </Card.Footer>
    </Card>
  );
};

export default ProgramAccountCard;