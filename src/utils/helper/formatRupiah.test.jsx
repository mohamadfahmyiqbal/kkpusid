import { describe, it, expect } from "vitest";
import { formatRupiah, parseRawNumber } from "./formatRupiah";

describe("formatRupiah helper", () => {
  it("mengembalikan string kosong untuk input falsy", () => {
    expect(formatRupiah(null)).toBe("");
    expect(formatRupiah(undefined)).toBe("");
    expect(formatRupiah("")).toBe("");
  });

  it("memformat angka dengan separator ribuan titik", () => {
    expect(formatRupiah(1000)).toBe("1.000");
    expect(formatRupiah(50000)).toBe("50.000");
    expect(formatRupiah(1250000)).toBe("1.250.000");
  });

  it("parseRawNumber mengembalikan digit numerik saja", () => {
    expect(parseRawNumber("50.000")).toBe("50000");
    expect(parseRawNumber("Rp 1.250.000")).toBe("1250000");
    expect(parseRawNumber("")).toBe("");
  });
});
