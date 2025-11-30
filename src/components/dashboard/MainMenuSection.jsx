// components/dashboard/MainMenuSection.jsx

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

// Import ikon dari React Icons
import {
  FaCoins,
  FaExchangeAlt,
  FaTasks,
  FaPiggyBank,
  FaChartLine,
  FaChalkboardTeacher,
  FaFileInvoiceDollar,
  FaLaptop,
  FaHandsHelping,
} from "react-icons/fa";

// --- Data Menu ---
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
  {
    id: 7,
    label: "Pengajuan",
    IconComponent: FaFileInvoiceDollar,
    pageKey: "pengajuanPage",
  },
  {
    id: 8,
    label: "E-Learning",
    IconComponent: FaLaptop,
    pageKey: "elearningPage",
  },
  {
    id: 9,
    label: "Bantuan",
    IconComponent: FaHandsHelping,
    pageKey: "bantuanPage",
  },
];

const MainMenuSection = () => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (pageKey) => {
      if (pageKey) {
        const token = jwtEncode({ page: pageKey });
        navigate(`/${token}`);
      } else {
        console.warn(`Page key untuk menu tidak ditemukan.`);
      }
    },
    [navigate]
  );

  return (
    <div className="mb-4">
      {/* Judul */}
      <h5 className="mb-3 ps-3">Menu Utama</h5>

      {/* Wrapper Flex (horizontal scroll) */}
      <div
        className="d-flex flex-nowrap overflow-x-auto text-center pb-2 ps-3"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {menuItems.map((item) => {
          const Icon = item.IconComponent;

          return (
            <div
              key={item.id}
              className="flex-shrink-0 me-2"
              style={{
                width: "16.666%", // 6 item muat 1 layar
                cursor: "pointer",
              }}
              onClick={() => handleNavigation(item.pageKey)}
            >
              <div className="d-flex flex-column align-items-center">
                {/* Icon container */}
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

                {/* Label */}
                <p className="mb-0 text-dark" style={{ fontSize: "0.75rem" }}>
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}

        {/* padding kanan opsional */}
        <div className="flex-shrink-0 pe-3" style={{ width: "0" }}></div>
      </div>
    </div>
  );
};

export default MainMenuSection;
