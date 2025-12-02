// src/components/anggota/regsitrationForm/steps/PhotoDisplay.jsx

import React from "react";
import { FaCamera, FaIdCard } from "react-icons/fa";

/**
 * Menampilkan gambar Base64 atau placeholder jika gambar belum diambil.
 * @param {string} label - Label foto.
 * @param {string} imageData - Data foto Base64.
 * @param {string} type - Tipe foto ("KTP" atau "Swafoto").
 */
export default function PhotoDisplay({ label, imageData, type }) {
  const PlaceholderIcon = type === "KTP" ? FaIdCard : FaCamera;

  return (
    <div className="text-center">
      <h6 className="mb-2">{label}</h6>
      {imageData ? (
        <img
          src={imageData}
          alt={label}
          className="img-fluid border rounded"
          style={{ maxHeight: "120px", objectFit: "cover", width: "100%" }}
        />
      ) : (
        <div
          className="mx-auto border rounded d-flex align-items-center justify-content-center bg-light text-secondary"
          style={{
            height: "120px",
            width: "100%",
            border: "2px dashed #6c757d",
          }}
        >
          <PlaceholderIcon size={30} />
        </div>
      )}
      <small className="d-block mt-1 text-danger">
        {imageData ? "Foto telah diambil" : "Belum Diambil"}
      </small>
    </div>
  );
}
