import { Form, Row, Col, Image, CardTitle } from "react-bootstrap";

export default function StepForm({ config, values, onChange, previews }) {
  return (
    <>
      <CardTitle className="fw-bold mb-3">{config.title}</CardTitle>
      {config.fields.map((field, idx) => (
        <Form.Group as={Row} className="mb-2" key={idx}>
          <Form.Label column sm={2}>
            <b>{field.label}</b>
            {field.required && <span className="text-danger"> *</span>}
          </Form.Label>
          <Col>
            {field.as === "select" ? (
              <Form.Select
                value={values[field.name] || ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                isInvalid={field.required && !values[field.name]}
              >
                {field.options.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Form.Select>
            ) : (
              <Form.Control
                as={field.as || "input"}
                type={field.type || "text"}
                rows={field.rows}
                accept={field.accept}
                value={
                  field.type === "file" ? undefined : values[field.name] || ""
                }
                onChange={(e) =>
                  onChange(
                    field.name,
                    field.type === "file" ? e.target.files[0] : e.target.value
                  )
                }
                isInvalid={field.required && !values[field.name]}
                readOnly={field.name === "nama" || field.name === "no_tlp"}
              />
            )}
            <Form.Control.Feedback type="invalid">
              {field.label} wajib diisi.
            </Form.Control.Feedback>

            {field.name === "ktp" && previews.ktp && (
              <div className="mt-2">
                <Image
                  src={previews.ktp}
                  alt="Preview KTP"
                  thumbnail
                  style={{ maxWidth: "250px" }}
                />
              </div>
            )}
          </Col>
        </Form.Group>
      ))}
    </>
  );
}
