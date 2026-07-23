import { lazy } from "react";
const anggotaRoutes = {
  accountPage: {
    component: lazy(() => import("../../pages/anggota/AccountPage/AccountPage")),
    isProtected: true,
  },
  registrationPage: {
    component: lazy(() => import("../../pages/anggota/RegistrationPage/pages/RegistrationPage")),
    isProtected: true,
  },
  registrationFormDetail: {
    component: lazy(() => import("../../pages/anggota/RegistrationFormDetail/pages/RegistrationFormDetail")),
    isProtected: true,
  },
  registrationSummary: {
    component: lazy(() => import("../../pages/anggota/RegistrationSummary")),
    isProtected: true,
  },
  resignationCheck: {
    component: lazy(() => import("../../pages/anggota/ResignationCheckPage/ResignationCheckPage")),
    isProtected: true,
  },
};

export default anggotaRoutes;
