import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

export default function Step5Employment({ formData, handleChange, errors }) {
  return (
    <div className="p-2">
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaBriefcase />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Informasi Pekerjaan</h5>
          <small className="text-muted">
            Data pekerjaan atau usaha Anda saat ini
          </small>
        </div>
      </div>

      <div className="p-4 rounded-20 bg-light border-0">
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small mb-2">
            Pekerjaan <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-icon-wrapper">
            <FaBriefcase className="input-icon" />
            <Form.Control
              type="text"
              name="occupation"
              value={formData.occupation || ""}
              onChange={handleChange}
              isInvalid={!!errors.occupation}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Contoh: Pegawai Swasta, Wiraswasta"
            />
            <Form.Control.Feedback type="invalid">
              {errors.occupation}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small mb-2">
            Nama Perusahaan / Tempat Bekerja <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-icon-wrapper">
            <FaBuilding className="input-icon" />
            <Form.Control
              type="text"
              name="employer_name"
              value={formData.employer_name || ""}
              onChange={handleChange}
              isInvalid={!!errors.employer_name}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Contoh: PT ABC Sentosa"
            />
            <Form.Control.Feedback type="invalid">
              {errors.employer_name}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="fw-bold small mb-2">
            Alamat Perusahaan / Tempat Bekerja <span className="text-danger">*</span>
          </Form.Label>
          <div className="d-flex align-items-start">
            <FaMapMarkerAlt
              className="me-2 mt-2 text-muted"
              style={{ fontSize: "16px", flexShrink: 0 }}
            />
            <Form.Control
              as="textarea"
              rows={3}
              name="employer_address"
              value={formData.employer_address || ""}
              onChange={handleChange}
              isInvalid={!!errors.employer_address}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Masukkan Alamat Lengkap Tempat Bekerja"
            />
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.employer_address}
          </Form.Control.Feedback>
        </Form.Group>
      </div>
    </div>
  );
}