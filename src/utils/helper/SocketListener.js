import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const SOCKET_URL = "https://api.kkpus.id";

/**
 * Hook untuk mendengarkan real-time update
 * @param {Function} onMessage - Callback function saat ada update status
 */
const useSocketListener = (onMessage) => {
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (!userData) return;

    try {
      const user = JSON.parse(userData);
      const memberId = user.member_id;
      if (!memberId) return;

      const socket = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket", "polling"],
        reconnection: true,
      });

      socket.on("connect", () => {
        console.log("🔌 Connected to Socket:", socket.id);
        socket.emit("register", String(memberId));
      });

      // Handler tunggal untuk semua update status pengajuan
      const handleUpdate = (data) => {
        console.log("🔥 SOCKET_SIGNAL_RECEIVED:", data);

        // Jalankan callback refresh data jika ada
        if (typeof onMessage === "function") {
          onMessage(data);
        }

        // Notifikasi visual
        toast.success(data.message || "Status telah diperbarui!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Event global untuk halaman lama (Registrasi)
        window.dispatchEvent(new CustomEvent("REFRESH_REGISTRATION_STATUS"));
      };

      // Listen ke berbagai kemungkinan event name
      socket.on("REGISTRATION_UPDATED", handleUpdate);
      socket.on("TRANSACTION_UPDATED", handleUpdate);

      // Listen Notifikasi Global
      socket.on("new_notification", (data) => {
        toast.info(
          <div>
            <b style={{ fontSize: "14px" }}>{data.title}</b>
            <div style={{ fontSize: "12px" }}>{data.content}</div>
          </div>,
          { icon: "🔔" }
        );
      });

      return () => {
        socket.off("REGISTRATION_UPDATED");
        socket.off("TRANSACTION_UPDATED");
        socket.off("new_notification");
        socket.disconnect();
      };
    } catch (error) {
      console.error("Socket Hook Error:", error);
    }
  }, [onMessage]); // Re-run jika callback berubah
};

export default useSocketListener;
