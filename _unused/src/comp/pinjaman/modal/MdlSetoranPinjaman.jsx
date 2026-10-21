import { Badge, Button, Card, Form, Modal } from "react-bootstrap";
import moment from "moment";
import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import UPinjaman from "../../../utils/UPinjaman";
import Loading from "../../global/Loading";
import { FaEye, FaMoneyCheck } from "react-icons/fa";
import MdlDetailSetoranPinjaman from "./MdlDetailSetoranPinjaman";

export default function MdlSetoranPinjaman({ detailData }) {
  const [loading, setLoading] = useState(false);
  const [dataSetoran, setDataSetoran] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedAmpun, setSelectedAmpun] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [searchTerms, setSearchTerms] = useState({
    periode: "",
    tanggal: "",
    namaanggota: "",
    namasetoran: "",
    jumlah: "",
    status: "",
  });

  useEffect(() => {
    if (detailData?.id) fetchData();
  }, [detailData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await UPinjaman.getSetoranPinjaman(detailData);
      setDataSetoran(res.data || []);
    } catch {
      toast.error("Gagal mengambil data setoran!");
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);

  const handleSearchChange = useCallback((field, value) => {
    setSearchTerms((prev) => ({ ...prev, [field]: value }));
  }, []);

  const filteredData = useMemo(() => {
    return dataSetoran.filter((item) =>
      Object.keys(searchTerms).every((key) => {
        const term = searchTerms[key].toLowerCase();
        if (!term) return true;

        let value = item[key];
        if (key === "tanggal") {
          value = moment(item.tanggal).format("DD MMM YYYY");
        } else if (key === "jumlah") {
          value = formatRupiah(item.jumlah);
        }

        return value?.toString().toLowerCase().includes(term);
      })
    );
  }, [dataSetoran, searchTerms]);

  const handleDetail = (item) => {
    setSelectedDetail(item);
    setShowDetailModal(true);
  };

  return (
    <>
      <Modal.Body>
        <Card className="border-top border-bottom">
          <Card.Body className="p-2">
            <Card.Title className="h6 fw-bold">Riwayat Setoran</Card.Title>

            {loading ? (
              <Loading />
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>No</th>
                      <th>Aksi</th>
                      <th>Periode</th>
                      <th>Tanggal</th>
                      <th>Nama Anggota</th>
                      <th>Nama Setoran</th>
                      <th>Jumlah</th>
                      <th>Status</th>
                    </tr>
                    <tr>
                      <th></th>
                      <th></th>
                      {[
                        "periode",
                        "tanggal",
                        "namaanggota",
                        "namasetoran",
                        "jumlah",
                        "status",
                      ].map((field) => (
                        <th key={field}>
                          <Form.Control
                            size="sm"
                            placeholder="Cari"
                            value={searchTerms[field]}
                            onChange={(e) =>
                              handleSearchChange(field, e.target.value)
                            }
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, idx) => (
                        <tr key={item.id || idx}>
                          <td>{idx + 1}</td>
                          <td className="d-flex gap-1">
                            <Button
                              size="sm"
                              className="bg-topbar"
                              onClick={() => handleDetail(item)}
                            >
                              <FaEye className="text-white" />
                            </Button>
                          </td>
                          <td>{item.periode || "-"}</td>
                          <td>{moment(item.tanggal).format("DD-MM-YYYY")}</td>
                          <td>{item.namaanggota || "-"}</td>
                          <td>{item.namasetoran || "-"}</td>
                          <td>{formatRupiah(item.jumlah)}</td>
                          <td>
                            <Badge
                              bg={
                                item.status?.toLowerCase() === "lunas"
                                  ? "success"
                                  : "secondary"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center text-muted">
                          Tidak ada data ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card.Body>
        </Card>
      </Modal.Body>

      {/* Modal Detail */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        size="lg"
      >
        <Modal.Header className="bg-topbar text-white" closeButton>
          <Modal.Title>Detail Setoran</Modal.Title>
        </Modal.Header>
        <MdlDetailSetoranPinjaman
          detailData={selectedDetail}
          onHide={() => setShowDetailModal(false)}
        />
      </Modal>
    </>
  );
}
