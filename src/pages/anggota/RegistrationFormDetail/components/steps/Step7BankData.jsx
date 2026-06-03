import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaUniversity, FaCreditCard, FaUserCircle } from "react-icons/fa";

export default function Step7BankData({ formData, handleChange, errors }) {
  return (
    <div className="p-2">
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaUniversity />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Informasi Rekening Bank</h5>
          <small className="text-muted">
            Data rekening untuk transaksi keuangan koperasi
          </small>
        </div>
      </div>

      <div className="p-4 rounded-20 bg-light border-0">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold small mb-2">
                Nama Bank <span className="text-danger">*</span>
              </Form.Label>
              <div className="input-icon-wrapper">
                <FaUniversity className="input-icon" />
                <Form.Control
                  type="text"
                  name="bank_name"
                  value={formData.bank_name || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.bank_name}
                  className="rounded-12 border-0 shadow-sm py-2"
                  placeholder="Contoh: Bank Mandiri"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bank_name}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold small mb-2">
                Nomor Rekening <span className="text-danger">*</span>
              </Form.Label>
              <div className="input-icon-wrapper">
                <FaCreditCard className="input-icon" />
                <Form.Control
                  type="text"
                  name="bank_account_no"
                  value={formData.bank_account_no || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.bank_account_no}
                  className="rounded-12 border-0 shadow-sm py-2"
                  placeholder="Masukkan Nomor Rekening"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.bank_account_no}
                </Form.Control.Feedback>
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-2">
          <Form.Label className="fw-bold small mb-2">
            Nama Pemilik Rekening <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-icon-wrapper">
            <FaUserCircle className="input-icon" />
            <Form.Control
              type="text"
              name="account_holder"
              value={formData.account_holder || ""}
              onChange={handleChange}
              isInvalid={!!errors.account_holder}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Nama Pemilik Rekening Sesuai Buku Tabungan"
            />
            <Form.Control.Feedback type="invalid">
              {errors.account_holder}
            </Form.Control.Feedback>
          </div>
          <small className="text-muted mt-1 d-block">
            Pastikan nama pemilik sesuai dengan identitas KTP.
          </small>
        </Form.Group>
      </div>
    </div>
  );
}