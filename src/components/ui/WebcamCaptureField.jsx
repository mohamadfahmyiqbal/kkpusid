// src/components/ui/WebcamCaptureField.jsx

import React, { useState, useCallback } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { FaCamera, FaTimes } from "react-icons/fa";

// Helper lokal
const getPhotoStatus = (photoData) => {
  return photoData ? "Foto Telah Diambil" : "Belum Diambil";
};

export default function WebcamCaptureField({
  fieldName,
  label,
  capturedImage,
  setCapturedImage,
}) {
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleToggleCamera = useCallback(() => {
    setIsCameraActive((prev) => !prev);
  }, []);

  const handleCapturePhoto = useCallback(() => {
    // Data Base64 dummy
    const mockImageBase64 =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAADhJREFUGFdj/M/AAIXBwUEAig4sAASvQGA0GgQJ0gT4SBEcAYkKBoqPjP8YI+A0AEEBqgYAwzELG9E768gAAAAASUVORK5CYII=";

    setCapturedImage(fieldName, mockImageBase64);
    setIsCameraActive(false);
  }, [fieldName, setCapturedImage]);

  const handleRetake = useCallback(() => {
    setCapturedImage(fieldName, null);
    setIsCameraActive(true);
  }, [fieldName, setCapturedImage]);

  return (
    <>
      <Form.Label className="d-block mb-3">{label}</Form.Label>

      {!capturedImage ? (
        <Card className="mb-3 text-center border-primary">
          <Card.Body>
            <div
              className="mb-3 p-5 rounded"
              style={{
                minHeight: "150px",
                backgroundColor: isCameraActive ? "#e6f7ff" : "#f8f9fa",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px dashed #007bff",
              }}
            >
              {isCameraActive ? (
                <span className="text-primary fw-bold">
                  <FaCamera size={30} className="me-2" /> Kamera Aktif
                  (Simulasi)
                </span>
              ) : (
                <p className="text-muted mb-0">
                  Klik tombol di bawah untuk memulai kamera
                </p>
              )}
            </div>

            <Button
              variant={isCameraActive ? "danger" : "primary"}
              onClick={handleToggleCamera}
              className="w-100 mb-2"
            >
              {isCameraActive ? (
                <>
                  <FaTimes className="me-2" /> Tutup Kamera
                </>
              ) : (
                <>
                  <FaCamera className="me-2" /> Buka Kamera
                </>
              )}
            </Button>

            {isCameraActive && (
              <Button
                variant="success"
                onClick={handleCapturePhoto}
                className="w-100"
              >
                <FaCamera className="me-2" /> Ambil Foto
              </Button>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Card className="mb-3 text-center">
          <Card.Body>
            <img
              src={capturedImage}
              alt={`Foto ${label} Preview`}
              style={{
                maxWidth: "100%",
                maxHeight: "250px",
                objectFit: "contain",
                border: "1px solid #ddd",
              }}
              className="mb-3 rounded"
            />
            <p className="fw-bold text-success mb-2">Foto berhasil diambil!</p>
            <Button variant="warning" onClick={handleRetake}>
              <FaCamera className="me-2" /> Ambil Ulang Foto
            </Button>
          </Card.Body>
        </Card>
      )}

      <Form.Text className="text-muted d-block">
        Status: **{getPhotoStatus(capturedImage)}**
      </Form.Text>
    </>
  );
}
