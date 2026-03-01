import React from "react";
import { Card, Badge, Button, Table } from "react-bootstrap";
import { FaMoneyBillWave } from "react-icons/fa";
import moment from "moment";
import { formatRupiah } from "../../../../utils/helper/formatRupiah";

const TransactionTable = ({
  filteredTransactions,
  handleTransactionClick,
  transactionsLength,
  setSearchTerm,
  setTransactionType,
}) => {
  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Header className="bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="fw-bold mb-0">Riwayat Transaksi</h6>
          <Badge bg="light" text="dark" className="px-3 py-2">
            {filteredTransactions.length} transaksi ditemukan
          </Badge>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-5">
            <FaMoneyBillWave size={48} className="text-muted mb-3" />
            <p className="text-muted">Tidak ada transaksi ditemukan</p>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setTransactionType("ALL");
              }}
            >
              Reset Filter
            </Button>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="ps-4">Tanggal</th>
                  <th>Keterangan</th>
                  <th>No. Referensi</th>
                  <th>Jenis</th>
                  <th className="text-end pe-4">Jumlah</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr
                    key={index}
                    onClick={() => handleTransactionClick(transaction)}
                    style={{ cursor: "pointer" }}
                    className="hover-bg-light"
                  >
                    <td className="ps-4">
                      {moment(transaction.created_at).format("DD/MM/YYYY")}
                    </td>
                    <td>
                      <div className="fw-semibold">
                        {transaction.description || "Transaksi"}
                      </div>
                      <small className="text-muted">{transaction.notes}</small>
                    </td>
                    <td>
                      <code>{transaction.reference_no || "-"}</code>
                    </td>
                    <td>
                      <Badge
                        bg={
                          transaction.type === "DEPOSIT"
                            ? "success"
                            : transaction.type === "WITHDRAWAL"
                              ? "danger"
                              : "warning"
                        }
                        className="px-3 py-1"
                      >
                        {transaction.type === "DEPOSIT"
                          ? "Setoran"
                          : transaction.type === "WITHDRAWAL"
                            ? "Penarikan"
                            : "Bunga"}
                      </Badge>
                    </td>
                    <td className="text-end pe-4 fw-bold">
                      <span
                        className={
                          transaction.type === "DEPOSIT"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {transaction.type === "DEPOSIT" ? "+" : "-"} Rp{" "}
                        {formatRupiah(transaction.amount?.toString() || "0")}
                      </span>
                    </td>
                    <td className="text-center">
                      <Badge
                        bg={
                          transaction.status === "SUCCESS"
                            ? "success"
                            : transaction.status === "PENDING"
                              ? "warning"
                              : "secondary"
                        }
                        className="px-3"
                      >
                        {transaction.status || "PENDING"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
      <Card.Footer className="bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Menampilkan {filteredTransactions.length} dari {transactionsLength}{" "}
            transaksi
          </small>
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm">
              Sebelumnya
            </Button>
            <Button variant="outline-primary" size="sm">
              Selanjutnya
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default TransactionTable;
