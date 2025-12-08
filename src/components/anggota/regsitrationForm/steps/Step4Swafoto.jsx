// src/components/anggota/regsitrationForm/steps/Step4Swafoto.jsx

import React, { useCallback } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import WebcamCaptureField from "../../../ui/WebcamCaptureField"; // Asumsi path ke komponen UI

/**
 * Komponen untuk mengunggah atau mengambil Swafoto (Langkah 4).
 * Menerima props: formData, setFormData, errors.
 */
export default function Step4Swafoto({ formData, setFormData, errors }) {
  // Handler khusus untuk menyimpan hasil tangkapan gambar
  const handleSetCapturedImage = useCallback(
    (fieldName, base64Image) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: base64Image,
      }));
    },
    [setFormData]
  );

  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Dokumentasi Swafoto (Selfie)</h5>
      <Alert variant="warning" className="mb-4">
        Lakukan **swafoto sambil memegang KTP** di depan dada untuk verifikasi
        identitas. Wajah dan KTP harus terlihat jelas.
      </Alert>
      <Row>
        <Col md={12}>
          <WebcamCaptureField
            fieldName="selfie_photo_path" // Field Name yang akan disimpan di formData
            label="Foto Swafoto dengan KTP"
            capturedImage={formData.selfie_photo_path}
            setCapturedImage={handleSetCapturedImage}
            isInvalid={!!errors.selfie_photo_path}
          />
          {!!errors.selfie_photo_path && (
            <div className="text-danger mt-2">{errors.selfie_photo_path}</div>
          )}
        </Col>
      </Row>
    </div>
  );
}
