import { describe, it, expect } from "vitest";
import uJualBeli from "./UJualBeli";

describe("UJualBeli Service", () => {
  it("exposes all required API methods including createTransaction", () => {
    expect(typeof uJualBeli.createJualBeli).toBe("function");
    expect(typeof uJualBeli.createTransaction).toBe("function");
    expect(typeof uJualBeli.getJualBeliHistory).toBe("function");
    expect(typeof uJualBeli.getJualBeliDetail).toBe("function");
    expect(typeof uJualBeli.getFinancingHistory).toBe("function");
    expect(typeof uJualBeli.submitPengajuan).toBe("function");
    expect(typeof uJualBeli.getPelunasanBillItems).toBe("function");
  });
});
