// src/components/layout/NotificationDropdown.jsx

import React, { useState, useEffect, useCallback } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaBell, FaInfo, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import NotificationModal from "./NotificationModal";
// ✅ Import hook useProfile
import { useProfile } from "../../contexts/ProfileContext";
// Import Utility API untuk Notifikasi
import UNotification from "../../utils/api/UNotification";

// ❌ Hapus prop 'user' di sini
const NotificationDropdown = () => {
  const navigate = useNavigate();
  // ✅ Ambil userData dari Context
  const { userData } = useProfile();

  // --- STATE ---\r\n
  const [notifikasi, setNotifikasi] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- STATE MODAL ---\r\n
  const [showModal, setShowModal] = useState(false);
  const [selectedNotifikasi, setSelectedNotifikasi] = useState(null);

  /**
   * 1. Fungsi Fetching Data Notifikasi
   */
  const fetchNotifications = useCallback(async () => {
    // ✅ GUARD CLAUSE: Menggunakan userData yang diambil dari Context.
    // Asumsi: API notifikasi menggunakan `nik` atau `id` user untuk filtering.
    // Ganti `nik` jika Anda menggunakan properti lain (misal: `id` atau `no_anggota`).
    if (!userData || !userData.id) {
      setNotifikasi([]);
      setUnreadCount(0);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // ✅ Gunakan userData.nik sebagai filter
      const response = await UNotification.getNotificationById({
        id: userData.id,
        status: 1, // Asumsi: status 1 = belum dibaca
        limit: 5, // Batasi untuk dropdown
      });

      // Asumsi: response.data.list berisi array notifikasi
      const list = response.data?.list || [];
      const unreadTotal = response.data?.unread_count || list.length;

      setNotifikasi(list);
      setUnreadCount(unreadTotal);
    } catch (err) {
      console.error("Gagal memuat notifikasi:", err);
      setError("Gagal memuat notifikasi.");
    } finally {
      setLoading(false);
    }
  }, [userData]); // ✅ RE-RUN saat userData berubah

  useEffect(() => {
    // Hanya fetch jika userData sudah ada
    if (userData) {
      fetchNotifications();
    }
  }, [userData, fetchNotifications]);

  // --- HANDLER (Dipertahankan) ---\r\n
  const handleClick = useCallback(
    (type, notif = null) => {
      if (type === "page") {
        const NOTIFICATION_PAGE_PATH = `/${jwtEncode({
          page: "notificationPage",
        })}`;
        navigate(NOTIFICATION_PAGE_PATH);
      } else if (type === "detail" && notif) {
        setSelectedNotifikasi(notif);
        setShowModal(true);
      }
    },
    [navigate]
  );

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotifikasi(null);
    // 💡 Opsional: Refetch notifikasi setelah modal ditutup jika ada perubahan status baca
    // fetchNotifications();
  };

  // --- Render (Dipertahankan) ---\r\n
  return (
    <NavDropdown
      title={
        <>
          <FaBell />
          {unreadCount > 0 && (
            <span className="badge bg-danger badge-xs text-white p-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </>
      }
      id="notification-dropdown"
      align="end" // Align ke kanan
      className="nav-item dropdown show"
    >
      <div className="dropdown-menu-right" style={{ minWidth: "300px" }}>
        <ul className="list-style-none">
          <li className="d-flex align-items-center justify-content-between p-3 border-bottom">
            <h5 className="font-weight-medium mb-0">Notifikasi Baru</h5>
            <span className="badge bg-info text-white">{unreadCount} Baru</span>
          </li>

          <div
            className="message-center"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {/* Tampilan Loading */}
            {loading && (
              <div className="p-3 text-center">
                <div
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                ></div>
              </div>
            )}

            {/* Tampilan Notifikasi */}
            {!loading &&
              notifikasi.map((notif) => (
                <React.Fragment key={notif.id}>
                  <li
                    className="p-3 border-bottom d-flex align-items-center"
                    onClick={() => handleClick("detail", notif)}
                    style={{
                      cursor: "pointer",
                      backgroundColor: notif.status === 1 ? "#f5f5f5" : "white",
                    }}
                    tabIndex={0}
                  >
                    <i
                      className={`me-3 ${
                        notif.status === 1 ? "text-info" : "text-success"
                      }`}
                    >
                      {notif.status === 1 ? (
                        <FaInfo size={18} />
                      ) : (
                        <FaCheckCircle size={18} />
                      )}
                    </i>
                    <div>
                      <h6 className="mb-0">{notif.title}</h6>
                      <span className="text-muted small">
                        {notif.body?.substring(0, 50)}...
                      </span>
                    </div>
                  </li>
                </React.Fragment>
              ))}

            {/* Tampilan Kosong / Error */}
            {!loading && notifikasi.length === 0 && !error && (
              <div className="p-3 text-center text-muted">
                Tidak ada notifikasi baru.
              </div>
            )}

            {!loading && error && (
              <div className="p-3 text-center text-danger">{error}</div>
            )}
          </div>

          {/* Bagian "Lihat Semua" */}
          <li className="border-top">
            <a
              className="nav-link text-center text-primary p-2"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClick("page");
              }}
              href="#"
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer", display: "block" }}
            >
              <strong>Lihat semua notifikasi</strong>
              <i className="fa fa-angle-right ms-1"></i>{" "}
            </a>
          </li>
        </ul>
      </div>

      {/* Modal Notifikasi */}
      <NotificationModal
        show={showModal}
        onHide={handleCloseModal}
        notifikasi={selectedNotifikasi}
      />
    </NavDropdown>
  );
};

// ✅ Pastikan tidak ada prop 'user' yang diterima
export default NotificationDropdown;
