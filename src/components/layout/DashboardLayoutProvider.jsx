// src/components/layout/DashboardLayoutProvider.jsx
import React from "react";
import { ProfileProvider } from "../../contexts/ProfileContext";
import DashboardLayout from "./DashboardLayout";

const DashboardLayoutProvider = ({ children }) => {
  return (
    <ProfileProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </ProfileProvider>
  );
};

export default DashboardLayoutProvider;
