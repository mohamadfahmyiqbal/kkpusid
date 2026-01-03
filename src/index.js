import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

// --- PENDAFTARAN SERVICE WORKER ---
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Pastikan file sw.js ada di folder public/
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("✅ Service Worker terdaftar dengan scope:", reg.scope);
      })
      .catch((err) => {
        console.error("❌ Registrasi Service Worker gagal:", err);
      });
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> dihapus agar socket/sw tidak trigger dua kali saat dev
  <App />
);

reportWebVitals();
