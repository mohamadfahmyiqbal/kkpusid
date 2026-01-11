// src/routes/EncryptedPage.jsx

import React, { Suspense, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import PAGE_COMPONENTS from "./PageRoutes";
import { jwtDecodePage } from "./helpers";
import DashboardLayoutProvider from "../components/layout/DashboardLayoutProvider";

/**
 * Daftar rute yang MEMBUTUHKAN DashboardLayoutProvider (dan ProfileContext)
 * Disesuaikan dengan kebutuhan arsitektur aplikasi
 */
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
  "penarikanSimpananPage",
  "transaksiPage",
  "formPengajuanTransaksi",
];

/**
 * Loading component saat proses lazy loading berlangsung
 */
const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export const EncryptedPage = React.memo(() => {
  const { token } = useParams();

  // 1. Decode token untuk mendapatkan payload (page name & data)
  const decodedData = useMemo(() => jwtDecodePage(token), [token]);
  const pageName = decodedData?.page;

  // 2. Ambil komponen dari registry PAGE_COMPONENTS
  const PageComponent = PAGE_COMPONENTS[pageName];

  // 3. Jika token tidak valid atau halaman tidak ditemukan, arahkan ke root
  if (!decodedData || !PageComponent) {
    return <Navigate to="/" replace />;
  }

  const needsDashboardLayout = PROTECTED_ROUTES.includes(pageName);

  /**
   * Konten halaman dibungkus dengan Suspense untuk menangani lazy loading
   * yang didefinisikan di level route map (globalRoutes, simpananRoutes, dll)
   */
  const pageContent = (
    <Suspense fallback={<PageLoader />}>
      <PageComponent decodedToken={decodedData} />
    </Suspense>
  );

  // 4. Render dengan atau tanpa DashboardLayout
  if (needsDashboardLayout) {
    return <DashboardLayoutProvider>{pageContent}</DashboardLayoutProvider>;
  }

  return pageContent;
});

EncryptedPage.displayName = "EncryptedPage";

export default EncryptedPage;
