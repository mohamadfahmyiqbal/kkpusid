import React from "react";
import { useProfile } from "../../../contexts/ProfileContext";
import { Spinner, Alert, Badge } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

// --- Import Komponen Dashboard ---
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

  // Guard Clause: Loading State untuk mencegah error undefined
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

  if (!userData) {
    return (
      <div className="container-fluid p-5">
        <Alert variant="danger">
          Gagal memuat profil. Silakan coba login kembali.
        </Alert>
      </div>
    );
  }

  const statusId = parseInt(userData.status_id) || 0;
  const roleId = parseInt(userData.role) || 0;

  const isCandidate = statusId <= 1;
  const isFullMember = statusId >= 2;
  const isManagement = roleId >= 2 && roleId <= 4;
  const isReguler = roleId === 5;
  const isALB = roleId === 6;

  return (
    <div className="container-fluid pb-5 animated fadeIn">
      <WelcomeGreeting name={userData.full_name} />

      {/* --- AREA KONDISIONAL BERDASARKAN ROLE & STATUS --- */}

      {isCandidate && (
        <section className="mb-4">
          <RegistrationCard user={userData} />
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

      {isFullMember && (
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
