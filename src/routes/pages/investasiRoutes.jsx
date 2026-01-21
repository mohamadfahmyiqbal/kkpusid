// src\routes\pages\investasiRoutes.jsx
import { lazy } from "react";

const InvestasiDashboardPage = lazy(() =>
  import("../../pages/investasi/InvestasiDashboardPage")
);

const investasiRoutes = {
  investasiPage: InvestasiDashboardPage,
};

export default investasiRoutes;
