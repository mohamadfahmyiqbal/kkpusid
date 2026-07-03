// src/components/ui/ApprovalPlaceholder.jsx
import React from "react";
import {
  FaUserShield,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function ApprovalPlaceholder({
  role,
  isApproved,
  isRejected,
  isReadyToPay,
  note,
  approverName,
}) {
  const IconRole =
    role === "PENGAWAS" || role === "Pengawas" ? FaUserShield : FaUserTie;

  return (
    <div className="text-center">
      <div
        className="mx-auto rounded-circle d-flex align-items-center justify-content-center position-relative"
        style={{
          width: "65px",
          height: "65px",
          backgroundColor: isRejected
            ? "#ffebee"
            : isReadyToPay
              ? "#e3f2fd"
              : isApproved
                ? "#e8f5e9"
                : "#f8f9fa",
          border: isRejected
            ? "2px solid #f44336"
            : isReadyToPay
              ? "2px solid #2196f3"
              : isApproved
                ? "2px solid #28a745"
                : "2px dashed #dee2e6",
          color: isRejected
            ? "#f44336"
            : isReadyToPay
              ? "#2196f3"
              : isApproved
                ? "#28a745"
                : "#adb5bd",
          transition: "all 0.3s ease",
        }}
      >
        <IconRole size={28} />

        {(isApproved || isReadyToPay || isRejected) && (
          <div
            className="position-absolute bg-white rounded-circle"
            style={{ bottom: "-2px", right: "-2px", lineHeight: 0 }}
          >
            {isRejected ? (
              <FaTimesCircle size={20} className="text-danger" />
            ) : (
              <FaCheckCircle
                size={20}
                className={isReadyToPay ? "text-primary" : "text-success"}
              />
            )}
          </div>
        )}
      </div>

      <small
        className={`mt-2 d-block fw-bold text-uppercase`}
        style={{
          fontSize: "10px",
          color: isRejected
            ? "#f44336"
            : isReadyToPay
              ? "#2196f3"
              : isApproved
                ? "#28a745"
                : "#6c757d",
          letterSpacing: "0.5px",
        }}
      >
        {role}
        {isRejected ? (
          <span className="d-block" style={{ fontSize: "9px" }}>
            DITOLAK
          </span>
        ) : isReadyToPay ? (
          <span className="d-block" style={{ fontSize: "9px" }}>
            SIAP BAYAR
          </span>
        ) : isApproved ? (
          <span className="d-block" style={{ fontSize: "9px" }}>
            SELESAI
          </span>
        ) : (
          <span className="d-block" style={{ fontSize: "9px" }}>
            PENDING
          </span>
        )}
      </small>

      {note && (
        <div className="mt-2 text-muted" style={{ fontSize: "10px", maxWidth: "120px", margin: "0 auto", wordWrap: "break-word" }}>
          {approverName && <span className="d-block fw-bold text-dark mb-1" style={{ fontSize: "9px" }}>{approverName}</span>}
          <span className="fst-italic">"{note}"</span>
        </div>
      )}
    </div>
  );
}
