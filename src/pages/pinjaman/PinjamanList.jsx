import {
  Breadcrumb,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import Footer from "../../comp/global/Footer";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import UPinjaman from "../../utils/UPinjaman";
import TAnggotaPinjaman from "../../comp/pinjaman/table/TAnggotaPinjaman";

export default function PinjamanList() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // 🔁 Konversi tanggal: dd-mm-yyyy → yyyy-mm-dd
  const toISODate = (str) => {
    const [d, m, y] = str.split("-");
    return d && m && y
      ? `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
      : "";
  };

  // 📝 Handler perubahan input
  const handleChange = useCallback(({ target: { name, value } }) => {
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "startDate" || name === "endDate" ? toISODate(value) : value,
    }));
  }, []);

  // 🔍 Handler pencarian data
  const handleSearch = useCallback(
    async (e) => {
      e?.preventDefault?.();

      const { startDate, endDate } = form;

      if (!startDate || !endDate) {
        toast.warn("Tanggal mulai dan akhir harus diisi!");
        return;
      }

      setLoading(true);
      try {
        const res = await UPinjaman.getAnggotaPinjamanLunak(form);
        setData(Array.isArray(res?.data) ? res.data : []);
      } catch (error) {
        toast.error("Gagal mengambil data pinjaman");
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  // 🚀 Muat data otomatis saat pertama render
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  // ✅ Feedback Handler dari komponen lain
  const feedback = async (res) => {
    const status = res?.status || res?.response?.status;

    if (status >= 200 && status < 300) {
      toast.success("Aksi berhasil dilakukan!");
      handleSearch(); // 🔁 Refresh data
    } else if (status === 400) {
      toast.error("Terjadi kesalahan saat melakukan aksi.");
    } else if (status === 401) {
      toast.error("Tidak diizinkan melakukan aksi ini.");
    } else if (status === 403) {
      toast.error("Akses ditolak.");
    } else if (status === 500) {
      toast.error("Terjadi kesalahan pada server.");
    } else {
      toast.info("Feedback diterima, namun tidak diketahui hasilnya.");
    }
  };

  return (
    <div
      id="main-wrapper"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header onUserReady={setUser} />
      <Sidebar />
      <div className="page-wrapper" style={{ flex: 1, overflowY: "auto" }}>
        <Container fluid>
          {/* 🧭 Judul & Breadcrumb */}
          <Row className="page-titles mb-3">
            <Col>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                <h3 className="text-themecolor mb-0">Pinjaman Lunak</h3>
                <Breadcrumb className="mb-0">
                  <Breadcrumb.Item href="#">Program</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">Pinjaman</Breadcrumb.Item>
                  <Breadcrumb.Item active>List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>

          {/* 🔎 Form Filter */}
          <Row className="g-3 mb-3">
            <Card className="shadow-sm">
              <CardBody>
                <Form onSubmit={handleSearch}>
                  <Row className="align-items-end g-2">
                    <Col md={3}>
                      <Form.Group controlId="startDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          value={form.startDate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="endDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          value={form.endDate}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group controlId="status">
                        <Form.Label>Status</Form.Label>
                        <Form.Select
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                        >
                          <option value="">-- Pilih Status --</option>
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="primary"
                        type="submit"
                        style={{ width: "100%" }}
                      >
                        Cari
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Row>

          {/* 📊 Tabel Data */}
          <Row>
            <Col xs={12}>
              <Card className="shadow-sm">
                <CardBody>
                  {loading ? (
                    <div className="text-center py-4">Memuat data...</div>
                  ) : data.length === 0 ? (
                    <div className="text-center py-4 text-muted">
                      Tidak ada data pinjaman.
                    </div>
                  ) : (
                    <TAnggotaPinjaman
                      data={data}
                      feedback={feedback}
                      user={user}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
