import React from "react";
import { Form } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { NumericFormat } from "react-number-format";

export default function FormInputField({
  label,
  value,
  name,
  type = "text",
  readOnly = false,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  info = "",
  icon: Icon,
}) {
  return (
    <Form.Group className="mb-3 custom-input-group">
      <Form.Label className="small mb-1 text-muted d-flex align-items-center justify-content-between font-outfit">
        <span>
          {label}
          {required && <span className="text-danger ms-1">*</span>}
        </span>
        {info && (
          <small className="text-teal cursor-pointer" title={info}>
            <FaInfoCircle />
          </small>
        )}
      </Form.Label>
      <div className="position-relative">
        {Icon && (
          <div className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
            <Icon size={16} />
          </div>
        )}
        {type === "currency" ? (
          <NumericFormat
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            value={value}
            onValueChange={(values) => {
              onChange({ target: { name, value: values.value } });
            }}
            customInput={Form.Control}
            className={`custom-flat-input ${Icon ? "has-icon" : ""} ${
              error ? "border-danger error-shake" : ""
            }`}
            isInvalid={!!error}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        ) : (
          <Form.Control
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            readOnly={readOnly}
            onChange={onChange}
            className={`custom-flat-input ${Icon ? "has-icon" : ""} ${
              error ? "border-danger error-shake" : ""
            }`}
            isInvalid={!!error}
          />
        )}
      </div>
      {error && (
        <Form.Control.Feedback type="invalid" className="d-block mt-1 ps-1">
          <small className="text-danger">{error}</small>
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
