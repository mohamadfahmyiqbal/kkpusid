import { describe, expect, test } from "vitest";
import {
  normalizeRegistrationData,
  validateRegistration,
  validateStep,
} from "./registrationFormHelpers";

const validRegistration = {
  nik_ktp: "3273010101010001",
  full_name: "Budi Santoso",
  alamat_ktp: "Jl. Merdeka No. 1",
  province_id: "32",
  city_id: "3273",
  district_id: "3273010",
  subdistrict_id: "3273010001",
  tipeAnggota: "5",
  phone_number: "081234567890",
  email: "budi@example.com",
  foto_ktp: "data:image/jpeg;base64,QUJDRA==",
  foto_swafoto: "data:image/jpeg;base64,QUJDRA==",
  occupation: "Wiraswasta",
  employer_name: "Usaha Budi",
  employer_address: "Bandung",
  contact_name: "Siti",
  phone_number_emergency: "081298765432",
  relation: "Saudara",
  bank_name: "Bank Mandiri",
  bank_account_no: "1234567890",
  account_holder: "Budi Santoso",
};

describe("registrationFormHelpers", () => {
  test("menerima pendaftaran lengkap yang valid", () => {
    expect(validateRegistration(validRegistration)).toEqual({
      errors: {},
      firstInvalidStep: null,
    });
  });

  test("menolak format NIK, telepon, foto, dan rekening yang tidak valid", () => {
    expect(
      validateStep(1, { ...validRegistration, nik_ktp: "12abc" }).nik_ktp,
    ).toBeTruthy();
    expect(
      validateStep(2, { ...validRegistration, phone_number: "12345" })
        .phone_number,
    ).toBeTruthy();
    expect(
      validateStep(3, { ...validRegistration, foto_ktp: "base64-mentah" })
        .foto_ktp,
    ).toBeTruthy();
    expect(
      validateStep(7, { ...validRegistration, bank_account_no: "123" })
        .bank_account_no,
    ).toBeTruthy();
  });

  test("mengembalikan langkah invalid pertama untuk navigasi submit", () => {
    const result = validateRegistration({
      ...validRegistration,
      full_name: "",
      bank_name: "",
    });
    expect(result.firstInvalidStep).toBe(1);
    expect(result.errors.full_name).toBeTruthy();
    expect(result.errors.bank_name).toBeTruthy();
  });

  test("merapikan spasi tanpa mengubah digit rekening", () => {
    expect(
      normalizeRegistrationData({
        full_name: "  Budi  ",
        bank_account_no: " 00123456 ",
      }),
    ).toEqual({
      full_name: "Budi",
      bank_account_no: "00123456",
    });
  });
});
