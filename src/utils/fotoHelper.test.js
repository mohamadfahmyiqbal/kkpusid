// path: src/utils/fotoHelper.test.js
//
// Test util getFotoSrc: memastikan src swafoto anggota selalu berupa
// data URL yang valid, dengan fallback saat foto kosong.
import { describe, test, expect } from "vitest";
import { getFotoSrc } from "./fotoHelper";

describe("getFotoSrc", () => {
  const fallback = "/assets/icons/default-user.png";

  test("mengembalikan fallback ketika foto null/undefined/kosong", () => {
    expect(getFotoSrc(null, fallback)).toBe(fallback);
    expect(getFotoSrc(undefined, fallback)).toBe(fallback);
    expect(getFotoSrc("", fallback)).toBe(fallback);
  });

  test("mengembalikan data URL utuh tanpa diubah", () => {
    const dataUrl = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD";
    expect(getFotoSrc(dataUrl, fallback)).toBe(dataUrl);
  });

  test("menambahkan awalan data:image/jpeg;base64, pada base64 mentah", () => {
    const raw = "/9j/4AAQSkZJRgABAQAAAQABAAD";
    const expected = `data:image/jpeg;base64,${raw}`;
    expect(getFotoSrc(raw, fallback)).toBe(expected);
  });

  test("fallback default adalah default-user.png saat tidak disertakan", () => {
    expect(getFotoSrc(null)).toBe("/assets/icons/default-user.png");
    expect(getFotoSrc(undefined)).toBe("/assets/icons/default-user.png");
  });
});
