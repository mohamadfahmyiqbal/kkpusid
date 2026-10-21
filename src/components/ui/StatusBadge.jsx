import React from "react";
import { Badge } from "react-bootstrap";

/**
 * Reusable StatusBadge component
 * Maps common application statuses to consistent semantic colors and labels.
 * 
 * @param {string} status - Status code or name (e.g. 'active', 'pending', 'lunas', 'selesai', 'ditolak')
 * @param {string} label - Optional explicit label override
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} className - Optional additional CSS class
 */
export const StatusBadge = ({
  status = "",
  label,
  size = "md",
  className = "",
}) => {
  const norm = String(status).toLowerCase().trim();

  let bg = "secondary";
  let displayLabel = label || status;

  if (["active", "aktif", "approved", "disetujui", "lunas", "berhasil", "success"].includes(norm)) {
    bg = "success";
    if (!label) displayLabel = norm === "lunas" ? "Lunas" : "Aktif";
  } else if (["pending", "tertunda", "menunggu", "waiting", "in_progress"].includes(norm)) {
    bg = "warning";
    if (!label) displayLabel = "Menunggu";
  } else if (["rejected", "ditolak", "failed", "gagal", "inactive", "nonaktif", "batal"].includes(norm)) {
    bg = "danger";
    if (!label) displayLabel = norm === "rejected" || norm === "ditolak" ? "Ditolak" : "Gagal";
  } else if (["processing", "diproses", "berjalan"].includes(norm)) {
    bg = "info";
    if (!label) displayLabel = "Diproses";
  }

  const sizeClasses =
    size === "sm"
      ? "px-2 py-1 fs-xs"
      : size === "lg"
      ? "px-3 py-2 fs-6"
      : "px-2.5 py-1.5";

  return (
    <Badge
      bg={bg}
      className={`fw-semibold rounded-pill align-middle ${sizeClasses} ${className}`}
      style={{ letterSpacing: "0.3px" }}
    >
      {displayLabel}
    </Badge>
  );
};

export default StatusBadge;
