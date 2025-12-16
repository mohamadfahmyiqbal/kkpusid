// src/components/layout/Header.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
// ✅ Pastikan import helper sudah benar
import { jwtEncode } from "../../routes/helpers";

import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import KeranjangDropdown from "./KeranjangDropdown";
import SidebarToggleButton from "./SidebarToggleButton";

const Header = ({ user, logout, handleToggleSidebar, isSidebarShown }) => {
  const navigate = useNavigate();

  // FUNGSI UNTUK MENANGANI KLIK LOGO
  const handleLogoClick = () => {
    // ✅ Menggunakan jwtEncode untuk membuat path dashboard secara dinamis
    const dashboardToken = jwtEncode({ page: "dashboard" });
    navigate(`/${dashboardToken}`);
  };

  return (
    <header className="topbar">
      <nav className="navbar top-navbar navbar-expand-md navbar-light">
        {/* Logo Section */}
        <div className="navbar-header">
          <div
            className="navbar-brand d-flex align-items-center"
            onClick={handleLogoClick} // ✅ Sekarang menggunakan handler yang sudah diperbaiki
            style={{ cursor: "pointer" }}
          >
            <img
              src="/assets/icons/PUSlogo.png"
              alt="PUS Logo"
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <div className="navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav mr-auto mt-md-0">
            <li className="nav-item d-md-none">
              <SidebarToggleButton
                sidebarShown={isSidebarShown}
                onClick={handleToggleSidebar}
              />
            </li>
          </ul>

          <ul className="navbar-nav my-lg-0 ml-auto">
            <NotificationDropdown />
            <KeranjangDropdown user={user} />
            <UserDropdown user={user} logout={logout} />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
