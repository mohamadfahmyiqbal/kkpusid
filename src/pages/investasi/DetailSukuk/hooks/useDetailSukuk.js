import { useState, useCallback } from 'react';
import api from '../../../../utils/api/common';

export const useDetailSukuk = () => {
  const [sukukData, setSukukData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchSukukDetail = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(`/financing/sukuk/detail/${id}`);
      if (response.data.success) {
        const item = response.data.data;
        setSukukData({
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
          description: "Sukuk dengan imbal hasil menarik dan risiko terukur yang dikelola secara profesional sesuai prinsip syariah.",
          riskLevel: "Rendah",
          rating: "AAA",
        });
      } else {
        throw new Error(response.data.message || 'Gagal mengambil detail sukuk');
      }
    } catch (err) {
      console.error('Error fetching sukuk detail:', err);
      setError('Gagal memuat detail sukuk. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitInvestment = async (sukuk_id, nominal) => {
    setSubmitting(true);
    try {
      const response = await api.post('/financing/sukuk/order', {
        sukuk_id,
        nominal
      });
      return response.data;
    } catch (err) {
      console.error('Error submitting investment:', err);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    sukukData,
    loading,
    error,
    submitting,
    fetchSukukDetail,
    submitInvestment
  };
};
