import LoginPage from "../../pages/auth/LoginPage";
import SplashScreen from "../../pages/global/SplashScreen";
import TransaksiMainPage from "../../pages/transaksi/TransaksiMainPage";

// Menggunakan format yang konsisten (key: Component)
export default {
  // Wajib ada karena diimpor di RouterConfig.jsx
  splash: SplashScreen,

  // Rute Global lainnya
  login: LoginPage,
  transaksiMain: TransaksiMainPage,
};
