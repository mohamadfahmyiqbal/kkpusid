import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import {
  FaCoins,
  FaExchangeAlt,
  FaTasks,
  FaPiggyBank,
  FaChartLine,
  FaChalkboardTeacher,
} from "react-icons/fa";

const menuItems = [
  { id: 1, label: "Simpanan", IconComponent: FaCoins, pageKey: "simpananPage" },
  {
    id: 2,
    label: "Transaksi",
    IconComponent: FaExchangeAlt,
    pageKey: "transaksiPage",
  },
  { id: 3, label: "Program", IconComponent: FaTasks, pageKey: "programPage" },
  {
    id: 4,
    label: "Tabungan",
    IconComponent: FaPiggyBank,
    pageKey: "tabunganPage",
  },
  {
    id: 5,
    label: "Investasi",
    IconComponent: FaChartLine,
    pageKey: "investasiPage",
  },
  {
    id: 6,
    label: "Training",
    IconComponent: FaChalkboardTeacher,
    pageKey: "trainingPage",
  },
];

const MainMenuSection = React.memo(({ isALB }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (pageKey) => {
      if (!pageKey) return;
      const token = jwtEncode({ page: pageKey });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const renderedMenu = useMemo(() => {
    return menuItems
      .filter((item) => {
        if (isALB && item.pageKey === "investasiPage") return false;
        return true;
      })
      .map((item) => {
        const Icon = item.IconComponent;
        return (
          <button
            type="button"
            key={item.id}
            className={`dashboard-menu-button ${isALB ? "is-alb" : ""}`}
            aria-label={`Buka menu ${item.label}`}
            onClick={() => handleNavigation(item.pageKey)}
          >
            <span className="dashboard-menu-icon bg-blueGrad text-white shadow-sm">
              <Icon className="dashboard-menu-icon-svg" />
            </span>
            <span className="dashboard-menu-label">{item.label}</span>
          </button>
        );
      });
  }, [handleNavigation, isALB]);

  return (
    <section className="mb-4 dashboard-section">
      <h5 className="mb-3 ps-3 fw-bold dashboard-section-title">Menu Utama</h5>
      <div className="dashboard-menu-track dashboard-scroll-strip">
        {renderedMenu}
      </div>
    </section>
  );
});

export default MainMenuSection;
