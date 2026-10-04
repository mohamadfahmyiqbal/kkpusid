// components/transaksi/TransactionAmount.jsx
import React from "react";
import { Col } from "react-bootstrap";

export default function TransactionAmount({ type, amount }) {
  const amountColor = type.includes("Penarikan")
    ? "text-danger"
    : "text-success";

  return (
    <Col xs={3} className="text-end">
      <span className={`fw-bold d-block ${amountColor}`}>{amount}</span>
      <small className="text-primary fw-bold d-block mt-1">Lihat Detail</small>
    </Col>
  );
}
