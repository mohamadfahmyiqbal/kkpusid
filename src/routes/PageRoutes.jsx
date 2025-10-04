import anggotaRoutes from "./pages/anggotaRoutes";
import globalRoutes from "./pages/globalRoutes";
import simpananRoutes from "./pages/simpananRoutes";

const PAGE_COMPONENTS = {
  ...globalRoutes,
  ...anggotaRoutes,
  ...simpananRoutes,
};

export default PAGE_COMPONENTS;
