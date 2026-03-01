// 📁 src/pages/global/BillingPage/components/SukarelaForm.jsx
import React from "react";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import formatRupiah from "./utils";

const SukarelaForm = ({
  customAmount,
  setCustomAmount,
  handleNavigateToInvoice,
  isSubmitting,
}) => {
  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label className="small fw-bold text-secondary text-uppercase">
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
            className="border-start-0 fw-bold"
            value={customAmount}
            onChange={(e) =>
              setCustomAmount(
                formatRupiah(e.target.value.replace(/\./g, "")),
              )
            }
          />
        </InputGroup>
      </Form.Group>
      <Button
        variant="primary"
        className="w-100 fw-bold py-3 rounded-3 shadow-sm"
        onClick={handleNavigateToInvoice}
        disabled={!customAmount || isSubmitting}
      >
        {isSubmitting ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Lanjutkan Ke Pembayaran"
        )}
      </Button>
    </div>
  );
};

export default SukarelaForm;
