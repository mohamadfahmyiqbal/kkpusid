// src\components\layout\DashboardLayoutProvider.jsx
import React from "react";
import DashboardLayout from "./DashboardLayout";

const DashboardLayoutProvider = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardLayoutProvider;
