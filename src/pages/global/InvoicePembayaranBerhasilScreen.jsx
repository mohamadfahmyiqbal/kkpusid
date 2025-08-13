import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { Col, Container, Row, Table } from "react-bootstrap";
import CardCalon from "../../comp/dashboard/CardCalon";
import CardAnggota from "../../comp/dashboard/CardAnggota";
import CardTraining from "../../comp/training/CardTraining";
import CardArticle from "../../comp/article/CardArticle";
import Footer from "../../comp/global/Footer";
import { jwtEncode } from "../../routes/helpers";

export default function InvoicePembayaranBerhasilScreen() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Optimized: useCallback to prevent unnecessary re-renders
  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  // Tidak perlu handleClick di halaman pembayaran berhasil, status sudah "Berhasil"
  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3"></Row>

          {/* Invoice Section */}
          <Row className="mt-5">
            <Col md={12}>
              <h2 className="mb-4">Invoice</h2>

              <Table bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>To</strong>
                    </td>
                    <td>
                      <strong>Invoice Number</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Avhan Hadi</td>
                    <td>234234324234234234</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Invoice Date</strong>
                    </td>
                    <td>
                      <strong>Expired Date</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>05 Maret 2025 08:00</td>
                    <td>06 Maret 2025 08:00</td>
                  </tr>
                </tbody>
              </Table>

              <Table bordered>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pembayaran simpanan pokok periode Maret 2025</td>
                    <td>Rp. 200.000,-</td>
                  </tr>
                  <tr>
                    <td>Pembayaran simpanan pokok periode April 2025</td>
                    <td>Rp. 200.000,-</td>
                  </tr>
                  <tr>
                    <td>Pembayaran simpanan pokok periode Mei 2025</td>
                    <td>Rp. 200.000,-</td>
                  </tr>
                  <tr>
                    <td>Biaya Admin</td>
                    <td>Rp. 2.500,-</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td>
                      <strong>Rp. 602.500,-</strong>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Table bordered>
                <tbody>
                  <tr>
                    <td>
                      <strong>Bank</strong>
                    </td>
                    <td>Bank Syariah Mandiri</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Virtual Account</strong>
                    </td>
                    <td>123123123123123123123</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status</strong>
                    </td>
                    <td>
                      <span
                        className="badge bg-success"
                        style={{ cursor: "default" }}
                      >
                        Pembayaran Berhasil
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>

              <div className="text-center mt-4">
                <p>Paguyuban Usaha Sukses ©2025</p>
                <p>Powered By Manova</p>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
