import React, { useState, useCallback, memo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

const menuData = [
  { label: "Dashboard", href: "dashboard" },
  {
    label: "Akun",
    key: "akun",
    children: [
      { label: "Anggota", href: "anggotaList" },
      {
        label: "Report",
        key: "akun-report",
        children: [{ label: "Anggota", href: "anggotaReport" }],
      },
    ],
  },
  { label: "Article", href: "article" },
  {
    label: "Hibah",
    key: "hibah",
    children: [
      { label: "List", href: "hibahList" },
      {
        label: "Report",
        key: "hibah-report",
        children: [{ label: "Hibah", href: "hibahReport" }],
      },
    ],
  },
  {
    label: "Program",
    key: "program",
    children: [
      {
        label: "Pinjaman Lunak",
        key: "program-pinjaman",
        children: [
          { label: "List", href: "pinjamanList" },
          { label: "Transaksi", href: "pinjamanTransaksi" },
        ],
      },
    ],
  },
];

const hasActiveChild = (item, currentPath) => {
  if (item.href === currentPath) return true;
  if (item.children) {
    return item.children.some((child) => hasActiveChild(child, currentPath));
  }
  return false;
};

// =========================================================
// SidebarMenuItem
// =========================================================
const SidebarMenuItem = memo(
  ({ item, currentPath, openKeys, onDropdownToggle, onCustomNavigate }) => {
    const isDropdown = !!item.children;
    const itemKey = item.key;
    const isActive = isDropdown
      ? hasActiveChild(item, currentPath)
      : item.href === currentPath;
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
                currentPath={currentPath}
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

// =========================================================
// Sidebar Utama
// =========================================================
export default function Sidebar({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [openKeys, setOpenKeys] = useState({});

  const handleNavigation = useCallback(
    (e, targetHref) => {
      e.preventDefault();

      // 1. Tentukan halaman asal untuk tombol back
      const returnPage = currentPath.substring(1) || "dashboard";

      // 2. ENKRIPSI HREF TUJUAN (targetHref) dan returnPage
      const backToken = jwtEncode({
        page: targetHref, // 'registrationPage' atau 'billingPage' sesuai permintaan
      });
      console.log(targetHref);

      navigate(`/${backToken}`);
    },
    [navigate, currentPath]
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
            <li className="nav-small-cap">PERSONAL</li>

            {menuData.map((item, idx) => (
              <SidebarMenuItem
                key={item.key || idx}
                item={item}
                currentPath={currentPath}
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
