// components/NotificationModal.jsx

import React from "react";
import { Modal, Button } from "react-bootstrap";

const NotificationModal = ({ show, onHide, notifikasi }) => {
  if (!notifikasi) return null; // Jangan render jika tidak ada data

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{notifikasi.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-muted">
          {new Date(notifikasi.created_at).toLocaleString("id-ID")}
        </p>
        <hr />
        <p>{notifikasi.body}</p>

        {/* Opsi: Tandai sebagai sudah dibaca di sini */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
        {/* Anda bisa menambahkan tombol lain di sini, misal: 'Aksi Lanjut' */}
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationModal;
