import React from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

const InvoiceError = ({ error, onBack }) => {
  return (
    <Container className="py-5">
      <Alert
        variant="warning"
        className="rounded-4 p-4 shadow-sm border-0 bg-warning bg-opacity-10 text-warning-emphasis"
      >
        <div className="d-flex align-items-center gap-3">
          <FaExclamationTriangle size={30} />
          <div>
            <h5 className="fw-bold mb-1">Data Invoice Tidak Ditemukan</h5>
            <p className="mb-0">
              {error ||
                "Kami tidak dapat menemukan data tagihan yang Anda cari."}
            </p>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            variant="warning"
            onClick={onBack}
            className="rounded-3 fw-bold border-0 text-white"
            style={{ backgroundColor: "#ffc107" }}
          >
            Kembali ke Beranda
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default InvoiceError;
