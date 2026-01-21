import React, { useState, useCallback, memo, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtEncode, jwtDecodePage } from "../../routes/helpers";

const menuData = [
  { label: "Dashboard", href: "dashboard" },
  { label: "Simpanan", href: "simpananPage" },
  { label: "Transaksi", href: "transaksiPage" },
  { label: "Program", href: "programPage" },
  { label: "Tabungan", href: "tabunganPage" },
  { label: "Investasi", href: "investasiPage" },
  { label: "Training", href: "trainingPage" },
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
        <li className={activeClass}>
          <a
            className={`has-arrow waves-effect waves-dark ${activeClass}`}
            aria-expanded={isOpen}
            href="javascript:void(0)"
            onClick={(e) => onDropdownToggle(itemKey, e)}
          >
            <span className="hide-menu">{item.label}</span>
          </a>
          <ul className={`collapse ${isOpen ? "in show" : ""}`}>
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
      <li className={isActive ? "active" : ""}>
        <a
          href="javascript:void(0)"
          onClick={(e) => onCustomNavigate(e, item.href)}
          className={`waves-effect waves-dark ${isActive ? "active" : ""}`}
        >
          <span className="hide-menu">{item.label}</span>
        </a>
      </li>
    );
  }
);

export default function Sidebar({ user }) {
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
    [navigate]
  );

  const handleDropdownToggle = useCallback((key, e) => {
    e?.preventDefault();
    setOpenKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  return (
    <aside className="left-sidebar">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="nav-small-cap">MENU UTAMA</li>
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
