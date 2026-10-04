import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaUniversity, FaCreditCard, FaUserCircle } from "react-icons/fa";

export default React.memo(function Step7BankData({ formData, handleChange, errors }) {
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

      <div>
        <Row className="g-3 mb-3">
          <Col md={6}>
            <Form.Group>
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
                  value={formData.bank_name || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.bank_name}
                  className="border-0 py-2"
                  placeholder="Contoh: Bank Mandiri"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.bank_name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Nomor Rekening <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaCreditCard size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="bank_account_no"
                  value={formData.bank_account_no || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.bank_account_no}
                  className="border-0 py-2"
                  placeholder="Masukkan Nomor Rekening"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.bank_account_no}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Nama Pemilik Rekening <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaUserCircle size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="account_holder"
                  value={formData.account_holder || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.account_holder}
                  className="border-0 py-2"
                  placeholder="Nama Pemilik Rekening Sesuai Buku Tabungan"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.account_holder}
                </Form.Control.Feedback>
              </InputGroup>
              <small className="text-muted mt-2 d-block">
                Pastikan nama pemilik sesuai dengan identitas KTP.
              </small>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
});