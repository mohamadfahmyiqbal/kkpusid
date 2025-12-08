// components/layout/Header.jsx

import React from "react";
// Import semua komponen Dropdown yang modular
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import KeranjangDropdown from "./KeranjangDropdown";
import SidebarToggleButton from "./SidebarToggleButton";
// Asumsi path impor ini benar.
import { jwtEncode } from "../../routes/helpers";
// Import useNavigate dari react-router-dom
import { useNavigate } from "react-router-dom";

// Catatan: DASHBOARD_PATH didefinisikan secara konstan di luar komponen.
const DASHBOARD_PATH = `/${jwtEncode({ page: "dashboard" })}`;

// Komponen Header menerima props (user, logout, handleToggleSidebar, isSidebarShown) dari DashboardLayout.jsx
const Header = ({ user, logout, handleToggleSidebar, isSidebarShown }) => {
  const navigate = useNavigate();

  // FUNGSI UNTUK MENANGANI KLIK LOGO
  const handleLogoClick = () => {
    // Arahkan ke URL dashboard yang sudah didefinisikan (menggunakan token)
    navigate(DASHBOARD_PATH);
  };

  return (
    <header className="topbar">
      <nav className="navbar top-navbar navbar-expand-md navbar-light">
        {/* 1. Logo (START) */}
        <div className="navbar-header">
          <div
            className="navbar-brand d-flex align-items-center"
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }}
          >
            <img
              src="/assets/icons/PUSlogo.png"
              alt="PUS Logo"
              style={{ height: "30px" }}
            />
          </div>
        </div>

        {/* 2. Navigasi dan Aksi (END) */}
        <div className="navbar-collapse d-flex justify-content-between">
          {/* Menu Hamburger Mobile (Hanya muncul di layar kecil) */}
          <ul className="navbar-nav mr-auto mt-md-0 ">
            <li className="nav-item d-md-none">
              <SidebarToggleButton
                sidebarShown={isSidebarShown}
                onClick={handleToggleSidebar}
              />
            </li>
          </ul>

          {/* Ikon Aksi Kanan Atas */}
          <ul className="navbar-nav my-lg-0 ml-auto">
            {/* Notifikasi (Komponen Modular) */}
            <NotificationDropdown user={user} />

            {/* Utilities/Aksi Tambahan (KeranjangDropdown) */}
            {/* Asumsi KeranjangDropdown juga menerima user prop */}
            <KeranjangDropdown user={user} />

            {/* Dropdown Profil Pengguna (Komponen Modular) */}
            <UserDropdown user={user} logout={logout} />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
