// fe/src/features/dashboard/hooks/useFinancialSummary.js

import { useState, useEffect, useCallback } from "react";
import { getDashboardFinancialSummary } from "../service/dashboardService";

export const useFinancialSummary = (userData) => {
  const [data, setData] = useState({
    balance: 0,
    tabunganDetails: [],
    jualBeliBalance: 0,
    jualBeliSisaCicilan: 0,
    jualBeliBelumDibayar: 0,
    jualBeliTerbayar: 0,
    pinjamanTagihan: 0,
    pinjamanSisaCicilan: 0,
    pinjamanNominal: 0,
    pinjamanNominalCicilan: 0,
    pinjamanTerbayar: 0,
    simpananPokok: 0,
    simpananWajib: 0,
    simpananSukarela: 0,
    simpananDeposit: 0,
    arisanTagihan: 0,
    arisanDiikutiCount: 0,
    arisanSisaCicilan: 0,
    arisanTerbayar: 0,
    totalInvestasi: 0,
    totalPendanaanSyariah: 0,
    tabunganBalance: 0,
    tabunganSubItemsData: { haji: 0, umroh: 0, pendidikan: 0, qurban: 0 },
    details: []
  });
  
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBalance = useCallback(async (isRefresh = false) => {
    if (!userData?.member_id) return;
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const res = await getDashboardFinancialSummary();
      if (res.data?.success) {
        const fetchedDetails = res.data.data.details || [];
        const tDetails = fetchedDetails.filter(d => d.type && d.type.startsWith("TABUNGAN_") && d.type !== "TABUNGAN_DEPOSIT");
        const pokok = fetchedDetails.find(d => d.type === "SW_POKOK")?.balance || 0;
        const wajib = fetchedDetails.find(d => d.type === "SW_WAJIB")?.balance || 0;
        const sukarela = fetchedDetails.find(d => d.type === "SS_SUKARELA")?.balance || 0;
        const deposit = fetchedDetails.find(d => d.type === "TABUNGAN_DEPOSIT")?.balance || 0;

        const totalSimpanan = pokok + wajib + sukarela;
        
        // Pre-calculate tabungan metrics
        const tabunganBalance = tDetails.reduce((acc, curr) => acc + (curr.balance || 0), 0);
        const getSum = (keyword) => tDetails
          .filter(d => d.name?.toLowerCase().includes(keyword))
          .reduce((acc, curr) => acc + (curr.balance || 0), 0);

        setData({
          balance: totalSimpanan,
          tabunganDetails: tDetails,
          tabunganBalance,
          tabunganSubItemsData: {
            haji: getSum("haji"),
            umroh: getSum("umroh"),
            pendidikan: getSum("pendidikan"),
            qurban: getSum("qurban"),
          },
          simpananPokok: pokok,
          simpananWajib: wajib,
          simpananSukarela: sukarela,
          simpananDeposit: deposit,
          details: fetchedDetails,
          jualBeliBalance: res.data.data.totalJualBeli || 0,
          jualBeliSisaCicilan: res.data.data.sisaCicilanJualBeli || 0,
          jualBeliBelumDibayar: res.data.data.jumlahCicilanBelumDibayar || 0,
          jualBeliTerbayar: res.data.data.terbayarJualBeli || 0,
          pinjamanTagihan: res.data.data.totalLoanDebt || 0,
          pinjamanSisaCicilan: res.data.data.sisaCicilanPinjaman || 0,
          pinjamanNominal: res.data.data.totalNominalPinjaman || 0,
          pinjamanNominalCicilan: res.data.data.totalNominalCicilanPinjaman || 0,
          pinjamanTerbayar: res.data.data.terbayarPinjaman || 0,
          arisanTagihan: res.data.data.totalArisanTagihan || 0,
          arisanDiikutiCount: res.data.data.arisanDiikutiCount || 0,
          arisanSisaCicilan: res.data.data.sisaCicilanArisan || 0,
          arisanTerbayar: res.data.data.terbayarArisan || 0,
          totalInvestasi: res.data.data.totalInvestasi || 0,
          totalPendanaanSyariah: res.data.data.totalPendanaanSyariah || 0,
        });
      }
    } catch (err) {
      console.error("Gagal memuat saldo:", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [userData]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { ...data, loading, isRefreshing, refresh: () => fetchBalance(true) };
};
