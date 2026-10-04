import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import moment from "moment";
import USimpanan from "../../../../utils/api/USimpanan";

export const useDetailSaldo = (decodedToken) => {
  const abortControllerRef = useRef(new AbortController());

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceSummary, setBalanceSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    start: moment().subtract(1, "month").format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD"),
  });
  const [transactionType, setTransactionType] = useState("ALL");

  const { categoryCode, displayName, returnPage } = useMemo(() => {
    return {
      categoryCode: decodedToken?.category || "SS_SUKARELA",
      displayName: decodedToken?.displayName || "Simpanan Sukarela",
      returnPage: decodedToken?.return || "simpananPage",
    };
  }, [decodedToken]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const signal = abortControllerRef.current.signal;

      const [balanceRes, historyRes] = await Promise.all([
        USimpanan.getAccountDetail(categoryCode, { signal }),
        USimpanan.getSavingsHistory(
          {
            category: categoryCode,
            start_date: dateRange.start,
            end_date: dateRange.end,
          },
          { signal },
        ),
      ]);

      if (balanceRes.data?.status) {
        setBalanceSummary(balanceRes.data.data);
      }

      if (historyRes.data?.status) {
        setTransactions(historyRes.data.data || []);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching detail saldo:", err);
        setError(err.response?.data?.message || "Gagal memuat data transaksi");
      }
    } finally {
      setLoading(false);
    }
  }, [categoryCode, dateRange]);

  useEffect(() => {
    const controller = abortControllerRef.current;
    fetchData();

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (transactionType !== "ALL" && transaction.type !== transactionType) {
        return false;
      }

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.description?.toLowerCase().includes(searchLower) ||
          transaction.reference_no?.toLowerCase().includes(searchLower) ||
          transaction.amount?.toString().includes(searchTerm)
        );
      }

      return true;
    });
  }, [transactions, searchTerm, transactionType]);

  const summary = useMemo(() => {
    let totalDeposit = 0;
    let totalWithdrawal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "DEPOSIT") {
        totalDeposit += parseFloat(transaction.amount || 0);
      } else if (transaction.type === "WITHDRAWAL") {
        totalWithdrawal += parseFloat(transaction.amount || 0);
      }
    });

    return { totalDeposit, totalWithdrawal };
  }, [transactions]);

  return {
    loading,
    error,
    balanceSummary,
    transactions,
    filteredTransactions,
    summary,
    dateRange,
    setDateRange,
    searchTerm,
    setSearchTerm,
    transactionType,
    setTransactionType,
    categoryCode,
    displayName,
    returnPage,
    fetchData,
  };
};

export default useDetailSaldo;
