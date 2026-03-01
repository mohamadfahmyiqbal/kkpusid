import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  FaUniversity,
  FaCreditCard,
  FaUserCheck,
  FaInfoCircle,
} from "react-icons/fa";

/**
 * Komponen untuk mengisi Data Bank (Langkah 5).
 * Dioptimasi dengan UI modern dan class global dari App.css.
 */
export default function Step5BankData({ formData, handleChange, errors }) {
  return (
    <div className="p-2">
      {/* HEADER SEKSI */}
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaUniversity />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Informasi Rekening Bank</h5>
          <small className="text-muted">
            Data ini digunakan untuk keperluan pencairan simpanan atau dana
          </small>
        </div>
      </div>

      <div className="p-4 rounded-20 bg-light border-0">
        <Row>
          {/* 1. NAMA BANK */}
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formBankName">
              <Form.Label className="fw-bold small mb-2">
                Nama Bank <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaUniversity size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="bank_name"
                  placeholder="Contoh: BCA, Mandiri, BRI"
                  value={formData.bank_name || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.bank_name}
                  className="border-0 py-2"
                />
              </InputGroup>
              {!!errors.bank_name && (
                <small className="text-danger mt-1 d-block">
                  {errors.bank_name}
                </small>
              )}
            </Form.Group>
          </Col>

          {/* 2. NOMOR REKENING */}
          <Col md={6}>
            <Form.Group className="mb-4" controlId="formAccountNumber">
              <Form.Label className="fw-bold small mb-2">
                Nomor Rekening <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaCreditCard size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="account_number"
                  placeholder="Masukkan nomor rekening"
                  value={formData.account_number || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.account_number}
                  className="border-0 py-2"
                />
              </InputGroup>
              {!!errors.account_number && (
                <small className="text-danger mt-1 d-block">
                  {errors.account_number}
                </small>
              )}
            </Form.Group>
          </Col>
        </Row>

        {/* 3. NAMA PEMILIK REKENING */}
        <Form.Group className="mb-2" controlId="formAccountHolderName">
          <Form.Label className="fw-bold small mb-2">
            Nama Pemilik Rekening <span className="text-danger">*</span>
          </Form.Label>
          <InputGroup className="shadow-sm rounded-12 overflow-hidden">
            <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
              <FaUserCheck size={14} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              name="account_holder_name"
              placeholder="Nama sesuai buku tabungan"
              value={formData.account_holder_name || ""}
              onChange={handleChange}
              isInvalid={!!errors.account_holder_name}
              className="border-0 py-2"
            />
          </InputGroup>
          {!!errors.account_holder_name && (
            <small className="text-danger mt-1 d-block">
              {errors.account_holder_name}
            </small>
          )}

          <div className="mt-3 p-3 rounded-12 bg-white border-0 shadow-sm d-flex align-items-center">
            <FaInfoCircle className="text-primary me-2" />
            <span className="small text-muted">
              Pastikan nama pemilik rekening{" "}
              <strong>sama dengan nama pendaftar</strong> untuk mempercepat
              proses verifikasi.
            </span>
          </div>
        </Form.Group>
      </div>
    </div>
  );
}
