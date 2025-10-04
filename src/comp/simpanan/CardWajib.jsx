import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import USimpanan from "../../utils/USimpanan";
import InvoiceHeader from "../../pages/global/InvoiceHeader";
import InvoiceDetail from "../../pages/global/InvoiceDetail";

export default function CardWajib({ selectedCategory }) {
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    console.log(isMounted);

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await USimpanan.getDataSimpanan(selectedCategory);
        console.log(res);

        console.log(res.data);
        if (isMounted) {
          setInvoiceData(res?.data?.invoiceTrans || null);
        }
      } catch (error) {
        console.log(error);

        console.error("Gagal mengambil data simpanan:", error);
        if (isMounted) setInvoiceData(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [selectedCategory]);

  const paymentStatus = invoiceData?.payment_status || "Belum dibayar";
  const paymentVariant =
    paymentStatus === "Pembayaran Berhasil" ? "success" : "danger";

  return (
    <Card className="border shadow">
      <CardHeader className="bg-topbar text-white">
        <CardTitle className="fw-bold">Simpanan Wajib</CardTitle>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : invoiceData ? (
          <Row className="gy-3">
            <InvoiceHeader invoiceData={invoiceData} />
            <InvoiceDetail data={invoiceData?.detailsInvoice || []} />
            <Row>
              <Col xs={6} className="fw-bold">
                Status Pembayaran
              </Col>
              <Col xs={6} className="fw-bold text-end">
                <Button
                  variant={paymentVariant}
                  size="sm"
                  disabled
                  className="w-100"
                >
                  {paymentStatus}
                </Button>
              </Col>
            </Row>
          </Row>
        ) : (
          <p>Tidak ada data simpanan.</p>
        )}
      </CardBody>
    </Card>
  );
}
