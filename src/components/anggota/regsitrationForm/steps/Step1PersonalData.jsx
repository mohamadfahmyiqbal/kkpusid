// src/components/anggota/regsitrationForm/steps/Step1PersonalData.jsx

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

export default function Step1PersonalData({ formData, handleChange }) {
  return (
    <>
      <Row>
        <Form.Group as={Col} md="6" className="mb-3">
          <Form.Label>Nama Lengkap</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={formData.nama || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3">
          <Form.Label>Nomor KTP</Form.Label>
          <Form.Control
            type="text"
            name="ktp"
            value={formData.ktp || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} md="6" className="mb-3">
          <Form.Label>Pekerjaan</Form.Label>
          <Form.Control
            type="text"
            name="pekerjaan"
            value={formData.pekerjaan || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="6" className="mb-3">
          <Form.Label>Tanggal Lahir</Form.Label>
          <Form.Control
            type="date"
            name="tglLahir"
            value={formData.tglLahir || ""}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>
    </>
  );
}
