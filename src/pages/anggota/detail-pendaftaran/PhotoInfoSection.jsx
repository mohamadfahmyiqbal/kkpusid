import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { getFotoSrc } from "../../../utils/fotoHelper";

export default function PhotoInfoSection({ ktpImg, fotoImg }) {
  // Normalisasi sumber gambar (base64 mentah / data URL / URL / path relatif)
  // agar foto dari API selalu dapat dirender sebagai src <img> yang valid.
  const ktpSrc = getFotoSrc(ktpImg, "");
  const fotoSrc = getFotoSrc(fotoImg, "");
  return (
    <section className="border-bottom mb-2">
      <h5 className="fw-bold pb-2">Foto Info</h5>
      <Row>
        <Col xs={6}>
          <strong>KTP</strong>
          {ktpSrc ? (
            <Image
              src={ktpSrc}
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
          {fotoSrc ? (
            <Image
              src={fotoSrc}
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
