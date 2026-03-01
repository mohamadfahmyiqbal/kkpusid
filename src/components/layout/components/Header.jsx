import React, { useCallback, memo, Suspense, lazy } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import ErrorBoundary from "../ui/ErrorBoundary";
import { ACCESSIBILITY_LABELS, IMAGE_SIZES } from "../../../constants/layout";
import SidebarToggleButton from "../ui/SidebarToggleButton";

const NotificationDropdown = lazy(
  () => import("../dropdowns/NotificationDropdown"),
);
const UserDropdown = lazy(() => import("../dropdowns/UserDropdown"));
const KeranjangDropdown = lazy(() => import("../dropdowns/KeranjangDropdown"));

const Header = memo(
  ({
    user,
    logout,
    handleToggleSidebar,
    isSidebarShown,
    isCollapsed,
    handleToggleCollapse,
    isDesktop,
  }) => {
    const { navigateTo } = useNavigation();

    const handleLogoClick = useCallback(() => {
      navigateTo("dashboard");
    }, [navigateTo]);

    return (
      <header className="topbar" role="banner">
        <nav
          className="navbar top-navbar navbar-expand-md navbar-light"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="navbar-header d-flex align-items-center">
            <button
              type="button"
              className="navbar-brand d-flex align-items-center btn btn-link p-0 border-0 me-2"
              onClick={handleLogoClick}
              aria-label={ACCESSIBILITY_LABELS.GO_TO_DASHBOARD}
              title="Kembali ke Dashboard"
            >
              <img
                src="/assets/icons/PUSlogo.png"
                alt="PUS Logo"
                style={{ height: `${IMAGE_SIZES.LOGO_HEIGHT}px` }}
                loading="eager"
              />
            </button>
          </div>

          {/* Mobile Toggle Button - loaded eagerly for immediate tap response */}
          <div className="d-md-none">
            <SidebarToggleButton
              sidebarShown={isSidebarShown}
              onClick={handleToggleSidebar}
              controlsId="app-sidebar"
            />
          </div>

          {/* Desktop Collapse Toggle Button - Hidden since sidebar is always open */}
          <div className="d-none align-items-center me-2">
            <button
              type="button"
              className="btn btn-outline-light btn-sm"
              onClick={handleToggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <i
                className={`fa ${isCollapsed ? "fa-angle-right" : "fa-angle-left"}`}
              ></i>
            </button>
          </div>

          {/* Right Side Menu Items */}
          <div className="navbar-collapse">
            <ul
              className="navbar-nav ms-auto d-flex align-items-center gap-3"
              role="menubar"
            >
              <Suspense
                fallback={
                  <li className="nav-item" role="none">
                    <div
                      className="skeleton-loader"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </li>
                }
              >
                <ErrorBoundary>
                  <NotificationDropdown />
                </ErrorBoundary>
              </Suspense>
              <Suspense
                fallback={
                  <li className="nav-item" role="none">
                    <div
                      className="skeleton-loader"
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </li>
                }
              >
                <ErrorBoundary>
                  <KeranjangDropdown user={user} />
                </ErrorBoundary>
              </Suspense>
              <Suspense
                fallback={
                  <li className="nav-item" role="none">
                    <div
                      className="skeleton-loader"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </li>
                }
              >
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

export default Header;
