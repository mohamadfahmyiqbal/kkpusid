import { createBrowserRouter, Navigate } from "react-router-dom";
import SplashRoutes from "./pages/SplashPages";
import PAGE_COMPONENT from "./PageRoutes"; // Assuming this is the correct import
import { jwtEncode } from "./helper"; // Assuming this is the correct import
import { EncryptedPages } from "./EncryptedPages"; // Assuming this is the correct import
import SplashPage from "../page/Splash/SplashPage";

const SplashScreen = SplashRoutes.splash;

const routers = createBrowserRouter([
  {
    path: "/",
    element: <SplashScreen />,
  },
  // Redirect otomatis ke /page/:token berdasarkan nama halaman
  ...Object.keys(PAGE_COMPONENT).map((key) => ({
    path: `/${key}`,
    element: <Navigate to={`/${jwtEncode({ page: key })}`} replace />,
  })),
  {
    path: "/:token",
    element: <EncryptedPages />,
  },
]);

export default routers;
