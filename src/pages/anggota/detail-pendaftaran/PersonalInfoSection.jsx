import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function PersonalInfoSection({ detail, nama }) {
  return (
    <section className="border-bottom mb-2">
      <h5 className="fw-bold border-bottom pb-2">Personal Info</h5>
      <Form.Group as={Row} controlId="formPlaintextNIK">
        <Form.Label column xs="2">
          NIK
        </Form.Label>
        <Col xs="10" className="d-flex justify-content-end">
          <Form.Control
            plaintext
            readOnly
            defaultValue={detail?.nik || "-"}
            className="text-end"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextNama">
        <Form.Label column xs="2">
          Nama
        </Form.Label>
        <Col xs="10" className="d-flex justify-content-end">
          <Form.Control
            plaintext
            readOnly
            defaultValue={nama || "-"}
            className="text-end"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextAlamat">
        <Form.Label column xs="2">
          Alamat
        </Form.Label>
        <Col xs="10" className="d-flex justify-content-end">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={detail?.alamat || "-"}
            className="text-end"
          />
        </Col>
      </Form.Group>
    </section>
  );
}
