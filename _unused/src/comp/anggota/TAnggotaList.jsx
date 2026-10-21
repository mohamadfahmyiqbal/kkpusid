import { useEffect, useState } from "react";
import {
  Button,
  CardBody,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
  Pagination,
} from "react-bootstrap";
import UAnggota from "../../utils/UAnggota";
import { FaEye } from "react-icons/fa";

export default function TAnggotaList() {
  const [data, setData] = useState([]);
  const [searchTerms, setSearchTerms] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const columns = ["nik", "nama", "email", "no_tlp", "status_anggota", "roles"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await UAnggota.anggotaList();
        setData(res.data || []);
      } catch (error) {
        console.error("Gagal memuat data anggota:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      columns.every((col) =>
        (searchTerms[col] || "")
          .toLowerCase()
          .split(" ")
          .every((term) =>
            String(item[col] || "")
              .toLowerCase()
              .includes(term)
          )
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // reset ke halaman pertama saat filter berubah
  }, [data, searchTerms]);

  const handleSearchChange = (e, key) => {
    setSearchTerms((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <CardBody>
      <Row className="align-items-center">
        <Col md={6}>
          <Button className="bg-topbar text-white me-2">Excel</Button>
          <Button className="bg-topbar text-white me-2">PDF</Button>
          <Button className="bg-topbar text-white me-2">Print</Button>
        </Col>
      </Row>

      <Row className="mt-3">
        <div style={{ overflowX: "auto" }}>
          {filteredData.length === 0 ? (
            <div className="text-center py-4 text-muted">No Data</div>
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
                  {currentItems.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{startIndex + index + 1}</td>
                      <td>
                        <Button size="sm" className="me-1 bg-topbar text-white">
                          <FaEye />
                        </Button>
                      </td>
                      {columns.map((key) => (
                        <td key={`${index}-${key}`}>{item[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="d-flex justify-content-end mt-3">
                <Pagination>{paginationItems}</Pagination>
              </div>
            </>
          )}
        </div>
      </Row>
    </CardBody>
  );
}
