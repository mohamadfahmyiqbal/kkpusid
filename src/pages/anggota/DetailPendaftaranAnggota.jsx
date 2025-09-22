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
  Button,
  Alert,
  Image,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaHourglassHalf, FaTimes } from "react-icons/fa";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import notification from "../../comp/global/Notification";
import { jwtEncode } from "../../routes/helpers";

const FieldRow = ({ label, value, multiline = false }) => (
  <Row className="mb-2">
    <Col xs={multiline ? 12 : 4}>
      <strong>{label}</strong>
    </Col>
    <Col
      xs={multiline ? 12 : 8}
      className={`${multiline ? "text-start" : "text-end"} text-break`}
    >
      {value ?? "-"}
    </Col>
  </Row>
);

export default function DetailPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  const location = useLocation();
  const navigate = useNavigate();

  const [dataPendaftaran, setDataPendaftaran] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      if (location?.state?.dataPendaftaran) {
        setDataPendaftaran(location.state.dataPendaftaran);
      } else {
        notification({ status: 404, msg: "Data pendaftaran tidak ditemukan." });
      }
    } catch (error) {
      notification({ status: 400, msg: error.message });
    } finally {
      setTimeout(() => setLoading(false), 600); // kasih efek delay loading biar smooth
    }
  }, [location?.state]);

  // Cek semua approval sudah approved
  const allApproved =
    dataPendaftaran?.RequestApproval?.length > 0 &&
    dataPendaftaran.RequestApproval.every(
      (apr) => apr?.status?.toLowerCase() === "approved"
    );

  const handleInvoiceClick = () => {
    const token = jwtEncode({ page: "invoice" });
    // const payload =
    navigate(`/${token}`, {
      state: {
        title: "Invoice Pendaftaran Anggota",
        link: "detailPendaftaranAnggota",
        dataPendaftaran,
      },
    });
  };

  return (
    <div id="main-wrapper">
      {/* Header & Sidebar */}
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      {/* Page Content */}
      <div className="page-wrapper">
        <Container fluid>
          {/* Page Header */}
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="none"
                className="p-0 me-2 text-decoration-none d-flex align-items-center"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft size={15} className="me-1" />
              </Button>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>

          {/* Detail Card */}
          <Row className="mt-4">
            <Col md={12}>
              <Card className="border shadow-sm">
                <CardHeader className="bg-topbar text-white">
                  <CardTitle className="mb-0">
                    Detail Pendaftaran Anggota
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner animation="border" role="status" />
                      <div className="mt-2 text-muted">Memuat data...</div>
                    </div>
                  ) : dataPendaftaran ? (
                    <Container fluid>
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">
                          Personal Info
                        </h5>
                        <FieldRow
                          label="NIK"
                          value={dataPendaftaran?.anggota?.nik}
                        />
                        <FieldRow
                          label="Nama"
                          value={dataPendaftaran?.anggota?.nama}
                        />
                        <FieldRow
                          label="Alamat"
                          value={dataPendaftaran?.anggota?.detail?.alamat}
                          multiline
                        />
                      </section>

                      {/* Foto Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">
                          Foto Info
                        </h5>
                        <Row>
                          <Col xs={6}>
                            <strong>KTP</strong>
                            {dataPendaftaran?.anggota?.ktpImg ? (
                              <Image
                                src={dataPendaftaran.anggota.ktpImg}
                                alt="Foto KTP"
                                rounded
                                fluid
                                className="d-block mx-auto mt-2 w-100"
                              />
                            ) : (
                              <div>-</div>
                            )}
                          </Col>
                          <Col xs={6}>
                            <strong>Foto Anggota</strong>
                            {dataPendaftaran?.anggota?.fotoImg ? (
                              <Image
                                src={dataPendaftaran.anggota.fotoImg}
                                alt="Foto Anggota"
                                rounded
                                fluid
                                className="d-block mx-auto mt-2 w-100"
                              />
                            ) : (
                              <div>-</div>
                            )}
                          </Col>
                        </Row>
                      </section>

                      {/* Account Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">
                          Account Info
                        </h5>
                        <FieldRow
                          label="Tipe Anggota"
                          value={dataPendaftaran?.tipe_anggota}
                        />
                        <FieldRow
                          label="No HP"
                          value={dataPendaftaran?.anggota?.no_tlp}
                        />
                        <FieldRow
                          label="Email"
                          value={dataPendaftaran?.anggota?.email}
                        />
                      </section>

                      {/* Job Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">Job Info</h5>
                        <FieldRow
                          label="Pekerjaan"
                          value={dataPendaftaran?.anggota?.job?.[0]?.pekerjaan}
                        />
                        <FieldRow
                          label="Tempat Kerja"
                          value={
                            dataPendaftaran?.anggota?.job?.[0]?.tempat_kerja
                          }
                        />
                        <FieldRow
                          label="Alamat"
                          value={
                            dataPendaftaran?.anggota?.job?.[0]?.alamat_kerja
                          }
                        />
                      </section>

                      {/* Bank Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">
                          Bank Info
                        </h5>
                        <FieldRow
                          label="Bank"
                          value={dataPendaftaran?.anggota?.bank?.[0]?.bank}
                        />
                        <FieldRow
                          label="No Rekening"
                          value={
                            dataPendaftaran?.anggota?.bank?.[0]?.no_rekening
                          }
                        />
                        <FieldRow
                          label="Nama Nasabah"
                          value={
                            dataPendaftaran?.anggota?.bank?.[0]?.nama_nasabah
                          }
                        />
                      </section>

                      {/* Approval Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">
                          Approval Info
                        </h5>
                        <Container>
                          <Row className="text-center justify-content-center">
                            {dataPendaftaran?.RequestApproval.map((app) => {
                              const status = app?.status?.toLowerCase();
                              let bgColor = "secondary";
                              let icon;
                              if (status === "approved") {
                                icon = <FaCheck size={30} />;
                              } else if (status === "rejected") {
                                icon = <FaTimes size={30} />;
                              } else {
                                icon = <FaHourglassHalf size={40} />;
                              }

                              if (status === "approved") bgColor = "success";
                              if (status === "rejected") bgColor = "danger";
                              return (
                                <Col xs={6} md={6} lg={3} className="mb-4">
                                  <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-1">
                                    {/* Lingkaran Icon */}
                                    <Card
                                      bg={bgColor}
                                      text="white"
                                      className="rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-0"
                                      style={{
                                        width: "90px",
                                        height: "90px",
                                      }}
                                    >
                                      <div className="fs-3">{icon}</div>
                                    </Card>

                                    {/* Nama Approver */}
                                    <div
                                      className="fw-semibold text-center text-truncate"
                                      style={{
                                        maxWidth: "100px",
                                        lineHeight: "1.2",
                                      }}
                                    >
                                      {app?.approverAnggota?.nama || "-"}
                                    </div>

                                    {/* Status */}
                                    <div
                                      className="small fst-italic text-muted text-center"
                                      style={{ lineHeight: "1.2" }}
                                    >
                                      {app?.status || "-"}
                                    </div>
                                  </div>
                                </Col>
                              );
                            })}
                          </Row>
                          <Row className="border-top">
                            {allApproved && (
                              <Col xs={12} className="mt-3">
                                <Button
                                  className="bg-blue700 w-100 text-white"
                                  onClick={handleInvoiceClick}
                                >
                                  Selanjutnya
                                </Button>
                              </Col>
                            )}
                          </Row>
                        </Container>
                      </section>
                    </Container>
                  ) : (
                    <Alert variant="warning" className="text-center my-3">
                      Data pendaftaran tidak tersedia.
                    </Alert>
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
