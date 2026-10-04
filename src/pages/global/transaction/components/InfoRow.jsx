// src/pages/global/transaction/components/InfoRow.jsx
import React from "react";

const InfoRow = ({ icon, label, value, isPrimary = false, isTotal = false }) => (
  <div
    className={`d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-light-subtle ${
      isTotal ? "mt-3 pt-3 border-secondary-subtle border-top border-bottom-0" : ""
    }`}
  >
    <div className="d-flex align-items-center gap-2">
      {icon && <span className="text-secondary opacity-75">{icon}</span>}
      <span className={`${isTotal ? "fw-bold text-dark" : "text-secondary"} small text-uppercase tracking-tight`} style={{ fontSize: '11px', fontWeight: 600 }}>
        {label}
      </span>
    </div>
    <span
      className={`text-end ${
        isPrimary || isTotal ? "text-primary fw-bold fs-6" : "text-dark fw-medium"
      }`}
      style={{ fontSize: isTotal ? '1.1rem' : '14px' }}
    >
      {value || "-"}
    </span>
  </div>
);

export default React.memo(InfoRow);
