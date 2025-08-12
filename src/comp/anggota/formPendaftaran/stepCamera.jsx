import { useEffect, useRef, useState } from "react";
import { Button, Image, CardTitle } from "react-bootstrap";

export default function StepCamera({ onChange, previews }) {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((s) => {
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch((err) => alert("Gagal mengakses kamera: " + err.message));

    return () => {
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "foto_selfie.jpg", {
          type: "image/jpeg",
        });
        onChange("foto", file);
        const url = URL.createObjectURL(file);
        onChange("foto_preview", url, true);
      }
    }, "image/jpeg");
  };

  return (
    <>
      <CardTitle className="fw-bold mb-3">Ambil Foto</CardTitle>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "400px" }}
      />
      <div className="mt-3">
        <Button variant="primary" onClick={capturePhoto}>
          Ambil Foto
        </Button>
      </div>
      {previews.foto && (
        <div className="mt-3">
          <b>Preview:</b>
          <Image src={previews.foto} thumbnail style={{ maxWidth: "250px" }} />
        </div>
      )}
    </>
  );
}
