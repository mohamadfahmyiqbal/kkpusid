import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UApproval from "../../utils/UApproval";
import { jwtEncode } from "../../routes/helpers";
import notification from "../../comp/global/Notification";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
  Form,
  Image,
} from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaHourglassHalf, FaTimes } from "react-icons/fa";

export default function DetailPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [dataPendaftaran, setDataPendaftaran] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const getPendaftaran = useCallback(async () => {
    // Wait until user is fully set
    if (!user) return;

    setLoading(true);
    try {
      const res = await UApproval.getApprovalDetail({
        nik: user.nik,
        type: "pendaftaran_anggota",
      });

      setDataPendaftaran(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);

      // Fallback langsung ke form pendaftaran jika request gagal
      navigate(`/${jwtEncode({ page: "formPendaftaranAnggota" })}`, {
        state: {
          back: "pendaftaranAnggota",
          jenis: "pendaftaranAnggota",
        },
      });
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    getPendaftaran();
  }, [getPendaftaran]);

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
        back: "detailPendaftaranAnggota",
        data: dataPendaftaran?.token,
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

          <Row>
            <Col md={12}>
              <Card className="border shadow">
                <CardHeader className="bg-topbar text-white">
                  <CardTitle>Detail Pendaftaran</CardTitle>
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
                        <Form.Group as={Row} controlId="formPlaintextNIK">
                          <Form.Label column xs="2">
                            NIK
                          </Form.Label>
                          <Col xs="10" className="d-flex justify-content-end">
                            <Form.Control
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.detail?.nik || "-"
                              }
                              className="text-end"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextNama">
                          <Form.Label column xs="2">
                            Nama
                          </Form.Label>
                          <Col xs="10" className="d-flex justify-content-end">
                            <Form.Control
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.nama || "-"
                              }
                              className="text-end"
                            />
                          </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextAlamat">
                          <Form.Label column xs="2">
                            Alamat
                          </Form.Label>
                          <Col xs="10" className="d-flex justify-content-end">
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.detail?.alamat || "-"
                              }
                              className="text-end"
                            />
                          </Col>
                        </Form.Group>
                      </section>

                      {/* Foto Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold pb-2">Foto Info</h5>
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
                        <Form.Group as={Row} controlId="formPlaintextAlamat">
                          <Form.Label column xs="4" className="py-0">
                            Tipe Anggota
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.categoryAnggota?.nama || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextNoHP">
                          <Form.Label column xs="4" className="py-0">
                            No HP
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.no_tlp || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                          <Form.Label column xs="4" className="py-0">
                            Email
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.email || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                      </section>

                      {/* Job Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">Job Info</h5>
                        <Form.Group as={Row} controlId="formPlaintextPekerjaan">
                          <Form.Label column xs="4" className="py-0">
                            Pekerjaan
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.job?.[0]?.pekerjaan ||
                                "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          controlId="formPlaintextTempatKerja"
                        >
                          <Form.Label column xs="4" className="py-0">
                            Tempat Kerja
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.job?.[0]
                                  ?.tempat_kerja || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          controlId="formPlaintextAlamatKerja"
                        >
                          <Form.Label column xs="4" className="py-0">
                            Alamat
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.job?.[0]
                                  ?.alamat_kerja || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                      </section>

                      {/* Bank Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">
                          Bank Info
                        </h5>
                        <Form.Group as={Row} controlId="formPlaintextBank">
                          <Form.Label column xs="4" className="py-0">
                            Bank
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.bank?.[0]?.bank || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          controlId="formPlaintextNoRekening"
                        >
                          <Form.Label column xs="4" className="py-0">
                            No Rekening
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.bank?.[0]
                                  ?.no_rekening || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group
                          as={Row}
                          controlId="formPlaintextNamaNasabah"
                        >
                          <Form.Label column xs="4" className="py-0">
                            Nama Nasabah
                          </Form.Label>
                          <Col
                            xs="8"
                            className="d-flex justify-content-end py-0"
                          >
                            <Form.Control
                              as="textarea"
                              plaintext
                              readOnly
                              defaultValue={
                                dataPendaftaran?.anggota?.bank?.[0]
                                  ?.nama_nasabah || "-"
                              }
                              className="text-end py-0"
                            />
                          </Col>
                        </Form.Group>
                      </section>

                      {/* Approval Info */}
                      <section className="border-bottom mb-2">
                        <h5 className="fw-bold border-bottom pb-2">
                          Approval Info
                        </h5>
                        <Container>
                          <Row className="text-center justify-content-center">
                            {dataPendaftaran?.RequestApproval?.map((app) => {
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
