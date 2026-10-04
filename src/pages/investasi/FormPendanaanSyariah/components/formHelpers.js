export const SECTOR_OPTIONS = [
  "Retail",
  "Food & Beverage",
  "Jasa",
  "Manufaktur",
  "Pertanian",
  "Lainnya",
];

export const INITIAL_FORM_DATA = {
  namaUsaha: "",
  pemilikUsaha: "",
  sektor: "",
  alamat: "",
  omsetTahunan: "",
  tujuanPendanaan: "",
  targetDana: "",
  periodeModal: 12,
  omsetKerjasama: "",
  bagiHasil: "",
  buktiKepemilikan: null,
  buktiKerjasama: null,
  filePendukung: null,
  akadAgreed: false,
};

export const formatCurrency = (value) => {
  if (!value) return "";
  return new Intl.NumberFormat("id-ID").format(value);
};

export const parseCurrency = (value) => {
  if (!value) return "";
  return String(value).replace(/\D/g, "");
};

export const calculateProgress = (formData) => {
  const fields = [
    "namaUsaha",
    "pemilikUsaha",
    "alamat",
    "omsetTahunan",
    "tujuanPendanaan",
    "targetDana",
    "bagiHasil",
    "buktiKepemilikan",
    "akadAgreed",
  ];
  const filled = fields.filter((field) => {
    if (field === "akadAgreed") return formData[field];
    if (field === "buktiKepemilikan") return formData[field] !== null;
    return formData[field] && String(formData[field]).trim() !== "";
  }).length;

  return Math.round((filled / fields.length) * 100);
};
