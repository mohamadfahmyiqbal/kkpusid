import React from "react";
import { MdReceiptLong, MdChevronRight } from "react-icons/md";

const JualBeliItem = React.memo(({ item, onClick }) => {
  const isCompleted = item.status === 'COMPLETED' || item.status === 'PAID';
  const amount = Number(item.total_tagihan || item.amount_requested || item.item_price || 0);
  
  return (
    <div className="dc-trans-row" onClick={() => onClick(item.financing_id || item.id)}>
      <div className={`dc-trans-icon-bg ${isCompleted ? 'credit' : 'debet'}`}>
        <MdReceiptLong size={20} />
      </div>
      
      <div className="dc-trans-info flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <strong className="dc-trans-title">{item.purpose || item.category || item.item_name || 'Pembiayaan Jual Beli'}</strong>
          <span className={`dc-trans-amount ${isCompleted ? 'text-success' : 'text-primary'}`}>
            Rp {amount.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <span className="dc-trans-date">{item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}) : 'Baru Saja'}</span>
          <span className={`dc-trans-status-badge ${item.status?.toLowerCase()}`}>
            {item.status}
          </span>
        </div>
      </div>
      
      <MdChevronRight size={20} className="text-muted opacity-50 ms-1" />
    </div>
  );
});

JualBeliItem.displayName = "JualBeliItem";

export default JualBeliItem;
