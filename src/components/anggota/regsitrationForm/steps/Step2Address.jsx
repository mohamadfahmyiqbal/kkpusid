// src/components/anggota/regsitrationForm/steps/Step2Address.jsx

import React from "react";
import { Form } from "react-bootstrap";

export default function Step2Address({ formData, handleChange }) {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Alamat Sesuai KTP</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="alamatKtp"
          value={formData.alamatKtp || ""}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Alamat Domisili (Jika Berbeda)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="alamatDomisili"
          value={formData.alamatDomisili || ""}
          onChange={handleChange}
        />
      </Form.Group>
    </>
  );
}
