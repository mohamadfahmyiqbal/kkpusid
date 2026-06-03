import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import UBilling from "../../../../utils/api/UBilling";
import UTransaksi from "../../../../utils/api/UTransaksi";
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
      financingId: payload.financing_id,
      registrationId: payload.registrationId,
      categoryName: payload.categoryName,
      originalReturn: payload.originalReturn,
      status: payload.status || null,
      product: payload.product || null,
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

  const fetchBillDetail = useCallback(
    async (isPolling = false) => {
      try {
        if (params.financingId) {
          const res = await UTransaksi.getFinancingDetail(params.financingId);
          if (res.data?.status) {
            const detail = res.data.data;
            const installmentAmount = detail.cooperation_months
              ? Math.ceil(
                  (detail.item_price - (detail.down_payment || 0)) /
                    detail.cooperation_months,
                )
              : detail.amount || 0;

            const finalAmount = installmentAmount > 0 ? installmentAmount : 0.01;

            const mappedData = {
              full_name: detail?.member?.full_name || "Anggota",
              member_no: detail?.member?.member_code || "ID Registrasi",
              invoice_no: `FIN/${detail.id}/${new Date().getFullYear()}`,
              createdAt: detail.created_at || new Date().toISOString(),
              details: [
                {
                  description: "Cicilan Pembiayaan Bulan Pertama",
                  amount: finalAmount,
                },
              ],
              status: detail.status === "PAID" ? "PAID" : "UNPAID",
              member_id: detail?.member?.id,
              payment_type: detail.transactions?.[0]?.payment_type,
              settlement_time: detail.transactions?.[0]?.settlement_time
            };
            setBillData(mappedData);

            if (detail.status === "PAID") {
              stopPolling();
              if (isPolling) {
                window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
                window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
              }
            }
          }
        } else if (params.billItemIds.length > 0 || params.billId) {
          const response = await UBilling.getInvoiceDetail(
            params.billItemIds.length > 0 ? params.billItemIds : null,
            params.billId
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
    pollingRef.current = setInterval(() => fetchBillDetail(true), 5000);
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
  };
};
