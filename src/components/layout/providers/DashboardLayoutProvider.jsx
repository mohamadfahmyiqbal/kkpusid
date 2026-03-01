// src\components\layout\DashboardLayoutProvider.jsx
import React from "react";
import LayoutGlobal from "../components/LayoutGlobal";

const DashboardLayoutProvider = ({ children }) => {
  return <LayoutGlobal>{children}</LayoutGlobal>;
};

export default DashboardLayoutProvider;
