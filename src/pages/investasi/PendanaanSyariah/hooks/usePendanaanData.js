import { useState, useEffect, useCallback, useRef } from "react";
import api from "../../../../utils/api/common";

export const usePendanaanData = () => {
  const [pengajuanData, setPengajuanData] = useState(null);
  const [hasPengajuan, setHasPengajuan] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const fetchPengajuanData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const historyResponse = await api.get("/financing/history");
      if (!isMountedRef.current) return;

      if (!historyResponse.data.status) throw new Error(historyResponse.data.message);

      const history = historyResponse.data.data || [];

      if (history.length > 0) {
        setHasPengajuan(true);
        // Ambil detail pengajuan terbaru
        const latestId = history[0].financing_id || history[0].id;
        const detailResponse = await api.get(`/financing/detail/${latestId}`);

        if (!isMountedRef.current) return;

        if (detailResponse.data.status && detailResponse.data.data) {
          setPengajuanData(detailResponse.data.data);
        } else {
          // Fallback hanya jika detail gagal tapi history tersedia
          setPengajuanData(history[0]);
        }
      } else {
        setHasPengajuan(false);
        setPengajuanData(null);
      }
    } catch (err) {
      if (!isMountedRef.current) return;
      console.error("[usePendanaanData]", err);
      setError("Gagal memuat data pendanaan. Silakan coba lagi.");
    } finally {
      if (isMountedRef.current) setLoading(false);
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
