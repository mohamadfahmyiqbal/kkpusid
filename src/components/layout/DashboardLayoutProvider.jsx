// src/components/layout/DashboardLayoutProvider.jsx

import React from "react";
// Import ProfileProvider dari Context
import { ProfileProvider } from "../../contexts/ProfileContext";
// Import DashboardLayout (yang akan menjadi Consumer)
import DashboardLayout from "./DashboardLayout";

/**
 * Komponen ini adalah gabungan dari ProfileProvider dan DashboardLayout.
 * Digunakan untuk rute yang membutuhkan otentikasi.
 * Ini adalah *entry point* di mana ProfileContext disediakan.
 */
const DashboardLayoutProvider = ({ children }) => {
  return (
    // ✅ 1. Tempatkan ProfileProvider di tingkat tertinggi.
    <ProfileProvider>
      {/* 2. Render DashboardLayout (Consumer) di dalamnya. */}
      <DashboardLayout>{children}</DashboardLayout>
    </ProfileProvider>
  );
};

export default DashboardLayoutProvider;
