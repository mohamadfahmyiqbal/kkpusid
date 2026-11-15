import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";
import { FaClock, FaListAlt, FaPlay } from "react-icons/fa";
import { memo } from "react";

// Data dummy, bisa diganti dengan props/fetch API jika sudah tersedia
const contentList = [
  {
    id: 1,
    kode: "ART.001",
    judul: "Mengenal Koperasi Syariah",
    kategori: "Artikel Edukasi",
    status: "Published",
    penulis: "Admin Koperasi",
    tanggal: "1 Juni 2024",
    waktuBaca: "5 Menit",
    isActive: true,
    gambar: "https://via.placeholder.com/120x60?text=Koperasi",
    artikel:
      "Artikel ini membahas pengenalan koperasi syariah, prinsip-prinsip dasar, dan manfaatnya bagi anggota serta masyarakat.",
  },
  {
    id: 2,
    kode: "ART.002",
    judul: "Tips Menjadi Anggota Koperasi Aktif",
    kategori: "Tips & Trik",
    status: "Published",
    penulis: "Kontributor",
    tanggal: "28 Mei 2024",
    waktuBaca: "3 Menit",
    isActive: true,
    gambar: "https://via.placeholder.com/120x60?text=Tips",
    artikel:
      "Dapatkan tips praktis untuk menjadi anggota koperasi yang aktif, berkontribusi, dan mendapatkan manfaat maksimal dari keanggotaan.",
  },
  {
    id: 3,
    kode: "ART.003",
    judul: "Sejarah Perkoperasian di Indonesia",
    kategori: "Sejarah",
    status: "Draft",
    penulis: "Admin Koperasi",
    tanggal: "20 Mei 2024",
    waktuBaca: "7 Menit",
    isActive: false,
    gambar: "https://via.placeholder.com/120x60?text=Sejarah",
    artikel:
      "Ulasan singkat mengenai sejarah perkembangan koperasi di Indonesia dari masa ke masa.",
  },
];

const ContentCard = memo(
  ({
    kode,
    judul,
    kategori,
    status,
    penulis,
    tanggal,
    waktuBaca,
    isActive,
    gambar,
    artikel,
  }) => (
    <Card className="mb-3 border-0 shadow-sm">
      <CardHeader className="bg-light">
        <CardTitle className="fw-bold mb-2">{judul}</CardTitle>
      </CardHeader>
      <CardBody>
        {/* Tampilkan ringkasan artikel */}
        {artikel.length > 100 ? (
          <>
            <CardText className="mb-3" style={{ fontSize: "0.97em" }}>
              {artikel.slice(0, 100)}...
              <a
                href={`/readarticle?id=${kode}`}
                className="ms-2 text-primary"
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                Read more
              </a>
            </CardText>
          </>
        ) : (
          <CardText className="mb-3" style={{ fontSize: "0.97em" }}>
            {artikel}
          </CardText>
        )}
        {/* Placeholder image, bisa diganti jika ada gambar */}
        <div className="text-center mb-3">
          <Image
            src={gambar}
            alt={judul}
            fluid
            style={{ maxHeight: 60, objectFit: "contain" }}
          />
        </div>
      </CardBody>
    </Card>
  )
);

function CardArticle() {
  return (
    <Card className="border shadow mb-3">
      <Card.Header className="bg-topbar text-white rounded-top border-bottom">
        <CardTitle className="mb-0">Article</CardTitle>
      </Card.Header>
      <Card.Body style={{ maxHeight: "200px", overflowY: "auto", padding: 0 }}>
        <Container fluid>
          {contentList.map((item) => (
            <ContentCard key={item.id} {...item} />
          ))}
        </Container>
      </Card.Body>
    </Card>
  );
}

export default memo(CardArticle);
