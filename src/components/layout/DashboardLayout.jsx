// src/components/layout/DashboardLayout.jsx

import React, { useState, useCallback } from "react";
// ✅ Import useProfile untuk mengonsumsi data dari ProfileContext
import { useProfile } from "../../contexts/ProfileContext";
// Import komponen layout
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

// Catatan: DashboardLayout kini adalah CONSUMER data profil.

const DashboardLayout = ({ children }) => {
  // ✅ Panggil useProfile untuk mendapatkan state dari ProfileContext
  const { userData, loading, error, logout, refetchProfile } = useProfile();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handler untuk toggle sidebar (logika Mini-Sidebar/Mobile View)
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;

      // Mengontrol class BODY untuk Mobile View
      if (newState) {
        document.body.classList.add("show-sidebar");
      } else {
        document.body.classList.remove("show-sidebar");
      }
      return newState;
    });
  }, []);

  // ------------------------------------------------------------------
  // --- Penanganan Global Loading dan Error ---
  // ------------------------------------------------------------------

  // 1. Tampilkan Loading State
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Memuat...</span>
        </div>
      </div>
    );
  }

  // 2. Tampilkan Error atau Data Tidak Ada (Akses Ditolak)
  if (error || !userData) {
    return (
      <div className="container-fluid py-5 text-center text-danger">
        <h3>{error || "Akses ditolak. Silakan login kembali."}</h3>
        <button className="btn btn-danger mt-3" onClick={logout}>
          Login Ulang
        </button>
      </div>
    );
  }

  // Kelas wrapper: 'mini-sidebar' hanya untuk efek desktop
  const wrapperClass = `fix-header card-no-border fix-sidebar ${
    isSidebarOpen ? "mini-sidebar" : ""
  }`;

  // ------------------------------------------------------------------
  // --- Render Layout Utama ---
  // ------------------------------------------------------------------

  return (
    // WRAPPER UTAMA
    <div id="main-wrapper" className={wrapperClass}>
      {/* 1. Header (Top Bar) - Meneruskan userData dan logout dari context */}
      <Header
        user={userData}
        logout={logout}
        handleToggleSidebar={handleToggleSidebar}
        isSidebarShown={isSidebarOpen}
      />

      {/* 2. Sidebar - Meneruskan userData dari context */}
      <Sidebar user={userData} />

      {/* 3. Main Content Wrapper */}
      <div className="page-wrapper">
        <div className="container-fluid">
          {/* Anak-anak DashboardLayout (DashboardPage, dll.) dirender di sini */}
          {children}
        </div>

        {/* 4. Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
