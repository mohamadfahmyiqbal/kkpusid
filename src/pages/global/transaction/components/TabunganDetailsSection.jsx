import React from "react";
import { FaInfoCircle, FaCalendarCheck, FaClock, FaClipboardList, FaFileContract } from "react-icons/fa";
import InfoRow from "./InfoRow";

const TabunganDetailsSection = ({ detail }) => {
  if (!detail) return null;
  
  // Format bulan
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const startMonthName = detail.start_period_month ? monthNames[parseInt(detail.start_period_month, 10) - 1] : "-";
  
  // Hitung estimasi selesai
  let endPeriod = "-";
  if (detail.start_period_month && detail.start_period_year && detail.catalog?.term_months) {
    const start = new Date(parseInt(detail.start_period_year), parseInt(detail.start_period_month) - 1);
    start.setMonth(start.getMonth() + parseInt(detail.catalog.term_months));
    const endMonthName = monthNames[start.getMonth()];
    endPeriod = `${endMonthName} ${start.getFullYear()}`;
  }

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
          <FaInfoCircle size={14} />
        </div>
        <h6 className="fw-bold mb-0 text-dark">Informasi Tambahan</h6>
      </div>

      <div className="ps-1">
        <InfoRow 
          icon={<FaCalendarCheck size={12} />} 
          label="Mulai Menabung" 
          value={`${startMonthName} ${detail.start_period_year || "-"}`} 
        />
        <InfoRow 
          icon={<FaClock size={12} />} 
          label="Estimasi Selesai" 
          value={endPeriod} 
        />
        <InfoRow 
          icon={<FaClipboardList size={12} />} 
          label="Kategori Program" 
          value={detail.catalog?.category || "-"} 
        />
        <InfoRow 
          icon={<FaFileContract size={12} />} 
          label="Setoran Bulanan (Minimal)" 
          value={`Rp ${(parseFloat(detail.catalog?.min_monthly_deposit) || 0).toLocaleString("id-ID")}`}
          isPrimary={true}
        />
      </div>
      
      <div className="mt-3 p-3 rounded-3 bg-light border border-light-subtle">
        <div className="d-flex align-items-center gap-2 mb-2 text-success">
          <FaFileContract size={12} />
          <span className="small fw-bold">Ketentuan Tabungan Berjangka</span>
        </div>
        <p className="small text-muted mb-0" style={{ fontSize: '11px', lineHeight: '1.4' }}>
          Dengan ini anggota menyetujui program tabungan sesuai jangka waktu dan setoran bulanan yang telah dipilih. Penarikan sebelum jatuh tempo dapat dikenakan ketentuan khusus dari koperasi.
        </p>
      </div>
    </div>
  );
};

export default React.memo(TabunganDetailsSection);
