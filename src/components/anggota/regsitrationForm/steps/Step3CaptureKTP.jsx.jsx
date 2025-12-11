// src/components/anggota/regsitrationForm/steps/Step3CaptureKTP.jsx

import React, { useCallback } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import WebcamCaptureField from "../../../ui/WebcamCaptureField"; // Asumsi path ke komponen UI

/**
 * Komponen untuk mengambil foto KTP (Langkah 3).
 * Menerima props: formData, setFormData, errors.
 */
export default function Step3CaptureKTP({ formData, setFormData, errors }) {
  // Handler khusus untuk menyimpan hasil tangkapan gambar ke formData
  const handleSetCapturedImage = useCallback(
    (fieldName, base64Image) => {
      // fieldName di sini adalah 'foto_ktp'
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: base64Image,
      }));
    },
    [setFormData]
  );

  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Dokumentasi KTP</h5>

      <Alert variant="info" className="mb-4">
        Ambil foto **KTP terlihat jelas** dan tidak buram menggunakan kamera
        perangkat Anda. Pastikan pencahayaan cukup.
      </Alert>

      <Row>
        <Col md={12}>
          {/* Component yang menangani webcam dan tombol Ambil Ulang Foto */}
          <WebcamCaptureField
            fieldName="foto_ktp" // Field Name yang akan disimpan di formData (Sudah Benar)
            label="Foto Kartu Tanda Penduduk (KTP)"
            capturedImage={formData.foto_ktp}
            setCapturedImage={handleSetCapturedImage}
            isInvalid={!!errors.foto_ktp}
          />
          {!!errors.foto_ktp && (
            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
              {errors.foto_ktp}
            </Form.Control.Feedback>
          )}
        </Col>
      </Row>
    </div>
  );
}