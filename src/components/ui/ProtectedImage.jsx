import React, { useEffect, useState } from "react";
import { getFotoSrc } from "../../utils/fotoHelper";

/**
 * Menampilkan gambar yang dilayani endpoint terproteksi (mis. /api/files/*)
 * yang membutuhkan header Authorization. Tag <img> biasa tidak dapat mengirim
 * token, sehingga request jatuh ke 401/503. Komponen ini mengambil berkas via
 * fetch dengan Bearer token lalu menampilkannya sebagai blob: object URL.
 *
 * Nilai `src` boleh berupa:
 *  - data URL / base64 (foto hasil capture) → ditampilkan langsung tanpa fetch
 *  - URL absolut http(s) ke API → di-fetch dengan Bearer
 *  - path relatif (/api/files/... atau uploads/...) → di-resolve ke VITE_API_ORIGIN lalu di-fetch
 *
 * @param {Object} props
 * @param {string} props.src - nilai foto dari API (base64/data URL/URL/path relatif)
 * @param {string} [props.alt]
 * @param {string} [props.className]
 * @param {Object} [props.style]
 * @param {string} [props.fallback="/assets/icons/default-user.png"] - src saat kosong/gagal
 */
export default function ProtectedImage({
  src,
  alt = "",
  className = "",
  style = {},
  fallback = "/assets/icons/default-user.png",
}) {
  const [blobUrl, setBlobUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let objectUrl = null;
    let active = true;

    const normalized = getFotoSrc(src, "");

    // Kosong → pakai fallback.
    if (!normalized) {
      setBlobUrl(null);
      setFailed(false);
      setLoading(false);
      return undefined;
    }

    // Sudah data URL (base64 hasil capture) → tampilkan langsung, tanpa fetch.
    if (normalized.startsWith("data:")) {
      setBlobUrl(normalized);
      setFailed(false);
      setLoading(false);
      return undefined;
    }

    // Path relatif / URL API → perlu di-fetch dengan Bearer token.
    const apiOrigin = import.meta.env.VITE_API_ORIGIN || "";
    let fileUrl;
    if (/^https?:\/\//i.test(normalized)) {
      fileUrl = normalized;
    } else if (normalized.startsWith("/")) {
      fileUrl = `${apiOrigin}${normalized}`;
    } else if (normalized.startsWith("uploads/")) {
      fileUrl = `${apiOrigin}/api/files/${normalized}`;
    } else {
      // Fallback tak terduga → perlakukan sebagai data URL JPEG.
      setBlobUrl(`data:image/jpeg;base64,${normalized}`);
      setFailed(false);
      setLoading(false);
      return undefined;
    }

    const fetchImage = async () => {
      try {
        setLoading(true);
        setFailed(false);
        const token =
          localStorage.getItem("authToken") || localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await fetch(fileUrl, { headers });
        if (!response.ok) throw new Error(`Gagal memuat gambar (${response.status})`);
        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        if (active) setBlobUrl(objectUrl);
      } catch (err) {
        console.error("ProtectedImage gagal memuat:", err);
        if (active) {
          setBlobUrl(null);
          setFailed(true);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchImage();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  const resolvedSrc = failed || !blobUrl ? fallback : blobUrl;

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      style={style}
      loading={loading ? "lazy" : undefined}
      data-loading={loading || undefined}
    />
  );
}