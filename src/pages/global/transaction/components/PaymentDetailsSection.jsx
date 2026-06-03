// src/pages/global/transaction/components/PaymentDetailsSection.jsx
import React from "react";
import { FaFileInvoiceDollar, FaCalendarAlt, FaTag, FaWallet } from "react-icons/fa";
import InfoRow from "./InfoRow";
import moment from "moment";

const PaymentDetailsSection = ({ detail, isFinancing, isTabungan }) => {
  const amount = parseFloat(
    isTabungan ? (detail?.catalog?.target_amount || 0) : (detail?.amount || detail?.item_price || 0)
  );
  
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
          <FaFileInvoiceDollar size={14} />
        </div>
        <h6 className="fw-bold mb-0 text-dark">Rincian Transaksi</h6>
      </div>

      <div className="ps-1">
        <InfoRow 
          icon={<FaTag size={12} />} 
          label="Kategori" 
          value={isFinancing ? "Pembiayaan" : isTabungan ? (detail?.catalog?.target_name || "Pengajuan Tabungan") : (detail?.account_type || detail?.displayName || "Penarikan Simpanan")} 
        />
        <InfoRow 
          icon={<FaCalendarAlt size={12} />} 
          label="Tanggal Pengajuan" 
          value={moment(detail?.created_at || detail?.createdAt).format("DD MMMM YYYY, HH:mm")} 
        />
        <InfoRow 
          icon={<FaWallet size={12} />} 
          label="Metode" 
          value={detail?.method || "Transfer Bank"} 
        />
        <InfoRow 
          icon={<FaFileInvoiceDollar size={12} />} 
          label={isFinancing ? "Total Pembiayaan" : isTabungan ? "Target Tabungan" : "Jumlah Penarikan"} 
          value={`Rp ${amount.toLocaleString("id-ID")}`}
          isTotal={true}
          isPrimary={true}
        />
        {isTabungan && detail?.catalog?.min_monthly_deposit && (
          <InfoRow 
            icon={<FaFileInvoiceDollar size={12} />} 
            label="Minimal Setoran Bulanan" 
            value={`Rp ${parseFloat(detail.catalog.min_monthly_deposit).toLocaleString("id-ID")}`}
          />
        )}
        {isTabungan && detail?.catalog?.term_months && (
          <InfoRow 
            icon={<FaCalendarAlt size={12} />} 
            label="Tenor (Bulan)" 
            value={`${detail.catalog.term_months} Bulan`}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(PaymentDetailsSection);
