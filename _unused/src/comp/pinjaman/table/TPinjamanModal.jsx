import React from "react";
import { Card, Table } from "react-bootstrap";

// 💰 Fungsi Format Rupiah
const formatRupiah = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "-";
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

export default function TPinjamanModal({ data = [] }) {
  const headerKeys = data.length > 0 ? Object.keys(data[0]) : [];

  const isNumericKey = (key) =>
    key === "term" || typeof data[0]?.[key] === "number";

  const totalReducer = (key) =>
    data.reduce((sum, item) => {
      let value = 0;
      if (key === "term") {
        value = Number(item.term?.data ?? 0);
      } else {
        value = Number(item[key] ?? 0);
      }
      return !isNaN(value) ? sum + value : sum;
    }, 0);

  const colSpanBeforeTotal =
    1 + headerKeys.filter((key) => !isNumericKey(key)).length;

  return (
    <Card className="shadow-sm border-primary rounded mt-4">
      <Card.Header className="bg-blue700 text-white">
        Laporan Pinjaman Lunak
      </Card.Header>
      <Card.Body>
        <div style={{ maxHeight: "400px", overflow: "auto" }}>
          <Table
            bordered
            striped
            responsive
            className="mb-0"
            style={{ minWidth: "1000px" }}
          >
            <thead
              className="table-dark text-center"
              style={{ position: "sticky", top: 0, zIndex: 10 }}
            >
              <tr>
                <th rowSpan={headerKeys.includes("term") ? 2 : 1}>No</th>
                {headerKeys.map((key) =>
                  key === "term" ? (
                    <th key={key} colSpan={2}>
                      Term
                    </th>
                  ) : (
                    <th key={key} rowSpan={headerKeys.includes("term") ? 2 : 1}>
                      {key.toUpperCase()}
                    </th>
                  )
                )}
              </tr>
              {headerKeys.includes("term") && (
                <tr>
                  <th>Bulan</th>
                  <th>Data</th>
                </tr>
              )}
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={headerKeys.length + 1} className="text-center">
                    Tidak ada data.
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    {headerKeys.map((key) => {
                      if (key === "term") {
                        return (
                          <React.Fragment key={`term-${idx}`}>
                            <td>{item.term?.bulan ?? "-"}</td>
                            <td>{formatRupiah(item.term?.data)}</td>
                          </React.Fragment>
                        );
                      }

                      const value = item[key];
                      return (
                        <td key={`${key}-${idx}`}>
                          {typeof value === "number"
                            ? formatRupiah(value)
                            : value ?? "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
            {data.length > 0 && (
              <tfoot className="table-dark">
                <tr>
                  <td colSpan={colSpanBeforeTotal}>
                    <strong>Total</strong>
                  </td>
                  {headerKeys.map((key) => {
                    if (key === "term") {
                      return (
                        <React.Fragment key="total-term">
                          <td></td>
                          <td>
                            <strong>
                              {formatRupiah(totalReducer("term"))}
                            </strong>
                          </td>
                        </React.Fragment>
                      );
                    }

                    const isNumeric = typeof data[0]?.[key] === "number";
                    return isNumeric ? (
                      <td key={`total-${key}`}>
                        <strong>{formatRupiah(totalReducer(key))}</strong>
                      </td>
                    ) : null;
                  })}
                </tr>
              </tfoot>
            )}
          </Table>
        </div>
      </Card.Body>
    </Card>
  );
}
