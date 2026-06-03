// pages/tabungan/TabunganPage.jsx

import React, { useState, useCallback, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdSavings, MdAccountBalanceWallet, MdSchool, MdPets } from "react-icons/md";
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
    navigateTo(navigate, "setoranTabungan", activeProduct);
  }, [navigate, activeProduct]);

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
              <ProgramStatusCard
                title="Rekening Aktif"
                message={`Tabungan ${formatProductName(activeProduct)}`}
                buttonText="Setoran"
                onButtonClick={handleSetoran}
                status="OK"
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