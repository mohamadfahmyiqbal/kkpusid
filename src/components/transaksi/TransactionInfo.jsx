// components/transaksi/TransactionInfo.jsx
import React from "react";
import { Col } from "react-bootstrap";

export default function TransactionInfo({ transaction }) {
  return (
    <Col xs={7}>
      <h6 className="mb-0 fw-bold text-dark">{transaction.description}</h6>
      <small className="text-muted d-block">{transaction.date}</small>
      <span className={`badge bg-${transaction.statusVariant} mt-1`}>
        {transaction.status}
      </span>
    </Col>
  );
}
