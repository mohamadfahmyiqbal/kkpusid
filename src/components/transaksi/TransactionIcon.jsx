// components/transaksi/TransactionIcon.jsx
import React from "react";
import { Col } from "react-bootstrap";
import { FaFileInvoice } from "react-icons/fa";

export default function TransactionIcon({ type }) {
  const iconColor =
    type === "Penarikan Simpanan Sukarela" ? "text-danger" : "text-success";

  return (
    <Col xs={2} className="text-center">
      <FaFileInvoice size={30} className={iconColor} />
    </Col>
  );
}
