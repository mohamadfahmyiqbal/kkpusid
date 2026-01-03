/* eslint-disable no-restricted-globals */

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("push", function (event) {
  if (event.data) {
    try {
      // Coba baca sebagai JSON
      const data = event.data.json();

      const options = {
        body: data.content || "Ada notifikasi baru untuk Anda.",
        icon: "/assets/icons/PUSlogo.png",
        badge: "/assets/icons/PUSlogo.png",
        vibrate: [100, 50, 100],
        data: {
          url: data.url || "/",
        },
      };

      event.waitUntil(
        self.registration.showNotification(
          data.title || "Koperasi PUS",
          options
        )
      );
    } catch (err) {
      // JIKA BUKAN JSON (Contoh: Klik tombol Push di DevTools),
      // tampilkan data sebagai teks biasa agar tidak crash
      const textData = event.data.text();

      event.waitUntil(
        self.registration.showNotification("Koperasi PUS (Test)", {
          body: textData,
          icon: "/assets/icons/PUSlogo.png",
        })
      );
    }
  }
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
});
