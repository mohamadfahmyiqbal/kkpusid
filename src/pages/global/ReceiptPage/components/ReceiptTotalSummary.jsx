import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaCheckCircle, FaRegFileAlt } from "react-icons/fa";
import { formatCurrency } from "./receiptHelpers";

export default function ReceiptTotalSummary({ receiptData, isWithdrawal }) {
  return (
    <Row className="justify-content-between align-items-end mt-4">
      <Col md={6} className="mb-4 mb-md-0">
        <div className="d-flex align-items-center gap-3 text-muted small">
          <div className="bg-light p-2 rounded-3 no-print">
            <FaCheckCircle className="text-success" />
          </div>
          <div>
            <div className="fw-bold text-dark">Transaksi Sah & Teregistrasi</div>
            <div>Dicetak pada: {new Date().toLocaleString("id-ID")}</div>
          </div>
        </div>
      </Col>
      <Col md={5}>
        <div className="p-4 rounded-4 bg-light border-0 shadow-sm overflow-hidden position-relative">
          <div
            className="position-absolute no-print"
            style={{
              bottom: "-10px",
              right: "-10px",
              opacity: 0.1,
              transform: "rotate(-15deg)",
            }}
          >
            <FaRegFileAlt size={80} />
          </div>
          <p className="text-muted mb-2 fw-bold small text-uppercase ls-1 position-relative z-1">
            Total {isWithdrawal ? "Pencairan" : "Pinjaman"}
          </p>
          <h2 className="fw-bold text-success mb-0 position-relative z-1">
            {formatCurrency(
              isWithdrawal ? receiptData.amount : receiptData.amount_requested
            )}
          </h2>
        </div>
      </Col>
    </Row>
  );
}
