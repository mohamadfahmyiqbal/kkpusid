// components/dashboard/DashboardLayout.jsx

import React from "react";
import Header from "../layout/Header";
import Sidebar from "./Sidebar"; // Menggunakan Sidebar dari folder dashboard
import Footer from "../layout/Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div id="main-wrapper" className="d-flex">
      <Header />
      <Sidebar />

      {/* Page Wrapper untuk konten dinamis */}
      <div className="page-wrapper">{children}</div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
