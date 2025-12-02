// src/components/ui/ApprovalPlaceholder.jsx

import React from "react";
import { FaUserShield, FaUserTie } from "react-icons/fa";

/**
 * Komponen UI global untuk menampilkan placeholder persetujuan (approval).
 * @param {string} role - Peran yang diharapkan untuk melakukan approval (e.g., "Pengawas", "Ketua").
 */
export default function ApprovalPlaceholder({ role }) {
  return (
    <div className="text-center p-3">
      <div
        className="mx-auto border rounded-circle d-flex align-items-center justify-content-center bg-light text-secondary"
        style={{ width: "60px", height: "60px", border: "2px dashed #6c757d" }}
      >
        {role === "Pengawas" ? (
          <FaUserShield size={30} />
        ) : (
          <FaUserTie size={30} />
        )}
      </div>
      <small className="mt-2 d-block">Approval {role}</small>
    </div>
  );
}
