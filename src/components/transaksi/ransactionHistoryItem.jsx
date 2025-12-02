// components/transaksi/TransactionHistoryItem.jsx

import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaFileInvoice } from "react-icons/fa";

/**
 * Komponen untuk menampilkan satu baris riwayat transaksi.
 */
export default function TransactionHistoryItem({ transaction, onViewDetail }) {
  const isWithdrawal = transaction.type === "Pencairan";
  const iconColor = isWithdrawal ? "text-danger" : "text-success";
  const amountColor = isWithdrawal ? "text-danger" : "text-success";

  return (
    <Row
      className="d-flex align-items-center border-bottom py-3"
      role="button"
      onClick={() => onViewDetail(transaction)}
      style={{ cursor: "pointer" }}
    >
      <Col xs={2} className="text-center">
        <FaFileInvoice size={30} className={iconColor} />
      </Col>
      <Col xs={7}>
        <h6 className="mb-0 fw-bold text-dark">{transaction.description}</h6>
        <small className="text-muted d-block">{transaction.date}</small>
        <span className={`badge bg-${transaction.statusVariant} mt-1`}>
          {transaction.status}
        </span>
      </Col>
      <Col xs={3} className="text-end">
        <span className={`fw-bold d-block ${amountColor}`}>
          {transaction.amount}
        </span>
        <small className="text-primary fw-bold d-block mt-1">
          Lihat Detail
        </small>
      </Col>
    </Row>
  );
}
