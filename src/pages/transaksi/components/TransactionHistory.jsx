import React from "react";
import { Button } from "react-bootstrap";
import { MdHistory, MdSearch, MdReceiptLong } from "react-icons/md";
import TransactionItem from "./TransactionItem";

const TransactionHistory = ({
  filteredTransactions,
  transactions,
  handleResetFilters,
  handleGoToDetail
}) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3 px-1">
        <div className="d-flex align-items-center gap-2">
          <MdHistory size={20} className="text-primary" />
          <h5 className="fw-bold mb-0 history-header-title">Riwayat Transaksi</h5>
        </div>
        {filteredTransactions.length !== transactions.length && (
          <span className="text-muted small">Menampilkan {filteredTransactions.length} dari {transactions.length}</span>
        )}
      </div>

      {filteredTransactions.length > 0 ? (
        <div className="dc-trans-list shadow-sm rounded-4 bg-white overflow-hidden border-light-1">
          {filteredTransactions.map((t, idx) => (
            <TransactionItem 
              key={t.id || idx} 
              item={t} 
              onClick={handleGoToDetail} 
            />
          ))}
        </div>
      ) : transactions.length > 0 ? (
        /* Filtered empty state */
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-dashed mx-1">
          <MdSearch size={48} className="opacity-15 text-muted mb-2 animate-pulse" />
          <h6 className="fw-semibold text-muted mb-1">Transaksi Tidak Ditemukan</h6>
          <p className="text-muted mb-3 small px-3">Tidak ada hasil yang sesuai dengan kata kunci pencarian atau filter Anda.</p>
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={handleResetFilters}
            className="rounded-pill px-4"
          >
            Reset Filter
          </Button>
        </div>
      ) : (
        /* Absolute empty state */
        <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-dashed mx-1">
          <MdReceiptLong size={48} className="opacity-10 mb-2" />
          <p className="text-muted mb-0 small">Belum ada riwayat transaksi.</p>
        </div>
      )}
    </>
  );
};

export default TransactionHistory;
