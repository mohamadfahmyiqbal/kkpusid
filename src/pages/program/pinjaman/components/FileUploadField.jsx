import React, { useState } from "react";
import { Form, Button, ProgressBar } from "react-bootstrap";
import { FaUpload, FaCheck, FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";

export default function FileUploadField({
  onFileChange,
  error = "",
  isUploading = false,
  uploadProgress = 0,
  uploadedFile,
  setUploadedFile,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const handleFileSelect = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("File terlalu besar. Maksimal 5MB.");
      return;
    }
    setFileInfo({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
    });
    onFileChange && onFileChange(file);
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileInfo(null);
    setUploadedFile(null);
  };

  return (
    <div className="mb-4">
      <Form.Label className="small text-muted mb-2 font-outfit fw-bold">
        Dokumen Pendukung (Opsional, Maks. 5MB)
      </Form.Label>
      <div
        className={`premium-upload-zone ${isDragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
        }}
        onClick={() => document.getElementById("file-upload").click()}
      >
        <input
          type="file"
          className="d-none"
          id="file-upload"
          accept="image/*,.pdf,.doc,.docx"
          onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
        />
        {fileInfo || uploadedFile ? (
          <div className="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 border border-success">
            <div className="d-flex align-items-center text-success text-start">
              <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                <FaCheck />
              </div>
              <div>
                <span
                  className="fw-bold d-block text-dark font-outfit"
                  style={{ fontSize: "14px" }}
                >
                  {fileInfo?.name || "Dokumen terpilih"}
                </span>
                <small className="text-muted">{fileInfo?.size || ""}</small>
              </div>
            </div>
            <Button variant="link" className="text-danger p-2" onClick={handleRemoveFile}>
              <FaTrashAlt size={16} />
            </Button>
          </div>
        ) : (
          <div className="text-muted py-2">
            <FaUpload className="mb-2 text-teal" size={24} />
            <div className="fw-bold text-dark font-outfit" style={{ fontSize: "14px" }}>
              Klik atau Seret File ke Sini
            </div>
            <small className="text-muted" style={{ fontSize: "11.5px" }}>
              Format: JPG, PNG, PDF, DOC
            </small>
          </div>
        )}
      </div>
      {isUploading && (
        <div className="mt-2 px-1">
          <small
            className="text-primary mb-1 d-block font-outfit"
            style={{ fontSize: "12px" }}
          >
            Mengunggah bukti: {uploadProgress}%
          </small>
          <ProgressBar
            now={uploadProgress}
            size="sm"
            animated
            variant="info"
            style={{ height: "6px" }}
          />
        </div>
      )}
      {error && (
        <small className="text-danger d-block mt-2 font-outfit">
          <FaExclamationTriangle className="me-1" />
          {error}
        </small>
      )}
    </div>
  );
}
