// src/pages/transaction/components/MemberInfoSection.jsx
import React from "react";
import { FaUser, FaIdCard, FaUserTag } from "react-icons/fa";
import InfoRow from "./InfoRow";

const MemberInfoSection = ({ detail, isFinancing }) => (
  <div className="mb-4">
    <div className="d-flex align-items-center gap-2 mb-3">
      <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
        <FaUser size={14} />
      </div>
      <h6 className="fw-bold mb-0 text-dark">Informasi Anggota</h6>
    </div>
    
    <div className="ps-1">
      <InfoRow 
        icon={<FaUser size={12} />} 
        label="Nama Lengkap" 
        value={detail?.member?.full_name || detail?.member?.name} 
      />
      <InfoRow 
        icon={<FaIdCard size={12} />} 
        label="ID Anggota" 
        value={detail?.member?.member_code || detail?.member?.member_no || detail?.member?.memberId} 
      />
      {!isFinancing && (
        <InfoRow 
          icon={<FaUserTag size={12} />} 
          label="Tipe Anggota" 
          value={detail?.member?.member_type || detail?.member?.status || "Reguler"} 
        />
      )}
    </div>
  </div>
);

export default React.memo(MemberInfoSection);
