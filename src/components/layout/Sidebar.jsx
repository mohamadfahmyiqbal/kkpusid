// components/layout/Sidebar.jsx (Final Tanpa Ikon)

import React, { useState, useCallback, memo, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";

// =========================================================
// DATA MENU (Tanpa Ikon)
// =========================================================
const menuData = [
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Akun",
    key: "akun",
    children: [
      { label: "Anggota", href: "/anggotaList" },
      {
        label: "Report",
        key: "akun-report",
        children: [{ label: "Anggota", href: "/anggotaReport" }],
      },
    ],
  },
  { label: "Article", href: "/article" },
  {
    label: "Hibah",
    key: "hibah",
    children: [
      { label: "List", href: "/hibahList" },
      {
        label: "Report",
        key: "hibah-report",
        children: [{ label: "Hibah", href: "/hibahReport" }],
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
          { label: "List", href: "/pinjamanList" },
          { label: "Transaksi", href: "/pinjamanTransaksi" },
        ],
      },
    ],
  },
];

// Helper untuk mengecek apakah salah satu anak (rekursif) dari item adalah path saat ini
const hasActiveChild = (item, currentPath) => {
  if (item.href === currentPath) return true;
  if (item.children) {
    return item.children.some((child) => hasActiveChild(child, currentPath));
  }
  return false;
};

// =========================================================
// SidebarMenuItem (Tanpa Ikon)
// =========================================================
const SidebarMenuItem = memo(
  ({ item, currentPath, openKeys, onDropdownToggle }) => {
    const isDropdown = !!item.children;
    const itemKey = item.key;
    const isActive = isDropdown
      ? hasActiveChild(item, currentPath)
      : item.href === currentPath;
    const isOpen = isDropdown ? !!openKeys[itemKey] : false;

    useEffect(() => {
      if (isDropdown && isActive && !isOpen && onDropdownToggle) {
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
            href="#"
            onClick={(e) => onDropdownToggle(itemKey, e)}
            role="button"
          >
            <span className="hide-menu">{item.label}</span>
          </a>

          <ul
            aria-expanded={isOpen}
            className={`collapse ${isOpen ? "in show" : ""}`}
          >
            {item.children.map((child, idx) => (
              <SidebarMenuItem
                key={child.key || `${itemKey}-${idx}`}
                item={child}
                currentPath={currentPath}
                openKeys={openKeys}
                onDropdownToggle={onDropdownToggle}
              />
            ))}
          </ul>
        </li>
      );
    }

    // Link Biasa (Leaf)
    return (
      <li className={isActive ? "active" : ""}>
        <NavLink
          to={item.href}
          className={`waves-effect waves-dark`}
          aria-expanded="false"
        >
          <span className="hide-menu">{item.label}</span>
        </NavLink>
      </li>
    );
  }
);

// =========================================================
// Sidebar Utama (Hanya Render List)
// =========================================================
export default function Sidebar({ user }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const [openKeys, setOpenKeys] = useState({});

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
        {/* Tambahkan bagian user profile di sini jika diperlukan (diberi props user) */}

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
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
