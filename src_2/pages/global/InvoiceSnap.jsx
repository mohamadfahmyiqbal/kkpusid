import { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

export default function PaymentModal({
  show,
  onClose,
  token,
  data,
  onUpdateStatus,
}) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!show || !token) return;

    setLoading(true);

    // Tambahkan script Snap jika belum ada
    if (!document.getElementById("midtrans-script")) {
      const script = document.createElement("script");
      script.id = "midtrans-script";
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // ganti ke production jika perlu
      script.setAttribute(
        "data-client-key",
        process.env.REACT_APP_MIDTRANS_CLIENT_KEY
      );
      script.async = true;
      document.body.appendChild(script);
    }

    // Delay kecil agar modal sudah render
    const timer = setTimeout(() => {
      if (!window.snap) {
        console.error("Midtrans Snap tidak tersedia");
        setLoading(false);
        return;
      }

      // Snap popup
      window.snap.pay(token, {
        onSuccess: (result) => handleResult("PAID", result),
        onPending: (result) => handleResult("Menunggu Pembayaran", result),
        onError: (result) => handleResult("FAILED", result),
        onClose: () => {
          console.log("User menutup popup Snap");
          onClose();
        },
      });

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [show, token, onClose, data]);

  // Fungsi untuk update status dan redirect
  const handleResult = (status, result) => {
    console.log(`Pembayaran status ${status}:`, result);

    if (onUpdateStatus) {
      onUpdateStatus(status);
    }

    // Delay 2 detik sebelum redirect
    setTimeout(() => {
      const tokenEncode = jwtEncode({ page: "invoice" });
      navigate(tokenEncode, { state: { data, snapResult: result } });
    }, 2000);

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Body className="text-center py-3">
        {loading && (
          <>
            <Spinner animation="border" />
            <p className="mt-2">Memuat halaman pembayaran...</p>
          </>
        )}
        <div
          id="midtrans-container"
          style={{ width: "100%", minHeight: "600px" }}
        ></div>
      </Modal.Body>
    </Modal>
  );
}
