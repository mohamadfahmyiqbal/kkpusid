import React from "react";
import { Badge } from "react-bootstrap";

const InvoiceStatusBadge = ({ isPaid }) => {
  return (
    <div className="d-flex justify-content-end mb-3 px-3 d-print-none">
      <h6 className="mb-0 fw-bold me-2 align-self-center">Status:</h6>
      <Badge
        bg={isPaid ? "success" : "warning"}
        text={isPaid ? "white" : "dark"}
        className="px-3 py-2 fs-6 rounded-pill shadow-sm"
      >
        {isPaid ? "LUNAS / PAID" : "BELUM DIBAYAR"}
      </Badge>
    </div>
  );
};

export default InvoiceStatusBadge;
