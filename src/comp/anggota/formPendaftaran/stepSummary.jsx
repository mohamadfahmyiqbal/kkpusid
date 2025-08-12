import { CardTitle, Form, Image } from "react-bootstrap";

export default function StepSummary({ values, onChange, previews }) {
  return (
    <>
      <CardTitle className="fw-bold mb-3">Detail Pendaftaran Anggota</CardTitle>
      <ul className="list-group mb-3">
        {Object.entries(values).map(
          ([key, val]) =>
            key !== "foto_preview" && (
              <li className="list-group-item" key={key}>
                <b>{key}</b>: {val instanceof File ? val.name : val?.toString()}
              </li>
            )
        )}
      </ul>
      {previews.ktp && (
        <div className="mb-3">
          <b>Preview KTP:</b>
          <Image src={previews.ktp} thumbnail style={{ maxWidth: "250px" }} />
        </div>
      )}
      {previews.foto && (
        <div className="mb-3">
          <b>Foto Selfie:</b>
          <Image src={previews.foto} thumbnail style={{ maxWidth: "250px" }} />
        </div>
      )}
      <Form.Check
        type="checkbox"
        id="komitmen"
        label="Saya siap berkomitmen belajar muamalah syariah dan meninggalkan transaksi riba."
        checked={values.komitmen || false}
        onChange={(e) => onChange("komitmen", e.target.checked)}
      />
    </>
  );
}
