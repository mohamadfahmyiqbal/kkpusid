import AccountRegisterPage from "../../pages/auth/AccountRegisterPage/pages/AccountRegisterPage";
import ForgotOtpPage from "../../pages/auth/ForgotOtpPage/ForgotOtpPage";
import ForgotPasswordPage from "../../pages/auth/ForgotPasswordPage/ForgotPasswordPage";
import LoginPage from "../../pages/auth/LoginPage/LoginPage";
import ResetPasswordPage from "../../pages/auth/ResetPasswordPage/ResetPasswordPage";
import DashboardPage from "../../features/dashboard/page/DashboardPage";

const authRoutes = {
  accountRegisterPage: AccountRegisterPage,
  authLogin: LoginPage,
  authForgotPassword: ForgotPasswordPage,
  authForgotOtp: ForgotOtpPage,
  authResetPassword: ResetPasswordPage,

  // Routes Dashboard (Baru)
  dashboard: DashboardPage, // <--- Route Dashboard
  // Tambahkan halaman lain dari folder auth di sini
};

export default authRoutes;
