// src/App.js
import React from "react";
import "./App.css";

// Antarmuka Router
import { RouterProvider } from "react-router-dom";
import routerConfig from "./routes/RouterConfig";

// Notifikasi Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ IMPOR PROVIDER YANG DIBUTUHKAN
import { ProfileProvider } from "./contexts/ProfileContext";

/**
 * Komponen Utama Aplikasi
 * Menangani routing global, notifikasi toast, dan koneksi socket.
 */
const App = () => {
  return (
    <ProfileProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <RouterProvider
        router={routerConfig}
        future={{ v7_startTransition: true }}
      />
    </ProfileProvider>
  );
};

export default App;
