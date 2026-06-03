import { lazy } from "react";

const simpananRoutes = {
  simpananDetailSaldo: {
    component: lazy(() => import("../../pages/simpanan/DetailSaldoPage/page/DetailSaldoPage")),
    isProtected: true,
  },
  simpananPage: {
    component: lazy(() => import("../../pages/simpanan/SimpananPage/page/SimpananPage")),
    isProtected: true,
  },
  penarikanSimpananPage: {
    component: lazy(() => import("../../pages/simpanan/PenarikanSimpananPage/PenarikanSimpananPage")),
    isProtected: true,
  },
};

export default simpananRoutes;
