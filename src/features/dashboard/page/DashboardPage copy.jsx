import React, { Suspense } from "react";
import { useProfile } from "../../../components/layout/contexts/index";
import { Spinner, Alert, Badge, Button } from "react-bootstrap";
import { FaInfoCircle, FaLock } from "react-icons/fa";
import { useDashboardRole } from "../hooks/useDashboardRole";

import RegistrationCard from "../components/RegistrationCard";
import {
  LazyFinancialSection,
  LazyMainMenuSection,
  LazyTagihanSection,
  LazyPortofolioSection,
  LazyEvaluasiSection,
  LazyArtikelSection,
  LoadingFallback,
} from "../components/LazySections";
import WelcomeGreeting from "../components/WelcomeGreeting.jsx";
import RoleBasedContent from "../components/RoleBasedContent";
import ALBAlert from "../components/ALBAlert";
import ErrorBoundary from "../components/ErrorBoundary";
import DashboardSkeleton from "../components/DashboardSkeleton";

const DashboardPage = () => {
  const { userData, loading, error } = useProfile();
  const roleConfigs = useDashboardRole(userData);

  if (loading) {
    return <DashboardSkeleton />;
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
    <ErrorBoundary>
      <div className="pb-5 dash-fade-in dashboard-shell">
        <WelcomeGreeting userData={userData} loading={loading} error={error} />

        <RegistrationCard user={userData} />

        <ALBAlert isALB={isALB} />

        <RoleBasedContent isFullMember={isFullMember} isCandidate={isCandidate}>
          <Suspense fallback={<LoadingFallback />}>
            <>
              <LazyFinancialSection />
              <LazyMainMenuSection isALB={isALB} />
              <LazyTagihanSection />
            </>
          </Suspense>
        </RoleBasedContent>

        <div className="row mt-4 g-4 mb-4">
          <div className="col-lg-8">
            <Suspense fallback={<LoadingFallback />}>
              <>
                <LazyEvaluasiSection />
                {isFullMember && <LazyPortofolioSection />}
              </>
            </Suspense>
          </div>
          <div className="col-lg-4">
            <Suspense fallback={<LoadingFallback />}>
              <LazyArtikelSection />
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(DashboardPage);
