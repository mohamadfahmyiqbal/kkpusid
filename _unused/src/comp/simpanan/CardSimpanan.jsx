import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import USimpanan from "../../utils/USimpanan";
import { formatRupiah } from "../../utils/formatRupiah";
import { jwtEncode } from "../../routes/helpers"; // biar konsisten sama InvoiceScreen

export default function CardPokok({ selectedCategory }) {
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedCategory) {
      setInvoiceData(null);
      return;
    }

    let cancel = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await USimpanan.getCardSimpanan(selectedCategory);
        if (!cancel) setInvoiceData(res?.data || null);
      } catch (error) {
        console.error("Gagal mengambil data simpanan:", error);
        if (!cancel) setInvoiceData(null);
      } finally {
        if (!cancel) setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [selectedCategory]);

  const renderInfoRow = (label, value) => (
    <>
      <Col xs={6}>
        <CardText>{label}</CardText>
      </Col>
      <Col xs={6} className="text-end">
        <CardText>{value ?? "-"}</CardText>
      </Col>
    </>
  );

  const handleClick = (action) => {
    if (action === "invoice") {
      navigate(`/${jwtEncode({ page: action })}`, {
        state: {
          title: "Invoice Simpanan Pokok",
          back: "Simpanan",
          data: invoiceData?.token,
          jenis: selectedCategory,
        },
      });
    } else if (action === "tagihan") {
      navigate(`/${jwtEncode({ page: action })}`, {
        state: {
          title: "Tagihan",
          back: "Simpanan",
          data: {
            token: invoiceData?.token, // pastikan backend kasih token invoice di invoiceData
          },
          jenis: selectedCategory,
        },
      });
    } else if (action === "Sukarela") {
      navigate(`/${jwtEncode({ page: action })}`, {
        state: {
          title: "Sukarela",
          back: "Simpanan",
          data: {
            token: invoiceData?.token, // pastikan backend kasih token invoice di invoiceData
          },
          jenis: selectedCategory,
        },
      });
    } else if (action === "Pencairan") {
      navigate(`/${jwtEncode({ page: action })}`, {
        state: {
          title: "Pencairan Simpanan Sukarela",
          back: "Simpanan",
          data: {
            token: invoiceData?.token, // pastikan backend kasih token invoice di invoiceData
          },
          jenis: selectedCategory,
        },
      });
    }
  };

  return (
    <Container fluid>
      <Card className="bg-topbar text-white">
        <CardBody>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <Row>
              <Col xs={12} className="border-bottom text-white">
                <CardTitle className="text-center fw-bold">
                  Informasi Rekening
                </CardTitle>
              </Col>
              <Col xs={12} className="mt-2">
                <Row>
                  {renderInfoRow("Nama", invoiceData?.nama)}
                  {renderInfoRow("Produk", invoiceData?.produk)}
                  {renderInfoRow("Akad", invoiceData?.akad)}
                  {renderInfoRow("Tanggal Buka", invoiceData?.tanggal_buka)}
                  {renderInfoRow("Nominal", formatRupiah(invoiceData?.nominal))}
                  {renderInfoRow(
                    "Saldo Akhir",
                    formatRupiah(invoiceData?.saldo)
                  )}
                  {selectedCategory?.name === "Simpanan Wajib" &&
                    renderInfoRow(
                      "Tagihan",
                      formatRupiah(invoiceData?.tagihan)
                    )}
                </Row>
              </Col>
            </Row>
          )}

          {!loading && invoiceData?.produk && (
            <Row className="mt-4 justify-content-center text-center">
              {invoiceData.produk === "Simpanan Pokok" && (
                <Col xs="auto">
                  <Button
                    size="sm"
                    variant="outline-light"
                    className="rounded fw-bold d-flex flex-column align-items-center justify-content-center px-3 py-2 shadow-sm hover-scale text-center"
                    onClick={() => handleClick("invoice")}
                  >
                    <Image
                      src="/assets/icons/detail.png"
                      height={28}
                      className="mb-1"
                    />
                    <span>Detail</span>
                  </Button>
                </Col>
              )}
              {invoiceData.produk === "Simpanan Wajib" && (
                <Col xs="auto">
                  <Button
                    size="sm"
                    variant="outline-light"
                    className="rounded fw-bold d-flex flex-column align-items-center justify-content-center px-3 py-2 shadow-sm hover-scale text-center"
                    onClick={() => handleClick("tagihan")}
                  >
                    <Image
                      src="/assets/icons/depositbox.png"
                      height={28}
                      className="mb-1"
                    />
                    <span>Setoran</span>
                  </Button>
                </Col>
              )}
              {invoiceData.produk === "Simpanan Sukarela" && (
                <Row className="text-center justify-content-center">
                  <Col xs="auto">
                    <Button
                      size="sm"
                      variant="outline-light"
                      className="rounded fw-bold d-flex flex-column align-items-center justify-content-center px-3 py-2 shadow-sm hover-scale text-center"
                      onClick={() => handleClick("Sukarela")}
                    >
                      <Image
                        src="/assets/icons/depositbox.png"
                        height={28}
                        className="mb-1"
                      />
                      <span>Setoran</span>
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      size="sm"
                      variant="outline-light"
                      className="rounded fw-bold d-flex flex-column align-items-center justify-content-center px-3 py-2 shadow-sm hover-scale text-center"
                      onClick={() => handleClick("Pencairan")}
                    >
                      <Image
                        src="/assets/icons/pencairan.png"
                        height={28}
                        className="mb-1"
                      />
                      <span>Pencairan</span>
                    </Button>
                  </Col>
                </Row>
              )}
            </Row>
          )}
        </CardBody>
      </Card>
    </Container>
  );
}
