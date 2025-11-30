// RouterConfig.jsx (DIKOREKSI)
import { createBrowserRouter, Navigate } from "react-router-dom";
import { jwtEncode } from "./helpers";
import { EncryptedPage } from "./EncryptedPage";
import PAGE_COMPONENTS from "./PageRoutes";
import globalRoutes from "./pages/globalRoutes";

// Hapus baris const SplashScreen = globalRoutes.splash;

const router = createBrowserRouter([
  {
    path: "/",
    // ✅ Ganti merender komponen langsung menjadi navigasi (redirect) ke token terenkripsi
    element: (
      <Navigate to={`/${jwtEncode({ page: "globalSplash" })}`} replace />
    ),
  },
  // ... (Sisa router tetap sama)
  {
    path: "/:token",
    element: <EncryptedPage />,
  },
]);

export default router;
