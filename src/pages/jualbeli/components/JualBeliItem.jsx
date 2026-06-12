import React from "react";
import { MdArrowUpward, MdArrowDownward, MdChevronRight } from "react-icons/md";

const JualBeliItem = React.memo(({ item, onClick }) => {
  const isCredit = !!item.nominal_kredit;
  const amount = isCredit ? item.nominal_kredit : item.nominal_debet;
  
  return (
    <div className="dc-trans-row" onClick={() => onClick(item.id)}>
      <div className={`dc-trans-icon-bg ${isCredit ? 'credit' : 'debet'}`}>
        {isCredit ? <MdArrowUpward size={20} /> : <MdArrowDownward size={20} />}
      </div>
      
      <div className="dc-trans-info flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <strong className="dc-trans-title">{item.description || item.tx_type || 'Transaksi'}</strong>
          <span className={`dc-trans-amount ${isCredit ? 'text-success' : 'text-danger'}`}>
            {isCredit ? '+' : '-'} Rp {Number(amount).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <span className="dc-trans-date">{item.tx_date || 'Baru Saja'}</span>
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
