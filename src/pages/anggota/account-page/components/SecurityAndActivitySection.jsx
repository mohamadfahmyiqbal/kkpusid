import React from "react";
import { Row, Col, Button, Card } from "react-bootstrap";
import {
  FaLock,
  FaShieldAlt,
  FaBell,
  FaHistory,
  FaEnvelope,
  FaPhone,
  FaSignInAlt,
  FaUserEdit,
  FaFileAlt,
  FaArrowRight,
  FaExclamationTriangle,
  FaUserMinus,
} from "react-icons/fa";

export default function SecurityAndActivitySection({
  userProfile,
  onOpenPasswordModal,
  onTerminateKeanggotaan,
  onShowNotification,
}) {
  return (
    <>
      {/* 1. Akses Cepat */}
      <div className="text-start mt-4">
        <h5 className="ap-section-title">Akses Cepat</h5>
        <p className="ap-section-desc">Kelola akun dan keamanan Anda dengan mudah.</p>
      </div>
      <Row className="g-3 mb-4">
        {/* Card 1: Reset Password */}
        <Col lg={3} md={6} sm={12}>
          <div className="ap-quick-card" onClick={onOpenPasswordModal}>
            <div className="d-flex align-items-center gap-3">
              <div
                className="ap-quick-icon-wrapper"
                style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
              >
                <FaLock />
              </div>
              <div className="text-start">
                <strong className="d-block text-slate-800 fs-7">Reset Password</strong>
                <span className="text-muted" style={{ fontSize: "10.5px" }}>
                  Ubah password berkala
                </span>
              </div>
            </div>
            <FaArrowRight className="ap-quick-arrow" />
          </div>
        </Col>

        {/* Card 2: Verifikasi Akun */}
        <Col lg={3} md={6} sm={12}>
          <div
            className="ap-quick-card"
            onClick={() =>
              onShowNotification("Akun Anda telah terverifikasi sebagai anggota.", "success")
            }
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="ap-quick-icon-wrapper"
                style={{ backgroundColor: "#f0fdf4", color: "#16a34a" }}
              >
                <FaShieldAlt />
              </div>
              <div className="text-start">
                <strong className="d-block text-slate-800 fs-7">Verifikasi Akun</strong>
                <span className="text-muted" style={{ fontSize: "10.5px" }}>
                  Verifikasi identitas aman
                </span>
              </div>
            </div>
            <FaArrowRight className="ap-quick-arrow" />
          </div>
        </Col>

        {/* Card 3: Pengaturan Notifikasi */}
        <Col lg={3} md={6} sm={12}>
          <div
            className="ap-quick-card"
            onClick={() =>
              onShowNotification("Preferensi notifikasi default telah aktif.", "success")
            }
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="ap-quick-icon-wrapper"
                style={{ backgroundColor: "#faf5ff", color: "#7c3aed" }}
              >
                <FaBell />
              </div>
              <div className="text-start">
                <strong className="d-block text-slate-800 fs-7">Pengaturan Notif</strong>
                <span className="text-muted" style={{ fontSize: "10.5px" }}>
                  Kelola notifikasi Anda
                </span>
              </div>
            </div>
            <FaArrowRight className="ap-quick-arrow" />
          </div>
        </Col>

        {/* Card 4: Riwayat Aktivitas */}
        <Col lg={3} md={6} sm={12}>
          <div
            className="ap-quick-card"
            onClick={() => onShowNotification("Semua aktivitas telah ditampilkan.", "success")}
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="ap-quick-icon-wrapper"
                style={{ backgroundColor: "#fffbeb", color: "#d97706" }}
              >
                <FaHistory />
              </div>
              <div className="text-start">
                <strong className="d-block text-slate-800 fs-7">Riwayat Aktivitas</strong>
                <span className="text-muted" style={{ fontSize: "10.5px" }}>
                  Aktivitas terbaru akun
                </span>
              </div>
            </div>
            <FaArrowRight className="ap-quick-arrow" />
          </div>
        </Col>
      </Row>

      {/* 2. Keamanan & Aktivitas (2 Kolom) */}
      <Row className="g-4 mb-4">
        {/* Keamanan Akun */}
        <Col lg={6} md={12}>
          <div className="ap-security-card text-start">
            <h5 className="fw-bold mb-3">Keamanan Akun</h5>
            <div className="ap-list-row">
              <div className="ap-row-left">
                <FaLock className="ap-row-icon" />
                <div>
                  <strong className="ap-row-label">Password</strong>
                  <span className="ap-row-desc">Terakhir diubah 2 bulan yang lalu</span>
                </div>
              </div>
              <Button
                variant="link"
                className="text-decoration-none text-primary fw-bold p-0 fs-7"
                onClick={onOpenPasswordModal}
              >
                Ubah
              </Button>
            </div>

            <div className="ap-list-row">
              <div className="ap-row-left">
                <FaShieldAlt className="ap-row-icon" />
                <div>
                  <strong className="ap-row-label">Verifikasi Dua Langkah</strong>
                  <span className="ap-row-desc">Keamanan ekstra untuk masuk akun</span>
                </div>
              </div>
              <span className="ap-active-text">Aktif</span>
            </div>

            <div className="ap-list-row">
              <div className="ap-row-left">
                <FaEnvelope className="ap-row-icon" />
                <div>
                  <strong className="ap-row-label">Email</strong>
                  <span className="ap-row-desc">{userProfile?.email}</span>
                </div>
              </div>
              <span className="ap-verified-badge">Terverifikasi</span>
            </div>

            <div className="ap-list-row">
              <div className="ap-row-left">
                <FaPhone className="ap-row-icon" />
                <div>
                  <strong className="ap-row-label">Nomor Telepon</strong>
                  <span className="ap-row-desc">{userProfile?.telepon}</span>
                </div>
              </div>
              <span className="ap-verified-badge">Terverifikasi</span>
            </div>
          </div>
        </Col>

        {/* Ringkasan Aktivitas */}
        <Col lg={6} md={12}>
          <div className="ap-activity-card text-start">
            <div className="mb-3">
              <h5 className="fw-bold mb-1">Ringkasan Aktivitas</h5>
              <span className="text-muted fs-8">Aktivitas terakhir pada akun Anda.</span>
            </div>

            <div className="ap-activity-item">
              <div
                className="ap-act-icon-box"
                style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
              >
                <FaSignInAlt />
              </div>
              <div className="ap-act-text">
                <strong>Login berhasil</strong>
                <span>25 Mei 2024, 10:30 WIB</span>
              </div>
            </div>

            <div className="ap-activity-item">
              <div
                className="ap-act-icon-box"
                style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
              >
                <FaUserEdit />
              </div>
              <div className="ap-act-text">
                <strong>Profil diperbarui</strong>
                <span>20 Mei 2024, 14:25 WIB</span>
              </div>
            </div>

            <div className="ap-activity-item">
              <div
                className="ap-act-icon-box"
                style={{ backgroundColor: "#fef3c7", color: "#92400e" }}
              >
                <FaFileAlt />
              </div>
              <div className="ap-act-text">
                <strong>Dokumen diunggah</strong>
                <span>18 Mei 2024, 09:15 WIB</span>
              </div>
            </div>

            <div className="text-center mt-3 pt-2">
              <Button
                variant="link"
                className="text-decoration-none fw-bold p-0 text-primary fs-7"
                onClick={() => onShowNotification("Semua aktivitas telah ditampilkan.", "success")}
              >
                Lihat Semua Aktivitas
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* 3. Danger Zone */}
      <Card className="ap-danger-card mb-4 text-start">
        <Card.Body className="d-flex align-items-center justify-content-between flex-wrap gap-3 p-4">
          <div className="d-flex align-items-center gap-3">
            <FaExclamationTriangle className="ap-danger-icon" />
            <div>
              <h5 className="fw-bold text-danger mb-1">Zona Berbahaya</h5>
              <p className="text-muted mb-0 fs-7">
                Tindakan berikut bersifat permanen dan tidak dapat dibatalkan.
              </p>
            </div>
          </div>
          <Button
            variant="outline-danger"
            className="ap-danger-btn"
            onClick={onTerminateKeanggotaan}
          >
            <FaUserMinus /> Berhenti Keanggotaan
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
