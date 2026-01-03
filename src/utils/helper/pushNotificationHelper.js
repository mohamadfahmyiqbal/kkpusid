import webpush from "web-push";
import db from "../models/index.js";
const { PushSubscription } = db;

// Konfigurasi Web Push
webpush.setVapidDetails(
  process.env.VAPID_EMAIL,
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export const sendPushNotification = async (
  memberId,
  title,
  message,
  url = "/"
) => {
  try {
    // 1. Cari semua perangkat/browser milik memberId tersebut
    const subscriptions = await PushSubscription.findAll({
      where: { member_id: memberId },
    });

    const payload = JSON.stringify({
      title: title,
      content: message,
      url: url,
    });

    // 2. Kirim ke semua perangkat
    const notifications = subscriptions.map((sub) => {
      const pushConfig = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };
      return webpush.sendNotification(pushConfig, payload);
    });

    await Promise.all(notifications);
    console.log(`✅ Push sent to member ${memberId}`);
  } catch (error) {
    console.error("❌ Error sending push notification:", error);
  }
};
