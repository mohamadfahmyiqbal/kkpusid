import React, { useState, useEffect, useCallback } from "react";
import { NavDropdown, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { io } from "socket.io-client";
import { useProfile } from "../../contexts/ProfileContext";
import UNotification from "../../utils/api/UNotification";
import NotificationModal from "./NotificationModal";

const NotificationDropdown = () => {
  const { userData } = useProfile();

  const [notifikasi, setNotifikasi] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotifikasi, setSelectedNotifikasi] = useState(null);

  const fetchNotifications = useCallback(async () => {
    if (!userData?.nik) return;

    try {
      const res = await UNotification.getNotifications({
        nik: userData.nik,
        status: 1,
      });

      if (res?.data?.list) {
        setNotifikasi(res.data.list);
        setUnreadCount(res.data.unread_count || 0);
      }
    } catch (err) {
      console.error("Gagal mengambil notifikasi", err);
    }
  }, [userData]);

  useEffect(() => {
    if (!userData?.nik) return;

    fetchNotifications();

    const socket = io("https://api.kkpus.id", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("🔌 Socket connected");
      socket.emit("register", userData.nik); // ✅ SESUAI BACKEND
    });

    socket.on("new_notification", (data) => {
      setNotifikasi((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.off("new_notification");
      socket.disconnect();
    };
  }, [userData, fetchNotifications]);

  const handleOpenDetail = async (item) => {
    setSelectedNotifikasi(item);
    setShowModal(true);

    try {
      await UNotification.markAsRead(item.id);
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (err) {
      console.error("Gagal update status baca", err);
    }
  };

  return (
    <NavDropdown
      align="end"
      title={
        <div className="position-relative">
          <FaBell size={20} className="text-dark" />
          {unreadCount > 0 && (
            <Badge
              bg="danger"
              pill
              className="position-absolute top-0 start-100 translate-middle"
              style={{ fontSize: "0.6rem" }}
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      }
    >
      <div style={{ width: "300px" }}>
        <div className="p-3 border-bottom fw-bold">
          Notifikasi Terbaru
        </div>

        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {notifikasi.length === 0 ? (
            <div className="p-3 text-center text-muted small">
              Tidak ada notifikasi
            </div>
          ) : (
            notifikasi.map((item) => (
              <NavDropdown.Item
                key={item.id}
                className="p-3 border-bottom"
                onClick={() => handleOpenDetail(item)}
              >
                <h6 className="mb-1 text-dark" style={{ fontSize: "0.9rem" }}>
                  {item.title}
                </h6>
                <p className="mb-0 text-muted small text-truncate">
                  {item.body}
                </p>
              </NavDropdown.Item>
            ))
          )}
        </div>
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
