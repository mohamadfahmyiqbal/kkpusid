import React from "react";
import { Form } from "react-bootstrap";

const CashDetails = ({ cashDetails, onChange }) => {
  const handleChange = (field, val) => {
    onChange({ ...cashDetails, [field]: val });
  };

  return (
    <div className="bg-light p-3 rounded-3 mb-3 border">
      <Form.Group className="mb-2">
        <Form.Label className="text-muted mb-0" style={{ fontSize: "10px" }}>
          NAMA PENERIMA
        </Form.Label>
        <Form.Control
          size="sm"
          type="text"
          value={cashDetails.cashName}
          onChange={(e) => handleChange("cashName", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="text-muted mb-0" style={{ fontSize: "10px" }}>
          LOKASI KANTOR
        </Form.Label>
        <Form.Control
          size="sm"
          type="text"
          value={cashDetails.cashLocation}
          onChange={(e) => handleChange("cashLocation", e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label className="text-muted mb-0" style={{ fontSize: "10px" }}>
          WAKTU TRANSAKSI
        </Form.Label>
        <Form.Control
          size="sm"
          type="text"
          value={cashDetails.cashTime}
          onChange={(e) => handleChange("cashTime", e.target.value)}
        />
      </Form.Group>
    </div>
  );
};

export default React.memo(CashDetails);
