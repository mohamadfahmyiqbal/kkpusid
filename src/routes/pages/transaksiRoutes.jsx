import React, { lazy } from "react";

const transaksiRoutes = {
  transaksiPage: {
    component: lazy(() => import("../../pages/transaksi/TransaksiDashboardPage")),
    isProtected: true,
  },
  formPengajuanTransaksi: {
    component: lazy(() => import("../../pages/transaksi/FormPengajuanTransaksi")),
    isProtected: true,
  },
};

export default transaksiRoutes;
