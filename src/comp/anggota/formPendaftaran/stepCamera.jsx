import { useEffect, useRef, useState } from "react";
import { Button, Image, CardTitle } from "react-bootstrap";

export default function StepCamera({ onChange, previews }) {
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const videoRef = useRef(null);
  const previewUrlRef = useRef(null);

  // Konfigurasi kompresi (sesuaikan jika mau)
  const MAX_DIMENSION = 1280; // maksimal width/height setelah resize
  const QUALITY = 0.75; // JPEG quality 0..1

  useEffect(() => {
    if (captured) return;

    let localStream = null;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } }) // selfie camera
      .then((s) => {
        setStream(s);
        localStream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch((err) => alert("Gagal mengakses kamera: " + err.message));

    return () => {
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [captured]);

  // Helper: resize + compress image dari elemen video
  const captureAndCompress = (videoEl, maxDim, quality) => {
    return new Promise((resolve, reject) => {
      try {
        const vw = videoEl.videoWidth;
        const vh = videoEl.videoHeight;

        if (!vw || !vh) {
          reject(new Error("Video belum siap (width/height = 0)"));
          return;
        }

        let targetW = vw;
        let targetH = vh;
        if (Math.max(vw, vh) > maxDim) {
          const scale = maxDim / Math.max(vw, vh);
          targetW = Math.round(vw * scale);
          targetH = Math.round(vh * scale);
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext("2d");

        // Jika mau background putih (untuk memastikan trans -> jpg), bisa aktifkan:
        // ctx.fillStyle = "#fff";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(videoEl, 0, 0, targetW, targetH);

        canvas.toBlob(
          (blob) => {
            if (blob) resolve({ blob, width: targetW, height: targetH });
            else reject(new Error("Gagal membuat Blob dari canvas"));
          },
          "image/jpeg",
          quality
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    try {
      const { blob, width, height } = await captureAndCompress(
        videoRef.current,
        MAX_DIMENSION,
        QUALITY
      );

      const file = new File([blob], "foto_selfie.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      // revoke preview sebelumnya jika ada
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }

      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;

      // Kirim file (untuk upload) dan preview (untuk tampilan)
      onChange("foto", file);
      onChange("foto", url, true);

      setCaptured(true);

      // Matikan kamera setelah capture
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      // (opsional) debug ukuran
      // console.log("Foto dikompres:", file.size, "bytes", width, "x", height);
    } catch (err) {
      alert("Gagal menangkap foto: " + err.message);
    }
  };

  const retakePhoto = () => {
    // Hapus preview & file di parent
    onChange("foto", null);
    onChange("foto", null, true);

    // revoke preview lokal
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    // Nyalakan kembali kamera
    setCaptured(false);
  };

  return (
    <>
      <CardTitle className="fw-bold mb-3">Ambil Foto</CardTitle>
      {!previews.foto ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: "100%", maxWidth: "100%" }}
          />
          <div className="mt-3">
            <Button
              className="bg-blue700 text-white w-100"
              onClick={capturePhoto}
            >
              Ambil Foto
            </Button>
          </div>
        </>
      ) : (
        <div>
          <Image src={previews.foto} thumbnail style={{ maxWidth: "100%" }} />
          <div className="mt-3">
            <Button
              className="bg-blue700 text-white w-100"
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
