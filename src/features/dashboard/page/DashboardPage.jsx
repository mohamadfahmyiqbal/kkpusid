import React from "react";
import { useProfile } from "../../../components/layout/contexts";
import { Spinner, Alert, Badge, Button } from "react-bootstrap";
import { FaInfoCircle, FaLock } from "react-icons/fa";
import { useDashboardRole } from "../hooks/useDashboardRole";

import RegistrationCard from "../components/RegistrationCard";
import EvaluasiSection from "../components/EvaluasiSection";
import FinancialSection from "../components/FinancialSection";
import TagihanSection from "../components/TagihanSection";
import PortofolioSection from "../components/PortofolioSection";
import MainMenuSection from "../components/MainMenuSection";
import ArtikelSection from "../components/ArtikelSection";
import WelcomeGreeting from "../components/WelcomeGreeting.jsx";

const DashboardPage = () => {
  const { userData, loading } = useProfile();
  const roleConfigs = useDashboardRole(userData);

  if (loading) {
    return (
      <div className="dashboard-loading d-flex justify-content-center align-items-center">
        <div
          className="card border-0 shadow-sm"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <div className="card-body p-4 text-center">
            <div className="placeholder-glow mb-3">
              <div className="placeholder col-6 mb-2"></div>
              <div className="placeholder col-4 mb-4"></div>
              <div className="placeholder col-12 mb-2"></div>
              <div className="placeholder col-8 mb-2"></div>
              <div className="placeholder col-10 mb-3"></div>
            </div>
            <Spinner animation="border" variant="primary" size="sm" />
            <small className="d-block mt-2 text-muted">
              Memuat dashboard...
            </small>
          </div>
        </div>
      </div>
    );
  }

  if (!userData || !roleConfigs) {
    return (
      <div className="container-fluid p-5 text-center">
        <Alert variant="danger" aria-live="polite">
          Sesi Anda tidak valid atau gagal memuat profil.
        </Alert>
        <Button onClick={() => window.location.reload()}>
          Refresh Halaman
        </Button>
      </div>
    );
  }

  const { isCandidate, isFullMember, isALB } = roleConfigs;

  return (
    <React.Fragment>
      <div className="container-fluid pb-5 dash-fade-in dashboard-shell">
        <WelcomeGreeting />

        <RegistrationCard user={userData} />

        {isALB && (
          <Alert
            variant="info"
            className="border-0 shadow-sm mb-4 d-flex align-items-center rounded-3"
          >
            <FaInfoCircle className="me-2" />
            <span>
              Anda login sebagai{" "}
              <Badge bg="info">Anggota Luar Biasa (ALB)</Badge>
            </span>
          </Alert>
        )}

        {isFullMember ? (
          <div className="dash-slide-up mb-4">
            <FinancialSection />
            <MainMenuSection isALB={isALB} />
            <TagihanSection />
          </div>
        ) : (
          !isCandidate && (
            <Alert
              variant="warning"
              className="border-0 shadow-sm mb-4"
              aria-live="polite"
            >
              <FaLock className="me-2" />
              Fitur operasional akan terbuka otomatis setelah status keanggotaan
              aktif.
            </Alert>
          )
        )}

        <div className="row mt-4 g-4 mb-4">
          <div className="col-lg-8">
            <EvaluasiSection />
            {isFullMember && <PortofolioSection />}
          </div>
          <div className="col-lg-4">
            <ArtikelSection />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPage;
