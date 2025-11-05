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
} from "react-bootstrap";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { useCallback, useState, useEffect, useMemo } from "react";
import UAnggota from "../../utils/UAnggota";
import notification from "../../comp/global/Notification";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import SelAnggota from "../../comp/anggota/SelAnggota";
import { FaArrowLeft } from "react-icons/fa";
import StepKTP from "../../comp/anggota/formPendaftaran/stepKTP";
import StepCamera from "../../comp/anggota/formPendaftaran/stepCamera";

export default function FormPendaftaranAnggota() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [step, setStep] = useState(1);
  const [fields, setFields] = useState({});
  const [previews, setPreviews] = useState({});
  const totalSteps = 6;

  /** 🧭 Update user dari Header */
  const handleUserChange = useCallback(setUser, []);

  /** 🔄 Sinkronisasi user ke fields */
  useEffect(() => {
    if (user) {
      setFields((prev) => ({
        ...prev,
        nama: user.nama ?? "",
        no_tlp: user.no_tlp ?? "",
        email: user.email ?? "",
      }));
    }
  }, [user]);

  /** 📸 Handler input umum + file upload */
  const handleChange = useCallback((name, value, isPreviewOnly = false) => {
    // Validasi upload KTP
    if (name === "ktp" && value instanceof File) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(value.type))
        return notification(null, "Hanya boleh upload file JPG atau PNG.");

      if (value.size > 2 * 1024 * 1024)
        return notification(null, "Ukuran file maksimal 2MB.");

      const blobUrl = URL.createObjectURL(value);
      setPreviews((prev) => ({ ...prev, ktp: blobUrl }));
      setFields((prev) => ({ ...prev, ktp: value }));
      return;
    }

    // Update preview / data field biasa
    if (isPreviewOnly) setPreviews((prev) => ({ ...prev, [name]: value }));
    else setFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  /** ⏩ Navigasi antar step */
  const nextStep = useCallback(
    () => setStep((s) => Math.min(s + 1, totalSteps)),
    []
  );
  const prevStep = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  /** ✅ Submit form akhir */
  const handleSubmit = useCallback(async () => {
    try {
      const submitData = {
        ...fields,
        nia: user?.nik || "",
        nama: user?.nama || fields.nama || "",
      };

      const res = await UAnggota.daftarAnggota(submitData);
      notification(res, "Pendaftaran anggota berhasil!");

      setTimeout(() => {
        const token = jwtEncode({
          page: "detailPendaftaranAnggota",
          data: submitData,
        });
        navigate(`/${token}`);
      }, 2000);
    } catch (error) {
      console.error(error);
      notification(
        error?.response,
        "Terjadi kesalahan saat mendaftar anggota."
      );
    }
  }, [fields, user, navigate]);

  /** 🚫 Cegah Enter submit otomatis */
  const handleKeyDownOnForm = useCallback((e) => {
    const tag = e.target?.tagName?.toLowerCase();
    if (e.key === "Enter" && tag !== "textarea" && tag !== "button")
      e.preventDefault();
  }, []);

  /** 🧱 Step Form dinamis */
  const renderStep = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <>
            <h4 className="mb-3">Personal Info</h4>
            <Row>
              <Col xs={12} md={6}>
                <SelAnggota
                  value={fields.jenis_anggota || ""}
                  onChange={(val) => handleChange("jenis_anggota", val)}
                />
              </Col>

              {[
                { label: "NIK", name: "nik", type: "text" },
                {
                  label: "Jenis Kelamin",
                  name: "jenis_kelamin",
                  type: "select",
                  options: ["Laki-laki", "Perempuan"],
                },
                { label: "Telp Darurat", name: "tlp_darurat", type: "text" },
                { label: "Hubungan", name: "hubungan", type: "text" },
                { label: "Alamat", name: "alamat", type: "textarea" },
              ].map((f) => (
                <Col xs={12} md={6} key={f.name}>
                  <Form.Group as={Row} className="mb-2 align-items-center">
                    <Form.Label column xs={4} md={2}>
                      {f.label}
                    </Form.Label>
                    <Col xs={8} md={10}>
                      {f.type === "select" ? (
                        <Form.Select
                          value={fields[f.name] || ""}
                          onChange={(e) => handleChange(f.name, e.target.value)}
                        >
                          <option value="">Pilih {f.label}</option>
                          {f.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </Form.Select>
                      ) : f.type === "textarea" ? (
                        <Form.Control
                          as="textarea"
                          rows={2}
                          value={fields[f.name] || ""}
                          onChange={(e) => handleChange(f.name, e.target.value)}
                        />
                      ) : (
                        <Form.Control
                          type="text"
                          value={fields[f.name] || ""}
                          onChange={(e) => handleChange(f.name, e.target.value)}
                        />
                      )}
                    </Col>
                  </Form.Group>
                </Col>
              ))}

              {/* Info read-only dari user */}
              {[
                { label: "No HP", value: user?.no_tlp },
                { label: "Email", value: user?.email },
              ].map((f, i) => (
                <Col xs={12} md={6} key={i}>
                  <Form.Group as={Row} className="mb-2 align-items-center">
                    <Form.Label column xs={4} md={2}>
                      {f.label}
                    </Form.Label>
                    <Col xs={8} md={10}>
                      <Form.Control
                        type="text"
                        value={f.value || ""}
                        readOnly
                      />
                    </Col>
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </>
        );

      case 2:
        return <StepKTP onChange={handleChange} previews={previews} />;

      case 3:
        return (
          <>
            <h4 className="mb-3">Job Info</h4>
            <Row>
              {[
                { label: "Pekerjaan", name: "pekerjaan" },
                { label: "Tempat Kerja", name: "tempat_kerja" },
                {
                  label: "Alamat Kerja",
                  name: "alamat_kerja",
                  type: "textarea",
                },
              ].map((f) => (
                <Col xs={12} md={6}>
                  <Form.Group
                    as={Row}
                    key={f.name}
                    className="mb-2 align-items-center"
                  >
                    <Form.Label column md={2}>
                      {f.label}
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        as={f.type === "textarea" ? "textarea" : "input"}
                        rows={f.type === "textarea" ? 2 : undefined}
                        value={fields[f.name] || ""}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </>
        );

      case 4:
        return (
          <>
            <h4 className="mb-3">Bank Info</h4>
            <Row>
              {[
                { label: "Bank", name: "bank" },
                { label: "No Rekening", name: "no_rekening" },
                { label: "Nama Nasabah", name: "nama_nasabah" },
              ].map((f) => (
                <Col xs={12} md={6}>
                  <Form.Group
                    as={Row}
                    key={f.name}
                    className="mb-2 align-items-center"
                  >
                    <Form.Label column md={2}>
                      {f.label}
                    </Form.Label>
                    <Col md={10}>
                      <Form.Control
                        type="text"
                        value={fields[f.name] || ""}
                        onChange={(e) => handleChange(f.name, e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              ))}
            </Row>
          </>
        );

      case 5:
        return <StepCamera onChange={handleChange} previews={previews} />;

      case 6:
        return (
          <>
            <h4 className="mb-3">Komitmen</h4>
            <Form.Check
              type="checkbox"
              label="Saya siap berkomitmen belajar muamalah syariah dan meninggalkan transaksi riba."
              checked={fields.komitmen || false}
              onChange={(e) => handleChange("komitmen", e.target.checked)}
            />
          </>
        );

      default:
        return null;
    }
  }, [step, fields, previews, handleChange, user]);

  const isCommitmentChecked = fields.komitmen === true;

  /** 🧩 Render UI utama */
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

          <Card className="border shadow-sm">
            <CardHeader className="bg-blue700 text-white py-2">
              <CardTitle className="mb-0 fs-5">
                Form Pendaftaran Anggota
              </CardTitle>
            </CardHeader>

            <CardBody>
              <ProgressBar
                now={(step / totalSteps) * 100}
                label={`Langkah ${step} dari ${totalSteps}`}
                className="mb-4"
              />

              <Form
                onKeyDown={handleKeyDownOnForm}
                onSubmit={(e) => e.preventDefault()}
              >
                {renderStep}

                <div className="d-flex justify-content-between mt-4">
                  <Button
                    variant="secondary"
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    Sebelumnya
                  </Button>

                  {step < totalSteps ? (
                    <Button variant="primary" onClick={nextStep}>
                      Selanjutnya
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={handleSubmit}
                      disabled={!isCommitmentChecked}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}
