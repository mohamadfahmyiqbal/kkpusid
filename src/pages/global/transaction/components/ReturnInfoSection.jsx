// src/pages/transaction/components/ReturnInfoSection.jsx
import React from "react";
import { FaUniversity, FaUserCircle, FaCreditCard, FaExchangeAlt } from "react-icons/fa";
import InfoRow from "./InfoRow";

const ReturnInfoSection = ({ detail }) => (
  <div className="mb-4">
    <div className="d-flex align-items-center gap-2 mb-3">
      <div className="p-2 rounded-3 bg-info bg-opacity-10 text-info">
        <FaUniversity size={14} />
      </div>
      <h6 className="fw-bold mb-0 text-dark">Informasi Rekening Tujuan</h6>
    </div>

    <div className="ps-1">
      <InfoRow
        icon={<FaExchangeAlt size={12} />}
        label="Metode"
        value={detail?.method || "Bank Transfer"}
      />
      <InfoRow 
        icon={<FaUniversity size={12} />} 
        label="Bank" 
        value={detail?.bank_name || detail?.bank?.bankName} 
      />
      <InfoRow
        icon={<FaUserCircle size={12} />}
        label="Nama Pemilik"
        value={detail?.bank_account_name || detail?.bank?.accountName || detail?.member?.full_name || detail?.member?.name}
      />
      <InfoRow
        icon={<FaCreditCard size={12} />}
        label="Nomor Rekening"
        value={detail?.bank_account_no || detail?.bank?.accountNo}
      />
    </div>
  </div>
);

export default React.memo(ReturnInfoSection);
