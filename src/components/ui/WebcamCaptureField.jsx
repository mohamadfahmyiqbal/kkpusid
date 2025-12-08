// src/components/ui/WebcamCaptureField.jsx (PERBAIKAN FINAL - Menggunakan react-webcam)

import React, { useState, useCallback, useRef } from "react";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { FaCamera, FaTimes, FaUndo, FaCheckCircle } from "react-icons/fa";
// 💡 IMPORT UTAMA: Komponen dari library react-webcam
import Webcam from "react-webcam";

// Helper lokal
const getPhotoStatus = (photoData) => {
  return photoData ? "Foto Telah Diambil" : "Belum Diambil";
};

// =======================================================
// KOMPONEN UTAMA
// =======================================================
export default function WebcamCaptureField({
  fieldName,
  label,
  capturedImage,
  setCapturedImage,
  isInvalid,
  errorText,
}) {
  const webcamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // 1. Mengaktifkan/Menonaktifkan Kamera
  const handleToggleCamera = useCallback(() => {
    // Jika kamera akan dinonaktifkan, pastikan loading reset
    if (isCameraActive) {
      setLoading(false);
    }
    setIsCameraActive((prev) => !prev);
  }, [isCameraActive]);

  // 2. Mengambil Foto (Capture)
  const handleCapture = useCallback(() => {
    if (webcamRef.current) {
      setLoading(true);
      // Ambil gambar dalam format Base64
      const imageSrc = webcamRef.current.getScreenshot();

      // Simpan gambar ke state parent
      setCapturedImage(fieldName, imageSrc);

      // Setelah berhasil mengambil, MATIKAN KAMERA dan reset loading
      setIsCameraActive(false);
      setLoading(false);
    }
  }, [fieldName, setCapturedImage]);

  // 3. Mengambil Ulang Foto (Retake)
  const handleRetake = useCallback(() => {
    // 1. Mereset gambar di state parent menjadi null
    setCapturedImage(fieldName, null);
    // 2. Mengaktifkan kamera kembali
    setIsCameraActive(true);
  }, [fieldName, setCapturedImage]);

  // --------------------------------------------------
  // --- Rendering ---
  // --------------------------------------------------

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">{label}</h6>
        <span
          className={`badge bg-${
            capturedImage ? "success" : "secondary"
          } text-white`}
        >
          {getPhotoStatus(capturedImage)}
        </span>
      </div>

      {/* RENDER KONDISIONAL: FOTO SUDAH DIAMBIL atau BELUM DIAMBIL */}
      {!capturedImage ? (
        // TAMPILAN KAMERA/PLACEHOLDER
        <Card
          className={`mb-3 text-center ${
            isInvalid ? "border-danger" : "border"
          }`}
        >
          <Card.Body>
            {/* Tampilan Webcam atau Placeholder */}
            {isCameraActive ? (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  facingMode: "environment", // Menggunakan kamera belakang (default)
                }}
                className="w-100 mb-3"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                className="mx-auto border rounded d-flex align-items-center justify-content-center bg-light text-secondary mb-3"
                style={{
                  height: "200px",
                  width: "100%",
                  border: "2px dashed #6c757d",
                }}
              >
                <FaCamera size={50} />
              </div>
            )}

            {/* Tombol Aksi */}
            {isCameraActive ? (
              // Tombol saat kamera aktif
              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  onClick={handleCapture}
                  disabled={loading}
                  className="me-2"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />{" "}
                      Mengambil...
                    </>
                  ) : (
                    <>
                      <FaCamera className="me-2" /> Ambil Foto
                    </>
                  )}
                </Button>
                <Button variant="danger" onClick={handleToggleCamera}>
                  <FaTimes className="me-2" /> Tutup Kamera
                </Button>
              </div>
            ) : (
              // Tombol saat kamera tidak aktif
              <Button
                variant="info"
                onClick={handleToggleCamera}
                disabled={loading}
              >
                <FaCamera className="me-2" /> Buka Kamera
              </Button>
            )}

            {/* Display Error */}
            {isInvalid && errorText && (
              <small className="d-block text-danger mt-2">{errorText}</small>
            )}
          </Card.Body>
        </Card>
      ) : (
        // TAMPILAN FOTO BERHASIL DIAMBIL
        <Card className="mb-3 text-center border-success">
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
            <p className="fw-bold text-success mb-2">
              <FaCheckCircle className="me-2" /> Foto berhasil diambil!
            </p>
            {/* Tombol Ambil Ulang Foto yang Memanggil handleRetake */}
            <Button variant="warning" onClick={handleRetake}>
              <FaUndo className="me-2" /> Ambil Ulang Foto
            </Button>
          </Card.Body>
        </Card>
      )}

      <Form.Text className="text-muted">
        Pastikan wajah atau dokumen terlihat jelas dan tidak blur.
      </Form.Text>
    </div>
  );
}
