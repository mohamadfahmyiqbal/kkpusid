// src/App.js
import React, { useEffect } from "react";
import "./App.css";

// Antarmuka Router
import { RouterProvider } from "react-router-dom";
import routerConfig from "./routes/RouterConfig";

// Notifikasi Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ IMPOR PROVIDER YANG DIBUTUHKAN
import { ProfileProvider } from "./components/layout/contexts";

// Socket.io
import { initSocket, registerMember, disconnectSocket } from "./utils/socket";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

/**
 * Komponen Utama Aplikasi
 * Menangani routing global, notifikasi toast, dan koneksi socket.
 */
const App = () => {
  useEffect(() => {
    // Inisialisasi socket jika user sudah login
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const memberId = decoded.member_id;

        // Inisialisasi koneksi socket
        const socket = initSocket(token);

        // Register member untuk menerima pesan personal
        registerMember(memberId);

        // Event listeners untuk update real-time
        socket.on('notifications:update', (data) => {
          console.log('📬 Notifikasi socket:', data);
          toast.info(data.title || 'Notifikasi baru', {
            position: "top-right",
            autoClose: 5000,
          });
        });

        socket.on('profile:update', (data) => {
          console.log('👤 Profile update:', data);
          toast.success('Profil diperbarui');
          // TODO: Update ProfileProvider jika diperlukan
        });

        socket.on('withdrawals:update', (data) => {
          console.log('💰 Withdrawals update:', data);
          toast.info('Data penarikan diperbarui');
        });

        socket.on('savings:update', (data) => {
          console.log('🏦 Savings update:', data);
          toast.info('Data tabungan diperbarui');
        });

        socket.on('financing_applications:update', (data) => {
          console.log('💼 Financing update:', data);
          toast.info('Status pengajuan pembiayaan diperbarui');
        });

      } catch (error) {
        console.error('❌ Error decoding token untuk socket:', error.message);
      }
    }

    // Cleanup saat unmount
    return () => {
      disconnectSocket();
    };
  }, []);

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
