// 📁 src/pages/global/BillingPage/hooks/useBillingData.js
import { useState, useEffect, useMemo, useCallback } from "react";
import UBilling from "../../../../utils/api/UBilling";
import TabunganService from "../../../../services/tabungan.service";
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
    downPayment,
  } = useMemo(() => {
    const category =
      decodedToken?.category || decodedToken?.setoranType || decodedToken?.product || null;
    return {
      registrationId:
        decodedToken?.registration_id || decodedToken?.registrationId || null,
      financingId:
        decodedToken?.financing_id || decodedToken?.financingId || null,
      downPayment: Number(decodedToken?.downPayment) || 0,
      orderId:
        decodedToken?.order_id || decodedToken?.orderId || null,
      categoryName: category,
      displayName: (() => {
        const cat = (category || "").toUpperCase();
        if (cat === "TABUNGAN_DEPOSIT" || ["HAJI", "UMRAH", "PENDIDIKAN", "QURBAN"].includes(cat)) {
          return "Tabungan";
        }
        return decodedToken?.displayName || "Simpanan";
      })(),
      isSukarela: category?.toUpperCase().includes("SUKARELA") || category?.toUpperCase() === "TABUNGAN_DEPOSIT",
      filterParams: {
        ...(decodedToken?.filter || {}),
        category: category,
      },
    };
  }, [decodedToken]);

  // --- STATE MANAGEMENT ---
  const [bills, setBills] = useState([]);
  const [history, setHistory] = useState([]);
  const [tabunganDetail, setTabunganDetail] = useState(null);
  const [loadingData, setLoadingData] = useState(true);

  // --- HELPER FUNCTION ---
  const hasCategory = useCallback((bill, checkFn) => {
    if (bill.category_code) return checkFn(bill.category_code);
    if (bill.items && Array.isArray(bill.items)) {
      return bill.items.some(item => item.category_code && checkFn(item.category_code));
    }
    return false;
  }, []);

  // --- FETCH DATA DENGAN SORTING ---
  const loadInitialData = useCallback(async () => {
    setLoadingData(true);
    try {
      // Endpoint backend /billing/list/pending hanya memfilter by member_id dan bill_type_id
      // Jangan kirimkan category atau registration_id sebagai query param agar query tidak terganggu
      const fetchFilter = {};
      if (filterParams.bill_type_id) fetchFilter.bill_type_id = filterParams.bill_type_id;

      const tIdFetch = decodedToken?.tabungan_id || decodedToken?.tabunganId;

      const [resPending, resHistory, resTabungan] = await Promise.all([
        (!isSukarela || categoryName === "TABUNGAN_DEPOSIT")
          ? UBilling.getPendingBills(fetchFilter)
          : Promise.resolve({ data: { status: true, data: [] } }),
        UBilling.getBillingHistory(fetchFilter),
        (categoryName === "TABUNGAN_DEPOSIT" && tIdFetch)
          ? TabunganService.getTabunganDetail(tIdFetch)
          : Promise.resolve({ data: null })
      ]);
      
      if (resTabungan && resTabungan.data && resTabungan.data.data) {
        setTabunganDetail(resTabungan.data.data);
      } else {
        setTabunganDetail(null);
      }

      const filterContextBills = (data) => {
        let rawData = Array.isArray(data) ? data : [];

        if (categoryName === "MEMBER_REGISTRATION" || decodedToken?.return === "registrationPage") {
          rawData = rawData.filter(
            (bill) =>
              bill.category_code === "SW_POKOK" ||
              bill.category_code === "SW_WAJIB" ||
              bill.description?.toLowerCase().includes("simpanan pokok") ||
              bill.description?.toLowerCase().includes("simpanan wajib")
          );
        } else if (financingId || categoryName === "FINANCING") {
          rawData = rawData.filter((bill) =>
            hasCategory(bill, (code) => code === "TRANSACTION_DOWN_PAYMENT" || code === "TRANSACTION_INSTALLMENT")
          );
          if (financingId) {
            rawData = rawData.filter(b => String(b.financing_application_id) === String(financingId));
          }
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
          rawData = rawData.filter((bill) =>
            hasCategory(bill, (code) => code.startsWith("TRANSACTION_"))
          );
        } else if (categoryName === "TABUNGAN_DEPOSIT") {
          const tId = decodedToken?.tabungan_id || decodedToken?.tabunganId;
          if (tId) {
            rawData = rawData.filter((bill) => hasCategory(bill, (code) => code === `TAB_DEP_${tId}`));
          } else {
            rawData = rawData.filter((bill) => hasCategory(bill, (code) => code.startsWith("TAB_DEP_")));
          }
        } else if (categoryName && ["haji", "umrah", "pendidikan", "qurban"].includes(categoryName.toLowerCase())) {
          const lowerCat = categoryName.toLowerCase();
          rawData = rawData.filter((bill) => 
            bill.description?.toLowerCase().includes(lowerCat) || 
            hasCategory(bill, (code) => code.startsWith("TAB_DEP_"))
          );
        } else if (categoryName === "SUKUK_INVESTMENT") {
          const oId = decodedToken?.order_id || decodedToken?.orderId;
          if (oId) {
            rawData = rawData.filter((bill) => bill.description?.includes(`Order #${oId}`));
          } else {
            rawData = rawData.filter((bill) => hasCategory(bill, (code) => code === "SUKUK_INVESTMENT"));
          }
        }
        return rawData;
      };

      const filteredHistory = resHistory.data?.status ? filterContextBills(resHistory.data.data) : [];

      if (resPending.data?.status) {
        let rawData = filterContextBills(resPending.data.data);

        // Pastikan DP / Uang Tanda Keseriusan muncul di daftar tagihan jika belum dibayar
        if (downPayment > 0) {
          const hasInHistory = filteredHistory.some(
            (h) =>
              hasCategory(h, (code) => code === "TRANSACTION_DOWN_PAYMENT" || code === "DP_PEMBIAYAAN") &&
              (h.status === "PAID" || h.status === "COMPLETED")
          );
          const hasInPending = rawData.some((b) =>
            hasCategory(b, (code) => code === "TRANSACTION_DOWN_PAYMENT" || code === "DP_PEMBIAYAAN")
          );

          if (!hasInHistory && !hasInPending) {
            rawData.unshift({
              bill_item_id: "dp-" + (financingId || Date.now()),
              id: "dp-" + (financingId || Date.now()),
              description: "Uang Tanda Keseriusan (DP)",
              amount: downPayment,
              status: "UNPAID",
              category_code: "TRANSACTION_DOWN_PAYMENT",
              financing_application_id: financingId,
              due_date: new Date().toISOString(),
            });
          }
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

      setHistory(filteredHistory);
    } catch (err) {
      console.error("Gagal memuat data billing:", err);
      setBills([]);
      setHistory([]);
    } finally {
      setLoadingData(false);
    }
  }, [
    filterParams, 
    isSukarela, 
    categoryName, 
    financingId, 
    decodedToken?.productName,
    decodedToken?.tabungan_id,
    decodedToken?.tabunganId,
    decodedToken?.order_id,
    decodedToken?.orderId,
    decodedToken?.return,
    hasCategory,
    downPayment
  ]);

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
    tabunganDetail,
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
