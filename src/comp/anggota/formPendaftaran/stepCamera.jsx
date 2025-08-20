import { useEffect, useRef, useState } from "react";
import { Button, Image, CardTitle } from "react-bootstrap";

export default function StepCamera({ onChange, previews }) {
  const [stream, setStream] = useState(null);
  const [captured, setCaptured] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Jika sudah capture, jangan aktifkan kamera lagi
    if (captured) return;

    let localStream = null;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((s) => {
        setStream(s);
        localStream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch((err) => alert("Gagal mengakses kamera: " + err.message));

    return () => {
      if (localStream) localStream.getTracks().forEach((track) => track.stop());
      if (stream) stream.getTracks().forEach((track) => track.stop());
    };
    // depend on captured, supaya kamera tidak aktif lagi setelah capture
    // eslint-disable-next-line
  }, [captured]);

  const capturePhoto = () => {
    if (!videoRef.current) return;
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
        onChange("foto", url, true);
        setCaptured(true);

        // Matikan kamera setelah capture
        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
      }
    }, "image/jpeg");
  };

  const retakePhoto = () => {
    // Hapus preview dan file foto
    onChange("foto", null);
    onChange("foto", null, true);

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
            >
              Foto Ulang
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
