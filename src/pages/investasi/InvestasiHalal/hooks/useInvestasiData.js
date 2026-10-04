import { useState, useEffect, useCallback } from 'react';
import api from '../../../../utils/api/common';

export const useInvestasiData = () => {
  const [sukukList, setSukukList] = useState([]);
  const [portofolioList, setPortofolioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSukukList = useCallback(async () => {
    try {
      const response = await api.get('/financing/sukuk/catalog');
      if (response.data.success) {
        const mappedList = response.data.data.map(item => ({
          id: item.issue_id,
          name: item.issue_name,
          issuer: item.issuer,
          type: item.type,
          coupon: item.coupon,
          startDate: item.start_date,
          maturity: item.end_date,
          totalAmount: item.total_amount,
          minInvestment: item.min_investment,
          price: item.price,
          status: item.status,
        }));
        setSukukList(mappedList);
      } else {
        throw new Error(response.data.message || 'Gagal mengambil data katalog sukuk');
      }
    } catch (err) {
      console.error('Error fetching sukuk catalog:', err);
      throw err;
    }
  }, []);

  const fetchPortofolioList = useCallback(async () => {
    try {
      const response = await api.get('/financing/sukuk/portfolio');
      if (response.data.success) {
        setPortofolioList(response.data.data);
      } else {
        throw new Error(response.data.message || 'Gagal mengambil data portofolio sukuk');
      }
    } catch (err) {
      console.error('Error fetching sukuk portfolio:', err);
      throw err;
    }
  }, []);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([fetchSukukList(), fetchPortofolioList()]);
    } catch (err) {
      setError('Gagal memuat data investasi. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  }, [fetchSukukList, fetchPortofolioList]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return {
    sukukList,
    portofolioList,
    loading,
    error,
    refreshData: loadAllData,
  };
};
