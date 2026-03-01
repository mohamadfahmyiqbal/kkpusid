// src/components/anggota/regsitrationForm/steps/Step6EmergencyContact.jsx (BARU)

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

/**
 * Komponen untuk mengisi Data Kontak Darurat (Langkah 6 BARU).
 * Menerima props: formData, handleChange, errors.
 */
export default function Step6EmergencyContact({ formData, handleChange, errors }) {
  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Informasi Kontak Darurat</h5>
      
      {/* 1. NAMA KONTAK DARURAT (contact_name) */}
      <Form.Group as={Row} className="mb-3" controlId="formContactName">
        <Form.Label column sm="3">
          Nama Kontak Darurat <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="contact_name"
            placeholder="Nama Lengkap Kontak Darurat"
            value={formData.contact_name || ""}
            onChange={handleChange}
            isInvalid={!!errors.contact_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.contact_name}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 2. NO. HP (phone_number_emergency) */}
      <Form.Group as={Row} className="mb-3" controlId="formEmergencyPhone">
        <Form.Label column sm="3">
          No. HP Kontak Darurat <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="tel"
            name="phone_number_emergency" // 🚨 Menggunakan nama berbeda agar tidak bentrok dengan phone_number anggota
            placeholder="Contoh: 08123456789"
            value={formData.phone_number_emergency || ""}
            onChange={handleChange}
            isInvalid={!!errors.phone_number_emergency}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone_number_emergency}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 3. HUBUNGAN (relation) */}
      <Form.Group as={Row} className="mb-3" controlId="formRelation">
        <Form.Label column sm="3">
          Hubungan <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="relation"
            placeholder="Contoh: Saudara Kandung, Suami/Istri"
            value={formData.relation || ""}
            onChange={handleChange}
            isInvalid={!!errors.relation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.relation}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </div>
  );
}