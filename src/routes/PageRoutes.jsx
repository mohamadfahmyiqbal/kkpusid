import globalRoutes from "./pages/globalRoutes";
import authRoutes from "./pages/authRoutes";
import anggotaRoutes from "./pages/anggotaRoutes";
import simpananRoutes from "./pages/simpananRoutes";
import jualBeliRoutes from "./pages/jualBeliRoutes";
import programRoutes from "./pages/ProgramRoutes";
import tabunganRoutes from "./pages/tabunganRoutes";
import investasiRoutes from "./pages/investasiRoutes";
import trainingRoutes from "./pages/trainingRoutes";

const PAGE_COMPONENTS = {
  ...globalRoutes,
  ...authRoutes,
  ...anggotaRoutes,
  ...simpananRoutes,
  ...jualBeliRoutes,
  ...programRoutes,
  ...tabunganRoutes,
  ...investasiRoutes,
  ...trainingRoutes,
};

export default PAGE_COMPONENTS;
