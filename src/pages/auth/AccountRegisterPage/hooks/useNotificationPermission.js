import { useState, useEffect } from "react";
import UNotification from "../../../../utils/api/UNotification";

/**
 * Hook untuk mengelola izin notifikasi dan kunci VAPID
 * @returns {Object} - { notifPermission, vapidPublicKey }
 */
const useNotificationPermission = () => {
  const [notifPermission, setNotifPermission] = useState("default");
  const [vapidPublicKey, setVapidPublicKey] = useState(null);

  useEffect(() => {
    if ("Notification" in window) {
      setNotifPermission(Notification.permission);
    }

    // Ambil VAPID public key dari backend
    const fetchVapidKey = async () => {
      try {
        const res = await UNotification.getVapidPublicKey();
        if (res.data?.success) {
          setVapidPublicKey(res.data.vapid_public_key);
        } else {
          console.warn("Gagal mengambil VAPID key:", res.data?.message);
        }
      } catch (err) {
        console.error("Error fetching VAPID key:", err);
      }
    };

    fetchVapidKey();
  }, []);

  return { notifPermission, vapidPublicKey };
};

export default useNotificationPermission;
