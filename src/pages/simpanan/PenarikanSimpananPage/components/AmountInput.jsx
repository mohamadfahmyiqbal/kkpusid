import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import {
  formatRupiah,
  parseRawNumber,
} from "../../../../utils/helper/formatRupiah";

const AmountInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const rawValue = parseRawNumber(e.target.value);
    // Simpan dalam format yang sudah ter-masking ke state
    onChange(formatRupiah(rawValue));
  };

  return (
    <Form.Group className="mb-4">
      <Form.Label
        className="small fw-bold text-muted text-uppercase"
        style={{ fontSize: "11px", letterSpacing: "0.5px" }}
      >
        Nominal Pencairan
      </Form.Label>
      <InputGroup
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <InputGroup.Text
          className="bg-light border-end-0 fw-bold text-primary px-3"
          style={{ border: "1px solid #E0E6ED" }}
        >
          Rp
        </InputGroup.Text>
        <Form.Control
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={value}
          onChange={handleChange}
          className="border-start-0 fw-bold text-primary py-2"
          style={{
            fontSize: "1.2rem",
            border: "1px solid #E0E6ED",
            outline: "none",
          }}
        />
      </InputGroup>
      <Form.Text className="text-muted" style={{ fontSize: "11px" }}>
        *Minimal penarikan Rp 10.000
      </Form.Text>
    </Form.Group>
  );
};

export default React.memo(AmountInput);
