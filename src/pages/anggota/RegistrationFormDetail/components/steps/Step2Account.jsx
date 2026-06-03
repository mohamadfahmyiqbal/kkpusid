import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  FaUserTag,
  FaPhoneAlt,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";

/**
 * Komponen untuk mengisi Account Info (Langkah 2).
 * Dioptimasi dengan UI modern dan class global dari App.css.
 */
export default function Step2Account({ formData, handleChange, errors }) {
  return (
    <div className="p-2">
      {/* HEADER SEKSI */}
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaUserTag />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Informasi Akun</h5>
          <small className="text-muted">
            Tentukan tipe keanggotaan dan kontak aktif Anda
          </small>
        </div>
      </div>

      <div className="p-4 rounded-20 bg-light border-0">
        {/* 1. TIPE ANGGOTA */}
        <Form.Group as={Row} className="mb-4" controlId="formTipeAnggota">
          <Form.Label column sm="3" className="fw-bold small">
            Tipe Anggota <span className="text-danger">*</span>
          </Form.Label>
          <Col sm="9">
            <Form.Select
              name="tipeAnggota"
              value={formData.tipeAnggota || ""}
              onChange={handleChange}
              isInvalid={!!errors.tipeAnggota}
              className="rounded-12 border-0 shadow-sm py-2"
            >
              <option value="">Pilih Tipe Anggota</option>
              <option value="5">Anggota Reguler</option>
              <option value="6">Anggota Luar Biasa</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.tipeAnggota}
            </Form.Control.Feedback>
            <div className="mt-2 small text-muted d-flex align-items-center">
              <FaInfoCircle className="me-1 text-primary" />
              <span>
                Anggota Luar Biasa diperuntukkan bagi non-karyawan/mitra.
              </span>
            </div>
          </Col>
        </Form.Group>

        {/* 2. NOMOR HP */}
        <Form.Group as={Row} className="mb-4" controlId="formNoTlp">
          <Form.Label column sm="3" className="fw-bold small">
            No. WhatsApp/HP <span className="text-danger">*</span>
          </Form.Label>
          <Col sm="9">
            <InputGroup className="shadow-sm rounded-12 overflow-hidden">
              <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                <FaPhoneAlt size={14} />
              </InputGroup.Text>
              <Form.Control
                type="tel"
                name="phone_number"
                placeholder="Contoh: 08123456789"
                value={formData.phone_number || ""}
                onChange={handleChange}
                isInvalid={!!errors.phone_number}
                className="border-0 py-2"
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.phone_number}
              </Form.Control.Feedback>
            </InputGroup>
            <small className="text-muted mt-1 d-block">
              Gunakan nomor yang terhubung dengan WhatsApp.
            </small>
          </Col>
        </Form.Group>

        {/* 3. EMAIL */}
        <Form.Group as={Row} className="mb-2" controlId="formEmail">
          <Form.Label column sm="3" className="fw-bold small">
            Alamat Email <span className="text-danger">*</span>
          </Form.Label>
          <Col sm="9">
            <InputGroup className="shadow-sm rounded-12 overflow-hidden">
              <InputGroup.Text className="bg-light border-0 py-2 ps-3 text-muted">
                <FaEnvelope size={14} />
              </InputGroup.Text>
              <Form.Control
                type="email"
                name="email"
                placeholder="nama@domain.com"
                value={formData.email || ""}
                onChange={handleChange}
                isInvalid={!!errors.email}
                className="border-0 py-2 bg-light text-muted"
                disabled
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
            <small className="text-muted mt-1 d-block">
              Alamat email diambil dari akun registrasi Anda.
            </small>
          </Col>
        </Form.Group>
      </div>
    </div>
  );
}
