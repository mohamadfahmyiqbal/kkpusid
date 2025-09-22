import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";

export default function PaymentModal({ show, onClose, token }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show && token) {
      setLoading(true);

      // Buat script Midtrans Snap secara dinamis
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // sandbox atau production sesuai env
      script.setAttribute(
        "data-client-key",
        process.env.REACT_APP_MIDTRANS_CLIENT_KEY
      );
      script.async = true;

      script.onload = () => {
        if (window.snap) {
          window.snap.pay(token, {
            onSuccess: function (result) {
              console.log("Pembayaran Berhasil:", result);
              onClose();
            },
            onPending: function (result) {
              console.log("Pembayaran Pending:", result);
              onClose();
            },
            onError: function (result) {
              console.log("Pembayaran Gagal:", result);
              onClose();
            },
            onClose: function () {
              console.log("User menutup popup Snap");
              onClose();
            },
          });
        } else {
          console.error("Midtrans Snap tidak tersedia");
        }
        setLoading(false);
      };

      document.body.appendChild(script);

      // Bersihkan script saat modal ditutup
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [show, token, onClose]);

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Body className="text-center py-5">
        {loading && <Spinner animation="border" />}
        <p>Memuat halaman pembayaran...</p>
      </Modal.Body>
    </Modal>
  );
}
