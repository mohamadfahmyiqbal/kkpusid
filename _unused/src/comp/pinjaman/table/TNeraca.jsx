import React from "react";
import { Card, Table } from "react-bootstrap";

// Format ke mata uang Rupiah
const formatRupiah = (value) => {
  const number = Number(value);
  if (value === null || value === undefined || isNaN(number)) return "-";
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

// Komponen utama
export default function TNeraca({ data }) {
  const { tahun, aktiva = [], pasiva = [] } = data;

  // Fungsi bantu untuk memecah grup menjadi baris-baris
  const extractRows = (section) =>
    section.flatMap((grup) => [
      { isGroup: true, nama: grup.kelompok },
      ...grup.akun.map((akun) => ({ ...akun, isGroup: false })),
    ]);

  const aktivaRows = extractRows(aktiva);
  const pasivaRows = extractRows(pasiva);

  const maxRows = Math.max(aktivaRows.length, pasivaRows.length);
  // while (aktivaRows.length < maxRows) aktivaRows.push({});
  // while (pasivaRows.length < maxRows) pasivaRows.push({});
  console.log(aktivaRows);

  return (
    <Card className="mt-3">
      <Card.Body>
        <Table bordered responsive striped>
          <thead>
            <tr className="table-dark border-white text-center">
              <th rowSpan={2}>Aktiva</th>
              <th colSpan={2}>{tahun}</th>
              <th rowSpan={2}>Pasiva</th>
              <th colSpan={2}>{tahun}</th>
            </tr>
            <tr className="border-white text-center">
              <th className="bg-dark text-white">Debet</th>
              <th className="bg-dark text-white">Kredit</th>
              <th className="bg-dark text-white">Debet</th>
              <th className="bg-dark text-white">Kredit</th>
            </tr>
          </thead>
          <tbody>
            {aktivaRows.map((aktivaItem, index) => {
              const pasivaItem = pasivaRows[index];

              return (
                <tr>
                  <td>{aktivaItem.nama}</td>
                  <td>
                    {aktivaItem.debit ? formatRupiah(aktivaItem.debit) : ""}
                  </td>
                  <td>
                    {aktivaItem.credit ? formatRupiah(aktivaItem.credit) : ""}
                  </td>
                  <td>{pasivaItem.nama}</td>
                  <td>
                    {pasivaItem.debit ? formatRupiah(pasivaItem.debit) : ""}
                  </td>
                  <td>
                    {pasivaItem.credit ? formatRupiah(pasivaItem.credit) : ""}
                  </td>
                </tr>
              );
            })}
            {/* {pasivaRows.map((pasivaItem, index) => {
              return (
                <tr>
                  <td>{pasivaItem.nama}</td>
                  <td>
                    {pasivaItem.debit ? formatRupiah(pasivaItem.debit) : ""}
                  </td>
                  <td>
                    {pasivaItem.credit ? formatRupiah(pasivaItem.credit) : ""}
                  </td>
                </tr>
              );
            })} */}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
