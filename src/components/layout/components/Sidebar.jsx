import React, {
  useState,
  useCallback,
  memo,
  useMemo,
} from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { jwtEncode, jwtDecodePage } from "../../../utils/helpers";
import masjidImage from "../../../assets/images/masjid.png";
import {
  MdDashboard,
  MdAccountBalance,
  MdGroup,
  MdSchool,
  MdBarChart,
  MdPerson,
  MdHistory,
  MdShoppingCart,
} from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import "./LayoutStyles.css";

const SidebarMenuItem = memo(
  ({ item, currentPage, openKeys, onDropdownToggle, onCustomNavigate, onClose, isDesktop }) => {
    const isDropdown = !!item.children;
    const itemKey = item.key;
    const isDisabled = !!item.disabled;

    const isActive = useMemo(() => {
      if (isDropdown) {
        return hasActiveChild(item, currentPage);
      }
      return item.href === currentPage;
    }, [isDropdown, item, currentPage]);

    const isOpen = isDropdown ? !!openKeys[itemKey] : false;

    if (isDropdown) {
      const activeClass = isActive || isOpen ? "active" : "";
      return (
        <li className={`${activeClass} ${isDisabled ? "disabled" : ""}`} role="none">
          <button
            className={`sidebar-link-btn has-arrow ${activeClass} ${isDisabled ? "disabled" : ""}`}
            aria-expanded={isOpen}
            aria-haspopup="true"
            aria-label={item.ariaLabel || item.label}
            onClick={(e) => !isDisabled && onDropdownToggle(itemKey, e)}
            type="button"
            disabled={isDisabled}
          >
            {item.icon && (
              <item.icon className="sidebar-icon" aria-hidden="true" />
            )}
            <span className="sidebar-text">{item.label}</span>
          </button>
          <ul className={`sidebar-submenu ${isOpen ? "show" : ""}`}>
            {item.children.map((child, idx) => (
              <SidebarMenuItem
                key={child.key || `${itemKey}-${idx}`}
                item={{
                  ...child,
                  key: child.key || `${itemKey}-${idx}`,
                  ariaLabel:
                    child.ariaLabel || `${item.label} - ${child.label}`,
                }}
                currentPage={currentPage}
                openKeys={openKeys}
                onDropdownToggle={onDropdownToggle}
                onCustomNavigate={onCustomNavigate}
                onClose={onClose}
                isDesktop={isDesktop}
              />
            ))}
          </ul>
        </li>
      );
    }

    const targetUrl = `/${jwtEncode({ page: item.href })}`;

    return (
      <li className={`${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`} role="none">
        {isDisabled ? (
          <button
            className={`sidebar-link-btn disabled`}
            aria-label={item.ariaLabel || item.label}
            type="button"
            disabled
          >
            {item.icon && (
              <item.icon className="sidebar-icon" aria-hidden="true" />
            )}
            <span className="sidebar-text">{item.label}</span>
          </button>
        ) : (
          <Link
            to={targetUrl}
            className={`sidebar-link-btn ${isActive ? "active" : ""}`}
            aria-current={isActive && "page"}
            aria-label={item.ariaLabel || item.label}
            onClick={(e) => {
              if (!isDesktop && onClose) {
                onClose();
              }
            }}
          >
            {item.icon && (
              <item.icon className="sidebar-icon" aria-hidden="true" />
            )}
            <span className="sidebar-text">{item.label}</span>
          </Link>
        )}
      </li>
    );
  },
);

const hasActiveChild = (item, currentPage) => {
  if (item.href === currentPage) return true;
  if (item.children) {
    return item.children.some((child) => hasActiveChild(child, currentPage));
  }
  return false;
};

export default function Sidebar({ user, onNavigate, onClose, isDesktop, isSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState({});

  const roleId = Number(user?.status_id || 0);
  const isCandidate = roleId === 1;
  const isALB = roleId === 6;

  const menuData = useMemo(() => {
    // Menu dasar untuk Anggota Reguler
    const allMenus = [
      {
        label: "Dashboard",
        href: "dashboard",
        icon: MdDashboard,
        key: "dashboard",
      },
      {
        label: "Simpanan",
        href: "simpananPage",
        icon: FaWallet,
        key: "simpanan",
      },
      {
        label: "Jual Beli",
        href: "jualBeliPage",
        icon: MdShoppingCart,
        key: "jualBeli",
      },
      {
        label: "Riwayat",
        href: "billingPage",
        icon: MdHistory,
        key: "transaksi",
      },
      {
        label: "Program",
        href: "programPage",
        icon: MdGroup,
        key: "program",
      },
      {
        label: "Tabungan",
        href: "tabunganPage",
        icon: MdAccountBalance,
        key: "tabungan",
      },
      {
        label: "Investasi",
        href: "investasiPage",
        icon: MdBarChart,
        key: "investasi",
      },
      {
        label: "Training",
        href: "trainingPage",
        icon: MdSchool,
        key: "training",
      },
    ];

    return allMenus
      .filter((item) => {
        // Anggota Luar Biasa (ALB) tidak memiliki menu Transaksi, Program, dan Investasi
        if (isALB) {
          return !["transaksi", "program", "investasi"].includes(item.key);
        }
        return true;
      })
      .map((item) => ({
        ...item,
        // Calon Anggota bisa melihat semua menu tetapi tidak bisa diklik (kecuali Dashboard)
        disabled: isCandidate && item.key !== "dashboard",
      }));
  }, [isALB, isCandidate]);

  const currentPage = useMemo(() => {
    const token = location.pathname.substring(1);
    const decoded = jwtDecodePage(token);
    return decoded?.page || "dashboard";
  }, [location.pathname]);

  const handleNavigation = useCallback(
    (e, targetHref) => {
      e.preventDefault();
      if (!targetHref) return;
      try {
        const token = jwtEncode({ page: targetHref });
        navigate(`/${token}`);
        if (!isDesktop) onClose();
      } catch (error) {
        console.error("Navigation error:", error);
        navigate(`/${targetHref}`);
      }
    },
    [navigate, isDesktop, onClose],
  );

  const handleDropdownToggle = useCallback((key, e) => {
    e?.preventDefault();
    setOpenKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const sidebarStyle = isDesktop ? {
    width: '100%',
    position: 'fixed',
    top: 64,
    left: 0,
    height: 48,
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    zIndex: 999,
    borderBottom: '1px solid #f1f5f9'
  } : {
    width: 240,
    position: 'fixed',
    left: isSidebarOpen ? 0 : -240,
    top: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
    zIndex: 1100,
    transition: 'left 0.3s ease',
    overflowY: 'auto'
  };

  return (
    <aside 
      className={`app-sidebar ${isDesktop ? 'sidebar-horizontal' : 'sidebar-vertical'}`} 
      aria-label="Main menu"
      style={sidebarStyle}
    >
      <div className="scroll-sidebar h-100 d-flex flex-column">
        {!isDesktop && (
          <div className="sidebar-brand-box p-4 sidebar-brand-gradient">
            <div className="d-flex align-items-center gap-3" style={{ position: 'relative', zIndex: 2 }}>
              <img src="/assets/icons/PUSlogo.png" alt="Logo" style={{ height: "48px" }} />
              <div className="d-flex flex-column" style={{ lineHeight: 1.1 }}>
                <span className="fw-bold text-white" style={{ fontSize: 15 }}>Paguyuban Usaha</span>
                <span style={{ fontSize: 15, color: "#00d9a6", fontWeight: 800 }}>Sukses</span>
              </div>
            </div>
            
            <button
              type="button"
              className="btn btn-link p-0 text-white-50"
              style={{ position: 'absolute', top: 15, right: 15, zIndex: 3 }}
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>×</span>
            </button>

            {/* Mosque Silhouette */}
            <div
              style={{
                position: "absolute",
                right: -10,
                bottom: -10,
                width: "50%",
                height: "70%",
                background: `url(${masjidImage}) no-repeat right bottom / contain`,
                opacity: 0.1,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          </div>
        )}

        <nav className="sidebar-nav flex-grow-1">
          <ul id="sidebarnav" role="menu" className="list-unstyled">
            <li className="nav-small-cap">MENU UTAMA</li>
            {menuData.map((item, idx) => (
              <SidebarMenuItem
                key={item.key || idx}
                item={item}
                currentPage={currentPage}
                openKeys={openKeys}
                onDropdownToggle={handleDropdownToggle}
                onCustomNavigate={handleNavigation}
                onClose={onClose}
                isDesktop={isDesktop}
              />
            ))}
          </ul>
        </nav>

        {!isDesktop && user && (
          <div className="mt-auto p-4 border-top bg-light">
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle bg-white border d-flex align-items-center justify-content-center shadow-sm"
                style={{ width: 42, height: 42, overflow: 'hidden' }}
              >
                {user.foto ? (
                  <img 
                    src={user.foto.startsWith('data:') ? user.foto : `data:image/jpeg;base64,${user.foto}`} 
                    alt="User" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <MdPerson size={24} className="text-muted" />
                )}
              </div>
              <div className="d-flex flex-column min-w-0">
                <span className="fw-bold text-dark text-truncate" style={{ fontSize: 13.5 }}>
                  {user.full_name || user.nama || 'Anggota'}
                </span>
                <span className="text-muted text-truncate" style={{ fontSize: 11 }}>
                  {user.member_type || 'Calon Anggota'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
