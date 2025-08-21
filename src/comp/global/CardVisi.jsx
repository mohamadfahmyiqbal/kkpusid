import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  ListGroup,
  Row,
} from "react-bootstrap";

export default function CardVisi() {
  return (
    <>
      <CardTitle className="fw-bold mb-2">Visi & Misi</CardTitle>
      <Card className="shadow">
        <CardHeader className="bg-topbar text-white">
          <CardTitle>Visi</CardTitle>
        </CardHeader>
        <CardBody>
          <Card.Text>
            BERTEKAD UNTUK MELAKSANAKAN MUAMALAH SYAR’I SESUAI AL QUR’AN DAN AL
            HADIST SERTA IJMA PARA SALAFUSHSHOLIH
          </Card.Text>
        </CardBody>
      </Card>
      <Card className="shadow">
        <CardHeader className="bg-topbar text-white">
          <CardTitle>Misi</CardTitle>
        </CardHeader>
        <CardBody>
          <ListGroup variant="flush">
            <ListGroup.Item>
              • BERTRANSAKSI DENGAN MENJAUHI TRANSAKSI RIBA, GHOOR DAN DZALIM
            </ListGroup.Item>
            <ListGroup.Item>
              • MENGAJAK KAUM MUSLIMIN UNTUK BERMUAMALAH SECARA SYAR’I
            </ListGroup.Item>
            <ListGroup.Item>
              • PENDIDIKAN PENGURUS DAN ANGGOTA TERUTAMA MASALAH MUAMALAH SYAR’I
            </ListGroup.Item>
            <ListGroup.Item>
              • BERKONTRIBUSI KEPADA MASYARAKAT UNTUK MENJAUHI TRANSAKSI RIBA,
              GHOOR DAN DZALIM
            </ListGroup.Item>
            <ListGroup.Item>
              • MEMBANTU MASYARAKAT DENGAN BERTRANSAKSI SECARA SYAR’I
            </ListGroup.Item>
            <ListGroup.Item>• MENSEJAHTERAKAN ANGGOTA</ListGroup.Item>
          </ListGroup>
        </CardBody>
      </Card>
    </>
  );
}
