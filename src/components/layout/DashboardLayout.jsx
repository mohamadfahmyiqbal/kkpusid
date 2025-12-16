// src/components/layout/DashboardLayout.jsx
import React, { useState, useCallback } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const DashboardLayout = ({ children }) => {
  const { userData, loading, error, logout } = useProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => {
      const newState = !prev;
      if (newState) {
        document.body.classList.add("show-sidebar");
      } else {
        document.body.classList.remove("show-sidebar");
      }
      return newState;
    });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Jika tidak ada userData setelah loading selesai, arahkan kembali ke login
  if (error || !userData) {
    return (
      <div className="container-fluid py-5 text-center text-danger">
        <h3>Akses Dibatasi</h3>
        <p>{error || "Silakan login kembali untuk mengakses halaman ini."}</p>
        <button className="btn btn-danger mt-3" onClick={logout}>
          Kembali ke Login
        </button>
      </div>
    );
  }

  const wrapperClass = `fix-header card-no-border fix-sidebar ${
    isSidebarOpen ? "mini-sidebar" : ""
  }`;

  return (
    <div id="main-wrapper" className={wrapperClass}>
      <Header
        user={userData}
        logout={logout}
        handleToggleSidebar={handleToggleSidebar}
        isSidebarShown={isSidebarOpen}
      />

      {/* Teruskan userData ke Sidebar untuk logika menu berdasarkan role/status */}
      <Sidebar user={userData} />

      <div className="page-wrapper">
        <div className="container-fluid">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
