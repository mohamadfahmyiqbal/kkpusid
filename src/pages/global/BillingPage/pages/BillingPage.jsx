// 📁 src/pages/global/BillingPage/pages/BillingPage.jsx
import React, { useState, useMemo, useEffect } from "react";
import { Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UBilling from "../../../../utils/api/UBilling";
import { jwtEncode } from "../../../../utils/helpers";
import PageTitle from "../../../../components/layout/components/PageTitle";
import { useBillingData } from "../hooks/useBillingData";
import BillList from "../components/BillList";
import SukarelaForm from "../components/SukarelaForm";
import HistoryList from "../components/HistoryList";

const BillingPage = ({ decodedToken }) => {
  const navigate = useNavigate();

  const [selectedBills, setSelectedBills] = useState([]);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    bills,
    history,
    loadingData,
    registrationId,
    isSukarela,
    displayName,
    categoryName,
  } = useBillingData(decodedToken);

  const mandatoryBills = useMemo(() => {
    if (decodedToken?.return === "registrationPage") {
      const currentMonth = new Date().toLocaleDateString("en-US", {
        month: "long",
      });
      return bills.filter(
        (bill) =>
          bill.description?.toLowerCase().includes("simpanan pokok") ||
          bill.description
            ?.toLowerCase()
            .includes(`simpanan wajib - ${currentMonth.toLowerCase()}`),
      );
    }
    return [];
  }, [bills, decodedToken]);

  useEffect(() => {
    if (mandatoryBills.length > 0) {
      setSelectedBills((prev) => {
        const newSelected = [
          ...new Set([...prev, ...mandatoryBills.map((b) => b.bill_item_id)]),
        ];
        return newSelected;
      });
    }
  }, [mandatoryBills]);

  const totalAmount = useMemo(() => {
    const safeBills = Array.isArray(bills) ? bills : [];
    return safeBills
      .filter((bill) => selectedBills.includes(bill.bill_item_id))
      .reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0);
  }, [selectedBills, bills]);

  const handleNavigateToInvoice = async () => {
    setIsSubmitting(true);
    try {
      if (isSukarela) {
        const cleanAmount = parseFloat(customAmount.replace(/\./g, ""));
        if (!cleanAmount || cleanAmount < 1000) {
          alert("Nominal setoran minimal Rp 1.000");
          setIsSubmitting(false);
          return;
        }

        const response = await UBilling.createVoluntaryBill({
          category: categoryName,
          amount: cleanAmount,
        });

        if (response.data?.status) {
          const itemIds = response.data.data.bill_item_ids;
          const token = jwtEncode({
            page: "invoicePage",
            billItemIds: Array.isArray(itemIds) ? itemIds : [itemIds],
            return: "billingPage",
          });
          navigate(`/${token}`);
        }
      } else {
        if (selectedBills.length === 0) return;
        const token = jwtEncode({
          page: "invoicePage",
          billItemIds: selectedBills,
          registrationId: registrationId,
          return: "billingPage",
        });
        navigate(`/${token}`);
      }
    } catch (err) {
      alert("Gagal memproses transaksi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-3 bg-light min-vh-100">
      <Card className="border-0 shadow-sm rounded-3 mb-4 overflow-hidden">
        {isSukarela ? (
          <>
            <Card.Header className="bg-primary text-white py-2 d-flex justify-content-between align-items-center">
              <span className="fw-bold" style={{ fontSize: "14px" }}>
                Input Nominal
              </span>
            </Card.Header>
            <Card.Body className="p-4">
              {loadingData ? (
                <div className="p-5 text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <SukarelaForm
                  customAmount={customAmount}
                  setCustomAmount={setCustomAmount}
                  handleNavigateToInvoice={handleNavigateToInvoice}
                  isSubmitting={isSubmitting}
                />
              )}
            </Card.Body>
          </>
        ) : (
          <BillList
            bills={bills}
            selectedBills={selectedBills}
            setSelectedBills={setSelectedBills}
            totalAmount={totalAmount}
            handleNavigateToInvoice={handleNavigateToInvoice}
            isSubmitting={isSubmitting}
            loadingData={loadingData}
            disabledBills={mandatoryBills.map((b) => b.bill_item_id)}
          />
        )}
      </Card>

      <HistoryList history={history} />
    </div>
  );
};

export default BillingPage;
