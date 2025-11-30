// src/components/anggota/regsitrationForm/steps/Step5BankData.jsx

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function Step5BankData({ formData, handleChange }) {
  return (
    <>
      <Row>
        <Form.Group as={Col} md="6" className="mb-3">
          <Form.Label>Nama Bank</Form.Label>
          <Form.Control
            type="text"
            name="namaBank"
            value={formData.namaBank || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3">
          <Form.Label>Nomor Rekening</Form.Label>
          <Form.Control
            type="text"
            name="noRek"
            value={formData.noRek || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Nama Pemilik Rekening</Form.Label>
        <Form.Control
          type="text"
          name="namaPemilikRekening"
          value={formData.namaPemilikRekening || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>
    </>
  );
}
