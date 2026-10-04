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

export const validateStep = (currentStep, data) => {
  let stepErrors = {};
  if (currentStep === 1) {
    if (!data.nik_ktp || data.nik_ktp.length !== 16)
      stepErrors.nik_ktp = "NIK harus 16 digit.";
    if (!data.full_name) stepErrors.full_name = "Nama lengkap wajib diisi.";
    if (!data.alamat_ktp) stepErrors.alamat_ktp = "Alamat wajib diisi.";
    if (!data.province_id) stepErrors.province_id = "Provinsi wajib dipilih.";
    if (!data.city_id) stepErrors.city_id = "Kota/Kabupaten wajib dipilih.";
    if (!data.district_id)
      stepErrors.district_id = "Kecamatan wajib dipilih.";
    if (!data.subdistrict_id)
      stepErrors.subdistrict_id = "Kelurahan wajib dipilih.";
  }
  if (currentStep === 2) {
    if (!data.tipeAnggota)
      stepErrors.tipeAnggota = "Tipe anggota wajib dipilih.";
    if (!data.phone_number) stepErrors.phone_number = "Nomor HP wajib diisi.";
    if (!data.email) stepErrors.email = "Email wajib diisi.";
  }
  if (currentStep === 3 && !data.foto_ktp) {
    stepErrors.foto_ktp = "Foto KTP wajib diambil.";
  }
  if (currentStep === 4 && !data.foto_swafoto) {
    stepErrors.foto_swafoto = "Swafoto wajib diambil.";
  }
  if (currentStep === 5) {
    if (!data.occupation) stepErrors.occupation = "Pekerjaan wajib diisi.";
    if (!data.employer_name)
      stepErrors.employer_name = "Nama tempat bekerja wajib diisi.";
    if (!data.employer_address)
      stepErrors.employer_address = "Alamat tempat bekerja wajib diisi.";
  }
  if (currentStep === 6) {
    if (!data.contact_name)
      stepErrors.contact_name = "Nama kontak darurat wajib diisi.";
    if (!data.phone_number_emergency)
      stepErrors.phone_number_emergency =
        "No. HP kontak darurat wajib diisi.";
    if (!data.relation) stepErrors.relation = "Hubungan wajib diisi.";
  }
  if (currentStep === 7) {
    if (!data.bank_name) stepErrors.bank_name = "Nama bank wajib diisi.";
    if (!data.bank_account_no)
      stepErrors.bank_account_no = "Nomor rekening wajib diisi.";
    if (!data.account_holder)
      stepErrors.account_holder = "Nama pemilik rekening wajib diisi.";
  }
  return stepErrors;
};
