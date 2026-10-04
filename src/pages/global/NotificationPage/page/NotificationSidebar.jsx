import React from "react";
import { Button } from "react-bootstrap";
import {
  FaBell,
  FaEnvelope,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";
import supportImg from "../../../../assets/images/customer_support.png";

export default function NotificationSidebar({
  stats,
  settings,
  onTabChange,
  onToggleSetting,
  onHelpClick,
}) {
  return (
    <>
      {/* Ringkasan Card */}
      <div className="np-sidebar-card">
        <h5 className="np-sidebar-title">Ringkasan</h5>

        <div className="np-summary-row" onClick={() => onTabChange("all")}>
          <div className="np-summary-left">
            <FaBell className="np-summary-icon text-primary" />
            <span className="np-summary-label">Total Notifikasi</span>
          </div>
          <div className="np-summary-count-box">
            <span className="np-summary-count">{stats.total}</span>
            <FaChevronRight className="np-summary-chevron" />
          </div>
        </div>

        <div className="np-summary-row" onClick={() => onTabChange("unread")}>
          <div className="np-summary-left">
            <FaEnvelope className="np-summary-icon text-warning" />
            <span className="np-summary-label">Belum Dibaca</span>
          </div>
          <div className="np-summary-count-box">
            <span className="np-summary-count">{stats.unread}</span>
            <FaChevronRight className="np-summary-chevron" />
          </div>
        </div>

        <div className="np-summary-row" onClick={() => onTabChange("read")}>
          <div className="np-summary-left">
            <FaCheckCircle className="np-summary-icon text-success" />
            <span className="np-summary-label">Sudah Dibaca</span>
          </div>
          <div className="np-summary-count-box">
            <span className="np-summary-count">{stats.read}</span>
            <FaChevronRight className="np-summary-chevron" />
          </div>
        </div>
      </div>

      {/* Pengaturan Notifikasi Card */}
      <div className="np-sidebar-card">
        <h5 className="np-sidebar-title">Pengaturan Notifikasi</h5>

        <div className="np-setting-row">
          <div className="np-setting-info">
            <span className="np-setting-label">Email</span>
            <span className="np-setting-desc">Terima update via email</span>
          </div>
          <button
            className={`np-switch-toggle ${settings.email ? "active" : ""}`}
            onClick={() => onToggleSetting("email")}
            aria-label="Toggle email notification"
          />
        </div>

        <div className="np-setting-row">
          <div className="np-setting-info">
            <span className="np-setting-label">Push Notification</span>
            <span className="np-setting-desc">Notifikasi realtime di browser</span>
          </div>
          <button
            className={`np-switch-toggle ${settings.push ? "active" : ""}`}
            onClick={() => onToggleSetting("push")}
            aria-label="Toggle push notification"
          />
        </div>

        <div className="np-setting-row">
          <div className="np-setting-info">
            <span className="np-setting-label">SMS</span>
            <span className="np-setting-desc">Info penting via SMS</span>
          </div>
          <button
            className={`np-switch-toggle ${settings.sms ? "active" : ""}`}
            onClick={() => onToggleSetting("sms")}
            aria-label="Toggle SMS notification"
          />
        </div>
      </div>

      {/* Bantuan Card */}
      <div className="np-help-card">
        <h5 className="np-help-title">Butuh Bantuan?</h5>
        <p className="np-help-desc">
          Tim kami siap membantu Anda jika ada kendala atau pertanyaan terkait notifikasi.
        </p>

        <div className="np-help-illustration-box">
          <img
            src={supportImg}
            alt="Customer Support"
            className="np-help-illustration"
          />
        </div>

        <Button
          className="np-help-btn"
          onClick={onHelpClick}
        >
          Hubungi Kami <FaChevronRight size={10} className="ms-1" />
        </Button>
      </div>
    </>
  );
}
