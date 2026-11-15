import { lazy } from "react";

const jualbeliRoutes = {
  jualBeliPage: {
    component: lazy(() => import("../../pages/jualBeli/JualBeliDashboardPage")),
    isProtected: true,
  },
  formPengajuanTransaksi: {
    component: lazy(() => import("../../pages/jualBeli/FormPengajuanJualBeli")),
    isProtected: true,
  },
  pelunasanPage: {
    component: lazy(() => import("../../pages/jualBeli/PelunasanPage")),
    isProtected: true,
  },
};

export default jualbeliRoutes;
