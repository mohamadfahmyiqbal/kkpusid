// src/components/layout/DashboardLayout.jsx
import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { useProfile } from "../contexts";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import SkeletonContent from "../ui/SkeletonContent";
import NotificationPrompt from "../ui/NotificationPrompt";
import ErrorBoundary from "../ui/ErrorBoundary";
import PageTitle from "./PageTitle";
import { CSS_CLASSES } from "../../../constants/layout";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";

const PAGE_TITLES = {
  dashboard: "Dashboard",
  notificationPage: "Notifikasi",
  notificationDetailPage: "Detail Notifikasi",
  billingPage: "Setoran Simpanan",
  invoicePage: "Invoice",
  accountPage: "Profil Anggota",
  transactionDetailPage: "Detail Transaksi",
  registrationPage: "Pendaftaran",
  registrationFormDetail: "Formulir Pendaftaran",
  simpananPage: "Simpanan",
  penarikanSimpananPage: "Penarikan Simpanan",
  transaksiPage: "Transaksi",
  formPengajuanTransaksi: "Pengajuan Transaksi",
  investasiPage: "Investasi",
  trainingPage: "Training",
  tabunganPage: "Tabungan",
  programPage: "Program",
};

const prettifyPageName = (pageName = "") =>
  pageName
    .replace(/Page$/i, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

const LayoutGlobal = ({ children, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useParams();
  const { userData, loading, error, logout } = useProfile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const bodyClassRef = useRef(CSS_CLASSES.SIDEBAR_BODY_CLASS);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveSidebarOpen = isDesktop || isSidebarOpen;

  const decodedToken = useMemo(() => jwtDecodePage(token), [token]);
  const currentPage = decodedToken?.page || "";
  const showPageNavigation = currentPage !== "dashboard";

  const currentPageTitle = useMemo(() => {
    if (title) return title;
    let baseTitle = PAGE_TITLES[currentPage] || prettifyPageName(currentPage);

    // Untuk halaman global seperti billingPage, sesuaikan title berdasarkan halaman yang mengakses
    if (currentPage === "billingPage") {
      const returnPage = decodedToken?.return;
      if (!returnPage) {
        baseTitle = "Daftar Tagihan";
      } else if (returnPage === "simpananPage") {
        baseTitle = "Setoran Simpanan";
      } else if (returnPage === "transaksiPage") {
        baseTitle = "Setoran Transaksi";
      } // Tambahkan kondisi lain jika diperlukan
    }

    const displayName = decodedToken?.displayName;
    return displayName ? `${baseTitle} - ${displayName}` : baseTitle;
  }, [currentPage, title, decodedToken]);

  useEffect(() => {
    const bodyClass = bodyClassRef.current;

    if (effectiveSidebarOpen) {
      document.body.classList.add(bodyClass);
    } else {
      document.body.classList.remove(bodyClass);
    }

    // CLEANUP: Hapus class saat komponen di-unmount
    return () => {
      document.body.classList.remove(bodyClass);
    };
  }, [effectiveSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const handleToggleCollapse = useCallback(() => {
    if (!isDesktop) {
      setIsCollapsed((prev) => !prev);
    }
  }, [isDesktop]);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleBack = useCallback(() => {
    if (window.history.length > 1 && location.key !== "default") {
      navigate(-1);
      return;
    }

    navigate(`/${jwtEncode({ page: "dashboard" })}`);
  }, [location.key, navigate]);

  const wrapperClass = `dashboard-layout-shell fix-header card-no-border fix-sidebar${
    effectiveSidebarOpen ? " show-sidebar" : ""
  }${isCollapsed ? " sidebar-collapsed" : ""}`;

  return (
    <div id="main-wrapper" className={wrapperClass}>
      <Header
        user={userData}
        logout={handleLogout} // Gunakan handler baru
        handleToggleSidebar={handleToggleSidebar}
        isSidebarShown={effectiveSidebarOpen}
        isCollapsed={isCollapsed}
        handleToggleCollapse={handleToggleCollapse}
        isDesktop={isDesktop}
      />

      <Sidebar
        onNavigate={handleCloseSidebar}
        onClose={handleCloseSidebar}
        isDesktop={isDesktop}
      />
      <button
        type="button"
        className={`${CSS_CLASSES.SIDEBAR_BACKDROP} ${effectiveSidebarOpen && !isDesktop ? CSS_CLASSES.SIDEBAR_OPEN : ""}`}
        onClick={handleCloseSidebar}
        aria-label="Close sidebar"
        aria-hidden={!effectiveSidebarOpen || isDesktop}
        tabIndex={effectiveSidebarOpen && !isDesktop ? 0 : -1}
      />

      <div className="page-wrapper dashboard-page-wrapper d-flex flex-column">
        <main
          className="container-fluid pt-4 pb-4 flex-grow-1 fade-in"
          role="main"
        >
          {showPageNavigation && (
            <PageTitle
              title={currentPageTitle}
              breadcrumbs={[
                {
                  label: "Dashboard",
                  path: `/${jwtEncode({ page: "dashboard" })}`,
                },
                { label: currentPageTitle },
              ]}
              customBackAction={handleBack}
            />
          )}

          {loading ? (
            <SkeletonContent />
          ) : error || !userData ? (
            <ErrorBoundary>
              <div className="py-5 text-center">
                <div className="error-access-card">
                  <i className="fa fa-exclamation-triangle text-danger fa-3x mb-3"></i>
                  <h4 className="text-danger">Akses Terbatas</h4>
                  <p className="text-muted">
                    {error ||
                      "Sesi Anda telah berakhir. Silakan login kembali."}
                  </p>
                  <button
                    className="btn btn-primary w-100 mt-3 fw-bold"
                    onClick={handleLogout}
                  >
                    Kembali ke Login
                  </button>
                </div>
              </div>
            </ErrorBoundary>
          ) : (
            <ErrorBoundary>
              {children}

              <NotificationPrompt
                memberId={
                  userData.member_id || userData.registration_id || userData.id
                }
              />
            </ErrorBoundary>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default LayoutGlobal;
