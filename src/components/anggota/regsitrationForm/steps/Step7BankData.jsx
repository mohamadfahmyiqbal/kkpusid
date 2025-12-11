// src/components/anggota/regsitrationForm/steps/Step7BankData.jsx (FINAL KOREKSI)

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

/**
 * Komponen untuk mengisi Data Bank (Langkah 7).
 * Menerima props: formData, handleChange, errors.
 */
export default function Step7BankData({ formData, handleChange, errors }) {
  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Informasi Rekening Bank</h5>
      <Row>
        {/* 1. NAMA BANK (bank_name) */}
        <Form.Group as={Col} md="6" className="mb-3" controlId="formBankName">
          <Form.Label>
            Nama Bank <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="bank_name"
            placeholder="Contoh: Bank Mandiri"
            value={formData.bank_name || ""}
            onChange={handleChange}
            isInvalid={!!errors.bank_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bank_name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* 2. NOMOR REKENING (bank_account_no) */}
        <Form.Group
          as={Col}
          md="6"
          className="mb-3"
          controlId="formBankAccountNo"
        >
          <Form.Label>
            Nomor Rekening <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="bank_account_no" // ✅ KOREKSI: Sinkron dengan DB
            placeholder="Masukkan Nomor Rekening"
            value={formData.bank_account_no || ""} // ✅ KOREKSI
            onChange={handleChange}
            isInvalid={!!errors.bank_account_no} // ✅ KOREKSI
          />
          <Form.Control.Feedback type="invalid">
            {errors.bank_account_no}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      {/* 3. NAMA PEMILIK REKENING (account_holder) */}
      <Form.Group className="mb-3" controlId="formAccountHolder">
        <Form.Label>
          Nama Pemilik Rekening <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="account_holder" // ✅ KOREKSI: Sinkron dengan DB
          placeholder="Nama Pemilik Rekening Sesuai Buku Tabungan"
          value={formData.account_holder || ""} // ✅ KOREKSI
          onChange={handleChange}
          isInvalid={!!errors.account_holder} // ✅ KOREKSI
        />
        <Form.Control.Feedback type="invalid">
          {errors.account_holder}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
}