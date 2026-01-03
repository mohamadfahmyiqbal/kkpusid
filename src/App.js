import React from "react";
import "./App.css";

// Antarmuka Router
import { RouterProvider } from "react-router-dom";
import routerConfig from "./routes/RouterConfig";

// Notifikasi Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom Hook untuk Real-time Socket
import useSocketListener from "./utils/helper/SocketListener";

/**
 * Komponen Utama Aplikasi
 * Menangani routing global, notifikasi toast, dan koneksi socket.
 */
const App = () => {
  // Mengaktifkan listener socket secara global
  // Hook ini akan otomatis berjalan saat user login (data tersedia di storage)
  useSocketListener();

  return (
    <>
      {/* ToastContainer: Wadah untuk memunculkan notifikasi pop-up.
          Dipicu oleh perintah toast.info() di SocketListener.js
      */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true} // Notifikasi terbaru muncul di paling atas
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Menggunakan warna solid (Info=Biru, Success=Hijau)
      />

      {/* RouterProvider: Menangani navigasi halaman berdasarkan 
          konfigurasi yang ada di routes/RouterConfig.jsx
      */}
      <RouterProvider
        router={routerConfig}
        future={{ v7_startTransition: true }}
      />
    </>
  );
};

export default App;
