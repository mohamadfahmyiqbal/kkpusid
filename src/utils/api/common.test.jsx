import { describe, it, expect } from "vitest";
import { getCookie } from "./common";

describe("common api helper", () => {
  it("getCookie retrieves cookie by name correctly", () => {
    Object.defineProperty(document, "cookie", {
      writable: true,
      value: "XSRF-TOKEN=test-csrf-token-123; other=val",
    });

    expect(getCookie("XSRF-TOKEN")).toBe("test-csrf-token-123");
    expect(getCookie("other")).toBe("val");
    expect(getCookie("nonexistent")).toBeNull();
  });
});
