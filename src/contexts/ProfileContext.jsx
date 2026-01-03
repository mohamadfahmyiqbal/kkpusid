// src/contexts/ProfileContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import UAuth from "../utils/api/UAuth";
import UBilling from "../utils/api/UBilling";
import UNotification from "../utils/api/UNotification";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const socketRef = useRef(null);

  // --- 1. Global Data Fetcher ---
  const fetchAllData = useCallback(async (user) => {
    if (!user?.member_id) return;

    try {
      const [notifRes, billRes] = await Promise.all([
        UNotification.getNotifications({ member_id: user.member_id }),
        UBilling.getPendingBills({ member_no: user.member_no, limit: 5 }),
      ]);

      setNotifications(notifRes.data.list || []);
      setBills(billRes.data.list || []);
    } catch (err) {
      console.error("Error fetching sync data:", err);
    }
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!localStorage.getItem("authToken")) {
      setLoading(false);
      return;
    }

    try {
      const response = await UAuth.getProfile();
      const user = response.data.data;
      setUserData(user);
      await fetchAllData(user); // Ambil data terkait setelah profil siap
    } catch (err) {
      console.error("Profile Load Error:", err);
      if (err.response?.status === 401) logout();
    } finally {
      setLoading(false);
    }
  }, [fetchAllData]);

  // --- 2. Centralized Socket Management ---
  useEffect(() => {
    if (userData?.member_id && !socketRef.current) {
      const socket = io("https://api.kkpus.id", {
        transports: ["websocket"],
        reconnection: true,
      });

      socket.on("connect", () => {
        socket.emit("register", String(userData.member_id));
      });

      // Listener: Dashboard/Global Update
      socket.on("update_dashboard", () => {
        fetchAllData(userData);
      });

      // Listener: Notifikasi Baru
      socket.on("new_notification", (data) => {
        setNotifications((prev) => [data, ...prev]);
        toast.info(data.title || "Notifikasi Baru", { icon: "🔔" });
      });

      socketRef.current = socket;
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [userData, fetchAllData]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const logout = useCallback(() => {
    localStorage.removeItem("authToken");
    setUserData(null);
    setNotifications([]);
    setBills([]);
    if (socketRef.current) socketRef.current.disconnect();
  }, []);

  const value = {
    userData,
    notifications,
    bills,
    loading,
    logout,
    refetchAll: () => fetchAllData(userData),
    refetchProfile: fetchProfile,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
