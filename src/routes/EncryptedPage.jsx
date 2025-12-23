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
  "simpananPage",
  // ... Tambahkan semua route yang menggunakan DashboardLayout
];

export const EncryptedPage = React.memo(() => {
  const { token } = useParams();
  
  // 1. Ambil payload lengkap (objek), bukan cuma string nama page
  const decodedData = jwtDecodePage(token); 
  const pageName = decodedData?.page; 
  
  const PageComponent = PAGE_COMPONENTS[pageName];

  if (!PageComponent) {
    return <Navigate to="/" replace />;
  }

  const needsDashboardLayout = PROTECTED_ROUTES.includes(pageName);

  if (needsDashboardLayout) {
    return (
      <DashboardLayoutProvider>
        {/* 2. Kirim decodedData sebagai props decodedToken */}
        <PageComponent decodedToken={decodedData} />
      </DashboardLayoutProvider>
    );
  } else {
    return <PageComponent decodedToken={decodedData} />;
  }
});