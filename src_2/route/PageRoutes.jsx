// src/route/PageRoutes.jsx
import AuthPages from "./pages/AuthPages";
import DashboardPages from "./pages/DashboardPages";
import InvestasiPages from "./pages/InvestasiPages";
import KeranjangPages from "./pages/KeranjangPages";
import LandingPages from "./pages/LandingPages";
import ProgramPages from "./pages/ProgramPages";
import SimpananPages from "./pages/SimpananPages";
import SplashPages from "./pages/SplashPages";
import TabunganPages from "./pages/TabunganPages";
import TrainingPages from "./pages/TrainingPages";
import TransaksiPages from "./pages/TransaksiPages";
import AnggotaPages from "./pages/AnggotaPages";

const PAGE_COMPONENT = {
  ...AuthPages,
  ...DashboardPages,
  ...InvestasiPages,
  ...KeranjangPages,
  ...LandingPages,
  ...ProgramPages,
  ...SimpananPages,
  ...SplashPages,
  ...TabunganPages,
  ...TrainingPages,
  ...TransaksiPages,
  ...AnggotaPages,
};

export default PAGE_COMPONENT;
