import React from "react";
import PropTypes from "prop-types";
import { FaHistory } from "react-icons/fa";
import { renderStatusBadge } from "./transactionDetailHelpers";

export default function TransactionStatusFooter({
  detail,
  approvalStatus,
  transactionType,
}) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
        <div className="d-flex align-items-center gap-2 text-muted">
          <FaHistory size={16} />
          <span className="fw-semibold text-uppercase status-label">
            Status Transaksi
          </span>
        </div>
        <div>{renderStatusBadge(detail, approvalStatus)}</div>
      </div>

      <div className="text-center px-4 mt-4">
        <small className="text-muted opacity-50">
          Jika ada pertanyaan mengenai status {transactionType} ini, silakan
          hubungi pengurus koperasi.
        </small>
      </div>
    </>
  );
}

TransactionStatusFooter.propTypes = {
  detail: PropTypes.object,
  approvalStatus: PropTypes.object,
  transactionType: PropTypes.string.isRequired,
};
