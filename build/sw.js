// public/sw.js

self.addEventListener("push", function (event) {
  if (!event.data) {
    return;
  }

  const rawText = event.data.text();

  let title = "Koperasi PUS";
  let options = {
    icon: "/assets/icons/PUSlogo.png",
    badge: "/assets/icons/PUSlogo.png",
    data: { url: "/" },
  };

  try {
    const data = JSON.parse(rawText);

    title = data.title || title;
    options.body = data.content || data.body || "Pesan berhasil diurai.";
    options.data.url = data.url || "/";
  } catch (err) {
    options.body = rawText;
  }

  event.waitUntil(
    self.registration
      .showNotification(title, options)
  );
});
