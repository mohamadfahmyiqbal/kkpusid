// src/features/dashboard/components/FinancialSection.jsx

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { FaEye, FaEyeSlash, FaWallet, FaUserTag, FaUniversity, FaSyncAlt, FaInfoCircle, FaExchangeAlt, FaLayerGroup, FaChartLine, FaShieldAlt, FaRegMoneyBillAlt, FaHandHoldingUsd, FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useProfile } from "../../../components/layout/contexts";
import { getDashboardFinancialSummary } from "../service/dashboardService";
import { Modal, Button, Table } from "react-bootstrap";

const FinancialCard = ({ 
  title, icon: Icon, amount, showBalance, onToggleBalance, isRefreshing, onRefresh, onDetail, 
  memberDisplayId, accountNo, subItems, gradient, formattedAmount 
}) => (
  <div
    className="card border-0 shadow-sm overflow-hidden"
    style={{
      background: gradient,
      borderRadius: "20px",
      color: "white",
      boxShadow: "0 10px 25px -5px rgba(0,0,0, 0.2)",
      minHeight: "220px",
      minWidth: "320px",
      maxWidth: "350px",
      scrollSnapAlign: "start",
      flexShrink: 0
    }}
  >
    {/* Decorative Background Elements */}
    <div 
      style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '120px',
        height: '120px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        zIndex: 0
      }}
    />
    <div 
      style={{
        position: 'absolute',
        bottom: '-40px',
        left: '10%',
        width: '180px',
        height: '180px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '50%',
        zIndex: 0
      }}
    />

    <div className="card-body p-4 position-relative" style={{ zIndex: 1 }}>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <div className="d-flex align-items-center gap-2">
          <div className="bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)' }}>
            <Icon size={16} />
          </div>
          <h6 className="fw-semibold mb-0 opacity-90" style={{ fontSize: '0.85rem', letterSpacing: '0.5px' }}>
            {title}
          </h6>
        </div>
        
        <div className="d-flex gap-2">
          {onDetail && (
            <button type="button" className="btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all" onClick={onDetail} aria-label="Detail">
              <FaInfoCircle size={16} />
            </button>
          )}
          <button type="button" className={`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${isRefreshing ? 'fa-spin' : ''}`} onClick={onRefresh} disabled={isRefreshing} aria-label="Refresh">
            <FaSyncAlt size={16} />
          </button>
          <button type="button" className="btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all" onClick={onToggleBalance} aria-label="Toggle">
            {showBalance ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
        </div>
      </div>

      <div className="py-3">
        <h2 className="fw-bold mb-0 d-flex align-items-baseline" style={{ letterSpacing: '-0.5px' }}>
          {showBalance ? formattedAmount : <span style={{ fontSize: '1.8rem', opacity: 0.9 }}>Rp ••••••••</span>}
        </h2>
      </div>

      <div className="row g-2 mt-0">
        {subItems && (
          <div className="col-12">
            <div className="d-flex flex-column gap-2 text-white mt-1">
              {subItems.map((item, idx) => (
                <div key={idx} className={`d-flex justify-content-between align-items-center ${idx !== subItems.length - 1 ? 'border-bottom border-white border-opacity-10 pb-2' : ''}`}>
                  <div className="d-flex align-items-center gap-2">
                    {item.icon && <item.icon size={12} className="opacity-75" />}
                    <div className="opacity-75 fw-bold" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{item.label}</div>
                  </div>
                  <div className="fw-bold" style={{ fontSize: '13px', letterSpacing: '0.5px' }}>{showBalance ? item.formattedAmount : 'Rp ••••••••'}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

const FinancialSection = () => {
  const { userData } = useProfile();
  const scrollContainerRef = useRef(null);
  const [balance, setBalance] = useState(0);
  const [tabunganDetails, setTabunganDetails] = useState([]);
  const [jualBeliBalance, setJualBeliBalance] = useState(0);
  const [jualBeliSisaCicilan, setJualBeliSisaCicilan] = useState(0);
  const [jualBeliBelumDibayar, setJualBeliBelumDibayar] = useState(0);
  const [pinjamanTagihan, setPinjamanTagihan] = useState(0);
  const [pinjamanSisaCicilan, setPinjamanSisaCicilan] = useState(0);
  const [pinjamanNominal, setPinjamanNominal] = useState(0);
  const [pinjamanNominalCicilan, setPinjamanNominalCicilan] = useState(0);
  const [pinjamanTerbayar, setPinjamanTerbayar] = useState(0);
  const [simpananPokok, setSimpananPokok] = useState(0);
  const [simpananWajib, setSimpananWajib] = useState(0);
  const [simpananSukarela, setSimpananSukarela] = useState(0);
  
  const [arisanTagihan, setArisanTagihan] = useState(0);
  const [arisanDiikutiCount, setArisanDiikutiCount] = useState(0);
  const [arisanSisaCicilan, setArisanSisaCicilan] = useState(0);
  const [arisanTerbayar, setArisanTerbayar] = useState(0);
  const [details, setDetails] = useState([]);
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const fetchBalance = useCallback(async (isRefresh = false) => {
    if (!userData?.member_id) return;
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      const res = await getDashboardFinancialSummary();
      if (res.data?.success) {
        const fetchedDetails = res.data.data.details || [];
        setDetails(fetchedDetails);
        const tDetails = fetchedDetails.filter(d => d.type && d.type.startsWith("TABUNGAN_"));
        setTabunganDetails(tDetails);
        const pokok = fetchedDetails.find(d => d.type === "SW_POKOK");
        if (pokok) setSimpananPokok(pokok.balance);
        const wajib = fetchedDetails.find(d => d.type === "SW_WAJIB");
        if (wajib) setSimpananWajib(wajib.balance);
        const sukarela = fetchedDetails.find(d => d.type === "SS_SUKARELA");
        if (sukarela) setSimpananSukarela(sukarela.balance);

        const totalSimpanan = (pokok?.balance || 0) + (wajib?.balance || 0) + (sukarela?.balance || 0);
        setBalance(totalSimpanan);
        
        setJualBeliBalance(res.data.data.totalJualBeli || 0);
        setJualBeliSisaCicilan(res.data.data.sisaCicilanJualBeli || 0);
        setJualBeliBelumDibayar(res.data.data.jumlahCicilanBelumDibayar || 0);
        
        setPinjamanTagihan(res.data.data.totalLoanDebt || 0);
        setPinjamanSisaCicilan(res.data.data.sisaCicilanPinjaman || 0);
        setPinjamanNominal(res.data.data.totalNominalPinjaman || 0);
        setPinjamanNominalCicilan(res.data.data.totalNominalCicilanPinjaman || 0);
        setPinjamanTerbayar(res.data.data.terbayarPinjaman || 0);
        
        setArisanTagihan(res.data.data.totalArisanTagihan || 0);
        setArisanDiikutiCount(res.data.data.arisanDiikutiCount || 0);
        setArisanSisaCicilan(res.data.data.sisaCicilanArisan || 0);
        setArisanTerbayar(res.data.data.terbayarArisan || 0);
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

  const tabunganBalance = useMemo(() => tabunganDetails.reduce((acc, curr) => acc + (curr.balance || 0), 0), [tabunganDetails]);
  const formattedTabungan = useMemo(() => formatCurrency(tabunganBalance), [tabunganBalance]);
  
  const tabunganSubItems = useMemo(() => {
    const haji = tabunganDetails.find(d => d.name?.toLowerCase().includes("haji"))?.balance || 0;
    const umroh = tabunganDetails.find(d => d.name?.toLowerCase().includes("umroh"))?.balance || 0;
    const pendidikan = tabunganDetails.find(d => d.name?.toLowerCase().includes("pendidikan"))?.balance || 0;
    const qurban = tabunganDetails.find(d => d.name?.toLowerCase().includes("qurban"))?.balance || 0;

    return [
      { label: 'Haji', formattedAmount: formatCurrency(haji), icon: FaUniversity },
      { label: 'Umroh', formattedAmount: formatCurrency(umroh), icon: FaUniversity },
      { label: 'Pendidikan', formattedAmount: formatCurrency(pendidikan), icon: FaUniversity },
      { label: 'Qurban', formattedAmount: formatCurrency(qurban), icon: FaUniversity },
    ];
  }, [tabunganDetails]);

  const formattedJualBeli = useMemo(() => formatCurrency(jualBeliBalance), [jualBeliBalance]);
  
  const jualBeliSubItems = useMemo(() => {
    return [
      { label: 'Sisa Cicilan', formattedAmount: formatCurrency(jualBeliSisaCicilan), icon: FaShoppingCart },
      { label: 'Total Pengajuan', formattedAmount: formatCurrency(jualBeliBalance), icon: FaShoppingCart },
      { label: 'Belum Dibayar', formattedAmount: `${jualBeliBelumDibayar} Cicilan`, icon: FaShoppingCart },
    ];
  }, [jualBeliSisaCicilan, jualBeliBalance, jualBeliBelumDibayar]);

  const formattedPinjamanNominal = useMemo(() => formatCurrency(pinjamanNominal), [pinjamanNominal]);
  
  const pinjamanSubItems = useMemo(() => {
    return [
      { label: 'Nominal Pinjaman', formattedAmount: formatCurrency(pinjamanNominal), icon: FaLayerGroup },
      { label: 'Nominal Cicilan', formattedAmount: formatCurrency(pinjamanNominalCicilan), icon: FaLayerGroup },
      { label: 'Sudah Dibayar', formattedAmount: formatCurrency(pinjamanTerbayar), icon: FaLayerGroup },
    ];
  }, [pinjamanNominalCicilan, pinjamanTerbayar, pinjamanNominal]);

  const formattedArisanTerbayar = useMemo(() => formatCurrency(arisanTerbayar), [arisanTerbayar]);
  
  const arisanSubItems = useMemo(() => {
    return [
      { label: 'Total Arisan Diikuti', formattedAmount: `${arisanDiikutiCount} Program`, icon: FaLayerGroup },
      { label: 'Total Tagihan', formattedAmount: formatCurrency(arisanTagihan), icon: FaLayerGroup },
      { label: 'Belum Dibayar', formattedAmount: formatCurrency(arisanSisaCicilan), icon: FaRegMoneyBillAlt },
    ];
  }, [arisanDiikutiCount, arisanTagihan, arisanSisaCicilan]);

  // Placeholder amounts for now
  const formattedInvestasi = formatCurrency(0);

  const memberDisplayId = userData?.member_no || userData?.member_id || "-";
  const accountNo = userData?.bank_account_no || userData?.bank_info?.bank_account_no || "0000000000000";

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  if (loading)
    return (
      <div className="financial-section mb-4">
        <div className="placeholder-glow p-4 rounded-4" style={{ minHeight: "220px", background: "linear-gradient(135deg, #075985 0%, #0369a1 100%)" }}></div>
      </div>
    );

  return (
    <>
      <div className="financial-section mb-4 dash-fade-in position-relative">
        <button 
          onClick={scrollLeft}
          className="btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', marginLeft: '-20px', opacity: 0.9 }}
        >
          <FaChevronLeft />
        </button>
        
        <button 
          onClick={scrollRight}
          className="btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', marginRight: '-20px', opacity: 0.9 }}
        >
          <FaChevronRight />
        </button>

        <div 
          ref={scrollContainerRef}
          className="d-flex flex-nowrap overflow-auto gap-3 pb-3 custom-scrollbar" 
          style={{ scrollSnapType: 'x mandatory', paddingBottom: '10px' }}
        >
          {/* Card Simpanan */}
          <FinancialCard 
            title="TOTAL SIMPANAN" 
            icon={FaWallet} 
            amount={balance} 
            formattedAmount={formattedBalance}
            showBalance={showBalance} 
            onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} 
            onRefresh={() => fetchBalance(true)} 
            onDetail={() => setShowDetailModal(true)}
            subItems={[
              { label: 'Pokok', formattedAmount: formattedPokok, icon: FaShieldAlt },
              { label: 'Wajib', formattedAmount: formattedWajib, icon: FaRegMoneyBillAlt },
              { label: 'Sukarela', formattedAmount: formattedSukarela, icon: FaHandHoldingUsd },
            ]}
            gradient="linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)" 
          />

          {/* Card Tabungan */}
          <FinancialCard 
            title="TOTAL TABUNGAN" 
            icon={FaUniversity} 
            amount={tabunganBalance} 
            formattedAmount={formattedTabungan}
            showBalance={showBalance} 
            onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} 
            onRefresh={() => fetchBalance(true)} 
            memberDisplayId={memberDisplayId} 
            accountNo={accountNo} 
            subItems={tabunganSubItems}
            gradient="linear-gradient(135deg, #166534 0%, #15803d 40%, #22c55e 100%)" 
          />

          {/* Card Jual Beli */}
          <FinancialCard 
            title="TOTAL JUAL BELI" 
            icon={FaShoppingCart} 
            amount={jualBeliBalance} 
            formattedAmount={formattedJualBeli}
            showBalance={showBalance} 
            onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} 
            onRefresh={() => fetchBalance(true)} 
            subItems={jualBeliSubItems}
            gradient="linear-gradient(135deg, #7e22ce 0%, #9333ea 40%, #a855f7 100%)" 
          />

          {/* Card Pinjaman */}
          <FinancialCard 
            title="TOTAL PINJAMAN" 
            icon={FaLayerGroup} 
            amount={pinjamanNominal} 
            formattedAmount={formattedPinjamanNominal}
            showBalance={showBalance} 
            onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} 
            onRefresh={() => fetchBalance(true)} 
            subItems={pinjamanSubItems}
            gradient="linear-gradient(135deg, #b45309 0%, #d97706 40%, #f59e0b 100%)" 
          />

          {/* Card Arisan */}
          <FinancialCard 
            title="TOTAL ARISAN" 
            icon={FaLayerGroup} 
            amount={arisanTerbayar} 
            formattedAmount={formattedArisanTerbayar}
            showBalance={showBalance} 
            onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} 
            onRefresh={() => fetchBalance(true)} 
            memberDisplayId={memberDisplayId} 
            accountNo={accountNo} 
            subItems={arisanSubItems}
            gradient="linear-gradient(135deg, #d946ef 0%, #c026d3 40%, #a21caf 100%)" 
          />

          {/* Card Investasi */}
          <FinancialCard 
            title="TOTAL INVESTASI" 
            icon={FaChartLine} 
            amount={0} 
            formattedAmount={formattedInvestasi}
            showBalance={showBalance} 
            onToggleBalance={() => setShowBalance(!showBalance)} 
            isRefreshing={isRefreshing} 
            onRefresh={() => fetchBalance(true)} 
            memberDisplayId={memberDisplayId} 
            accountNo={accountNo} 
            gradient="linear-gradient(135deg, #be123c 0%, #e11d48 40%, #f43f5e 100%)" 
          />
        </div>

        <style>{`
          .transition-all {
            transition: all 0.2s ease-in-out;
          }
          .hover-opacity-100:hover {
            opacity: 1 !important;
            transform: scale(1.1);
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .fa-spin {
            animation: spin 1s linear infinite;
          }
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1; 
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
          }
        `}</style>
      </div>

      <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Rekap Simpanan & Tabungan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {details.length > 0 ? (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Jenis</th>
                  <th className="text-end">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, index) => (
                  <tr key={index}>
                    <td>{detail.name}</td>
                    <td className="text-end fw-semibold text-primary">
                      {formatCurrency(detail.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center text-muted py-4">Belum ada data simpanan.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(FinancialSection);
