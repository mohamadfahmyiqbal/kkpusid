// src/pages/simpanan/PenarikanSimpananPage/hooks/useWithdrawalValidation.js
export const useWithdrawalValidation = () => {
  const validate = (data) => {
    const { amount, balance, minAmount, method, bankAccount, cashDetails } =
      data;

    if (!amount || amount < minAmount)
      return `Minimal penarikan Rp ${minAmount.toLocaleString("id-ID")}`;
    if (amount > balance) return "Saldo tidak mencukupi.";

    if (method === "TRANSFER" && !bankAccount)
      return "Data rekening bank belum lengkap.";

    if (method === "TUNAI") {
      if (!cashDetails?.cashName?.trim()) return "Nama penerima harus diisi.";
      if (!cashDetails?.cashLocation?.trim())
        return "Lokasi pengambilan harus diisi.";
    }

    return null;
  };

  return { validate };
};
