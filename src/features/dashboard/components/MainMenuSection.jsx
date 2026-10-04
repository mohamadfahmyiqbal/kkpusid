import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import {
  MdHistory,
  MdGroup,
  MdAccountBalance,
  MdBarChart,
  MdSchool,
  MdShoppingCart,
} from "react-icons/md";
import { FaWallet } from "react-icons/fa";

/**
 * Konfigurasi item menu dengan warna dan gradasi yang unik
 */
const MENU_ITEMS = [
  { 
    id: "simpanan", 
    label: "Simpanan", 
    icon: FaWallet, 
    pageKey: "simpananPage",
    gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)", // Emerald
    shadow: "rgba(16, 185, 129, 0.2)"
  },
  { 
    id: "program", 
    label: "Program", 
    icon: MdGroup, 
    pageKey: "programPage",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)", // Violet
    shadow: "rgba(139, 92, 246, 0.2)"
  },
  {
    id: "tabungan",
    label: "Tabungan",
    icon: MdAccountBalance,
    pageKey: "tabunganPage",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", // Amber
    shadow: "rgba(245, 158, 11, 0.2)"
  },
  {
    id: "investasi",
    label: "Investasi",
    icon: MdBarChart,
    pageKey: "investasiPage",
    gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", // Pink
    shadow: "rgba(236, 72, 153, 0.2)"
  },
  {
    id: "training",
    label: "Training",
    icon: MdSchool,
    pageKey: "trainingPage",
    gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)", // Cyan
    shadow: "rgba(6, 182, 212, 0.2)"
  },
  {
    id: "jual-beli",
    label: "Jual Beli",
    icon: MdShoppingCart,
    pageKey: "jualBeliPage",
    gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)", // Orange
    shadow: "rgba(249, 115, 22, 0.2)"
  },
  {
    id: "transaksi",
    label: "Riwayat",
    icon: MdHistory,
    pageKey: "billingPage",
    gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", // Blue
    shadow: "rgba(59, 130, 246, 0.2)"
  },
];

const MainMenuSection = React.memo(({ isALB, isCandidate }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (pageKey) => {
      if (!pageKey || isCandidate) return;
      const token = jwtEncode({ page: pageKey });
      navigate(`/${token}`);
    },
    [navigate, isCandidate],
  );

  const filteredMenu = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Filter untuk Anggota Luar Biasa (ALB)
      if (isALB) {
        return !["transaksi", "program", "investasi"].includes(item.id);
      }
      return true;
    });
  }, [isALB]);

  return (
    <section className="mb-4 dc-main-menu-section animate-fade-in">
      <div className="d-flex align-items-center justify-content-between mb-3 px-1">
        <h5 className="fw-bold mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
          Menu Utama
        </h5>
      </div>

      <div className="dc-menu-grid">
        {filteredMenu.map((item) => {
          const Icon = item.icon;
          return (
            <button
              type="button"
              key={item.id}
              className={`dc-menu-item ${isCandidate ? "is-disabled" : ""}`}
              onClick={() => handleNavigation(item.pageKey)}
              disabled={isCandidate}
              aria-label={`Buka menu ${item.label}`}
            >
              <div 
                className="dc-menu-icon-wrapper"
                style={{ 
                  background: item.gradient,
                  boxShadow: `0 8px 16px ${item.shadow}`
                }}
              >
                <Icon size={24} />
              </div>
              <span className="dc-menu-label">{item.label}</span>
            </button>
          );
        })}
      </div>

    </section>
  );
});

export default MainMenuSection;
