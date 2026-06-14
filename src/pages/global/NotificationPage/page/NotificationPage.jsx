import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../../utils/helpers";
import {
  Card,
  Form,
  Spinner,
  Alert,
  Toast,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaBell,
  FaClock,
  FaSearch,
  FaCheckCircle,
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaChevronRight,
  FaGraduationCap,
  FaWallet,
  FaLock,
  FaInfoCircle,
  FaExclamationTriangle,
  FaChevronLeft,
} from "react-icons/fa";
import { useProfile } from "../../../../components/layout/contexts";
import UNotification from "../../../../utils/api/UNotification";
import { getSocket } from "../../../../utils/socket";
import "./NotificationPage.css";

// Import Aset Gambar Ilustrasi
import bellImg from "../../../../assets/images/notification_bell.png";
import supportImg from "../../../../assets/images/customer_support.png";

// Default Premium Mock Notifications
const DEFAULT_NOTIFICATIONS = [
  {
    id: "def-1",
    title: "Pengajuan Pembiayaan Disetujui",
    body: "Pengajuan pembiayaan Anda telah disetujui dan siap melanjutkan ke tahap akad.",
    created_at: new Date().toISOString(), // Today
    status: 1, // Unread
    type: "transaction",
  },
  {
    id: "def-2",
    title: "Dokumen Perlu Diperiksa",
    body: "Mohon cek kembali dokumen KTP dan NPWP yang Anda unggah agar proses lebih cepat.",
    created_at: new Date(new Date().getTime() - 30 * 60 * 1000).toISOString(), // Today (30m ago)
    status: 1, // Unread
    type: "system",
  },
  {
    id: "def-3",
    title: "Jadwal Verifikasi Diperbarui",
    body: "Tim kami akan melakukan verifikasi lapangan pada Rabu, 21 Mei 2024 pukul 10.30 WIB.",
    created_at: new Date(new Date().getTime() - 2 * 60 * 60 * 1000).toISOString(), // Today (2h ago)
    status: 1, // Unread
    type: "reminder",
  },
  {
    id: "def-4",
    title: "Pelatihan Usaha Tersedia",
    body: "Modul pelatihan usaha terbaru sudah bisa diakses dari dashboard Anda.",
    created_at: new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    status: 2, // Read
    type: "announcement",
  },
  {
    id: "def-5",
    title: "Pembayaran Angsuran Masuk",
    body: "Pembayaran angsuran bulan ini telah berhasil diterima dan tercatat di sistem.",
    created_at: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 2, // Read
    type: "payment",
  },
  {
    id: "def-6",
    title: "Password Perlu Diperbarui",
    body: "Untuk keamanan akun, silakan perbarui password Anda secara berkala.",
    created_at: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 1, // Unread
    type: "system",
  },
];

// Helper format relatif waktu
const getRelativeTime = (dateStr) => {
  if (!dateStr) return "";
  try {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hari lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (e) {
    return dateStr;
  }
};

// Helper pengelompokan waktu
const groupNotificationsByDate = (notifList) => {
  const groups = {
    today: [],
    yesterday: [],
    earlier: [],
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  notifList.forEach((notif) => {
    const notifDate = new Date(notif.created_at);
    notifDate.setHours(0, 0, 0, 0);

    if (notifDate.getTime() === today.getTime()) {
      groups.today.push(notif);
    } else if (notifDate.getTime() === yesterday.getTime()) {
      groups.yesterday.push(notif);
    } else {
      groups.earlier.push(notif);
    }
  });

  return groups;
};

// Helper ikon kategori
const getCategoryIcon = (type) => {
  switch (type) {
    case "transaction":
      return {
        icon: <FaCheckCircle />,
        className: "np-icon-success",
      };
    case "payment":
      return {
        icon: <FaWallet />,
        className: "np-icon-info",
      };
    case "system":
      return {
        icon: <FaInfoCircle />,
        className: "np-icon-info",
      };
    case "reminder":
      return {
        icon: <FaExclamationTriangle />,
        className: "np-icon-warning",
      };
    case "announcement":
      return {
        icon: <FaGraduationCap />,
        className: "np-icon-purple",
      };
    default:
      return {
        icon: <FaBell />,
        className: "np-icon-info",
      };
  }
};

export default function NotificationPage() {
  const navigate = useNavigate();
  const { userData } = useProfile();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [localNotifications, setLocalNotifications] = useState([]);

  // States Pencarian & Filter
  const [searchInput, setSearchInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("all");
  const [tabStatus, setTabStatus] = useState("all"); // 'all', 'unread', 'read'

  // States Pengaturan Notifikasi (Toggles)
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
  });

  // Toast notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const showNotification = useCallback((message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  }, []);

  // Fetch data notifikasi dari API
  useEffect(() => {
    loadNotifications();
  }, [userData]);

  // Socket listener real-time
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      const handleNewNotification = (notification) => {

        // Sesuaikan format jika backend mengirim data mentah (misal dari sendGlobalNotification)
        const formattedNotif = {
          id: notification.notification_id || notification.id,
          title: notification.title,
          body: notification.content || notification.body,
          created_at: notification.sent_datetime || notification.sent_at || new Date().toISOString(),
          status: notification.status || 1,
          type: notification.type || "general"
        };
        setLocalNotifications((prev) => [formattedNotif, ...prev]);
        showNotification(notification.title || "Notifikasi baru masuk!", "info");
      };
      
      // Listen ke event notifications:update (sesuai backend SOCKET_EVENTS.NOTIFICATION_UPDATE)
      socket.on("notifications:update", handleNewNotification);
      return () => socket.off("notifications:update", handleNewNotification);
    }
  }, [showNotification]);

  const loadNotifications = async () => {
    const memberId = userData?.member_id || userData?.registration_id;
    if (!memberId) {
      setLocalNotifications(DEFAULT_NOTIFICATIONS);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await UNotification.getNotifications({
        member_id: memberId,
        limit: 50,
      });
      
      // Backend mengembalikan { list: [...] }
      const rows = res?.data?.list || res?.data?.data;

      if (Array.isArray(rows)) {
        if (rows.length > 0) {
          setLocalNotifications(rows);
        } else {
          // Jika benar-benar kosong dari backend (bukan error), baru tampilkan array kosong
          setLocalNotifications([]);
        }
      } else {
        setLocalNotifications(DEFAULT_NOTIFICATIONS);
      }
    } catch (err) {
      console.error("Gagal memuat notifikasi, menggunakan mock data:", err);
      setLocalNotifications(DEFAULT_NOTIFICATIONS);
    } finally {
      setLoading(false);
    }
  };

  // Toggle Read Status (Envelope click)
  const handleToggleRead = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    try {
      // Jika mock, langsung ubah lokal. Jika real, panggil API
      if (!id.toString().startsWith("def-")) {
        await UNotification.markAsRead(id);
      }

      setLocalNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: newStatus } : n))
      );

      showNotification(
        newStatus === 2
          ? "Notifikasi ditandai sebagai dibaca."
          : "Notifikasi ditandai sebagai belum dibaca.",
        "success"
      );
    } catch (e) {
      console.error(e);
      // Fallback lokal jika API error
      setLocalNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: newStatus } : n))
      );
    }
  };

  // Delete notification (Trash icon)
  const handleDelete = (id) => {
    setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
    showNotification("Notifikasi berhasil dihapus.", "success");
  };

  // Mark all as read
  const handleMarkAllAsRead = async () => {
    const unreadIds = localNotifications
      .filter((n) => n.status === 1)
      .map((n) => n.id);

    if (unreadIds.length === 0) {
      showNotification("Semua notifikasi sudah dibaca.", "info");
      return;
    }

    try {
      const realIds = unreadIds.filter((id) => !id.toString().startsWith("def-"));
      if (realIds.length > 0) {
        await UNotification.markAsRead(realIds);
      }

      setLocalNotifications((prev) =>
        prev.map((n) => ({ ...n, status: 2 }))
      );

      showNotification("Semua notifikasi ditandai sebagai dibaca.", "success");
    } catch (e) {
      console.error(e);
      // Fallback lokal
      setLocalNotifications((prev) =>
        prev.map((n) => ({ ...n, status: 2 }))
      );
    }
  };

  // Toggle settings switches
  const handleToggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    showNotification("Pengaturan preferensi berhasil diperbarui.", "success");
  };

  // Unified Filtering
  const filteredNotifications = useMemo(() => {
    let result = [...localNotifications];

    // 1. Filter Tab status baca
    if (tabStatus === "unread") {
      result = result.filter((n) => n.status === 1);
    } else if (tabStatus === "read") {
      result = result.filter((n) => n.status === 2);
    }

    // 2. Filter Dropdown kategori
    if (categoryInput !== "all") {
      result = result.filter((n) => n.type === categoryInput);
    }

    // 3. Filter Search Pencarian
    if (searchInput.trim().length >= 2) {
      const query = searchInput.toLowerCase();
      result = result.filter(
        (n) =>
          n.title?.toLowerCase().includes(query) ||
          n.body?.toLowerCase().includes(query)
      );
    }

    return result;
  }, [localNotifications, tabStatus, categoryInput, searchInput]);

  // Hitungan Statistik
  const stats = useMemo(() => {
    const total = localNotifications.length;
    const unread = localNotifications.filter((n) => n.status === 1).length;
    const read = localNotifications.filter((n) => n.status === 2).length;
    return { total, unread, read };
  }, [localNotifications]);

  // Pengelompokan Notifikasi ter-filter berdasarkan waktu
  const groupedNotifications = useMemo(() => {
    return groupNotificationsByDate(filteredNotifications);
  }, [filteredNotifications]);

  return (
    <div className="np-container py-3 dash-fade-in">
      {/* 1. Header Banner */}
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
                <span className="np-stats-count">{stats.unread}</span>
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

      {/* Grid Utama (2 Kolom) */}
      {loading ? (
        <div className="py-5 text-center">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-3">Memuat notifikasi...</p>
        </div>
      ) : (
        <Row className="g-4">
          {/* Kolom Kiri: Notifikasi & Filter */}
          <Col lg={8} md={12}>
            {/* Filter & Search Bar */}
            <div className="np-search-filter-row">
              <div className="np-search-input-wrapper">
                <FaSearch className="np-search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Cari notifikasi..."
                  className="np-search-input"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <Form.Select
                  className="np-filter-dropdown"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
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

                <Button className="np-mark-all-btn" onClick={handleMarkAllAsRead}>
                  Tandai Semua sebagai Dibaca
                </Button>
              </div>
            </div>

            {/* Tabs Status Baca */}
            <div className="np-tabs-row">
              <button
                className={`np-tab-btn ${tabStatus === "all" ? "active" : ""}`}
                onClick={() => setTabStatus("all")}
              >
                Semua
              </button>
              <button
                className={`np-tab-btn ${tabStatus === "unread" ? "active" : ""}`}
                onClick={() => setTabStatus("unread")}
              >
                Belum Dibaca
                {stats.unread > 0 && <span className="np-tab-badge">{stats.unread}</span>}
              </button>
              <button
                className={`np-tab-btn ${tabStatus === "read" ? "active" : ""}`}
                onClick={() => setTabStatus("read")}
              >
                Sudah Dibaca
              </button>
            </div>

            {/* List Notifikasi */}
            {filteredNotifications.length === 0 ? (
              <div className="np-empty-state">
                <div className="np-empty-icon-box">
                  <FaBell />
                </div>
                <h5 className="np-empty-title">Tidak ada notifikasi</h5>
                <p className="np-empty-desc">
                  Kami tidak menemukan notifikasi yang sesuai dengan pencarian atau filter Anda.
                </p>
              </div>
            ) : (
              <div>
                {/* 1. Kelompok Hari ini */}
                {groupedNotifications.today.length > 0 && (
                  <div>
                    <div className="np-date-group-header">
                      <FaClock size={12} /> Hari ini
                    </div>
                    {groupedNotifications.today.map((notif) => (
                      <NotificationRow
                        key={notif.id}
                        notif={notif}
                        onToggleRead={handleToggleRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}

                {/* 2. Kelompok Kemarin */}
                {groupedNotifications.yesterday.length > 0 && (
                  <div>
                    <div className="np-date-group-header">
                      <FaClock size={12} /> Kemarin
                    </div>
                    {groupedNotifications.yesterday.map((notif) => (
                      <NotificationRow
                        key={notif.id}
                        notif={notif}
                        onToggleRead={handleToggleRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}

                {/* 3. Kelompok Sebelumnya */}
                {groupedNotifications.earlier.length > 0 && (
                  <div>
                    <div className="np-date-group-header">
                      <FaClock size={12} /> Sebelumnya
                    </div>
                    {groupedNotifications.earlier.map((notif) => (
                      <NotificationRow
                        key={notif.id}
                        notif={notif}
                        onToggleRead={handleToggleRead}
                        onDelete={handleDelete}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Col>

          {/* Kolom Kanan: Sidebar */}
          <Col lg={4} md={12}>
            {/* Ringkasan Card */}
            <div className="np-sidebar-card">
              <h5 className="np-sidebar-title">Ringkasan</h5>

              <div className="np-summary-row" onClick={() => setTabStatus("all")}>
                <div className="np-summary-left">
                  <FaBell className="np-summary-icon text-primary" />
                  <span className="np-summary-label">Total Notifikasi</span>
                </div>
                <div className="np-summary-count-box">
                  <span className="np-summary-count">{stats.total}</span>
                  <FaChevronRight className="np-summary-chevron" />
                </div>
              </div>

              <div className="np-summary-row" onClick={() => setTabStatus("unread")}>
                <div className="np-summary-left">
                  <FaEnvelope className="np-summary-icon text-warning" />
                  <span className="np-summary-label">Belum Dibaca</span>
                </div>
                <div className="np-summary-count-box">
                  <span className="np-summary-count">{stats.unread}</span>
                  <FaChevronRight className="np-summary-chevron" />
                </div>
              </div>

              <div className="np-summary-row" onClick={() => setTabStatus("read")}>
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
                  onClick={() => handleToggleSetting("email")}
                />
              </div>

              <div className="np-setting-row">
                <div className="np-setting-info">
                  <span className="np-setting-label">Push Notification</span>
                  <span className="np-setting-desc">Notifikasi realtime di browser</span>
                </div>
                <button
                  className={`np-switch-toggle ${settings.push ? "active" : ""}`}
                  onClick={() => handleToggleSetting("push")}
                />
              </div>

              <div className="np-setting-row">
                <div className="np-setting-info">
                  <span className="np-setting-label">SMS</span>
                  <span className="np-setting-desc">Info penting via SMS</span>
                </div>
                <button
                  className={`np-switch-toggle ${settings.sms ? "active" : ""}`}
                  onClick={() => handleToggleSetting("sms")}
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
                onClick={() => showNotification("Fitur hubungi customer support segera hadir!", "info")}
              >
                Hubungi Kami <FaChevronRight size={10} className="ms-1" />
              </Button>
            </div>
          </Col>
        </Row>
      )}

      {/* Toast Notification */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        className="position-fixed top-0 end-0 m-3"
        style={{ zIndex: 9999 }}
        bg={toastVariant}
      >
        <Toast.Header className={`bg-${toastVariant} text-white justify-content-between`}>
          <div className="d-flex align-items-center">
            <FaCheckCircle className="me-2" />
            <strong className="me-auto">Pusat Notifikasi</strong>
          </div>
        </Toast.Header>
        <Toast.Body className={toastVariant === "light" ? "text-dark" : "text-white"}>
          {toastMessage}
        </Toast.Body>
      </Toast>
    </div>
  );
}

// Subkomponen baris notifikasi untuk keterbacaan kode
function NotificationRow({ notif, onToggleRead, onDelete }) {
  const isUnread = notif.status === 1;
  const config = getCategoryIcon(notif.type);

  return (
    <div className={`np-item ${isUnread ? "unread" : ""}`}>
      {/* Circle Icon */}
      <div className={`np-item-icon-box ${config.className}`}>{config.icon}</div>

      {/* Content */}
      <div className="np-item-content-wrapper">
        <h6 className="np-item-title">{notif.title}</h6>
        <p className="np-item-body">{notif.body}</p>
      </div>

      {/* Right Side Actions */}
      <div className="np-item-right-actions">
        {/* Time */}
        <span className="np-item-time">{getRelativeTime(notif.created_at)}</span>

        {/* Unread indicator */}
        {isUnread && <div className="np-item-unread-dot" />}

        {/* Mark Read/Unread Envelope Action */}
        <button
          className="np-item-action-btn"
          onClick={() => onToggleRead(notif.id, notif.status)}
          title={isUnread ? "Tandai sudah dibaca" : "Tandai belum dibaca"}
        >
          {isUnread ? <FaEnvelope /> : <FaEnvelopeOpen />}
        </button>

        {/* Delete Action */}
        <button
          className="np-item-action-btn delete"
          onClick={() => onDelete(notif.id)}
          title="Hapus notifikasi"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
