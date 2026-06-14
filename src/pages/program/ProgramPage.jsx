// pages/program/ProgramPage.jsx

import React, {
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { 
  MdAccountBalance, 
  MdGroup, 
  MdInfoOutline
} from "react-icons/md";

import ProgramAccountCard from "../../components/program/ProgramAccountCard";
import ProgramStatusCard from "../../components/program/ProgramStatusCard";
import ProgramTabMenu from "../../components/program/ProgramTabMenu";
import ProgramSkeleton from "../../components/program/ProgramSkeleton";
import { jwtEncode } from "../../utils/helpers";
import useSocketListener from "../../utils/helper/SocketListener";
import "./ProgramPage.css";

import api from "../../utils/api/common";

const DEFAULT_OPTIONS = [
  { label: "Pinjaman Lunak", key: "pinjaman", icon: MdAccountBalance },
  { label: "Arisan", key: "arisan", icon: MdGroup },
];


export default function ProgramPage() {
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);
  const optionsRef = useRef(DEFAULT_OPTIONS);

  const [activeTab, setActiveTab] = useState("pinjaman");
  const [programOptions, setProgramOptions] = useState(DEFAULT_OPTIONS);

  const [data, setData] = useState({
    pinjaman: null,
    arisan: null,
  });
  const [availableArisan, setAvailableArisan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync ref with state
  useEffect(() => {
    optionsRef.current = programOptions;
  }, [programOptions]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "-";
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const fetchWithAuth = useCallback(async (endpoint, signal) => {
    const response = await api.get(`/program/${endpoint}`, { signal });

    if (!response.data?.success) {
      throw new Error(response.data?.message || `Gagal mengambil data ${endpoint}`);
    }
    return response.data.data;
  }, []);

  const fetchAvailableArisan = useCallback(async () => {
    try {
      const response = await api.get("/program/arisan/available");
      if (response.data?.success) {
        setAvailableArisan(response.data.data || []);
      }
    } catch (err) {
      console.error("Error fetching available arisan:", err);
    }
  }, []);

  const mapDataToUI = useCallback((raw, type) => {
    if (!raw) return null;

    if (type === "pinjaman") {
      return {
        nama: raw.member?.name || "-",
        produk: raw.product?.name || "Pinjaman Lunak",
        akad: raw.product?.akad_type || "Murabahah",
        tanggalBuka: formatDate(raw.created_at),
        saldoAkhir: formatCurrency(raw.principal_amount || raw.nominal_principal),
        status: raw.status,
        financingId: raw.financing_id || raw.loan_id,
        isPending:
          raw.is_pending ||
          raw.status === "PENDING" ||
          raw.status === "WAITING_APPROVAL" ||
          raw.current_step_id != null,
        isApproved: raw.is_approved || raw.status === "APPROVED",
        statusLabel:
          raw.status_label ||
          (raw.status === "APPROVED"
            ? "Aktif (Disetujui)"
            : "Menunggu Approval"),
      };
    }

    if (type === "arisan") {
      return {
        nama: raw.member_name || "-",
        produk: `${raw.program_name || "Arisan"} - ${raw.batch_name || ""}`.trim(),
        akad: `No. Peserta: ${raw.participant_no || "-"}`,
        tanggalBuka: formatDate(raw.created_at),
        saldoAkhir: formatCurrency(raw.current_balance),
        status: raw.status,
        isPending: raw.is_pending,
        isApproved: raw.is_approved,
        statusLabel: raw.status_label || (raw.is_approved ? "Aktif" : "Menunggu Approval"),
        financingId: raw.financing_id,
      };
    }

    return null;
  }, []);

  const loadData = useCallback(async () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const [optionsRaw, pinjamanRaw, arisanRaw] = await Promise.all([
        fetchWithAuth("options", controller.signal).catch(() => DEFAULT_OPTIONS),
        fetchWithAuth("pinjaman", controller.signal).catch(() => null),
        fetchWithAuth("arisan", controller.signal).catch(() => null),
      ]);

      if (!controller.signal.aborted) {
        // Map icons to options
        const mappedOptions = optionsRaw.map(opt => ({
          ...opt,
          icon: opt.key === "arisan" ? MdGroup : MdAccountBalance
        }));
        setProgramOptions(mappedOptions);
        
        setData({
          pinjaman: mapDataToUI(pinjamanRaw, "pinjaman"),
          arisan: mapDataToUI(arisanRaw, "arisan"),
        });

        if (!arisanRaw) fetchAvailableArisan();
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [fetchWithAuth, mapDataToUI, fetchAvailableArisan]);

  useEffect(() => {
    loadData();
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [loadData]);

  const handleSocketUpdate = useCallback((payload) => {
    if (["financing_applications", "arisan", "program"].includes(payload?.entityRef)) {
      loadData();
    }
  }, [loadData]);

  useSocketListener(handleSocketUpdate);

  const activeData = useMemo(() => data[activeTab], [data, activeTab]);

  const handlePengajuan = useCallback(() => {
    if (activeData?.isPending && activeData?.financingId) {
      const detailPage = "transactionDetailPage";
      navigate(`/${jwtEncode({ page: detailPage, financingId: activeData.financingId })}`);
      return;
    }
    const page = activeTab === "arisan" ? "arisanPage" : "formPengajuanPinjaman";
    navigate(`/${jwtEncode({ page })}`);
  }, [activeTab, navigate, activeData]);

  const handleSetoran = useCallback(() => {
    if (activeTab === "pinjaman" && activeData?.isPending && activeData?.financingId) {
      navigate(`/${jwtEncode({ page: "transactionDetailPage", financingId: activeData.financingId })}`);
      return;
    }
    if (activeTab === "pinjaman" && activeData?.isApproved && activeData?.financingId) {
      navigate(`/${jwtEncode({ page: "billingPage", financingId: activeData.financingId, category: "PINJAMAN" })}`);
      return;
    }
    navigate(`/${jwtEncode({ page: "billingPage" })}`);
  }, [activeTab, navigate, activeData]);

  const renderContent = () => {
    if (loading) return <ProgramSkeleton />;

    if (error) {
      return (
        <Alert variant="danger" className="shadow-sm rounded-4 border-0 animate-fade-in">
          <div className="d-flex align-items-center gap-2 mb-2">
            <MdInfoOutline size={20} />
            <strong className="h6 mb-0">Gagal Memuat Data</strong>
          </div>
          <p className="small mb-3">{error}</p>
          <Button variant="outline-danger" size="sm" className="fw-bold px-3 rounded-pill" onClick={loadData}>
            Coba Lagi
          </Button>
        </Alert>
      );
    }

    if (activeData?.isPending) {
      return (
        <div className="animate-fade-in">
          <ProgramStatusCard
            title={`Informasi ${activeTab === "arisan" ? "Arisan" : "Pinjaman"}`}
            message="Pengajuan menunggu approval"
            buttonText="Lihat Detail Pengajuan"
            onButtonClick={handlePengajuan}
            variant="pending"
          />
        </div>
      );
    }

    if (activeData) {
      return (
        <div className="animate-fade-in">
          <ProgramAccountCard
            accountData={activeData}
            handleSetoran={handleSetoran}
            handlePengajuan={handlePengajuan}
          />
        </div>
      );
    }

    return (
      <div className="animate-fade-in">
        <ProgramStatusCard
          title={`Informasi ${activeTab === "arisan" ? "Arisan" : "Pinjaman"}`}
          message={`Anda belum memiliki transaksi ${activeTab} yang aktif.`}
          buttonText={activeTab === "arisan" ? "Daftar Sekarang" : "Pengajuan Pinjaman Baru"}
          onButtonClick={handlePengajuan}
          variant="empty"
        />
      </div>
    );
  };

  return (
    <div className="program-page-container px-3 pb-5">
      <div className="mb-4">
        <ProgramTabMenu
          options={programOptions}
          activeKey={activeTab}
          onChange={setActiveTab}
        />
      </div>
      
      {renderContent()}
    </div>
  );
}
