import React from "react";
import { FaBell, FaClock } from "react-icons/fa";
import bellImg from "../../../../assets/images/notification_bell.png";

export default function NotificationHeaderBanner({ unreadCount }) {
  return (
    <div className="np-header-banner">
      <div className="text-start">
        <span className="np-badge-category">Pusat Notifikasi</span>
        <h2 className="np-title">Notifikasi Akun Anda</h2>
        <p className="np-subtitle">
          Pantau semua informasi penting terkait pengajuan, dokumen, jadwal, dan pembaruan akun Anda
          secara real-time.
        </p>

        <div className="np-stats-row">
          <div className="np-stats-card">
            <div className="np-stats-icon-box">
              <FaBell />
            </div>
            <div className="np-stats-info">
              <span className="np-stats-count">{unreadCount}</span>
              <span className="np-stats-label">Belum dibaca</span>
            </div>
          </div>

          <div className="np-stats-card">
            <div
              className="np-stats-icon-box"
              style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}
            >
              <FaClock />
            </div>
            <div className="np-stats-info">
              <span className="np-stats-count" style={{ fontSize: "14px", fontWeight: "700" }}>
                Aktif
              </span>
              <span className="np-stats-label">Pembaruan realtime</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Bell Illustration */}
      <div className="np-bell-illustration-wrapper">
        <img src={bellImg} alt="Ilustrasi Notifikasi" className="np-bell-illustration" />
      </div>
    </div>
  );
}
