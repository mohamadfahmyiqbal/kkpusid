import React from "react";
import { Row, Col, Form, InputGroup } from "react-bootstrap";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

export default function TabPekerjaan({
  formData,
  isSubmitting,
  handleChange,
}) {
  return (
    <div>
      <div className="ap-section-header-box">
        <FaBriefcase className="ap-section-header-icon" />
        <div>
          <h6 className="fw-bold mb-0 text-dark">Informasi Pekerjaan</h6>
          <small className="text-muted">Data pekerjaan atau usaha anggota saat ini</small>
        </div>
      </div>

      <Row className="g-3 mb-3">
        <Col md={6}>
          <Form.Group controlId="formOccupation">
            <Form.Label className="small fw-semibold">Pekerjaan / Jabatan</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaBriefcase className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contoh: Karyawan Swasta, Wiraswasta, PNS"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                disabled={isSubmitting}
                className="ap-form-control"
              />
            </InputGroup>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formEmployerName">
            <Form.Label className="small fw-semibold">Nama Instansi / Perusahaan</Form.Label>
            <InputGroup>
              <InputGroup.Text className="bg-light">
                <FaBuilding className="text-muted" />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Contoh: PT Sumber Rezeki Makmur"
                name="employer_name"
                value={formData.employer_name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="ap-form-control"
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-2" controlId="formEmployerAddress">
        <Form.Label className="small fw-semibold">Alamat Tempat Bekerja / Usaha</Form.Label>
        <InputGroup>
          <InputGroup.Text className="bg-light">
            <FaMapMarkerAlt className="text-muted" />
          </InputGroup.Text>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Masukkan alamat lengkap kantor atau lokasi usaha"
            name="employer_address"
            value={formData.employer_address}
            onChange={handleChange}
            disabled={isSubmitting}
            className="ap-form-control"
          />
        </InputGroup>
      </Form.Group>
    </div>
  );
}
