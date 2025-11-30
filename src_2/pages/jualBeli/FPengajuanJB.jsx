import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
  Table,
  Spinner,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { formatRupiah } from "../../utils/formatRupiah";
import URequest from "../../utils/URequest";
import ApprovalStepper from "../../comp/approval/ApprovalStepper";
import UJB from "../../utils/UJB";

export default function FPengajuanJB() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [approvalData, setApprovalData] = useState([]);
  const [pengajuanExists, setPengajuanExists] = useState(false);

  const [fields, setFields] = useState({
    tipe: "",
    nama_barang: "", // FIX
    harga: 0,
    dp: 0,
    jumlah_term: 3, // FIX
  });

  const updateFields = (key, value) => {
    if (!isLocked) setFields((prev) => ({ ...prev, [key]: value }));
  };

  const nominal = useMemo(
    () => Math.max((fields.harga || 0) - (fields.dp || 0), 0),
    [fields.harga, fields.dp]
  );

  const estimasiAngsuran = useMemo(
    () => (fields.jumlah_term > 0 ? nominal / fields.jumlah_term : 0),
    [fields.jumlah_term, nominal]
  );

  // ================================
  // LOAD JIKA SUDAH ADA PENGAJUAN
  // ================================
  const loadPengajuan = useCallback(async () => {
    try {
      const res = await URequest.getRequestByNik({ type: "JB" });
      const data = res?.data?.data;

      if (data) {
        setPengajuanExists(true);
        setIsLocked(true);
        setUser(data.anggota || null);
        setApprovalData(data.RequestApproval || []);

        const jb = data.jbDetail || {};

        setFields({
          tipe: jb.tipe || "",
          nama_barang: jb.nama_barang || "",
          harga: Number(jb.harga) || 0,
          dp: Number(jb.dp) || 0,
          jumlah_term: Number(jb.jumlah_term) || 3,
        });
      } else {
        setPengajuanExists(false);
        setIsLocked(false);
      }
    } catch (err) {
      console.error("ERR_LOAD:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPengajuan();
  }, [loadPengajuan]);

  // ================================
  // SUBMIT
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) return;

    if (fields.dp > fields.harga) {
      alert("DP tidak boleh lebih besar dari harga barang!");
      return;
    }

    const payload = {
      tipe: fields.tipe,
      nama_barang: fields.nama_barang,
      harga: Number(fields.harga),
      dp: Number(fields.dp),
      jumlah_term: Number(fields.jumlah_term),

      // WAJIB SESUAI BACKEND
      sisa_pembayaran: nominal, // FIX
      angsuran_per_term: estimasiAngsuran, // FIX
    };

    try {
      await UJB.reqJB(payload);
      alert("Pengajuan berhasil disimpan!");
      loadPengajuan();
    } catch (err) {
      console.error("Error submit:", err);
      alert("Terjadi kesalahan saat mengirim data.");
    }
  };

  const handleRupiahInput = (key, e) => {
    const value = e.target.value.replace(/\D/g, "");
    updateFields(key, Number(value));
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div id="main-wrapper">
      <Header onUserChange={setUser} />
      <Sidebar user={user} />

      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col className="d-flex align-items-center">
              <Button
                variant="link"
                className="p-0 me-2"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft size={16} color="black" />
              </Button>
              <h1 className="fw-bold mb-0">
                {pengajuanExists
                  ? "Pengajuan Jual Beli Tersedia"
                  : "Form Pengajuan Jual Beli"}
              </h1>
            </Col>
          </Row>

          <Row>
            <Card>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  {/* Tipe */}
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Tipe</Form.Label>
                    <Form.Select
                      value={fields.tipe}
                      disabled={isLocked}
                      onChange={(e) => updateFields("tipe", e.target.value)}
                    >
                      <option value="">-- Pilih Tipe --</option>
                      <option value="Elektronik">Elektronik</option>
                      <option value="Kendaraan">Kendaraan</option>
                      <option value="Properti">Properti</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Nama Barang */}
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Nama Barang</Form.Label>
                    <Form.Control
                      value={fields.nama_barang}
                      disabled={isLocked}
                      onChange={(e) =>
                        updateFields("nama_barang", e.target.value)
                      }
                      placeholder="Masukkan nama barang"
                    />
                  </Form.Group>

                  {/* Harga */}
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Harga</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatRupiah(fields.harga, false)}
                      disabled={isLocked}
                      onChange={(e) => handleRupiahInput("harga", e)}
                    />
                  </Form.Group>

                  {/* DP */}
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">DP</Form.Label>
                    <Form.Control
                      type="text"
                      value={formatRupiah(fields.dp, false)}
                      disabled={isLocked}
                      onChange={(e) => handleRupiahInput("dp", e)}
                    />
                  </Form.Group>

                  {/* Jumlah Term */}
                  <Form.Group className="mb-2">
                    <Form.Label className="fw-semibold">Jumlah Term</Form.Label>
                    <Form.Select
                      value={fields.jumlah_term}
                      disabled={isLocked}
                      onChange={(e) =>
                        updateFields("jumlah_term", Number(e.target.value))
                      }
                    >
                      <option value={3}>3x Pembayaran</option>
                      <option value={6}>6x Pembayaran</option>
                      <option value={12}>12x Pembayaran</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Summary */}
                  <div className="border rounded mb-3">
                    <div className="bg-light px-3 py-2 fw-bold">
                      Summary Detail Kredit
                    </div>
                    <Table responsive borderless className="mb-0">
                      <tbody>
                        <tr>
                          <td className="fw-semibold">Nominal (Harga - DP)</td>
                          <td className="text-end">{formatRupiah(nominal)}</td>
                        </tr>
                        <tr>
                          <td className="fw-semibold">
                            Estimasi Angsuran / Termin
                          </td>
                          <td className="text-end">
                            {formatRupiah(estimasiAngsuran)}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>

                  {/* Submit / Stepper */}
                  {!isLocked ? (
                    <Button type="submit" className="w-100" variant="info">
                      <strong>Proses</strong>
                    </Button>
                  ) : approvalData?.length > 0 ? (
                    <ApprovalStepper approvalData={approvalData} />
                  ) : null}
                </Form>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </div>
  );
}
