// Auth feature constants

export const UI_CONSTANTS = {
  FORM_COL_MD: 8,
  FORM_COL_LG: 5,
  LOGO_HEIGHT_PX: 40,
};

export const AUTH_CONSTANTS = {
  // UI Layout
  HEADER_OFFSET_PX: 96,
  HEADER_BUFFER_PX: 16,

  // Timing
  REDIRECT_DELAY_MS: 2000,

  // Validation
  NIK_LENGTH: 16,
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 13,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 3,

  // Cache
  VAPID_CACHE_KEY: "vapid_public_key",
  VAPID_CACHE_DURATION_MS: 24 * 60 * 60 * 1000, // 24 hours

  // Messages
  PLACEHOLDERS: {
    NAME: "Masukkan nama lengkap",
    NIK: "16 Digit NIK",
    PHONE: "0812...",
    EMAIL: "nama@email.com",
    PASSWORD: "Minimal 8 karakter, huruf besar & kecil, angka",
    EMAIL_OR_PHONE: "Masukkan Email atau Nomor HP",
    LOGIN_PASSWORD: "Masukkan Password",
    OTP_CODE: "Masukkan kode OTP (6 digit)",
    NEW_PASSWORD: "Masukkan password baru",
    CONFIRM_PASSWORD: "Konfirmasi password baru",
  },

  // Error Messages
  ERROR_MESSAGES: {
    NAME_REQUIRED: "Nama lengkap wajib diisi",
    NAME_MIN_LENGTH: "Nama minimal 3 karakter",
    NIK_REQUIRED: "NIK KTP wajib diisi",
    NIK_INVALID: "NIK KTP harus 16 digit angka",
    PHONE_REQUIRED: "Nomor WA wajib diisi",
    PHONE_INVALID: "Nomor WA tidak valid (10-13 digit)",
    EMAIL_REQUIRED: "Email wajib diisi",
    EMAIL_INVALID: "Format email tidak valid",
    PASSWORD_REQUIRED: "Password wajib diisi",
    PASSWORD_MIN_LENGTH: "Password minimal 8 karakter",
    PASSWORD_LOWERCASE: "Password harus mengandung huruf kecil",
    PASSWORD_UPPERCASE: "Password harus mengandung huruf besar",
    PASSWORD_NUMBER: "Password harus mengandung angka",
    EMAIL_OR_PHONE_REQUIRED: "Email/Nomor Handphone dan Password wajib diisi",
    EMAIL_OR_PHONE_INVALID: "Format email atau nomor HP tidak valid",
    LOGIN_FAILED: "Login gagal. Silakan coba lagi.",
    SERVER_ERROR: "Terjadi kesalahan saat menghubungi server.",
    OTP_REQUIRED: "Kode OTP wajib diisi",
    OTP_INVALID: "Kode OTP harus 6 digit angka",
    PASSWORD_MISMATCH: "Password baru dan konfirmasi password tidak cocok",
    PASSWORD_STRENGTH:
      "Password harus mengandung huruf besar, kecil, dan angka",
  },

  // Success Messages
  SUCCESS_MESSAGES: {
    REGISTER: "🚀 Registrasi berhasil!",
    NOTIFICATION_ACTIVE: "🔔 Notifikasi aktif!",
    NOTIFICATION_INACTIVE:
      "⚠️ Notifikasi tidak aktif. Anda bisa mengaktifkannya nanti di pengaturan.",
    LOGIN_SUCCESS: "✅ Login berhasil!",
    OTP_SENT: "📧 Kode OTP berhasil dikirim!",
    OTP_VERIFIED: "✅ Kode OTP berhasil diverifikasi!",
    PASSWORD_RESET: "🔒 Password berhasil direset!",
  },
};
