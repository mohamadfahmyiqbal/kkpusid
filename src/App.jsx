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
          // Handled via socket & components
        });

        socket.on('profile:update', (data) => {
          // Silent profile update
        });

        const handleWithdrawalSocketUpdate = (data) => {
          const statusName = (data?.status || data?.final_status || data?.decision || '').toUpperCase();
          const roleName = data?.role_name || data?.currentStep?.verifierRole?.role_name || data?.step_name || 'Pengurus';
          const isApproved = statusName === 'APPROVED' || statusName === 'DISETUJUI';
          const isRejected = statusName === 'REJECTED' || statusName === 'DITOLAK';
          const withdrawalId = data?.withdrawalId || data?.withdrawal_id || data?.entityId || data?.id;

          const detailTarget = withdrawalId 
            ? `/${jwtEncode({ page: "transactionDetailPage", withdrawalId })}`
            : `/${jwtEncode({ page: "penarikanSimpananPage" })}`;

          if (isApproved) {
            Swal.fire({
              title: 'Pencairan Disetujui!',
              text: 'Pengajuan pencairan simpanan Anda telah disetujui sepenuhnya.',
              icon: 'success',
              showCancelButton: true,
              confirmButtonColor: '#10b981',
              cancelButtonColor: '#6c757d',
              confirmButtonText: 'Lihat Detail',
              cancelButtonText: 'Tutup'
            }).then((result) => {
              if (result.isConfirmed) window.location.href = detailTarget;
            });
          } else if (isRejected) {
            Swal.fire({
              title: 'Pencairan Ditolak',
              text: data?.notes || data?.note || 'Pengajuan pencairan simpanan Anda tidak disetujui.',
              icon: 'error',
              confirmButtonColor: '#ef4444',
              confirmButtonText: 'Tutup'
            });
          } else {
            Swal.fire({
              title: 'Pencairan Diproses',
              text: `Pengajuan pencairan simpanan Anda berhasil disetujui pada tahap (${roleName}).`,
              icon: 'info',
              showCancelButton: true,
              confirmButtonColor: '#0d6efd',
              cancelButtonColor: '#6c757d',
              confirmButtonText: 'Cek Detail',
              cancelButtonText: 'Tutup'
            }).then((result) => {
              if (result.isConfirmed) window.location.href = detailTarget;
            });
          }
        };

        socket.on('withdrawals:update', handleWithdrawalSocketUpdate);
        socket.on('SAVINGS_WITHDRAWAL_UPDATED', handleWithdrawalSocketUpdate);
        socket.on('SAVINGS_WITHDRAWALS_UPDATED', handleWithdrawalSocketUpdate);

        socket.on('savings:update', (data) => {
          // Refresh data tanpa menampilkan toast
        });

        const handleFinancingSocketUpdate = (data) => {
          const financingId = data?.financingId || data?.financing_id || data?.entityId || data?.id;
          const targetUrl = financingId 
            ? `/${jwtEncode({ page: "transactionDetailPage", financingId })}`
            : `/${jwtEncode({ page: "programPage" })}`;

          Swal.fire({
            title: 'Pembaruan Pembiayaan / Arisan',
            text: 'Status pengajuan Anda telah diperbarui oleh pengurus.',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Cek Sekarang',
            cancelButtonText: 'Tutup'
          }).then((result) => {
            if (result.isConfirmed) window.location.href = targetUrl;
          });
        };

        socket.on('financing_applications:update', handleFinancingSocketUpdate);
        socket.on('FINANCING_APPLICATIONS_UPDATED', handleFinancingSocketUpdate);
        socket.on('FINANCING_APPLICATION_UPDATED', handleFinancingSocketUpdate);

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
          const isPaymentSuccess = data?.type === 'PAYMENT_SUCCESS' || titleLower.includes('pembayaran');

          if (isPaymentSuccess) {
            // Trigger event untuk menutup Snap popup & refresh status
            window.dispatchEvent(new CustomEvent("CLOSE_SNAP_POPUP"));
            window.dispatchEvent(new CustomEvent("REFRESH_REGISTRATION_STATUS"));
            window.dispatchEvent(new CustomEvent("PAYMENT_SUCCESSFUL", { detail: data }));
          } else if (isApproval) {
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
            // Tampilkan Swal dialog untuk notifikasi lainnya
            Swal.fire({
              icon: 'info',
              title: data.title || 'Notifikasi Baru',
              text: data.content || '',
              confirmButtonText: 'OK',
              confirmButtonColor: '#0d6efd'
            });
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
