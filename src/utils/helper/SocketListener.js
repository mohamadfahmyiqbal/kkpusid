// src/utils/helper/SocketListener.js
import { useEffect } from "react";
import { useSocket } from "../../components/layout/contexts";
import { toast } from "react-toastify";

const useSocketListener = (callback) => {
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
        console.log("⚡ Socket ID:", socket.id);
        console.log("⚡ Connected:", socket.connected);

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

        // Panggil callback untuk update state komponen
        if (callback && typeof callback === 'function') {
          console.log("⚡ Calling callback with data:", data);
          callback(data);
        } else {
          console.log("⚡ No callback provided or invalid");
        }

        // Opsional: Memicu reload global atau update state di sini jika diperlukan
        if (data.trigger) {
          console.log("⚡ Trigger detected, potential reload needed");
          // window.location.reload(); // Atau panggil fungsi refresh data
        }
      };

      socket.on("member_registration:update", handleUpdate);
      socket.on("members:update", handleUpdate); // Tambah untuk pendaftaran anggota
      socket.on("financing_applications:update", handleUpdate);
      socket.on("savings:update", handleUpdate);
      socket.on("transactions:update", handleUpdate);
      socket.on("registration:status_update", handleUpdate); // Tambah event khusus registration

      return () => {
        socket.off("notification");
        socket.off("member_registration:update", handleUpdate);
        socket.off("members:update", handleUpdate); // Cleanup untuk members:update
        socket.off("financing_applications:update", handleUpdate);
        socket.off("savings:update", handleUpdate);
        socket.off("transactions:update", handleUpdate);
        socket.off("registration:status_update", handleUpdate); // Cleanup event baru
      };
    }
  }, [socket, callback]);
};

export default useSocketListener;
