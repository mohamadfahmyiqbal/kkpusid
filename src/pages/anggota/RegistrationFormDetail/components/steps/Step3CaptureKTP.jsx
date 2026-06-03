import React, { useCallback } from "react";
import { Form, Row, Col, Alert } from "react-bootstrap";
import {
  FaCamera,
  FaIdCard,
  FaLightbulb,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import WebcamCaptureField from "../../../../../components/ui/WebcamCaptureField";

/**
 * Komponen untuk mengambil foto KTP (Langkah 3).
 * Dioptimasi dengan panduan visual dan UI modern.
 */
export default function Step3CaptureKTP({ formData, setFormData, errors }) {
  const handleSetCapturedImage = useCallback(
    (fieldName, base64Image) => {
      setFormData((prevData) => ({
        ...prevData,
        [fieldName]: base64Image,
      }));
    },
    [setFormData],
  );

  return (
    <div className="p-2">
      {/* HEADER SEKSI */}
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaCamera />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Dokumentasi KTP</h5>
          <small className="text-muted">
            Ambil foto KTP asli untuk verifikasi identitas
          </small>
        </div>
      </div>

      <Row>
        <Col lg={7}>
          {/* AREA WEBCAM */}
          <div className="p-3 rounded-20 bg-light border-0 shadow-sm mb-4">
            <WebcamCaptureField
              fieldName="foto_ktp"
              label="Foto Kartu Tanda Penduduk (KTP)"
              capturedImage={formData.foto_ktp}
              setCapturedImage={handleSetCapturedImage}
              isInvalid={!!errors.foto_ktp}
              defaultFacingMode="environment"
            />
            {!!errors.foto_ktp && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
                className="mt-2"
              >
                <FaInfoCircle className="me-1" /> {errors.foto_ktp}
              </Form.Control.Feedback>
            )}
          </div>
        </Col>

        <Col lg={5}>
          {/* PANDUAN PENGAMBILAN GAMBAR */}
          <div className="requirement-items bg-white p-4 rounded-20 border-dashed h-100">
            <h6 className="fw-bold text-dark mb-3">Panduan Foto KTP:</h6>

            <ul className="list-unstyled mb-4">
              <li className="d-flex align-items-start mb-3">
                <FaCheckCircle className="text-success mt-1 me-2" />
                <span className="small">
                  KTP berada di dalam bingkai kamera.
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <FaLightbulb className="text-warning mt-1 me-2" />
                <span className="small">
                  Pastikan cahaya terang dan tidak ada pantulan lampu.
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <FaCheckCircle className="text-success mt-1 me-2" />
                <span className="small">
                  Teks dan foto pada KTP terbaca dengan jelas (tidak buram).
                </span>
              </li>
            </ul>

            <Alert
              variant="warning"
              className="rounded-12 border-0 shadow-sm small"
            >
              <strong>Penting:</strong> Gunakan KTP asli, bukan fotokopi atau
              hasil scan layar komputer.
            </Alert>

            {/* Visual Placeholder KTP */}
            <div className="mt-4 text-center opacity-25">
              <FaIdCard size={80} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
