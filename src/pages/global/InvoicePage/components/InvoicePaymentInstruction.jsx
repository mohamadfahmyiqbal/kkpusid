import React from "react";
import { Button } from "react-bootstrap";

const InvoicePaymentInstruction = ({ paymentInstruction, onReset }) => {
  if (!paymentInstruction) return null;

  const handleOpenCheckout = () => {
    if (typeof window.loadJokulCheckout === "function") {
      window.loadJokulCheckout(paymentInstruction.payment_url);
    } else {
      window.open(paymentInstruction.payment_url, "_blank");
    }
  };

  return (
    <div className="mt-4 p-4 border rounded shadow-sm bg-white">
      <h5 className="fw-bold text-primary mb-3">Instruksi Pembayaran</h5>

      {/* Bank Transfer (Virtual Account) */}
      {paymentInstruction.payment_type === "bank_transfer" &&
        paymentInstruction.va_numbers && (
          <div>
            <p>Silakan transfer ke Virtual Account berikut:</p>
            <h4 className="fw-bold text-primary">
              {paymentInstruction.va_numbers[0].bank.toUpperCase()} -{" "}
              {paymentInstruction.va_numbers[0].va_number}
            </h4>
            <p className="mb-2">
              Jumlah:{" "}
              <strong>
                Rp{" "}
                {parseInt(paymentInstruction.gross_amount, 10).toLocaleString(
                  "id-ID",
                )}
              </strong>
            </p>
            {paymentInstruction.how_to_pay_page && (
              <div className="mt-2">
                <Button
                  href={paymentInstruction.how_to_pay_page}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-info"
                  size="sm"
                >
                  Lihat Cara Pembayaran
                </Button>
              </div>
            )}
          </div>
        )}

      {/* Mandiri Bill Payment / Echannel */}
      {paymentInstruction.payment_type === "echannel" && (
        <div>
          <p>Silakan transfer Mandiri Bill Payment:</p>
          <h4 className="fw-bold">
            Biller Code: {paymentInstruction.biller_code}
          </h4>
          <h4 className="fw-bold">Bill Key: {paymentInstruction.bill_key}</h4>
          <p>
            Jumlah: Rp{" "}
            {parseInt(paymentInstruction.gross_amount, 10).toLocaleString(
              "id-ID",
            )}
          </p>
        </div>
      )}

      {/* GoPay */}
      {paymentInstruction.payment_type === "gopay" && (
        <div>
          <p>Silakan scan QR Code GoPay berikut:</p>
          {paymentInstruction.actions &&
            paymentInstruction.actions.map((action, idx) => {
              if (action.name === "generate-qr-code") {
                return (
                  <img
                    key={idx}
                    src={action.url}
                    alt="GoPay QR Code"
                    className="mb-3 border p-2 rounded"
                    style={{ maxWidth: "200px" }}
                  />
                );
              }
              if (action.name === "deeplink-redirect") {
                return (
                  <div key={idx} className="mt-2">
                    <Button href={action.url} target="_blank" variant="success">
                      Buka Aplikasi Gojek
                    </Button>
                  </div>
                );
              }
              return null;
            })}
        </div>
      )}

      {/* QRIS */}
      {paymentInstruction.payment_type === "qris" && (
        <div className="text-center">
          <p className="mb-2">
            Silakan scan QR Code QRIS berikut dengan aplikasi Mobile Banking
            atau E-Wallet apa saja:
          </p>
          {paymentInstruction.qr_image_url ? (
            <img
              src={paymentInstruction.qr_image_url}
              alt="QRIS QR Code"
              className="mb-3 border p-3 bg-white rounded shadow-sm mx-auto"
              style={{ maxWidth: "250px", display: "block" }}
            />
          ) : (
            paymentInstruction.actions &&
            paymentInstruction.actions.map((action, idx) => {
              if (action.name === "generate-qr-code") {
                return (
                  <img
                    key={idx}
                    src={action.url}
                    alt="QRIS QR Code"
                    className="mb-3 border p-3 bg-white rounded shadow-sm mx-auto"
                    style={{ maxWidth: "250px", display: "block" }}
                  />
                );
              }
              return null;
            })
          )}
          <p className="fw-bold fs-5 text-primary">
            Jumlah: Rp{" "}
            {parseInt(paymentInstruction.gross_amount, 10).toLocaleString(
              "id-ID",
            )}
          </p>
        </div>
      )}

      {/* DOKU Checkout Popup */}
      {paymentInstruction.payment_type === "checkout" &&
        paymentInstruction.payment_url && (
          <div className="text-center py-2">
            <p className="mb-3 text-muted">
              Jendela pembayaran DOKU telah disiapkan. Jika belum terbuka
              otomatis, klik tombol di bawah ini:
            </p>
            <Button
              onClick={handleOpenCheckout}
              variant="primary"
              size="lg"
              className="px-4 py-2 fw-bold shadow-sm rounded-pill"
            >
              Buka Popup Pembayaran QRIS / DOKU
            </Button>
          </div>
        )}

      {/* Reset / Change Payment Method */}
      <Button
        variant="outline-secondary"
        className="mt-4 w-100"
        onClick={onReset}
      >
        Ganti Metode Pembayaran
      </Button>
    </div>
  );
};

export default InvoicePaymentInstruction;
