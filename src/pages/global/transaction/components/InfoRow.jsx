// src/pages/transaction/components/InfoRow.jsx
import React from "react";

const InfoRow = ({ label, value, isPrimary = false, isTotal = false }) => (
  <div
    className={`d-flex justify-content-between mb-2 border-bottom border-light pb-1 ${
      isTotal ? "pt-2 border-dark border-top" : ""
    }`}
  >
    <span className={`${isTotal ? "fw-bold" : "text-muted"} small`}>
      {label}
    </span>
    <span
      className={`small ${
        isPrimary || isTotal ? "text-primary fw-bold" : "text-dark"
      } ${isTotal ? "fs-6" : ""}`}
    >
      {value || "-"}
    </span>
  </div>
);

export default React.memo(InfoRow);
