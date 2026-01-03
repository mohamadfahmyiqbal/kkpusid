import React, { useState, useCallback } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SkeletonContent from "./SkeletonContent"; // <-- Import Skeleton

const DashboardLayout = ({ children }) => {
  const { userData, loading, error, logout } = useProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handler untuk toggle sidebar (Mobile & Desktop Mini)
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

  // Class dinamis untuk pembungkus utama
  const wrapperClass = `fix-header card-no-border fix-sidebar ${
    isSidebarOpen ? "mini-sidebar" : ""
  }`;

  return (
    <div id="main-wrapper" className={wrapperClass}>
      {/* HEADER & SIDEBAR tetap di-render meski loading. 
          Jika userData belum ada, komponen Header/Sidebar akan 
          menangani tampilan default (nama guest/foto default).
      */}
      <Header
        user={userData}
        logout={logout}
        handleToggleSidebar={handleToggleSidebar}
        isSidebarShown={isSidebarOpen}
      />

      <Sidebar user={userData} />

      <div className="page-wrapper">
        <div className="container-fluid pt-4">
          {/* LOGIKA KONDISIONAL ISI KONTEN */}
          {loading ? (
            // Tampilan 1: Saat data profil sedang di-fetch
            <SkeletonContent />
          ) : error || !userData ? (
            // Tampilan 2: Jika terjadi error atau sesi habis
            <div className="py-5 text-center">
              <div
                className="card shadow-sm border-0 p-4 mx-auto"
                style={{ maxWidth: "400px" }}
              >
                <i className="fa fa-exclamation-triangle text-danger fa-3x mb-3"></i>
                <h4 className="text-danger">Akses Terbatas</h4>
                <p className="text-muted">
                  {error || "Sesi Anda telah berakhir. Silakan login kembali."}
                </p>
                <button
                  className="btn btn-primary w-100 mt-3 fw-bold"
                  onClick={logout}
                >
                  Kembali ke Login
                </button>
              </div>
            </div>
          ) : (
            // Tampilan 3: Konten asli halaman (Dashboard/Simpanan/dll)
            children
          )}
        </div>

        {/* Footer selalu di bawah */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
