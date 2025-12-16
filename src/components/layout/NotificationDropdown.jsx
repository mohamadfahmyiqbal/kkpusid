// src/components/layout/NotificationDropdown.jsx
import React, { useState, useEffect, useCallback } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { useProfile } from "../../contexts/ProfileContext";
import UNotification from "../../utils/api/UNotification";
import NotificationModal from "./NotificationModal";

const NotificationDropdown = () => {
  const navigate = useNavigate();
  const { userData } = useProfile();
  const [notifikasi, setNotifikasi] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotifikasi, setSelectedNotifikasi] = useState(null);

  const fetchNotifications = useCallback(async () => {
    if (!userData?.member_id) return;
    try {
      const res = await UNotification.getNotificationById({
        member_id: userData.member_id,
        status: 1, // Akan dikirim sebagai ?member_id=11&status=1
      });

      // SESUAIKAN DI SINI: Controller Anda mengirim objek { list: [...] }
      // Axios menyimpan body response di properti .data
      if (res.data && res.data.list) {
        setNotifikasi(res.data.list);
        // Anda juga bisa mengambil unread_count dari res.data.unread_count jika perlu
      }
    } catch (err) {
      console.error("Gagal mengambil notifikasi", err);
    }
  }, [userData]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleOpenDetail = async (item) => {
    setSelectedNotifikasi(item);
    setShowModal(true);
    // Otomatis tandai dibaca saat dibuka
    try {
      await UNotification.markAsRead(item.id);
      fetchNotifications(); // Refresh list
    } catch (err) {
      console.error("Gagal update status baca", err);
    }
  };

  return (
    <NavDropdown
      title={
        <span className="nav-link text-white position-relative p-0">
          <FaBell size={20} />
          {notifikasi.length > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "10px" }}
            >
              {notifikasi.length}
            </span>
          )}
        </span>
      }
      id="notification-dropdown"
      align="end"
    >
      <div className="mailbox" style={{ minWidth: "300px" }}>
        <div className="p-2 border-bottom fw-bold">Notifikasi Terbaru</div>
        <div
          className="message-center"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {notifikasi.length === 0 ? (
            <div className="p-3 text-center text-muted">
              Tidak ada notifikasi baru
            </div>
          ) : (
            notifikasi.map((item) => (
              <a
                key={item.id}
                className="dropdown-item p-2 border-bottom"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleOpenDetail(item);
                }}
              >
                <div className="mail-contnet">
                  <h6 className="mb-0 text-dark">{item.title}</h6>
                  <small className="text-muted text-truncate d-block">
                    {item.body}
                  </small>
                </div>
              </a>
            ))
          )}
        </div>
        <a
          className="dropdown-item text-center small text-primary fw-bold py-2"
          onClick={() =>
            navigate(`/${jwtEncode({ page: "notificationPage" })}`)
          }
        >
          Lihat Semua Notifikasi
        </a>
      </div>
      <NotificationModal
        show={showModal}
        onHide={() => setShowModal(false)}
        notifikasi={selectedNotifikasi}
      />
    </NavDropdown>
  );
};

export default NotificationDropdown;
