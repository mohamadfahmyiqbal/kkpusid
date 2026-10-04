// src/pages/global/transaction/components/PageHeader.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const PageHeader = ({ isFinancing, onBack }) => (
  <div className="container d-flex align-items-center mb-4 pt-4 px-3 d-print-none">
    <Button 
      variant="white" 
      onClick={onBack} 
      className="p-2 me-3 shadow-sm rounded-3 border-0 bg-white text-dark hover-translate-x"
      style={{ transition: 'all 0.2s ease' }}
    >
      <FaArrowLeft size={16} />
    </Button>
    <div>
      <h5 className="mb-0 fw-bold text-dark">
        Detail {isFinancing ? "Pembiayaan" : "Penarikan"}
      </h5>
      <p className="text-muted small mb-0 opacity-75">Informasi rincian dan status pengajuan Anda</p>
    </div>
    
    <style>{`
      .hover-translate-x:hover {
        transform: translateX(-3px);
        background: #f8fafc !important;
      }
    `}</style>
  </div>
);

export default React.memo(PageHeader);
