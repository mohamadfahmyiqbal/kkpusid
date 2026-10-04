import { lazy } from "react";

const authRoutes = {
  accountRegisterPage: {
    component: lazy(
      () => import("../../features/auth/page/AccountRegisterPage"),
    ),
    isProtected: false,
  },
  authLogin: {
    component: lazy(() => import("../../features/auth/login/page/LoginPage")),
    isProtected: false,
  },
  authForgotPassword: {
    component: lazy(
      () =>
        import("../../features/auth/forgot-password/page/ForgotPasswordPage"),
    ),
    isProtected: false,
  },
  authForgotOtp: {
    component: lazy(
      () => import("../../features/auth/forgot-password/page/ForgotOtpPage"),
    ),
    isProtected: false,
  },
  authResetPassword: {
    component: lazy(
      () =>
        import("../../features/auth/forgot-password/page/ResetPasswordPage"),
    ),
    isProtected: false,
  },
  dashboard: {
    component: lazy(
      () => import("../../features/dashboard/page/DashboardPage"),
    ),
    isProtected: true,
  },
};

export default authRoutes;
