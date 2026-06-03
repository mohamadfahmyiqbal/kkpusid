import React, { useState, useMemo, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import {
  FaFileInvoiceDollar,
  FaExclamationCircle,
  FaCheckCircle,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { formatIDR, formatDate, getDaysUntilDue, formatInvoiceNumber, ITEMS_PER_PAGE } from "./utils";

function PendingBillsTab({ title, bills, selectedBills, setSelectedBills, disabledBills, handlePay, isSubmitting }) {
  const safeBills = useMemo(() => (Array.isArray(bills) ? bills : []), [bills]);
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(safeBills.length / ITEMS_PER_PAGE));
  const pageBills = safeBills.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const allSelected = safeBills.length > 0 && selectedBills.length === safeBills.length;
  const now = new Date();

  const toggleBill = useCallback(
    (id) => {
      if (disabledBills.includes(id)) return;
      setSelectedBills((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    },
    [disabledBills, setSelectedBills],
  );

  const toggleAll = useCallback(() => {
    setSelectedBills(allSelected ? [] : safeBills.map((b) => b.bill_item_id));
  }, [allSelected, safeBills, setSelectedBills]);

  if (safeBills.length === 0) {
    return (
      <div className="bp-empty">
        <div className="bp-empty-icon">
          <FaCheckCircle size={30} color="#059669" />
        </div>
        <div className="bp-empty-title">Semua Tagihan Lunas! 🎉</div>
        <div className="bp-empty-desc">Tidak ada tagihan yang perlu dibayar saat ini.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="bp-card-header">
        <div>
          <div className="bp-card-title">{title || "Daftar Tagihan Belum Dibayarkan"}</div>
          <div className="bp-card-sub">Segera lakukan pembayaran sebelum melewati tanggal jatuh tempo.</div>
        </div>
        <button className="bp-btn-unduh" onClick={() => handlePay()} disabled={selectedBills.length === 0 || isSubmitting}>
          <FaDownload size={11} />
          Unduh Tagihan
        </button>
      </div>

      <div className="bp-table-wrap">
        <table className="bp-table">
          <thead>
            <tr>
              <th style={{ width: 36 }}>
                <input type="checkbox" checked={allSelected} onChange={toggleAll} style={{ cursor: "pointer" }} />
              </th>
              <th>No. Tagihan</th>
              <th>Jenis Tagihan</th>
              <th>Deskripsi</th>
              <th>Tanggal Tagihan</th>
              <th>Jatuh Tempo</th>
              <th>Jumlah</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pageBills.map((bill) => {
              const isChecked = selectedBills.includes(bill.bill_item_id);
              const isDisabled = disabledBills.includes(bill.bill_item_id);
              const dueDate = bill.due_date ? new Date(bill.due_date) : null;
              const isOverdue = dueDate && dueDate < now;
              const daysLeft = dueDate ? getDaysUntilDue(bill.due_date) : null;
              const isDueSoon = !isOverdue && daysLeft !== null && daysLeft <= 3;

              return (
                <tr
                  key={bill.bill_item_id}
                  className={`${isChecked ? "bp-row-selected" : ""} ${isOverdue ? "bp-row-overdue" : ""}`}
                  onClick={() => toggleBill(bill.bill_item_id)}
                  style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={() => toggleBill(bill.bill_item_id)}
                      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                    />
                  </td>
                  <td>
                    <div className="bp-inv-number">
                      {bill.bill_item_id ? formatInvoiceNumber(bill.bill_item_id, bill.createdAt || bill.due_date) : "-"}
                    </div>
                    {(isOverdue || isDueSoon) && (
                      <div className="bp-due-soon">
                        <FaExclamationCircle size={9} />
                        {isOverdue ? "Sudah lewat jatuh tempo" : `Jatuh tempo ${daysLeft} hari lagi`}
                      </div>
                    )}
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="bp-type-icon">
                        <FaFileInvoiceDollar size={13} color="#2563eb" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 12 }}>{bill.type?.type_name || "Tagihan"}</div>
                        <div style={{ fontSize: 10, color: "#6b7280" }}>{bill.category_code?.replace(/_/g, " ") || ""}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{bill.description || bill.type?.type_name || "-"}</div>
                  </td>
                  <td style={{ fontSize: 12, color: "#6b7280" }}>{bill.createdAt ? formatDate(bill.createdAt) : formatDate(bill.due_date)}</td>
                  <td>
                    <span style={{ fontSize: 12, color: isOverdue ? "#ef4444" : isDueSoon ? "#f59e0b" : "#374151", fontWeight: 600 }}>
                      {dueDate ? formatDate(bill.due_date) : "-"}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{formatIDR(bill.amount)}</td>
                  <td>
                    <span className={`bp-badge ${isOverdue ? "bp-badge-overdue" : "bp-badge-pending"}`}>
                      {isOverdue ? "Terlambat" : "Belum Dibayar"}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button
                      className="bp-btn-pay"
                      onClick={() => {
                        setSelectedBills([bill.bill_item_id]);
                        handlePay([bill.bill_item_id]);
                      }}
                      disabled={isSubmitting}
                    >
                      Bayar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bp-pagination">
        <span className="bp-page-info">
          Menampilkan {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, safeBills.length)} dari {safeBills.length} tagihan
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {selectedBills.length > 0 && (
            <button className="bp-btn-pay" onClick={() => handlePay()} disabled={isSubmitting}>
              {isSubmitting ? <><Spinner animation="border" size="sm" className="me-1" /> Memproses...</> : `Bayar ${selectedBills.length} Tagihan`}
            </button>
          )}
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
    </div>
  );
}

export default React.memo(PendingBillsTab);