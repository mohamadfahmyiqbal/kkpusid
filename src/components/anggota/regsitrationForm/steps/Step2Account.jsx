// src/components/anggota/regsitrationForm/steps/Step2Account.jsx

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

/**
 * Komponen untuk mengisi Account Info (Langkah 2).
 * Berisi Tipe Anggota, No HP, dan Email.
 * Menerima props: formData, handleChange, errors.
 */
export default function Step2Account({ formData, handleChange, errors }) {
  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Informasi Akun (Account Info)</h5>

      {/* 1. TIPE ANGGOTA (tipeAnggota) */}
      <Form.Group as={Row} className="mb-3" controlId="formTipeAnggota">
        <Form.Label column sm="3">
          Tipe Anggota <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Select
            name="tipeAnggota"
            value={formData.tipeAnggota || ""}
            onChange={handleChange}
            isInvalid={!!errors.tipeAnggota}
          >
            <option value="">Pilih Tipe Anggota</option>
            <option value="2">Anggota Reguler</option>
            <option value="3">Anggota Luar Biasa</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.tipeAnggota}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 2. NOMOR HP (phone_number) */}
      <Form.Group as={Row} className="mb-3" controlId="formNoTlp">
        <Form.Label column sm="3">
          No. HP <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="tel"
            name="phone_number"
            placeholder="Contoh: 08123456789"
            value={formData.phone_number || ""}
            onChange={handleChange}
            isInvalid={!!errors.phone_number}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone_number}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 3. EMAIL (email) */}
      <Form.Group as={Row} className="mb-3" controlId="formEmail">
        <Form.Label column sm="3">
          Email <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="email"
            name="email"
            placeholder="contoh@domain.com"
            value={formData.email || ""}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </div>
  );
}
