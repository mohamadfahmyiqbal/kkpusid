import { useMemo, useState } from "react";
import { Button, Form, Modal, Pagination, Row, Col } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import MdlUpdMasterPinjaman from "../modal/MdlUpdMasterPinjaman";

// Format angka menjadi Rupiah
const formatRupiah = (value) => {
  if (typeof value !== "number") return value ?? "-";
  const formatted = Math.abs(value).toLocaleString("id-ID", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return value < 0 ? `-Rp ${formatted}` : `Rp ${formatted}`;
};

// Header kolom berdasarkan key objek
const renderTableHeader = (columns) =>
  columns.map((key) => (
    <th key={key}>
      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
    </th>
  ));

// Input search per kolom
const renderSearchInputs = (columns, searchTerms, handleSearchChange) =>
  columns.map((key) => (
    <th key={`search-${key}`}>
      <Form.Control
        size="sm"
        type="text"
        placeholder={`Cari ${key}`}
        value={searchTerms[key] || ""}
        onChange={(e) => handleSearchChange(e, key)}
      />
    </th>
  ));

export default function TMasterPinjaman({ data = [], user = {}, feedback }) {
  const [searchTerms, setSearchTerms] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const itemsPerPage = 10;

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).filter((key) => key !== "id");
  }, [data]);

  const handleSearchChange = (e, key) => {
    const value = e.target.value.toLowerCase();
    setSearchTerms((prev) => ({ ...prev, [key]: value }));
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
  }, [data, columns, searchTerms]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleAdd = () => {
    setSelectedData(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setSelectedData(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      feedback("delete", item);
    }
  };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        {columns.length === 0 ? (
          <div className="text-center py-4 text-muted">
            Tidak ada data untuk ditampilkan.
          </div>
        ) : (
          <>
            <Row className="mb-3">
              <Col>
                <Button variant="success" onClick={handleAdd}>
                  <FaPlus className="me-1" /> Tambah
                </Button>
              </Col>
            </Row>

            <table className="table table-bordered table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Aksi</th>
                  {renderTableHeader(columns)}
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  {renderSearchInputs(columns, searchTerms, handleSearchChange)}
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Button
                          variant="warning"
                          size="sm"
                          className="text-white"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          title="Hapus"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                    {columns.map((key) => {
                      const value = item[key];
                      const isCurrency = ["jumlah", "saldo"].includes(key);
                      return (
                        <td key={key}>
                          {isCurrency
                            ? formatRupiah(value)
                            : typeof value === "number"
                            ? value.toLocaleString("id-ID")
                            : value?.toString() ?? "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <Pagination className="mt-3 justify-content-end">
                <Pagination.First
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            )}
          </>
        )}
      </div>

      {/* Modal Tambah/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <MdlUpdMasterPinjaman
          detailData={selectedData}
          user={user}
          onHide={() => setShowModal(false)}
          onSave={(result) => {
            const action = selectedData ? "update" : "create";
            feedback(action, result);
            setShowModal(false);
          }}
        />
      </Modal>
    </>
  );
}
