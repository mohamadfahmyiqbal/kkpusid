// path: src/pages/anggota/RegistrationFormDetail/components/steps/PhotoDisplay.test.jsx
//
// Verifikasi empiris: foto webcam (data URL hasil compressDataUrl) harus
// dirender sebagai <img> dengan src yang valid di ringkasan (Step 8).
// Jika test ini lulus, jalur render foto sudah benar dan masalah "foto tidak
// muncul" berasal dari data (foto tidak tersimpan) atau deployment, bukan render.
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PhotoDisplay from "./PhotoDisplay";

// Data URL JPEG kecil namun valid (1x1 px) — meniru output compressDataUrl.
const DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9oADAMBAAIAAwAAABD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EB//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EB//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EB//2Q==";

describe("PhotoDisplay (Step 8 ringkasan)", () => {
  test("merender <img> dengan src data URL untuk foto KTP", () => {
    render(<PhotoDisplay label="KTP" base64Image={DATA_URL} />);
    const img = screen.getByRole("img", { name: "KTP" });
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toBe(DATA_URL);
  });

  test("merender <img> dengan src data URL untuk swafoto", () => {
    render(<PhotoDisplay label="Swafoto" base64Image={DATA_URL} />);
    const img = screen.getByRole("img", { name: "Swafoto" });
    expect(img.getAttribute("src")).toBe(DATA_URL);
  });

  test("menampilkan placeholder (bukan <img>) saat foto kosong", () => {
    render(<PhotoDisplay label="KTP" base64Image={undefined} />);
    expect(screen.queryByRole("img", { name: "KTP" })).toBeNull();
  });
});