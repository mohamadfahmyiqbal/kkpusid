import React, { lazy } from "react";

const globalRoutes = {
  globalSplash: {
    component: lazy(() => import("../../pages/global/SplashPage/page/SplashPage")),
    isProtected: false,
  },
  landingPage: {
    component: lazy(() => import("../../pages/global/LandingPage/LandingPage")),
    isProtected: false,
  },
  notificationPage: {
    component: lazy(() => import("../../pages/global/NotificationPage")),
    isProtected: true,
  },
  notificationDetailPage: {
    component: lazy(() => import("../../pages/global/NotificationPage").then(module => ({ default: module.NotificationDetailPage }))),
    isProtected: true,
  },
  billingPage: {
    component: lazy(() => import("../../pages/global/BillingPage/pages/BillingPage")),
    isProtected: true,
  },
  invoicePage: {
    component: lazy(() => import("../../pages/global/InvoicePage/pages/InvoicePage")),
    isProtected: true,
  },
  accountPage: {
    component: lazy(() => import("../../pages/anggota/AccountPage/AccountPage")),
    isProtected: true,
  },
  transactionDetailPage: {
    component: lazy(() => import("../../pages/global/transaction/TransactionDetailPage")),
    isProtected: true,
  },
};

export default globalRoutes;
