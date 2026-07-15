// src/utils/helper/SocketListener.js
import { useEffect } from "react";
import { useSocket } from "../../components/layout/contexts/SocketContext";

const useSocketListener = (callback) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      // 1. Listen untuk notifikasi umum (jika masih ada)
      socket.on("notification", (data) => {
        // Tampil toast ditangani oleh App.jsx
      });

      // 2. Listen untuk update status persetujuan (Dinamis sesuai backend)
      // Menangani: member_registration:update, financing_applications:update, dll.
      const handleUpdate = (data) => {




        const statusMap = {
          APPROVED: "disetujui sepenuhnya",
          REJECTED: "ditolak",
          IN_PROGRESS: "diproses ke tahap berikutnya",
        };

        // Tampil toast ditangani oleh App.jsx

        // Panggil callback untuk update state komponen
        if (callback && typeof callback === 'function') {

          callback(data);
        } else {

        }

        // Opsional: Memicu reload global atau update state di sini jika diperlukan
        if (data.trigger) {

          // window.location.reload(); // Atau panggil fungsi refresh data
        }
      };

      // 3. Listen untuk notifikasi baru dari backend
      socket.on("new_notification", (data) => {

        
        // Tampil toast ditangani oleh App.jsx

        // Handle khusus untuk PAYMENT_SUCCESS
        if (data.type === "PAYMENT_SUCCESS") {

          
          // Trigger event untuk menutup Snap popup
          window.dispatchEvent(new CustomEvent("CLOSE_SNAP_POPUP"));
          
          // Trigger refresh status registrasi
          window.dispatchEvent(new CustomEvent("REFRESH_REGISTRATION_STATUS"));
          
          // Trigger update UI global
          window.dispatchEvent(new CustomEvent("PAYMENT_SUCCESSFUL", {
            detail: {
              notificationId: data.notification_id,
              amount: data.content?.match(/Rp ([\d,.]+)/)?.[1],
              timestamp: data.sent_datetime
            }
          }));
        }

        // Panggil callback untuk update state komponen
        if (callback && typeof callback === 'function') {
          callback({
            type: 'notification',
            data: data
          });
        }
      });

      socket.on("member_registration:update", handleUpdate);
      socket.on("members:update", handleUpdate); // Tambah untuk pendaftaran anggota
      socket.on("financing_applications:update", handleUpdate);
      socket.on("savings:update", handleUpdate);
      socket.on("transactions:update", handleUpdate);
      socket.on("registration:status_update", handleUpdate); // Tambah event khusus registration

      return () => {
        socket.off("notification");
        socket.off("new_notification");
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
