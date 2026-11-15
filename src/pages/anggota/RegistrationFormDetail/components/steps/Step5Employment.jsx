import React from "react";
import { Form, Row, Col, InputGroup } from "react-bootstrap";
import { FaBriefcase, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

export default React.memo(function Step5Employment({ formData, handleChange, errors }) {
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

      <div>
        <Row className="g-3 mb-3">
          {/* PEKERJAAN */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Pekerjaan <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaBriefcase size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="occupation"
                  value={formData.occupation || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.occupation}
                  className="border-0 py-2"
                  placeholder="Contoh: Pegawai Swasta, Wiraswasta"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.occupation}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>

          {/* NAMA PERUSAHAAN */}
          <Col md={6}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Nama Perusahaan / Tempat Bekerja <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden">
                <InputGroup.Text className="bg-white border-0 py-2 ps-3 text-muted">
                  <FaBuilding size={14} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="employer_name"
                  value={formData.employer_name || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.employer_name}
                  className="border-0 py-2"
                  placeholder="Contoh: PT ABC Sentosa"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.employer_name}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>

        <Row className="g-3">
          {/* ALAMAT PERUSAHAAN */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label className="fw-bold small mb-2">
                Alamat Perusahaan / Tempat Bekerja <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup className="shadow-sm rounded-12 overflow-hidden align-items-start">
                <InputGroup.Text className="bg-white border-0 py-3 ps-3 text-muted h-100">
                  <FaMapMarkerAlt size={14} />
                </InputGroup.Text>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="employer_address"
                  value={formData.employer_address || ""}
                  onChange={handleChange}
                  isInvalid={!!errors.employer_address}
                  className="border-0 py-3 pe-4"
                  placeholder="Masukkan Alamat Lengkap Tempat Bekerja"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.employer_address}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </div>
    </div>
  );
});