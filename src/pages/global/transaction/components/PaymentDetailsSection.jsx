// src/pages/transaction/components/PaymentDetailsSection.jsx
import React from "react";
import InfoRow from "./InfoRow";

const PaymentDetailsSection = ({ detail, isFinancing }) => (
  <div className="mb-4">
    <h6 className="fw-bold border-bottom pb-2 mb-3">
      {isFinancing ? "Detail Pengajuan" : "Pembayaran"}
    </h6>
    {isFinancing ? (
      <>
        <InfoRow label="Tipe" value={detail?.purpose?.split(":")[0]} />
        <InfoRow
          label="Nama"
          value={detail?.purpose?.split(":")[1] || detail?.purpose}
        />
        <InfoRow
          label="Harga"
          value={`Rp ${(Number(detail?.item_price) || 0).toLocaleString(
            "id-ID",
          )}`}
        />
        <InfoRow
          label="DP"
          value={`Rp ${(Number(detail?.down_payment) || 0).toLocaleString(
            "id-ID",
          )}`}
        />
        <InfoRow
          label="Jumlah term"
          value={`${detail?.cooperation_months}x Pembayaran`}
        />
      </>
    ) : (
      <>
        <InfoRow
          label="Penarikan Simpanan Sukarela"
          value={`Rp ${(Number(detail?.amount) || 0).toLocaleString("id-ID")}`}
        />
        <InfoRow
          label="Total"
          value={`Rp ${(Number(detail?.amount) || 0).toLocaleString("id-ID")}`}
          isTotal
        />
      </>
    )}
  </div>
);

export default React.memo(PaymentDetailsSection);
