// src/components/layout/DashboardLayout.jsx
import React, { useState, useCallback, useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SkeletonContent from "./SkeletonContent";
import NotificationPrompt from "../ui/NotificationPrompt";

const DashboardLayout = ({ children }) => {
  const { userData, loading, error, logout } = useProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync class body dengan state sidebar menggunakan useEffect
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("show-sidebar");
    } else {
      document.body.classList.remove("show-sidebar");
    }

    // CLEANUP: Hapus class saat komponen di-unmount agar tidak merusak halaman lain
    return () => {
      document.body.classList.remove("show-sidebar");
    };
  }, [isSidebarOpen]);

  // Handler untuk toggle sidebar (Mobile & Desktop Mini)
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
        logout={logout}
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
                  onClick={logout}
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
                  Hanya dipicu jika data user sudah siap.
                  Prompt ini akan menangani pengecekan izin browser secara otomatis.
              */}
              <NotificationPrompt memberId={userData.member_id} />
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
