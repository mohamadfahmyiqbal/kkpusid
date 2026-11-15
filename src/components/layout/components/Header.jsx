import React, { memo, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import ErrorBoundary from "../../ui/ErrorBoundary";
import SkeletonLoader from "../ui/SkeletonLoader";
import { ACCESSIBILITY_LABELS } from "../../../constants/layout";
import SidebarToggleButton from "../ui/SidebarToggleButton";
import "./LayoutStyles.css";

const NotificationDropdown = lazy(
  () => import("../dropdowns/NotificationDropdown"),
);
const KeranjangDropdown = lazy(
  () => import("../dropdowns/KeranjangDropdown"),
);
const UserDropdown = lazy(() => import("../dropdowns/UserDropdown"));

const Header = memo(
  ({ user = null, logout, handleToggleSidebar, isSidebarShown, isDesktop }) => {
    
    // Pre-encode the target URL for the dashboard
    const dashboardUrl = `/${jwtEncode({ page: "dashboard" })}`;

    return (
      <header
        className="topbar fixed-header header-gradient-bg"
        role="banner"
      >
        {/* Starry Sky effect */}
        <div className="header-stars-bg" />

        <div className="header-masjid-overlay" />

        <nav
          className="navbar top-navbar navbar-expand-md navbar-dark px-3 h-100"
          role="navigation"
          aria-label="Main navigation"
          style={{ position: "relative", zIndex: 5 }}
        >
          {/* LEFT: TOGGLE & BRAND LOGO */}
          <div className="navbar-header d-flex align-items-center gap-3">
            {!isDesktop && (
              <SidebarToggleButton
                sidebarShown={isSidebarShown}
                onClick={handleToggleSidebar}
                controlsId="app-sidebar"
              />
            )}
            
            <Link
              to={dashboardUrl}
              className="navbar-brand d-flex align-items-center btn btn-link p-0 border-0 text-decoration-none"
              aria-label={ACCESSIBILITY_LABELS.GO_TO_DASHBOARD}
              title="Kembali ke Dashboard"
            >
              <img
                src="/assets/icons/PUSlogo.png"
                alt="Logo PUS"
                style={{ height: "36px" }}
                loading="eager"
              />
              <div className="d-none d-sm-flex flex-column ms-2 text-start" style={{ lineHeight: 1.1 }}>
                <span className="text-white fw-bold" style={{ fontSize: 13.5, letterSpacing: "0.2px" }}>
                  Paguyuban Usaha
                </span>
                <span style={{ fontSize: 13.5, color: "#00d9a6", fontWeight: 700 }}>
                  Sukses
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT: NOTIFICATIONS, BILLING & USER DROP DOWN */}
          <div className="d-flex justify-content-end align-items-center gap-2 gap-sm-3 ms-auto" style={{ zIndex: 10 }}>
            <ul className="d-flex align-items-center flex-row list-unstyled mb-0 gap-2 gap-sm-3">
              <Suspense fallback={<SkeletonLoader size="small" />}>
                <ErrorBoundary>
                  <NotificationDropdown />
                </ErrorBoundary>
              </Suspense>

              <Suspense fallback={<SkeletonLoader size="small" />}>
                <ErrorBoundary>
                  <KeranjangDropdown />
                </ErrorBoundary>
              </Suspense>

              <li className="d-none d-sm-block">
                <div
                  style={{
                    width: 1,
                    height: 24,
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
              </li>

              <Suspense fallback={<SkeletonLoader size="medium" />}>
                <ErrorBoundary>
                  <UserDropdown user={user} logout={logout} />
                </ErrorBoundary>
              </Suspense>
            </ul>
          </div>
        </nav>
      </header>
    );
  },
);

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
  isSidebarShown: PropTypes.bool.isRequired,
  isDesktop: PropTypes.bool.isRequired,
};

export default Header;
