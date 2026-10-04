import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { FaUniversity, FaCreditCard, FaUserCircle } from "react-icons/fa";

export default function TabRekeningBank({
  formData,
  errors,
  isSubmitting,
  handleChange,
}) {
  return (
    <div>
      <div className="ap-section-header-box">
        <FaUniversity className="ap-section-header-icon" />
        <div>
          <h6 className="fw-bold mb-0 text-dark">Informasi Rekening Bank</h6>
          <small className="text-muted">
            Data rekening utama untuk transaksi penarikan simpanan dan pinjaman koperasi
          </small>
        </div>
      </div>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group controlId="formBankName">
            <Form.Label className="small fw-semibold">
              Nama Bank <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaUniversity className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contoh: BCA, Mandiri, BRI, BNI"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                isInvalid={!!errors.bank_name}
                disabled={isSubmitting}
                className="ap-form-control"
              />
            </InputGroup>
            {errors.bank_name && (
              <div className="text-danger small mt-1">{errors.bank_name}</div>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBankAccountNo">
            <Form.Label className="small fw-semibold">
              Nomor Rekening <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaCreditCard className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Masukkan nomor rekening"
                name="bank_account_no"
                value={formData.bank_account_no}
                onChange={handleChange}
                disabled={isSubmitting}
                className="ap-form-control font-monospace"
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Row className="g-3 mb-3">
        <Col md={12}>
          <Form.Group controlId="formAccountHolder">
            <Form.Label className="small fw-semibold">
              Nama Pemilik Rekening <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaUserCircle className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nama pemilik rekening sesuai buku tabungan"
                name="account_holder"
                value={formData.account_holder}
                onChange={handleChange}
                disabled={isSubmitting}
                className="ap-form-control"
              />
            </InputGroup>
            <Form.Text className="text-muted fs-8">
              Pastikan nama pemilik rekening sama dengan nama anggota terdaftar untuk mempercepat proses verifikasi.
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}
