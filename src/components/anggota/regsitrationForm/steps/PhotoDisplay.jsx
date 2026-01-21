import React from "react";
import { FaCamera, FaIdCard } from "react-icons/fa";

export default function PhotoDisplay({ label, imageSource, type }) {
  const PlaceholderIcon = type === "KTP" ? FaIdCard : FaCamera;

  // Deteksi apakah source adalah Base64 atau URL
  const src = imageSource;

  return (
    <div className="text-center p-2 border rounded-12 bg-light shadow-sm">
      <p className="small fw-bold text-muted mb-2">{label}</p>
      {src ? (
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
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x300?text=Error+Loading+Image";
          }}
        />
      ) : (
        <div
          className="border rounded-8 bg-white d-flex align-items-center justify-content-center"
          style={{ height: "140px" }}
        >
          <PlaceholderIcon size={30} className="opacity-25" />
        </div>
      )}
    </div>
  );
}
