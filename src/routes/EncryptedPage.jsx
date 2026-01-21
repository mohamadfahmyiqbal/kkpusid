import React, { Suspense, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import PAGE_COMPONENTS from "./PageRoutes";
import { jwtDecodePage } from "./helpers";
import DashboardLayoutProvider from "../components/layout/DashboardLayoutProvider";
import { TransactionProvider } from "../contexts/TransactionContext";

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
  "investasiPage",
  "trainingPage",
];

const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export const EncryptedPage = React.memo(() => {
  const { token } = useParams();
  const decodedData = useMemo(() => jwtDecodePage(token), [token]);
  const pageName = decodedData?.page;
  const PageComponent = PAGE_COMPONENTS[pageName];

  if (!decodedData || !PageComponent) {
    return <Navigate to="/" replace />;
  }

  const needsDashboardLayout = PROTECTED_ROUTES.includes(pageName);

  const pageContent = (
    <Suspense fallback={<PageLoader />}>
      <TransactionProvider>
        <PageComponent decodedToken={decodedData} />
      </TransactionProvider>
    </Suspense>
  );

  return needsDashboardLayout ? (
    <DashboardLayoutProvider>{pageContent}</DashboardLayoutProvider>
  ) : (
    pageContent
  );
});
