// src/components/ui/ApprovalPlaceholder.jsx

import React from "react";
// 🚨 Import FaCheckCircle
import { FaUserShield, FaUserTie, FaCheckCircle } from "react-icons/fa"; 

/**
 * Komponen UI global untuk menampilkan placeholder persetujuan (approval).
 * @param {string} role - Peran yang diharapkan untuk melakukan approval (e.g., "Pengawas", "Ketua").
 * @param {boolean} isApproved - Status apakah langkah ini sudah disetujui (NEW).
 */
// 🚨 Menerima prop isApproved
export default function ApprovalPlaceholder({ role, isApproved }) {
  
  // Tentukan ikon berdasarkan status
  const icon = isApproved 
    ? <FaCheckCircle size={30} /> // Ikon Double Check (atau Check Circle) untuk Approved
    : role === "Pengawas" 
      ? <FaUserShield size={30} />
      : <FaUserTie size={30} />;
      
  // Tentukan kelas CSS dan style untuk warna dan border
  const containerClass = isApproved 
    ? "bg-success text-white border-success" // Latar belakang hijau, teks putih
    : "bg-light text-secondary border-secondary-dashed"; // Default
    
  const customStyle = isApproved 
    ? { width: "60px", height: "60px", border: "2px solid #198754" } // Border hijau solid
    : { width: "60px", height: "60px", border: "2px dashed #6c757d" }; // Border dashed default

  return (
    <div className="text-center p-3">
      <div
        className={`mx-auto rounded-circle d-flex align-items-center justify-content-center ${containerClass}`}
        style={customStyle} // Gunakan customStyle
      >
        {icon}
      </div>
      <small className="mt-2 d-block">Approval {role}</small>
    </div>
  );
}