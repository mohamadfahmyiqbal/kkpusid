import React, { useState, useCallback } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../routes/helpers";
import USimpanan from "../../../../utils/api/USimpanan";
import {
  formatRupiah,
  parseRawNumber,
} from "../../../../utils/helper/formatRupiah";
import AmountInput from "./AmountInput";
import MethodSelector from "./MethodSelector";
import TransferDetails from "./TransferDetails";
import CashDetails from "./CashDetails";

const WithdrawalForm = ({
  balance,
  categoryCode,
  validate,
  onSuccess,
  userData,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    method: "TRANSFER",
    cashDetails: {
      cashName: userData?.full_name || "",
      cashLocation: "",
      cashTime: "",
    },
  });

  const handleAmountChange = useCallback((val) => {
    setFormData((prev) => ({ ...prev, amount: val }));
  }, []);

  const handleMethodChange = useCallback((val) => {
    setFormData((prev) => ({ ...prev, method: val }));
  }, []);

  const handleCashDetailsChange = useCallback((val) => {
    setFormData((prev) => ({ ...prev, cashDetails: val }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const numericAmount = parseInt(parseRawNumber(formData.amount)) || 0;

    const error = validate({
      amount: numericAmount,
      balance,
      minAmount: 10000,
      method: formData.method,
      bankAccount: userData?.bank_info,
      cashDetails: formData.cashDetails,
    });

    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      if (formData.method === "TRANSFER" && !userData?.bank_info) {
        alert("Data rekening bank belum diatur. Silahkan hubungi admin.");
        setLoading(false);
        return;
      }

      const payload = {
        amount: numericAmount,
        category: categoryCode,
        method: formData.method,
        admin_fee: 4000,
        bank_name:
          formData.method === "TRANSFER"
            ? userData?.bank_info?.bank_name
            : null,
        bank_account_no:
          formData.method === "TRANSFER"
            ? userData?.bank_info?.bank_account_no
            : null,
        account_holder:
          formData.method === "TRANSFER"
            ? userData?.bank_info?.account_holder
            : null,
        pickup_details:
          formData.method === "TUNAI" ? formData.cashDetails : null,
      };

      const res = await USimpanan.requestWithdrawal(payload);

      if (res.data.status) {
        onSuccess();
        setFormData((prev) => ({ ...prev, amount: "" }));
        navigate(
          `/${jwtEncode({
            page: "transactionDetailPage",
            withdrawalId: res.data.data.withdrawal_id,
          })}`
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || "Gagal memproses penarikan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AmountInput value={formData.amount} onChange={handleAmountChange} />
      <MethodSelector value={formData.method} onChange={handleMethodChange} />

      {formData.method === "TRANSFER" ? (
        <TransferDetails bankInfo={userData?.bank_info} />
      ) : (
        <CashDetails
          cashDetails={formData.cashDetails}
          onChange={handleCashDetailsChange}
        />
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-100 fw-bold py-3 mt-3 border-0"
        style={{
          backgroundColor: "#1565C0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(21, 101, 192, 0.2)",
        }}
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "PROSES PENCAIRAN"
        )}
      </Button>
    </Form>
  );
};

export default React.memo(WithdrawalForm);
