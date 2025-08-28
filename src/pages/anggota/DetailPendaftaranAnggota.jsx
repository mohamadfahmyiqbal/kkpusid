import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Image,
  Button,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import UAnggota from "../../utils/UAnggota";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft } from "react-icons/fa";

export default function DetailPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [dataPendaftaran, setDataPendaftaran] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  // Jika navigasi membawa data (mis. location.state), gunakan langsung supaya cepat tampil
  useEffect(() => {
    if (location?.state?.dataPendaftaran) {
      setDataPendaftaran(location.state.dataPendaftaran);
    }
  }, [location?.state]);

  // Ambil data pendaftaran berdasarkan user.nik (ketika tersedia)
  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      if (!user?.nik) return;

      setLoading(true);
      setError(null);

      try {
        const res = await UAnggota.cekPendaftaranAnggota({ nik: user.nik });
        if (!mounted) return;
        setDataPendaftaran(res?.data?.data ?? null);
      } catch (err) {
        if (!mounted) return;
        setError("Gagal mengambil data pendaftaran. Silakan coba lagi.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, [user?.nik]);

  // Helper untuk render field dengan fallback
  const renderField = (label, value) => (
    <Row className="mb-2">
      <Col xs={4}>
        <strong>{label}</strong>
      </Col>
      <Col xs={8} className="text-end">
        {value ?? "-"}
      </Col>
    </Row>
  );

  const handleClick = () => {
    const token = jwtEncode({
      page: "invoice",
    });
    navigate(`/page/${token}`, {
      state: {
        title: "Invoice Pendaftaran",
      },
    });
  };

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="link"
                className="p-0 me-2"
                onClick={() => navigate(-1)}
                style={{ textDecoration: "none" }}
              >
                <FaArrowLeft size={15} color="black" />
              </Button>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12} className="mb-3">
              <Card className="border shadow">
                <CardHeader className="bg-topbar text-white">
                  <CardTitle>Detail Pendaftaran Anggota</CardTitle>
                </CardHeader>
                <CardBody>
                  {loading && (
                    <div className="text-center my-3">
                      <Spinner animation="border" role="status" />
                    </div>
                  )}

                  {error && (
                    <Alert variant="danger" className="my-2">
                      {error}
                    </Alert>
                  )}

                  {!loading && !dataPendaftaran && !error && (
                    <div className="text-muted">
                      Tidak ada data pendaftaran untuk ditampilkan.
                    </div>
                  )}

                  {dataPendaftaran && (
                    <>
                      {/* Personal Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Personal Info
                        </h5>

                        {renderField("Nama", dataPendaftaran?.anggota?.nama)}
                        {renderField("NIK", dataPendaftaran?.detail?.nik)}
                        <Row className="mb-2">
                          <Col xs={12}>
                            <strong>Alamat</strong>
                          </Col>
                          <Col xs={12} className="text-start">
                            {dataPendaftaran?.detail?.alamat ?? "-"}
                          </Col>
                        </Row>
                      </section>

                      {/* Foto Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Foto Info
                        </h5>
                        <Row>
                          <Col xs={6}>
                            <strong>KTP</strong>
                            {dataPendaftaran?.detail?.ktp_url ? (
                              <div
                                style={{ maxWidth: 200, marginLeft: "auto" }}
                              >
                                <Image
                                  src={`data:image/jpeg;base64,${dataPendaftaran.detail.ktp_url}`}
                                  alt="Foto KTP"
                                  rounded
                                  fluid
                                />
                              </div>
                            ) : (
                              <div>-</div>
                            )}
                          </Col>
                          <Col xs={6}>
                            <strong>Foto Anggota</strong>
                            {dataPendaftaran?.detail?.foto_url ? (
                              <div
                                style={{ maxWidth: 200, marginLeft: "auto" }}
                              >
                                <Image
                                  src={`data:image/jpeg;base64,${dataPendaftaran.detail.foto_url}`}
                                  alt="Foto Anggota"
                                  rounded
                                  fluid
                                />
                              </div>
                            ) : (
                              <div>-</div>
                            )}
                          </Col>
                        </Row>
                      </section>

                      {/* Account Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Account Info
                        </h5>

                        {renderField(
                          "Tipe Anggota",
                          dataPendaftaran?.anggota?.status_anggota
                        )}
                        {renderField("No HP", dataPendaftaran?.anggota?.no_tlp)}
                        {renderField("Email", dataPendaftaran?.anggota?.email)}
                      </section>

                      {/* Bank Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Bank Info
                        </h5>

                        {renderField("Bank", dataPendaftaran?.bank?.bank)}
                        {renderField(
                          "No Rekening",
                          dataPendaftaran?.bank?.no_rekening
                        )}
                        {renderField(
                          "Nama Nasabah",
                          dataPendaftaran?.bank?.nama_nasabah
                        )}
                      </section>

                      {/* Approval Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Approval Info
                        </h5>
                        <Container>
                          <Row className="text-center">
                            {dataPendaftaran?.approvalFlows?.map((apr, idx) =>
                              apr?.approvals?.map((aprs, ids) => {
                                const isApproved =
                                  apr.level === apr.approval_request_flow &&
                                  apr.status !== "pending";
                                return (
                                  <Col key={`${idx}-${ids}`}>
                                    <div
                                      className={
                                        isApproved
                                          ? "circle-icon_success"
                                          : "circle-icon"
                                      }
                                    >
                                      <i
                                        className={
                                          isApproved
                                            ? "fas fa-check"
                                            : "fas fa-hourglass-half"
                                        }
                                      ></i>
                                    </div>
                                    <p>{aprs?.nama || "-"}</p>
                                  </Col>
                                );
                              })
                            )}
                            <Col xs={12}>
                              <Button
                                className="bg-blue700 w-100 text-white"
                                onClick={handleClick}
                              >
                                Selanjutnya
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </section>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
