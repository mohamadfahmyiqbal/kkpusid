// 📁 src/pages/global/BillingPage/pages/BillingPage.jsx
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UBilling from "../../../../utils/api/UBilling";
import { jwtEncode } from "../../../../utils/helpers";
import { useBillingData } from "../hooks/useBillingData";
import { useProfile } from "../../../../components/layout/contexts";
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

  const { bills, history, tabunganDetail, loadingData, registrationId, isSukarela, categoryName, displayName } = useBillingData(decodedToken);
  const { userData } = useProfile();
  const bankInfo = userData?.bank_info || null;

  const safeBills = Array.isArray(bills) ? bills : [];
  const pendingCount = safeBills.length;
  const historyCount = Array.isArray(history) ? history.length : 0;

  const tabs = useMemo(
    () => [
      { key: "ringkasan", label: "Ringkasan", icon: <FaInfoCircle size={12} /> },
      {
        key: "pending",
        label: (isSukarela && pendingCount === 0) ? (categoryName === "TABUNGAN_DEPOSIT" ? "Setoran Manual" : "Setoran Sukarela") : "Belum Dibayar",
        icon: (isSukarela && pendingCount === 0) ? <FaPlus size={12} /> : <FaExclamationCircle size={12} />,
        badgeKey: !(isSukarela && pendingCount === 0) ? "pendingCount" : null,
      },
      { key: "history", label: "Riwayat Pembayaran", icon: <FaHistory size={12} />, badgeKey: "historyCount" },
    ],
    [isSukarela, categoryName, pendingCount],
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
    if (decodedToken?.return === "transactionDetailPage" && decodedToken?.category === "TABUNGAN_DEPOSIT") {
      const tId = decodedToken?.tabungan_id || decodedToken?.tabunganId;
      const tBills = (bills || []).filter((b) => b.category_code === `TAB_DEP_${tId}`);
      if (tBills.length > 0) {
        return [tBills[0]]; // Setoran pertama
      }
    }
    if (decodedToken?.return === "transactionDetailPage" && decodedToken?.category === "SUKUK_INVESTMENT") {
      const orderId = decodedToken?.order_id;
      return (bills || []).filter((b) => b.description?.includes(`Order #${orderId}`));
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

        if (isSukarela && pendingCount === 0) {
          const cleanAmt = parseFloat(customAmount.replace(/\./g, ""));
          if (!cleanAmt || cleanAmt < 1000) {
            setError("Nominal setoran minimal Rp 1.000");
            return;
          }
          const payload = { 
            category: categoryName, 
            amount: cleanAmt,
            tabungan_id: decodedToken?.tabungan_id || decodedToken?.tabunganId
          };
          const resp = await UBilling.createVoluntaryBill(payload);
          if (resp.data?.status) {
            const ids = resp.data.data.bill_item_ids;
            navigate(`/${jwtEncode({ 
              page: "invoicePage", 
              billItemIds: Array.isArray(ids) ? ids : [ids], 
              return: "billingPage", 
              originalReturn: decodedToken?.return, 
              category: categoryName,
              financingId: decodedToken?.financingId || decodedToken?.financing_id,
              productName: decodedToken?.productName 
            })}`);
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
          navigate(`/${jwtEncode({ 
            page: "invoicePage", 
            billItemIds: billsToUse, 
            registrationId, 
            return: "billingPage", 
            originalReturn: decodedToken?.return, 
            category: categoryName,
            financingId: decodedToken?.financingId || decodedToken?.financing_id,
            productName: decodedToken?.productName
          })}`);
          return;
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Gagal memproses transaksi. Silakan coba lagi.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [isSukarela, pendingCount, customAmount, categoryName, selectedBills, registrationId, navigate, decodedToken],
  );

  // Safe counts mapped earlier

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
            {categoryName === "TABUNGAN_DEPOSIT" || categoryName?.toUpperCase().includes("SUKARELA") ? (
              <FaWallet size={24} color="#fff" />
            ) : (
              <FaFileInvoiceDollar size={24} color="#fff" />
            )}
          </div>
          <div>
            <h1 className="bp-hero-title">
              {categoryName === "TABUNGAN_DEPOSIT" ? "Setoran Tabungan" : 
               categoryName?.toUpperCase().includes("SUKARELA") ? "Setoran Sukarela" : "Pusat Tagihan"}
            </h1>
            <p className="bp-hero-sub">
              {categoryName === "TABUNGAN_DEPOSIT" ? "Kelola setoran dan target tabungan Anda dengan mudah, aman, dan transparan." :
               categoryName?.toUpperCase().includes("SUKARELA") ? "Lakukan setoran sukarela kapan saja untuk menambah saldo Anda." :
               "Kelola semua tagihan dan pembayaran Anda dengan mudah, aman, dan transparan."}
            </p>
          </div>
        </div>

        {loadingData ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 20, color: "rgba(255,255,255,0.7)", fontSize: 13 }}>
            <Spinner animation="border" size="sm" />
            Memuat data...
          </div>
        ) : (
          <SummaryStats bills={bills} history={history} categoryName={categoryName} tabunganDetail={tabunganDetail} />
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
                  {(isSukarela && pendingCount === 0) ? (
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