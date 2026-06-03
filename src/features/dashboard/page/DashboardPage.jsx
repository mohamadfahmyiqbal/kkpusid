import React, { useMemo, useCallback } from "react";
import {
  FaUser,
  FaBriefcase,
  FaShieldAlt,
  FaClipboardList,
  FaUpload,
  FaComments,
} from "react-icons/fa";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../components/layout/contexts/ProfileContext";
import { useDashboardRole } from "../hooks/useDashboardRole";
import useRegistrationStatus from "../../../pages/anggota/RegistrationPage/hooks/useRegistrationStatus";
import FinancialSection from "../components/FinancialSection";
import MainMenuSection from "../components/MainMenuSection";
import TagihanSection from "../components/TagihanSection";
import DashboardSkeleton from "../components/DashboardSkeleton";
import DateTimeCard from "../components/DateTimeCard";
import CandidateStepsCard from "../components/CandidateStepsCard";
import TrainingCardSection from "../components/TrainingCardSection";
import ArticleCardSection from "../components/ArticleCardSection";
import NextStepsCard from "../components/NextStepsCard";
import { jwtEncode } from "../../../utils/helpers";
import { getSafeDisplayName } from "../../../utils/sanitization";
import {
  TRAINING_DATA,
  ARTICLE_DATA,
} from "../constants/dashboardData";
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { userData, loading: profileLoading } = useProfile();
  const roleConfigs = useDashboardRole(userData);
  const {
    isRegistered,
    registrationData,
    loading: registrationLoading,
  } = useRegistrationStatus();

  // Memoized role flags
  const isCandidate = useMemo(
    () => roleConfigs?.isCandidate ?? true,
    [roleConfigs],
  );
  const isALB = useMemo(() => roleConfigs?.isALB ?? false, [roleConfigs]);

  // Greeting name
  const safeGreetingName = useMemo(() => {
    if (!userData?.full_name) {
      return userData?.email?.split("@")[0] || "Anggota";
    }
    return getSafeDisplayName(userData.full_name);
  }, [userData]);

  // Steps for Candidate Registration Status
  const steps = useMemo(() => {
    const isDone = isRegistered;
    const finalStatus = registrationData?.final_status || "PENDING";
    const isApproved = finalStatus === "APPROVED";

    return [
      {
        no: 1,
        title: "Buat Akun",
        desc: "Selesai",
        status: "done",
        icon: <FaUser />,
      },
      {
        no: 2,
        title: "Daftar Menjadi Anggota",
        desc: isDone ? "Selesai" : "Belum Lengkap",
        status: isDone ? "done" : "active",
        icon: <FaClipboardList />,
      },
      {
        no: 3,
        title: "Approval",
        desc: isApproved
          ? "Disetujui"
          : isDone
          ? "Proses Verifikasi"
          : "Menunggu",
        status: isApproved ? "done" : isDone ? "active" : "pending",
        icon: <FaShieldAlt />,
      },
      {
        no: 4,
        title: "Menjadi Anggota Koperasi",
        desc: isApproved ? "Selesai" : "Menunggu",
        status: isApproved ? "done" : "pending",
        icon: <FaUser />,
      },
    ];
  }, [isRegistered, registrationData]);

  // Next steps navigation items
  const nextSteps = useMemo(
    () => [
      {
        icon: <FaClipboardList />,
        title: "Lengkapi Data Usaha",
        desc: "Isi informasi detail usaha Anda",
        pageKey: isCandidate ? "registrationFormDetail" : "accountPage",
      },
      {
        icon: <FaUpload />,
        title: "Unggah Dokumen",
        desc: "Upload KTP, NPWP dan lainnya",
        pageKey: isCandidate ? "registrationFormDetail" : "accountPage",
      },
      {
        icon: <FaBriefcase />,
        title: "Ajukan Pembiayaan",
        desc: "Ajukan pembiayaan sesuai kebutuhan",
        pageKey: isCandidate ? "registrationPage" : "formPengajuanTransaksi",
      },
      {
        icon: <FaComments />,
        title: "Konsultasi Dengan Kami",
        desc: "Tim kami siap membantu Anda",
        link: "https://wa.me/6281234567890",
      },
    ],
    [isCandidate],
  );

  // Unified navigation handler
  const navigateToPage = useCallback(
    (pageKey) => {
      if (!pageKey) return;
      try {
        navigate(`/${jwtEncode({ page: pageKey })}`);
      } catch {
        navigate(`/${pageKey}`);
      }
    },
    [navigate],
  );

  // Step/link navigation handler
  const handleStepNavigation = useCallback(
    (pageKey, link) => {
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
        return;
      }
      navigateToPage(pageKey);
    },
    [navigateToPage],
  );

  const handleTrainingNavigation = useCallback(
    () => navigateToPage("trainingPage"),
    [navigateToPage],
  );

  const handleViewMateri = useCallback(
    (kurikulumId, type) => {
      try {
        navigate(
          `/${jwtEncode({ page: "detailMateri", kurikulumId, type })}`,
        );
      } catch {
        navigate("/detailMateri");
      }
    },
    [navigate],
  );

  const handleStartEvaluasi = useCallback(
    (kurikulumId, type) => {
      try {
        navigate(
          `/${jwtEncode({ page: "evaluasi", kurikulumId, type })}`,
        );
      } catch {
        navigate("/evaluasi");
      }
    },
    [navigate],
  );

  // Loading state
  if (profileLoading || (isCandidate && registrationLoading)) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dc-page-container">
      <Container fluid className="px-0">
        {/* ============================================ */}
        {/* HERO SECTION */}
        {/* ============================================ */}
        <Row className="g-4 mb-4">
          <Col xs={12} lg={8}>
            <Card className="dc-hero border-0 h-100">
              <Card.Body className="p-0">
                <h1>Assalamu'alaikum, {safeGreetingName}!</h1>
                <p>Selamat datang di Paguyuban Usaha Sukses.</p>
                <p>
                  {isCandidate
                    ? "Lengkapi data dan mulai perjalanan usaha bersama kami."
                    : "Kelola tabungan, pembiayaan, dan ikuti kurikulum usaha syariah secara mandiri."}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={4}>
            <DateTimeCard />
          </Col>
        </Row>

        {/* ============================================ */}
        {/* MAIN CONTENT GRID */}
        {/* ============================================ */}
        <Row className="g-4">
          {/* LEFT PANEL */}
          <Col xs={12} lg={8}>
            {isCandidate && (
              <CandidateStepsCard
                steps={steps}
                onNavigate={handleStepNavigation}
              />
            )}

            {!isCandidate && <FinancialSection />}
            <MainMenuSection isALB={isALB} isCandidate={isCandidate} />
            
            {!isCandidate && <TagihanSection />}

            <TrainingCardSection
              trainingData={TRAINING_DATA}
              onSeeAll={handleTrainingNavigation}
              onViewMateri={handleViewMateri}
              onStartEvaluasi={handleStartEvaluasi}
            />

            <ArticleCardSection
              articleData={ARTICLE_DATA}
              onSeeAll={handleTrainingNavigation}
            />
          </Col>

          {/* RIGHT PANEL */}
          <Col xs={12} lg={4}>
            <NextStepsCard
              nextSteps={nextSteps}
              onNavigate={handleStepNavigation}
            />

            <Card className="dc-support-box border-0">
              <Card.Body className="dc-support-content p-0">
                <h3>Butuh Bantuan?</h3>
                <p>
                  Tim kami siap membantu Anda dalam setiap langkah perjalanan
                  usaha Anda.
                </p>
                <Button
                  variant="primary"
                  onClick={() =>
                    window.open(
                      "https://wa.me/6281234567890",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  Hubungi Kami
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* SAFETY FOOTER */}
      <section className="dc-safe-bar">
        <FaShieldAlt />
        <strong>Aman & Terpercaya</strong>
        <span>
          Data Anda aman bersama kami dan semua transaksi sesuai prinsip
          syariah.
        </span>
      </section>
    </div>
  );
}