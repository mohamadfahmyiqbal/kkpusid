// Regresi: saat pengguna mengetik untuk memperbaiki field yang error,
// fokus tidak boleh berpindah sendiri ke field error lain. Fokus hanya
// boleh berpindah sebagai reaksi satu-kali terhadap aksi Next/Submit yang
// diblokir validasi (lihat plan perbaikan handler validasi 2026-11-28).
import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

vi.mock("../hooks/useProfile", () => ({
  useProfile: () => ({ userData: null }),
}));

vi.mock("../services/AnggotaService", () => ({
  default: { submitRegistration: vi.fn() },
}));

vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn(() => Promise.resolve()) },
}));

vi.mock("../../../../utils/api/UGlobal", () => ({
  default: {
    getProvinces: vi.fn(() => Promise.resolve({ data: [] })),
    getRegencies: vi.fn(() => Promise.resolve({ data: [] })),
    getDistricts: vi.fn(() => Promise.resolve({ data: [] })),
    getVillages: vi.fn(() => Promise.resolve({ data: [] })),
  },
}));

import RegistrationFormDetail from "./RegistrationFormDetail";

const renderForm = () =>
  render(
    <MemoryRouter>
      <RegistrationFormDetail />
    </MemoryRouter>,
  );

// Catatan: `Form.Label` pada Step1PersonalData.jsx tidak memiliki atribut
// `htmlFor`, sehingga `getByLabelText` tidak dapat menemukan kontrolnya
// (masalah aksesibilitas pre-existing, di luar scope plan perbaikan
// fokus/validasi ini). Gunakan id elemen yang sudah dipakai oleh
// `requestFocus` sebagai selector yang stabil.
const getNikInput = () => document.getElementById("registration-nik_ktp");
const getFullNameInput = () =>
  document.getElementById("registration-full_name");

beforeEach(() => {
  // Catatan: Node >=22 menyediakan `localStorage` bawaan (stage stable di
  // Node 25 pada sandbox CI ini) yang menimpa `window.localStorage` milik
  // jsdom dengan objek tanpa method `clear()`. Tidak ada kode di bawah
  // pengujian ini yang membaca localStorage sebelum render, jadi reset
  // dilakukan secara defensif saja dan diabaikan bila API tidak tersedia.
  if (typeof window.localStorage?.clear === "function") {
    window.localStorage.clear();
  }
});

describe("RegistrationFormDetail - lifecycle validasi/fokus", () => {
  test("klik Selanjutnya dengan step kosong menampilkan error dan memfokuskan field pertama yang invalid", async () => {
    renderForm();

    await userEvent.click(screen.getByRole("button", { name: /Selanjutnya/i }));

    const nikInput = getNikInput();
    await waitFor(() => expect(nikInput).toHaveFocus());
    expect(
      screen.getByText("NIK harus terdiri dari 16 digit angka."),
    ).toBeInTheDocument();
  });

  test("mengetik pada field yang error tidak memindahkan fokus ke field error lain", async () => {
    renderForm();

    // Blokir step 1 (semua field wajib kosong) agar beberapa error tampil.
    await userEvent.click(screen.getByRole("button", { name: /Selanjutnya/i }));

    const nikInput = getNikInput();
    await waitFor(() => expect(nikInput).toHaveFocus());

    // Mulai mengetik pada field full_name yang juga error, pastikan fokus
    // tidak berpindah akibat error full_name hilang atau error lain berubah.
    const fullNameInput = getFullNameInput();
    fullNameInput.focus();
    await userEvent.type(fullNameInput, "Budi Santoso");

    expect(fullNameInput).toHaveFocus();
  });

  test("validateStep blur yang valid tidak menyisakan error field tersebut", async () => {
    renderForm();

    const fullNameInput = getFullNameInput();
    await userEvent.type(fullNameInput, "Budi Santoso");
    fullNameInput.blur();

    await waitFor(() =>
      expect(
        screen.queryByText("Nama lengkap wajib diisi."),
      ).not.toBeInTheDocument(),
    );
  });
});
