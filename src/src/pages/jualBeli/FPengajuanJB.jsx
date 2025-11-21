import { useNavigate } from "react-router-dom";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  CardText,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { formatRupiah } from "../../utils/formatRupiah";
import URequest from "../../utils/URequest";
import ApprovalStepper from "../../comp/approval/ApprovalStepper";

export default function FPengajuanJB() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [fields, setFields] = useState({
    tipe: "",
    nama_barang: "",
    harga: "",
    dp: "",
    jumlah_term: "",
  });

  const [loading, setLoading] = useState(false);
  const [tipeList, setTipeList] = useState([]);
  const [requestData, setRequestData] = useState(null);

  const handleUserChange = useCallback((u) => {
    setUser(u);
  }, []);

  /** GET REQUEST */
  const getRequest = useCallback(async () => {
    setLoading(true);
    try {
      const res = await URequest.getRequestByNik({ type: "JB" });
      const jb = res?.data?.data?.jbDetail;
      const request = res?.data?.data;

      setRequestData(request || null);

      if (jb) {
        setFields({
          tipe: jb.tipe || "",
          nama_barang: jb.nama_barang || "",
          harga: jb.harga || "",
          dp: jb.dp || "",
          jumlah_term: jb.jumlah_term || "",
        });
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

  /** INIT */
  useEffect(() => {
    getRequest();

    setTipeList([
      { id: 1, name: "Elektronik" },
      { id: 2, name: "Kendaraan" },
      { id: 3, name: "Perabot" },
    ]);
  }, [getRequest]);

  /** === CALC === */
  const nominal = Number(fields.harga) || 0;
  const dpNominal = Number(fields.dp) || 0;
  const sisaPembayaran = Math.max(nominal - dpNominal, 0);
  const termValue = Number(fields.jumlah_term) || 0;
  const estimasi = termValue > 0 ? Math.floor(sisaPembayaran / termValue) : 0;

  const akadText = "Some akad text here";

  const isFormValid =
    fields.tipe &&
    fields.nama_barang &&
    nominal > 0 &&
    dpNominal >= 0 &&
    termValue > 0;

  /** HANDLE SUBMIT */
  const handleSubmit = async (e) => {
      alert("rews")
    e.preventDefault();
    setLoading(true);

    try {
      const res = await URequest.reqJB(fields);
      alert("Pengajuan berhasil dikirim!");
      getRequest();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  /** APPROVAL HANDLERS */
  const handleApprove = async () => {
    try {
      await URequest.approvalAction({
        token: requestData.token,
        type: "JB",
        action: "approve",
      });

      alert("Berhasil Approve!");
      getRequest();
    } catch (e) {
      console.log(e);
      alert("Gagal Approve");
    }
  };

  const handleReject = async () => {
    try {
      await URequest.approvalAction({
        token: requestData.token,
        type: "JB",
        action: "reject",
      });

      alert("Request ditolak.");
      getRequest();
    } catch (e) {
      console.log(e);
      alert("Gagal Reject");
    }
  };

  /** HITUNG STEP UNTUK STEPPER */
  const stepLabels = ["Pengawas", "Ketua"];
  let currentStep = 0;

  if (requestData?.RequestApproval?.status === "rejected") {
    currentStep = "rejected";
  } else if (requestData?.RequestApproval?.flow) {
    currentStep = requestData.RequestApproval.flow - 1;
  }

  const approverId = requestData?.RequestApproval?.approver ?? 0;
  const isUserApprover = user?.nik === approverId;

  const isReadonly = requestData !== null; // FORM TETAP TAMPIL, TAPI READONLY

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col className="d-flex align-items-center">
              <Button
                variant="link"
                className="p-0 me-2"
                onClick={() => navigate(-1)}
                style={{ textDecoration: "none" }}
              >
                <FaArrowLeft size={16} color="black" />
              </Button>
              <h1 className="fw-bold mb-0">Form Pengajuan Jual Beli</h1>
            </Col>
          </Row>

          {/* === Jika ADA REQUEST → tampilkan STEPPER === */}
          {requestData && (
            <>
              <ApprovalStepper
                currentStep={currentStep}
                steps={stepLabels}
                user={user}
              />

              {isUserApprover && currentStep !== "rejected" && (
                <Row className="my-3">
                  <Col>
                    <Button
                      variant="success"
                      className="w-100 mb-2"
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="danger"
                      className="w-100"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                  </Col>
                </Row>
              )}
            </>
          )}

          {/* === FORM TETAP TAMPIL === */}
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit}>
                {/* TIPE */}
                <Form.Group className="mb-2">
                  <Form.Label>Tipe</Form.Label>
                  <Form.Control
                    as="select"
                    value={fields.tipe}
                    disabled={isReadonly}
                    onChange={(e) =>
                      setFields((prev) => ({ ...prev, tipe: e.target.value }))
                    }
                  >
                    <option value="">-- Pilih Tipe --</option>
                    {tipeList.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {/* Nama Barang */}
                <Form.Group className="mb-2">
                  <Form.Label>Nama Barang</Form.Label>
                  <Form.Control
                    type="text"
                    value={fields.nama_barang}
                    disabled={isReadonly}
                    placeholder="Misal: Laptop Lenovo XYZ"
                    onChange={(e) =>
                      setFields((prev) => ({
                        ...prev,
                        nama_barang: e.target.value,
                      }))
                    }
                  />
                </Form.Group>

                {/* Harga */}
                <Form.Group className="mb-2">
                  <Form.Label>Harga</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={isReadonly}
                    placeholder="5.000.000"
                    value={
                      fields.harga
                        ? formatRupiah(fields.harga).replace("Rp", "")
                        : ""
                    }
                    onChange={(e) =>
                      setFields((prev) => ({
                        ...prev,
                        harga: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                </Form.Group>

                {/* DP */}
                <Form.Group className="mb-2">
                  <Form.Label>DP</Form.Label>
                  <Form.Control
                    type="text"
                    disabled={isReadonly}
                    placeholder="1.000.000"
                    value={
                      fields.dp
                        ? formatRupiah(fields.dp).replace("Rp", "")
                        : ""
                    }
                    onChange={(e) =>
                      setFields((prev) => ({
                        ...prev,
                        dp: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                </Form.Group>

                {/* Term */}
                <Form.Group className="mb-3">
                  <Form.Label>Jumlah Term</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="3"
                    value={fields.jumlah_term}
                    disabled={isReadonly}
                    onChange={(e) =>
                      setFields((prev) => ({
                        ...prev,
                        jumlah_term: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                  />
                </Form.Group>

                {/* SUMMARY */}
                <Row className="mt-4">
                  <Col xs={12}>
                    <CardText className="fw-bold border-top border-bottom py-1">
                      Summary Detail
                    </CardText>
                  </Col>

                  <Col xs={6}>
                    <CardText>Harga Barang: {formatRupiah(nominal)}</CardText>
                    <CardText>DP: {formatRupiah(dpNominal)}</CardText>
                    <CardText>
                      Sisa Pembayaran: {formatRupiah(sisaPembayaran)}
                    </CardText>
                  </Col>

                  <Col xs={6} className="text-end">
                    <CardText>Estimasi Angsuran / Term</CardText>
                    <CardText>
                      {estimasi > 0 ? formatRupiah(estimasi) : "-"}
                    </CardText>
                  </Col>
                </Row>

                {/* AKAD */}
                <Row className="mt-4">
                  <Col>
                    <CardText className="fw-bold border-top border-bottom py-1">
                      Akad
                    </CardText>
                    <CardText
                      style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
                    >
                      {akadText}
                    </CardText>
                  </Col>
                </Row>

                {/* BUTTON KIRIM (disembunyikan jika sudah ada request) */}
                {!isReadonly && (
                  <Row className="mt-3">
                    <Button
                      type="submit"
                      className="w-100"
                      variant="primary"
                      disabled={!isFormValid || loading}
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" /> Mengirim...
                        </>
                      ) : (
                        "Kirim Pengajuan"
                      )}
                    </Button>
                  </Row>
                )}
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}
