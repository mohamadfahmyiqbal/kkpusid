// src/pages/global/transaction/components/PageHeader.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const PageHeader = ({ isFinancing, onBack }) => (
  <div className="d-flex align-items-center mb-3 px-2 d-print-none">
    <Button variant="link" onClick={onBack} className="p-0 me-3 text-secondary">
      <FaArrowLeft size={18} />
    </Button>
    <h5 className="mb-0 fw-bold">
      Detail {isFinancing ? "Pengajuan" : "Penarikan"}
    </h5>
  </div>
);

export default React.memo(PageHeader);
