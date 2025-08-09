import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import UPinjaman from "../../utils/UPinjaman";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import {
  Breadcrumb,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Loading from "../../comp/global/Loading";
import TPinjamanModal from "../../comp/pinjaman/table/TPinjamanModal";
import TPinjamanLunak from "../../comp/pinjaman/table/TPinjamanLunak";
import TPinjamanJurnal from "../../comp/pinjaman/table/TPinjamanJurnal";
import TNeraca from "../../comp/pinjaman/table/TNeraca";

const initialForm = {
  startDate: "2024",
  endDate: "2025",
  status: "",
};

export default function PinjamanReport() {
  const [user, setUser] = useState({});
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [LaporanPinjaman, setLaporanPinjaman] = useState([]);
  const [JurnalPinjaman, setJurnalPinjaman] = useState([]);
  const [NeracaPinjaman, setNeracaPinjaman] = useState([]);
  const [MasterPinjaman, setMasterPinjaman] = useState([]);

  // 🔁 Handler input biasa
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  // 📅 Generate opsi tahun dari 2000 s.d. 2030
  const yearOptions = Array.from({ length: 31 }, (_, i) => {
    const year = 2000 + i;
    return { label: year.toString(), value: year.toString() };
  });

  // 🔍 Ambil data pinjaman
  const fetchData = useCallback(async () => {
    const { startDate, endDate } = form;

    if (!startDate || !endDate) {
      toast.warn("Tahun mulai dan akhir harus diisi!");
      return;
    }

    setLoading(true);
    setIsSearched(true); // ⬅️ Penanda bahwa pencarian dimulai

    try {
      const [
        resMasterPinjaman,
        resLaporanPinjaman,
        resJurnalPinjaman,
        resNeracaPinjaman,
      ] = await Promise.all([
        UPinjaman.getMasterPinjamanLunak(form),
        UPinjaman.getLaporanPinjamanLunak(form),
        UPinjaman.getJurnalPinjamanLunak(form),
        UPinjaman.getNeracaPinjamanLunak(form),
      ]);
      setMasterPinjaman(resMasterPinjaman?.data ?? []);
      setLaporanPinjaman(resLaporanPinjaman?.data ?? []);
      setJurnalPinjaman(resJurnalPinjaman?.data ?? []);
      setNeracaPinjaman(resNeracaPinjaman?.data ?? []);
    } catch (err) {
      toast.error("Gagal mengambil data pinjaman");
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [form]);

  // 🚀 Load pertama kali
  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                  <Breadcrumb.Item active>Report</Breadcrumb.Item>
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
                        <Form.Label>Start Year</Form.Label>
                        <Select
                          options={yearOptions}
                          value={yearOptions.find(
                            (y) => y.value === form.startDate
                          )}
                          onChange={(selected) =>
                            setForm((prev) => ({
                              ...prev,
                              startDate: selected.value,
                            }))
                          }
                          placeholder="Pilih Tahun"
                          className="react-select-container"
                          classNamePrefix="react-select"
                        />
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Form.Group controlId="endDate">
                        <Form.Label>End Year</Form.Label>
                        <Select
                          options={yearOptions}
                          value={yearOptions.find(
                            (y) => y.value === form.endDate
                          )}
                          onChange={(selected) =>
                            setForm((prev) => ({
                              ...prev,
                              endDate: selected.value,
                            }))
                          }
                          placeholder="Pilih Tahun"
                          className="react-select-container"
                          classNamePrefix="react-select"
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
                          className="w-100"
                        >
                          <option value="">-- Pilih Status --</option>
                          <option value="Aktif">Aktif</option>
                          <option value="Nonaktif">Nonaktif</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col md={3}>
                      <Button
                        type="submit"
                        variant="primary"
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
          {isSearched && (
            <Row>
              <Col xs={12}>
                <Card className="shadow-sm">
                  <CardBody>
                    {loading ? (
                      <div className="text-center my-4">
                        <Loading />
                      </div>
                    ) : (
                      <Tabs
                        defaultActiveKey="laporan"
                        id="report-tabs"
                        className="mt-3"
                      >
                        <Tab eventKey="laporan" title="Modal">
                          <TPinjamanModal data={MasterPinjaman} />
                        </Tab>
                        <Tab eventKey="modal" title="Pinjaman Lunak">
                          <TPinjamanLunak
                            data={LaporanPinjaman}
                            jurnal={JurnalPinjaman}
                          />
                        </Tab>
                        <Tab eventKey="jurnal" title="Jurnal">
                          <TPinjamanJurnal data={JurnalPinjaman} />
                        </Tab>
                        <Tab eventKey="neraca" title="Neraca">
                          <TNeraca data={NeracaPinjaman} />
                        </Tab>
                      </Tabs>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}
