// src/pages/tabungan/PenarikanTabunganPage/components/WithdrawalTabunganForm.jsx

import React, { useState, useCallback } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import http from "../../../../utils/api/common";
import { formatRupiah } from "../../../../utils/helper/formatRupiah";
import MethodSelector from "../../../simpanan/PenarikanSimpananPage/components/MethodSelector";
import TransferDetails from "../../../simpanan/PenarikanSimpananPage/components/TransferDetails";
import CashDetails from "../../../simpanan/PenarikanSimpananPage/components/CashDetails";

const WithdrawalTabunganForm = ({
  balance,
  tabunganId,
  product,
  onSuccess,
  userData,
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    method: "TRANSFER",
    cashDetails: {
      cashName: userData?.full_name || "",
      cashLocation: "",
      cashTime: "",
    },
  });

  const handleMethodChange = useCallback((val) => {
    setFormData((prev) => ({ ...prev, method: val }));
  }, []);

  const handleCashDetailsChange = useCallback((val) => {
    setFormData((prev) => ({ ...prev, cashDetails: val }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!balance || balance <= 0) {
      Swal.fire({ title: 'Perhatian', text: "Saldo tabungan tidak mencukupi untuk dicairkan.", icon: 'warning' });
      return;
    }

    try {
      setLoading(true);

      if (
        formData.method === "TRANSFER" &&
        !userData?.bank_info?.bank_account_no
      ) {
        Swal.fire({ title: 'Perhatian', text: "Data rekening bank belum diatur. Silahkan hubungi admin.", icon: 'warning' });
        setLoading(false);
        return;
      }

      const payload = {
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
      };

      const res = await http.post(`/tabungan/pengajuan/${tabunganId}/withdraw`, payload);

      if (res.data?.status) {
        onSuccess();

        const withdrawalId = res.data.data.withdrawal_id || res.data.data.id;

        Swal.fire({
          title: "Berhasil",
          text: "Pengajuan pencairan tabungan berhasil dikirim. Menunggu persetujuan.",
          icon: "success"
        }).then(() => {
          navigate(
            `/${jwtEncode({
              page: "transactionDetailPage",
              withdrawalId: withdrawalId,
              // Removed tabunganId so TransactionDetailPage treats this as a Withdrawal instead of Tabungan target enrollment
              return: "tabunganPage",
              product: product || "Tabungan"
            })}`,
          );
        });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Gagal memproses penarikan. Silahkan cek koneksi.";
      Swal.fire({ title: 'Perhatian', text: errorMessage, icon: 'warning' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Read-only amount for tabungan */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small text-muted">Total Pencairan</Form.Label>
        <div className="input-group">
          <span className="input-group-text bg-light border-end-0 fw-bold">Rp</span>
          <Form.Control
            type="text"
            className="border-start-0 ps-0 fw-bold text-success fs-5 bg-light"
            value={formatRupiah(balance)}
            readOnly
          />
        </div>
        <Form.Text className="text-muted">
          Pencairan tabungan akan menarik seluruh target saldo yang telah terkumpul.
        </Form.Text>
      </Form.Group>

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
        disabled={loading || balance <= 0}
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

export default React.memo(WithdrawalTabunganForm);
