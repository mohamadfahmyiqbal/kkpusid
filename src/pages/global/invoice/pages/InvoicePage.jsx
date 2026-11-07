import React from "react";
import { Container } from "react-bootstrap";

// Components
import {
  InvoiceHeader,
  InvoiceCard,
  InvoiceActions,
  InvoiceLoading,
  InvoiceError,
  InvoiceStatusBadge,
  InvoiceFooter,
} from "../components";

// Hooks
import {
  useInvoiceData,
  useInvoiceNavigation,
  usePaymentEventListener,
} from "../hooks";

const InvoicePage = () => {
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
    refreshData,
    status,
    product,
    productName,
    id,
    setDynamicBillId,
  } = useInvoiceData();

  // Listen to payment completion events (Midtrans snap, DOKU socket, etc.)
  usePaymentEventListener({ refreshData });

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

      <InvoiceStatusBadge isPaid={isPaid} status={billData?.status} />

      <InvoiceCard
        billData={billData}
        totalAmount={totalAmount}
        isPaid={isPaid}
      />

      <InvoiceActions
        isPaid={isPaid}
        billData={billData}
        totalAmount={totalAmount}
        billItemIds={billItemIds}
        category={category}
        financingId={financingId}
        onBack={handleNavigateBack}
        returnPageName={returnPageName}
        onPaymentSubmitted={(result) => {
          if (result?.bill_id) {
            setDynamicBillId(result.bill_id);
          }
          if (refreshData) {
            refreshData();
          }
        }}
      />

      <InvoiceFooter />
    </Container>
  );
};

export default InvoicePage;
