import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { initSocket } from "../../../utils/socket";
import UBilling from "../../../utils/api/UBilling";
import UNotification from "../../../utils/api/UNotification";

const ProfileContext = createContext();
const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  import.meta.env.VITE_API_ORIGIN ||
  process.env.REACT_APP_SOCKET_URL ||
  process.env.REACT_APP_API_ORIGIN ||
  "https://localhost:3445";



/**
 * Normalize notification status from DB string to numeric.
 * DB stores: 'unread' | 'sent' | 'read' | 'archived'
 * Frontend expects: 1 = unread, 2 = read, 3 = archived
 */
const normalizeNotificationStatus = (status) => {
  if (typeof status === "number") return status;
  const map = { unread: 1, sent: 1, read: 2, archived: 3 };
  return map[status] ?? 1;
};

/** Normalize a single notification object from socket/API to frontend format */
const normalizeNotification = (n) => {
  if (!n || typeof n !== "object") return n;
  return {
    id: n.notification_id || n.id,
    title: n.title,
    body: n.content || n.body,
    sent_at: n.sent_datetime || n.sent_at || new Date().toISOString(),
    status: normalizeNotificationStatus(n.status),
    type: n.type || "GENERAL",
    url: n.url || "/",
  };
};

export const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(() => !!localStorage.getItem("token"));
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef(null);

  const fetchBills = useCallback(async () => {
    try {
      const res = await UBilling.getPendingBills();
      if (res?.data?.status && Array.isArray(res.data.data)) {
        setBills(res.data.data);
        return;
      }
      setBills([]);
    } catch {
      setBills([]);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await UNotification.getNotifications({ limit: 50 });
      // Backend returns { list: [...] }
      const list = res?.data?.list || res?.data?.data;
      if (Array.isArray(list)) {
        setNotifications(list.map(normalizeNotification));
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  }, []);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    if (socketRef.current?.connected) {
      socketRef.current.emit("profile:request");
      fetchBills();
      fetchNotifications();
      return;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = initSocket(token);

    socket.on("connect", () => {
      setSocketConnected(true);
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = JSON.parse(atob(base64));
        if (decoded?.member_id) {
          socket.emit("register", decoded.member_id);
        }
      } catch (err) {
        console.error("Token decoding failed", err);
      }
      socket.emit("profile:request");
      fetchBills();
      fetchNotifications();
    });

    socket.on("profile:update", (data) => {
      setUserData(data);
      setLoading(false);
    });

    // Listener Pasca Approval Ketua: Memicu refresh data akun & tagihan
    socket.on("registration:status_update", () => {
      socket.emit("profile:request");
      fetchBills();
      fetchNotifications();
      window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
    });

    socket.on("notifications:update", (data) => {
      if (Array.isArray(data)) {
        setNotifications(data.map(normalizeNotification));
      } else if (data && typeof data === "object") {
        const normalizedNotif = normalizeNotification(data);
        setNotifications((prev) => {
          const safePrev = Array.isArray(prev) ? prev : [];
          const exists = safePrev.some(
            (n) => (n.id || n.notification_id) === normalizedNotif.id,
          );
          if (exists) return safePrev;
          return [normalizedNotif, ...safePrev].slice(0, 50);
        });
      }
    });

    socket.on("bills:update", (data) => {
      if (Array.isArray(data)) {
        setBills(data);
      } else {
        fetchBills();
      }
      setLoading(false);
    });

    // Listener untuk notifikasi baru (termasuk PAYMENT_SUCCESS)
    socket.on("new_notification", (data) => {
      if (data.type === "PAYMENT_SUCCESS") {
        socket.emit("profile:request");
        fetchBills();
        window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
      }
      // Semua notifikasi baru (apapun typenya) masukkan ke list
      const normalized = normalizeNotification(data);
      setNotifications((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        const exists = safePrev.some(
          (n) => (n.id || n.notification_id) === normalized.id,
        );
        if (exists) return safePrev;
        return [normalized, ...safePrev].slice(0, 50);
      });
    });

    socket.on("connect_error", () => {
      setSocketConnected(false);
      setLoading(false);
    });

    socket.on("auth:fail", () => {
      localStorage.removeItem("token");
      setUserData(null);
      setLoading(false);
    });

    socketRef.current = socket;
  }, [fetchBills, fetchNotifications]);

  useEffect(() => {
    const handleLoginSync = () => {
      setLoading(true);
      setUserData(null);
      connectSocket();
    };

    const handleProfileRefresh = () => {

      setLoading(true); // <-- Pause UI rendering to wait for new profile
      if (socketRef.current?.connected) {
        socketRef.current.emit("profile:request");
      }
      fetchBills();
    };

    window.addEventListener("storage_sync", handleLoginSync);
    window.addEventListener("profileUpdated", handleProfileRefresh);
    window.addEventListener("REFRESH_REGISTRATION_STATUS", handleProfileRefresh);
    connectSocket();

    return () => {
      window.removeEventListener("storage_sync", handleLoginSync);
      window.removeEventListener("profileUpdated", handleProfileRefresh);
      window.removeEventListener("REFRESH_REGISTRATION_STATUS", handleProfileRefresh);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [connectSocket, fetchBills]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  const value = useMemo(
    () => ({
      userData,
      notifications,
      bills,
      loading,
      logout,
      socketConnected,
      socket: socketRef.current,
    }),
    [userData, notifications, bills, loading, logout, socketConnected],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
