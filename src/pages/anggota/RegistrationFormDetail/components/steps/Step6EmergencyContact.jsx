import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaUserFriends, FaPhoneAlt, FaLink } from "react-icons/fa";

export default function Step6EmergencyContact({ formData, handleChange, errors }) {
  return (
    <div className="p-2">
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaUserFriends />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Kontak Darurat</h5>
          <small className="text-muted">
            Informasi yang dapat dihubungi dalam situasi darurat
          </small>
        </div>
      </div>

      <div className="p-4 rounded-20 bg-light border-0">
        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small mb-2">
            Nama Kontak Darurat <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-icon-wrapper">
            <FaUserFriends className="input-icon" />
            <Form.Control
              type="text"
              name="contact_name"
              value={formData.contact_name || ""}
              onChange={handleChange}
              isInvalid={!!errors.contact_name}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Nama Lengkap Kontak Darurat"
            />
            <Form.Control.Feedback type="invalid">
              {errors.contact_name}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-bold small mb-2">
            No. HP Kontak Darurat <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-icon-wrapper">
            <FaPhoneAlt className="input-icon" />
            <Form.Control
              type="tel"
              name="phone_number_emergency"
              value={formData.phone_number_emergency || ""}
              onChange={handleChange}
              isInvalid={!!errors.phone_number_emergency}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Contoh: 08123456789"
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone_number_emergency}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label className="fw-bold small mb-2">
            Hubungan dengan Anda <span className="text-danger">*</span>
          </Form.Label>
          <div className="input-icon-wrapper">
            <FaLink className="input-icon" />
            <Form.Control
              type="text"
              name="relation"
              value={formData.relation || ""}
              onChange={handleChange}
              isInvalid={!!errors.relation}
              className="rounded-12 border-0 shadow-sm py-2"
              placeholder="Contoh: Saudara Kandung, Suami/Istri, Teman"
            />
            <Form.Control.Feedback type="invalid">
              {errors.relation}
            </Form.Control.Feedback>
          </div>
        </Form.Group>
      </div>
    </div>
  );
}