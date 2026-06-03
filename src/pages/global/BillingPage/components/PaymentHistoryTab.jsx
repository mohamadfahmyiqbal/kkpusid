import React, { useState, useMemo } from "react";
import {
  FaCheckCircle,
  FaHistory,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { formatIDR, formatDate, formatInvoiceNumber, ITEMS_PER_PAGE } from "./utils";

function PaymentHistoryTab({ history }) {
  const safeHistory = useMemo(() => (Array.isArray(history) ? history : []), [history]);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(safeHistory.length / ITEMS_PER_PAGE));
  const pageItems = safeHistory.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

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
        <table className="bp-table">
          <thead>
            <tr>
              <th>No. Invoice</th>
              <th>Jenis Tagihan</th>
              <th>Tanggal Bayar</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item, idx) => (
              <tr key={item.id || idx}>
                <td>
                  <div className="bp-inv-number">
                    {item.id ? formatInvoiceNumber(item.id, item.createdAt) : "-"}
                  </div>
                  <div style={{ fontSize: 10, color: "#6b7280" }}>
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB"
                      : ""}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div className="bp-type-icon" style={{ background: "#f0fdf4" }}>
                      <FaCheckCircle size={13} color="#10b981" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 12 }}>
                        {item.description?.includes("Angsuran") ? "Angsuran" : "Administrasi"}
                      </div>
                      <div style={{ fontSize: 10, color: "#6b7280" }}>
                        {item.description?.includes("Angsuran") ? "Pembiayaan Usaha" : "Biaya Layanan"}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: 12 }}>{formatDate(item.createdAt)}</td>
                <td style={{ fontWeight: 700, fontSize: 13 }}>{formatIDR(item.amount)}</td>
                <td>
                  <span className="bp-badge bp-badge-paid">Lunas</span>
                </td>
                <td>
                  <button className="bp-btn-download">
                    <FaDownload size={10} />
                    Unduh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bp-pagination">
        <span className="bp-page-info">
          Menampilkan {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, safeHistory.length)} dari {safeHistory.length} transaksi
        </span>
        <div className="bp-page-buttons">
          <button className="bp-page-btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            <FaChevronLeft size={10} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} className={`bp-page-btn ${page === i + 1 ? "active" : ""}`} onClick={() => setPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button className="bp-page-btn" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            <FaChevronRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(PaymentHistoryTab);