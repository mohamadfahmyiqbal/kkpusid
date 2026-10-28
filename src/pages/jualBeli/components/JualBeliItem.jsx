import React from "react";
import { 
  MdReceiptLong, 
  MdChevronRight, 
  MdAccessTime, 
  MdCheckCircle, 
  MdCancel, 
  MdStorefront 
} from "react-icons/md";

const JualBeliItem = React.memo(({ item, onClick }) => {
  const isCompleted = item.status === 'COMPLETED' || item.status === 'PAID' || item.status === 'LUNAS';
  const isPending = item.status === 'PENDING';
  const isRejected = item.status === 'REJECTED';
  const amount = Number(item.total_tagihan || item.amount_requested || item.item_price || 0);

  const getStatusBadge = () => {
    if (isCompleted) {
      return (
        <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1">
          <MdCheckCircle size={12} /> Selesai
        </span>
      );
    }
    if (isPending) {
      return (
        <span className="badge bg-warning bg-opacity-15 text-warning border border-warning border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1">
          <MdAccessTime size={12} /> Menunggu
        </span>
      );
    }
    if (isRejected) {
      return (
        <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1">
          <MdCancel size={12} /> Ditolak
        </span>
      );
    }
    return (
      <span className="badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1">
        {item.status || "Aktif"}
      </span>
    );
  };

  const formattedDate = item.created_at
    ? new Date(item.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Baru Saja";

  return (
    <div 
      className="dc-trans-row p-3 d-flex align-items-center gap-3 border-bottom cursor-pointer transition-all"
      onClick={() => onClick(item.financing_id || item.id)}
      style={{ textDecoration: "none" }}
    >
      <div 
        className={`rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${
          isCompleted 
            ? 'bg-success bg-opacity-10 text-success' 
            : isPending 
            ? 'bg-warning bg-opacity-15 text-warning'
            : 'bg-primary bg-opacity-10 text-primary'
        }`}
        style={{ width: "42px", height: "42px" }}
      >
        {isCompleted ? <MdCheckCircle size={22} /> : isPending ? <MdAccessTime size={22} /> : <MdStorefront size={22} />}
      </div>
      
      <div className="dc-trans-info flex-grow-1 min-w-0">
        <div className="d-flex justify-content-between align-items-start gap-2">
          <strong className="dc-trans-title text-truncate text-dark fw-bold" style={{ fontSize: "14px" }}>
            {item.purpose || item.category || item.item_name || 'Pembiayaan Jual Beli'}
          </strong>
          <span className={`dc-trans-amount fw-bold font-outfit text-nowrap ${isCompleted ? 'text-success' : 'text-primary'}`} style={{ fontSize: "15px" }}>
            Rp {amount.toLocaleString('id-ID')}
          </span>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <span className="text-muted small" style={{ fontSize: "12px" }}>
            {formattedDate}
          </span>
          {getStatusBadge()}
        </div>
      </div>
      
      <MdChevronRight size={20} className="text-muted opacity-40 flex-shrink-0" />
    </div>
  );
});

JualBeliItem.displayName = "JualBeliItem";

export default JualBeliItem;
