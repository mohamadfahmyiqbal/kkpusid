import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { FaClock, FaListAlt, FaPlay } from "react-icons/fa";
import { memo } from "react";

// Data dummy, bisa diganti dengan props/fetch API jika sudah tersedia
const trainingList = [
  {
    id: 1,
    kode: "QA.EM01",
    judul: "Pembahasan Akad Jual Beli",
    program: "Program Wajib",
    status: "Active",
    jumlahSoal: 15,
    tanggal: "Jumat 2 Mei 2025",
    durasi: "30 Menit",
    isActive: true,
  },
  {
    id: 2,
    kode: "QA.EM02",
    judul: "Dasar-dasar Koperasi",
    program: "Program Wajib",
    status: "Active",
    jumlahSoal: 10,
    tanggal: "Senin 5 Mei 2025",
    durasi: "25 Menit",
    isActive: true,
  },
  {
    id: 3,
    kode: "QA.EM03",
    judul: "Manajemen Keuangan",
    program: "Program Wajib",
    status: "Active",
    jumlahSoal: 20,
    tanggal: "Rabu 7 Mei 2025",
    durasi: "40 Menit",
    isActive: true,
  },
];

const TrainingCard = memo(
  ({ kode, judul, program, status, jumlahSoal, tanggal, durasi, isActive }) => (
    <Card className="mb-3 border-0 shadow-sm">
      <CardBody>
        <Row className="align-items-center">
          <Col xs={6}>
            <Button className="bg-blue100 text-black" size="sm" disabled>
              {program}
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Button
              variant={isActive ? "success" : "secondary"}
              size="sm"
              disabled
            >
              {status}
            </Button>
          </Col>
          <Col xs={12} className="mt-2">
            <CardText className="mb-0 fw-bolder">{kode}</CardText>
            <CardText>{judul}</CardText>
          </Col>
          <Col xs={6}>
            <Button className="bg-blue100 text-black" size="sm" disabled>
              <FaListAlt /> {jumlahSoal} Soal
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Button className="bg-blue100 text-black" size="sm" disabled>
              <span className="d-flex flex-column align-items-end">
                <span className="d-flex align-items-center mb-1">
                  <FaClock className="me-1" /> {tanggal}
                </span>
                <span>{durasi}</span>
              </span>
            </Button>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xs={12}>
            <Button
              variant="outline-primary"
              className="fw-bold w-100"
              size="sm"
            >
              <FaPlay /> Membaca Materi
            </Button>
          </Col>
          <Col xs={12}>
            <Button className="bg-blue700 fw-bold w-100 mt-2 mt-xs-0" size="sm">
              Kerjakan
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
);

function CardTraining() {
  return (
    <Container fluid>
      <Card className="border shadow mb-3">
        <Card.Header className="bg-blue700 text-white rounded-top border-bottom">
          <CardTitle>Evaluasi</CardTitle>
        </Card.Header>
        <Card.Body
          style={{ maxHeight: "200px", overflowY: "auto", padding: 0 }}
        >
          <Container fluid>
            {trainingList.map((item) => (
              <TrainingCard key={item.id} {...item} />
            ))}
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default memo(CardTraining);
