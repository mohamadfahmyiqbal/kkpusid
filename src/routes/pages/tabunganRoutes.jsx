import { lazy } from "react";

const tabunganRoutes = {
  tabunganPage: {
    component: lazy(() => import("../../pages/tabungan/TabunganPage")),
    isProtected: true,
  },
  formPengajuanTabungan: {
    component: lazy(
      () =>
        import("../../pages/tabungan/FormPengajuanTabungan/FormPengajuanTabungan"),
    ),
    isProtected: true,
  },
  detailTabungan: {
    component: lazy(
      () => import("../../pages/tabungan/DetailTabungan/DetailTabungan"),
    ),
    isProtected: true,
  },
  setoranTabungan: {
    component: lazy(
      () => import("../../pages/tabungan/SetoranTabungan/SetoranTabungan"),
    ),
    isProtected: true,
  },
  penarikanTabunganPage: {
    component: lazy(
      () => import("../../pages/tabungan/PenarikanTabunganPage/PenarikanTabunganPage"),
    ),
    isProtected: true,
  },
};

export default tabunganRoutes;
