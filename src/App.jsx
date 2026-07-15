// src/App.js
import React, { useEffect } from "react";
import "./App.css";

// Antarmuka Router
import { RouterProvider } from "react-router-dom";
import routerConfig from "./routes/RouterConfig";
// Notifikasi Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Swal from "sweetalert2";

// ✅ IMPOR PROVIDER YANG DIBUTUHKAN
import { ProfileProvider } from "./components/layout/contexts";
import { ThemeProvider } from "./contexts/ThemeContext";
import EnhancedErrorBoundary from "./components/ui/EnhancedErrorBoundary";

// Socket.io
import { initSocket, registerMember, disconnectSocket } from "./utils/socket";
import { jwtDecode } from "jwt-decode";
import { jwtEncode } from "./utils/helpers";

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
          toast.info(data.title || 'Notifikasi baru', {
            position: "top-right",
            autoClose: 5000,
          });
        });

        socket.on('profile:update', (data) => {
          toast.success('Profil diperbarui');
          // TODO: Update ProfileProvider jika diperlukan
        });

        socket.on('withdrawals:update', (data) => {
          toast.info('Data penarikan diperbarui');
        });

        socket.on('savings:update', (data) => {
          toast.info('Data tabungan diperbarui');
        });

        socket.on('financing_applications:update', (data) => {
          Swal.fire({
            title: 'Pembaruan Pembiayaan',
            text: 'Status pengajuan pembiayaan Anda telah diperbarui.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Cek Sekarang',
            cancelButtonText: 'Tutup'
          }).then((result) => {
            if (result.isConfirmed) window.location.href = `/${jwtEncode({ page: "dashboard" })}`;
          });
        });

        const handleRegistrationUpdate = (data) => {
          // Selalu trigger refresh global untuk memastikan state sinkron dengan DB
          window.dispatchEvent(new CustomEvent("REFRESH_REGISTRATION_STATUS"));
          
          Swal.fire({
            title: 'Status Pendaftaran Diperbarui',
            text: 'Status permohonan keanggotaan Anda telah diperbarui oleh pengurus.',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Lihat Detail',
            cancelButtonText: 'Tutup'
          }).then((result) => {
            if (result.isConfirmed) window.location.href = `/${jwtEncode({ page: "registrationPage" })}`;
          });
        };

        socket.on('registration:status_update', handleRegistrationUpdate);
        socket.on('member_registration:update', handleRegistrationUpdate);
        socket.on('members:update', handleRegistrationUpdate);
        socket.on('REGISTRATION_UPDATED', handleRegistrationUpdate);

        // Listener untuk notifikasi baru dari backend
        socket.on('new_notification', (data) => {
          const titleLower = (data?.title || '').toLowerCase();
          const isApproval = titleLower.includes('disetujui') || titleLower.includes('approval') || data?.type === 'APPROVAL' || titleLower.includes('verifikasi');

          if (isApproval) {
            Swal.fire({
              title: data.title || 'Persetujuan Berhasil',
              text: data.content || 'Ada pembaruan pada status pengajuan Anda.',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#0d6efd',
              cancelButtonColor: '#6c757d',
              confirmButtonText: 'Lihat Detail',
              cancelButtonText: 'Tutup'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = data.link || data.action_url || `/${jwtEncode({ page: "dashboard" })}`;
              }
            });
          } else {
            // Tampilkan toast notifikasi biasa
            toast.success(data.title || 'Notifikasi Baru', {
              description: data.content || '',
              position: "top-center",
              autoClose: 5000,
            });
          }

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
      </ThemeProvider>
    </EnhancedErrorBoundary>
  );
};

export default App;
