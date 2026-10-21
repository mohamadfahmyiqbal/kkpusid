import { Modal, Button } from "react-bootstrap";

export default function NotificationModal({ show, onHide, notifikasi }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Detail Notifikasi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notifikasi ? (
          <>
            <h5>{notifikasi.title}</h5>
            <p>{notifikasi.body}</p>
            <small className="text-muted">
              Diterima pada: {notifikasi.created_at}
            </small>
          </>
        ) : (
          <p>Tidak ada detail notifikasi.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Tutup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
