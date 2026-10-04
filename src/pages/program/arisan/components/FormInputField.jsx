import React from "react";
import { Form } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const FormInputField = React.memo(
  ({
    label,
    value,
    name,
    type = "text",
    readOnly = false,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    icon: Icon,
  }) => (
    <Form.Group className="mb-4 custom-input-group">
      <Form.Label className="form-label d-flex align-items-center">
        {Icon && <Icon className="me-2 text-teal" size={14} />}
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        className={`custom-flat-input ${error ? "border-danger error-shake" : ""}`}
        isInvalid={!!error}
      />
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Form.Control.Feedback type="invalid" className="d-block mt-1">
              <small className="text-danger fw-bold">{error}</small>
            </Form.Control.Feedback>
          </motion.div>
        )}
      </AnimatePresence>
    </Form.Group>
  )
);

export default FormInputField;
