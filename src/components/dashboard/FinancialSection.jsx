// src/components/dashboard/FinancialSection.jsx

import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useProfile } from "../../contexts/ProfileContext";
import UGlobal from "../../utils/api/UGlobal";

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
      // Mengambil data dari endpoint /api/keuangan/summary melalui UGlobal
      const res = await UGlobal.getFinancialSummary();
      if (res.data?.success) {
        setBalance(res.data.data.totalSavings || 0);
      }
    } catch (err) {
      console.error("Gagal memuat saldo:", err);
    } finally {
      setLoading(false);
    }
  }, [userData]);

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
    return <div className="p-3 text-white-50 small">Memuat data dompet...</div>;

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
                {userData?.member_no || "-"}
              </div>
            </div>

            <div>
              <div className="small opacity-75 fw-semibold">
                No Rekening Simpanan
              </div>
              <div className="fw-bold h5 mb-0" style={{ letterSpacing: "1px" }}>
                #{userData?.bank_account_no || "0000000000000"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSection;
