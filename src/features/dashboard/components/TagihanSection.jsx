import React, { useCallback, useMemo } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import { useProfile } from "../../../components/layout/contexts";
import { 
  MdReceiptLong, 
  MdChevronRight, 
  MdPayments, 
  MdCheckCircle,
  MdInfoOutline
} from "react-icons/md";

/**
 * Komponen kartu tagihan individu dengan desain premium
 */
const BillingCard = React.memo(({ item, onPay }) => {
  const formattedAmount = useMemo(() => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(item.amount) || 0);
  }, [item.amount]);

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

  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(totalAmount);
  }, [totalAmount]);

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

          <div className="dc-bill-scroll-container">
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

      <style>{`
        .dc-bill-section {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .dc-bill-scroll-container {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 12px;
          cursor: grab;
        }

        .dc-bill-scroll-container:active {
          cursor: grabbing;
        }

        /* Styled scrollbar for better visibility */
        .dc-bill-scroll-container::-webkit-scrollbar {
          height: 6px;
        }

        .dc-bill-scroll-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .dc-bill-scroll-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .dc-bill-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .dc-bill-scroll-content {
          display: flex;
          padding: 0 16px;
          gap: 16px;
          width: max-content; /* Ensure content doesn't wrap and forces scroll */
        }

        .dc-bill-item-wrapper {
          flex: 0 0 240px;
          width: 240px;
        }

        .dc-bill-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dc-bill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: #e2e8f0;
        }

        .dc-bill-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .dc-bill-icon-bg {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: #f8fafc;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dc-bill-type {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dc-bill-card-body {
          flex-grow: 1;
          margin-bottom: 16px;
        }

        .dc-bill-desc {
          display: block;
          font-size: 14px;
          color: #334155;
          margin-bottom: 6px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .dc-bill-amount {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }

        .dc-bill-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px dashed #f1f5f9;
          color: #2563eb;
        }

        .dc-bill-action-text {
          font-size: 13px;
          font-weight: 700;
        }

        .dc-bill-summary-card {
          background: #fff5f5;
          border: 1px solid #fee2e2;
          border-radius: 16px;
          padding: 16px;
        }

        .dc-summary-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fee2e2;
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dc-empty-bill-card {
          background: #f0fdf4;
          border: 1px dashed #bbf7d0;
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
        }

        .dc-empty-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #dcfce7;
          color: #22c55e;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .dc-bill-card.skeleton {
          pointer-events: none;
          min-height: 160px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 576px) {
          .dc-bill-item-wrapper {
            flex: 0 0 220px;
            width: 220px;
          }
          .dc-bill-card {
            padding: 16px;
          }
          .dc-bill-amount {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default TagihanSection;
