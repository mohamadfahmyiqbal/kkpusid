// src/utils/helper/SocketListener.js
import { useEffect } from "react";
import { useSocket } from "../../contexts/SocketContext";
import { toast } from "react-toastify";

const useSocketListener = () => {
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      // 1. Listen untuk notifikasi umum (jika masih ada)
      socket.on("notification", (data) => {
        toast.info(data.message || "Ada notifikasi baru");
      });

      // 2. Listen untuk update status persetujuan (Dinamis sesuai backend)
      // Menangani: member_registration:update, financing_applications:update, dll.
      const handleUpdate = (data) => {
        console.log("⚡ Real-time Update Received:", data);

        const statusMap = {
          APPROVED: "disetujui sepenuhnya",
          REJECTED: "ditolak",
          IN_PROGRESS: "diproses ke tahap berikutnya",
        };

        toast.success(
          `Update ${data.entityRef}: Permohonan ${
            statusMap[data.status] || data.status
          }`
        );

        // Opsional: Memicu reload global atau update state di sini jika diperlukan
        if (data.trigger) {
          // window.location.reload(); // Atau panggil fungsi refresh data
        }
      };

      socket.on("member_registration:update", handleUpdate);
      socket.on("financing_applications:update", handleUpdate);
      socket.on("savings:update", handleUpdate);
      socket.on("transactions:update", handleUpdate);

      return () => {
        socket.off("notification");
        socket.off("member_registration:update", handleUpdate);
        socket.off("financing_applications:update", handleUpdate);
        socket.off("savings:update", handleUpdate);
        socket.off("transactions:update", handleUpdate);
      };
    }
  }, [socket]);
};

export default useSocketListener;
