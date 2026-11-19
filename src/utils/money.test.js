// path: src/utils/money.test.js
//
// Test util aritmetika uang (Decimal, bukan float). Fokus: penjumlahan berulang,
// pengurangan, batas nol (maxZero), dan konversi ke Number untuk UI.

import { describe, test, expect } from "vitest";
import { maxZero, subtractAmounts, sumAmounts, toDecimal, toNumber } from "./money";

describe("money (Decimal, bukan float)", () => {
  describe("toDecimal", () => {
    test("menerima string DECIMAL DB dan number", () => {
      expect(toDecimal("150000.00").toString()).toBe("150000");
      expect(toDecimal(10000.5).toString()).toBe("10000.5");
    });

    test("null/undefined/kosong → 0", () => {
      expect(toDecimal(null).toNumber()).toBe(0);
      expect(toDecimal(undefined).toNumber()).toBe(0);
      expect(toDecimal("").toNumber()).toBe(0);
    });
  });

  describe("sumAmounts", () => {
    test("menjumlahkan 0,1 sebanyak 10 kali = tepat 1 (tanpa drift)", () => {
      const values = Array.from({ length: 10 }, () => "0.1");
      expect(sumAmounts(values).toString()).toBe("1");
    });

    test("menjumlahkan nilai sen realistis tanpa drift", () => {
      const values = ["0.1", "0.2", "0.3", "1234.56", "0.01"];
      // float: 0.1+0.2+0.3+1234.56+0.01 = 1235.1700000000001
      expect(sumAmounts(values).toFixed(2)).toBe("1235.17");
    });

    test("akumulasi 1.000 mutasi 0,01 = tepat 10,00", () => {
      const values = Array.from({ length: 1000 }, () => "0.01");
      expect(sumAmounts(values).toFixed(2)).toBe("10.00");
    });
  });

  describe("subtractAmounts", () => {
    test("0,3 - 0,2 = 0,1 tepat (float memberi 0,0999…)", () => {
      expect(subtractAmounts("0.3", "0.2").toString()).toBe("0.1");
    });

    test("selisih positif toNumber", () => {
      expect(toNumber(subtractAmounts("150000.00", "50000.00"))).toBe(100000);
    });
  });

  describe("maxZero", () => {
    test("nilai negatif → 0", () => {
      expect(maxZero(subtractAmounts("1000", "1500")).toNumber()).toBe(0);
    });

    test("nilai positif tetap", () => {
      expect(maxZero(subtractAmounts("1500", "1000")).toNumber()).toBe(500);
    });
  });

  describe("toNumber", () => {
    test("Decimal → Number untuk UI", () => {
      expect(toNumber("1234.56")).toBe(1234.56);
      expect(toNumber(0)).toBe(0);
    });
  });
});