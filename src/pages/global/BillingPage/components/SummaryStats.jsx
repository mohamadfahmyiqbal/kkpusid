import React from "react";
import {
  FaFileInvoiceDollar,
  FaCalendarAlt,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";
import { formatIDR, formatDate, getDaysUntilDue } from "./utils";

function SummaryStats({ bills, history }) {
  const safeBills = Array.isArray(bills) ? bills : [];
  const safeHistory = Array.isArray(history) ? history : [];

  const totalPending = safeBills.reduce((s, b) => s + parseFloat(b.amount || 0), 0);
  const totalPaid = safeHistory.reduce((s, h) => s + parseFloat(h.amount || 0), 0);
  const totalAll = totalPending + totalPaid;
  const nearestDue = safeBills
    .filter((b) => b.due_date)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];

  const daysLeft = nearestDue ? getDaysUntilDue(nearestDue.due_date) : null;

  const stats = [
    {
      icon: <FaFileInvoiceDollar size={16} />,
      iconBg: "rgba(239,68,68,0.25)",
      label: "Total Belum Dibayar",
      value: formatIDR(totalPending),
      sub: `${safeBills.length} Tagihan`,
    },
    {
      icon: <FaCalendarAlt size={16} />,
      iconBg: "rgba(245,158,11,0.25)",
      label: "Jatuh Tempo Terdekat",
      value: nearestDue ? formatDate(nearestDue.due_date) : "Tidak ada",
      sub: daysLeft !== null ? (daysLeft < 0 ? "Sudah lewat" : `${daysLeft} hari lagi`) : "-",
    },
    {
      icon: <FaCheckCircle size={16} />,
      iconBg: "rgba(16,185,129,0.25)",
      label: "Total Terbayar",
      value: formatIDR(totalPaid),
      sub: `${safeHistory.length} Transaksi`,
    },
    {
      icon: <FaWallet size={16} />,
      iconBg: "rgba(99,102,241,0.25)",
      label: "Total Tagihan",
      value: formatIDR(totalAll),
      sub: `${safeBills.length + safeHistory.length} Tagihan`,
    },
  ];

  return (
    <div className="bp-stats">
      {stats.map((s, i) => (
        <div className="bp-stat-card" key={i}>
          <div className="bp-stat-icon" style={{ background: s.iconBg }}>
            {s.icon}
          </div>
          <div>
            <div className="bp-stat-label">{s.label}</div>
            <div className="bp-stat-value">{s.value}</div>
            <div className="bp-stat-sub">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default React.memo(SummaryStats);