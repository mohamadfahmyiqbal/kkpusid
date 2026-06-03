import React, { Suspense, useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PAGE_COMPONENTS from "./PageRoutes";
import { jwtDecodePage } from "../utils/helpers";
import LayoutGlobal from "../components/layout/components/LayoutGlobal";
import { TransactionProvider } from "../components/layout/contexts";

const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export const EncryptedPage = React.memo(() => {
  const { token } = useParams();

  const decodedData = useMemo(() => {
    try {
      return jwtDecodePage(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }, [token]);

  const pageName = decodedData?.page;
  const routeConfig = PAGE_COMPONENTS[pageName];

  if (!decodedData || !routeConfig) {
    return <Navigate to="/" replace />;
  }

  const { component: PageComponent, isProtected } = routeConfig;

  // Optimasi: Hanya gunakan TransactionProvider untuk rute yang diproteksi (transaksi/dashboard)
  // Atau rute spesifik yang membutuhkan state transaksi.
  const pageContent = (
    <Suspense fallback={<PageLoader />}>
      {isProtected ? (
        <TransactionProvider>
          <PageComponent decodedToken={decodedData} />
        </TransactionProvider>
      ) : (
        <PageComponent decodedToken={decodedData} />
      )}
    </Suspense>
  );

  const animatedPageContent = (
    <AnimatePresence mode="wait">
      <motion.div
        key={token} // Optimasi: Gunakan token sebagai key agar animasi terpicu saat URL berubah
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {pageContent}
      </motion.div>
    </AnimatePresence>
  );

  return isProtected ? (
    <LayoutGlobal pageName={pageName}>{animatedPageContent}</LayoutGlobal>
  ) : (
    animatedPageContent
  );
});
