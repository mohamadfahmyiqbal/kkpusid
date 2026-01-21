import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { io } from "socket.io-client";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(
    () => !!localStorage.getItem("authToken")
  );
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef(null);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setUserData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    if (socketRef.current?.connected) {
      socketRef.current.emit("profile:request");
      return;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    const socket = io("https://api.kkpus.id", {
      transports: ["websocket"],
      auth: { token },
      forceNew: true,
      reconnection: true,
      reconnectionAttempts: 5,
      timeout: 20000,
    });

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
    });

    socket.on("profile:update", (data) => {
      setUserData(data);
      setLoading(false);
    });

    // Listener Pasca Approval Ketua: Memicu refresh data akun & tagihan
    socket.on("registration:status_update", () => {
      socket.emit("profile:request");
      socket.emit("bills:request"); // Jika ada endpoint khusus request tagihan
    });

    socket.on("notifications:update", (data) => {
      setNotifications(data);
    });

    socket.on("bills:update", (data) => {
      setBills(data);
      setLoading(false);
    });

    socket.on("connect_error", () => {
      setSocketConnected(false);
      setLoading(false);
    });

    socket.on("auth:fail", () => {
      localStorage.removeItem("authToken");
      setUserData(null);
      setLoading(false);
    });

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    const handleLoginSync = () => {
      setLoading(true);
      setUserData(null);
      connectSocket();
    };

    window.addEventListener("storage_sync", handleLoginSync);
    connectSocket();

    return () => {
      window.removeEventListener("storage_sync", handleLoginSync);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [connectSocket]);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
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
    [userData, notifications, bills, loading, logout, socketConnected]
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
