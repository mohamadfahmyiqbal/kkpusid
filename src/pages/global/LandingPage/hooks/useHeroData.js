import { useState, useEffect } from "react";
import UGlobal from "../../../../utils/api/UGlobal";

// Data fallback (teks default jika API gagal)
const FALLBACK_DATA = {
  title: ["Muamalah", "Syar'i", "Berkah Hakiki"],
  subtitle:
    "Bertekad untuk melaksanakan muamalah syar’i sesuai Al-Qur’an, Al-Hadits, serta ijma’ para Salafush Shalih.",
};

export const useHeroData = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await UGlobal.getLandingText();
        const data = response?.data?.data ?? response?.data ?? {};
        const formattedTitle = [
          data?.title_line1,
          data?.title_line2,
          data?.title_line3,
        ].filter((line) => String(line ?? "").trim().length > 0);

        setHeroData({
          title: formattedTitle.length > 0 ? formattedTitle : FALLBACK_DATA.title,
          subtitle: data?.subtitle || FALLBACK_DATA.subtitle,
        });
        setError(null); // Reset error on success
      } catch (err) {
        // Jika API gagal, gunakan data fallback
        setHeroData(FALLBACK_DATA);
        setError(err.message || "Gagal memuat data hero");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  return { heroData, loading, error };
};
