import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaHistory,
  FaDownload,
  FaEye,
} from "react-icons/fa";
import { formatIDR, formatDate, formatInvoiceNumber, ITEMS_PER_PAGE } from "./utils";
import DataTable from "../../../../components/ui/DataTable";

function PaymentHistoryTab({ history, onViewInvoice }) {
  const safeHistory = useMemo(() => (Array.isArray(history) ? history : []), [history]);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(safeHistory.length / ITEMS_PER_PAGE));
  const pageItems = safeHistory.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const columns = [
    {
      header: "No. Invoice",
      render: (item) => {
        const billId = item.bill_item_id || item.id;
        const dateObj = item.bill?.updatedAt || item.bill?.updated_at || item.updated_at || item.updatedAt || item.created_at || item.createdAt;
        return (
          <>
            <div className="bp-inv-number">
              {billId ? formatInvoiceNumber(billId, dateObj) : "-"}
            </div>
            <div style={{ fontSize: 10, color: "#6b7280" }}>
              {dateObj
                ? new Date(dateObj).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"
                : ""}
            </div>
          </>
        );
      }
    },
    {
      header: "Jenis Tagihan",
      render: (item) => {
        const title = item.type?.type_name || "Tagihan";
        const subTitle = item.category_code?.replace(/_/g, " ") || "Pembayaran";
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div className="bp-type-icon" style={{ background: "#f0fdf4" }}>
              <FaCheckCircle size={13} color="#10b981" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 12 }}>
                {title}
              </div>
              <div style={{ fontSize: 10, color: "#6b7280" }}>
                {item.description || subTitle}
              </div>
            </div>
          </div>
        );
      }
    },
    {
      header: "Tanggal Bayar",
      render: (item) => {
        const dateObj = item.bill?.updatedAt || item.bill?.updated_at || item.updated_at || item.updatedAt || item.created_at || item.createdAt;
        return <span style={{ fontSize: 12 }}>{formatDate(dateObj)}</span>;
      }
    },
    {
      header: "Jumlah",
      render: (item) => <span style={{ fontWeight: 700, fontSize: 13 }}>{formatIDR(item.amount)}</span>
    },
    {
      header: "Status",
      render: () => <span className="bp-badge bp-badge-paid">Lunas</span>
    },
    {
      header: "Aksi",
      render: (item) => {
        const billId = item.bill_item_id || item.id;
        return (
          <div style={{ display: "flex", gap: 4 }}>
            <button className="bp-btn-download">
              <FaDownload size={10} />
              Unduh
            </button>
            {onViewInvoice && (
              <button
                className="bp-btn-invoice"
                onClick={() => onViewInvoice(billId)}
              >
                <FaEye size={10} /> Invoice
              </button>
            )}
          </div>
        );
      }
    }
  ];

  if (safeHistory.length === 0) {
    return (
      <div className="bp-empty">
        <div className="bp-empty-icon" style={{ background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)" }}>
          <FaHistory size={28} color="#4f46e5" />
        </div>
        <div className="bp-empty-title">Belum Ada Riwayat</div>
        <div className="bp-empty-desc">Riwayat pembayaran tagihan akan muncul di sini.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="bp-card-header">
        <div>
          <div className="bp-card-title">Riwayat Pembayaran</div>
          <div className="bp-card-sub">Daftar pembayaran tagihan yang telah Anda selesaikan.</div>
        </div>
      </div>

      <div className="bp-table-wrap">
        <DataTable
          columns={columns}
          data={pageItems}
          pagination={{
            currentPage: page,
            totalPages: totalPages,
            onPageChange: setPage,
            totalItems: safeHistory.length,
            itemsPerPage: ITEMS_PER_PAGE
          }}
          hover={false}
          responsive={false}
        />
      </div>
    </div>
  );
}

export default React.memo(PaymentHistoryTab);