import anggotaRoutes from "./pages/anggotaRoutes";
import globalRoutes from "./pages/globalRoutes";
import JBRoutes from "./pages/JBRoutes";
import simpananRoutes from "./pages/simpananRoutes";

const PAGE_COMPONENTS = {
  ...globalRoutes,
  ...anggotaRoutes,
  ...simpananRoutes,
  ...JBRoutes,
};

export default PAGE_COMPONENTS;
