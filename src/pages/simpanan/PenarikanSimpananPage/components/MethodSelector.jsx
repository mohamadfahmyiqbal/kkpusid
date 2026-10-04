// src/pages/simpanan/PenarikanSimpananPage/components/MethodSelector.jsx
import React from "react";
import { Form } from "react-bootstrap";

const MethodSelector = ({ value, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label
        className="small fw-bold text-muted text-uppercase"
        style={{ fontSize: "10px" }}
      >
        Metode Pencairan
      </Form.Label>
      <Form.Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="fw-bold text-primary"
        style={{ borderRadius: "10px", padding: "10px" }}
      >
        <option value="TRANSFER">Transfer Bank</option>
        <option value="TUNAI">Tunai / Ambil di Kantor</option>
      </Form.Select>
    </Form.Group>
  );
};

export default React.memo(MethodSelector);
