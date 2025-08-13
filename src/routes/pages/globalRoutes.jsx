import LoginScreen from "../../pages/global/LoginScreen";
import DashboardScreen from "../../pages/global/DashboardScreen";
import SplashScreen from "../../pages/global/SplashScreen";
import LandingScreen from "../../pages/global/LandingScreen";
import ForgotScreen from "../../pages/global/ForgotScreen";
import RegisterScreen from "../../pages/global/RegisterScreen";
import OTPScreen from "../../pages/global/OTPScreen";
import ResetPasswordScreen from "../../pages/global/ResetPasswordScreen";
import NotifikasiScreen from "../../pages/global/NotifikasiScreen";
import PusatTagihan from "../../pages/global/PusatTagihan";
import InvoiceScreen from "../../pages/global/InvoiceScreen";
import HistoryTransaksiscreen from "../../pages/global/HistoryTransaksiscreen";
import InvoiceMenungguPembayaran from "../../pages/global/InvoiceMenungguPembayaran";
import InvoicePembayaranBerhasilScreen from "../../pages/global/InvoicePembayaranBerhasilScreen";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  splash: SplashScreen, // ini bisa digunakan langsung di RouterConfig.js untuk root "/"
  landing: LandingScreen, // ini bisa digunakan langsung di RouterConfig.js untuk root "/"
  login: LoginScreen,
  forgot: ForgotScreen,
  verifikasiOTP: OTPScreen,
  resetPasswordScreen: ResetPasswordScreen,
  register: RegisterScreen,
  dashboard: DashboardScreen,
  notifikasi: NotifikasiScreen,
  PusatTagihan: PusatTagihan,
  HistoryTransaksiscreen: HistoryTransaksiscreen,
  InvoiceScreen: InvoiceScreen,
  InvoiceMenungguPembayaran: InvoiceMenungguPembayaran,
  InvoicePembayaranBerhasilScreen: InvoicePembayaranBerhasilScreen,
};
