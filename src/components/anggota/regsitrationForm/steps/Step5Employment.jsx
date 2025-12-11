// src/components/anggota/regsitrationForm/steps/Step5Employment.jsx (BARU)

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

/**
 * Komponen untuk mengisi Data Pekerjaan (Langkah 5 BARU).
 * Menerima props: formData, handleChange, errors.
 */
export default function Step5Employment({ formData, handleChange, errors }) {
  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Informasi Data Pekerjaan</h5>
      
      {/* 1. PEKERJAAN (occupation) */}
      <Form.Group as={Row} className="mb-3" controlId="formOccupation">
        <Form.Label column sm="3">
          Pekerjaan <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="occupation"
            placeholder="Contoh: Pegawai Swasta, Wiraswasta"
            value={formData.occupation || ""}
            onChange={handleChange}
            isInvalid={!!errors.occupation}
          />
          <Form.Control.Feedback type="invalid">
            {errors.occupation}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 2. NAMA PERUSAHAAN/USAHA (employer_name) */}
      <Form.Group as={Row} className="mb-3" controlId="formEmployerName">
        <Form.Label column sm="3">
          Nama Tempat Bekerja <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="employer_name"
            placeholder="Contoh: PT ABC Sentosa"
            value={formData.employer_name || ""}
            onChange={handleChange}
            isInvalid={!!errors.employer_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.employer_name}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 3. ALAMAT PERUSAHAAN/USAHA (employer_address) */}
      <Form.Group as={Row} className="mb-3" controlId="formEmployerAddress">
        <Form.Label column sm="3">
          Alamat Tempat Bekerja <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="textarea"
            rows={3}
            name="employer_address"
            placeholder="Masukkan Alamat Tempat Bekerja"
            value={formData.employer_address || ""}
            onChange={handleChange}
            isInvalid={!!errors.employer_address}
          />
          <Form.Control.Feedback type="invalid">
            {errors.employer_address}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </div>
  );
}