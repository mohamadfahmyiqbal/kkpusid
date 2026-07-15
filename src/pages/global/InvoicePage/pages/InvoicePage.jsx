import React, { useCallback, useEffect, useState } from "react";
import { Container, Spinner,  Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import Swal from "sweetalert2";

// Components
import InvoiceHeader from "../components/InvoiceHeader";
import InvoiceCard from "../components/InvoiceCard";
import InvoiceActions from "../components/InvoiceActions";

// Hooks
import { useInvoiceData } from "../hooks/useInvoiceData";

// Utils
import UBilling from "../../../../utils/api/UBilling";
import { jwtEncode } from "../../../../utils/helpers";
import Alert from "../../../../components/ui/SwalAlert";


const InvoicePage = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLocalPaid, setIsLocalPaid] = useState(false);
  const [paymentInstruction, setPaymentInstruction] = useState(null);

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
    productName,
    id,
    setDynamicBillId,
  } = useInvoiceData();

  // Listener untuk menutup Snap popup dari socket notification
  useEffect(() => {
    const handlePaymentComplete = () => {

      
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
  const isPelunasan = (productName || product || categoryName || category)?.toLowerCase().includes("pelunasan");

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

    if (isPelunasan) {
      navigate(`/${jwtEncode({ page: "jualBeliPage" })}`);
      return;
    }

    if (isPaid && category === "FINANCING") {
      navigate(`/${jwtEncode({ page: "billingPage", category: "FINANCING", financingId: financingId, productName: productName || product, return: "transaksiPage" })}`);
      return;
    }

    if (isPaid && category === "TABUNGAN_DEPOSIT") {
      navigate(`/${jwtEncode({ page: "tabunganPage" })}`);
      return;
    }

    if (returnPage === "billingPage") {
      const billingToken = jwtEncode({
        page: "billingPage",
        registrationId: registrationId,
        category: categoryName,
        financingId: financingId,
        productName: productName || product,
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
  }, [navigate, returnPage, registrationId, categoryName, product, id, isPaid, isRegistrationFlow, isSimpananFlow, isPelunasan, originalReturn, category, financingId, productName]);

  const handlePay = async (selectedMethod) => {
    if (!selectedMethod) {
      Swal.fire({ title: 'Perhatian', text: "Silakan pilih metode pembayaran.", icon: 'warning' });
      return;
    }

    if (totalAmount <= 0.01) {
      Swal.fire({ title: 'Perhatian', text: "Terjadi kesalahan: Jumlah pembayaran tidak valid.", icon: 'warning' });
      return;
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
        financing_id: financingId,
        payment_type: selectedMethod,
        tx_category:
          category === "SUKARELA"
            ? "SAVINGS_DEPOSIT"
            : category === "FINANCING"
              ? "FINANCING_PAYMENT"
              : category === "TABUNGAN_DEPOSIT"
                ? "TABUNGAN_DEPOSIT"
                : category === "SUKUK_INVESTMENT"
                  ? "SUKUK_INVESTMENT"
                  : financingId
                    ? "FINANCING_PAYMENT"
                    : "MEMBER_REGISTRATION",
      });

      if (response.data?.status) {
        clearTimeout(safetyTimeout); // Batalkan safety timeout karena transaksi berhasil dibuat
        
        if (response.data.data.billId) {
          setDynamicBillId(response.data.data.billId);
        }
        
        startPolling();

        
        if (response.data.data.midtransResponse) {
          setPaymentInstruction(response.data.data.midtransResponse);
        }
        
        setIsProcessing(false);
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
  if (isPelunasan) {
    returnPageName = "Jual Beli";
  } else if (isPaid && isRegistrationFlow) {
    returnPageName = "Dashboard";
  } else if (isSimpananFlow) {
    returnPageName = "Simpanan";
  } else if (isPaid && category === "FINANCING") {
    returnPageName = "Billing";
  } else if (isPaid && category === "TABUNGAN_DEPOSIT") {
    returnPageName = "Tabungan";
  } else {
    returnPageName = 
      returnPage === "dashboard" ? "Dashboard" : 
      returnPage === "billingPage" ? "Billing" : 
      returnPage === "setoranTabungan" ? "Setoran Tabungan" : 
      returnPage === "registrationPage" ? "Registrasi" : "Kembali";
  }

  return (
    <Container fluid className="py-3 px-0">
      <InvoiceHeader onBack={handleNavigateBack} onPrint={() => window.print()} />
      
      <div className="d-flex justify-content-end mb-3 px-3 d-print-none">
        <h6 className="mb-0 fw-bold me-2 align-self-center">Status:</h6>
        <Badge 
          bg={isPaid ? "success" : "warning"} 
          text={isPaid ? "white" : "dark"}
          className="px-3 py-2 fs-6 rounded-pill shadow-sm"
        >
          {isPaid ? "LUNAS / PAID" : "BELUM DIBAYAR"}
        </Badge>
      </div>

      <InvoiceCard 
        billData={billData} 
        totalAmount={totalAmount} 
        isPaid={isPaid} 
      />
      
      {paymentInstruction ? (
        <div className="mt-4 p-4 border rounded shadow-sm bg-white">
          <h5 className="fw-bold text-primary mb-3">Instruksi Pembayaran</h5>
          {paymentInstruction.payment_type === 'bank_transfer' && paymentInstruction.va_numbers && (
            <div>
              <p>Silakan transfer ke Virtual Account berikut:</p>
              <h4 className="fw-bold">{paymentInstruction.va_numbers[0].bank.toUpperCase()} - {paymentInstruction.va_numbers[0].va_number}</h4>
              <p>Jumlah: Rp {parseInt(paymentInstruction.gross_amount).toLocaleString('id-ID')}</p>
            </div>
          )}
          {paymentInstruction.payment_type === 'echannel' && (
            <div>
              <p>Silakan transfer Mandiri Bill Payment:</p>
              <h4 className="fw-bold">Biller Code: {paymentInstruction.biller_code}</h4>
              <h4 className="fw-bold">Bill Key: {paymentInstruction.bill_key}</h4>
              <p>Jumlah: Rp {parseInt(paymentInstruction.gross_amount).toLocaleString('id-ID')}</p>
            </div>
          )}
          {paymentInstruction.payment_type === 'gopay' && (
            <div>
              <p>Silakan scan QR Code GoPay berikut:</p>
              {paymentInstruction.actions && paymentInstruction.actions.map((action, idx) => {
                if (action.name === 'generate-qr-code') {
                  return <img key={idx} src={action.url} alt="GoPay QR Code" className="mb-3 border p-2 rounded" style={{ maxWidth: "200px" }}/>;
                }
                if (action.name === 'deeplink-redirect') {
                  return <div key={idx} className="mt-2"><Button href={action.url} target="_blank" variant="success">Buka Aplikasi Gojek</Button></div>;
                }
                return null;
              })}
            </div>
          )}
          {paymentInstruction.payment_type === 'qris' && (
            <div className="text-center">
              <p>Silakan scan QR Code QRIS berikut:</p>
              {paymentInstruction.actions && paymentInstruction.actions.map((action, idx) => {
                if (action.name === 'generate-qr-code') {
                  return <img key={idx} src={action.url} alt="QRIS QR Code" className="mb-3 border p-3 bg-white rounded shadow-sm mx-auto" style={{ maxWidth: "250px", display: "block" }}/>;
                }
                return null;
              })}
            </div>
          )}
          <Button variant="outline-secondary" className="mt-3 w-100" onClick={() => setPaymentInstruction(null)}>Ganti Metode Pembayaran</Button>
        </div>
      ) : (
        <InvoiceActions 
          isPaid={isPaid} 
          isProcessing={isProcessing} 
          onPay={handlePay} 
          onBack={handleNavigateBack}
          returnPageName={returnPageName}
          totalAmount={totalAmount}
        />
      )}

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
