import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

// --- SERVICE WORKER ---
if ("serviceWorker" in navigator) {
  if (import.meta.env.MODE === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker terdaftar:", reg.scope);
        })
        .catch((err) => {
          console.error("Registrasi Service Worker gagal:", err);
        });
    });
  } else {
    // Clear any existing cache storage to avoid stale assets in development
    if (window.caches) {
      window.caches.keys().then((names) => {
        Promise.all(names.map(name => window.caches.delete(name)))
          .then(() => console.log("🧹 Cache Storage berhasil dibersihkan di development"));
      });
    }
    // Register service worker in development for testing push notifications
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker terdaftar di development:", reg.scope);
          // Paksa update service worker agar perubahan bypass cache langsung aktif
          reg.update();
        })
        .catch((err) => {
          console.error("Registrasi Service Worker gagal di development:", err);
        });
    });
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> dihapus agar socket/sw tidak trigger dua kali saat dev
  <App />
);

reportWebVitals();