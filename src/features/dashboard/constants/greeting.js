// Time constants untuk greeting
export const TIME_RANGES = {
  MORNING: { start: 5, end: 11, greeting: "Selamat Pagi" },
  DAYTIME: { start: 11, end: 15, greeting: "Selamat Siang" },
  AFTERNOON: { start: 15, end: 19, greeting: "Selamat Sore" },
  EVENING: { start: 19, end: 24, greeting: "Selamat Malam" },
  NIGHT: { start: 0, end: 5, greeting: "Selamat Malam" },
};

// Default greeting
export const DEFAULT_GREETING = "Assalamualaikum";

// User name fallback options
export const USER_NAME_FALLBACKS = [
  "nama",
  "full_name", 
  "name",
  "Pengguna"
];
