import React from "react";
import { Row, Col, Image } from "react-bootstrap";

export default function PhotoInfoSection({ ktpImg, fotoImg }) {
  return (
    <section className="border-bottom mb-2">
      <h5 className="fw-bold pb-2">Foto Info</h5>
      <Row>
        <Col xs={6}>
          <strong>KTP</strong>
          {ktpImg ? (
            <Image
              src={ktpImg}
              alt="Foto KTP"
              rounded
              fluid
              className="d-block mx-auto mt-2 w-100"
            />
          ) : (
            <div>-</div>
          )}
        </Col>
        <Col xs={6}>
          <strong>Foto Anggota</strong>
          {fotoImg ? (
            <Image
              src={fotoImg}
              alt="Foto Anggota"
              rounded
              fluid
              className="d-block mx-auto mt-2 w-100"
            />
          ) : (
            <div>-</div>
          )}
        </Col>
      </Row>
    </section>
  );
}
