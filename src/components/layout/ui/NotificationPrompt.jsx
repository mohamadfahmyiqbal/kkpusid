import React, { useState, useEffect } from "react";
import {  Button } from "react-bootstrap";
import { FaBell, FaTimes } from "react-icons/fa";
import { subscribeUser } from "../../../utils/helper/pushHelper";
import Alert from "../../ui/SwalAlert";


export default function NotificationPrompt({ memberId }) {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Cek apakah browser mendukung notifikasi dan belum pernah meminta izin
    if (
      "Notification" in window &&
      "serviceWorker" in navigator &&
      Notification.permission === "default"
    ) {
      // Tampilkan prompt setelah delay 2 detik agar tidak terlalu intrusif
      const timer = setTimeout(() => setShowPrompt(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnable = async () => {
    setShowPrompt(false);
    // Memicu prompt asli browser
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      await subscribeUser(memberId);
    }
  };

  if (!showPrompt) return null;

  return (
    <div
      className="fixed-bottom p-3 animate__animated animate__slideInUp"
      style={{ zIndex: 1050 }}
    >
      <Alert
        variant="primary"
        className="shadow-lg border-0 rounded-4 d-flex align-items-center justify-content-between mb-0"
      >
        <div className="d-flex align-items-center">
          <div
            className="bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center"
            style={{ width: "40px", height: "40px" }}
          >
            <FaBell size={20} />
          </div>
          <div>
            <h6 className="fw-bold mb-1">Aktifkan Notifikasi Real-time</h6>
            <p className="small mb-0 opacity-75">
              Dapatkan info status persetujuan pendaftaran langsung di perangkat
              Anda.
            </p>
          </div>
        </div>
        <div className="d-flex gap-2 ms-3">
          <Button
            variant="primary"
            size="sm"
            className="fw-bold px-4 rounded-pill"
            onClick={handleEnable}
          >
            Aktifkan
          </Button>
          <Button
            variant="link"
            className="text-secondary p-0 ms-2"
            onClick={() => setShowPrompt(false)}
          >
            <FaTimes />
          </Button>
        </div>
      </Alert>
    </div>
  );
}
