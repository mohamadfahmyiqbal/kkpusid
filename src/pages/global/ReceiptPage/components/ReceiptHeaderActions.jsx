import React from "react";
import { Button } from "react-bootstrap";
import { FaArrowLeft, FaPrint, FaDownload } from "react-icons/fa";

export default function ReceiptHeaderActions({ onBack, onPrint, onDownloadPDF }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 no-print flex-wrap gap-3">
      <Button
        variant="light"
        className="rounded-pill px-4 fw-semibold border shadow-sm text-secondary d-flex align-items-center"
        onClick={onBack}
      >
        <FaArrowLeft className="me-2" /> Kembali
      </Button>
      <div className="d-flex gap-2">
        <Button
          variant="outline-secondary"
          className="rounded-pill px-4 fw-semibold shadow-sm d-flex align-items-center"
          onClick={onPrint}
        >
          <FaPrint className="me-2" /> Cetak Resi
        </Button>
        <Button
          variant="primary"
          className="rounded-pill px-4 fw-semibold shadow-sm d-flex align-items-center"
          onClick={onDownloadPDF}
        >
          <FaDownload className="me-2" /> Download PDF
        </Button>
      </div>
    </div>
  );
}
