import AccountPage from "../../pages/anggota/AccountPage";
import BillingPage from "../../pages/global/BillingPage/BillingPage";
import InvoicePage from "../../pages/global/invoice/InvoicePage";
import LandingPage from "../../pages/global/landing/LandingPage";
import NotificationPage from "../../pages/global/NotificationPage";
import SplashScreen from "../../pages/global/SplashScreen";
import TransactionDetailPage from "../../pages/global/TransactionDetailPage";

const globalRoutes = {
  globalSplash: SplashScreen,
  landingPage: LandingPage,
  notificationPage: NotificationPage,
  billingPage: BillingPage,
  invoicePage: InvoicePage,
  accountPage: AccountPage,
  transactionDetailPage: TransactionDetailPage,
  // Tambahkan halaman lain dari folder global di sini
};

export default globalRoutes;
