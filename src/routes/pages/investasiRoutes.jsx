import { lazy } from "react";

const investasiRoutes = {
  investasiPage: {
    component: lazy(
      () => import("../../pages/investasi/InvestasiDashboardPage"),
    ),
    isProtected: true,
  },
  investasiHalal: {
    component: lazy(
      () => import("../../pages/investasi/InvestasiHalal/InvestasiHalal"),
    ),
    isProtected: true,
  },
  detailSukuk: {
    component: lazy(
      () => import("../../pages/investasi/DetailSukuk/DetailSukuk"),
    ),
    isProtected: true,
  },
  pendanaanSyariah: {
    component: lazy(
      () => import("../../pages/investasi/PendanaanSyariah/PendanaanSyariah"),
    ),
    isProtected: true,
  },
  formPendanaanSyariah: {
    component: lazy(
      () =>
        import("../../pages/investasi/FormPendanaanSyariah/FormPendanaanSyariah"),
    ),
    isProtected: true,
  },
};

export default investasiRoutes;
