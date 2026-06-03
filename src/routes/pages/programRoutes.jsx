import { lazy } from "react";

const programRoutes = {
  programPage: {
    component: lazy(() => import("../../pages/program/ProgramPage")),
    isProtected: true,
  },
  formPengajuanPinjaman: {
    component: lazy(
      () => import("../../pages/program/pinjaman/FormPengajuanPinjaman"),
    ),
    isProtected: true,
  },
  pinjamanDetailPage: {
    component: lazy(
      () => import("../../pages/program/pinjaman/PinjamanDetailPage"),
    ),
    isProtected: true,
  },
  pinjamanReceiptPage: {
    component: lazy(
      () => import("../../pages/program/pinjaman/PinjamanReceiptPage"),
    ),
    isProtected: true,
  },
  arisanPage: {
    component: lazy(() => import("../../pages/program/arisan/ArisanPage")),
    isProtected: true,
  },
  arisanJoinPage: {
    component: lazy(() => import("../../pages/program/arisan/ArisanJoinPage")),
    isProtected: true,
  },
  arisanConfirmationPage: {
    component: lazy(
      () => import("../../pages/program/arisan/ArisanConfirmationPage"),
    ),
    isProtected: true,
  },
  formPengajuanArisan: {
    component: lazy(
      () => import("../../pages/program/arisan/FormPengajuanArisan"),
    ),
    isProtected: true,
  },
  arisanDetailPage: {
    component: lazy(
      () => import("../../pages/program/arisan/ArisanDetailPage"),
    ),
    isProtected: true,
  },
};

export default programRoutes;
