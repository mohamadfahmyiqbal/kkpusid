import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function BankInfoSection({ bank }) {
  const currentBank = bank?.[0];

  return (
    <section className="border-bottom mb-2">
      <h5 className="fw-bold border-bottom pb-2">Bank Info</h5>
      <Form.Group as={Row} controlId="formPlaintextBank">
        <Form.Label column xs="4" className="py-0">
          Bank
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={currentBank?.bank || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextNoRekening">
        <Form.Label column xs="4" className="py-0">
          No Rekening
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={currentBank?.no_rekening || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formPlaintextNamaNasabah">
        <Form.Label column xs="4" className="py-0">
          Nama Nasabah
        </Form.Label>
        <Col xs="8" className="d-flex justify-content-end py-0">
          <Form.Control
            as="textarea"
            plaintext
            readOnly
            defaultValue={currentBank?.nama_nasabah || "-"}
            className="text-end py-0"
          />
        </Col>
      </Form.Group>
    </section>
  );
}
