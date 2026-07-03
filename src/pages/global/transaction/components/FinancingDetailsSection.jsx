import React from "react";
import { FaInfoCircle, FaHandshake, FaFileContract, FaCalendarCheck, FaUsers, FaClipboardList, FaFileAlt, FaMoneyBillWave } from "react-icons/fa";
import { MdShield } from "react-icons/md";
import InfoRow from "./InfoRow";

const FinancingDetailsSection = ({ detail, isPelunasan }) => {
  const isArisan = detail?.category === "Arisan" || detail?.account_type === "Arisan";

  return (
    <div className="mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
          <FaInfoCircle size={14} />
        </div>
        <h6 className="fw-bold mb-0 text-dark">Detail {isArisan ? "Arisan" : "Pembiayaan"}</h6>
      </div>

      <div className="ps-1 mb-4">
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

        {detail?.keterangan && (
          <div className="mt-3 mb-4">
            <div className="d-flex align-items-center gap-2 mb-1 text-muted">
              <FaClipboardList size={12} />
              <span className="small fw-bold">Keterangan Pembukaan</span>
            </div>
            <p className="small text-dark mb-0 bg-light p-2 rounded-2 border-start border-primary border-3">
              {detail.keterangan}
            </p>
          </div>
        )}

        {/* Highlighted Total */}
        <div className="my-4 p-3 bg-light rounded-3 border">
          <div className="text-muted small fw-bold mb-1 text-uppercase" style={{ letterSpacing: "1px" }}>
            Total {isPelunasan ? "Pelunasan" : "Tagihan (Termasuk Margin)"}
          </div>
          <h3 className="mb-0 fw-bold text-primary">
            Rp {parseFloat(detail?.total_tagihan || 0).toLocaleString("id-ID")}
          </h3>
        </div>

        {/* Financial Breakdown */}
        {!isPelunasan && (
          <>
            <InfoRow 
              icon={<FaMoneyBillWave size={12} />} 
              label="Harga Barang" 
              value={`Rp ${parseFloat(detail?.item_price || 0).toLocaleString("id-ID")}`} 
            />
            <InfoRow 
              icon={<FaMoneyBillWave size={12} />} 
              label="Uang Tanda Keseriusan" 
              value={`Rp ${parseFloat(detail?.down_payment || 0).toLocaleString("id-ID")}`} 
            />
          </>
        )}

        {detail?.operational_cost && parseFloat(detail.operational_cost) !== 0 && (
          <InfoRow 
            icon={<FaMoneyBillWave size={12} />} 
            label={isPelunasan ? "Diskon Pelunasan" : "Biaya Operasional"} 
            value={`Rp ${parseFloat(Math.abs(detail.operational_cost)).toLocaleString("id-ID")} ${parseFloat(detail.operational_cost) < 0 ? "(Dikurangi)" : "(Ditambah)"}`} 
          />
        )}

        <InfoRow 
          icon={<FaMoneyBillWave size={12} />} 
          label={isPelunasan ? "Sisa Pokok Tagihan" : "Pokok Pembiayaan"} 
          value={`Rp ${parseFloat(detail?.amount_requested || 0).toLocaleString("id-ID")}`}
        />

        {!isPelunasan && (
          <>
            <InfoRow 
              icon={<FaMoneyBillWave size={12} />} 
              label={`Keuntungan Koperasi (${detail?.margin_percent || 0}%)`} 
              value={`Rp ${parseFloat(detail?.margin_amount || 0).toLocaleString("id-ID")}`} 
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
          </>
        )}
      </div>

      <div className="mt-2 p-3 rounded-3 bg-light border border-light-subtle">
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
