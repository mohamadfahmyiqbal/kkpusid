import anggotaRoutes from "./pages/anggotaRoutes";
import globalRoutes from "./pages/globalRoutes";
import JBRoutes from "./pages/JBRoutes";
import ProgramRoutes from "./pages/ProgramRoutes";
import simpananRoutes from "./pages/simpananRoutes";

const PAGE_COMPONENTS = {
  ...globalRoutes,
  ...anggotaRoutes,
  ...simpananRoutes,
  ...JBRoutes,
  ...ProgramRoutes,
};

export default PAGE_COMPONENTS;
