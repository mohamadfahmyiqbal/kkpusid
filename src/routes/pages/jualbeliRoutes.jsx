import { lazy } from "react";

const jualbeliRoutes = {
  jualBeliPage: {
    component: lazy(() => import("../../pages/jualbeli/JualBeliDashboardPage")),
    isProtected: true,
  },
  formPengajuanTransaksi: {
    component: lazy(() => import("../../pages/jualbeli/FormPengajuanJualBeli")),
    isProtected: true,
  },
  pelunasanPage: {
    component: lazy(() => import("../../pages/jualbeli/PelunasanPage")),
    isProtected: true,
  },
};

export default jualbeliRoutes;
