import React from "react";
import { Spinner } from "react-bootstrap";

const InvoiceLoading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <Spinner animation="grow" variant="primary" />
        <p className="mt-3 text-muted fw-semibold">
          Menyiapkan Invoice Anda...
        </p>
      </div>
    </div>
  );
};

export default InvoiceLoading;
