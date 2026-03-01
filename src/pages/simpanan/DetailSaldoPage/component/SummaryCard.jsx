import React from "react";
import { Card } from "react-bootstrap";
import { formatRupiah } from "../../../../utils/helper/formatRupiah";

const SummaryCard = ({ summary, balanceSummary, transactionsLength }) => {
  return (
    <Card className="border-0 shadow-sm h-100 rounded-4">
      <Card.Body className="p-4">
        <h6 className="fw-bold mb-4 text-muted">Ringkasan Periode</h6>

        <div className="mb-3">
          <small className="text-muted d-block">Total Setoran</small>
          <h4 className="text-success fw-bold">
            Rp {formatRupiah(summary.totalDeposit.toString())}
          </h4>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Total Penarikan</small>
          <h4 className="text-danger fw-bold">
            Rp {formatRupiah(summary.totalWithdrawal.toString())}
          </h4>
        </div>

        <div className="mb-3">
          <small className="text-muted d-block">Jumlah Transaksi</small>
          <h4 className="text-primary fw-bold">
            {transactionsLength} Transaksi
          </h4>
        </div>

        {balanceSummary && (
          <div className="mt-4 pt-3 border-top">
            <small className="text-muted d-block">Saldo Akhir</small>
            <h3 className="fw-bold text-dark">
              Rp {formatRupiah(balanceSummary.balance?.toString() || "0")}
            </h3>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;
