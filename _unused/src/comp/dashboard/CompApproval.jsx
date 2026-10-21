import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "react-bootstrap";

export default function CompApproval() {
  const data = [
    {
      no: 1,
      time: "01-01-2025 08:00",
      desc: "Pendaftaran Anggota Reguler",
      requester: "Avhan Hadi Bijaksana",
      status: "Waiting Approval",
    },
    {
      no: 2,
      time: "01-01-2025 08:00",
      desc: "Pembayaran Simpanan Pokok",
      requester: "Avhan Hadi Bijaksana",
      status: "Waiting Approval",
    },
  ];

  return (
    <Card className="shadow mb-4">
      <CardHeader className="bg-topbar text-white">
        <CardTitle as="h5" className="mb-0">
          Approval
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table striped bordered hover responsive className="mb-0">
          <thead>
            <tr>
              <th>No</th>
              <th>Time</th>
              <th>Desc</th>
              <th>Requester</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.no}>
                <td>{row.no}</td>
                <td>{row.time}</td>
                <td>{row.desc}</td>
                <td>{row.requester}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
