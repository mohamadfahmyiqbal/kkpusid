import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtEncode, jwtDecodePage } from "../../../utils/helpers";
import {
  MdDashboard,
  MdSavings,
  MdAccountBalance,
  MdGroup,
  MdAttachMoney,
  MdSchool,
  MdBarChart,
} from "react-icons/md";

const menuData = [
  { label: "Dashboard", href: "dashboard", icon: MdDashboard },
  { label: "Simpanan", href: "simpananPage", icon: MdSavings },
  { label: "Transaksi", href: "transaksiPage", icon: MdAccountBalance },
  { label: "Program", href: "programPage", icon: MdGroup },
  { label: "Tabungan", href: "tabunganPage", icon: MdAttachMoney },
  { label: "Investasi", href: "investasiPage", icon: MdBarChart },
  { label: "Training", href: "trainingPage", icon: MdSchool },
];

const hasActiveChild = (item, currentPage) => {
  if (item.href === currentPage) return true;
  if (item.children) {
    return item.children.some((child) => hasActiveChild(child, currentPage));
  }
  return false;
};

const SidebarMenuItem = memo(
  ({ item, currentPage, openKeys, onDropdownToggle, onCustomNavigate }) => {
    const isDropdown = !!item.children;
    const itemKey = item.key;
    const isActive = isDropdown
      ? hasActiveChild(item, currentPage)
      : item.href === currentPage;
    const isOpen = isDropdown ? !!openKeys[itemKey] : false;

    useEffect(() => {
      if (isDropdown && isActive && !isOpen) {
        onDropdownToggle(itemKey, { preventDefault: () => {} });
      }
    }, [isActive, isDropdown, isOpen, itemKey, onDropdownToggle]);

    if (isDropdown) {
      const activeClass = isActive || isOpen ? "active" : "";
      return (
        <li className={activeClass} role="none">
          <button
            className={`sidebar-link-btn has-arrow ${activeClass}`}
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={(e) => onDropdownToggle(itemKey, e)}
          >
            {item.icon && <item.icon className="sidebar-icon" />}
            <span className="sidebar-text">{item.label}</span>
          </button>
          <ul className={`sidebar-submenu ${isOpen ? "show" : ""}`}>
            {item.children.map((child, idx) => (
              <SidebarMenuItem
                key={child.key || `${itemKey}-${idx}`}
                item={child}
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
      <li className={isActive ? "active" : ""} role="none">
        <button
          className={`sidebar-link-btn ${isActive ? "active" : ""}`}
          aria-current={isActive && "page"}
          onClick={(e) => onCustomNavigate(e, item.href)}
        >
          {item.icon && <item.icon className="sidebar-icon" />}
          <span className="sidebar-text">{item.label}</span>
        </button>
      </li>
    );
  },
);

export default function Sidebar({ user, onNavigate, onClose, isDesktop }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil nama halaman dari token URL untuk highlight menu
  const currentPage = useMemo(() => {
    const token = location.pathname.substring(1);
    const decoded = jwtDecodePage(token);
    return decoded?.page || "";
  }, [location.pathname]);

  const [openKeys, setOpenKeys] = useState({});

  const handleNavigation = useCallback(
    (e, targetHref) => {
      e.preventDefault();
      const token = jwtEncode({ page: targetHref });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const handleDropdownToggle = useCallback((key, e) => {
    e?.preventDefault();
    setOpenKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <aside id="app-sidebar" className="left-sidebar" aria-label="Sidebar menu">
      <div className="scroll-sidebar">
        <div className="sidebar-header">
          {!isDesktop && (
            <button
              type="button"
              className="sidebar-close-btn"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              ×
            </button>
          )}
        </div>
        <nav className="sidebar-nav">
          <ul id="sidebarnav" role="menu">
            <li className="nav-small-cap" role="none">
              MENU UTAMA
            </li>
            {menuData.map((item, idx) => (
              <SidebarMenuItem
                key={item.key || idx}
                item={item}
                currentPage={currentPage}
                openKeys={openKeys}
                onDropdownToggle={handleDropdownToggle}
                onCustomNavigate={handleNavigation}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
