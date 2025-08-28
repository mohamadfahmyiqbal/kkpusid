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
import UAnggota from "../../utils/UAnggota";
import notification from "../../comp/global/Notification";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import SelAnggota from "../../comp/anggota/SelAnggota";
import { FaArrowLeft } from "react-icons/fa";
import StepKTP from "../../comp/anggota/formPendaftaran/stepKTP";
import StepCamera from "../../comp/anggota/formPendaftaran/stepCamera";

export default function FormPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({});
  const [previews, setPreviews] = useState({});

  // total langkah yang sesungguhnya
  const totalSteps = 6;

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

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // handleSubmit sekarang dipanggil MANUAL lewat tombol Submit
  const handleSubmit = async () => {
    // safety: jangan submit kalau belum di langkah terakhir
    if (step !== totalSteps) {
      // Jika tidak di langkah terakhir, jangan submit — bisa langsung pindah ke langkah terakhir
      setStep(totalSteps);
      return;
    }

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
        navigate(`/${token}`);
      }, 3000);
    } catch (error) {
      notification(
        error?.response,
        `Terjadi kesalahan saat mendaftar anggota. ${JSON.stringify(error)}`
      );
      // console.error(error);
    }
  };

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
            <Form.Group className="mb-3">
              <Form.Label>NIK</Form.Label>
              <Form.Control
                type="text"
                value={fields.nik || ""}
                onChange={(e) => handleChange("nik", e.target.value)}
              />
            </Form.Group>
            {/* Tambahan Jenis Kelamin */}
            <Form.Group className="mb-3">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Select
                value={fields.jenis_kelamin || ""}
                onChange={(e) => handleChange("jenis_kelamin", e.target.value)}
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No HP</Form.Label>
              <Form.Control type="text" value={user?.no_tlp || ""} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user?.email || ""} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                value={fields.alamat || ""}
                onChange={(e) => handleChange("alamat", e.target.value)}
              />
            </Form.Group>

            {/* Tambahan Telp Darurat */}
            <Form.Group className="mb-3">
              <Form.Label>Telp Darurat</Form.Label>
              <Form.Control
                type="text"
                value={fields.tlp_darurat || ""}
                onChange={(e) => handleChange("tlp_darurat", e.target.value)}
              />
            </Form.Group>

            {/* Tambahan Hubungan */}
            <Form.Group className="mb-3">
              <Form.Label>Hubungan</Form.Label>
              <Form.Control
                type="text"
                value={fields.hubungan || ""}
                onChange={(e) => handleChange("hubungan", e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 2:
        // StepKTP sudah mengatur preview dan handleChange sesuai kebutuhan
        return <StepKTP onChange={handleChange} previews={previews} />;
      case 3:
        return (
          <>
            <h4 className="mb-3">Job Info</h4>
            <Form.Group className="mb-3">
              <Form.Label>Pekerjaan</Form.Label>
              <Form.Control
                type="text"
                value={fields.pekerjaan || ""}
                onChange={(e) => handleChange("pekerjaan", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tempat Kerja</Form.Label>
              <Form.Control
                type="text"
                value={fields.tempat_kerja || ""}
                onChange={(e) => handleChange("tempat_kerja", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat Kerja</Form.Label>
              <Form.Control
                type="text"
                value={fields.alamat_kerja || ""}
                onChange={(e) => handleChange("alamat_kerja", e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 4:
        return (
          <>
            <h4 className="mb-3">Bank Info</h4>
            <Form.Group className="mb-3">
              <Form.Label>Bank</Form.Label>
              <Form.Control
                type="text"
                value={fields.bank || ""}
                onChange={(e) => handleChange("bank", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No Rekening</Form.Label>
              <Form.Control
                type="text"
                value={fields.no_rekening || ""}
                onChange={(e) => handleChange("no_rekening", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Nasabah</Form.Label>
              <Form.Control
                type="text"
                value={fields.nama_nasabah || ""}
                onChange={(e) => handleChange("nama_nasabah", e.target.value)}
              />
            </Form.Group>
          </>
        );
      case 5:
        // StepCamera sudah mengatur preview dan handleChange sesuai kebutuhan
        return <StepCamera onChange={handleChange} previews={previews} />;
      case 6:
        return (
          <>
            <h4 className="mb-3">Komitmen</h4>
            <Form.Group className="mb-3">
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

  // cegah Enter (kecuali textarea) agar tidak memicu submit otomatis
  const handleKeyDownOnForm = (e) => {
    if (e.key === "Enter") {
      const tag =
        e.target && e.target.tagName ? e.target.tagName.toLowerCase() : "";
      if (tag === "textarea") return;
      if (tag === "button") return;
      // cegah default (termasuk submit)
      e.preventDefault();
    }
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
            <Col>
              <Card className="border shadow">
                <CardHeader className="bg-blue700 text-white">
                  <CardTitle>Form Pendaftaran Anggota</CardTitle>
                </CardHeader>
                <CardBody>
                  <ProgressBar
                    now={(step / totalSteps) * 100}
                    label={`Langkah ${step} dari ${totalSteps}`}
                    className="mb-4"
                  />
                  {/* NOTE: kita tidak memakai onSubmit, submit hanya via handleSubmit() */}
                  <Form
                    onKeyDown={handleKeyDownOnForm}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    {renderStep()}
                    <div className="d-flex justify-content-between mt-4">
                      <Button
                        variant="secondary"
                        onClick={prevStep}
                        disabled={step === 1}
                        type="button"
                      >
                        Sebelumnya
                      </Button>
                      {step < totalSteps ? (
                        <Button
                          variant="primary"
                          onClick={nextStep}
                          type="button"
                        >
                          Selanjutnya
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          type="button"
                          onClick={handleSubmit}
                        >
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
