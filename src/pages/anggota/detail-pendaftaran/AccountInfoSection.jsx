import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function AccountInfoSection({ categoryName, noTlp, email }) {
  return (
    <section className="border-bottom mb-2">
      <h5 className="fw-bold border-bottom pb-2">Account Info</h5>
      <Form.Group as={Row} controlId="formPlaintextTipe">
        <Form.Label column xs="4" className="py-0">
          Tipe Anggota
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={categoryName || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextNoHP">
        <Form.Label column xs="4" className="py-0">
          No HP
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={noTlp || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Form.Label column xs="4" className="py-0">
          Email
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={email || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>
    </section>
  );
}
