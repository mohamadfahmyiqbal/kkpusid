import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdInfoOutline } from "react-icons/md";
import { jwtEncode } from "../../utils/helpers";
import UJualBeli from "../../utils/api/UJualBeli";

// Custom Subcomponents
import JualBeliSkeleton from "./components/JualBeliSkeleton";
import SummaryStateCard from "./components/SummaryStateCard";
import QuickStats from "./components/QuickStats";
import SearchFilter from "./components/SearchFilter";
import JualBeliHistory from "./components/JualBeliHistory";

import "./JualBeliDashboardPage.css";

const JualBeliDashboardPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interactive Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // "all", "credit", "debit"

  const fetchTransactionData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await UJualBeli.getFinancingHistory({ type: 'jualbeli' });
      if (response.data?.status) {
        const responseData = response.data.data;
        setTransactions(Array.isArray(responseData) ? responseData : responseData?.transactions || []);
      }
    } catch (err) {
      setError("Gagal memuat data transaksi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  const handleGoToSetoran = () => {
    const fid = approvedFinancing?.financing_id || approvedFinancing?.id;
    const dp = approvedFinancing?.down_payment || 0;
    navigate(`/${jwtEncode({ page: "billingPage", category: "FINANCING", financingId: fid, productName: "pembiayaan", downPayment: dp, return: "jualBeliPage" })}`);
  };

  const handleGoToFormPembelian = () => {
    navigate(`/${jwtEncode({ page: "formPengajuanTransaksi", return: "jualBeliPage" })}`);
  };

  const handleGoToDetail = (id) => {
    if (!id) return;
    navigate(`/${jwtEncode({ page: "transactionDetailPage", financingId: id, return: "jualBeliPage" })}`);
  };

  const approvedFinancing = useMemo(() => transactions.find(t => t.status === "APPROVED"), [transactions]);
  const isApproved = !!approvedFinancing;
  const hasPending = transactions.some((t) => t.status === "PENDING") && !isApproved;

  // Compute Dashboard Statistics
  const stats = useMemo(() => {
    let creditSum = 0;
    let debitSum = 0;
    transactions.forEach(t => {
      if (t.nominal_kredit) creditSum += Number(t.nominal_kredit);
      if (t.nominal_debet) debitSum += Number(t.nominal_debet);
    });
    return {
      credit: creditSum,
      debit: debitSum,
      totalCount: transactions.length
    };
  }, [transactions]);

  // Tab count indicators
  const tabCounts = useMemo(() => {
    return {
      all: transactions.length,
      credit: transactions.filter(t => t.nominal_kredit).length,
      debit: transactions.filter(t => t.nominal_debet).length
    };
  }, [transactions]);

  // Filtering Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const title = (t.description || t.tx_type || 'Transaksi').toLowerCase();
      const matchesSearch = title.includes(searchQuery.toLowerCase());
      
      let matchesTab = true;
      if (activeTab === "credit") {
        matchesTab = !!t.nominal_kredit;
      } else if (activeTab === "debit") {
        matchesTab = !!t.nominal_debet;
      }
      
      return matchesSearch && matchesTab;
    });
  }, [transactions, searchQuery, activeTab]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveTab("all");
  };

  if (loading) return <div className="p-3"><JualBeliSkeleton /></div>;

  return (
    <div className="trans-page-container pb-5 animate-fade-in">
      {error && (
        <div className="px-3 mb-4">
          <Alert variant="danger" className="shadow-sm rounded-4 border-0">
            <MdInfoOutline className="me-2" /> {error}
            <Button variant="link" size="sm" onClick={fetchTransactionData} className="text-danger p-0 ms-2 fw-bold">Coba Lagi</Button>
          </Alert>
        </div>
      )}

      {/* 1. Summary Card / State Card */}
      <div className="px-3 mb-4">
        <SummaryStateCard
          isApproved={isApproved}
          approvedFinancing={approvedFinancing}
          hasPending={hasPending}
          transactions={transactions}
          handleGoToSetoran={handleGoToSetoran}
          handleGoToFormPembelian={handleGoToFormPembelian}
          handleGoToDetail={handleGoToDetail}
        />
      </div>



      {/* 3. Interactive Search & Filter */}
      <div className="px-3 mb-4">
        <SearchFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabCounts={tabCounts}
        />
      </div>

      {/* 4. History Section */}
      <div className="px-3">
        <JualBeliHistory
          filteredTransactions={filteredTransactions}
          transactions={transactions}
          handleResetFilters={handleResetFilters}
          handleGoToDetail={handleGoToDetail}
        />
      </div>
    </div>
  );
};

export default JualBeliDashboardPage;
