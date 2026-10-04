import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Spinner,
  Container,
} from "react-bootstrap";
import { FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtEncode } from "../../../utils/helpers";
import uBilling from "../../../utils/api/UBilling";
import uGlobal from "../../../utils/api/UGlobal";

import ResignationStatusBanner from "./components/ResignationStatusBanner";
import SavingsAndAssetsSection from "./components/SavingsAndAssetsSection";
import PendingObligationsSection from "./components/PendingObligationsSection";
import ResignationActionSection from "./components/ResignationActionSection";
import "./ResignationCheckPage.css";

export default function ResignationCheckPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pendingBills, setPendingBills] = useState([]);
  const [savingsInfo, setSavingsInfo] = useState(null);
  const [jualBeliBill, setJualBeliBill] = useState(0);
  const [programBill, setProgramBill] = useState({ pinjaman: 0, arisan: 0 });
  const [otherAssets, setOtherAssets] = useState({
    tabunganList: [],
    investasi: 0,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await uBilling.getPendingBills();
      const bills = response.data?.data || response.data || [];
      const validBills = Array.isArray(bills) ? bills : [];

      const grouped = validBills.reduce((acc, bill) => {
        const name = bill.billing_name || bill.description || "Tagihan";
        const amt = Number(bill.amount) || Number(bill.total_amount) || 0;
        if (amt > 0) {
          if (!acc[name]) {
            acc[name] = { billing_name: name, total_amount: 0 };
          }
          acc[name].total_amount += amt;
        }
        return acc;
      }, {});

      setPendingBills(Object.values(grouped));

      // Ambil data simpanan
      const finResponse = await uGlobal.getFinancialSummary();
      const details = finResponse.data?.data?.details || [];
      const savings = {
        pokok: details.find((d) => d.type === "SW_POKOK")?.balance || 0,
        wajib: details.find((d) => d.type === "SW_WAJIB")?.balance || 0,
        sukarela: details.find((d) => d.type === "SS_SUKARELA")?.balance || 0,
      };
      setSavingsInfo(savings);

      const sisaJualBeli = finResponse.data?.data?.sisaCicilanJualBeli || 0;
      setJualBeliBill(sisaJualBeli);

      const sisaPinjaman = finResponse.data?.data?.sisaCicilanPinjaman || 0;
      const sisaArisan = finResponse.data?.data?.sisaCicilanArisan || 0;
      setProgramBill({ pinjaman: sisaPinjaman, arisan: sisaArisan });

      const listTabungan = details
        .filter((d) => d.type.startsWith("TABUNGAN_") && Number(d.balance) > 0)
        .map((d) => ({ name: d.name, balance: Number(d.balance) }));

      const totalInvestasi = finResponse.data?.data?.totalInvestasi || 0;
      setOtherAssets({
        tabunganList: listTabungan,
        investasi: totalInvestasi,
      });
    } catch (err) {
      console.error("Gagal mengambil data tagihan:", err);
      setError(
        "Terjadi kesalahan saat memeriksa status kewajiban Anda. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(`/${jwtEncode({ page: "accountPage" })}`);
  };

  const handleTerminate = async () => {
    if (pendingBills.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Pengajuan Ditolak",
        text: "Anda masih memiliki kewajiban yang belum diselesaikan.",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Konfirmasi Akhir",
      text: "Apakah Anda sangat yakin ingin mengajukan penghentian keanggotaan? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hentikan Keanggotaan",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        setIsSubmitting(true);
        Swal.fire({
          title: "Memproses...",
          text: "Sedang mengirim pengajuan...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const token =
          localStorage.getItem("authToken") || localStorage.getItem("token");
        const res = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL || "https://localhost:3445/api"
          }/anggota/berhenti-keanggotaan`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ reason: "Pengajuan dari halaman profil" }),
          }
        );

        const data = await res.json();

        if (data.success || res.ok) {
          Swal.fire(
            "Berhasil!",
            "Pengajuan penghentian keanggotaan berhasil dikirim ke pengurus. Silakan tunggu konfirmasi.",
            "success"
          ).then(() => {
            window.location.reload();
          });
        } else {
          Swal.fire(
            "Gagal",
            data.message || "Gagal mengajukan penghentian keanggotaan.",
            "error"
          );
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Terjadi kesalahan sistem.", "error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const hasProgramBill = programBill.pinjaman > 0 || programBill.arisan > 0;
  const hasBills =
    pendingBills.length > 0 || jualBeliBill > 0 || hasProgramBill;

  return (
    <Container className="rcp-container py-4">
      <Card className="rcp-main-card border-0 shadow-sm">
        <Card.Body className="p-4 p-md-5">
          {loading ? (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
              <Spinner
                animation="border"
                variant="primary"
                style={{ width: "3rem", height: "3rem" }}
              />
              <p className="mt-3 text-muted">
                Sedang memeriksa kewajiban dan tagihan Anda...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-5">
              <FaExclamationCircle
                className="text-danger mb-3"
                style={{ fontSize: "3rem" }}
              />
              <h5>Gagal Memeriksa Data</h5>
              <p className="text-muted">{error}</p>
              <Button variant="outline-primary" onClick={fetchData}>
                Coba Lagi
              </Button>
            </div>
          ) : (
            <div className="rcp-content animate-fade-in">
              {/* Status Header Banner */}
              <ResignationStatusBanner hasBills={hasBills} />

              {/* Informasi Simpanan & Aset Tabungan / Investasi */}
              <SavingsAndAssetsSection
                savingsInfo={savingsInfo}
                otherAssets={otherAssets}
              />

              {/* Informasi Kewajiban Tagihan */}
              <PendingObligationsSection
                jualBeliBill={jualBeliBill}
                programBill={programBill}
                pendingBills={pendingBills}
              />

              {/* Aksi Berhenti & Navigasi */}
              <ResignationActionSection
                hasBills={hasBills}
                isSubmitting={isSubmitting}
                onTerminate={handleTerminate}
                onGoBack={handleGoBack}
              />
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
