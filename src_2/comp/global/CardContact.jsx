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
            <Col xs={4}>
              <strong>Email</strong>
            </Col>
            <Col xs={8}>
              <a href="mailto:purwamalajat@gmail.com">admin@kkpus.id</a>
            </Col>
          </Row>

          <Row className="mb-2">
            <Col md={4}>
              <strong>Kontak Pengurus KKPU</strong>
            </Col>
            <Col md={8}>
              <Row>
                <Col xs={12}>Budi Santoso 0818-383-078</Col>
                <Col xs={12}>Hendrik 0857-8223-8667</Col>
                <Col xs={12}>Dody 0878-7749-6562</Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <strong>Alamat</strong>
            </Col>
            <Col md={8}>
              Jl. Cisadene 1 Blok N4 No.17, Perum Graha Asri Cikarang, – Bekasi
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
