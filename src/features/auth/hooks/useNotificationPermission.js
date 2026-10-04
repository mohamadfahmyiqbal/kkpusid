import { useState, useEffect } from "react";
import authService from "../service/authService";
import { AUTH_CONSTANTS } from "../constants/authConstants";
import { logger } from "../utils/logger";

const VAPID_CACHE_KEY = AUTH_CONSTANTS.VAPID_CACHE_KEY;
const VAPID_CACHE_DURATION = AUTH_CONSTANTS.VAPID_CACHE_DURATION_MS;

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

    // Cek cache VAPID key terlebih dahulu
    const getCachedVapidKey = () => {
      try {
        const cached = localStorage.getItem(VAPID_CACHE_KEY);
        if (cached) {
          const { key, timestamp } = JSON.parse(cached);
          const now = Date.now();

          // Gunakan cached key jika masih valid (24 jam)
          if (now - timestamp < VAPID_CACHE_DURATION) {
            return key;
          }
        }
      } catch (err) {
        logger.warn("Error reading VAPID cache:", err);
      }
      return null;
    };

    // Cache VAPID key ke localStorage
    const cacheVapidKey = (key) => {
      try {
        const cacheData = {
          key,
          timestamp: Date.now(),
        };
        localStorage.setItem(VAPID_CACHE_KEY, JSON.stringify(cacheData));
      } catch (err) {
        logger.warn("Error caching VAPID key:", err);
      }
    };

    // Ambil VAPID public key dari backend atau cache
    const fetchVapidKey = async () => {
      try {
        // Cek cache dulu
        const cachedKey = getCachedVapidKey();
        if (cachedKey) {
          setVapidPublicKey(cachedKey);
          return;
        }

        // Jika tidak ada di cache, fetch dari backend
        const res = await authService.getVapidPublicKey();
        if (res.data?.success) {
          const key = res.data.vapid_public_key;
          setVapidPublicKey(key);
          cacheVapidKey(key);
        } else {
          logger.warn("Gagal mengambil VAPID key:", res.data?.message);
        }
      } catch (err) {
        logger.error("Error fetching VAPID key:", err);
      }
    };

    fetchVapidKey();
  }, []);

  return { notifPermission, vapidPublicKey };
};

export default useNotificationPermission;
