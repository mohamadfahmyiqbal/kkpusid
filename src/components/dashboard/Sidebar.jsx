// components/dashboard/Sidebar.jsx

import React from "react";

const Sidebar = () => (
  <aside className="left-sidebar">
    <div className="scroll-sidebar">
      <nav className="sidebar-nav">
        <ul id="sidebarnav">
          <li className="nav-small-cap">FITUR UTAMA</li>
          <li>
            <a href="#">
              <i className="mdi mdi-view-dashboard"></i>
              <span className="hide-menu">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="mdi mdi-account-card-details"></i>
              <span className="hide-menu">Akun Anggota</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="mdi mdi-cash-multiple"></i>
              <span className="hide-menu">Simpanan</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="mdi mdi-arrow-up-bold-box-outline"></i>
              <span className="hide-menu">Investasi</span>
            </a>
          </li>
          {/* Tambahkan item menu lainnya sesuai kebutuhan */}
        </ul>
      </nav>
    </div>
  </aside>
);

export default Sidebar;
