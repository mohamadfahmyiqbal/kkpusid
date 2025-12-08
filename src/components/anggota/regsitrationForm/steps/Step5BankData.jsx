// src/components/anggota/regsitrationForm/steps/Step5BankData.jsx

import React from "react";
import { Form, Row, Col } from "react-bootstrap";

/**
 * Komponen untuk mengisi Data Bank (Langkah 5).
 * Menerima props: formData, handleChange, errors.
 */
export default function Step5BankData({ formData, handleChange, errors }) {
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
            value={formData.bank_name || ""}
            onChange={handleChange}
            isInvalid={!!errors.bank_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bank_name}
          </Form.Control.Feedback>
        </Form.Group>

        {/* 2. NOMOR REKENING (account_number) */}
        <Form.Group
          as={Col}
          md="6"
          className="mb-3"
          controlId="formAccountNumber"
        >
          <Form.Label>
            Nomor Rekening <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            name="account_number"
            value={formData.account_number || ""}
            onChange={handleChange}
            isInvalid={!!errors.account_number}
          />
          <Form.Control.Feedback type="invalid">
            {errors.account_number}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      {/* 3. NAMA PEMILIK REKENING (account_holder_name) */}
      <Form.Group className="mb-3" controlId="formAccountHolderName">
        <Form.Label>
          Nama Pemilik Rekening <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          type="text"
          name="account_holder_name"
          value={formData.account_holder_name || ""}
          onChange={handleChange}
          isInvalid={!!errors.account_holder_name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.account_holder_name}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
}
