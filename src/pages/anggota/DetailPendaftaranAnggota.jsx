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
import {
  FaArrowLeft,
  FaCheck,
  FaCheckDouble,
  FaHourglassHalf,
  FaTimes,
} from "react-icons/fa";

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
    <Col xs={6} md={4} lg={3} className="text-center">
      <Card
        bg={bgColor}
        text="white"
        className="rounded-circle d-flex align-items-center justify-content-center mx-auto mt-2"
        style={{ width: "100px", height: "100px" }}
      >
        {icon}
      </Card>
      <div className="fw-semibold">{approval?.approval?.nama || "-"}</div>
      <div className="fw-semibold">
        {approval.approval.approver.nama || "-"}
      </div>
      <div className="small fst-italic text-muted">
        {approval?.status || "-"}
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
        // console.log(res.data);

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
      token: dataPendaftaran.request.token,
      nik: dataPendaftaran.request.nik,
      nama: dataPendaftaran.requester.nama,
      type: "pendaftaran_anggota",
      category: "anggota",
      tipe_anggota: dataPendaftaran.request.tipe_anggota,
      bank: dataPendaftaran.bank,
    };

    navigate(`/${token}`, {
      state: { title: "Invoice", payload },
    });
  };

  // Gunakan memo agar tidak re-render approval list setiap kali
  const approvalList = useMemo(
    () =>
      dataPendaftaran?.approval?.map((apr, idx) => (
        <ApprovalCard key={idx} approval={apr} />
      )),
    [dataPendaftaran?.approval]
  );

  // Cek semua approval sudah approved
  const allApproved =
    dataPendaftaran?.approval?.length > 0 &&
    dataPendaftaran.approval.every(
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
                          value={dataPendaftaran?.requester?.nama}
                        />
                        <FieldRow
                          label="NIK"
                          value={dataPendaftaran?.requester?.nikKtp}
                        />
                        <Row className="mb-2">
                          <Col xs={12}>
                            <strong>Alamat</strong>
                          </Col>
                          <Col xs={12} className="text-start">
                            {dataPendaftaran?.requester?.alamat ?? "-"}
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
                            {dataPendaftaran?.requester?.ktp ? (
                              <Image
                                src={dataPendaftaran?.requester?.ktp}
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
                            {dataPendaftaran?.requester?.foto ? (
                              <Image
                                src={dataPendaftaran?.requester?.foto}
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
                          value={dataPendaftaran?.akun?.tipe_anggota}
                        />
                        <FieldRow
                          label="No HP"
                          value={dataPendaftaran?.requester?.no_tlp}
                        />
                        <FieldRow
                          label="Email"
                          value={dataPendaftaran?.akun?.email}
                        />
                      </section>

                      {/* Job Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">Job Info</h5>
                        <FieldRow
                          label="Pekerjaan"
                          value={dataPendaftaran?.job?.pekerjaan}
                        />
                        <FieldRow
                          label="Tempat Kerja"
                          value={dataPendaftaran?.job?.tempat_kerja}
                        />
                        <FieldRow
                          label="Alamat"
                          value={dataPendaftaran?.job?.alamat_kerja}
                        />
                      </section>

                      {/* Bank Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Bank Info
                        </h5>
                        <FieldRow
                          label="Bank"
                          value={dataPendaftaran?.bank?.bank}
                        />
                        <FieldRow
                          label="No Rekening"
                          value={dataPendaftaran?.bank?.no_rekening}
                        />
                        <FieldRow
                          label="Nama Nasabah"
                          value={dataPendaftaran?.bank?.nama_nasabah}
                        />
                      </section>

                      {/* Approval Info */}
                      <section className="mb-4">
                        <h5 className="fw-bold border-bottom pb-2">
                          Approval Info
                        </h5>
                        <Container>
                          <Row className="text-center">
                            {approvalList}

                            {/* tombol hanya jika semua approved */}
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
