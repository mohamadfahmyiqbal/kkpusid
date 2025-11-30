// components/dashboard/FinancialSection.jsx (UPDATED)

import React, { useState } from "react";
// Catatan: menuItems dan Menu Utama telah dihapus dari file ini.

const FinancialSection = ({ user }) => {
  const [showBalance, setShowBalance] = useState(false);

  const toggleBalance = () => {
    setShowBalance((prev) => !prev);
  };

  const balanceAmount = user.total_saldo || 0;

  return (
    <div className="mb-4">
      {/* CARD: Total Saldo - Menggunakan bg-blueGrad */}
      <div
        className="card bg-blueGrad text-white mb-4 shadow-sm"
        style={{ borderRadius: "10px" }}
      >
        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <p className="mb-1 fw-bold" style={{ fontSize: "1.2rem" }}>
                Total Saldo
              </p>

              {/* CONDITIONAL DISPLAY: Tampilkan saldo atau bintang */}
              <h2 className="mb-2 fw-bold">
                Rp.{" "}
                {showBalance
                  ? balanceAmount.toLocaleString("id-ID", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })
                  : "**********"}
              </h2>

              {/* Detail Anggota */}
              <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                No Anggota : {user.no_anggota}
              </p>
              <p className="mb-0" style={{ fontSize: "0.9rem" }}>
                No Rekening Simpanan
              </p>
              <p className="mb-0 fw-bold" style={{ fontSize: "1.1rem" }}>
                #{user.no_rekening}
              </p>
            </div>

            {/* ICON MATA (dengan onClick handler) */}
            <i
              className={`fa ${showBalance ? "fa-eye-slash" : "fa-eye"}`}
              style={{ fontSize: "1.5rem", opacity: 0.8, cursor: "pointer" }}
              onClick={toggleBalance}
            ></i>
          </div>
        </div>
      </div>
      {/* Catatan: Menu Utama dihapus dari sini */}
    </div>
  );
};

export default FinancialSection;
