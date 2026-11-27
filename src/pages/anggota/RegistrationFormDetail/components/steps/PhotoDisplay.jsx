import React, { useState } from "react";
import { FaCamera, FaIdCard, FaExclamationTriangle } from "react-icons/fa";
import { getFotoSrc } from "../../../../../utils/fotoHelper";

export default React.memo(function PhotoDisplay({ label, base64Image }) {
  const [failed, setFailed] = useState(false);

  // Ikon placeholder mengikuti jenis dokumen.
  const PlaceholderIcon = label === "KTP" ? FaIdCard : FaCamera;

  // Normalisasi sumber gambar: menerima data URL (webcam), URL lengkap,
  // path relatif, maupun base64 mentah dari API.
  const src = getFotoSrc(base64Image, "");

  return (
    <div className="text-center p-2 border rounded-12 bg-light shadow-sm h-100">
      <p className="small fw-bold text-muted mb-2">{label}</p>
      {src && !failed ? (
        <img
          src={src}
          alt={label}
          className="img-fluid rounded border shadow-sm"
          style={{
            height: "140px",
            width: "100%",
            objectFit: "contain",
            backgroundColor: "#000",
          }}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="border rounded-8 bg-white d-flex flex-column align-items-center justify-content-center gap-2"
          style={{ height: "140px" }}
        >
          {failed ? (
            <>
              <FaExclamationTriangle size={28} className="text-warning" />
              <span className="small text-muted px-2">
                Gambar tidak dapat dimuat
              </span>
            </>
          ) : (
            <PlaceholderIcon size={30} className="opacity-25" />
          )}
        </div>
      )}
    </div>
  );
});
