// src/components/dashboard/FinancialSection.jsx

import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useProfile } from "../../../components/layout/contexts";
import { getDashboardFinancialSummary } from "../service/dashboardService";

const FinancialSection = () => {
  const { userData } = useProfile();
  const [balance, setBalance] = useState(0);

  // 1. State untuk kontrol visibilitas saldo (default: tersembunyi)
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchBalance = useCallback(async () => {
    if (!userData?.member_id) return;
    setLoading(true);
    try {
      const res = await getDashboardFinancialSummary();
      if (res.data?.success) {
        setBalance(res.data.data.totalSavings || 0);
      }
    } catch (err) {
      console.error("Gagal memuat saldo:", err);
    } finally {
      setLoading(false);
    }
  }, [userData]);

  const memberDisplayId = userData?.member_no || userData?.member_id || "-";
  const accountNo =
    userData?.bank_account_no || userData?.bank_info?.bank_account_no;

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);
  };

  if (loading)
    return (
      <div className="financial-section mb-4">
        <div
          className="card border-0 shadow-lg"
          style={{
            background: "linear-gradient(90deg, #075985 0%, #38bdf8 100%)",
            borderRadius: "16px",
            color: "white",
          }}
        >
          <div className="card-body p-4">
            <div className="placeholder-glow">
              <span className="placeholder col-4 mb-2 bg-white bg-opacity-25"></span>
              <span className="placeholder col-6 mb-4 bg-white bg-opacity-25"></span>
              <span className="placeholder col-12 mb-2 bg-white bg-opacity-25"></span>
              <span className="placeholder col-8 mb-2 bg-white bg-opacity-25"></span>
              <span className="placeholder col-10 bg-white bg-opacity-25"></span>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="financial-section mb-4 dash-fade-in">
      <div
        className="card border-0 shadow-lg"
        style={{
          background: "linear-gradient(90deg, #075985 0%, #38bdf8 100%)",
          borderRadius: "16px",
          color: "white",
        }}
      >
        <div className="card-body p-4">
          {/* Header Saldo & Ikon Mata */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h5 className="fw-bold mb-0" style={{ fontSize: "1.1rem" }}>
              Total Saldo
            </h5>
            {/* 2. Tombol Toggle Mata */}
            <span
              role="button"
              onClick={() => setShowBalance(!showBalance)}
              style={{ cursor: "pointer" }}
              className="opacity-75"
              aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
            >
              {showBalance ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </span>
          </div>

          {/* 3. Logika Tampilan Saldo */}
          <div className="mb-4">
            <h2 className="fw-bold mb-0" style={{ minHeight: "40px" }}>
              {showBalance ? formatRupiah(balance) : "Rp. ********"}
            </h2>
          </div>

          {/* Detail Informasi Anggota */}
          <div className="mt-auto">
            <div className="mb-2">
              <div className="small opacity-75 fw-semibold">No Anggota :</div>
              <div className="fw-bold h5 mb-0" style={{ letterSpacing: "1px" }}>
                {memberDisplayId}
              </div>
            </div>

            <div>
              <div className="small opacity-75 fw-semibold">
                No Rekening Simpanan
              </div>
              <div className="fw-bold h5 mb-0" style={{ letterSpacing: "1px" }}>
                #{accountNo || "0000000000000"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FinancialSection);
