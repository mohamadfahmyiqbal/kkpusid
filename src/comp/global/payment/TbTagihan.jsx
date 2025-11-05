import { useCallback, useEffect, useState } from "react";
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
  Spinner,
} from "react-bootstrap";
import notification from "../Notification";
import UMenu from "../../../utils/UMenu";
import { formatRupiah } from "../../../utils/formatRupiah";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";

export default function TbTagihan({ data }) {
  const [loading, setLoading] = useState(false);
  const [tagihan, setTagihan] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await UMenu.getAllTagihanDetail({ jenis: data.jenis.name });
      setTagihan(res.data || []);
      setSelectedItems([]); // reset selection setiap load baru
      setSelectAll(false);
    } catch (error) {
      notification(error, "Gagal mengambil data tagihan");
    } finally {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    getData();
  }, [getData]);

  // toggle select item
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // toggle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(tagihan);
    }
    setSelectAll(!selectAll);
  };

  const handleClick = useCallback((action, payload) => {
    switch (action) {
      case "invoice":
        navigate(`/${jwtEncode({ page: action })}`, {
          state: {
            data: null,
            selected: selectedItems,
            back: "tagihan",
            jenis: data.jenis,
            type: "Setor",
          },
        });
        break;
    }
  });

  return (
    <Container fluid>
      <Card>
        <CardHeader className="bg-topbar text-white d-flex justify-content-between align-items-center">
          <CardTitle className="fw-bold mb-0">Tagihan</CardTitle>
          {tagihan.length > 0 && (
            <Form.Check
              type="checkbox"
              label="Pilih Semua"
              checked={selectAll}
              onChange={handleSelectAll}
              className="text-white"
            />
          )}
        </CardHeader>
        <CardBody>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-3">
              <Spinner animation="border" variant="primary" className="me-2" />
              <span>Sedang mengambil data...</span>
            </div>
          ) : tagihan.length === 0 ? (
            <div className="text-center text-muted py-3">
              Tidak ada tagihan tersedia
            </div>
          ) : (
            tagihan.map((row, idx) => (
              <Row
                key={row.id || idx}
                className="align-items-center border-bottom py-2"
              >
                <Col xs={1}>
                  <Form.Check
                    type="checkbox"
                    checked={selectedItems.includes(row)}
                    onChange={() => handleSelectItem(row)}
                  />
                </Col>
                <Col xs={11} className="d-flex justify-content-between">
                  <span>{row?.name}</span>
                  <span className="fw-bold">{formatRupiah(row?.jumlah)}</span>
                </Col>
              </Row>
            ))
          )}

          <Row className="mt-4">
            <Col className="text-center">
              <Button
                className="bg-topbar text-white w-100"
                disabled={selectedItems.length === 0}
                onClick={() => handleClick("invoice")}
              >
                Proses ({selectedItems.length})
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
}
