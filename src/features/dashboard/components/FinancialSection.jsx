// src/features/dashboard/components/FinancialSection.jsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaEye, FaEyeSlash, FaWallet, FaUserTag, FaUniversity, FaSyncAlt } from "react-icons/fa";
import { useProfile } from "../../../components/layout/contexts";
import { getDashboardFinancialSummary } from "../service/dashboardService";

const FinancialSection = () => {
  const { userData } = useProfile();
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalance = useCallback(async (isRefresh = false) => {
    if (!userData?.member_id) return;
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const res = await getDashboardFinancialSummary();
      if (res.data?.success) {
        setBalance(res.data.data.totalSavings || 0);
      }
    } catch (err) {
      console.error("Gagal memuat saldo:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [userData]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const formattedBalance = useMemo(() => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(balance || 0);
  }, [balance]);

  const memberDisplayId = userData?.member_no || userData?.member_id || "-";
  const accountNo = userData?.bank_account_no || userData?.bank_info?.bank_account_no || "0000000000000";

  if (loading)
    return (
      <div className="financial-section mb-4">
        <div
          className="card border-0 shadow-lg"
          style={{
            background: "linear-gradient(135deg, #075985 0%, #0369a1 100%)",
            borderRadius: "20px",
            color: "white",
            minHeight: "220px"
          }}
        >
          <div className="card-body p-4">
            <div className="placeholder-glow">
              <div className="d-flex justify-content-between mb-3">
                <span className="placeholder col-4 bg-white bg-opacity-25 rounded"></span>
                <span className="placeholder col-1 bg-white bg-opacity-25 rounded-circle"></span>
              </div>
              <span className="placeholder col-8 mb-4 py-3 bg-white bg-opacity-25 rounded"></span>
              <div className="mt-4">
                <span className="placeholder col-5 mb-2 bg-white bg-opacity-25 rounded d-block"></span>
                <span className="placeholder col-7 bg-white bg-opacity-25 rounded d-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="financial-section mb-4 dash-fade-in position-relative">
      <div
        className="card border-0 shadow-lg overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
          borderRadius: "20px",
          color: "white",
          boxShadow: "0 10px 25px -5px rgba(7, 89, 133, 0.4)",
          minHeight: "220px"
        }}
      >
        {/* Decorative Background Elements */}
        <div 
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '50%',
            zIndex: 0
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '10%',
            width: '180px',
            height: '180px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '50%',
            zIndex: 0
          }}
        />

        <div className="card-body p-4 position-relative" style={{ zIndex: 1 }}>
          {/* Header Saldo */}
          <div className="d-flex justify-content-between align-items-center mb-1">
            <div className="d-flex align-items-center gap-2">
              <div className="bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                <FaWallet size={16} />
              </div>
              <h6 className="fw-semibold mb-0 opacity-90" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
                TOTAL SALDO SIMPANAN
              </h6>
            </div>
            
            <div className="d-flex gap-2">
              <button
                type="button"
                className={`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${isRefreshing ? 'fa-spin' : ''}`}
                onClick={() => fetchBalance(true)}
                disabled={isRefreshing}
                aria-label="Refresh saldo"
              >
                <FaSyncAlt size={16} />
              </button>
              <button
                type="button"
                className="btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all"
                onClick={() => setShowBalance(!showBalance)}
                aria-label={showBalance ? "Sembunyikan saldo" : "Tampilkan saldo"}
              >
                {showBalance ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          {/* Saldo Display */}
          <div className="py-3">
            <h2 className="fw-bold mb-0 d-flex align-items-baseline" style={{ letterSpacing: '-0.5px' }}>
              {showBalance ? (
                formattedBalance
              ) : (
                <span style={{ fontSize: '1.8rem', opacity: 0.9 }}>Rp ••••••••</span>
              )}
            </h2>
          </div>

          {/* Detail Informasi */}
          <div className="row g-3 mt-1">
            <div className="col-6 border-end border-white border-opacity-10">
              <div className="d-flex align-items-start gap-2">
                <FaUserTag className="mt-1 opacity-60" size={14} />
                <div>
                  <div className="text-uppercase opacity-60 fw-bold" style={{ fontSize: '10px', letterSpacing: '0.8px' }}>
                    ID ANGGOTA
                  </div>
                  <div className="fw-bold" style={{ fontSize: '14px', letterSpacing: '0.5px' }}>
                    {memberDisplayId}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6 ps-3">
              <div className="d-flex align-items-start gap-2">
                <FaUniversity className="mt-1 opacity-60" size={14} />
                <div>
                  <div className="text-uppercase opacity-60 fw-bold" style={{ fontSize: '10px', letterSpacing: '0.8px' }}>
                    NO. REKENING
                  </div>
                  <div className="fw-bold" style={{ fontSize: '14px', letterSpacing: '0.5px' }}>
                    {accountNo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
        .hover-opacity-100:hover {
          opacity: 1 !important;
          transform: scale(1.1);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .fa-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default React.memo(FinancialSection);
