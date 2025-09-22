import { Row, Table } from "react-bootstrap";
import { formatRupiah } from "../../utils/formatRupiah";

export default function InvoiceDetail({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center my-3">Belum ada item invoice</p>;
  }

  const total = data.reduce((sum, row) => sum + (Number(row.ammount) || 0), 0);

  return (
    <Row>
      <Table bordered hover responsive className="mb-4">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th className="text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.name}</td>
              <td className="text-end">{formatRupiah(row.ammount)}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td className="fw-bold">Total</td>
            <td className="fw-bold text-end">{formatRupiah(total)}</td>
          </tr>
        </tfoot>
      </Table>
    </Row>
  );
}
