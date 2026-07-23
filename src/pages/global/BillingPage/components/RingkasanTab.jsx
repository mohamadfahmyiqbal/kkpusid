import React, { useMemo } from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import { formatIDR, formatDate } from "./utils";

function RingkasanTab({ bills, history, onGoToPending }) {
  const safeBills = useMemo(() => (Array.isArray(bills) ? bills : []), [bills]);
  const safeHistory = useMemo(() => (Array.isArray(history) ? history : []), [history]);
  const overdue = useMemo(() => safeBills.filter((b) => b.due_date && new Date(b.due_date) < new Date()), [safeBills]);
  const totalPending = useMemo(() => safeBills.reduce((s, b) => s + parseFloat(b.amount || 0), 0), [safeBills]);
  const totalPaid = useMemo(() => safeHistory.reduce((s, h) => s + parseFloat(h.amount || 0), 0), [safeHistory]);

  return (
    <div style={{ padding: 20 }}>
      <div className="bp-ringkasan-grid">
        {/* Pending */}
        <div className="bp-ringkasan-card bp-ringkasan-card--pending">
          <div className="bp-ringkasan-card-header">
            <FaExclamationCircle color="#ef4444" size={16} />
            <span className="bp-ringkasan-card-title">Tagihan Pending</span>
          </div>
          <div className="bp-ringkasan-card-value">{safeBills.length}</div>
          <div className="bp-ringkasan-card-sub">Total: {formatIDR(totalPending)}</div>
          {overdue.length > 0 && (
            <div className="bp-ringkasan-card-alert">⚠ {overdue.length} tagihan sudah melewati jatuh tempo</div>
          )}
          {safeBills.length > 0 && (
            <button className="bp-ringkasan-btn" onClick={onGoToPending}>
              Bayar Sekarang
            </button>
          )}
        </div>

        {/* Lunas */}
        <div className="bp-ringkasan-card bp-ringkasan-card--paid">
          <div className="bp-ringkasan-card-header">
            <FaCheckCircle color="#10b981" size={16} />
            <span className="bp-ringkasan-card-title">Riwayat Pembayaran</span>
          </div>
          <div className="bp-ringkasan-card-value">{safeHistory.length}</div>
          <div className="bp-ringkasan-card-sub">Total: {formatIDR(totalPaid)}</div>
          <div className="bp-ringkasan-card-alert">✓ Semua transaksi berhasil</div>
        </div>
      </div>

      {/* Recent history preview */}
      {safeHistory.slice(0, 3).map((item, idx) => {
        const dateObj = item.bill?.updatedAt || item.bill?.updated_at || item.updated_at || item.updatedAt || item.created_at || item.createdAt;
        const description = item.description || item.type?.type_name || "Transaksi";
        return (
          <div className="bp-ringkasan-history-item" key={item.bill_item_id || item.id || idx}>
            <div className="bp-ringkasan-history-icon">
              <FaCheckCircle color="#10b981" size={14} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="bp-ringkasan-history-desc">{description}</div>
              <div className="bp-ringkasan-history-date">{formatDate(dateObj)}</div>
            </div>
            <div className="bp-ringkasan-history-amount">{formatIDR(item.amount)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default React.memo(RingkasanTab);