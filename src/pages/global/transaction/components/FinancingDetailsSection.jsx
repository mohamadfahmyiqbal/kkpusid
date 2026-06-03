import React from "react";
import { FaInfoCircle, FaHandshake, FaFileContract, FaCalendarCheck, FaUsers, FaClipboardList, FaFileAlt } from "react-icons/fa";
import InfoRow from "./InfoRow";

const FinancingDetailsSection = ({ detail }) => {
  const isArisan = detail?.category === "Arisan" || detail?.account_type === "Arisan";

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
          <FaInfoCircle size={14} />
        </div>
        <h6 className="fw-bold mb-0 text-dark">Detail {isArisan ? "Arisan" : "Pembiayaan"}</h6>
      </div>

      <div className="ps-1">
        {detail?.nama_nasabah && (
          <InfoRow 
            icon={<FaUsers size={12} />} 
            label="Nama Anggota" 
            value={detail.nama_nasabah} 
          />
        )}
        {detail?.nama_peserta_2 && (
          <InfoRow 
            icon={<FaUsers size={12} />} 
            label="Nama Peserta Ke-2" 
            value={detail.nama_peserta_2} 
          />
        )}
        <InfoRow 
          icon={<FaFileAlt size={12} />} 
          label="Program" 
          value={detail?.purpose || detail?.item_name || "-"} 
        />
        <InfoRow 
          icon={<FaHandshake size={12} />} 
          label="Jenis Akad" 
          value={detail?.akad_type || (isArisan ? "Musyarakah Mutanaqisah" : "Murabahah")} 
        />
        <InfoRow 
          icon={<FaCalendarCheck size={12} />} 
          label={isArisan ? "Durasi Program" : "Tenor"} 
          value={`${detail?.cooperation_months || 0} Bulan`} 
        />
        <InfoRow 
          icon={<FaFileContract size={12} />} 
          label={isArisan ? "Setoran Bulanan" : "Angsuran Bulanan"} 
          value={`Rp ${(parseFloat(detail?.monthly_installment) || 0).toLocaleString("id-ID")}`}
          isPrimary={true}
        />
        {detail?.keterangan && (
          <div className="mt-3">
            <div className="d-flex align-items-center gap-2 mb-1 text-muted">
              <FaClipboardList size={12} />
              <span className="small fw-bold">Keterangan Pembukaan</span>
            </div>
            <p className="small text-dark mb-0 bg-light p-2 rounded-2 border-start border-primary border-3">
              {detail.keterangan}
            </p>
          </div>
        )}
      </div>

      <div className="mt-3 p-3 rounded-3 bg-light border border-light-subtle">
        <div className="d-flex align-items-center gap-2 mb-2 text-success">
          <FaFileContract size={12} />
          <span className="small fw-bold">Persetujuan Akad Digital</span>
        </div>
        <p className="small text-muted mb-0" style={{ fontSize: '11px', lineHeight: '1.4' }}>
          Anggota telah menyetujui syarat dan ketentuan {isArisan ? "program arisan" : "pembiayaan"} secara digital pada saat pengajuan.
        </p>
      </div>
    </div>
  );
};

export default React.memo(FinancingDetailsSection);
