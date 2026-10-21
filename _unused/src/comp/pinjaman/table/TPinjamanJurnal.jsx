import React from "react";
import { Card, Table } from "react-bootstrap";

// 💰 Format nilai ke Rupiah
const formatRupiah = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "-";
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

const TablePerKategori = ({ title, data = {} }) => {
  const keteranganKeys = Object.keys(data);

  return (
    <div className="mb-4">
      <h6 className="fw-bold mt-3">{title}</h6>
      <Table bordered striped responsive className="mb-0">
        <thead className="table-dark text-center">
          <tr>
            <th>No</th>
            <th>Keterangan</th>
            <th>Debit</th>
            <th>Credit</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {keteranganKeys.map((ket, idx) => {
            const val = data[ket] ?? {};
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{ket}</td>
                <td className="text-end">{formatRupiah(val.Debit)}</td>
                <td className="text-end">{formatRupiah(val.Credit)}</td>
                <td className="text-end">{formatRupiah(val.Total)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default function TPinjamanJurnal({ data = {} }) {
  const kategoriKeys = Object.keys(data);

  return (
    <Card className="shadow-sm border-primary rounded mt-4">
      <Card.Header className="bg-blue700 text-white">
        Laporan Jurnal Pinjaman
      </Card.Header>
      <Card.Body>
        {kategoriKeys.map((kategori, idx) => (
          <TablePerKategori
            key={kategori}
            title={`${idx + 1}. ${kategori.toUpperCase()}`}
            data={data[kategori]}
          />
        ))}
      </Card.Body>
    </Card>
  );
}
