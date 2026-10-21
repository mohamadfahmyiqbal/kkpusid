import React from "react";
import { Card, Table } from "react-bootstrap";

// 💰 Format Rupiah
const formatRupiah = (value) => {
  const number = Math.abs(Number(value)); // Hilangkan minus
  if (isNaN(number)) return "-";
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export default function TPinjamanLunak({ data = {} }) {
  const reclass = data?.reclass ?? [];
  const totalRow = data?.totalReclass ?? {};
  const headerKeys = reclass.length > 0 ? Object.keys(reclass[0]) : [];

  const tahun = new Date().getFullYear();
  const tahunLalu = tahun - 1;

  const groupColKeys = ["jumlah pinjaman", "pembayaran cicilan"];

  // 🔁 Mapping subkey untuk kolom grup
  const subKeyMap = {};
  groupColKeys.forEach((gk) => {
    const key = headerKeys.find((h) => h.toLowerCase() === gk.toLowerCase());
    if (key) {
      const sample = reclass.find((r) => r[key]);
      if (sample && typeof sample[key] === "object") {
        subKeyMap[key] = Object.keys(sample[key]);
      }
    }
  });

  return (
    <Card className="shadow-sm border-primary rounded mt-4">
      <Card.Header className="bg-blue700 text-white">
        Laporan Pinjaman Lunak
      </Card.Header>
      <Card.Body>
        <div style={{ maxHeight: 400, overflow: "auto" }}>
          <Table
            bordered
            striped
            responsive
            className="mb-0"
            style={{ minWidth: 1000 }}
          >
            <thead
              className="table-dark text-center"
              style={{ position: "sticky", top: 0, zIndex: 10 }}
            >
              <tr>
                <th rowSpan={2}>No</th>
                {headerKeys.map((key) => {
                  const isGroup = groupColKeys.includes(key.toLowerCase());
                  const subKeys = subKeyMap[key] || [];
                  return isGroup ? (
                    <th key={key} colSpan={subKeys.length || 1}>
                      {key.toUpperCase()}
                    </th>
                  ) : (
                    <th key={key} rowSpan={2}>
                      {key.toUpperCase()}
                    </th>
                  );
                })}
              </tr>
              <tr>
                {headerKeys.flatMap((key) => {
                  const isGroup = groupColKeys.includes(key.toLowerCase());
                  const subKeys = subKeyMap[key] || [];
                  return isGroup
                    ? subKeys.map((sk, i) => (
                        <th key={`${key}-sub-${i}`}>{sk.toUpperCase()}</th>
                      ))
                    : [];
                })}
              </tr>
            </thead>

            <tbody>
              {reclass.length === 0 ? (
                <tr>
                  <td colSpan={headerKeys.length + 1} className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                reclass.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    {headerKeys.flatMap((key) => {
                      const val = item[key];
                      const isGroup = groupColKeys.includes(key.toLowerCase());
                      if (isGroup) {
                        const subKeys = subKeyMap[key] || [];
                        return subKeys.map((subKey, i) => {
                          const subVal = val?.[subKey];
                          return (
                            <td key={`${key}-${idx}-${i}`}>
                              {Number.isFinite(subVal)
                                ? formatRupiah(subVal)
                                : subVal ?? "-"}
                            </td>
                          );
                        });
                      }
                      return (
                        <td key={`${key}-${idx}`}>
                          {Number.isFinite(val)
                            ? formatRupiah(val)
                            : val ?? "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>

            {reclass.length > 0 && Object.keys(totalRow).length > 0 && (
              <tfoot className="table-dark text-center">
                <tr>
                  <td colSpan={5}>
                    <strong>Total</strong>
                  </td>
                  {Object.entries(totalRow).map(([key, val]) => (
                    <td key={`tfoot-${key}`}>
                      <strong>
                        {Number.isFinite(val) ? formatRupiah(val) : "-"}
                      </strong>
                    </td>
                  ))}
                </tr>
              </tfoot>
            )}
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
