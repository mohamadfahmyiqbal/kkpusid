// fe/src/pages/program/arisan/ArisanPage.jsx

import React, { useState, useCallback, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";

import ProgramAccountCard from "../../../components/program/ProgramAccountCard";
import { jwtEncode } from "../../../utils/helpers";
import { useProfile } from "../../../components/layout/contexts/ProfileContext";

import { getApiUrl } from "./components/arisanHelpers";
import ArisanProgramTabs from "./components/ArisanProgramTabs";
import ArisanSkeleton from "./components/ArisanSkeleton";
import AvailableArisanSection from "./components/AvailableArisanSection";
import ArisanHistoryTable from "./components/ArisanHistoryTable";

import "./ArisanPage.css";

export default function ArisanPage() {
  const navigate = useNavigate();
  const { userData } = useProfile();

  // Role check: status_id 2 (Pengawas), 3 (Ketua), 4 (Bendahara) can create
  const canCreate =
    !!userData && ["2", "3", "4"].includes(String(userData.status_id));

  const activeTab = "arisan";

  // Dynamic API state
  const [activeArisan, setActiveArisan] = useState(null);
  const [historyArisan, setHistoryArisan] = useState(null);
  const [availableArisans, setAvailableArisans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArisanData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      // 1. Fetch active user arisan
      const activeRes = await fetch(getApiUrl("program/arisan"), {
        method: "GET",
        headers,
      });

      if (!activeRes.ok) {
        throw new Error(`HTTP error! status: ${activeRes.status}`);
      }

      const activeResult = await activeRes.json();
      let hasActive = false;

      if (activeResult.success && activeResult.data) {
        if (activeResult.data.is_lunas) {
          setHistoryArisan(activeResult.data);
          setActiveArisan(null);
        } else {
          setActiveArisan(activeResult.data);
          setHistoryArisan(null);
          hasActive = true;
        }
      } else {
        setActiveArisan(null);
        setHistoryArisan(null);
      }

      // 2. Fetch available arisans only if no active arisan exists
      if (!hasActive) {
        const availableRes = await fetch(getApiUrl("program/arisan/available"), {
          method: "GET",
          headers,
        });

        if (!availableRes.ok) {
          throw new Error(`HTTP error! status: ${availableRes.status}`);
        }

        const availableResult = await availableRes.json();
        if (availableResult.success) {
          setAvailableArisans(availableResult.data || []);
        } else {
          throw new Error(availableResult.message || "Gagal memuat daftar arisan");
        }
      }
    } catch (err) {
      console.error("Error fetching arisan details:", err);
      setError("Gagal memuat data dari server. Menampilkan mode preview.");
      setAvailableArisans([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArisanData();
  }, [fetchArisanData]);

  // Handler untuk navigasi ke form pendaftaran arisan atau detail pengajuan
  const handleGabungArisan = useCallback(
    (arisanId) => {
      if (activeArisan?.is_pending && activeArisan?.financing_id) {
        const token = jwtEncode({
          page: "transactionDetailPage",
          financingId: activeArisan.financing_id,
        });
        navigate(`/${token}`);
        return;
      }

      const token = jwtEncode({
        page: "formPengajuanArisan",
        arisanId: arisanId,
      });
      navigate(`/${token}`);
    },
    [navigate, activeArisan]
  );

  // Handler untuk navigasi ke halaman Setoran
  const handleSetoran = useCallback(() => {
    const token = jwtEncode({ page: "billingPage", action: "setoranArisan" });
    navigate(`/${token}`);
  }, [navigate]);

  const handleHistoryDetail = useCallback(() => {
    if (historyArisan?.financing_id) {
      const token = jwtEncode({
        page: "transactionDetailPage",
        financingId: historyArisan.financing_id,
      });
      navigate(`/${token}`);
    }
  }, [historyArisan, navigate]);

  // Handle saat tab berubah (kembali ke ProgramPage)
  const handleTabChange = useCallback(
    (key) => {
      if (key === "pinjaman") {
        const token = jwtEncode({ page: "programPage" });
        navigate(`/${token}`);
      }
    },
    [navigate]
  );

  const renderArisanContent = () => {
    if (isLoading) {
      return <ArisanSkeleton />;
    }

    if (activeArisan) {
      const formattedAccountData = {
        nama: activeArisan.member_name || userData?.name || "Anggota Koperasi",
        produk: `${activeArisan.program_name} (${activeArisan.batch_name})`,
        akad: `No. Peserta: ${activeArisan.participant_no || "-"}`,
        tanggalBuka: activeArisan.created_at
          ? new Date(activeArisan.created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "-",
        saldoAkhir: new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(activeArisan.current_balance || 0),
        statusLabel: activeArisan.status_label || activeArisan.status || "Aktif",
        isApproved: activeArisan.is_approved,
        isPending: activeArisan.is_pending,
        financingId: activeArisan.financing_id,
        isLunas: activeArisan.is_lunas,
      };

      return (
        <ProgramAccountCard
          accountData={formattedAccountData}
          handleSetoran={handleSetoran}
          handlePengajuan={handleGabungArisan}
        />
      );
    }

    return (
      <>
        <AvailableArisanSection
          availableArisans={availableArisans}
          error={error}
          canCreate={canCreate}
          onRetry={fetchArisanData}
          onJoinClick={handleGabungArisan}
        />

        <ArisanHistoryTable
          historyArisan={historyArisan}
          onDetailClick={handleHistoryDetail}
        />
      </>
    );
  };

  return (
    <div className="arisan-page-container pb-5 font-outfit">
      <Container fluid className="mt-4 px-3 px-md-4">
        <Row className="justify-content-center">
          <Col xl={10} lg={11} md={12}>
            <ArisanProgramTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {renderArisanContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
