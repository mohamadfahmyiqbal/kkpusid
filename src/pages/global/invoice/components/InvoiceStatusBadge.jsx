import React from "react";
import { Badge } from "react-bootstrap";

const InvoiceStatusBadge = ({ isPaid, status }) => {
  const isPendingVerification =
    status === "pending_verification" || status === "PENDING_VERIFICATION";
  const isRejected = status === "rejected" || status === "REJECTED";

  let badgeBg = isPaid ? "success" : "warning";
  let badgeText = isPaid ? "white" : "dark";
  let label = isPaid ? "LUNAS / PAID" : "BELUM DIBAYAR";

  if (isPendingVerification) {
    badgeBg = "info";
    badgeText = "white";
    label = "MENUNGGU VERIFIKASI";
  } else if (isRejected) {
    badgeBg = "danger";
    badgeText = "white";
    label = "DITOLAK";
  }

  return (
    <div className="d-flex justify-content-end mb-3 px-3 d-print-none">
      <h6 className="mb-0 fw-bold me-2 align-self-center">Status:</h6>
      <Badge
        bg={badgeBg}
        text={badgeText}
        className="px-3 py-2 fs-6 rounded-pill shadow-sm"
      >
        {label}
      </Badge>
    </div>
  );
};

export default InvoiceStatusBadge;
