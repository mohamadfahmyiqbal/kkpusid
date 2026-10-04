import React, { useMemo, useState, useCallback, useEffect } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { useProfile } from "../../../../components/layout/contexts";
import UNotification from "../../../../utils/api/UNotification";
import { getSocket } from "../../../../utils/socket";
import NotificationHeaderBanner from "./NotificationHeaderBanner";
import NotificationSearchFilter from "./NotificationSearchFilter";
import NotificationSectionList from "./NotificationSectionList";
import NotificationSidebar from "./NotificationSidebar";
import {
  DEFAULT_NOTIFICATIONS,
  groupNotificationsByDate,
} from "./notificationHelpers";
import "./NotificationPage.css";

export default function NotificationPage() {
  const { userData } = useProfile();

  const [loading, setLoading] = useState(true);
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

  const showNotification = useCallback((message, variant = "success") => {
    const iconMap = { success: "success", danger: "error", warning: "warning", info: "info" };
    Swal.fire({
      title: message,
      icon: iconMap[variant] || "info",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
    });
  }, []);

  const loadNotifications = useCallback(async () => {
    const memberId = userData?.member_id || userData?.registration_id;
    if (!memberId) {
      setLocalNotifications(DEFAULT_NOTIFICATIONS);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
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
  }, [userData]);

  // Fetch data notifikasi dari API
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  // Socket listener real-time
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      const handleNewNotification = (notification) => {
        const formattedNotif = {
          id: notification.notification_id || notification.id,
          title: notification.title,
          body: notification.content || notification.body,
          created_at:
            notification.sent_datetime ||
            notification.sent_at ||
            new Date().toISOString(),
          status: notification.status || 1,
          type: notification.type || "general",
        };
        setLocalNotifications((prev) => [formattedNotif, ...prev]);
        showNotification(notification.title || "Notifikasi baru masuk!", "info");
      };

      socket.on("notifications:update", handleNewNotification);
      return () => socket.off("notifications:update", handleNewNotification);
    }
  }, [showNotification]);

  // Toggle Read Status (Envelope click)
  const handleToggleRead = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    try {
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

    if (tabStatus === "unread") {
      result = result.filter((n) => n.status === 1);
    } else if (tabStatus === "read") {
      result = result.filter((n) => n.status === 2);
    }

    if (categoryInput !== "all") {
      result = result.filter((n) => n.type === categoryInput);
    }

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
      <NotificationHeaderBanner unreadCount={stats.unread} />

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
            <NotificationSearchFilter
              searchInput={searchInput}
              onSearchChange={setSearchInput}
              categoryInput={categoryInput}
              onCategoryChange={setCategoryInput}
              tabStatus={tabStatus}
              onTabChange={setTabStatus}
              unreadCount={stats.unread}
              onMarkAllAsRead={handleMarkAllAsRead}
            />

            <NotificationSectionList
              filteredNotifications={filteredNotifications}
              groupedNotifications={groupedNotifications}
              onToggleRead={handleToggleRead}
              onDelete={handleDelete}
            />
          </Col>

          {/* Kolom Kanan: Sidebar */}
          <Col lg={4} md={12}>
            <NotificationSidebar
              stats={stats}
              settings={settings}
              onTabChange={setTabStatus}
              onToggleSetting={handleToggleSetting}
              onHelpClick={() =>
                showNotification("Fitur hubungi customer support segera hadir!", "info")
              }
            />
          </Col>
        </Row>
      )}
    </div>
  );
}
