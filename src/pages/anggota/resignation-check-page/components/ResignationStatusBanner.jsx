import React from "react";
import { FaBan, FaCheckCircle } from "react-icons/fa";

export default function ResignationStatusBanner({ hasBills }) {
  if (hasBills) {
    return (
      <div className="text-center mb-5">
        <div className="rcp-icon-wrapper danger-bg mx-auto mb-3">
          <FaBan className="rcp-icon text-danger" />
        </div>
        <h3 className="fw-bold text-dark mb-2">
          Tidak Dapat Berhenti Keanggotaan
        </h3>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Kami menemukan bahwa Anda masih memiliki kewajiban atau tagihan yang
          belum diselesaikan. Harap melunasi semua tagihan di bawah ini sebelum
          Anda dapat mengajukan berhenti keanggotaan.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-5">
      <div className="rcp-icon-wrapper success-bg mx-auto mb-3">
        <FaCheckCircle className="rcp-icon text-success" />
      </div>
      <h3 className="fw-bold text-dark mb-2">Pengecekan Selesai</h3>
      <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
        Anda tidak memiliki kewajiban atau tagihan yang tertunggak. Anda dapat
        melanjutkan proses pengajuan berhenti keanggotaan.
      </p>
    </div>
  );
}
