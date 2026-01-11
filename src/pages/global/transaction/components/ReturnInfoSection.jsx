// src/pages/transaction/components/ReturnInfoSection.jsx
import React from "react";
import InfoRow from "./InfoRow";

const ReturnInfoSection = ({ detail }) => (
  <div className="mb-4">
    <h6 className="fw-bold border-bottom pb-2 mb-3">Informasi Pengembalian</h6>
    <InfoRow
      label="Metode Pembayaran"
      value={detail?.payment_method || "Bank Transfer"}
    />
    <InfoRow label="Bank" value={detail?.bank_name || "Bank Mandiri"} />
    <InfoRow
      label="Nama Nasabah"
      value={detail?.account_name || detail?.member?.full_name}
    />
    <InfoRow
      label="No Rekening"
      value={detail?.account_number || "2342342423424234"}
    />
  </div>
);

export default React.memo(ReturnInfoSection);
