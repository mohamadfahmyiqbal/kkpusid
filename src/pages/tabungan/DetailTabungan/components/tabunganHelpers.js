import React from "react";
import { FaKaaba, FaGraduationCap, FaUtensils } from "react-icons/fa";

// Product configurations
export const TABUNGAN_CONFIG = {
  haji: {
    label: "Tabungan Haji",
    icon: <FaKaaba size={32} />,
    color: "success",
  },
  umrah: {
    label: "Tabungan Umrah",
    icon: <FaKaaba size={32} />,
    color: "primary",
  },
  pendidikan: {
    label: "Tabungan Pendidikan",
    icon: <FaGraduationCap size={32} />,
    color: "info",
  },
  qurban: {
    label: "Tabungan Qurban",
    icon: <FaUtensils size={32} />,
    color: "warning",
  },
};

export const normalizeBankName = (bankName) => {
  if (!bankName) return "Bank Syariah Indonesia";
  const name = bankName.toLowerCase();
  if (name.includes("syariah") || name.includes("bsi")) return "Bank Syariah Indonesia";
  if (name.includes("mandiri")) return "Bank Mandiri";
  if (name.includes("bca") || name.includes("central asia")) return "BCA";
  if (name.includes("bri") || name.includes("rakyat indonesia")) return "BRI";
  if (name.includes("bni") || name.includes("negara indonesia")) return "BNI";
  return "Bank Syariah Indonesia";
};

export const formatCurrency = (value) => {
  if (value === undefined || value === null) return "0";
  return new Intl.NumberFormat("id-ID").format(value);
};

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
