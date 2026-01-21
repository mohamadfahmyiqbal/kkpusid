import React, { useMemo } from "react";
import { useProfile } from "../../../contexts/ProfileContext";
import { Spinner, Alert, Badge, Button } from "react-bootstrap";
import { FaInfoCircle, FaLock } from "react-icons/fa";

import RegistrationCard from "../../../components/dashboard/RegistrationCard";
import EvaluasiSection from "../../../components/dashboard/EvaluasiSection";
import FinancialSection from "../../../components/dashboard/FinancialSection";
import TagihanSection from "../../../components/dashboard/TagihanSection";
import PortofolioSection from "../../../components/dashboard/PortofolioSection";
import MainMenuSection from "../../../components/dashboard/MainMenuSection";
import ArtikelSection from "../../../components/dashboard/ArtikelSection";
import WelcomeGreeting from "../../../components/dashboard/WelcomeGreeting.jsx";

const DashboardPage = () => {
  const { userData, loading } = useProfile();

  const roleConfigs = useMemo(() => {
    if (!userData) return null;
    const roleId = parseInt(userData.status_id, 10) || 1;

    return {
      roleId,
      isCandidate: roleId === 1,
      isManagement: roleId >= 2 && roleId <= 4,
      isFullMember: roleId >= 2,
      isReguler: roleId === 5,
      isALB: roleId === 6,
    };
  }, [userData]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!userData || !roleConfigs) {
    return (
      <div className="container-fluid p-5 text-center">
        <Alert variant="danger">
          Sesi Anda tidak valid atau gagal memuat profil.
        </Alert>
        <Button onClick={() => window.location.reload()}>
          Refresh Halaman
        </Button>
      </div>
    );
  }

  const { isCandidate, isManagement, isFullMember, isReguler, isALB } =
    roleConfigs;

  return (
    <div className="container-fluid pb-5 animated fadeIn">
      <WelcomeGreeting name={userData.full_name} />

      {isCandidate && (
        <section className="mb-4">
          <RegistrationCard user={userData} />
          <TagihanSection />
        </section>
      )}

      {isALB && (
        <Alert
          variant="info"
          className="border-0 shadow-sm mb-4 d-flex align-items-center rounded-3"
        >
          <FaInfoCircle className="me-2" />
          <span>
            Anda login sebagai <Badge bg="info">Anggota Luar Biasa (ALB)</Badge>
          </span>
        </Alert>
      )}

      {isFullMember ? (
        <div className="animated slideInUp">
          <FinancialSection />
          <MainMenuSection
            user={userData}
            isALB={isALB}
            isReguler={isReguler}
            isManagement={isManagement}
          />
          <TagihanSection />
        </div>
      ) : (
        !isCandidate && (
          <Alert variant="warning" className="border-0 shadow-sm mb-4">
            <FaLock className="me-2" />
            Fitur operasional akan terbuka otomatis setelah status keanggotaan
            aktif.
          </Alert>
        )
      )}

      <div className="row mt-4">
        <div className="col-lg-8">
          <EvaluasiSection />
          {isFullMember && <PortofolioSection />}
        </div>
        <div className="col-lg-4">
          <ArtikelSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
