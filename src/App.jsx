// src/App.js
import React, { useEffect } from "react";
import "./App.css";

// Antarmuka Router
import { RouterProvider } from "react-router-dom";
import routerConfig from "./routes/RouterConfig";

import Swal from "sweetalert2";

// ✅ IMPOR PROVIDER YANG DIBUTUHKAN
import { ProfileProvider } from "./components/layout/contexts";
import { ThemeProvider } from "./contexts/ThemeContext";
import EnhancedErrorBoundary from "./components/ui/EnhancedErrorBoundary";

// Socket.io
import { initSocket, registerMember, disconnectSocket } from "./utils/socket";
import { jwtDecode } from "jwt-decode";


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

          Swal.fire({
            title: data.title || 'Notifikasi baru',
            icon: 'info',
            position: "top-end",
            toast: true,
            timer: 5000,
            showConfirmButton: false,
          });
        });

        socket.on('profile:update', (data) => {

          Swal.fire({ title: 'Profil diperbarui', icon: 'success', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
          // TODO: Update ProfileProvider jika diperlukan
        });

        socket.on('withdrawals:update', (data) => {

          Swal.fire({ title: 'Data penarikan diperbarui', icon: 'info', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
        });

        socket.on('savings:update', (data) => {

          Swal.fire({ title: 'Data tabungan diperbarui', icon: 'info', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
        });

        socket.on('financing_applications:update', (data) => {

          Swal.fire({ title: 'Status pengajuan pembiayaan diperbarui', icon: 'info', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
        });

        // Listener untuk notifikasi baru dari backend
        socket.on('new_notification', (data) => {

          
          // Tampilkan toast notifikasi
          Swal.fire({
            title: data.title || 'Notifikasi Baru',
            text: data.content || '',
            icon: 'success',
            position: "top",
            toast: true,
            timer: 5000,
            showConfirmButton: false,
          });

          // Handle khusus untuk PAYMENT_SUCCESS
          if (data.type === "PAYMENT_SUCCESS") {

            
            // Trigger event untuk menutup Snap popup
            window.dispatchEvent(new CustomEvent("CLOSE_SNAP_POPUP"));
            
            // Trigger refresh status registrasi
            window.dispatchEvent(new CustomEvent("REFRESH_REGISTRATION_STATUS"));
          }
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
    <EnhancedErrorBoundary>
      <ThemeProvider>
        <ProfileProvider>


          <RouterProvider
            router={routerConfig}
            future={{ v7_startTransition: true }}
          />
        </ProfileProvider>
      </ThemeProvider>
    </EnhancedErrorBoundary>
  );
};

export default App;
