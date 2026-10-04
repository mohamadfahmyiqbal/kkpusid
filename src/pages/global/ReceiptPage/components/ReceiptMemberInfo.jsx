import React from "react";
import { Row, Col } from "react-bootstrap";
import { formatDate } from "./receiptHelpers";

export default function ReceiptMemberInfo({ receiptData, isWithdrawal }) {
  return (
    <Row className="mb-5 gy-4">
      <Col md={6}>
        <div className="mb-4">
          <small className="text-uppercase text-muted fw-bold ls-1 d-block mb-2">
            Diterbitkan Untuk:
          </small>
          <h4 className="fw-bold text-dark mb-1">
            {receiptData.member?.full_name || receiptData.member?.name || "-"}
          </h4>
          <p className="text-primary fw-semibold mb-0">
            {receiptData.member?.member_no || receiptData.member?.memberId || "-"}
          </p>
          <small className="text-muted d-block mt-1">
            Email: {receiptData.member?.email || "-"}
          </small>
        </div>
      </Col>
      <Col md={6} className="text-md-end">
        <div>
          <small className="text-uppercase text-muted fw-bold ls-1 d-block mb-2">
            Detail Transaksi:
          </small>
          <h5 className="fw-bold text-dark mb-1">
            #{isWithdrawal ? (receiptData.id || receiptData.withdrawal_id || "-") : (receiptData.financing_id || "-")}
          </h5>
          <small className="text-muted d-block fw-medium">
            Kategori: {isWithdrawal ? (receiptData.account?.product?.name || receiptData.category || "Penarikan Simpanan") : (receiptData.akad_type || "Murabahah")}
          </small>
          <small className="text-muted d-block fw-medium">
            Tanggal: {formatDate(receiptData.createdAt)}
          </small>
        </div>
      </Col>
    </Row>
  );
}
