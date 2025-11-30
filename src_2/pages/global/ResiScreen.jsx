import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaHourglassHalf, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { jwtEncode } from "../../routes/helpers";
import { formatRupiah } from "../../utils/formatRupiah";
import USimpanan from "../../utils/USimpanan";

export default function ResiScreen() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { title, data: token, selected = [], back } = location.state || {};

  /** Handle User Update */
  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  /** Navigasi kembali */
  const handleBack = useCallback(() => {
    const dest = back || "detailPendaftaranAnggota";
    navigate(`/${jwtEncode({ page: dest })}`, { state: { token } });
  }, [navigate, back, token]);

  /** Hitung total pembayaran */
  const totalPembayaran = useMemo(
    () => selected.reduce((total, sel) => total + (sel?.jumlah || 0), 0),
    [selected]
  );

  /** Dummy data Approval (sementara, nanti bisa diganti dari backend) */
  const approvalList = [
    {
      role: "Bendahara",
      status: "pending",
      nama: "Bendahara",
    },
  ];

  const handleClick = async () => {
    try {
      const payload = {
        selected,
        token,
      };
      const res = await USimpanan.reqPencairanSimpanan(selected);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper">
        <Container fluid>
          {/* Header Title */}
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="none"
                className="p-0 me-2 d-flex align-items-center"
                onClick={handleBack}
              >
                <FaArrowLeft size={15} className="me-1" />
              </Button>
              <h1 className="fw-bold mb-0">{title || "Invoice"}</h1>
            </Col>
          </Row>

          <Row>
            <Card>
              <CardBody>
                {/* === Data Anggota === */}
                <Section title="Data Anggota">
                  <DataRow label="Nama" value={user?.nama} />
                  <DataRow label="Nomor Anggota" value={user?.nik} />
                  <DataRow
                    label="Status Anggota"
                    value={user?.status_anggota}
                  />
                </Section>

                {/* === Pembayaran === */}
                <Section title="Pembayaran">
                  {selected.map((sel, idx) => (
                    <DataRow
                      key={idx}
                      label={sel?.name}
                      value={formatRupiah(sel?.jumlah)}
                    />
                  ))}
                  <DataRow
                    label="Total"
                    value={formatRupiah(totalPembayaran)}
                    bold
                    borderTop
                  />
                </Section>

                {/* === Informasi Pembayaran === */}
                <Section title="Informasi Pembayaran">
                  <DataRow label="Metode Pembayaran" value="Bank Transfer" />
                  <DataRow
                    label="Bank"
                    value={user?.bankAnggota?.bank || "-"}
                  />
                  <DataRow
                    label="Nama Nasabah"
                    value={user?.bankAnggota?.nama_nasabah || "-"}
                  />
                  <DataRow
                    label="No Rekening"
                    value={user?.bankAnggota?.no_rekening || "-"}
                  />
                </Section>

                {/* === Approval === */}
                <Section title="Approval">
                  <Row className="text-center justify-content-center">
                    {approvalList.map((app, idx) => {
                      const status = app.status?.toLowerCase();
                      let bgColor = "secondary";
                      let icon = <FaHourglassHalf size={30} />;

                      if (status === "approved") {
                        bgColor = "success";
                        icon = <FaCheck size={30} />;
                      } else if (status === "rejected") {
                        bgColor = "danger";
                        icon = <FaTimes size={30} />;
                      }

                      return (
                        <Col key={idx} xs={6} md={6} lg={3} className="mb-4">
                          <div className="d-flex flex-column align-items-center justify-content-center h-100 gap-1">
                            <Card
                              bg={bgColor}
                              text="white"
                              className="rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-0"
                              style={{ width: "90px", height: "90px" }}
                            >
                              <div className="fs-3">{icon}</div>
                            </Card>

                            <div
                              className="fw-semibold text-center text-truncate"
                              style={{ maxWidth: "100px", lineHeight: "1.2" }}
                            >
                              {app.nama || "-"}
                            </div>

                            <div
                              className="small fst-italic text-muted text-center"
                              style={{ lineHeight: "1.2" }}
                            >
                              {status === "pending"
                                ? "Menunggu Approval"
                                : app.status}
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                    <Col xs={12} className="mt-3">
                      <Button
                        variant="primary"
                        className="w-100"
                        onClick={() => handleClick("Submit")}
                      >
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Section>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </div>
  );
}

/** ===== Komponen Reusable ===== */
function Section({ title, children }) {
  return (
    <>
      <Row className="border-top border-bottom mt-3 mb-2">
        <CardTitle className="fw-bold">{title}</CardTitle>
      </Row>
      {children}
    </>
  );
}

function DataRow({ label, value, bold = false, borderTop = false }) {
  return (
    <Form.Group
      as={Row}
      className={`mb-2 ${borderTop ? "border-top pt-2" : ""}`}
    >
      <Form.Label column sm="6" className={bold ? "fw-bold" : ""}>
        {label}
      </Form.Label>
      <Col sm="6">
        <Form.Control
          className={`text-end ${bold ? "fw-bold" : ""}`}
          plaintext
          readOnly
          value={value ?? "-"}
        />
      </Col>
    </Form.Group>
  );
}
