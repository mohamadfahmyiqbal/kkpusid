// src/components/anggota/regsitrationForm/steps/Step1PersonalData.jsx (FINAL)

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

/**
 * Komponen untuk mengisi Data Diri (Langkah 1).
 * Menerima props: formData, handleChange, errors.
 */
export default function Step1PersonalData({ formData, handleChange, errors }) {
  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Informasi Data Diri Dasar</h5>

      {/* 1. NIK (nik_ktp) */}
      <Form.Group as={Row} className="mb-3" controlId="formNikKtp">
        {" "}
        {/* controlId diubah */}
        <Form.Label column sm="3">
          Nomor Induk Kependudukan (NIK) <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="nik_ktp" // ✅ Diubah dari nik
            placeholder="Masukkan NIK 16 Digit"
            value={formData.nik_ktp || ""} // ✅ Diubah dari nik
            onChange={handleChange}
            isInvalid={!!errors.nik_ktp} // ✅ Diubah dari nik
            maxLength={16}
          />
          <Form.Control.Feedback type="invalid">
            {errors.nik_ktp} // ✅ Diubah dari nik
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 2. NAMA LENGKAP (full_name) */}
      <Form.Group as={Row} className="mb-3" controlId="formFullName">
        <Form.Label column sm="3">
          Nama Lengkap <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            type="text"
            name="full_name"
            placeholder="Masukkan Nama Lengkap Sesuai KTP"
            value={formData.full_name || ""}
            onChange={handleChange}
            isInvalid={!!errors.full_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.full_name}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {/* 3. ALAMAT SESUAI KTP (alamat_ktp) */}
      <Form.Group as={Row} className="mb-3" controlId="formAlamatKtp">
        <Form.Label column sm="3">
          Alamat Sesuai KTP <span className="text-danger">*</span>
        </Form.Label>
        <Col sm="9">
          <Form.Control
            as="textarea"
            rows={3}
            name="alamat_ktp"
            placeholder="Masukkan Alamat Sesuai KTP"
            value={formData.alamat_ktp || ""}
            onChange={handleChange}
            isInvalid={!!errors.alamat_ktp}
          />
          <Form.Control.Feedback type="invalid">
            {errors.alamat_ktp}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </div>
  );
}
