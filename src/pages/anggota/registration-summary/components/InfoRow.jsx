import React from "react";

const InfoRow = ({ label, value, isBoldValue = false }) => (
  <tr>
    <td
      className="text-muted py-2 fw-bold"
      style={{ fontSize: "13px", border: "none", width: "40%" }}
    >
      {label}
    </td>
    <td
      className={`text-end py-2 ${isBoldValue ? "fw-bold text-primary" : ""}`}
      style={{ fontSize: "13px", border: "none" }}
    >
      {value || "-"}
    </td>
  </tr>
);

export default InfoRow;
