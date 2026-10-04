import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

/**
 * Hook untuk menangani event pembayaran berhasil dari socket
 * - Menutup Snap popup
 * - Update UI registrasi
 * - Menampilkan konfirmasi pembayaran
 */
export const usePaymentHandler = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Handle tutup Snap popup
    const handleCloseSnap = () => {

      // Coba tutup Snap popup jika ada
      if (window.snap) {
        window.snap.hide();
      }
      
      // Tutup overlay atau modal Snap
      const snapElements = document.querySelectorAll('[id*="snap"], [class*="snap"]');
      snapElements.forEach(el => {
        if (el.style.display !== 'none') {
          el.style.display = 'none';
        }
      });
    };

    // Handle payment success event
    const handlePaymentSuccessful = (event) => {

      setPaymentSuccess(true);
      setPaymentData(event.detail);
      
      // Tutup Snap popup jika ada
      handleCloseSnap();
    };

    // Register event listeners
    window.addEventListener('CLOSE_SNAP_POPUP', handleCloseSnap);
    window.addEventListener('PAYMENT_SUCCESSFUL', handlePaymentSuccessful);

    return () => {
      window.removeEventListener('CLOSE_SNAP_POPUP', handleCloseSnap);
      window.removeEventListener('PAYMENT_SUCCESSFUL', handlePaymentSuccessful);
    };
  }, []);

  const resetPaymentState = () => {
    setPaymentSuccess(false);
    setPaymentData(null);
  };

  return {
    paymentSuccess,
    paymentData,
    resetPaymentState,
  };
};

export default usePaymentHandler;
