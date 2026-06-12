import globalRoutes from "./pages/globalRoutes";
import authRoutes from "./pages/authRoutes";
import anggotaRoutes from "./pages/anggotaRoutes";
import simpananRoutes from "./pages/simpananRoutes";
import jualbeliRoutes from "./pages/jualbeliRoutes";
import programRoutes from "./pages/programRoutes";
import tabunganRoutes from "./pages/tabunganRoutes";
import investasiRoutes from "./pages/investasiRoutes";
import trainingRoutes from "./pages/trainingRoutes";

const PAGE_COMPONENTS = {
  ...globalRoutes,
  ...authRoutes,
  ...anggotaRoutes,
  ...simpananRoutes,
  ...jualbeliRoutes,
  ...programRoutes,
  ...tabunganRoutes,
  ...investasiRoutes,
  ...trainingRoutes,
};

export default PAGE_COMPONENTS;
