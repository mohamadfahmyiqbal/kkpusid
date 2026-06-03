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
import { FaStore, FaPlus, FaWallet } from "react-icons/fa";

const PendanaanSyariah = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("list");
  const [hasActivePendanaan, setHasActivePendanaan] = useState(false);
  const [pendanaanList, setPendanaanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch data from API
    // checkActivePendanaan();
    // fetchPendanaanList();

    // Mock data
    setTimeout(() => {
      setHasActivePendanaan(false);
      setPendanaanList([
        {
          id: 1,
          businessName: "Warung Berkah",
          owner: "Budi Santoso",
          sector: "Retail",
          fundingTarget: 50000000,
          currentFunding: 35000000,
          profitShare: "15%",
          period: 12,
          riskLevel: "Sedang",
          status: "active",
        },
        {
          id: 2,
          businessName: "Keripik Santri",
          owner: "Ahmad Fauzi",
          sector: "Food & Beverage",
          fundingTarget: 30000000,
          currentFunding: 20000000,
          profitShare: "12%",
          period: 6,
          riskLevel: "Rendah",
          status: "active",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = useCallback((value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  }, []);

  const handlePengajuanBaru = useCallback(() => {
    const token = jwtEncode({ page: "formPendanaanSyariah" });
    navigate(`/${token}`);
  }, [navigate]);

  const handleViewPortofolio = useCallback(() => {
    setActiveTab("portofolio");
  }, []);

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "investasiDashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <LayoutGlobal title="Pendanaan Syariah">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Memuat data pendanaan...</p>
        </div>
      </LayoutGlobal>
    );
  }

  return (
    <LayoutGlobal title="Pendanaan Syariah">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaStore className="me-2" />
            Pendanaan Syariah
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

            {!hasActivePendanaan ? (
              // Status: Belum memiliki pendanaan aktif
              <Card className="shadow-lg border-0">
                <Card.Body className="p-5 text-center">
                  <div className="text-muted mb-4" style={{ fontSize: "64px" }}>
                    <FaStore />
                  </div>
                  <h5 className="fw-bold mb-3">Informasi Pendanaan</h5>
                  <p className="text-muted mb-4">
                    Anda belum memiliki pendanaan aktif. Ajukan pendanaan baru
                    untuk usaha Anda atau berikan pendanaan pada usaha UMKM
                    lain.
                  </p>
                  <Button
                    variant="primary"
                    className="px-5 py-2 fw-bold shadow-sm"
                    onClick={handlePengajuanBaru}
                  >
                    <FaPlus className="me-2" />
                    Ajukan Pendanaan
                  </Button>
                </Card.Body>
              </Card>
            ) : (
              // Status: Memiliki pendanaan aktif
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-4"
                  >
                    <Tab
                      eventKey="list"
                      title={
                        <>
                          <FaStore className="me-2" />
                          Daftar Pendanaan
                        </>
                      }
                    >
                      <h6 className="fw-bold mb-3">Peluang Pendanaan UMKM</h6>
                      <div className="table-responsive">
                        <Table hover className="align-middle">
                          <thead>
                            <tr>
                              <th>Nama Usaha</th>
                              <th>Pemilik</th>
                              <th>Sektor</th>
                              <th className="text-end">Target Dana</th>
                              <th className="text-end">Bagi Hasil</th>
                              <th className="text-end">Periode</th>
                              <th>Risiko</th>
                              <th>Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pendanaanList.map((item) => (
                              <tr key={item.id}>
                                <td className="fw-bold">{item.businessName}</td>
                                <td>{item.owner}</td>
                                <td>{item.sector}</td>
                                <td className="text-end">
                                  Rp {formatCurrency(item.fundingTarget)}
                                </td>
                                <td className="text-end text-success">
                                  {item.profitShare}
                                </td>
                                <td className="text-end">
                                  {item.period} bulan
                                </td>
                                <td>
                                  <Badge
                                    bg={
                                      item.riskLevel === "Rendah"
                                        ? "success"
                                        : item.riskLevel === "Sedang"
                                          ? "warning"
                                          : "danger"
                                    }
                                  >
                                    {item.riskLevel}
                                  </Badge>
                                </td>
                                <td>
                                  <Button variant="primary" size="sm">
                                    Danai
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                      {pendanaanList.length === 0 && (
                        <div className="text-center py-4 text-muted">
                          Tidak ada peluang pendanaan saat ini
                        </div>
                      )}
                    </Tab>

                    <Tab
                      eventKey="portofolio"
                      title={
                        <>
                          <FaWallet className="me-2" />
                          Portofolio Saya
                        </>
                      }
                    >
                      <h6 className="fw-bold mb-3">
                        Portofolio Pendanaan Anda
                      </h6>
                      <Card className="bg-light border-0">
                        <Card.Body className="p-4 text-center">
                          <p className="text-muted mb-3">
                            Fitur portofolio pendanaan akan segera tersedia
                          </p>
                          <Button
                            variant="outline-primary"
                            onClick={handlePengajuanBaru}
                          >
                            <FaPlus className="me-2" />
                            Ajukan Pendanaan Baru
                          </Button>
                        </Card.Body>
                      </Card>
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
            )}
          </Col>
        </Row>
      </Container>
    </LayoutGlobal>
  );
};

export default PendanaanSyariah;
