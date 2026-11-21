import { useEffect, useState } from 'react';

/**
 * Hook untuk menangani event pembayaran berhasil dari socket
 * - Update UI registrasi
 * - Menampilkan konfirmasi pembayaran
 */
export const usePaymentHandler = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const handlePaymentSuccessful = (event) => {
      setPaymentSuccess(true);
      setPaymentData(event.detail);
    };

    window.addEventListener('PAYMENT_SUCCESSFUL', handlePaymentSuccessful);

    return () => {
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
