import React, { lazy } from "react";

const jualbeliRoutes = {
  jualBeliPage: {
    component: lazy(() => import("../../pages/jualbeli/JualBeliDashboardPage")),
    isProtected: true,
  },
  formPengajuanTransaksi: {
    component: lazy(() => import("../../pages/jualbeli/FormPengajuanJualBeli")),
    isProtected: true,
  },
};

export default jualbeliRoutes;
