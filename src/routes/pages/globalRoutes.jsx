import LoginScreen from "../../pages/global/LoginScreen";
import DashboardScreen from "../../pages/global/DashboardScreen";
import SplashScreen from "../../pages/global/SplashScreen";
import LandingScreen from "../../pages/global/LandingScreen";
import ForgotScreen from "../../pages/global/ForgotScreen";
import RegisterScreen from "../../pages/global/RegisterScreen";
import OTPScreen from "../../pages/global/OTPScreen";
import ResetPasswordScreen from "../../pages/global/ResetPasswordScreen";
import InvoiceScreen from "../../pages/global/InvoiceScreen";
import TagihanScreen from "../../pages/global/TagihanScreen";
import TestDataScreen from "../../pages/global/TestDataScreen";
import NotificationScreen from "../../pages/global/NotificationScreen";

export default {
  splash: SplashScreen, // ini bisa digunakan langsung di RouterConfig.js untuk root "/"
  landing: LandingScreen, // ini bisa digunakan langsung di RouterConfig.js untuk root "/"
  login: LoginScreen,
  forgot: ForgotScreen,
  verifikasiOTP: OTPScreen,
  resetPasswordScreen: ResetPasswordScreen,
  register: RegisterScreen,
  dashboard: DashboardScreen,
  notifikasi: NotificationScreen,
  invoice: InvoiceScreen,
  tagihan: TagihanScreen,
  testdata: TestDataScreen,
};
