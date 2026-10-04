import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

const APP_VERSION = "1.0.1"; // Ubah versi ini setiap kali ada update besar

if (localStorage.getItem("appVersion") !== APP_VERSION) {
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }
  localStorage.clear();
  sessionStorage.clear();
  localStorage.setItem("appVersion", APP_VERSION);
  window.location.reload(true);
}

// --- SERVICE WORKER ---
if ("serviceWorker" in navigator) {
  if (import.meta.env.MODE === "production") {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {

        })
        .catch((err) => {
          console.error("Registrasi Service Worker gagal:", err);
        });
    });
  } else {
    // Clear any existing cache storage to avoid stale assets in development
    if (window.caches) {
      window.caches.keys().then((names) => {
        Promise.all(names.map(name => window.caches.delete(name)));
      });
    }
    // Register service worker in development for testing push notifications
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {

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