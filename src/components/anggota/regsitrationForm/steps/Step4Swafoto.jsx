// src/components/anggota/regsitrationForm/steps/Step4Swafoto.jsx

import React from "react";
import WebcamCaptureField from "../../../ui/WebcamCaptureField";

export default function Step4Swafoto({ formData, handleSetCapturedImage }) {
  return (
    <>
      <div className="alert alert-warning">
        Lakukan **swafoto sambil memegang KTP** di depan dada untuk verifikasi
        identitas.
      </div>
      <WebcamCaptureField
        fieldName="swafoto"
        label="Foto Swafoto dengan KTP"
        capturedImage={formData.swafoto}
        setCapturedImage={handleSetCapturedImage}
      />
    </>
  );
}
