import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
      console.log('🔄 Closing Snap popup...');
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
      console.log('💰 Payment successful event received:', event.detail);
      setPaymentSuccess(true);
      setPaymentData(event.detail);
      
      // Tutup Snap popup
      handleCloseSnap();
      
      // Tampilkan konfirmasi sukses
      toast.success('Pembayaran berhasil! Keanggotaan Anda sedang diaktifkan...', {
        position: 'top-center',
        autoClose: 5000,
      });
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
