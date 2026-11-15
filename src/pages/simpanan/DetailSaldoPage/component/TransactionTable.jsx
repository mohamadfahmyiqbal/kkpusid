import React from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { FaMoneyBillWave } from "react-icons/fa";
import moment from "moment";
import { formatRupiah } from "../../../../utils/helper/formatRupiah";
import DataTable from "../../../../components/ui/DataTable";

const TransactionTable = ({
  filteredTransactions,
  handleTransactionClick,
  transactionsLength,
  setSearchTerm,
  setTransactionType,
}) => {
  // Define columns for DataTable
  const columns = [
    {
      header: "Tanggal",
      headerClassName: "ps-4",
      cellClassName: "ps-4",
      render: (row) => moment(row.created_at).format("DD/MM/YYYY"),
    },
    {
      header: "Keterangan",
      render: (row) => (
        <>
          <div className="fw-semibold">{row.description || "Transaksi"}</div>
          <small className="text-muted">{row.notes}</small>
        </>
      ),
    },
    {
      header: "No. Referensi",
      render: (row) => <code>{row.reference_no || "-"}</code>,
    },
    {
      header: "Jenis",
      render: (row) => (
        <Badge
          bg={
            row.type === "DEPOSIT"
              ? "success"
              : row.type === "WITHDRAWAL"
                ? "danger"
                : "warning"
          }
          className="px-3 py-1"
        >
          {row.type === "DEPOSIT"
            ? "Setoran"
            : row.type === "WITHDRAWAL"
              ? "Penarikan"
              : "Bunga"}
        </Badge>
      ),
    },
    {
      header: "Jumlah",
      headerClassName: "text-end pe-4",
      cellClassName: "text-end pe-4 fw-bold",
      render: (row) => (
        <span className={row.type === "DEPOSIT" ? "text-success" : "text-danger"}>
          {row.type === "DEPOSIT" ? "+" : "-"} Rp {formatRupiah(row.amount?.toString() || "0")}
        </span>
      ),
    },
    {
      header: "Status",
      headerClassName: "text-center",
      cellClassName: "text-center",
      render: (row) => (
        <Badge
          bg={
            row.status === "SUCCESS"
              ? "success"
              : row.status === "PENDING"
                ? "warning"
                : "secondary"
          }
          className="px-3"
        >
          {row.status || "PENDING"}
        </Badge>
      ),
    },
  ];

  const emptyState = (
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
  );

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
        <DataTable
          columns={columns}
          data={filteredTransactions}
          emptyState={emptyState}
          onRowClick={handleTransactionClick}
        />
      </Card.Body>
      {/* Footer is removed because pagination should be handled by DataTable if implemented,
          or we keep it here if they were using dummy pagination before.
          The previous code had dummy "Sebelumnya"/"Selanjutnya" buttons without functionality. */}
      <Card.Footer className="bg-white border-0 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Menampilkan {filteredTransactions.length} dari {transactionsLength} transaksi
          </small>
          {/* Note: Previous Next buttons were not functional in the original code, 
              if pagination was real, we'd pass pagination prop to DataTable instead */}
          <div className="d-flex gap-2">
            <Button variant="outline-secondary" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline-primary" size="sm" disabled>
              Selanjutnya
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default TransactionTable;
