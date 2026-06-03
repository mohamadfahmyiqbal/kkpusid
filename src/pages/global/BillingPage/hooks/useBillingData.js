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
    financingId,
  } = useMemo(() => {
    const category =
      decodedToken?.category || decodedToken?.setoranType || decodedToken?.product || null;
    return {
      registrationId:
        decodedToken?.registration_id || decodedToken?.registrationId || null,
      financingId:
        decodedToken?.financing_id || decodedToken?.financingId || null,
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
        let rawData = resPending.data.data;
        rawData = Array.isArray(rawData) ? rawData : [];

        // Filter bills based on context
        if (financingId) {
          // Filter for financing transactions
          rawData = rawData.filter(
            (bill) =>
              bill.category_code === "TRANSACTION_DOWN_PAYMENT" ||
              bill.category_code === "TRANSACTION_INSTALLMENT",
          );
          
          if (decodedToken?.productName) {
            const prod = decodedToken.productName.toLowerCase();
            if (prod.includes("arisan")) {
              rawData = rawData.filter(b => b.description?.toLowerCase().includes("arisan"));
            } else if (prod.includes("pinjaman")) {
              rawData = rawData.filter(b => b.description?.toLowerCase().includes("pinjaman"));
            } else if (prod.includes("pembiayaan")) {
              rawData = rawData.filter(b => !b.description?.toLowerCase().includes("arisan") && !b.description?.toLowerCase().includes("pinjaman"));
            }
          }
        } else if (categoryName === "SAVINGS") {
          // Filter for transaction bills when doing savings deposits
          rawData = rawData.filter((bill) =>
            bill.category_code?.startsWith("TRANSACTION_"),
          );
        } else if (categoryName && ["haji", "umrah", "pendidikan", "qurban"].includes(categoryName.toLowerCase())) {
          // Filter untuk produk tabungan (Haji, Umrah, dll)
          const lowerCat = categoryName.toLowerCase();
          rawData = rawData.filter((bill) => 
            bill.description?.toLowerCase().includes(lowerCat) || 
            bill.category_code?.startsWith("TAB_DEP_")
          );
        }

        const sorted = rawData.sort(
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
  }, [filterParams, isSukarela, categoryName, financingId]);

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
    financingId,
    filterParams,
    isSukarela,
    displayName,
    categoryName,
  };
};
