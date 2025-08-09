import { useState, useCallback, useMemo } from "react";
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
  Form as BsForm,
  Spinner,
} from "react-bootstrap";
import Footer from "../../comp/global/Footer";

const initialFormState = Object.freeze({
  nik: "",
  phone: "",
  email: "",
  currentAddress: "",
  ktpUpload: null,
  job: "",
  workplace: "",
  workAddress: "",
  bank: "",
  accountNumber: "",
  accountHolder: "",
  commitment: false,
});

const fieldConfigs = [
  {
    section: "Personal Info",
    fields: [
      {
        controlId: "nik",
        label: "Nomor Induk Kependudukan",
        type: "text",
        name: "nik",
        placeholder: "Masukkan NIK",
        required: true,
        minLength: 16,
        maxLength: 16,
        feedback: "NIK wajib diisi (16 digit).",
      },
      {
        controlId: "phone",
        label: "No Telepon / HP",
        type: "text",
        name: "phone",
        placeholder: "Masukkan No Telepon",
        required: true,
        feedback: "No Telepon wajib diisi.",
      },
      {
        controlId: "email",
        label: "Email",
        type: "email",
        name: "email",
        placeholder: "Masukkan Email",
        required: true,
        feedback: "Email wajib diisi.",
      },
      {
        controlId: "currentAddress",
        label: "Alamat Tempat Tinggal Saat Ini",
        type: "text",
        name: "currentAddress",
        placeholder: "Masukkan Alamat",
        required: true,
        feedback: "Alamat wajib diisi.",
      },
      {
        controlId: "ktpUpload",
        label: "Upload Foto KTP",
        type: "file",
        name: "ktpUpload",
        accept: "image/*",
        required: true,
        feedback: "Foto KTP wajib diupload.",
      },
    ],
  },
  {
    section: "Job Info",
    fields: [
      {
        controlId: "job",
        label: "Pekerjaan",
        type: "text",
        name: "job",
        placeholder: "Masukkan Pekerjaan",
        required: true,
        feedback: "Pekerjaan wajib diisi.",
      },
      {
        controlId: "workplace",
        label: "Tempat Kerja",
        type: "text",
        name: "workplace",
        placeholder: "Masukkan Tempat Kerja",
        required: true,
        feedback: "Tempat Kerja wajib diisi.",
      },
      {
        controlId: "workAddress",
        label: "Alamat Tempat Kerja",
        type: "text",
        name: "workAddress",
        placeholder: "Masukkan Alamat Tempat Kerja",
        required: true,
        feedback: "Alamat Tempat Kerja wajib diisi.",
      },
    ],
  },
  {
    section: "Bank Info",
    fields: [
      {
        controlId: "bank",
        label: "Bank",
        type: "text",
        name: "bank",
        placeholder: "Masukkan Nama Bank",
        required: true,
        feedback: "Nama Bank wajib diisi.",
      },
      {
        controlId: "accountNumber",
        label: "No Rekening",
        type: "text",
        name: "accountNumber",
        placeholder: "Masukkan No Rekening",
        required: true,
        feedback: "No Rekening wajib diisi.",
      },
      {
        controlId: "accountHolder",
        label: "Nama Nasabah",
        type: "text",
        name: "accountHolder",
        placeholder: "Masukkan Nama Nasabah",
        required: true,
        feedback: "Nama Nasabah wajib diisi.",
      },
    ],
  },
];

export default function FormPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  }, []);

  // Validasi lebih optimal dan terstruktur
  const validateForm = useCallback((form) => {
    // Cek field kosong
    for (const key in initialFormState) {
      if (
        key !== "ktpUpload" &&
        key !== "commitment" &&
        (form[key] === "" || form[key] === null)
      ) {
        return false;
      }
    }
    if (!form.ktpUpload) return false;
    if (!form.commitment) return false;
    // Validasi NIK
    if (!/^\d{16}$/.test(form.nik)) return false;
    // Validasi email sederhana
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return false;
    // Validasi nomor telepon (minimal 8 digit angka)
    if (!/^\d{8,}$/.test(form.phone)) return false;
    return true;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    setError(null);
    setSuccess(false);

    if (!validateForm(form)) {
      setError("Mohon lengkapi semua field dengan benar dan centang komitmen.");
      return;
    }

    setLoading(true);
    try {
      // Simulasi API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSuccess(true);
      setForm(initialFormState);
      setValidated(false);
    } catch (err) {
      setError("Terjadi kesalahan saat mengirim data.");
    } finally {
      setLoading(false);
    }
  };

  // Memoize form rendering for optimization
  const renderFormFields = useMemo(
    () =>
      fieldConfigs.map((section, idx) => (
        <div key={section.section}>
          <div className="border-top border-bottom">
            <h4 className={idx === 0 ? "mb-3" : "my-4"}>{section.section}</h4>
          </div>
          {section.fields.map((field) => (
            <BsForm.Group controlId={field.controlId} key={field.controlId}>
              <BsForm.Label>{field.label}</BsForm.Label>
              <BsForm.Control
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={
                  field.type === "file" ? undefined : form[field.name] ?? ""
                }
                onChange={handleChange}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                accept={field.accept}
                isInvalid={validated && !form[field.name]}
              />
              <BsForm.Control.Feedback type="invalid">
                {field.feedback}
              </BsForm.Control.Feedback>
            </BsForm.Group>
          ))}
        </div>
      )),
    [form, handleChange, validated]
  );

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12}>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} lg={12} className="mb-3">
              <Card className="border shadow mb-3s">
                <CardHeader className="bg-blue700 text-white">
                  <CardTitle>Formulir Pendaftaran Anggota</CardTitle>
                </CardHeader>
                <CardBody>
                  <BsForm
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                  >
                    {renderFormFields}

                    {/* Commitment Checkbox */}
                    <BsForm.Group controlId="commitment" className="my-4">
                      <BsForm.Check
                        type="checkbox"
                        name="commitment"
                        label="Siap berkomitmen belajar muamalah syariah dan meninggalkan transaksi riba"
                        checked={form.commitment}
                        onChange={handleChange}
                        required
                        feedback="Anda harus menyetujui komitmen ini."
                        feedbackType="invalid"
                        isInvalid={validated && !form.commitment}
                      />
                    </BsForm.Group>

                    {error && (
                      <div className="alert alert-danger py-2">{error}</div>
                    )}
                    {success && (
                      <div className="alert alert-success py-2">
                        Pendaftaran berhasil dikirim!
                      </div>
                    )}

                    <Button
                      variant="primary"
                      className="w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Mengirim...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </BsForm>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
