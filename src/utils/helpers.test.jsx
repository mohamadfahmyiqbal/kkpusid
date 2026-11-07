import { describe, it, expect, vi } from "vitest";
import {
  jwtEncode,
  jwtDecodePage,
  requiresAuth,
  getPageFromToken,
} from "./helpers";

describe("Route Helpers (JWT routing)", () => {
  it("jwtEncode menghasilkan format header.payload.", () => {
    const token = jwtEncode({ page: "dashboard" });
    expect(typeof token).toBe("string");
    const parts = token.split(".");
    expect(parts.length).toBe(3);
    expect(parts[2]).toBe(""); // ends with trailing dot
  });

  it("jwtDecodePage berhasil menguraikan token yang valid", () => {
    const token = jwtEncode({ page: "simpanan", userId: 123 });
    const decoded = jwtDecodePage(token);

    expect(decoded).not.toBeNull();
    expect(decoded.page).toBe("simpanan");
    expect(decoded.userId).toBe(123);
    expect(decoded._valid).toBe(true);
  });

  it("jwtDecodePage mengembalikan null untuk token tidak valid", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(jwtDecodePage("")).toBeNull();
    expect(jwtDecodePage(null)).toBeNull();
    expect(jwtDecodePage(undefined)).toBeNull();
    expect(jwtDecodePage("invalid.format")).toBeNull();
    warnSpy.mockRestore();
  });

  it("getPageFromToken mengembalikan nama halaman dari token valid", () => {
    const token = jwtEncode({ page: "profile" });
    expect(getPageFromToken(token)).toBe("profile");
  });

  it("requiresAuth mengidentifikasi rute publik dan terproteksi dengan tepat", () => {
    expect(requiresAuth("landingPage")).toBe(false);
    expect(requiresAuth("authLogin")).toBe(false);
    expect(requiresAuth("authForgotPassword")).toBe(false);
    expect(requiresAuth("dashboard")).toBe(true);
    expect(requiresAuth("tabungan")).toBe(true);
  });
});
