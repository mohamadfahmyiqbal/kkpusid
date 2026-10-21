import React, { useState } from "react";
import { Modal, Button, Alert, Card, Badge, Spinner } from "react-bootstrap";
import { FaCopy, FaCheck, FaQrcode, FaUniversity, FaExternalLinkAlt } from "react-icons/fa";

export default function DokuPaymentModal({ show, onHide, paymentData, onCheckStatus }) {
  const [copied, setCopied] = useState(false);

  if (!paymentData) return null;

  const {
    payment_type,
    va_number,
    qr_image,
    how_to_pay_page,
    expired_date,
    gross_amount,
    order_id,
  } = paymentData;

  const copyToClipboard = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title className="fs-5 d-flex align-items-center">
          {payment_type === "QRIS" ? (
            <>
              <FaQrcode className="me-2" /> Pembayaran QRIS DOKU
            </>
          ) : (
            <>
              <FaUniversity className="me-2" /> Virtual Account DOKU
            </>
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center p-4">
        <div className="mb-3">
          <span className="text-muted small d-block">Order ID</span>
          <span className="fw-semibold">{order_id}</span>
        </div>

        <div className="mb-4">
          <span className="text-muted small d-block">Total Tagihan</span>
          <h3 className="fw-bold text-primary mb-0">
            Rp {Number(gross_amount || 0).toLocaleString("id-ID")}
          </h3>
        </div>

        {payment_type === "QRIS" ? (
          <div className="d-flex flex-column align-items-center">
            <Alert variant="info" className="w-100 text-start small">
              Silakan scan kode QRIS di bawah ini melalui aplikasi e-Wallet atau m-Banking pilihan Anda (BCA, Mandiri, GoPay, OVO, ShopeePay, dll).
            </Alert>
            {qr_image ? (
              <Card className="p-3 shadow-sm mb-3 border">
                <img
                  src={qr_image}
                  alt="QRIS Code"
                  style={{ width: "220px", height: "220px", objectFit: "contain" }}
                />
              </Card>
            ) : (
              <Spinner animation="border" className="my-3" />
            )}
          </div>
        ) : (
          <div>
            <Alert variant="info" className="text-start small">
              Transfer nominal tepat ke nomor Virtual Account di bawah ini sebelum batas waktu berakhir.
            </Alert>
            <Card className="p-3 bg-light border mb-3">
              <span className="text-muted small">Nomor Virtual Account</span>
              <div className="d-flex align-items-center justify-content-center mt-2">
                <h4 className="fw-bold text-dark mb-0 me-2 letter-spacing-1">
                  {va_number || "-"}
                </h4>
                <Button
                  size="sm"
                  variant={copied ? "success" : "outline-primary"}
                  onClick={() => copyToClipboard(va_number)}
                  title="Salin nomor VA"
                >
                  {copied ? <FaCheck /> : <FaCopy />}
                </Button>
              </div>
            </Card>

            {how_to_pay_page && (
              <a
                href={how_to_pay_page}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary btn-sm mb-2"
              >
                <FaExternalLinkAlt className="me-1" /> Panduan Pembayaran Bank
              </a>
            )}
          </div>
        )}

        {expired_date && (
          <div className="mt-3 text-muted small">
            Batas Waktu Pembayaran:{" "}
            <Badge bg="danger" className="text-wrap">
              {expired_date}
            </Badge>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-between">
        <Button variant="outline-secondary" onClick={onHide}>
          Tutup
        </Button>
        {onCheckStatus && (
          <Button variant="primary" onClick={onCheckStatus}>
            Saya Sudah Bayar
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}
