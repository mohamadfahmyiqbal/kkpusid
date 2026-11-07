// Design tokens — pusat kebenaran visual (SR-03, HI-01, ME-01, ME-02)
// Semua elemen UI harus merujuk ke file ini, bukan hardcode nilai.
// Catatan: tidak ada PII atau secret di sini.

export const colors = {
  // Brand (dari identitas visual koperasi PUS)
  primary: "#13547A",
  primaryDark: "#0E3F5C",
  secondary: "#44938A",
  secondaryDark: "#2E7068",

  // Semantik
  success: "#198754",
  warning: "#FFC107",
  danger: "#DC3545",
  info: "#0DCAF0",
  light: "#F8F9FA",
  dark: "#212529",

  // Teks
  textPrimary: "#212529",
  textSecondary: "#6C757D",
  textWhite: "#FFFFFF",
  textMuted: "#ADB5BD",
  textDark: "#475569",

  // Latar belakang
  bgPrimary: "#13547A",
  bgGradient:
    "linear-gradient(164deg, #13547A 0%, #44938A 78%)",
  bgSplash:
    "linear-gradient(180deg, #13547A 0%, #80D0C7 100%)",
  bgCard: "rgba(255,255,255,0.1)",
  bgCardLight: "rgba(255,255,255,0.06)",

  // Border & outline
  borderDefault: "#DEE2E6",
  borderFocus: "#0DCAF0",

  // Lainnya
  overlayDark: "rgba(0,0,0,0.3)",
};

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  xxl: "3rem",
};

export const borderRadius = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  pill: "9999px",
};

export const iconSize = {
  sm: 16,
  md: 24,
  lg: 32,
};

export const typography = {
  fontFamily:
    "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
  fontSizeBase: "1rem",
  lineHeightBase: "1.5",
  lineHeightReadable: "1.8",
  heading: {
    h1: "2.5rem",
    h2: "2rem",
    h3: "1.75rem",
    h4: "1.5rem",
    h5: "1.25rem",
    h6: "1rem",
  },
};

export const shadow = {
  sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
};

export const transition = {
  fast: "0.15s ease",
  normal: "0.3s ease",
  slow: "0.5s ease",
};

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};
