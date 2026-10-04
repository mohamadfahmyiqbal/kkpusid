import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function JobInfoSection({ job }) {
  const currentJob = job?.[0];

  return (
    <section className="border-bottom mb-2">
      <h5 className="fw-bold border-bottom pb-2">Job Info</h5>
      <Form.Group as={Row} controlId="formPlaintextPekerjaan">
        <Form.Label column xs="4" className="py-0">
          Pekerjaan
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={currentJob?.pekerjaan || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextTempatKerja">
        <Form.Label column xs="4" className="py-0">
          Tempat Kerja
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={currentJob?.tempat_kerja || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextAlamatKerja">
        <Form.Label column xs="4" className="py-0">
          Alamat
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={currentJob?.alamat_kerja || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>
    </section>
  );
}
