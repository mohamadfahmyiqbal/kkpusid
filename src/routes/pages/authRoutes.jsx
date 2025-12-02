import ForgotOtpPage from "../../pages/auth/ForgotOtpPage";
import ForgotPasswordPage from "../../pages/auth/ForgotPasswordPage";
import LoginPage from "../../pages/auth/LoginPage";
import ResetPasswordPage from "../../pages/auth/ResetPasswordPage";
import DashboardPage from "../../pages/global/dashboard/DashboardPage";

const authRoutes = {
  authLogin: LoginPage,
  authForgotPassword: ForgotPasswordPage,
  authForgotOtp: ForgotOtpPage,
  authResetPassword: ResetPasswordPage,

  // Routes Dashboard (Baru)
  dashboard: DashboardPage, // <--- Route Dashboard
  // Tambahkan halaman lain dari folder auth di sini
};

export default authRoutes;
