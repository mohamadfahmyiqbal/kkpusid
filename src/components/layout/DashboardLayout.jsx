// src/components/layout/DashboardLayout.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { useNavigate } from "react-router-dom"; // Tambahkan navigasi
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SkeletonContent from "./SkeletonContent";
import NotificationPrompt from "../ui/NotificationPrompt";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const { userData, loading, error, logout } = useProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync class body dengan state sidebar menggunakan useEffect
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("show-sidebar");
    } else {
      document.body.classList.remove("show-sidebar");
    }

    // CLEANUP: Hapus class saat komponen di-unmount
    return () => {
      document.body.classList.remove("show-sidebar");
    };
  }, [isSidebarOpen]);

  // FIX: Wrapper logout untuk memastikan navigasi ke halaman login
  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  // Handler untuk toggle sidebar
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Class dinamis untuk pembungkus utama
  const wrapperClass = `fix-header card-no-border fix-sidebar ${
    isSidebarOpen ? "mini-sidebar" : ""
  }`;

  return (
    <div id="main-wrapper" className={wrapperClass}>
      <Header
        user={userData}
        logout={handleLogout} // Gunakan handler baru
        handleToggleSidebar={handleToggleSidebar}
        isSidebarShown={isSidebarOpen}
      />

      <Sidebar user={userData} />

      <div className="page-wrapper">
        <div className="container-fluid pt-4">
          {loading ? (
            <SkeletonContent />
          ) : error || !userData ? (
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
                  onClick={handleLogout} // Gunakan handler baru
                >
                  Kembali ke Login
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* KONTEN HALAMAN UTAMA */}
              {children}

              {/* PROMPT NOTIFIKASI 
                  FIX: Memastikan ID yang dikirim valid (bisa member_id atau registration_id)
              */}
              <NotificationPrompt
                memberId={
                  userData.member_id || userData.registration_id || userData.id
                }
              />
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
