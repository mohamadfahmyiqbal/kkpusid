import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import UAnggota from "../../utils/UAnggota";

export default function SelAnggota({ value, onChange }) {
  const [options, setOptions] = useState([]);

  const getOption = async () => {
    try {
      const res = await UAnggota.getAnggotaCategory();
      if (Array.isArray(res.data)) {
        const opts = res.data.map((rw) => ({
          value: rw.id,
          label: rw.nama,
        }));
        setOptions(opts);
      } else {
        setOptions([]);
      }
    } catch (error) {
      console.log(error);
      setOptions([]);
    }
  };

  useEffect(() => {
    getOption();
  }, []);

  return (
    <Form.Group as={Row} className="mb-1">
      <Form.Label column sm={2}>
        Pilih Jenis Anggota
      </Form.Label>
      <Col>
        <Form.Select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">-- Pilih Jenis Anggota --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Form.Group>
  );
}
