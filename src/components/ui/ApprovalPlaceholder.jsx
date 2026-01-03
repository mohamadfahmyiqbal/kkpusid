import React from "react";
import { FaUserShield, FaUserTie, FaCheckCircle } from "react-icons/fa";

/**
 * Komponen UI global untuk menampilkan placeholder persetujuan (approval).
 * @param {string} role - Peran (e.g., "Pengawas", "Ketua").
 * @param {boolean} isApproved - Status dari RegistrationSummary (pengawasDone / ketuaDone).
 */
export default function ApprovalPlaceholder({ role, isApproved }) {
  // 1. Tentukan Ikon Utama
  // Kita tetap tampilkan ikon peran agar user tahu siapa yang menyetujui,
  // namun warnanya akan berubah jika sudah approved.
  const IconRole = role === "Pengawas" ? FaUserShield : FaUserTie;

  return (
    <div className="text-center">
      <div
        className="mx-auto rounded-circle d-flex align-items-center justify-content-center position-relative"
        style={{
          width: "65px",
          height: "65px",
          backgroundColor: isApproved ? "#e8f5e9" : "#f8f9fa", // Hijau sangat muda jika OK, abu jika belum
          border: isApproved ? "2px solid #28a745" : "2px dashed #dee2e6",
          color: isApproved ? "#28a745" : "#adb5bd",
          transition: "all 0.3s ease", // Efek transisi halus saat status berubah
        }}
      >
        {/* Ikon Peran Utama */}
        <IconRole size={28} />

        {/* Badge Centang Kecil di Pojok jika sudah Approved */}
        {isApproved && (
          <div
            className="position-absolute bg-white rounded-circle"
            style={{ bottom: "-2px", right: "-2px", lineHeight: 0 }}
          >
            <FaCheckCircle size={20} className="text-success" />
          </div>
        )}
      </div>

      <small
        className={`mt-2 d-block fw-bold text-uppercase`}
        style={{
          fontSize: "10px",
          color: isApproved ? "#28a745" : "#6c757d",
          letterSpacing: "0.5px",
        }}
      >
        {role}
        {isApproved ? (
          <span className="d-block" style={{ fontSize: "9px" }}>
            SELESAI
          </span>
        ) : (
          <span className="d-block" style={{ fontSize: "9px" }}>
            PENDING
          </span>
        )}
      </small>
    </div>
  );
}
