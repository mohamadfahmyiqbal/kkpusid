// src/pages/anggota/RegistrationPage/pages/RegistrationPage.jsx

import React, { useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import NotificationPrompt from "../../../../components/ui/NotificationPrompt";
import RegistrationSummary from "../../../../pages/anggota/RegistrationSummary";
import useRegistrationStatus from "../hooks/useRegistrationStatus";
import InstructionsCard from "../components/registrationForm/InstructionsCard";
import RequirementsCard from "../components/registrationForm/RequirementsCard";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const { isRegistered, registrationData, loading } = useRegistrationStatus();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleBackToDashboard = useCallback(() => {
    navigate(`/${jwtEncode({ page: "dashboard" })}`);
  }, [navigate]);

  const handleFillForm = useCallback(() => {
    navigate(`/${jwtEncode({ page: "registrationFormDetail" })}`);
  }, [navigate]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  if (isRegistered && registrationData) {
    return (
      <>
        {registrationData.final_status !== "APPROVED" && (
          <NotificationPrompt memberId={registrationData.registration_id} />
        )}
        <RegistrationSummary
          data={registrationData}
          onBackToDashboard={handleBackToDashboard}
          baseUrl={BASE_URL}
        />
      </>
    );
  }

  return (
    <div className="container-fluid pb-5 dash-fade-in dashboard-shell">
      <div className="row justify-content-center px-3">
        <div className="col-xl-10">
          <div className="row g-4">
            <div className="col-lg-7">
              <InstructionsCard onFillForm={handleFillForm} />
            </div>

            <div className="col-lg-5">
              <RequirementsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
