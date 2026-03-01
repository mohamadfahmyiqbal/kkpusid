import AccountPage from "../../pages/anggota/AccountPage/AccountPage";
import BillingPage from "../../pages/global/BillingPage/pages/BillingPage";
import InvoicePage from "../../pages/global/InvoicePage/pages/InvoicePage";
import LandingPage from "../../pages/global/LandingPage/LandingPage";
import NotificationPage, {
  NotificationDetailPage,
} from "../../pages/global/NotificationPage";
import SplashPage from "../../pages/global/SplashPage/page/SplashPage";
import TransactionDetailPage from "../../pages/global/transaction/TransactionDetailPage";

const globalRoutes = {
  globalSplash: SplashPage,
  landingPage: LandingPage,
  notificationPage: NotificationPage,
  notificationDetailPage: NotificationDetailPage,
  billingPage: BillingPage,
  invoicePage: InvoicePage,
  accountPage: AccountPage,
  transactionDetailPage: TransactionDetailPage,

  // Tambahkan halaman lain dari folder global di sini
};

export default globalRoutes;
