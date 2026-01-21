// src\routes\pages\trainingRoutes.jsx
import { lazy } from "react";

const TrainingDashboardPage = lazy(() =>
  import("../../pages/training/TrainingDashboardPage")
);

const trainingRoutes = {
  trainingPage: TrainingDashboardPage,
};

export default trainingRoutes;
