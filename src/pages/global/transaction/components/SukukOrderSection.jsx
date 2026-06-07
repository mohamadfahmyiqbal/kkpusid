import React from "react";
import { FaFileInvoiceDollar, FaCalendarAlt, FaTag, FaCertificate } from "react-icons/fa";
import InfoRow from "./InfoRow";
import moment from "moment";

const SukukOrderSection = ({ detail }) => {
  const amount = parseFloat(detail?.amount_requested || 0);

  return (
    <>
      {/* Rincian Transaksi */}
      <div className="mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <div className="p-2 rounded-3 bg-success bg-opacity-10 text-success">
            <FaFileInvoiceDollar size={14} />
          </div>
          <h6 className="fw-bold mb-0 text-dark">Rincian Transaksi</h6>
        </div>
        <div className="ps-1">
          <InfoRow icon={<FaTag size={12} />} label="Kategori" value="Investasi Sukuk" />
          <InfoRow
            icon={<FaCalendarAlt size={12} />}
            label="Tanggal Pengajuan"
            value={moment(detail?.createdAt).format("DD MMMM YYYY, HH:mm")}
          />
          <InfoRow
            icon={<FaFileInvoiceDollar size={12} />}
            label="Nominal Investasi"
            value={`Rp ${amount.toLocaleString("id-ID")}`}
            isTotal={true}
            isPrimary={true}
          />
        </div>
      </div>

      {/* Detail Sukuk */}
      {detail?.sukuk && (
        <div className="mb-4">
          <div className="d-flex align-items-center gap-2 mb-3">
            <div className="p-2 rounded-3 bg-primary bg-opacity-10 text-primary">
              <FaCertificate size={14} />
            </div>
            <h6 className="fw-bold mb-0 text-dark">Detail Sukuk</h6>
          </div>
          <div className="ps-1">
            <InfoRow label="Nama Sukuk" value={detail.sukuk.issue_name || "-"} />
            <InfoRow label="Penerbit" value={detail.sukuk.issuer || "-"} />
            <InfoRow label="Jenis" value={detail.sukuk.type || "-"} />
            <InfoRow label="Imbal Hasil" value={detail.sukuk.coupon || "-"} />
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(SukukOrderSection);
