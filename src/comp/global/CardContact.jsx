import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  ListGroup,
  Row,
} from "react-bootstrap";

export default function CardContact() {
  return (
    <>
      <CardTitle className="fw-bold mb-2">Hubungi Kami </CardTitle>
      <Card className="shadow">
        <Card.Body>
          <Row className="mb-2">
            <Col md={2}>
              <strong>Email</strong>
            </Col>
            <Col md={10}>
              :{" "}
              <a href="mailto:purwamalajat@gmail.com">purwamalajat@gmail.com</a>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={2}>
              <strong>Kontak Pengurus KKPU</strong>
            </Col>
            <Col md={10}>
              : HP: 0852-8145-0170 / 0818-383-078 / 0857-8222-8667
            </Col>
          </Row>

          <Row>
            <Col md={2}>
              <strong>Alamat</strong>
            </Col>
            <Col md={10}>
              : Jl. Cisaden 1 Blok N4 No.17, Perum Graha Asri Cikarang – Bekasi
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
