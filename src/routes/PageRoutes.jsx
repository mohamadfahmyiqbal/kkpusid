import globalRoutes from "./pages/globalRoutes";
import authRoutes from "./pages/authRoutes";
import anggotaRoutes from "./pages/anggotaRoutes";
import simpananRoutes from "./pages/simpananRoutes";
import transaksiRoutes from "./pages/transaksiRoutes";
import programRoutes from "./pages/programRoutes";
import tabunganRoutes from "./pages/tabunganRoutes";
import investasiRoutes from "./pages/investasiRoutes";
import trainingRoutes from "./pages/trainingRoutes";

const PAGE_COMPONENTS = {
  ...globalRoutes,
  ...authRoutes,
  ...anggotaRoutes,
  ...simpananRoutes,
  ...transaksiRoutes,
  ...programRoutes,
  ...tabunganRoutes,
  ...investasiRoutes,
  ...trainingRoutes,
};

export default PAGE_COMPONENTS;
