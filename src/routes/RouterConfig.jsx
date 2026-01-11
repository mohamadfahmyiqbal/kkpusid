import { createBrowserRouter, Navigate } from "react-router-dom";
import { jwtEncode } from "./helpers";
import { EncryptedPage } from "./EncryptedPage";
import NavigationErrorBoundary from "../components/shared/NavigationErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavigationErrorBoundary>
        <Navigate to={`/${jwtEncode({ page: "globalSplash" })}`} replace />
      </NavigationErrorBoundary>
    ),
    errorElement: (
      <Navigate
        to={`/${jwtEncode({ page: "landingPage", _error: "route_root" })}`}
        replace
      />
    ),
  },
  {
    path: "/:token",
    element: (
      <NavigationErrorBoundary>
        <EncryptedPage />
      </NavigationErrorBoundary>
    ),
    errorElement: (
      <Navigate
        to={`/${jwtEncode({ page: "landingPage", _error: "route_token" })}`}
        replace
      />
    ),
  },
]);

export default router;
