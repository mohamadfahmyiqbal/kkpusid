import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Table,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import LayoutGlobal from "../../../components/layout/components/LayoutGlobal";
import { FaCertificate, FaWallet, FaHistory } from "react-icons/fa";

const InvestasiHalal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("sukuk");
  const [sukukList, setSukukList] = useState([]);
  const [portofolioList, setPortofolioList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch data from API
    // fetchSukukList();
    // fetchPortofolioList();

    // Mock data
    setTimeout(() => {
      setSukukList([
        {
          id: 1,
          name: "Sukuk Ritel SR016",
          issuer: "Pemerintah RI",
          type: "Sukuk Ritel",
          coupon: "6.50%",
          maturity: "2027-03-15",
          minInvestment: 1000000,
          price: 102.5,
          status: "available",
        },
        {
          id: 2,
          name: "Sukuk Ritel SR015",
          issuer: "Pemerintah RI",
          type: "Sukuk Ritel",
          coupon: "6.25%",
          maturity: "2026-09-15",
          minInvestment: 1000000,
          price: 101.8,
          status: "available",
        },
        {
          id: 3,
          name: "Sukuk Korporasi ABC",
          issuer: "PT ABC Tbk",
          type: "Sukuk Korporasi",
          coupon: "7.00%",
          maturity: "2028-06-30",
          minInvestment: 5000000,
          price: 103.2,
          status: "available",
        },
      ]);

      setPortofolioList([
        {
          id: 1,
          name: "Sukuk Ritel SR014",
          purchaseDate: "2023-06-15",
          units: 100,
          purchasePrice: 100.0,
          currentValue: 102.5,
          profit: 2.5,
          status: "active",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const handleInvestSukuk = useCallback(
    (sukukId) => {
      const token = jwtEncode({
        page: "detailSukuk",
        sukukId,
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const handleRedeem = useCallback(
    (portofolioId) => {
      const token = jwtEncode({
        page: "pengembalianModal",
        portofolioId,
      });
      navigate(`/${token}`);
    },
    [navigate],
  );

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "investasiDashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <LayoutGlobal title="Investasi Halal">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Memuat data investasi...</p>
        </div>
      </LayoutGlobal>
    );
  }

  return (
    <LayoutGlobal title="Investasi Halal">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaCertificate className="me-2" />
            Investasi Halal
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <Tabs
                  activeKey={activeTab}
                  onSelect={(k) => setActiveTab(k)}
                  className="mb-4"
                >
                  <Tab
                    eventKey="sukuk"
                    title={
                      <>
                        <FaCertificate className="me-2" />
                        List Sukuk
                      </>
                    }
                  >
                    <h6 className="fw-bold mb-3">Produk Sukuk Tersedia</h6>
                    <div className="table-responsive">
                      <Table hover className="align-middle">
                        <thead>
                          <tr>
                            <th>Nama Produk</th>
                            <th>Penerbit</th>
                            <th>Tipe</th>
                            <th>Kupon</th>
                            <th>Jatuh Tempo</th>
                            <th className="text-end">Min. Investasi</th>
                            <th className="text-end">Harga</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sukukList.map((sukuk) => (
                            <tr key={sukuk.id}>
                              <td>
                                <div className="fw-bold">{sukuk.name}</div>
                              </td>
                              <td>{sukuk.issuer}</td>
                              <td>{sukuk.type}</td>
                              <td>
                                <Badge bg="success">{sukuk.coupon}</Badge>
                              </td>
                              <td>{formatDate(sukuk.maturity)}</td>
                              <td className="text-end">
                                Rp {formatCurrency(sukuk.minInvestment)}
                              </td>
                              <td className="text-end">{sukuk.price}%</td>
                              <td>
                                <Button
                                  variant="primary"
                                  size="sm"
                                  onClick={() => handleInvestSukuk(sukuk.id)}
                                >
                                  Investasi
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {sukukList.length === 0 && (
                      <div className="text-center py-4 text-muted">
                        Tidak ada produk sukuk tersedia saat ini
                      </div>
                    )}
                  </Tab>

                  <Tab
                    eventKey="portofolio"
                    title={
                      <>
                        <FaWallet className="me-2" />
                        Portofolio
                      </>
                    }
                  >
                    <h6 className="fw-bold mb-3">Portofolio Sukuk Anda</h6>
                    <div className="table-responsive">
                      <Table hover className="align-middle">
                        <thead>
                          <tr>
                            <th>Nama Produk</th>
                            <th>Tanggal Pembelian</th>
                            <th>Unit</th>
                            <th className="text-end">Harga Beli</th>
                            <th className="text-end">Nilai Saat Ini</th>
                            <th className="text-end">Keuntungan</th>
                            <th>Status</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portofolioList.map((item) => (
                            <tr key={item.id}>
                              <td className="fw-bold">{item.name}</td>
                              <td>{formatDate(item.purchaseDate)}</td>
                              <td>{item.units}</td>
                              <td className="text-end">
                                {item.purchasePrice}%
                              </td>
                              <td className="text-end">{item.currentValue}%</td>
                              <td className="text-end text-success">
                                +{item.profit}%
                              </td>
                              <td>
                                <Badge bg="success">Aktif</Badge>
                              </td>
                              <td>
                                <Button
                                  variant="outline-primary"
                                  size="sm"
                                  onClick={() => handleRedeem(item.id)}
                                >
                                  Tebus
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    {portofolioList.length === 0 && (
                      <div className="text-center py-4 text-muted">
                        Anda belum memiliki portofolio sukuk
                      </div>
                    )}
                  </Tab>
                </Tabs>

                <div className="mt-4">
                  <Button
                    variant="light"
                    className="px-4 py-2 fw-bold text-muted"
                    onClick={handleBack}
                  >
                    Kembali
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </LayoutGlobal>
  );
};

export default InvestasiHalal;
