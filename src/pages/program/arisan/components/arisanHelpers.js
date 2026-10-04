export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://localhost:3445/api";

export const getApiUrl = (endpoint) => {
  const base = API_BASE_URL.endsWith("/api")
    ? API_BASE_URL
    : `${API_BASE_URL}/api`;
  return `${base}/${endpoint}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

export const buildSummaryData = (arisanData) => {
  if (!arisanData) {
    return {
      "Kategori Arisan": "-",
      "Target Nominal": "Rp -",
      "Setoran per Bulan": "Rp -",
      "Jumlah Peserta": "-",
      "Durasi Program": "-",
    };
  }

  return {
    "Kategori Arisan": arisanData.category || "-",
    "Target Nominal": formatCurrency(arisanData.target_amount),
    "Setoran per Bulan": formatCurrency(arisanData.monthly_contribution),
    "Jumlah Peserta": `${arisanData.participant_count || 0}/${arisanData.max_participants || 0} Orang`,
    "Durasi Program": `${arisanData.cooperation_months || 0} Bulan`,
  };
};
