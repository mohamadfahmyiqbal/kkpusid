// fe/src/features/dashboard/components/FinancialSection.jsx

import React, { useState, useMemo, useRef } from "react";
import { FaWallet, FaUniversity, FaLayerGroup, FaChartLine, FaShieldAlt, FaRegMoneyBillAlt, FaHandHoldingUsd, FaShoppingCart } from "react-icons/fa";
import { useProfile } from "../../../components/layout/contexts";
import { useFinancialSummary } from "../hooks/useFinancialSummary";
import FinancialCard from "./financial/FinancialCard";
import FinancialDetailModal from "./financial/FinancialDetailModal";
import FinancialScrollButtons from "./financial/FinancialScrollButtons";
import "./financial/FinancialSection.css";

const FinancialSection = () => {
  const { userData } = useProfile();
  const scrollContainerRef = useRef(null);
  const [showBalance, setShowBalance] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const {
    balance, tabunganDetails, tabunganBalance, tabunganSubItemsData,
    jualBeliBalance, jualBeliSisaCicilan, jualBeliBelumDibayar, jualBeliTerbayar,
    pinjamanNominal, pinjamanNominalCicilan, pinjamanTerbayar, pinjamanTagihan, pinjamanSisaCicilan,
    simpananPokok, simpananWajib, simpananSukarela, simpananDeposit,
    arisanTagihan, arisanDiikutiCount, arisanSisaCicilan, arisanTerbayar,
    totalInvestasi, totalPendanaanSyariah,
    details, loading, isRefreshing, refresh
  } = useFinancialSummary(userData);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formattedBalance = useMemo(() => formatCurrency(balance), [balance]);
  const formattedPokok = useMemo(() => formatCurrency(simpananPokok), [simpananPokok]);
  const formattedWajib = useMemo(() => formatCurrency(simpananWajib), [simpananWajib]);
  const formattedSukarela = useMemo(() => formatCurrency(simpananSukarela), [simpananSukarela]);
  const formattedDeposit = useMemo(() => formatCurrency(simpananDeposit), [simpananDeposit]);

  const formattedTabungan = useMemo(() => formatCurrency(tabunganBalance), [tabunganBalance]);
  
  const tabunganSubItems = useMemo(() => [
    { label: 'Haji', formattedAmount: formatCurrency(tabunganSubItemsData.haji), icon: FaUniversity },
    { label: 'Umroh', formattedAmount: formatCurrency(tabunganSubItemsData.umroh), icon: FaUniversity },
    { label: 'Pendidikan', formattedAmount: formatCurrency(tabunganSubItemsData.pendidikan), icon: FaUniversity },
    { label: 'Qurban', formattedAmount: formatCurrency(tabunganSubItemsData.qurban), icon: FaUniversity },
  ], [tabunganSubItemsData]);

  const jualBeliSubItems = useMemo(() => [
    { label: 'Sisa Cicilan', formattedAmount: formatCurrency(jualBeliSisaCicilan), icon: FaShoppingCart },
    { label: 'Sudah Dibayar', formattedAmount: formatCurrency(jualBeliTerbayar), icon: FaShoppingCart },
    { label: 'Belum Dibayar', formattedAmount: `${jualBeliBelumDibayar} Cicilan`, icon: FaShoppingCart },
  ], [jualBeliSisaCicilan, jualBeliTerbayar, jualBeliBelumDibayar]);

  const pinjamanSubItems = useMemo(() => [
    { label: 'Sisa Cicilan', formattedAmount: formatCurrency(pinjamanSisaCicilan), icon: FaLayerGroup },
    { label: 'Nominal Cicilan', formattedAmount: formatCurrency(pinjamanNominalCicilan), icon: FaLayerGroup },
    { label: 'Sudah Dibayar', formattedAmount: formatCurrency(pinjamanTerbayar), icon: FaLayerGroup },
  ], [pinjamanSisaCicilan, pinjamanNominalCicilan, pinjamanTerbayar]);

  const arisanSubItems = useMemo(() => [
    { label: 'Total Arisan Diikuti', formattedAmount: `${arisanDiikutiCount} Program`, icon: FaLayerGroup },
    { label: 'Total Tagihan', formattedAmount: formatCurrency(arisanTagihan), icon: FaLayerGroup },
    { label: 'Belum Dibayar', formattedAmount: formatCurrency(arisanSisaCicilan), icon: FaRegMoneyBillAlt },
  ], [arisanDiikutiCount, arisanTagihan, arisanSisaCicilan]);

  const scroll = (offset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (loading)
    return (
      <div className="financial-section mb-4">
        <div className="financial-placeholder placeholder-glow p-4 rounded-4"></div>
      </div>
    );

  return (
    <>
      <div className="financial-section mb-4 dash-fade-in position-relative">
        <FinancialScrollButtons onScrollLeft={() => scroll(-350)} onScrollRight={() => scroll(350)} />

        <div 
          ref={scrollContainerRef}
          className="d-flex flex-nowrap overflow-auto gap-3 pb-3 custom-scrollbar financial-scroll-container" 
        >
          <FinancialCard 
            title="TOTAL SIMPANAN" icon={FaWallet} formattedAmount={formattedBalance}
            showBalance={showBalance} onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} onRefresh={refresh} onDetail={() => setShowDetailModal(true)}
            subItems={[
              { label: 'Pokok', formattedAmount: formattedPokok, icon: FaShieldAlt },
              { label: 'Wajib', formattedAmount: formattedWajib, icon: FaRegMoneyBillAlt },
              { label: 'Sukarela', formattedAmount: formattedSukarela, icon: FaHandHoldingUsd },
            ]}
            variant="simpanan" 
          />

           <FinancialCard 
            title="TOTAL JUAL BELI" icon={FaShoppingCart} formattedAmount={formatCurrency(jualBeliBalance)}
            showBalance={showBalance} onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} onRefresh={refresh} subItems={jualBeliSubItems}
            variant="jualbeli" 
          />


          <FinancialCard 
            title="TOTAL PINJAMAN" icon={FaLayerGroup} formattedAmount={formatCurrency(pinjamanTagihan)}
            showBalance={showBalance} onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} onRefresh={refresh} subItems={pinjamanSubItems}
            variant="pinjaman" 
          />
          
          <FinancialCard 
            title="TOTAL TABUNGAN" icon={FaUniversity} formattedAmount={formattedTabungan}
            showBalance={showBalance} onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} onRefresh={refresh} subItems={tabunganSubItems}
            variant="tabungan" 
          />

         


          <FinancialCard 
            title="TOTAL ARISAN" icon={FaLayerGroup} formattedAmount={formatCurrency(arisanTerbayar)}
            showBalance={showBalance} onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} onRefresh={refresh} subItems={arisanSubItems}
            variant="arisan" 
          />

          <FinancialCard 
            title="TOTAL PENDANAAN SYARIAH" icon={FaHandHoldingUsd} formattedAmount={formatCurrency(totalPendanaanSyariah)}
            showBalance={showBalance} onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} onRefresh={refresh}
            variant="investasi" 
          />

          <FinancialCard 
            title="TOTAL INVESTASI" icon={FaChartLine} formattedAmount={formatCurrency(totalInvestasi)}
            showBalance={showBalance} onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} onRefresh={refresh}
            variant="investasi" 
          />
        </div>
      </div>

      <FinancialDetailModal 
        show={showDetailModal} 
        onHide={() => setShowDetailModal(false)} 
        details={details} 
        formatCurrency={formatCurrency} 
      />
    </>
  );
};

export default React.memo(FinancialSection);
