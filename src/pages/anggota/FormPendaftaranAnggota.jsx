import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
  ProgressBar,
  Image,
} from "react-bootstrap";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { useCallback, useState, useEffect } from "react";
import StepCamera from "../../comp/anggota/formPendaftaran/stepCamera";
import UAnggota from "../../utils/UAnggota";
import notification from "../../comp/global/Notification";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import SelAnggota from "../../comp/anggota/SelAnggota";

export default function FormPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({});
  const [previews, setPreviews] = useState({});

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const navigate = useNavigate();

  // Sinkronisasi fields dengan user jika user berubah
  useEffect(() => {
    if (user?.nama) {
      setFields((prev) => ({
        ...prev,
        nama: user.nama || "",
        no_tlp: user.no_tlp || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // handleChange disesuaikan dengan StepCamera dan upload file
  const handleChange = useCallback((name, value, isPreviewOnly = false) => {
    if (name === "ktp" && value instanceof File) {
      if (!["image/jpeg", "image/png"].includes(value.type)) {
        alert("Hanya boleh upload file JPG atau PNG.");
        return;
      }
      if (value.size > 2 * 1024 * 1024) {
        alert("Ukuran file maksimal 2MB.");
        return;
      }
      const blobUrl = URL.createObjectURL(value);
      setPreviews((prev) => ({ ...prev, ktp: blobUrl }));
      setFields((prev) => ({ ...prev, ktp: value }));
    } else if (isPreviewOnly) {
      setPreviews((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setFields((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Preview untuk StepCamera dihandle oleh StepCamera
  }, []);

  const nextStep = () => setStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Pastikan data utama dari user di-sync ke fields sebelum submit
      const submitData = {
        ...fields,
        nia: user?.nik || "",
        nama: user?.nama || fields.nama || "",
      };

      const res = await UAnggota.daftarAnggota(submitData);
      notification(res, "Pendaftaran anggota berhasil!");

      setTimeout(() => {
        // Kirimkan fields ke detail pendaftaran anggota sebagai data
        const token = jwtEncode({
          page: "detailPendaftaranAnggota",
          data: submitData,
        });
        navigate(`/page/${token}`);
      }, 3000);
    } catch (error) {
      notification(
        error?.response,
        `Terjadi kesalahan saat mendaftar anggota. ${JSON.stringify(error)}`
      );
      // console.error(error);
    }
  };

  // console.log(fields);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h4 className="mb-3">Personal Info</h4>
            <SelAnggota
              value={fields.jenis_anggota || ""}
              onChange={(val) => handleChange("jenis_anggota", val)}
            />
            <Form.Group>
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="text"
                value={fields.nik || ""}
                onChange={(e) => handleChange("nik", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>No HP</Form.Label>
              <Form.Control type="text" value={user?.no_tlp} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user?.email || ""} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                value={fields.alamat || ""}
                onChange={(e) => handleChange("alamat", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload KTP</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => handleChange("ktp", e.target.files[0])}
              />
              {previews.ktp && (
                <div className="mt-2">
                  <Image
                    src={previews.ktp}
                    alt="Preview KTP"
                    thumbnail
                    style={{ maxWidth: "250px" }}
                  />
                </div>
              )}
            </Form.Group>
          </>
        );
      case 2:
        return (
          <>
            <h4 className="mb-3">Job Info</h4>
            <Form.Group>
              <Form.Label>Pekerjaan</Form.Label>
              <Form.Control
                type="text"
                value={fields.pekerjaan || ""}
                onChange={(e) => handleChange("pekerjaan", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tempat Kerja</Form.Label>
              <Form.Control
                type="text"
                value={fields.tempat_kerja || ""}
                onChange={(e) => handleChange("tempat_kerja", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alamat Kerja</Form.Label>
              <Form.Control
                type="text"
                value={fields.alamat_kerja || ""}
                onChange={(e) => handleChange("alamat_kerja", e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 3:
        return (
          <>
            <h4 className="mb-3">Bank Info</h4>
            <Form.Group>
              <Form.Label>Bank</Form.Label>
              <Form.Control
                type="text"
                value={fields.bank || ""}
                onChange={(e) => handleChange("bank", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>No Rekening</Form.Label>
              <Form.Control
                type="text"
                value={fields.no_rekening || ""}
                onChange={(e) => handleChange("no_rekening", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama Nasabah</Form.Label>
              <Form.Control
                type="text"
                value={fields.nama_nasabah || ""}
                onChange={(e) => handleChange("nama_nasabah", e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 4:
        // StepCamera sudah mengatur preview dan handleChange sesuai kebutuhan
        return <StepCamera onChange={handleChange} previews={previews} />;
      case 5:
        return (
          <>
            <h4 className="mb-3">Komitmen</h4>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Siap berkomitmen belajar muamalah syariah dan meninggalkan transaksi riba"
                checked={fields.komitmen || false}
                onChange={(e) => handleChange("komitmen", e.target.checked)}
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Card className="border shadow">
                <CardHeader className="bg-blue700 text-white">
                  <CardTitle>Form Pendaftaran Anggota</CardTitle>
                </CardHeader>
                <CardBody>
                  <ProgressBar
                    now={(step / 5) * 100}
                    label={`Langkah ${step} dari 5`}
                    className="mb-4"
                  />
                  <Form onSubmit={handleSubmit}>
                    {renderStep()}
                    <div className="d-flex justify-content-between mt-4">
                      <Button
                        variant="secondary"
                        onClick={prevStep}
                        disabled={step === 1}
                      >
                        Sebelumnya
                      </Button>
                      {step < 5 ? (
                        <Button variant="primary" onClick={nextStep}>
                          Selanjutnya
                        </Button>
                      ) : (
                        <Button variant="success" type="submit">
                          Submit
                        </Button>
                      )}
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
