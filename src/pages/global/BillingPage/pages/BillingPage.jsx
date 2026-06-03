// 📁 src/pages/global/BillingPage/pages/BillingPage.jsx
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UBilling from "../../../../utils/api/UBilling";
import { jwtEncode } from "../../../../utils/helpers";
import { useBillingData } from "../hooks/useBillingData";
import { FaFileInvoiceDollar, FaExclamationCircle, FaPlus, FaHistory, FaWallet, FaInfoCircle, FaClock, FaShieldAlt } from "react-icons/fa";

import SummaryStats from "../components/SummaryStats";
import PendingBillsTab from "../components/PendingBillsTab";
import PaymentHistoryTab from "../components/PaymentHistoryTab";
import RingkasanTab from "../components/RingkasanTab";
import BillingSidebar from "../components/BillingSidebar";
import SukarelaForm from "../components/SukarelaForm";

import "./BillingPage.css";

/* ─── Main Component ───────────────────────────────────────── */
const BillingPage = ({ decodedToken }) => {
  const navigate = useNavigate();

  const [selectedBills, setSelectedBills] = useState([]);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  const { bills, history, loadingData, registrationId, isSukarela, categoryName, bankInfo, displayName } = useBillingData(decodedToken);

  const tabs = useMemo(
    () => [
      { key: "ringkasan", label: "Ringkasan", icon: <FaInfoCircle size={12} /> },
      {
        key: "pending",
        label: isSukarela ? "Setoran Sukarela" : "Belum Dibayar",
        icon: isSukarela ? <FaPlus size={12} /> : <FaExclamationCircle size={12} />,
        badgeKey: !isSukarela ? "pendingCount" : null,
      },
      { key: "history", label: "Riwayat Pembayaran", icon: <FaHistory size={12} />, badgeKey: "historyCount" },
      { key: "metode", label: "Metode Pembayaran", icon: <FaWallet size={12} /> },
    ],
    [isSukarela],
  );

  /* mandatory bills auto-select */
  const mandatoryBills = useMemo(() => {
    if (decodedToken?.return === "registrationPage") {
      const month = new Date().toLocaleDateString("en-US", { month: "long" }).toLowerCase();
      return (bills || []).filter(
        (b) =>
          b.description?.toLowerCase().includes("simpanan pokok") ||
          b.description?.toLowerCase().includes(`simpanan wajib - ${month}`),
      );
    }
    if (decodedToken?.return === "savingsPage") {
      return (bills || []).filter((b) => b.description?.toLowerCase().includes("sukarela"));
    }
    if (decodedToken?.return === "transactionDetailPage" && decodedToken?.category === "FINANCING") {
      return (bills || []).filter(
        (b) => 
          b.description?.toLowerCase().includes("down payment") || 
          b.description?.toLowerCase().includes("dp") || 
          b.description?.toLowerCase().includes("uang pangkal") ||
          b.category_code === "TRANSACTION_DOWN_PAYMENT"
      );
    }
    return [];
  }, [bills, decodedToken]);

  useEffect(() => {
    if (mandatoryBills.length > 0) {
      setSelectedBills((prev) => {
        const ids = mandatoryBills.map((b) => b.bill_item_id);
        return [...new Set([...prev, ...ids])];
      });
    }
  }, [mandatoryBills]);

  /* auto-clear error */
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(t);
    }
  }, [error]);

  useEffect(() => {
    if (error) setError("");
  }, [selectedBills, customAmount]);

  /* pay handler — always resets isSubmitting */
  const handlePay = useCallback(
    async (overrideBills) => {
      setIsSubmitting(true);
      setError("");
      try {
        const billsToUse = overrideBills || selectedBills;

        if (isSukarela) {
          const cleanAmt = parseFloat(customAmount.replace(/\./g, ""));
          if (!cleanAmt || cleanAmt < 1000) {
            setError("Nominal setoran minimal Rp 1.000");
            return;
          }
          const resp = await UBilling.createVoluntaryBill({ category: categoryName, amount: cleanAmt });
          if (resp.data?.status) {
            const ids = resp.data.data.bill_item_ids;
            navigate(`/${jwtEncode({ page: "invoicePage", billItemIds: Array.isArray(ids) ? ids : [ids], return: "billingPage", originalReturn: decodedToken?.return, category: categoryName })}`);
            return;
          } else {
            setError(resp.data?.message || "Gagal membuat tagihan sukarela.");
            return;
          }
        } else {
          if (!billsToUse.length) {
            setError("Pilih minimal satu tagihan.");
            return;
          }
          navigate(`/${jwtEncode({ page: "invoicePage", billItemIds: billsToUse, registrationId, return: "billingPage", originalReturn: decodedToken?.return, category: categoryName })}`);
          return;
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Gagal memproses transaksi. Silakan coba lagi.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSukarela, customAmount, categoryName, selectedBills, registrationId, navigate],
  );

  const safeBills = Array.isArray(bills) ? bills : [];
  const pendingCount = safeBills.length;
  const historyCount = Array.isArray(history) ? history.length : 0;

  /* ─ Render ─ */
  return (
    <div className="pb-3 dash-fade-in">
      {/* Error Alert */}
      {error && (
        <Alert variant="danger" className="mb-3 rounded-12 border-0 shadow-sm d-flex align-items-center" dismissible onClose={() => setError("")}>
          <FaExclamationCircle className="me-2 flex-shrink-0" />
          {error}
        </Alert>
      )}

      {/* ── Hero Header ── */}
      <div className="bp-hero">
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div className="bp-hero-icon">
            <FaFileInvoiceDollar size={24} color="#fff" />
          </div>
          <div>
            <h1 className="bp-hero-title">Pusat Tagihan</h1>
            <p className="bp-hero-sub">Kelola semua tagihan dan pembayaran Anda dengan mudah, aman, dan transparan.</p>
          </div>
        </div>

        {loadingData ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
            <Spinner animation="border" size="sm" />
            Memuat data tagihan...
          </div>
        ) : (
          <SummaryStats bills={bills} history={history} />
        )}
      </div>

      {/* ── Tab Navigation ── */}
      <div className="bp-tabs">
        {tabs.map((tab) => {
          const count = tab.badgeKey === "pendingCount" ? pendingCount : tab.badgeKey === "historyCount" ? historyCount : 0;
          return (
            <button key={tab.key} className={`bp-tab ${activeTab === tab.key ? "active" : ""}`} onClick={() => setActiveTab(tab.key)}>
              {tab.icon}
              {tab.label}
              {tab.badgeKey && count > 0 && <span className="bp-tab-badge">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* ── Main Content ── */}
      <div className="bp-layout">
        <div>
          {loadingData ? (
            <div className="bp-card">
              <div className="bp-loading">
                <Spinner animation="border" variant="primary" />
                <p className="text-muted mt-3 small mb-0">Memuat data...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "ringkasan" && (
                <div className="bp-card">
                  <RingkasanTab bills={bills} history={history} onGoToPending={() => setActiveTab("pending")} />
                </div>
              )}

              {activeTab === "pending" && (
                <div className="bp-card">
                  {isSukarela ? (
                    <div style={{ padding: 20 }}>
                      <SukarelaForm
                        customAmount={customAmount}
                        setCustomAmount={setCustomAmount}
                        handleNavigateToInvoice={handlePay}
                        isSubmitting={isSubmitting}
                      />
                    </div>
                  ) : (
                    <PendingBillsTab
                      title={`Tagihan ${displayName}`}
                      bills={bills}
                      selectedBills={selectedBills}
                      setSelectedBills={setSelectedBills}
                      disabledBills={mandatoryBills.map((b) => b.bill_item_id)}
                      handlePay={handlePay}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </div>
              )}

              {activeTab === "history" && (
                <div className="bp-card">
                  <PaymentHistoryTab history={history} />
                </div>
              )}

              {activeTab === "metode" && (
                <div className="bp-card">
                  <div className="bp-card-header">
                    <div>
                      <div className="bp-card-title">Metode Pembayaran</div>
                      <div className="bp-card-sub">Kelola metode pembayaran Anda untuk kemudahan transaksi.</div>
                    </div>
                  </div>
                  <div style={{ padding: "32px 24px", textAlign: "center", color: "#6b7280" }}>
                    <FaWallet size={36} style={{ opacity: 0.3, marginBottom: 12 }} />
                    <p className="mb-0 small">Fitur ini akan segera hadir.</p>
                  </div>
                </div>
              )}

              {/* Auto Debit Banner */}
              <div className="bp-banner">
                <div>
                  <div className="bp-banner-title">Aktifkan Auto Debit</div>
                  <p className="bp-banner-desc">
                    Aktifkan fitur auto debit untuk pembayaran otomatis dan tepat waktu setiap bulan.
                  </p>
                  <div className="bp-banner-coming-soon">
                    <FaClock size={13} />
                    Segera Hadir
                  </div>
                </div>
                <div className="bp-banner-illustration">
                  <div style={{
                    width: 110, height: 90, borderRadius: 16,
                    background: "rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexDirection: "column", gap: 8,
                  }}>
                    <FaShieldAlt size={32} color="rgba(255,255,255,0.8)" />
                    <FaExclamationCircle size={20} color="#10b981" />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div>
          <BillingSidebar bankInfo={bankInfo} />
        </div>
      </div>
    </div>
  );
};

export default BillingPage;