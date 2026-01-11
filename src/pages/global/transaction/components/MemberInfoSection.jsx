// src/pages/transaction/components/MemberInfoSection.jsx
import React from "react";
import InfoRow from "./InfoRow";

const MemberInfoSection = ({ detail, isFinancing }) => (
  <div className="mb-4">
    <h6 className="fw-bold border-bottom pb-2 mb-3">Informasi Anggota</h6>
    <InfoRow label="Nama" value={detail?.member?.full_name} />
    <InfoRow
      label="Nomor Anggota"
      value={detail?.member?.member_code || "24032101"}
    />
    {!isFinancing && <InfoRow label="Status Anggota" value="Reguler" />}
  </div>
);

export default React.memo(MemberInfoSection);
