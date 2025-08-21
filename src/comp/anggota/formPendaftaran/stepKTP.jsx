import { useEffect, useRef, useState } from "react";
import { Button, Image, CardTitle } from "react-bootstrap";

export default function StepKTP({ onChange, previews }) {
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const videoRef = useRef(null);
  const previewUrlRef = useRef(null);

  // Konfigurasi kompresi
  const MAX_DIMENSION = 1280; // maksimal width/height setelah resize
  const QUALITY = 0.75; // 0..1 JPEG quality

  useEffect(() => {
    if (captured) return;

    let localStream = null;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        setStream(s);
        localStream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch((err) => alert("Gagal mengakses kamera: " + err.message));

    return () => {
      if (localStream) localStream.getTracks().forEach((t) => t.stop());
      if (stream) stream.getTracks().forEach((t) => t.stop());
      // revoke preview url kalau ada
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [captured]);

  // Helper: resize + compress image from video element
  const captureAndCompress = (videoEl, maxDim, quality) => {
    return new Promise((resolve, reject) => {
      try {
        const vw = videoEl.videoWidth;
        const vh = videoEl.videoHeight;

        if (!vw || !vh) {
          reject(new Error("Video belum siap (width/height = 0)"));
          return;
        }

        // Hitung skala supaya tidak melebihi maxDim
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

        // Jika ingin background putih (mis. untuk PNG->JPG), bisa fillRect putih:
        // ctx.fillStyle = "#fff";
        // ctx.fillRect(0,0,canvas.width,canvas.height);

        // draw scaled image
        ctx.drawImage(videoEl, 0, 0, targetW, targetH);

        // toBlob dengan quality (JPEG)
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

      // Buat File dari blob
      const file = new File([blob], "foto_ktp.jpg", {
        type: "image/jpeg",
        lastModified: Date.now(),
      });

      // Jika ada preview url sebelumnya, revoke agar tidak bocor memori
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = null;
      }

      const url = URL.createObjectURL(file);
      previewUrlRef.current = url;

      // Kirim file dan preview ke parent.
      // onChange("ktp", file) => file untuk upload
      // onChange("ktp", url, true) => preview
      onChange("ktp", file);
      onChange("ktp", url, true);

      setCaptured(true);

      // Matikan kamera setelah capture
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }

      // (opsional) log ukuran asli & kompres
      // console.log("Hasil compress:", file.size, "bytes", width, "x", height);
    } catch (err) {
      alert("Gagal menangkap foto: " + err.message);
    }
  };

  const retakePhoto = () => {
    // Hapus preview dan file KTP di parent
    onChange("ktp", null);
    onChange("ktp", null, true);

    // revoke preview local
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }

    // Nyalakan kembali kamera (set captured false -> effect akan mengaktifkan kamera)
    setCaptured(false);
  };

  return (
    <>
      <CardTitle className="fw-bold mb-3">Ambil Foto KTP</CardTitle>
      {!previews.ktp ? (
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
              type="button"
            >
              Ambil Foto
            </Button>
          </div>
        </>
      ) : (
        <div>
          <Image src={previews.ktp} thumbnail style={{ maxWidth: "100%" }} />
          <div className="mt-3">
            <Button
              className="bg-blue700 text-white w-100"
              onClick={retakePhoto}
            >
              Foto Ulang
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
