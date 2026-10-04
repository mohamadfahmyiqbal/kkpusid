import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { FaUserFriends, FaLink, FaPhone } from "react-icons/fa";

export default function TabKontakDarurat({
  formData,
  isSubmitting,
  handleChange,
}) {
  return (
    <div>
      <div className="ap-section-header-box">
        <FaUserFriends className="ap-section-header-icon" />
        <div>
          <h6 className="fw-bold mb-0 text-dark">Kontak Darurat</h6>
          <small className="text-muted">
            Kerabat atau pihak yang dapat dihubungi saat situasi darurat
          </small>
        </div>
      </div>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group controlId="formContactName">
            <Form.Label className="small fw-semibold">Nama Kontak Darurat</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaUserFriends className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Nama lengkap kerabat / penjamin"
                name="contact_name"
                value={formData.contact_name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="ap-form-control"
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formRelation">
            <Form.Label className="small fw-semibold">Hubungan / Relasi</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaLink className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contoh: Suami/Istri, Orang Tua, Saudara"
                name="relation"
                value={formData.relation}
                onChange={handleChange}
                disabled={isSubmitting}
                className="ap-form-control"
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2" controlId="formPhoneEmergency">
        <Form.Label className="small fw-semibold">Nomor Telepon Darurat</Form.Label>
        <InputGroup>
          <InputGroup.Text className="bg-light">
            <FaPhone className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            type="tel"
            placeholder="Contoh: 08123456789"
            name="phone_number_emergency"
            value={formData.phone_number_emergency}
            onChange={handleChange}
            disabled={isSubmitting}
            className="ap-form-control"
          />
        </InputGroup>
      </Form.Group>
    </div>
  );
}
