// 📁 src/pages/global/BillingPage/hooks/useBillingData.js
import { useState, useEffect, useMemo, useCallback } from "react";
import UBilling from "../../../../utils/api/UBilling";
import useSocketListener from "../../../../utils/helper/SocketListener";

export const useBillingData = (decodedToken) => {
  // --- EKSTRAKSI DATA DARI TOKEN ---
  const {
    registrationId,
    filterParams,
    categoryName,
    isSukarela,
    displayName,
  } = useMemo(() => {
    const category =
      decodedToken?.category || decodedToken?.setoranType || null;
    return {
      registrationId:
        decodedToken?.registration_id || decodedToken?.registrationId || null,
      categoryName: category,
      displayName: decodedToken?.displayName || "Simpanan",
      isSukarela: category?.toUpperCase().includes("SUKARELA"),
      filterParams: {
        ...(decodedToken?.filter || {}),
        category: category,
      },
    };
  }, [decodedToken]);

  // --- STATE MANAGEMENT ---
  const [bills, setBills] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // --- FETCH DATA DENGAN SORTING ---
  const loadInitialData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [resPending, resHistory] = await Promise.all([
        !isSukarela
          ? UBilling.getPendingBills(filterParams)
          : Promise.resolve({ data: { status: true, data: [] } }),
        UBilling.getBillingHistory(filterParams),
      ]);

      if (resPending.data?.status) {
        // Validasi Array: Mencegah TypeError jika API mengirim non-array
        const rawData = resPending.data.data;
        const dataArray = Array.isArray(rawData) ? rawData : [];

        const sorted = dataArray.sort(
          (a, b) =>
            new Date(a.due_date || a.createdAt) -
            new Date(b.due_date || b.createdAt),
        );
        setBills(sorted);
      } else {
        setBills([]);
      }

      if (resHistory.data?.status) {
        setHistory(
          Array.isArray(resHistory.data.data) ? resHistory.data.data : [],
        );
      }
    } catch (err) {
      console.error("Gagal memuat data billing:", err);
      setBills([]);
      setHistory([]);
    } finally {
      setLoadingData(false);
    }
  }, [filterParams, isSukarela]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // SOCKET LISTENER
  useSocketListener((payload) => {
    if (
      payload.entityRef === "member_registration" ||
      payload.entityRef === "billing"
    ) {
      loadInitialData();
    }
  });

  return {
    bills,
    history,
    loadingData,
    loadInitialData,
    registrationId,
    filterParams,
    isSukarela,
    displayName,
    categoryName,
  };
};
