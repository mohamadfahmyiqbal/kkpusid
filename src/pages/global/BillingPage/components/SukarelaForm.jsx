// 📁 src/pages/global/BillingPage/components/SukarelaForm.jsx
import React, { useCallback } from "react";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FaDonate } from "react-icons/fa";
import formatRupiah from "./utils";

const SukarelaForm = ({
  customAmount,
  setCustomAmount,
  handleNavigateToInvoice,
  isSubmitting,
}) => {
  const handleChange = useCallback(
    (e) => {
      const raw = e.target.value.replace(/\./g, "");
      // Hanya angka
      if (/^\d*$/.test(raw)) {
        setCustomAmount(formatRupiah(raw));
      }
    },
    [setCustomAmount],
  );

  const numericValue = parseFloat(customAmount.replace(/\./g, "") || 0);

  return (
    <div className="bp-sukarela-form">
      <div className="text-center mb-4">
        <div className="bp-sukarela-icon mb-3">
          <FaDonate size={24} />
        </div>
        <h5 className="fw-bold mb-1">Setoran Sukarela</h5>
        <p className="text-muted small mb-0">
          Masukkan jumlah nominal yang ingin Anda setorkan
        </p>
      </div>

      <Form.Group className="mb-4">
        <Form.Label className="fw-bold small text-secondary text-uppercase">
          Jumlah Setoran
        </Form.Label>
        <InputGroup size="lg">
          <InputGroup.Text className="bg-white border-end-0 fw-bold text-primary">
            Rp
          </InputGroup.Text>
          <Form.Control
            type="text"
            inputMode="numeric"
            placeholder="0"
            className="border-start-0 fw-bold text-center"
            style={{ fontSize: "24px" }}
            value={customAmount}
            onChange={handleChange}
          />
        </InputGroup>
        {numericValue > 0 && (
          <div className="text-center mt-2">
            <span className="text-muted small">
              Terbilang: <span className="fw-bold text-dark">Rp {customAmount}</span>
            </span>
          </div>
        )}
        <div className="text-center mt-1">
          <small className="text-muted">Minimal setoran Rp 1.000</small>
        </div>
      </Form.Group>

      <Button
        variant="primary"
        className="w-100 fw-bold py-3 rounded-12 shadow-sm"
        onClick={handleNavigateToInvoice}
        disabled={!customAmount || numericValue < 1000 || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Memproses...
          </>
        ) : (
          "Lanjutkan Ke Pembayaran"
        )}
      </Button>
    </div>
  );
};

export default React.memo(SukarelaForm);