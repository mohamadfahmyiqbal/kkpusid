// public/sw.js
/*
 * DEBUG MODE: Aktifkan Logging Ekstra
 * Gunakan file ini untuk melacak di mana data terhenti.
 */

self.addEventListener("push", function (event) {
  console.group(
    "%c 🛰️ PUSH RECEIVER DEBUG ",
    "background: #222; color: #bada55"
  );

  // 1. Cek apakah ada data masuk
  if (!event.data) {
    console.error(
      "❌ ERROR: Push event diterima tapi TIDAK ADA DATA (Payload Kosong)."
    );
    console.groupEnd();
    return;
  }

  // 2. Ambil data mentah (Raw Text)
  const rawText = event.data.text();
  console.log("📄 Raw Payload dari Server:", rawText);

  let title = "Koperasi PUS";
  let options = {
    icon: "/assets/icons/PUSlogo.png",
    badge: "/assets/icons/PUSlogo.png",
    data: { url: "/" },
  };

  try {
    // 3. Cek apakah formatnya JSON valid
    const data = JSON.parse(rawText);
    console.log("✅ JSON Parsed Successfully:", data);

    title = data.title || title;
    options.body = data.content || data.body || "Pesan berhasil diurai.";
    options.data.url = data.url || "/";
  } catch (err) {
    // 4. Jika bukan JSON, tampilkan sebagai teks biasa
    console.warn("⚠️ Payload BUKAN JSON. Menggunakan fallback Text.");
    options.body = rawText;
  }

  console.log("📢 Menampilkan Notifikasi dengan Options:", options);
  console.groupEnd();

  event.waitUntil(
    self.registration
      .showNotification(title, options)
      .then(() => console.log("🚀 Notifikasi muncul di layar!"))
      .catch((err) =>
        console.error("❌ Browser menolak menampilkan notifikasi:", err)
      )
  );
});

/* * INSTRUKSI DEBUGGING DI CONSOLE:
 * 1. Buka Chrome DevTools -> Tab Console.
 * 2. Klik dropdown "top" (biasanya di bawah tab Elements/Console).
 * 3. Pilih "Service Worker (sw.js)".
 * 4. Tembak API PUT /approve Anda.
 * * JIKA LOG DI ATAS TIDAK MUNCUL:
 * Masalah ada di BACKEND (Server tidak berhasil mengirim signal ke Push Service Google/Mozilla).
 * * JIKA LOG MUNCUL TAPI NOTIFIKASI TIDAK:
 * Masalah ada di IZIN BROWSER atau PATH ICON/BADGE salah (404).
 */
