import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export const usePaymentEventListener = ({ refreshData, setIsProcessing }) => {
  const hasShownSuccessSwal = useRef(false);

  useEffect(() => {
    const handlePaymentComplete = () => {
      if (hasShownSuccessSwal.current) return;
      hasShownSuccessSwal.current = true;

      // Tutup modal DOKU jika terbuka
      const dokuCloseBtn =
        document.querySelector("#jokul-close-button") ||
        document.querySelector(".jokul-close") ||
        document.querySelector("iframe[src*='doku.com']");

      if (dokuCloseBtn) {
        try {
          if (typeof window.destroyJokulCheckout === "function") {
            window.destroyJokulCheckout();
          } else {
            const iframe = document.querySelector("iframe[src*='doku.com']");
            if (iframe && iframe.parentElement) iframe.parentElement.remove();
          }
        } catch (e) {
          console.warn("Failed to close DOKU modal:", e);
        }
      }

      // Tampilkan Swal dialog sukses pembayaran
      Swal.fire({
        icon: "success",
        title: "Pembayaran Berhasil!",
        text: "Pembayaran Anda telah diterima dan diverifikasi oleh sistem.",
        confirmButtonText: "Selesai",
        confirmButtonColor: "#10b981",
        allowOutsideClick: false,
      });

      // Beri jeda agar backend selesai memproses ledger
      setTimeout(async () => {
        if (window.snap && window.snap.hide) {
          window.snap.hide();
        }
        if (refreshData) {
          await refreshData();
        }
        if (setIsProcessing) {
          setIsProcessing(false);
        }
      }, 1500);
    };

    window.addEventListener("CLOSE_SNAP_POPUP", handlePaymentComplete);
    window.addEventListener("PAYMENT_SUCCESSFUL", handlePaymentComplete);

    return () => {
      window.removeEventListener("CLOSE_SNAP_POPUP", handlePaymentComplete);
      window.removeEventListener("PAYMENT_SUCCESSFUL", handlePaymentComplete);
    };
  }, [refreshData, setIsProcessing]);
};
