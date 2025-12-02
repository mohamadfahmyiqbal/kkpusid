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
// Ini menghasilkan string token: /eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJwYWdlIjoiZGFzaGJvYXJkIn0.
const DASHBOARD_PATH = `/${jwtEncode({ page: "dashboard" })}`;

// Komponen Header menerima props (user, logout, handleToggleSidebar, isSidebarShown) dari DashboardLayout.jsx
const Header = ({ user, logout, handleToggleSidebar, isSidebarShown }) => {
  const navigate = useNavigate();

  // ❌ Hapus baris-baris ini karena navigasi tidak boleh terjadi di body komponen saat render:
  // const dashboardToken = jwtEncode({ page: "dashboard" });
  // navigate(DASHBOARD_PATH, { replace: true });

  // ✅ FUNGSI BARU: Fungsi untuk menangani klik logo
  const handleLogoClick = () => {
    // Arahkan ke URL dashboard yang sudah didefinisikan (menggunakan token)
    navigate(DASHBOARD_PATH);
  };

  // Catatan: Variabel dashboardUrl dan logika lama (href) tidak lagi diperlukan.
  // Anda dapat menghapusnya jika tidak digunakan di tempat lain.
  // const dashboardUrl = `/?token=${dashboardToken}`;

  return (
    // Latar Belakang Biru Gradien (menggunakan class 'bg-info')
    <header className="topbar bg-info">
      {/* Navbar: d-flex justify-content-between untuk memisahkan Logo dan Aksi */}
      <nav className="navbar top-navbar navbar-expand-md navbar-dark d-flex justify-content-between">
        {/* 1. Logo PUS (START) */}
        <div className="navbar-header px-3">
          {/* ✅ PERUBAHAN: Ganti <a> menjadi <div> (atau elemen lain) dan tambahkan onClick */}
          <div
            className="navbar-brand cursor-pointer" // Tambahkan kelas kustom jika perlu, dan atur kursor
            onClick={handleLogoClick}
            style={{ cursor: "pointer" }} // Opsional: Berikan visual klik
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
                // ✅ PERBAIKAN: Menggunakan prop 'isSidebarShown'
                sidebarShown={isSidebarShown}
                onClick={handleToggleSidebar}
              />
            </li>
          </ul>

          {/* Ikon Aksi Kanan Atas (ml-auto memastikan ikon di ujung kanan) */}
          <ul className="navbar-nav my-lg-0 ml-auto">
            {/* Notifikasi (Komponen Modular) */}
            <NotificationDropdown user={user} />

            {/* Utilities/Aksi Tambahan (KeranjangDropdown) */}
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
