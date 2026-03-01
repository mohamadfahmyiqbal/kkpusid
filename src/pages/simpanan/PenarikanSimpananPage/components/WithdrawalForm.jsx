// src/pages/simpanan/PenarikanSimpananPage/components/WithdrawalForm.jsx

import React, { useState, useCallback } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import USimpanan from "../../../../utils/api/USimpanan";
import { parseRawNumber } from "../../../../utils/helper/formatRupiah";
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

    // 1. Sanitasi amount: Pastikan menjadi angka murni sebelum divalidasi dan dikirim
    const numericAmount = Number(parseRawNumber(formData.amount)) || 0;

    const error = validate({
      amount: numericAmount,
      balance,
      minAmount: 10000,
      method: formData.method,
      // Perbaikan: Kirim bankAccount string (no rek), bukan objek bank_info
      bankAccount: userData?.bank_info?.bank_account_no,
      cashDetails: formData.cashDetails,
    });

    if (error) {
      alert(error);
      return;
    }

    try {
      setLoading(true);

      if (
        formData.method === "TRANSFER" &&
        !userData?.bank_info?.bank_account_no
      ) {
        alert("Data rekening bank belum diatur. Silahkan hubungi admin.");
        setLoading(false);
        return;
      }

      /**
       * PAYLOAD FINAL:
       * Diselaraskan dengan skema tabel fisik database kkpus.id:
       * - amount: numeric (clean)
       * - method: string
       * - bank_name & bank_account_no: string flat (bukan nested object)
       * - description: Digunakan untuk menyimpan detail penarikan tunai karena kolom fisik terbatas
       */
      const payload = {
        amount: numericAmount,
        category: categoryCode,
        method: formData.method,
        bank_name:
          formData.method === "TRANSFER"
            ? userData?.bank_info?.bank_name
            : null,
        bank_account_no:
          formData.method === "TRANSFER"
            ? userData?.bank_info?.bank_account_no
            : null,
        cash_name:
          formData.method === "TUNAI" ? formData.cashDetails.cashName : null,
        cash_time:
          formData.method === "TUNAI" ? formData.cashDetails.cashTime : null,
        cash_location:
          formData.method === "TUNAI"
            ? formData.cashDetails.cashLocation
            : null,
        // Field admin_fee dan field boolean manual (is_approved_...) dihapus
        // karena tidak ada di skema database MySQL dan memicu ER_BAD_FIELD_ERROR.
      };

      const res = await USimpanan.requestWithdrawal(payload);

      if (res.data.status) {
        onSuccess();
        setFormData((prev) => ({ ...prev, amount: "" }));

        // Memastikan withdrawalId diambil dari properti yang tepat dalam response data
        const withdrawalId = res.data.data.withdrawal_id || res.data.data.id;

        navigate(
          `/${jwtEncode({
            page: "transactionDetailPage",
            withdrawalId: withdrawalId,
          })}`,
        );
      }
    } catch (err) {
      // Mengambil pesan error spesifik dari MySQL/Sequelize jika ada
      const errorMessage =
        err.response?.data?.message ||
        "Gagal memproses penarikan. Silahkan cek koneksi.";
      alert(errorMessage);
      console.error("Submit Error Context:", err.response?.data);
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
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            MEMPROSES...
          </>
        ) : (
          "PROSES PENCAIRAN"
        )}
      </Button>
    </Form>
  );
};

export default React.memo(WithdrawalForm);
