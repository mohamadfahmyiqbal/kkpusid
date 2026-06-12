// src/components/layout/components/LayoutGlobal.jsx
import React, { useCallback, lazy, Suspense } from "react";
import { useProfile } from "../contexts";
import { useKeyboardShortcuts } from "../../../hooks/useKeyboardShortcuts";
import { useNavigate, useLocation } from "react-router-dom";
import { useLayoutState } from "../../../hooks/useLayoutState";
import { usePageConfig } from "../../../hooks/usePageConfig";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import EnhancedErrorBoundary from "../../ui/EnhancedErrorBoundary";
import { DashboardSkeleton } from "../../ui/AdvancedSkeleton";
import PageTitle from "./PageTitle";
import { CSS_CLASSES, ACCESSIBILITY_LABELS } from "../../../constants/layout";
import { jwtEncode } from "../../../utils/helpers";

// Lazy load NotificationPrompt untuk mengurangi bundle size initial
const NotificationPrompt = lazy(() => import("../../ui/NotificationPrompt"));

const PAGE_TITLES = {
  dashboard: "Dashboard",
  notificationPage: "Notifikasi",
  notificationDetailPage: "Detail Notifikasi",
  billingPage: "Setoran Simpanan",
  invoicePage: "Invoice",
  accountPage: "Profil Saya",
  transactionDetailPage: "Detail Jual Beli",
  registrationPage: "Pendaftaran",
  registrationFormDetail: "Formulir Pendaftaran",
  simpananPage: "Simpanan",
  penarikanSimpananPage: "Penarikan Simpanan",
  jualBeliPage: "Jual Beli",
  formPengajuanTransaksi: "Pengajuan Jual Beli",
  investasiPage: "Investasi",
  trainingPage: "Training",
  tabunganPage: "Tabungan",
  programPage: "Program",
};

const LayoutGlobal = ({ children, pageName: propPageName, title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, loading, error, logout } = useProfile();

  const {
    isSidebarOpen,
    isDesktop,
    isTransitioning,
    handleToggleSidebar,
    handleCloseSidebar,
  } = useLayoutState();

  const { pageConfig, showPageNavigation } = usePageConfig(propPageName, title);

  const effectiveSidebarOpen = isDesktop || isSidebarOpen;

  const wrapperClass = `dashboard-layout-shell fix-header card-no-border${
    effectiveSidebarOpen ? " show-sidebar fix-sidebar" : ""
  }${isTransitioning ? " sidebar-transitioning" : ""}`;

  const memberId =
    userData?.member_id || userData?.registration_id || userData?.id;

  // Handlers
  const handleLogout = useCallback(() => {
    logout();
    navigate("/", { replace: true });
  }, [logout, navigate]);

  const handleBack = useCallback(() => {
    try {
      if (window.history.length > 1 && location.key !== "default") {
        navigate(-1);
      } else {
        navigate(`/${jwtEncode({ page: "dashboard" })}`);
      }
    } catch (error) {
      console.error("Navigation error:", error);
      navigate(`/${jwtEncode({ page: "dashboard" })}`);
    }
  }, [location.key, navigate]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToggleSidebar: handleToggleSidebar,
    onLogout: handleLogout,
  });

  return (
    <div id="main-wrapper" className={wrapperClass}>
      <Header
        user={userData}
        logout={handleLogout}
        handleToggleSidebar={handleToggleSidebar}
        isSidebarShown={isSidebarOpen}
        isDesktop={isDesktop}
      />

      <Sidebar
        user={userData}
        onNavigate={handleCloseSidebar}
        onClose={handleCloseSidebar}
        isDesktop={isDesktop}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Backdrop Mobile */}
      {!isDesktop && isSidebarOpen && (
        <div
          className={`${CSS_CLASSES.SIDEBAR_BACKDROP} ${CSS_CLASSES.SIDEBAR_OPEN} ${isTransitioning ? "backdrop-transitioning" : ""}`}
          onClick={handleCloseSidebar}
          aria-label={ACCESSIBILITY_LABELS.SIDEBAR_BACKDROP}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCloseSidebar();
            }
          }}
        />
      )}

      <div
        className="page-wrapper dashboard-page-wrapper d-flex flex-column"
        style={{
          paddingTop: isDesktop ? "112px" : "64px",
          marginLeft: "0px",
          transition: "padding-top 0.3s ease",
        }}
      >
        <main
          className={`container-fluid flex-grow-1 fade-in px-2 px-md-3 ${isTransitioning ? "page-transitioning" : ""}`}
          role="main"
          aria-label={ACCESSIBILITY_LABELS.MAIN_CONTENT}
        >
          {showPageNavigation && (
            <PageTitle
              title={pageConfig.title}
              subtitle={pageConfig.subtitle}
              icon={pageConfig.icon}
              breadcrumbs={pageConfig.breadcrumbs}
              customBackAction={handleBack}
              aria-label={ACCESSIBILITY_LABELS.PAGE_NAVIGATION}
            />
          )}

          {loading ? (
            <DashboardSkeleton />
          ) : error || !userData ? (
            <div className="py-5 text-center">
              <div className="error-access-card animate-error-shake">
                <div className="error-icon-wrapper mb-3">
                  <i className="fa fa-exclamation-triangle text-danger fa-3x animate-pulse"></i>
                </div>
                <h4 className="text-danger mb-3">Akses Terbatas</h4>
                <p className="text-muted mb-4">
                  {error || "Sesi Anda telah berakhir. Silakan login kembali."}
                </p>
                <button
                  className="btn btn-primary w-100 mt-3 fw-bold btn-hover-lift"
                  onClick={handleLogout}
                  disabled={isTransitioning}
                >
                  {isTransitioning ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Memproses...
                    </>
                  ) : (
                    "Kembali ke Beranda"
                  )}
                </button>
              </div>
            </div>
          ) : (
            <EnhancedErrorBoundary>
              {children}
              <Suspense fallback={null}>
                <NotificationPrompt memberId={memberId} />
              </Suspense>
            </EnhancedErrorBoundary>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutGlobal;
