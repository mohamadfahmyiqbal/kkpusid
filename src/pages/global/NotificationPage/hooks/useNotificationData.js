import { useCallback, useEffect, useState } from 'react';
import { useProfile } from '../../../../components/layout/contexts';
import UNotification from '../../../../utils/api/UNotification';

export const useNotificationData = (itemsPerPage = 10) => {
  const { userData, notifications: socketNotifications, socket } = useProfile();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Use socket notifications if available, otherwise fetch from API
  useEffect(() => {
    if (socketNotifications && Array.isArray(socketNotifications)) {
      setNotifications(socketNotifications);
      setTotalPages(Math.ceil(socketNotifications.length / itemsPerPage));
      setLoading(false);
    }
  }, [socketNotifications, itemsPerPage]);

  const fetchNotifications = useCallback(
    async (page) => {
      const memberIdentifier =
        userData?.no_anggota ||
        userData?.member_id ||
        userData?.registration_id;

      if (!memberIdentifier) {
        setNotifications([]);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const filter = {
          no_anggota: userData?.no_anggota,
          member_id: userData?.member_id || userData?.registration_id,
          page,
          limit: itemsPerPage,
        };

        const res = await UNotification.getNotifications(filter);
        const rows = res?.data?.data;

        if (Array.isArray(rows)) {
          setNotifications(rows);
          setTotalPages(
            res?.data?.total_pages ||
              res?.data?.totalPages ||
              res?.data?.last_page ||
              1,
          );
        } else {
          setNotifications([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Gagal mengambil daftar notifikasi dari API:", error);
        setNotifications([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [itemsPerPage, userData],
  );

  const markOneAsRead = useCallback(async (id) => {
    try {
      await UNotification.markAsRead(id);
      // Emit socket event to update other clients
      if (socket?.connected) {
        socket.emit("notification:mark_read", { id });
      }
    } catch (error) {
      console.error("Gagal menandai notifikasi dibaca:", error);
    }
  }, [socket]);

  const markAllAsRead = useCallback(async () => {
    const unreadIds = notifications
      .filter((n) => n.status === 1)
      .map((n) => n.id);
    if (unreadIds.length === 0) return;

    try {
      await UNotification.markAsRead(unreadIds);
      // Update local state immediately
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, status: 2 })),
      );
      // Emit socket event to update other clients
      if (socket?.connected) {
        socket.emit("notification:mark_all_read", { ids: unreadIds });
      }
    } catch (error) {
      console.error("Gagal menandai semua dibaca:", error);
      // Still update local state even if API fails
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, status: 2 })),
      );
    }
  }, [notifications, socket]);

  const markAsReadLocal = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 2 } : n)),
    );
  }, []);

  // Listen for real-time notification updates
  useEffect(() => {
    if (!socket?.connected) return;

    const handleNewNotification = (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    };

    const handleNotificationUpdate = (updatedNotification) => {
      setNotifications((prev) =>
        prev.map((n) => 
          n.id === updatedNotification.id ? updatedNotification : n
        )
      );
    };

    const handleAllNotificationsUpdate = (updatedNotifications) => {
      if (Array.isArray(updatedNotifications)) {
        setNotifications(updatedNotifications);
      }
    };

    socket.on("notification:new", handleNewNotification);
    socket.on("notification:update", handleNotificationUpdate);
    socket.on("notifications:update", handleAllNotificationsUpdate);

    return () => {
      socket.off("notification:new", handleNewNotification);
      socket.off("notification:update", handleNotificationUpdate);
      socket.off("notifications:update", handleAllNotificationsUpdate);
    };
  }, [socket]);

  // Initial fetch if no socket notifications available
  useEffect(() => {
    if (!socketNotifications || !Array.isArray(socketNotifications)) {
      fetchNotifications(currentPage);
    }
  }, [fetchNotifications, currentPage, socketNotifications]);

  return {
    notifications,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchNotifications,
    markOneAsRead,
    markAllAsRead,
    markAsReadLocal
  };
};
