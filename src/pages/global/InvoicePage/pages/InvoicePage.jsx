import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

// Components
import {
  InvoiceHeader,
  InvoiceCard,
  InvoiceActions,
  InvoiceLoading,
  InvoiceError,
  InvoiceStatusBadge,
  InvoicePaymentInstruction,
  InvoiceFooter,
} from "../components";

// Hooks
import {
  useInvoiceData,
  useInvoiceNavigation,
  usePaymentEventListener,
} from "../hooks";

// Utils
import UBilling from "../../../../utils/api/UBilling";

const InvoicePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
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

  // Listen to payment completion events (Midtrans snap, DOKU socket, etc.)
  usePaymentEventListener({ refreshData, setIsProcessing });

  const isPaid = billData?.status === "PAID" || status === "success";

  const { handleNavigateBack, returnPageName } = useInvoiceNavigation({
    billData,
    isPaid,
    returnPage,
    registrationId,
    category,
    categoryName,
    originalReturn,
    financingId,
    product,
    productName,
    id,
  });

  const handlePay = async (selectedMethod) => {
    if (!selectedMethod) {
      Swal.fire({
        title: "Perhatian",
        text: "Silakan pilih metode pembayaran.",
        icon: "warning",
      });
      return;
    }

    if (totalAmount <= 0.01) {
      Swal.fire({
        title: "Perhatian",
        text: "Terjadi kesalahan: Jumlah pembayaran tidak valid.",
        icon: "warning",
      });
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
        clearTimeout(safetyTimeout);

        if (response.data.data.billId) {
          setDynamicBillId(response.data.data.billId);
        }

        startPolling();

        const payData = response.data.data.midtransResponse;
        if (payData) {
          setPaymentInstruction(payData);

          // Jika DOKU Checkout / QRIS mengembalikan payment_url, buka popup modal langsung
          if (
            payData.payment_url &&
            typeof window.loadJokulCheckout === "function"
          ) {
            window.loadJokulCheckout(payData.payment_url);
          }
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
    return <InvoiceLoading />;
  }

  if (error || (!billData && !loading)) {
    return <InvoiceError error={error} onBack={handleNavigateBack} />;
  }

  return (
    <Container fluid className="py-3 px-0">
      <InvoiceHeader
        onBack={handleNavigateBack}
        onPrint={() => window.print()}
      />

      <InvoiceStatusBadge isPaid={isPaid} />

      <InvoiceCard
        billData={billData}
        totalAmount={totalAmount}
        isPaid={isPaid}
      />

      {paymentInstruction ? (
        <InvoicePaymentInstruction
          paymentInstruction={paymentInstruction}
          onReset={() => setPaymentInstruction(null)}
        />
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

      <InvoiceFooter />
    </Container>
  );
};

export default InvoicePage;
