import React, {
  useState,
  useCallback,
  memo,
  useEffect,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtEncode, jwtDecodePage } from "../../../utils/helpers";
import masjidImage from "../../../assets/images/masjid.png";
import {
  MdDashboard,
  MdSavings,
  MdAccountBalance,
  MdGroup,
  MdSchool,
  MdBarChart,
  MdPerson,
  MdStore,
  MdSecurity,
  MdHistory,
  MdShoppingCart,
} from "react-icons/md";
import { FaWallet } from "react-icons/fa";

const SidebarMenuItem = memo(
  ({ item, currentPage, openKeys, onDropdownToggle, onCustomNavigate }) => {
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
              />
            ))}
          </ul>
        </li>
      );
    }

    return (
      <li className={`${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`} role="none">
        <button
          className={`sidebar-link-btn ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""}`}
          aria-current={isActive && "page"}
          aria-label={item.ariaLabel || item.label}
          onClick={(e) => !isDisabled && onCustomNavigate(e, item.href)}
          type="button"
          disabled={isDisabled}
        >
          {item.icon && (
            <item.icon className="sidebar-icon" aria-hidden="true" />
          )}
          <span className="sidebar-text">{item.label}</span>
        </button>
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
      <style>{`
        .sidebar-horizontal .sidebar-nav > ul {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
          margin: 0;
          padding: 0 20px;
        }
        .sidebar-horizontal .sidebar-nav > ul > li {
          position: relative;
        }
        .sidebar-horizontal .sidebar-link-btn {
          height: 48px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          border: none;
          background: transparent;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
        }
        @media (max-width: 1200px) {
          .sidebar-horizontal .sidebar-link-btn {
            padding: 0 10px !important;
            font-size: 12px !important;
            gap: 4px !important;
          }
          .sidebar-horizontal .sidebar-icon {
            font-size: 16px !important;
          }
          .sidebar-horizontal .sidebar-submenu {
            min-width: 180px !important;
          }
        }
        .sidebar-horizontal .sidebar-link-btn:hover {
          color: #1e293b;
          background-color: #f8fafc;
        }
        .sidebar-horizontal .sidebar-link-btn.active {
          color: #2563eb;
          font-weight: 600;
        }
        .sidebar-horizontal .sidebar-link-btn.active::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background-color: #2563eb;
        }
        .sidebar-horizontal .sidebar-submenu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 220px;
          background: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f1f5f9;
          border-radius: 0 0 12px 12px;
          padding: 8px;
          display: none;
          z-index: 1000;
        }
        .sidebar-horizontal li:hover > .sidebar-submenu,
        .sidebar-horizontal .sidebar-submenu.show {
          display: block;
        }
        .sidebar-horizontal .sidebar-submenu .sidebar-link-btn {
          width: 100%;
          height: 40px;
          border-radius: 8px;
        }
        .sidebar-horizontal .nav-small-cap {
          display: none;
        }
        .sidebar-horizontal .sidebar-icon {
          font-size: 18px;
          opacity: 0.7;
        }
        .sidebar-horizontal .sidebar-link-btn.active .sidebar-icon {
          opacity: 1;
        }
        .sidebar-horizontal .has-arrow::after {
          content: "▾";
          font-size: 10px;
          margin-left: 4px;
        }

        /* Vertical Mobile Styles */
        .sidebar-vertical .sidebar-nav > ul {
          padding: 10px 16px;
        }
        .sidebar-vertical .sidebar-link-btn {
          width: 100%;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          border: none;
          background: transparent;
          color: #475569;
          font-size: 14.5px;
          font-weight: 500;
          border-radius: 12px;
          margin-bottom: 4px;
          text-align: left;
          transition: all 0.2s ease;
        }
        .sidebar-vertical .sidebar-link-btn:hover {
          background-color: #f1f5f9;
          color: #1e293b;
        }
        .sidebar-vertical .sidebar-link-btn.active {
          background-color: #eff6ff;
          color: #2563eb;
          font-weight: 600;
        }
        .sidebar-link-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed !important;
        }
        .sidebar-link-btn.disabled .sidebar-icon {
          opacity: 0.5;
        }
        /* Emerald accent for active icons in mobile */
        .sidebar-vertical .sidebar-link-btn.active .sidebar-icon {
          color: #00d9a6;
        }
        .sidebar-vertical .sidebar-submenu {
          margin-left: 24px;
          border-left: 1.5px solid #e2e8f0;
          padding-left: 8px;
          display: none;
          margin-bottom: 8px;
        }
        .sidebar-vertical .sidebar-submenu.show {
          display: block;
          animation: slideDown 0.25s ease-out;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sidebar-vertical .nav-small-cap {
          padding: 20px 16px 10px;
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .sidebar-vertical .has-arrow::after {
          content: "▾";
          font-size: 10px;
          margin-left: auto;
          transition: transform 0.3s ease;
          opacity: 0.5;
        }
        .sidebar-vertical .sidebar-link-btn[aria-expanded="true"]::after {
          transform: rotate(180deg);
        }
      `}</style>

      <div className="scroll-sidebar h-100 d-flex flex-column">
        {!isDesktop && (
          <div 
            className="sidebar-brand-box p-4"
            style={{ 
              background: 'linear-gradient(135deg, #02113d 0%, #031b5a 100%)',
              height: 140,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
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
            />          </div>
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
