import { lazy } from "react";

const globalRoutes = {
  globalSplash: {
    component: lazy(() => import("../../pages/global/splash/page/SplashPage")),
    isProtected: false,
  },
  landingPage: {
    component: lazy(() => import("../../pages/global/landing/LandingPage")),
    isProtected: false,
  },
  notificationPage: {
    component: lazy(() => import("../../pages/global/notification")),
    isProtected: true,
  },
  notificationDetailPage: {
    component: lazy(() => import("../../pages/global/notification").then(module => ({ default: module.NotificationDetailPage }))),
    isProtected: true,
  },
  billingPage: {
    component: lazy(() => import("../../pages/global/billing/pages/BillingPage")),
    isProtected: true,
  },
  invoicePage: {
    component: lazy(() => import("../../pages/global/invoice/pages/InvoicePage")),
    isProtected: true,
  },
  accountPage: {
    component: lazy(() => import("../../pages/anggota/account-page/AccountPage")),
    isProtected: true,
  },
  transactionDetailPage: {
    component: lazy(() => import("../../pages/global/transaction/transaction-detail-page.jsx")),
    isProtected: true,
  },
  receiptPage: {
    component: lazy(() => import("../../pages/global/receipt/ReceiptPage")),
    isProtected: true,
  },
  articleDetail: {
    component: lazy(() => import("../../pages/global/article-detail/ArticleDetailPage")),
    isProtected: true,
  },
  privacyPolicy: {
    component: lazy(() => import("../../pages/global/privacy-policy/PrivacyPolicyPage")),
    isProtected: false,
  },
  termsConditions: {
    component: lazy(() => import("../../pages/global/terms-conditions/TermsConditionsPage")),
    isProtected: false,
  },
  termination_progress: {
    component: lazy(() => import("../../pages/global/termination/termination-progress-page.jsx")),
    isProtected: true,
  },
};

export default globalRoutes;
