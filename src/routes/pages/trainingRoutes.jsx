import { lazy } from "react";

const trainingRoutes = {
  trainingPage: {
    component: lazy(() => import("../../pages/training/TrainingDashboardPage")),
    isProtected: true,
  },
  detailMateri: {
    component: lazy(
      () => import("../../pages/training/DetailMateri/DetailMateri"),
    ),
    isProtected: true,
  },
  evaluasi: {
    component: lazy(() => import("../../pages/training/Evaluasi/Evaluasi")),
    isProtected: true,
  },
  ranking: {
    component: lazy(() => import("../../pages/training/Ranking/Ranking")),
    isProtected: true,
  },
  bacaMateri: {
    component: lazy(() => import("../../pages/training/BacaMateri/BacaMateri")),
    isProtected: true,
  },
};

export default trainingRoutes;
