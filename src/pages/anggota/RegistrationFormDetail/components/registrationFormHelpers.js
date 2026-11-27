export const TOTAL_STEPS = 8;

export const STEP_LABELS = [
  "Data Pribadi",
  "Akun & Kontak",
  "Foto KTP",
  "Swafoto",
  "Pekerjaan",
  "Kontak Darurat",
  "Rekening Bank",
  "Ringkasan",
];

export const FIELD_STEP_MAP = {
  nik_ktp: 1,
  full_name: 1,
  alamat_ktp: 1,
  province_id: 1,
  city_id: 1,
  district_id: 1,
  subdistrict_id: 1,
  tipeAnggota: 2,
  phone_number: 2,
  email: 2,
  foto_ktp: 3,
  foto_swafoto: 4,
  occupation: 5,
  employer_name: 5,
  employer_address: 5,
  contact_name: 6,
  phone_number_emergency: 6,
  relation: 6,
  bank_name: 7,
  bank_account_no: 7,
  account_holder: 7,
};

const hasValue = (value) => String(value || "").trim().length > 0;
const isPhoneNumber = (value) =>
  /^(?:\+62|62|0)8\d{7,12}$/.test(String(value || "").replace(/[\s-]/g, ""));
const isEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
const isImageDataUrl = (value) =>
  /^data:image\/(?:jpeg|jpg|png);base64,[A-Za-z0-9+/=]+$/i.test(
    String(value || ""),
  );

export const normalizeRegistrationData = (data) => {
  const normalized = { ...data };
  [
    "nik_ktp",
    "full_name",
    "alamat_ktp",
    "rt",
    "rw",
    "phone_number",
    "email",
    "occupation",
    "employer_name",
    "employer_address",
    "contact_name",
    "phone_number_emergency",
    "relation",
    "bank_name",
    "bank_account_no",
    "account_holder",
  ].forEach((field) => {
    if (typeof normalized[field] === "string")
      normalized[field] = normalized[field].trim();
  });
  return normalized;
};

export const validateStep = (currentStep, rawData) => {
  const data = normalizeRegistrationData(rawData);
  const stepErrors = {};

  if (currentStep === 1) {
    if (!/^\d{16}$/.test(data.nik_ktp || ""))
      stepErrors.nik_ktp = "NIK harus terdiri dari 16 digit angka.";
    if (!hasValue(data.full_name))
      stepErrors.full_name = "Nama lengkap wajib diisi.";
    if (!hasValue(data.alamat_ktp))
      stepErrors.alamat_ktp = "Alamat wajib diisi.";
    if (!data.province_id) stepErrors.province_id = "Provinsi wajib dipilih.";
    if (!data.city_id) stepErrors.city_id = "Kota/Kabupaten wajib dipilih.";
    if (!data.district_id) stepErrors.district_id = "Kecamatan wajib dipilih.";
    if (!data.subdistrict_id)
      stepErrors.subdistrict_id = "Kelurahan wajib dipilih.";
  }
  if (currentStep === 2) {
    if (!["5", "6"].includes(String(data.tipeAnggota || "")))
      stepErrors.tipeAnggota = "Pilih tipe anggota yang tersedia.";
    if (!isPhoneNumber(data.phone_number))
      stepErrors.phone_number =
        "Masukkan nomor WhatsApp/HP Indonesia yang valid.";
    if (!isEmail(data.email)) stepErrors.email = "Alamat email tidak valid.";
  }
  if (currentStep === 3 && !isImageDataUrl(data.foto_ktp))
    stepErrors.foto_ktp = "Foto KTP yang valid wajib diambil.";
  if (currentStep === 4 && !isImageDataUrl(data.foto_swafoto))
    stepErrors.foto_swafoto = "Swafoto yang valid wajib diambil.";
  if (currentStep === 5) {
    if (!hasValue(data.occupation))
      stepErrors.occupation = "Pekerjaan wajib diisi.";
    if (!hasValue(data.employer_name))
      stepErrors.employer_name = "Nama tempat bekerja wajib diisi.";
    if (!hasValue(data.employer_address))
      stepErrors.employer_address = "Alamat tempat bekerja wajib diisi.";
  }
  if (currentStep === 6) {
    if (!hasValue(data.contact_name))
      stepErrors.contact_name = "Nama kontak darurat wajib diisi.";
    if (!isPhoneNumber(data.phone_number_emergency))
      stepErrors.phone_number_emergency =
        "Masukkan nomor HP kontak darurat yang valid.";
    if (!hasValue(data.relation)) stepErrors.relation = "Hubungan wajib diisi.";
  }
  if (currentStep === 7) {
    if (!hasValue(data.bank_name))
      stepErrors.bank_name = "Nama bank wajib diisi.";
    if (!/^\d{6,25}$/.test(data.bank_account_no || ""))
      stepErrors.bank_account_no =
        "Nomor rekening harus terdiri dari 6–25 digit angka.";
    if (!hasValue(data.account_holder))
      stepErrors.account_holder = "Nama pemilik rekening wajib diisi.";
  }
  return stepErrors;
};

export const validateRegistration = (data) => {
  const errors = {};
  let firstInvalidStep = null;
  for (let step = 1; step < TOTAL_STEPS; step += 1) {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length && firstInvalidStep === null)
      firstInvalidStep = step;
    Object.assign(errors, stepErrors);
  }
  return { errors, firstInvalidStep };
};
