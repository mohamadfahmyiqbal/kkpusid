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
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import Footer from "../../comp/global/Footer";
import UPinjaman from "../../utils/UPinjaman";
import TMasterPinjaman from "../../comp/pinjaman/table/TMasterPinjaman";

const initialForm = {
  startDate: "2024-01-01",
  endDate: "2025-12-31",
  status: "",
};

export default function PinjamanTrans() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // 🔁 Input Handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  // 🔍 Ambil Data Pinjaman
  const fetchData = useCallback(async () => {
    const { startDate, endDate } = form;

    if (!startDate || !endDate) {
      toast.warn("Tanggal mulai dan akhir harus diisi!");
      return;
    }

    setLoading(true);
    try {
      const res = await UPinjaman.getMasterPinjamanLunak(form);
      setData(Array.isArray(res?.data) ? res.data : []);
    } catch (err) {
      toast.error("Gagal mengambil data pinjaman");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [form]);

  // 🚀 Load saat pertama kali
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 📤 Handler kirim data perubahan (Create/Update/Delete)
  const handleFeedback = useCallback(
    async (action, payload) => {
      try {
        const res = await UPinjaman.setMasterPinjaman({ action, ...payload });
        if (res?.status === 200) {
          toast.success("Data berhasil diproses");
          fetchData();
        } else {
          toast.error("Gagal memproses data pinjaman");
        }
      } catch (error) {
        toast.error("Terjadi kesalahan saat memproses data");
        console.error("Feedback Error:", error);
      }
    },
    [fetchData]
  );

  return (
    <div
      id="main-wrapper"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header onUserReady={setUser} />
      <Sidebar />

      <div className="page-wrapper" style={{ flex: 1, overflowY: "auto" }}>
        <Container fluid>
          {/* 🧭 Header & Breadcrumb */}
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
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    fetchData();
                  }}
                >
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
                      <Button type="submit" variant="primary" className="w-100">
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
                    <TMasterPinjaman
                      data={data}
                      user={user}
                      feedback={handleFeedback}
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
