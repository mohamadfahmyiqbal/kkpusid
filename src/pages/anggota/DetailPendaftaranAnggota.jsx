import React, { useCallback, useEffect, useState, useMemo } from "react";
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
import UApproval from "../../utils/UApproval";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft, FaCheck, FaHourglassHalf, FaTimes } from "react-icons/fa";

// ================== Helper Components ==================
const FieldRow = ({ label, value }) => (
  <Row className="mb-2">
    <Col xs={4}>
      <strong>{label}</strong>
    </Col>
    <Col xs={8} className="text-end">
      {value ?? "-"}
    </Col>
  </Row>
);

const ApprovalCard = ({ approval }) => {
  const status = approval?.status?.toLowerCase();
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
    <Col xs={6} md={6} lg={3}>
      <div className="d-flex flex-column align-items-center justify-content-center h-100">
        <Card
          bg={bgColor}
          text="white"
          className="rounded-circle d-flex align-items-center justify-content-center mt-2"
          style={{ width: "100px", height: "100px" }}
        >
          {icon}
        </Card>
        <div className="fw-semibold text-center">Flow {approval?.flow}</div>
        <div className="fw-semibold text-center">
          {approval?.approverAnggota?.nama || "-"}
        </div>
        <div className="small fst-italic text-muted text-center">
          {approval?.status || "-"}
        </div>
      </div>
    </Col>
  );
};

// ================== Main Component ==================
export default function DetailPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [dataPendaftaran, setDataPendaftaran] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserChange = useCallback((newUser) => setUser(newUser), []);
  const location = useLocation();
  const navigate = useNavigate();

  // Prefill data jika dikirim via navigation
  useEffect(() => {
    if (location?.state?.dataPendaftaran) {
      setDataPendaftaran(location.state.dataPendaftaran);
    }
  }, [location?.state]);

  // Ambil data dari API
  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      if (!user?.nik) return;
      setLoading(true);
      setError(null);

      try {
        const res = await UApproval.getApprovalDetail({
          type: "pendaftaran_anggota",
          nik: user.nik,
        });

        if (mounted) setDataPendaftaran(res?.data ?? null);
      } catch (err) {
        if (mounted)
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

  const handleInvoiceClick = () => {
    const token = jwtEncode({ page: "invoice" });
    const payload = {
      token: dataPendaftaran.token,
      nik: dataPendaftaran.nik,
      nama: dataPendaftaran.anggota.nama,
      type: "pendaftaran_anggota",
      category: "anggota",
      tipe_anggota: dataPendaftaran.tipe_anggota,
      bank: dataPendaftaran.anggota.bank?.[0] ?? null,
    };

    navigate(`/${token}`, {
      state: { title: "Invoice", payload },
    });
  };

  // Gunakan memo agar tidak re-render approval list setiap kali
  const approvalList = useMemo(
    () =>
      dataPendaftaran?.RequestApproval?.map((apr, idx) => (
        <ApprovalCard key={idx} approval={apr} />
      )),
    [dataPendaftaran?.RequestApproval]
  );

  // Cek semua approval sudah approved
  const allApproved =
    dataPendaftaran?.RequestApproval?.length > 0 &&
    dataPendaftaran.RequestApproval.every(
      (apr) => apr?.status?.toLowerCase() === "approved"
    );

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          {/* Header Page */}
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="link"
                className="p-0 me-2 text-decoration-none"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft size={15} color="black" />
              </Button>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>

          {/* Content */}
          <Row className="mt-4">
            <Col md={12} className="mb-3">
              <Card className="border shadow">
                <CardHeader className="bg-topbar text-white">
                  <CardTitle>Detail Pendaftaran Anggota</CardTitle>
                </CardHeader>
                <CardBody>
                  {/* Loading */}
                  {loading && (
                    <div className="text-center my-3">
                      <Spinner animation="border" role="status" />
                    </div>
                  )}

                  {/* Error */}
                  {error && <Alert variant="danger">{error}</Alert>}

                  {/* No Data */}
                  {!loading && !dataPendaftaran && !error && (
                    <div className="text-muted">
                      Tidak ada data pendaftaran untuk ditampilkan.
                    </div>
                  )}

                  {/* Data Available */}
                  {dataPendaftaran && (
                    <>
                      {/* Personal Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Personal Info
                        </h5>
                        <FieldRow
                          label="Nama"
                          value={dataPendaftaran?.anggota?.nama}
                        />
                        <FieldRow
                          label="NIK"
                          value={dataPendaftaran?.anggota?.nik}
                        />
                        <Row className="mb-2">
                          <Col xs={12}>
                            <strong>Alamat</strong>
                          </Col>
                          <Col xs={12} className="text-start">
                            {dataPendaftaran?.anggota?.detail?.alamat ?? "-"}
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
                            {console.log(dataPendaftaran.anggota)}
                            {dataPendaftaran?.anggota?.ktpImg ? (
                              <Image
                                src={dataPendaftaran.anggota.ktpImg}
                                alt="Foto KTP"
                                rounded
                                fluid
                                className="d-block mx-auto mt-2"
                                style={{ maxWidth: 200 }}
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
                                className="d-block mx-auto mt-2"
                                style={{ maxWidth: 200 }}
                              />
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
                      <section className="mb-4">
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
                      <section className="mb-4">
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
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Approval Info
                        </h5>
                        <Container>
                          <Row className="text-center justify-content-center">
                            {approvalList}

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
