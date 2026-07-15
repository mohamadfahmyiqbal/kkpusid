import React, { useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import { useProfile } from "../../../components/layout/contexts";
import { 
  MdReceiptLong, 
  MdChevronRight, 
  MdPayments, 
  MdCheckCircle
} from "react-icons/md";
import FinancialScrollButtons from "./financial/FinancialScrollButtons";

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

const formatCurrency = (amount) => currencyFormatter.format(amount || 0);

/**
 * Komponen kartu tagihan individu dengan desain premium
 */
const BillingCard = React.memo(({ item, onPay }) => {
  const formattedAmount = useMemo(() => formatCurrency(Number(item.amount)), [item.amount]);

  return (
    <div className="dc-bill-item-wrapper">
      <div className="dc-bill-card" onClick={() => onPay(item.bill_id)}>
        <div className="dc-bill-card-header">
          <div className="dc-bill-icon-bg">
            <MdReceiptLong size={18} />
          </div>
          <span className="dc-bill-type">{item.tx_type || "TAGIHAN"}</span>
        </div>
        
        <div className="dc-bill-card-body">
          <strong className="dc-bill-desc">{item.description || "Pembayaran Tagihan"}</strong>
          <div className="dc-bill-amount">{formattedAmount}</div>
        </div>

        <div className="dc-bill-card-footer">
          <span className="dc-bill-action-text">Bayar Sekarang</span>
          <MdChevronRight size={18} />
        </div>
      </div>
    </div>
  );
});

/**
 * Skeleton loading untuk item tagihan
 */
const BillSkeleton = () => (
  <div className="dc-bill-item-wrapper">
    <div className="dc-bill-card skeleton">
      <div className="placeholder-glow">
        <div className="placeholder col-4 mb-3 rounded" style={{ height: '24px' }}></div>
        <div className="placeholder col-10 mb-2 rounded" style={{ height: '16px' }}></div>
        <div className="placeholder col-8 rounded" style={{ height: '20px' }}></div>
      </div>
    </div>
  </div>
);

const TagihanSection = () => {
  const navigate = useNavigate();
  const { bills, loading } = useProfile();
  const scrollContainerRef = useRef(null);

  const handleScrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  }, []);

  const handleScrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  }, []);

  const handleNavigation = useCallback(
    (billId) => {
      if (!billId) return;
      const token = jwtEncode({
        page: "invoicePage",
        billId: billId,
        return: "dashboard",
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const totalAmount = useMemo(() => {
    return bills?.reduce((acc, bill) => acc + (Number(bill.amount) || 0), 0) || 0;
  }, [bills]);

  const formattedTotal = useMemo(() => formatCurrency(totalAmount), [totalAmount]);

  if (loading) {
    return (
      <section className="mb-4 dc-bill-section px-3">
        <div className="placeholder-glow mb-3">
          <div className="placeholder col-5 rounded" style={{ height: '24px' }}></div>
        </div>
        <div className="dc-bill-scroll-container">
          <BillSkeleton />
          <BillSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="mb-4 dc-bill-section">
      <div className="d-flex align-items-center justify-content-between mb-3 px-3">
        <h5 className="fw-bold mb-0" style={{ fontSize: '1rem', color: '#1e293b' }}>
          Tagihan Perlu Dibayar
        </h5>
        {bills && bills.length > 0 && (
          <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '11px' }}>
            {bills.length} Tagihan
          </span>
        )}
      </div>

      {bills && bills.length > 0 ? (
        <>
          {/* Ringkasan Total Tagihan */}
          <div className="px-3 mb-3">
            <div className="dc-bill-summary-card">
              <div className="d-flex align-items-center gap-3">
                <div className="dc-summary-icon">
                  <MdPayments size={20} />
                </div>
                <div>
                  <div className="text-uppercase opacity-70 fw-bold" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>
                    TOTAL TUNGGAKAN
                  </div>
                  <div className="fw-bold h5 mb-0 text-danger">{formattedTotal}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="position-relative">
            <FinancialScrollButtons onScrollLeft={handleScrollLeft} onScrollRight={handleScrollRight} />
            <div className="dc-bill-scroll-container custom-scrollbar" ref={scrollContainerRef}>
              <div className="dc-bill-scroll-content">
                {bills.map((item, index) => (
                <BillingCard
                  key={`${item.bill_id ?? "bill"}-${index}`}
                  item={item}
                  onPay={handleNavigation}
                />
              ))}
              {/* Spacer at the end of scroll */}
              <div style={{ width: '16px', flexShrink: 0 }} />
            </div>
          </div>
        </div>
        </>
      ) : (
        <div className="px-3">
          <div className="dc-empty-bill-card">
            <div className="dc-empty-icon-wrapper">
              <MdCheckCircle size={32} />
            </div>
            <h6 className="fw-bold mb-1">Semua Tagihan Terbayar</h6>
            <p className="text-muted mb-0" style={{ fontSize: '12.5px' }}>
              Alhamdulillah, Anda tidak memiliki tagihan yang tertunda saat ini.
            </p>
          </div>
        </div>
      )}

    </section>
  );
};

export default TagihanSection;
