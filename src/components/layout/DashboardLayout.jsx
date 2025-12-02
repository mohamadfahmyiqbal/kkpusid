// components/layout/DashboardLayout.jsx (Perbaikan untuk Mobile Sidebar)

import React, { useState, useCallback } from "react";
// Import komponen layout
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const DashboardLayout = ({ children }) => {
  // State isSidebarOpen: Digunakan untuk toggle status (mini-sidebar di desktop & show/hide di mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handler untuk toggle sidebar
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;

      // 🎯 FIX PENTING: Mengontrol class BODY untuk Mobile View
      // Class 'show-sidebar' di BODY yang memunculkan overlay/geser sidebar di mobile.
      if (newState) {
        document.body.classList.add("show-sidebar");
      } else {
        document.body.classList.remove("show-sidebar");
      }

      return newState;
    });
  }, []);

  // --- Data Dummy (Dibiarkan sama) ---
  const mockUser = {
    nama: "Avhan Hadi",
    email: "avhan.hadi@pus.com",
    foto: "../assets/images/users/1.jpg",
    role: 1,
    no_anggota: "PUS-007",
  };
  const mockLogout = () => console.log("Logout triggered.");
  // -----------------------------------

  // Kelas wrapper: 'mini-sidebar' hanya untuk efek desktop
  const wrapperClass = `fix-header card-no-border fix-sidebar ${
    isSidebarOpen ? "mini-sidebar" : ""
  }`;

  return (
    // WRAPPER UTAMA
    <div id="main-wrapper" className={wrapperClass}>
      {/* 1. Header (Top Bar) */}
      <Header
        user={mockUser}
        logout={mockLogout}
        handleToggleSidebar={handleToggleSidebar}
        isSidebarShown={isSidebarOpen}
      />

      {/* 2. Left Sidebar */}
      <Sidebar user={mockUser} />

      {/* 3. Page wrapper */}
      <div className="page-wrapper">
        <div className="container-fluid">{children}</div>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
