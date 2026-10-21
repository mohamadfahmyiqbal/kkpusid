import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "react-bootstrap";

export default function CompNotif() {
  const data = [
    {
      no: 1,
      time: "01-01-2025 08:00",
      notif: "Register Anggota Baru",
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
              <th>Date</th>
              <th>Notif</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.no}>
                <td>{row.no}</td>
                <td>{row.time}</td>
                <td>{row.notif}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
