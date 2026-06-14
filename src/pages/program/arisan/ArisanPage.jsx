// fe/src/pages/program/arisan/ArisanPage.jsx

import React, { useState, useCallback, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import { FaPlusCircle, FaRedo } from "react-icons/fa";
import {
  MdPeople,
  MdTrackChanges,
  MdPayments,
  MdEvent,
  MdChevronRight,
  MdGroup,
  MdAccountBalance,
} from "react-icons/md";

import ProgramAccountCard from "../../../components/program/ProgramAccountCard";
import AvailableArisanList from "../../../components/program/AvailableArisanList";
import { jwtEncode } from "../../../utils/helpers";
import { useProfile } from "../../../components/layout/contexts/ProfileContext";
import "./ArisanPage.css";

// API URL Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://localhost:3445/api";

const getApiUrl = (endpoint) => {
  const base = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;
  return `${base}/${endpoint}`;
};



const PROGRAM_OPTIONS = [
  { label: "Pinjaman Lunak", key: "pinjaman", icon: MdAccountBalance },
  { label: "Arisan", key: "arisan", icon: MdGroup },
];

export default function ArisanPage() {
  const navigate = useNavigate();
  const { userData } = useProfile();

  // Role check: status_id 2 (Pengawas), 3 (Ketua), 4 (Bendahara) can create
  const canCreate = !!userData && ['2', '3', '4'].includes(String(userData.status_id));

  const activeTab = "arisan";

  // Dynamic API state
  const [activeArisan, setActiveArisan] = useState(null);
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

      if (activeResult.success && activeResult.data) {
        setActiveArisan(activeResult.data);
      } else {
        setActiveArisan(null);
        // 2. Fetch available arisans only if no active arisan exists
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
      // Do not use mockup list
      setAvailableArisans([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArisanData();
  }, [fetchArisanData]);

  // Handler untuk navigasi ke form pendaftaran arisan (FormPengajuanArisan.jsx) atau detail pengajuan
  const handleGabungArisan = useCallback(
    (arisanId) => {
      // Jika ada pengajuan pending, arahkan ke detail pengajuan
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
    [navigate, activeArisan],
  );

  // Handler untuk navigasi ke halaman Setoran (contoh)
  const handleSetoran = useCallback(() => {
    const token = jwtEncode({ page: "billingPage", action: "setoranArisan" });
    navigate(`/${token}`);

  }, [navigate]);

  // Handle saat tab berubah (kembali ke ProgramPage)
  const handleTabChange = useCallback(
    (key) => {
      if (key === "pinjaman") {
        const token = jwtEncode({ page: "programPage" });
        navigate(`/${token}`);
      }
    },
    [navigate],
  );

  const renderArisanContent = () => {
    if (isLoading) {
      return <ArisanSkeleton />;
    }

    if (activeArisan) {
      // Map backend active arisan schema to ProgramAccountCard expected format
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
        financingId: activeArisan.financing_id
      };

      return (
        <ProgramAccountCard
          accountData={formattedAccountData}
          handleSetoran={handleSetoran}
          handlePengajuan={handleGabungArisan}
        />
      );
    }

    const currentList = availableArisans;

    return (
      <>
        {error && (
          <Alert variant="warning" className="d-flex align-items-center justify-content-between mb-4 rounded-3 border-0 bg-warning bg-opacity-10 text-warning">
            <span className="small">{error}</span>
            <Button variant="link" className="p-0 text-warning text-decoration-none d-flex align-items-center" onClick={fetchArisanData}>
              <FaRedo className="me-1" size={12} /> Coba Lagi
            </Button>
          </Alert>
        )}

        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 className="fw-bold text-dark mb-1 font-outfit">
              <MdGroup className="me-2 text-primary" size={22} />
              Arisan Tersedia
            </h5>
            <p className="text-muted small mb-0">
              Pilih grup arisan yang sesuai dengan kebutuhan Anda
            </p>
          </div>
          {canCreate && (
            <Button
              variant="outline-primary"
              size="sm"
              className="d-none d-md-flex align-items-center rounded-pill px-3"
              onClick={() => handleGabungArisan("new")}
            >
              <FaPlusCircle className="me-2" />
              Buat Arisan Baru
            </Button>
          )}
        </div>

        {currentList.length === 0 ? (
          <EmptyState onCreate={() => handleGabungArisan("new")} canCreate={canCreate} />
        ) : (
          <AvailableArisanList
            availableArisan={currentList}
            onJoinClick={(item) => handleGabungArisan(item.arisan_id || item.id)}
          />
        )}
      </>
    );
  };

  return (
    <div className="arisan-page-container pb-5 font-outfit">
      <Container fluid className="mt-4 px-3 px-md-4">
        <Row className="justify-content-center">
          <Col xl={10} lg={11} md={12}>
            {/* Tabs Navigation */}
            <div className="arisan-tabs-container mb-4 px-2">
              <div className="d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 arisan-scroll-hide">
                {PROGRAM_OPTIONS.map((opt) => {
                  const isActive = activeTab === opt.key;
                  const IconComponent = opt.icon;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleTabChange(opt.key)}
                      className={`arisan-tab-btn ${isActive ? "active" : ""}`}
                    >
                      <IconComponent size={18} />
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {renderArisanContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
}


const EmptyState = ({ onCreate, canCreate }) => (
  <Alert
    variant="light"
    className="text-center py-5 border-0 bg-light rounded-4 font-outfit"
  >
    <div className="mb-3">
      <div className="bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-sm arisan-empty-icon-container">
        <MdGroup size={32} className="text-muted" />
      </div>
    </div>
    <h6 className="fw-bold text-dark">Belum Ada Arisan Tersedia</h6>
    <p className="text-muted small mb-3">
      Saat ini tidak ada grup arisan yang terbuka.
      {canCreate && (
        <>
          <br />
          Anda bisa membuat arisan baru untuk memulai.
        </>
      )}
    </p>
    {canCreate && (
      <Button variant="primary" className="rounded-pill px-4" onClick={onCreate}>
        <FaPlusCircle className="me-2" />
        Buat Arisan Baru
      </Button>
    )}
  </Alert>
);

const ArisanSkeleton = () => (
  <Row className="g-3">
    {[1, 2, 3].map((i) => (
      <Col md={6} lg={6} xl={4} key={i} className="mb-3">
        <div className="arisan-skeleton-card arisan-skeleton">
          <div className="d-flex justify-content-between">
            <div className="arisan-skeleton" style={{ width: "60px", height: "16px" }} />
            <div className="arisan-skeleton" style={{ width: "80px", height: "20px", borderRadius: "12px" }} />
          </div>
          <div className="my-3">
            <div className="arisan-skeleton mb-2" style={{ width: "80%", height: "24px" }} />
            <div className="arisan-skeleton" style={{ width: "50%", height: "16px" }} />
          </div>
          <div className="grid gap-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="arisan-skeleton" style={{ height: "40px", borderRadius: "8px" }} />
            ))}
          </div>
          <div className="mt-3 arisan-skeleton" style={{ height: "40px", borderRadius: "20px" }} />
        </div>
      </Col>
    ))}
  </Row>
);
