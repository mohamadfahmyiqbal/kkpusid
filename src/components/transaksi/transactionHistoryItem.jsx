// components/transaksi/TransactionHistoryItem.jsx
import React from "react";
import { Row } from "react-bootstrap";
import TransactionIcon from "./TransactionIcon";
import TransactionInfo from "./TransactionInfo";
import TransactionAmount from "./TransactionAmount";

export default function TransactionHistoryItem({ transaction, onViewDetail }) {
  return (
    <Row
      className="d-flex align-items-center border-bottom py-3"
      role="button"
      onClick={() => onViewDetail(transaction)}
      style={{ cursor: "pointer" }}
    >
      <TransactionIcon type={transaction.type} />
      <TransactionInfo transaction={transaction} />
      <TransactionAmount type={transaction.type} amount={transaction.amount} />
    </Row>
  );
}
