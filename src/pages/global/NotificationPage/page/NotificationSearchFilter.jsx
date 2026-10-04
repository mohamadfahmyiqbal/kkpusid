import React from "react";
import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

export default function NotificationSearchFilter({
  searchInput,
  onSearchChange,
  categoryInput,
  onCategoryChange,
  tabStatus,
  onTabChange,
  unreadCount,
  onMarkAllAsRead,
}) {
  return (
    <>
      {/* Filter & Search Bar */}
      <div className="np-search-filter-row">
        <div className="np-search-input-wrapper">
          <FaSearch className="np-search-icon" />
          <Form.Control
            type="text"
            placeholder="Cari notifikasi..."
            className="np-search-input"
            value={searchInput}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <Form.Select
            className="np-filter-dropdown"
            value={categoryInput}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              width: "150px",
              borderRadius: "12px",
              border: "1.5px solid #e2e8f0",
              fontSize: "13px",
              fontWeight: "600",
              padding: "10px 14px",
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
          >
            <option value="all">📂 Semua Kategori</option>
            <option value="transaction">💸 Transaksi</option>
            <option value="payment">💳 Pembayaran</option>
            <option value="system">⚙️ Sistem</option>
            <option value="reminder">📅 Pengingat</option>
            <option value="announcement">📢 Pengumuman</option>
          </Form.Select>

          <Button className="np-mark-all-btn" onClick={onMarkAllAsRead}>
            Tandai Semua sebagai Dibaca
          </Button>
        </div>
      </div>

      {/* Tabs Status Baca */}
      <div className="np-tabs-row">
        <button
          className={`np-tab-btn ${tabStatus === "all" ? "active" : ""}`}
          onClick={() => onTabChange("all")}
        >
          Semua
        </button>
        <button
          className={`np-tab-btn ${tabStatus === "unread" ? "active" : ""}`}
          onClick={() => onTabChange("unread")}
        >
          Belum Dibaca
          {unreadCount > 0 && <span className="np-tab-badge">{unreadCount}</span>}
        </button>
        <button
          className={`np-tab-btn ${tabStatus === "read" ? "active" : ""}`}
          onClick={() => onTabChange("read")}
        >
          Sudah Dibaca
        </button>
      </div>
    </>
  );
}
