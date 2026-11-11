import { describe, it, expect, vi } from "vitest";
import uAuth from "./UAuth";
import uAnggota from "./UAnggota";
import uBilling from "./UBilling";
import uInvestasi from "./UInvestasi";
import uProgram from "./UProgram";
import uSavings from "./USavings";
import uSimpanan from "./USimpanan";
import uGlobal from "./UGlobal";
import uNotification from "./UNotification";
import http from "./common";

// Mock axios instance from common
vi.mock("./common", () => ({
  default: {
    get: vi.fn(() => Promise.resolve({ data: { success: true } })),
    post: vi.fn(() => Promise.resolve({ data: { success: true } })),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  },
}));

describe("API Client Services Suite", () => {
  it("UAuth exposes all necessary auth methods", async () => {
    expect(typeof uAuth.accountLogin).toBe("function");
    expect(typeof uAuth.accountRegister).toBe("function");
    expect(typeof uAuth.getProfile).toBe("function");
    expect(typeof uAuth.logout).toBe("function");

    await uAuth.accountLogin({ username: "test" });
    expect(http.post).toHaveBeenCalledWith("/auth/accountLogin", { username: "test" });
  });

  it("UAnggota exposes member registration and status methods", async () => {
    expect(typeof uAnggota.submitRegistration).toBe("function");
    expect(typeof uAnggota.getRegistrationStatus).toBe("function");
    expect(typeof uAnggota.getProfile).toBe("function");
    expect(typeof uAnggota.daftarAnggota).toBe("function");

    await uAnggota.getRegistrationStatus();
    expect(http.get).toHaveBeenCalledWith("/anggota/getRegistrationStatus");
  });

  it("UBilling handles pending bills and payments", async () => {
    expect(typeof uBilling.getPendingBills).toBe("function");
    expect(typeof uBilling.createMidtransTransaction).toBe("function");
    expect(typeof uBilling.submitManualPayment).toBe("function");

    await uBilling.getPendingBills({ page: 1 });
    expect(http.get).toHaveBeenCalledWith("/billing/list/pending", { params: { page: 1 } });
  });

  it("UInvestasi handles portfolio and orders", async () => {
    expect(typeof uInvestasi.getPortofolioSummary).toBe("function");
    expect(typeof uInvestasi.submitOrder).toBe("function");

    await uInvestasi.getPortofolioSummary();
    expect(http.get).toHaveBeenCalledWith("/investasi/portofolio/summary");
  });

  it("USimpanan handles account detail and withdrawal requests", async () => {
    expect(typeof uSimpanan.getAccountDetail).toBe("function");
    expect(typeof uSimpanan.requestWithdrawal).toBe("function");

    await uSimpanan.getAccountDetail("SS_SUKARELA");
    expect(http.get).toHaveBeenCalledWith("/simpanan/account-detail", { params: { category: "SS_SUKARELA" } });
  });

  it("UGlobal exposes wilayah regions and financial summary", async () => {
    expect(typeof uGlobal.getFinancialSummary).toBe("function");
    expect(typeof uGlobal.getProvinces).toBe("function");

    await uGlobal.getProvinces();
    expect(http.get).toHaveBeenCalledWith("/regions/provinces");
  });

  it("UNotification handles notifications and read status", async () => {
    expect(typeof uNotification.getNotifications).toBe("function");
    expect(typeof uNotification.markAsRead).toBe("function");

    await uNotification.markAsRead("123");
    expect(http.post).toHaveBeenCalledWith("/notifikasi/update-status", { id: ["123"] });
  });

  it("UProgram and USavings expose their respective services", async () => {
    expect(typeof uProgram.getLoanProducts).toBe("function");
    expect(typeof uSavings.getSavingsSummary).toBe("function");

    await uProgram.getLoanProducts();
    expect(http.get).toHaveBeenCalledWith("/program/pinjaman/produk");
  });
});
