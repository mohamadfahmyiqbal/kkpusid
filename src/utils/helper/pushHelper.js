// src/utils/pushHelper.js

import api from "../api/common";
import { urlBase64ToUint8Array } from "./vapidHelper";

const getVapidPublicKey = async () => {
  try {
    const res = await api.get("/push/vapid-public-key");
    if (res.data?.success) {
      return res.data.vapid_public_key;
    } else {
      throw new Error("Failed to fetch VAPID key");
    }
  } catch (error) {
    console.error("Error fetching VAPID key:", error);
    throw error;
  }
};

export const subscribeUser = async (memberId) => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const existingSubscription =
      await registration.pushManager.getSubscription();
    if (existingSubscription) {

      return;
    }

    const publicKey = await getVapidPublicKey();

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });

    // Kirim subscription ke backend
    const dataToSend = {
      subscription,
      member_id: memberId,
      device_type: "Web Browser",
    };
    await api.post("/push/subscribe", dataToSend);
  } catch (error) {
    console.error("❌ Gagal Subscribe:", error.message);
  }
};
