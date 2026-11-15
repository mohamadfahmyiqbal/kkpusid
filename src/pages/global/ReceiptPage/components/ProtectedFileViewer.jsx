import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

export default function ProtectedFileViewer({
  url,
  title,
  isImage = false,
  className = "",
  style = {},
}) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let objectUrl = null;
    const fetchFile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error("Gagal mengunduh berkas");
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load protected file:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url && url !== "#") {
      fetchFile();
    } else {
      setLoading(false);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [url]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 p-4 bg-light text-secondary">
        <Spinner size="sm" animation="border" className="me-2" /> Memuat berkas...
      </div>
    );
  }

  if (error || !url || url === "#") {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 p-4 bg-light text-danger small">
        Gagal memuat berkas
      </div>
    );
  }

  if (isImage) {
    return <img src={blobUrl} alt={title} className={className} style={style} />;
  }

  return (
    <iframe
      src={blobUrl}
      title={title}
      style={{ width: "100%", height: "100%", border: "none", ...style }}
    />
  );
}
