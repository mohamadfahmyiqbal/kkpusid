import { useState, useEffect, useCallback } from "react";
import api from "../../../../utils/api/common";

export const usePendanaanData = () => {
  const [pengajuanData, setPengajuanData] = useState(null);
  const [hasPengajuan, setHasPengajuan] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPengajuanData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const historyResponse = await api.get("/financing/history");
      if (!historyResponse.data.status) throw new Error(historyResponse.data.message);

      const history = historyResponse.data.data || [];
      
      if (history.length > 0) {
        setHasPengajuan(true);
        // Ambil detail pengajuan terbaru
        const latestId = history[0].id;
        const detailResponse = await api.get(`/financing/detail/${latestId}`);
        
        if (detailResponse.data.status) {
          setPengajuanData(detailResponse.data.data);
        } else {
          setPengajuanData(history[0]); // fallback
        }
      } else {
        setHasPengajuan(false);
        setPengajuanData(null);
      }
    } catch (err) {
      console.error("[usePendanaanData]", err);
      setError("Gagal memuat data pendanaan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPengajuanData();
  }, [fetchPengajuanData]);

  return {
    pengajuanData,
    hasPengajuan,
    loading,
    error,
    refreshData: fetchPengajuanData,
  };
};
