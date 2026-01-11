// src/context/ProfileContext.jsx
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
  const [loading, setLoading] = useState(true);
  const [socketConnected, setSocketConnected] = useState(false);
  const socketRef = useRef(null);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);
      return;
    }

    if (socketRef.current?.connected) {
      return;
    }

    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const socket = io("https://api.kkpus.id", {
      transports: ["websocket"],
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
    });

    socket.on("connect", () => {
      setSocketConnected(true);
      setLoading(false);

      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const decoded = JSON.parse(atob(base64));
          if (decoded?.member_id) {
            socket.emit("register", decoded.member_id);
          }
        } catch (err) {}
      }

      setTimeout(() => {
        socket.emit("profile:request");
      }, 100);
    });

    socket.on("connect_error", () => {
      setSocketConnected(false);
      setLoading(false);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    socket.on("profile:update", (data) => {
      const formattedData = {
        ...data,
        bank_info: data.bank_info || null,
      };
      setUserData(formattedData);
      setLoading(false);
    });

    socket.on("notifications:update", (data) => {
      setNotifications(data);
    });

    socket.on("bills:update", (data) => {
      setBills(data);
    });

    socket.on("auth:fail", () => {
      localStorage.removeItem("authToken");
      setLoading(false);
    });

    socketRef.current = socket;
  }, []);

  useEffect(() => {
    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [connectSocket]);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
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
    <ProfileContext.Provider value={value}>
      {!loading ? (
        children
      ) : (
        <div className="p-10 text-center">Loading Profile...</div>
      )}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
