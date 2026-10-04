import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import {
  FaUserTag,
  FaPhoneAlt,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import Select from "react-select";

/**
 * Komponen untuk mengisi Account Info (Langkah 2).
 * Dioptimasi dengan UI modern dan class global dari App.css.
 */
export default React.memo(function Step2Account({ formData, handleChange, errors }) {
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderRadius: "12px",
      border: state.isFocused ? "1px solid #86b7fe" : "none",
      boxShadow: state.isFocused ? "0 0 0 0.25rem rgba(13,110,253,.25)" : "0 .125rem .25rem rgba(0,0,0,.075)",
      padding: "2px",
      backgroundColor: "#fff",
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)",
    }),
  };

  const tipeAnggotaOptions = [
    { value: "5", label: "Anggota Reguler" },
    { value: "6", label: "Anggota Luar Biasa" },
  ];

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

      <div>
        <Row className="g-3 mb-3">
          {/* 1. TIPE ANGGOTA */}
          <Col md={6}>
            <Form.Group controlId="formTipeAnggota">
              <Form.Label className="fw-bold small mb-2">
                Tipe Anggota <span className="text-danger">*</span>
              </Form.Label>
              <Select
                classNamePrefix="rs"
                styles={selectStyles}
                options={tipeAnggotaOptions}
                placeholder="Pilih Tipe Anggota"
                onChange={(opt) => handleChange({ target: { name: 'tipeAnggota', value: opt ? opt.value : '' } })}
                value={tipeAnggotaOptions.find((o) => o.value === String(formData.tipeAnggota)) || null}
              />
              <Form.Control.Feedback type="invalid">
                {errors.tipeAnggota}
              </Form.Control.Feedback>
              <div className="mt-2 small text-muted d-flex align-items-center">
                <FaInfoCircle className="me-1 text-primary flex-shrink-0" />
                <span>
                  Anggota Luar Biasa untuk non-karyawan/mitra.
                </span>
              </div>
            </Form.Group>
          </Col>

          {/* 2. NOMOR HP */}
          <Col md={6}>
            <Form.Group controlId="formNoTlp">
              <Form.Label className="fw-bold small mb-2">
                No. WhatsApp/HP <span className="text-danger">*</span>
              </Form.Label>
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
              <small className="text-muted mt-2 d-block">
                Gunakan nomor yang terhubung dengan WhatsApp.
              </small>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3">
          {/* 3. EMAIL */}
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label className="fw-bold small mb-2">
                Alamat Email <span className="text-danger">*</span>
              </Form.Label>
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
              <small className="text-muted mt-2 d-block">
                Alamat email diambil dari akun registrasi Anda.
              </small>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
});
