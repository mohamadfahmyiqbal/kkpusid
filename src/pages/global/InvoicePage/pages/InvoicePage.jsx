import React, { useCallback, useEffect, useState } from "react";
import { Container, Spinner, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

// Components
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceActions from "../components/InvoiceActions";

// Hooks
import { useInvoiceData } from "../hooks/useInvoiceData";

// Utils
import UBilling from "../../../../utils/api/UBilling";
import { jwtEncode } from "../../../../utils/helpers";

const InvoicePage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLocalPaid, setIsLocalPaid] = useState(false);

  const {
    billData,
    loading,
    error,
    totalAmount,
    billItemIds,
    financingId,
    category,
    returnPage,
    registrationId,
    categoryName,
    originalReturn,
    startPolling,
    stopPolling,
    refreshData,
    status,
    product,
    id,
  } = useInvoiceData();

  // Listener untuk menutup Snap popup dari socket notification
  useEffect(() => {
    const handlePaymentComplete = () => {
      console.log("🔔 InvoicePage: Payment completion event received");
      
      // Beri sedikit jeda agar backend selesai memproses ledger
      setTimeout(async () => {
        if (window.snap && window.snap.hide) {
          window.snap.hide();
        }
        await refreshData();
        setIsProcessing(false);
      }, 1500);
    };

    window.addEventListener("CLOSE_SNAP_POPUP", handlePaymentComplete);
    window.addEventListener("PAYMENT_SUCCESSFUL", handlePaymentComplete);

    return () => {
      window.removeEventListener("CLOSE_SNAP_POPUP", handlePaymentComplete);
      window.removeEventListener("PAYMENT_SUCCESSFUL", handlePaymentComplete);
    };
  }, [refreshData]);

  const isPaid = billData?.status === "PAID" || status === "success" || isLocalPaid;
  const isRegistrationFlow = returnPage === "registrationPage" || (returnPage === "billingPage" && registrationId);
  const isSimpananFlow = isPaid && originalReturn === "simpananPage";

  const handleNavigateBack = useCallback(() => {
    // Redirect to dashboard if paid and part of registration flow
    if (isPaid && isRegistrationFlow) {
      navigate(`/${jwtEncode({ page: "dashboard" })}`);
      return;
    }

    if (isSimpananFlow) {
      navigate(`/${jwtEncode({ page: "simpananPage", activeTab: categoryName })}`);
      return;
    }

    if (isPaid && category === "FINANCING") {
      navigate(`/${jwtEncode({ page: "transaksiPage" })}`);
      return;
    }

    if (returnPage === "billingPage") {
      const billingToken = jwtEncode({
        page: "billingPage",
        registrationId: registrationId,
        category: categoryName,
        return: originalReturn || "dashboard",
      });
      navigate(`/${billingToken}`);
      return;
    }

    if (returnPage === "registrationPage") {
      navigate(`/${jwtEncode({ page: "dashboard" })}`);
      return;
    }

    if (returnPage === "dashboard") {
      navigate("/dashboard");
      return;
    }

    if (returnPage === "setoranTabungan") {
      const tabunganToken = jwtEncode({
        page: "setoranTabungan",
        product: product,
        id: id,
      });
      navigate(`/${tabunganToken}`);
      return;
    }

    navigate(`/${returnPage}`);
  }, [navigate, returnPage, registrationId, categoryName, product, id, isPaid, isRegistrationFlow, isSimpananFlow, originalReturn, category]);

  const handlePay = async () => {
    if (!window.snap) {
      return alert("Sistem pembayaran belum siap. Mohon refresh halaman.");
    }

    if (totalAmount <= 0.01) {
      return alert("Terjadi kesalahan: Jumlah pembayaran tidak valid.");
    }

    setIsProcessing(true);
    
    // Safety timeout: Reset processing state after 30 seconds if no response
    const safetyTimeout = setTimeout(() => {
      setIsProcessing(false);
      console.warn("⚠️ Payment processing timeout reached");
    }, 30000);

    try {
      const response = await UBilling.createMidtransTransaction({
        bill_item_ids: billItemIds,
        amount: totalAmount,
        tx_category:
          category === "SUKARELA"
            ? "SAVINGS_DEPOSIT"
            : category === "FINANCING"
              ? "FINANCING_PAYMENT"
              : category === "TABUNGAN_DEPOSIT"
                ? "TABUNGAN_DEPOSIT"
                : financingId
                  ? "FINANCING_PAYMENT"
                  : "MEMBER_REGISTRATION",
      });

      if (response.data?.status) {
        clearTimeout(safetyTimeout); // Batalkan safety timeout karena transaksi berhasil dibuat
        startPolling();

        window.snap.pay(response.data.data.snapToken, {
          onSuccess: async (result) => {
            clearTimeout(safetyTimeout);
            console.log("💰 Midtrans onSuccess:", result);
            setIsLocalPaid(true); // Set local paid status immediately for instant success UI
            startPolling(); // Keep polling to verify payment receipt in the DB
            await refreshData();
            setIsProcessing(false);
            window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
            window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
            setTimeout(() => {
              if (window.snap && window.snap.hide) window.snap.hide();
            }, 1000);
          },
          onPending: (result) => {
            clearTimeout(safetyTimeout);
            console.log("⏳ Midtrans onPending:", result);
            startPolling(); // Start polling to watch for status changes
            refreshData();
            setIsProcessing(false);
          },
          onClose: () => {
            clearTimeout(safetyTimeout);
            console.log("🚪 Midtrans onClose");
            setIsProcessing(false);
            refreshData();
          },
          onError: (result) => {
            clearTimeout(safetyTimeout);
            console.error("❌ Midtrans onError:", result);
            setIsProcessing(false);
            stopPolling();
          },
        });
      }
    } catch (err) {
      clearTimeout(safetyTimeout);
      console.error("Payment error:", err);
      setIsProcessing(false);
      stopPolling();
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <Spinner animation="grow" variant="primary" />
          <p className="mt-3 text-muted fw-semibold">Menyiapkan Invoice Anda...</p>
        </div>
      </div>
    );
  }

  if (error || (!billData && !loading)) {
    return (
      <Container className="py-5">
        <Alert variant="warning" className="rounded-4 p-4 shadow-sm border-0 bg-warning bg-opacity-10 text-warning-emphasis">
          <div className="d-flex align-items-center gap-3">
            <FaExclamationTriangle size={30} />
            <div>
              <h5 className="fw-bold mb-1">Data Invoice Tidak Ditemukan</h5>
              <p className="mb-0">{error || "Kami tidak dapat menemukan data tagihan yang Anda cari."}</p>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-end">
            <Button variant="warning" onClick={handleNavigateBack} className="rounded-3 fw-bold border-0 text-white" style={{ backgroundColor: "#ffc107" }}>
              Kembali ke Beranda
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  let returnPageName = "Kembali";
  if (isPaid && isRegistrationFlow) {
    returnPageName = "Dashboard";
  } else if (isSimpananFlow) {
    returnPageName = "Simpanan";
  } else if (isPaid && category === "FINANCING") {
    returnPageName = "Transaksi";
  } else {
    returnPageName = 
      returnPage === "dashboard" ? "Dashboard" : 
      returnPage === "billingPage" ? "Billing" : 
      returnPage === "setoranTabungan" ? "Setoran Tabungan" : 
      returnPage === "registrationPage" ? "Registrasi" : "Kembali";
  }

  return (
    <Container className="py-4 py-md-5" style={{ maxWidth: "800px" }}>
      <InvoiceHeader onBack={handleNavigateBack} onPrint={() => window.print()} />
      
      <InvoiceCard 
        billData={billData} 
        totalAmount={totalAmount} 
        isPaid={isPaid} 
      />
      
      <InvoiceActions 
        isPaid={isPaid} 
        isProcessing={isProcessing} 
        onPay={handlePay} 
        onBack={handleNavigateBack}
        returnPageName={returnPageName}
      />

      {/* Footer Branding d-print-none */}
      <div className="text-center mt-5 d-print-none opacity-50">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Koperasi Digital - System Generated Invoice
        </small>
      </div>

      {/* Print Specific Styles */}
      <style>{`
        @media print {
          body { background: white !important; }
          .container { padding: 0 !important; max-width: 100% !important; }
          .card { border: none !important; box-shadow: none !important; }
          .bg-gradient-primary, .bg-gradient-success { 
            -webkit-print-color-adjust: exact; 
            color-adjust: exact;
          }
          .d-print-none { display: none !important; }
        }
      `}</style>
    </Container>
  );
};

export default InvoicePage;
