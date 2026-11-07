import { lazy } from "react";
const anggotaRoutes = {
  accountPage: {
    component: lazy(() => import("../../pages/anggota/account-page/AccountPage")),
    isProtected: true,
  },
  registrationPage: {
    component: lazy(() => import("../../pages/anggota/registration-page/RegistrationPage")),
    isProtected: true,
  },
  registrationFormDetail: {
    component: lazy(() => import("../../pages/anggota/registration-form-detail/RegistrationFormDetail")),
    isProtected: true,
  },
  registrationSummary: {
    component: lazy(() => import("../../pages/anggota/registration-summary/RegistrationSummary")),
    isProtected: true,
  },
  resignationCheck: {
    component: lazy(() => import("../../pages/anggota/resignation-check-page/ResignationCheckPage")),
    isProtected: true,
  },
  detailPendaftaranAnggota: {
    component: lazy(() => import("../../pages/anggota/DetailPendaftaranAnggota")),
    isProtected: true,
  },
};

export default anggotaRoutes;
