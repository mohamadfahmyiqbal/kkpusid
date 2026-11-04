import { describe, it, expect } from "vitest";
import { formatCurrency, buildSummaryData } from "./components/arisanHelpers";

describe("Program Arisan Helpers", () => {
  it("formats IDR currency accurately", () => {
    const formatted = formatCurrency(5000000);
    expect(formatted).toContain("5.000.000");
  });

  it("builds summary data correctly for valid arisan data", () => {
    const dummyArisan = {
      category: "Arisan Emas",
      target_amount: 10000000,
      monthly_contribution: 1000000,
      participant_count: 5,
      max_participants: 10,
      cooperation_months: 10,
    };

    const summary = buildSummaryData(dummyArisan);
    expect(summary["Kategori Arisan"]).toBe("Arisan Emas");
    expect(summary["Jumlah Peserta"]).toBe("5/10 Orang");
    expect(summary["Durasi Program"]).toBe("10 Bulan");
  });

  it("builds placeholder summary for empty/null data", () => {
    const summary = buildSummaryData(null);
    expect(summary["Kategori Arisan"]).toBe("-");
    expect(summary["Jumlah Peserta"]).toBe("-");
  });
});
