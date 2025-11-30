// src/components/anggota/regsitrationForm/steps/Step3CaptureKTP.jsx

import React from "react";
import WebcamCaptureField from "../../../ui/WebcamCaptureField";

export default function Step3CaptureKTP({ formData, handleSetCapturedImage }) {
  return (
    <>
      <div className="alert alert-info">
        Ambil foto **KTP terlihat jelas** dan tidak buram menggunakan kamera
        perangkat Anda.
      </div>
      <WebcamCaptureField
        fieldName="fotoKtp"
        label="Foto Kartu Tanda Penduduk (KTP)"
        capturedImage={formData.fotoKtp}
        setCapturedImage={handleSetCapturedImage}
      />
    </>
  );
}
