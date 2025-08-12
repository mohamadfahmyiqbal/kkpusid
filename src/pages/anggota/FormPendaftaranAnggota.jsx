import { useCallback, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  ProgressBar,
} from "react-bootstrap";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { STEP_CONFIGS } from "../../comp/anggota/formPendaftaran/formConfig";
import UAnggota from "../../utils/UAnggota";
import StepCamera from "../../comp/anggota/formPendaftaran/stepCamera";
import StepSummary from "../../comp/anggota/formPendaftaran/stepSummary";
import StepForm from "../../comp/anggota/formPendaftaran/stepForm";
import notification from "../../comp/global/Notification";
import { jwtEncode } from "../../routes/helpers";
import { useNavigate } from "react-router-dom";

export default function FormPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [fields, setFields] = useState({});
  const [previews, setPreviews] = useState({});
  const [step, setStep] = useState(1);
  const totalSteps = STEP_CONFIGS.length;

  const navigate = useNavigate();

  // Set fields from user info when user changes
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

  // Callback untuk handle perubahan user dari Header
  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  // Callback untuk handle perubahan input (fields dan previews)
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
      // Simpan file ke fields supaya bisa dikirim
      setFields((prev) => ({ ...prev, ktp: value }));
      return;
    }
    if (name === "foto_preview") {
      setPreviews((prev) => ({ ...prev, foto: value }));
      return;
    }
    if (name === "foto" && value instanceof File) {
      const blobUrl = URL.createObjectURL(value);
      setPreviews((prev) => ({ ...prev, foto: blobUrl }));
    }
    setFields((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Validasi tiap step
  const isStepValid = () => {
    const { fields: stepFields, title } = STEP_CONFIGS[step - 1];
    if (title === "Summary") return fields.komitmen === true;
    if (title === "Ambil Foto") return fields.foto instanceof File;
    return stepFields.every((f) => {
      const val = fields[f.name];
      if (f.required) {
        if (f.type === "file") return val instanceof File;
        if (typeof val === "string") return val.trim() !== "";
        return val !== undefined && val !== null;
      }
      return true;
    });
  };

  const nextStep = () => {
    if (!isStepValid()) {
      alert("Mohon lengkapi semua field wajib di step ini.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async () => {
    if (!isStepValid()) {
      alert("Mohon lengkapi semua field wajib.");
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
        const token = jwtEncode({ page: "dashboard" });
        navigate(`/page/${token}`);
      }, 3000);
    } catch (error) {
      notification(
        error?.response,
        "Terjadi kesalahan saat mendaftar anggota."
      );
      // console.error(error);
    }
  };

  const currentConfig = STEP_CONFIGS[step - 1];

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
                  <CardTitle>
                    Step {step} dari {totalSteps}
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <ProgressBar
                    now={(step / totalSteps) * 100}
                    className="mb-4"
                  />

                  {currentConfig.title === "Ambil Foto" && (
                    <StepCamera onChange={handleChange} previews={previews} />
                  )}
                  {currentConfig.title === "Summary" && (
                    <StepSummary
                      values={fields}
                      onChange={handleChange}
                      previews={previews}
                    />
                  )}
                  {currentConfig.fields.length > 0 &&
                    currentConfig.title !== "Ambil Foto" &&
                    currentConfig.title !== "Summary" && (
                      <StepForm
                        config={currentConfig}
                        values={fields}
                        onChange={handleChange}
                        previews={previews}
                      />
                    )}

                  <div className="mt-4 d-flex justify-content-between">
                    <Button
                      variant="secondary"
                      onClick={prevStep}
                      disabled={step === 1}
                    >
                      Previous
                    </Button>
                    {step < totalSteps ? (
                      <Button
                        variant="primary"
                        onClick={nextStep}
                        disabled={!isStepValid()}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={handleSubmit}
                        disabled={!isStepValid()}
                      >
                        Submit
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
