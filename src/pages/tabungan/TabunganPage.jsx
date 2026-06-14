// pages/tabungan/TabunganPage.jsx

import React, { useState, useCallback, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdSavings, MdAccountBalanceWallet, MdSchool, MdPets } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import TabunganService from "../../services/tabungan.service";

import ProgramStatusCard from "../../components/program/ProgramStatusCard";
import { jwtEncode } from "../../utils/helpers";
import "./TabunganPage.css";

// ── DATA MENU TABUNGAN ──
const TABUNGAN_OPTIONS = [
  { label: "Tabungan Haji", key: "haji", icon: MdSavings },
  { label: "Tabungan Umrah", key: "umrah", icon: MdAccountBalanceWallet },
  { label: "Tabungan Pendidikan", key: "pendidikan", icon: MdSchool },
  { label: "Tabungan Qurban", key: "qurban", icon: MdPets },
];

// ── HELPERS ──

/** Format product key into display name (e.g. "haji" → "Haji") */
const formatProductName = (product) =>
  product.charAt(0).toUpperCase() + product.slice(1);

/** Build JWT token & navigate to an encrypted route */
const navigateTo = (navigate, page, product) => {
  const token = jwtEncode({ page, product });
  navigate(`/${token}`);
};

// ── SKELETON LOADER ──

const TabunganSkeleton = () => (
  <div className="animate-pulse">
    <div className="d-flex flex-column flex-md-row gap-2 overflow-hidden mb-4 px-1">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-light rounded-pill tabungan-skeleton-tab" />
      ))}
    </div>
    <div className="bg-light rounded-4 w-100 tabungan-skeleton-card" />
  </div>
);

// ── EMPTY STATE ──

const EmptyState = ({ onPengajuan }) => (
  <div className="animate-fade-in" key="empty">
    <ProgramStatusCard
      title="Informasi Rekening"
      message="Anda belum memiliki rekening tabungan ini"
      buttonText="Pengajuan"
      onButtonClick={onPengajuan}
      status="NG"
    />
  </div>
);

// ── ACTIVE ACCOUNT CARD ──

const ActiveTabunganCard = ({ accountData, onSetoran, productName }) => {
  const formatIDR = (val) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(val || 0);
  const currentBalance = parseFloat(accountData.current_balance || 0);
  const targetAmount = parseFloat(accountData.target_amount || 0);
  const progressPercent = targetAmount > 0 ? Math.min(100, (currentBalance / targetAmount) * 100) : 0;

  return (
    <div className="program-status-card program-status-active mb-4 p-4 text-white animate-fade-in" style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
      <div className="program-glass-sheen" />
      <div className="program-decor-circle c1" />
      <div className="program-decor-circle c2" />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h4 className="fw-bold mb-1" style={{ fontSize: '1.25rem' }}>Rekening Aktif</h4>
            <p className="opacity-75 m-0" style={{ fontSize: '0.9rem' }}>{accountData.target_name || `Tabungan ${productName}`}</p>
          </div>
          <button 
            className="btn btn-light fw-bold rounded-pill px-4" 
            onClick={onSetoran}
            style={{ color: '#2563eb', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          >
            Setoran
          </button>
        </div>

        <div className="bg-white bg-opacity-10 rounded-4 p-3 mb-3" style={{ backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <div className="d-flex justify-content-between mb-1 align-items-center">
            <span className="small opacity-75">Saldo Terkumpul</span>
            <span className="fw-bold fs-5">{formatIDR(currentBalance)}</span>
          </div>
          <div className="d-flex justify-content-between mb-2 align-items-center">
            <span className="small opacity-75">Target Saldo</span>
            <span className="fw-bold opacity-75">{formatIDR(targetAmount)}</span>
          </div>
          
          <div className="progress mt-3" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
            <div 
              className="progress-bar bg-warning" 
              role="progressbar" 
              style={{ width: `${progressPercent}%`, transition: 'width 1s ease-in-out' }}
            />
          </div>
          <div className="text-end mt-1">
            <span className="small opacity-75" style={{ fontSize: '0.75rem' }}>{progressPercent.toFixed(1)}% Tercapai</span>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center opacity-75 mt-1" style={{ fontSize: '0.8rem' }}>
          <div>
            <FaShieldAlt className="me-1 mb-1" />
            Min. Bulanan: {formatIDR(accountData.min_monthly_deposit)}
          </div>
          <div>ID Rek: #{accountData.member_saving_target_id}</div>
        </div>
      </div>
    </div>
  );
};

// ── MAIN PAGE ──

export default function TabunganPage() {
  const navigate = useNavigate();

  const [activeProduct, setActiveProduct] = useState("haji");
  const [accountStatus, setAccountStatus] = useState({ state: "EMPTY", data: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check account status for each product
  useEffect(() => {
    let cancelled = false;

    const checkAccountStatus = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await TabunganService.checkAccountStatus(activeProduct);
        
        if (cancelled) return;

        if (response.data && response.data.hasAccount) {
          setAccountStatus({
            state: response.data.state, // 'PENDING', 'APPROVED', 'REJECTED'
            data: response.data
          });
        } else {
          setAccountStatus({ state: "EMPTY", data: null });
        }

      } catch (err) {
        if (!cancelled) {
          setError("Gagal memuat status rekening");
          setAccountStatus({ state: "EMPTY", data: null });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    checkAccountStatus();

    return () => {
      cancelled = true;
    };
  }, [activeProduct]);

  // ── Handlers ──

  const handlePengajuan = useCallback(() => {
    navigateTo(navigate, "formPengajuanTabungan", activeProduct);
  }, [navigate, activeProduct]);

  const handleSetoran = useCallback(() => {
    const token = jwtEncode({
      page: "billingPage",
      category: "TABUNGAN_DEPOSIT",
      tabungan_id: accountStatus.data?.member_saving_target_id,
      productName: activeProduct,
      displayName: "Setoran Tabungan",
      return: "tabunganPage",
    });
    navigate(`/${token}`);
  }, [navigate, activeProduct, accountStatus]);

  const handleProductChange = useCallback((key) => {
    setActiveProduct(key);
  }, []);

  // ── Render ──

  return (
    <div className="tabungan-page-container pb-5">
      {/* Error */}
      {error && (
        <Alert
          variant="danger"
          className="mx-2 shadow-sm rounded-4 border-0 animate-fade-in"
          dismissible
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* Loading */}
      {loading ? (
        <div className="px-2">
          <TabunganSkeleton />
        </div>
      ) : (
        <>
          {/* Tabs Navigation */}
          <div className="tabungan-tabs-container mb-4 px-2">
            <div className="d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 tabungan-scroll-hide">
              {TABUNGAN_OPTIONS.map((opt) => {
                const isActive = activeProduct === opt.key;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleProductChange(opt.key)}
                    className={`tabungan-tab-btn ${isActive ? "active" : ""}`}
                  >
                    <Icon size={18} />
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="px-2 animate-fade-in" key={activeProduct}>
            {accountStatus.state === "EMPTY" && (
              <EmptyState onPengajuan={handlePengajuan} />
            )}

            {(accountStatus.state === "PENDING" || accountStatus.state === "IN_PROGRESS" || accountStatus.state === "WAITING_APPROVAL") && (
              <ProgramStatusCard
                title="Menunggu Persetujuan"
                message={`Pengajuan Tabungan ${formatProductName(activeProduct)} sedang direview oleh pengurus`}
                buttonText="Lihat Detail"
                onButtonClick={() => {
                   const token = jwtEncode({
                      page: "transactionDetailPage",
                      tabunganId: accountStatus.data.member_saving_target_id,
                      return: "tabunganPage",
                      product: activeProduct,
                   });
                   navigate(`/${token}`);
                }}
                variant="pending"
              />
            )}

            {(accountStatus.state === "APPROVED" || accountStatus.state === "OK") && (
              <ActiveTabunganCard 
                accountData={accountStatus.data} 
                onSetoran={handleSetoran}
                productName={formatProductName(activeProduct)}
              />
            )}
            
            {accountStatus.state === "REJECTED" && (
              <ProgramStatusCard
                title="Pengajuan Ditolak"
                message={`Pengajuan Tabungan ${formatProductName(activeProduct)} Anda tidak disetujui`}
                buttonText="Ajukan Ulang"
                onButtonClick={handlePengajuan}
                status="NG"
              />
            )}
          </div>
        </>
      )}

    </div>
  );
}