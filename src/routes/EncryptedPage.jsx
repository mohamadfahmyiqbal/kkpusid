// src/routes/EncryptedPage.jsx

import React from "react";
import { Navigate, useParams } from "react-router-dom";
import PAGE_COMPONENTS from "./PageRoutes";
import { jwtDecodePage } from "./helpers";
// ✅ IMPORT WRAPPER BARU
import DashboardLayoutProvider from "../components/layout/DashboardLayoutProvider";

// Daftar rute yang MEMBUTUHKAN DashboardLayoutProvider (dan ProfileContext)
const PROTECTED_ROUTES = [
  "dashboard",
  "notificationPage",
  "billingPage",
  "invoicePage",
  "accountPage",
  "transactionDetailPage",
  "registrationPage",
  "registrationFormDetail",
  // ... Tambahkan semua route yang menggunakan DashboardLayout
];

export const EncryptedPage = React.memo(() => {
  const { token } = useParams();
  const pageName = jwtDecodePage(token);
  const PageComponent = PAGE_COMPONENTS[pageName];

  if (!PageComponent) {
    return <Navigate to="/" replace />;
  }

  const needsDashboardLayout = PROTECTED_ROUTES.includes(pageName);

  // Conditional Rendering
  if (needsDashboardLayout) {
    // ✅ Rute Terlindungi: Diberi Provider dan Layout
    // PageComponent akan menjadi CHILDREN dari DashboardLayoutProvider
    return (
      <DashboardLayoutProvider>
        <PageComponent />
      </DashboardLayoutProvider>
    );
  } else {
    // ✅ Rute Publik (Login, Splash, Register): Render langsung, tanpa Context
    return <PageComponent />;
  }
});
