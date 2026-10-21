import { useEffect, useRef, useState } from "react";
import { Button, Image, CardTitle, Spinner } from "react-bootstrap";

/**
 * StepKTP (versi dinamis dan optimal)
 * Bisa digunakan untuk foto KTP, selfie, atau dokumen lain.
 *
 * Props:
 * - label: judul tampilan (misal "Ambil Foto KTP" / "Ambil Selfie")
 * - name: key untuk field (default: "ktp")
 * - onChange(name, value, isPreviewOnly?): callback ke parent
 * - previews: object { [name]: url }
 * - facingMode: "environment" | "user" (kamera belakang / depan)
 */
export default function StepKTP({
  label = "Ambil Foto KTP",
  name = "ktp",
  onChange,
  previews = {},
  facingMode = "environment",
}) {
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const previewUrlRef = useRef(null);

  // Konfigurasi kompresi
  const MAX_DIMENSION = 1280; // Maks resolusi hasil foto
  const QUALITY = 0.75; // 0..1 kualitas JPEG

  /** 🎥 Aktifkan kamera otomatis saat belum capture */
  useEffect(() => {
    if (captured) return;

    let localStream;
    const startCamera = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
        setStream(s);
        localStream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (err) {
        alert("Gagal mengakses kamera: " + err.message);
      }
    };

    startCamera();

    // Cleanup kamera & URL preview
    return () => {
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [captured, facingMode]);

  /** 🧩 Helper: ambil & kompres gambar */
  const captureAndCompress = (videoEl, maxDim, quality) => {
    return new Promise((resolve, reject) => {
      try {
        const vw = videoEl.videoWidth;
        const vh = videoEl.videoHeight;
        if (!vw || !vh) {
          reject(new Error("Video belum siap"));
          return;
        }

        const scale = Math.min(1, maxDim / Math.max(vw, vh));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(vw * scale);
        canvas.height = Math.round(vh * scale);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error("Gagal membuat Blob"));
            resolve({
              blob,
              width: canvas.width,
              height: canvas.height,
            });
          },
          "image/jpeg",
          quality
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  /** 📸 Ambil foto dari kamera */
  const capturePhoto = async () => {
    if (!videoRef.current) return;
    setLoading(true);

    try {
      const { blob } = await captureAndCompress(
        videoRef.current,
        MAX_DIMENSION,
        QUALITY
      );

      const file = new File([blob], `${name}.jpg`, {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }

      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;

      onChange(name, file);
      onChange(name, url, true);
      setCaptured(true);

      // Matikan kamera setelah capture
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
    } catch (err) {
      alert("Gagal menangkap foto: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  /** 🔁 Ambil ulang foto */
  const retakePhoto = () => {
    onChange(name, null);
    onChange(name, null, true);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setCaptured(false);
  };

  /** 🎨 UI */
  return (
    <>
      <CardTitle className="fw-bold mb-3">{label}</CardTitle>

      {!previews[name] ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: "100%",
              borderRadius: "10px",
              background: "#000",
            }}
          />
          <div className="mt-3 d-grid">
            <Button
              className="bg-blue700 text-white"
              onClick={capturePhoto}
              type="button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Mengambil Foto...
                </>
              ) : (
                "Ambil Foto"
              )}
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <Image
            src={previews[name]}
            thumbnail
            style={{
              maxWidth: "100%",
              borderRadius: "10px",
            }}
          />
          <div className="mt-3 d-grid">
            <Button
              className="bg-blue700 text-white"
              onClick={retakePhoto}
              type="button"
            >
              Foto Ulang
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
