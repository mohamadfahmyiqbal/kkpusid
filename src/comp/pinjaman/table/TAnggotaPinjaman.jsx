import { useMemo, useState } from "react";
import { Button, Col, Form, Modal, Pagination, Row } from "react-bootstrap";
import moment from "moment";
import { FaEye, FaGavel, FaHandHoldingUsd } from "react-icons/fa";
import MdlAnggotaPinjaman from "../modal/MdlAnggotaPinjaman";
import MdlSetoranPinjaman from "../modal/MdlSetoranPinjaman";
import MdlAmpunPinjaman from "../modal/MdlAmpunPinjaman";

export default function TAnggotaPinjaman({ data = [], feedback, user }) {
  const [searchTerms, setSearchTerms] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showModal, setShowModal] = useState({
    setoran: false,
    detail: false,
    ampun: false,
  });

  const [modalData, setModalData] = useState({
    setoran: null,
    detail: null,
    ampun: null,
  });

  const columns = [
    "nik",
    "nama",
    "jenispinjaman",
    "jumlahpinjaman",
    "term",
    "piutang",
    "statuscicilan",
    "statusapproval",
    "TanggalDaftar",
  ];

  const handleSearchChange = (e, key) => {
    setSearchTerms((prev) => ({
      ...prev,
      [key]: e.target.value.toLowerCase(),
    }));
    setCurrentPage(1);
  };

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      columns.every((key) => {
        const term = searchTerms[key] || "";
        const value = item[key]?.toString().toLowerCase() || "";
        return value.includes(term);
      })
    );
  }, [data, searchTerms]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPagination = () => (
    <Pagination className="mt-3 justify-content-end">
      <Pagination.First
        onClick={() => setCurrentPage(1)}
        disabled={currentPage === 1}
      />
      <Pagination.Prev
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, i) => (
        <Pagination.Item
          key={i}
          active={i + 1 === currentPage}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
      <Pagination.Last
        onClick={() => setCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );

  const openModal = (type, item) => {
    setModalData((prev) => ({ ...prev, [type]: item }));
    setShowModal((prev) => ({ ...prev, [type]: true }));
  };

  const closeModal = (type) => {
    setModalData((prev) => ({ ...prev, [type]: null }));
    setShowModal((prev) => ({ ...prev, [type]: false }));
  };

  return (
    <div style={{ overflowX: "auto" }}>
      {data.length === 0 ? (
        <div className="text-center py-4 text-muted">
          Tidak ada data untuk ditampilkan.
        </div>
      ) : (
        <>
          <table className="table table-bordered table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Aksi</th>
                {columns.map((key) => (
                  <th key={`head-${key}`}>
                    {key.replace("_", " ").toUpperCase()}
                  </th>
                ))}
              </tr>
              <tr>
                <th></th>
                <th></th>
                {columns.map((key) => (
                  <th key={`search-${key}`}>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder={`Cari ${key}`}
                      value={searchTerms[key] || ""}
                      onChange={(e) => handleSearchChange(e, key)}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td>
                    <Row>
                      <Col xs={6} className="mb-1">
                        <Button
                          variant="info"
                          size="md"
                          title="Lihat Detail"
                          onClick={() => openModal("detail", item)}
                        >
                          <FaEye className="text-white" />
                        </Button>
                      </Col>
                      <Col xs={6} className="mb-1">
                        <Button
                          variant="none"
                          className="bg-yellow-grad"
                          size="md"
                          title="Ajukan Penarikan"
                          onClick={() => openModal("setoran", item)}
                        >
                          <FaHandHoldingUsd className="text-white" />
                        </Button>
                      </Col>
                      {item.statuscicilan !== "Lunas" && (
                        <Col xs={6} className="mb-1">
                          <Button
                            variant="danger"
                            size="md"
                            title="Pengampunan"
                            onClick={() => openModal("ampun", item)}
                          >
                            <FaGavel className="text-white" />
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </td>
                  {columns.map((key) => {
                    const value = item[key];

                    // Format nilai numerik seperti jumlah pinjaman dan piutang
                    if (["jumlahpinjaman", "piutang"].includes(key)) {
                      return (
                        <td key={key}>
                          {typeof value === "number"
                            ? `Rp ${value.toLocaleString("id-ID")}`
                            : "-"}
                        </td>
                      );
                    }

                    // Format tanggal dengan moment
                    if (key === "TanggalDaftar") {
                      return (
                        <td key={key}>
                          {value && moment(value).isValid()
                            ? moment(value).format("DD-MM-YYYY HH:mm")
                            : "-"}
                        </td>
                      );
                    }

                    // Default: tampilkan string atau angka
                    return (
                      <td key={key}>
                        {typeof value === "number"
                          ? value.toLocaleString("id-ID")
                          : value ?? "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          {renderPagination()}
        </>
      )}

      {/* Modal Detail */}
      <Modal
        show={showModal.detail}
        onHide={() => closeModal("detail")}
        size="lg"
      >
        <Modal.Header className="bg-topbar text-white" closeButton>
          <Modal.Title>Register Detail</Modal.Title>
        </Modal.Header>
        <MdlAnggotaPinjaman detailData={modalData.detail} />
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal("detail")}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Setoran */}
      <Modal
        show={showModal.setoran}
        onHide={() => closeModal("setoran")}
        size="xl"
      >
        <Modal.Header className="bg-topbar text-white" closeButton>
          <Modal.Title>Setoran Pinjaman</Modal.Title>
        </Modal.Header>
        <MdlSetoranPinjaman detailData={modalData.setoran} />
        <Modal.Footer>
          <Button variant="secondary" onClick={() => closeModal("setoran")}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Ampun */}
      <Modal
        show={showModal.ampun}
        onHide={() => closeModal("ampun")}
        size="xl"
      >
        <Modal.Header className="bg-topbar text-white" closeButton>
          <Modal.Title>Pengampunan Pinjaman</Modal.Title>
        </Modal.Header>
        <MdlAmpunPinjaman
          detailData={modalData.ampun}
          dataSetoran={modalData.setoran}
          handleCloseAmpun={() => closeModal("ampun")}
          user={user}
          feedback={feedback}
        />
      </Modal>
    </div>
  );
}
