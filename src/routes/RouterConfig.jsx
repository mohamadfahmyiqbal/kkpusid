import { createBrowserRouter, Navigate } from "react-router-dom";
import { jwtEncode } from "./helpers";
import { EncryptedPage } from "./EncryptedPage";
import PAGE_COMPONENTS from "./PageRoutes";
import globalRoutes from "./pages/globalRoutes";

const SplashScreen = globalRoutes.splash;

const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  // Redirect otomatis ke /page/:token berdasarkan nama halaman
  ...Object.keys(PAGE_COMPONENTS).map((key) => ({
    path: `/${key}`,
    element: <Navigate to={`/page/${jwtEncode({ page: key })}`} replace />,
  })),
  {
    path: "/page/:token",
    element: <EncryptedPage />,
  },
]);

export default router;
