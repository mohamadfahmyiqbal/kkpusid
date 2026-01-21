import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
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

const MainMenuSection = React.memo(({ isManagement, isALB, isReguler }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (pageKey) => {
      if (!pageKey) return;
      const token = jwtEncode({ page: pageKey });
      navigate(`/${token}`);
    },
    [navigate]
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
          <div
            key={item.id}
            className="flex-shrink-0 me-2"
            style={{
              width: isALB ? "20%" : "16.666%",
              cursor: "pointer",
            }}
            onClick={() => handleNavigation(item.pageKey)}
          >
            <div className="d-flex flex-column align-items-center">
              <div
                className="d-flex align-items-center justify-content-center bg-blueGrad text-white shadow-sm mb-1"
                style={{
                  width: "55px",
                  height: "55px",
                  borderRadius: "10px",
                }}
              >
                <Icon style={{ fontSize: "1.8rem" }} />
              </div>
              <p className="mb-0 text-dark" style={{ fontSize: "0.75rem" }}>
                {item.label}
              </p>
            </div>
          </div>
        );
      });
  }, [handleNavigation, isALB]);

  return (
    <div className="mb-4">
      <h5 className="mb-3 ps-3 fw-bold">Menu Utama</h5>
      <div
        className="d-flex flex-nowrap overflow-x-auto text-center pb-2 ps-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {renderedMenu}
        <div className="flex-shrink-0 pe-3" style={{ width: "0" }}></div>
      </div>
    </div>
  );
});

export default MainMenuSection;
