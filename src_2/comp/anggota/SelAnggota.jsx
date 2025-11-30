import { useEffect, useState, useCallback } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import UAnggota from "../../utils/UAnggota";

export default function SelAnggota({ value, onChange }) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getOptions = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await UAnggota.getAnggotaCategory();

      if (!Array.isArray(res?.data) || res.data.length === 0) {
        setOptions([]);
        setError("Tidak ada data anggota ditemukan.");
        return;
      }

      const opts = res.data.map(({ id, nama }) => ({
        value: id,
        label: nama,
      }));

      setOptions(opts);
    } catch (err) {
      console.error("Gagal memuat data anggota:", err);
      setError("Gagal memuat data anggota. Silakan coba lagi nanti.");
      setOptions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <Form.Group as={Row} className="mb-2 align-items-center">
      <Form.Label column xs={4} md={2} lg={2}>
        Jenis Anggota
      </Form.Label>
      <Col xs={8} md={10} lg={10}>
        <Form.Select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={loading || options.length === 0}
        >
          <option value="">
            {loading
              ? "Memuat data..."
              : options.length === 0
              ? "-- Tidak ada data --"
              : "-- Pilih Jenis Anggota --"}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>

        {/* Status Dinamis */}
        {loading && (
          <div
            className="mt-1 text-muted d-flex align-items-center"
            style={{ fontSize: "0.9rem" }}
          >
            <Spinner animation="border" size="sm" className="me-2" /> Memuat
            data...
          </div>
        )}

        {error && !loading && (
          <div className="mt-1 text-danger" style={{ fontSize: "0.9rem" }}>
            ⚠️ {error}
          </div>
        )}
      </Col>
    </Form.Group>
  );
}
