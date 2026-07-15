import React, { useCallback } from "react";
import { Form, Row, Col} from "react-bootstrap";
import {
  FaUserShield,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
} from "react-icons/fa";
import WebcamCaptureField from "../../../../../components/ui/WebcamCaptureField";



/**
 * Komponen untuk mengambil Swafoto dengan KTP (Langkah 4).
 * Dioptimasi dengan panduan visual agar verifikasi wajah lebih akurat.
 */
export default React.memo(function Step4Swafoto({ formData, setFormData, errors }) {
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
          <FaUserShield />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Verifikasi Wajah (Swafoto)</h5>
          <small className="text-muted">
            Pastikan identitas Anda valid dengan swafoto memegang KTP
          </small>
        </div>
      </div>

      <Row className="g-4 align-items-stretch">
        <Col lg={7}>
          {/* AREA WEBCAM */}
          <div className="p-3 p-md-4 rounded-20 bg-white border shadow-sm h-100 d-flex flex-column justify-content-center">
            <WebcamCaptureField
              fieldName="foto_swafoto"
              label="Ambil Swafoto"
              capturedImage={formData.foto_swafoto}
              setCapturedImage={handleSetCapturedImage}
              isInvalid={!!errors.foto_swafoto}
            />
            {!!errors.foto_swafoto && (
              <Form.Control.Feedback
                type="invalid"
                style={{ display: "block" }}
                className="mt-2"
              >
                <FaExclamationTriangle className="me-1" /> {errors.foto_swafoto}
              </Form.Control.Feedback>
            )}
          </div>
        </Col>

        <Col lg={5}>
          {/* PANDUAN SWAFOTO */}
          <div className="requirement-items bg-light p-3 p-md-4 rounded-20 border h-100 d-flex flex-column justify-content-center">
            <h6 className="fw-bold text-dark mb-3">Instruksi Swafoto:</h6>

            <ul className="list-unstyled mb-4">
              <li className="d-flex align-items-start mb-3">
                <FaCheckCircle className="text-success mt-1 me-2" />
                <span className="small">
                  Pegang KTP di bawah dagu/depan dada.
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <FaCheckCircle className="text-success mt-1 me-2" />
                <span className="small">
                  Wajah dan data KTP harus terlihat jelas secara bersamaan.
                </span>
              </li>
              <li className="d-flex align-items-start mb-3">
                <FaLightbulb className="text-warning mt-1 me-2" />
                <span className="small">
                  Hindari penggunaan kacamata hitam, masker, atau topi.
                </span>
              </li>
            </ul>



            {/* Visual Placeholder Swafoto */}

            <div className="mt-4 text-center text-muted opacity-50">
              <small>Contoh Swafoto yang Benar</small>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
});
