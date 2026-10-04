import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaUserFriends, FaPhoneAlt, FaLink } from "react-icons/fa";

export default React.memo(function Step6EmergencyContact({ formData, handleChange, errors }) {
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

      <div>
        <Row className="g-3 mb-3">
          {/* NAMA KONTAK */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Nama Kontak Darurat <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaUserFriends size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="contact_name"
                  value={formData.contact_name || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.contact_name}
                  className="border-0 py-2"
                  placeholder="Nama Lengkap Kontak Darurat"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.contact_name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* NO HP KONTAK */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                No. HP Kontak Darurat <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaPhoneAlt size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  name="phone_number_emergency"
                  value={formData.phone_number_emergency || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.phone_number_emergency}
                  className="border-0 py-2"
                  placeholder="Contoh: 08123456789"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.phone_number_emergency}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3">
          {/* HUBUNGAN */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Hubungan dengan Anda <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaLink size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="relation"
                  value={formData.relation || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.relation}
                  className="border-0 py-2"
                  placeholder="Contoh: Saudara Kandung, Suami/Istri, Teman"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.relation}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
});