import React from "react";
import { Card, Table } from "react-bootstrap";
import { FaHistory } from "react-icons/fa";
import { formatCurrency, formatDate } from "./tabunganHelpers";

export default function TransactionHistoryTable({ transactions }) {
  return (
    <Card className="shadow-sm border-0 detail-history-card">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">
            <FaHistory className="me-2" />
            Riwayat Transaksi
          </h6>
        </div>
        <div className="table-responsive">
          <Table hover className="align-middle mb-0">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jenis Transaksi</th>
                <th className="text-end">Nominal</th>
                <th className="text-end">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <tr key={index}>
                    <td className="text-nowrap">{formatDate(tx.date)}</td>
                    <td>{tx.type}</td>
                    <td className="text-end text-success fw-medium">
                      +Rp {formatCurrency(tx.amount)}
                    </td>
                    <td className="text-end fw-bold">
                      Rp {formatCurrency(tx.balance)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-3">
                    Belum ada riwayat transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
