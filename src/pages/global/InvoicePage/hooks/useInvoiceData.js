import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import UBilling from "../../../../utils/api/UBilling";
import UJualBeli from "../../../../utils/api/UJualBeli";
import { jwtDecodePage } from "../../../../utils/helpers";

export const useInvoiceData = () => {
  const { token } = useParams();
  const pollingRef = useRef(null);

  // 1. Dekode data dari JWT
  const params = useMemo(() => {
    const payload = token ? jwtDecodePage(token) : {};
    let ids = payload.billItemIds || payload.billIds || [];
    return {
      billItemIds: Array.isArray(ids) ? ids : [ids],
      billId: payload.billId || null,
      returnPage: payload.return || "dashboard",
      category:
        payload.financing_id || payload.category === "FINANCING"
          ? "FINANCING"
          : payload.category || "GENERAL",
      financingId: payload.financingId || payload.financing_id,
      registrationId: payload.registrationId,
      categoryName: payload.categoryName,
      originalReturn: payload.originalReturn,
      status: payload.status || null,
      product: payload.product || null,
      productName: payload.productName || null,
      amount: payload.amount || null,
    };
  }, [token]);

  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const [dynamicBillId, setDynamicBillIdState] = useState(params.billId);
  const dynamicBillIdRef = useRef(dynamicBillId);
  const [dynamicOrderId, setDynamicOrderId] = useState(null);

  const setDynamicBillId = useCallback((id) => {
    dynamicBillIdRef.current = id;
    setDynamicBillIdState(id);
  }, []);

  const fetchBillDetail = useCallback(
    async (isPolling = false) => {
      try {
        const currentBillId = dynamicBillIdRef.current;
        if (currentBillId) {
          const response = await UBilling.getInvoiceDetail(null, currentBillId);
          if (response.data?.status) {
            const newData = response.data.data;
            setBillData(newData);

            if (newData.status === "PAID") {
              stopPolling();
              if (isPolling) {
                window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
                window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
              }
            }
          }
        } else if (params.billItemIds.length > 0) {
          const response = await UBilling.getInvoiceDetail(
            params.billItemIds,
            null
          );
          if (response.data?.status) {
            const newData = response.data.data;
            setBillData(newData);

            if (newData.status === "PAID") {
              stopPolling();
              if (isPolling) {
                window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
                window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
              }
            }
          }
        } else if (params.financingId) {
          const res = await UJualBeli.getFinancingDetail(params.financingId);
          if (res.data?.status) {
            const detail = res.data.data;
            const installmentAmount = detail.cooperation_months
              ? Math.ceil(
                  (detail.item_price - (detail.down_payment || 0)) /
                    detail.cooperation_months,
                )
              : detail.amount || 0;

            const isPelunasan = detail?.category?.toLowerCase().includes('pelunasan') || detail?.item_name?.toLowerCase().includes('pelunasan');
            const finalAmount = isPelunasan ? (params.amount || detail.total_tagihan) : (installmentAmount > 0 ? installmentAmount : 0.01);

            const mappedData = {
              full_name: detail?.member?.full_name || "Anggota",
              member_no: detail?.member?.member_code || "ID Registrasi",
              invoice_no: `FIN/${detail.financing_id?.substring(0, 8) || "000"}/${new Date().getFullYear()}`,
              createdAt: detail.createdAt || detail.created_at || new Date().toISOString(),
              details: isPelunasan && detail.discount > 0 ? [
                {
                  description: "Total Tagihan Pelunasan",
                  amount: parseFloat(detail.total_tagihan) + parseFloat(detail.discount),
                },
                {
                  description: "Diskon Pelunasan",
                  amount: -parseFloat(detail.discount),
                }
              ] : [
                {
                  description: isPelunasan ? "Pembayaran Pelunasan Jual Beli" : "Down Payment / Cicilan Pembiayaan",
                  amount: finalAmount,
                },
              ],
              status: (detail.status === "PAID" || detail.status === "COMPLETED" || detail.settlement_time) ? "PAID" : "UNPAID",
              member_id: detail?.member?.id,
              payment_type: detail.transactions?.[0]?.payment_type || detail.payment_type,
              settlement_time: detail.transactions?.[0]?.settlement_time || detail.settlement_time
            };
            setBillData(mappedData);

            if (detail.status === "PAID" || detail.status === "COMPLETED" || detail.settlement_time) {
              stopPolling();
              if (isPolling) {
                window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
                window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
              }
            }
          }
        }
      } catch (err) {
        console.error("Fetch invoice error:", err);
        if (!isPolling) setError("Gagal mengambil data invoice.");
      } finally {
        if (!isPolling) setLoading(false);
      }
    },
    [params, stopPolling]
  );

  const startPolling = useCallback(() => {
    if (pollingRef.current) return;
    // Panggil fetchBillDetail sekali sebelum interval
    fetchBillDetail(true);
    pollingRef.current = setInterval(() => fetchBillDetail(true), 3000);
  }, [fetchBillDetail]);

  useEffect(() => {
    fetchBillDetail();
    return () => stopPolling();
  }, [fetchBillDetail, stopPolling]);

  const totalAmount = useMemo(() => {
    const amount =
      billData?.details?.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0,
      ) || 0;
    return amount > 0 ? amount : 0.01;
  }, [billData]);

  return {
    ...params,
    billData,
    loading,
    error,
    totalAmount,
    startPolling,
    stopPolling,
    refreshData: fetchBillDetail,
    setDynamicBillId,
  };
};
