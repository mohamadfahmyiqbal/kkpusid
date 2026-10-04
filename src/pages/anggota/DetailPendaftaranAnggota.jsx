import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import UApproval from "../../utils/UApproval";
import { jwtEncode } from "../../routes/helpers";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";

import PersonalInfoSection from "./detail-pendaftaran/PersonalInfoSection";
import PhotoInfoSection from "./detail-pendaftaran/PhotoInfoSection";
import AccountInfoSection from "./detail-pendaftaran/AccountInfoSection";
import JobInfoSection from "./detail-pendaftaran/JobInfoSection";
import BankInfoSection from "./detail-pendaftaran/BankInfoSection";
import ApprovalInfoSection from "./detail-pendaftaran/ApprovalInfoSection";

export default function DetailPendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [dataPendaftaran, setDataPendaftaran] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const getPendaftaran = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const res = await UApproval.getApprovalDetail({
        nik: user.nik,
        type: "pendaftaran_anggota",
      });

      setDataPendaftaran(res.data);
    } catch (err) {
      console.error(err);

      // Fallback langsung ke form pendaftaran jika request gagal
      navigate(`/${jwtEncode({ page: "formPendaftaranAnggota" })}`, {
        state: {
          back: "pendaftaranAnggota",
          jenis: "pendaftaranAnggota",
        },
      });
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    getPendaftaran();
  }, [getPendaftaran]);

  // Cek semua approval sudah approved
  const allApproved =
    dataPendaftaran?.RequestApproval?.length > 0 &&
    dataPendaftaran.RequestApproval.every(
      (apr) => apr?.status?.toLowerCase() === "approved"
    );

  const handleInvoiceClick = () => {
    const token = jwtEncode({ page: "invoice" });
    navigate(`/${token}`, {
      state: {
        title: "Invoice Pendaftaran Anggota",
        back: "detailPendaftaranAnggota",
        data: dataPendaftaran?.token,
      },
    });
  };

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="link"
                className="p-0 me-2"
                onClick={() => navigate(-1)}
                style={{ textDecoration: "none" }}
              >
                <FaArrowLeft size={15} color="black" />
              </Button>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card className="border shadow">
                <CardHeader className="bg-topbar text-white">
                  <CardTitle>Detail Pendaftaran</CardTitle>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <div className="text-center my-5">
                      <Spinner animation="border" role="status" />
                      <div className="mt-2 text-muted">Memuat data...</div>
                    </div>
                  ) : dataPendaftaran ? (
                    <Container fluid>
                      {/* Personal Info */}
                      <PersonalInfoSection
                        detail={dataPendaftaran?.anggota?.detail}
                        nama={dataPendaftaran?.anggota?.nama}
                      />

                      {/* Foto Info */}
                      <PhotoInfoSection
                        ktpImg={dataPendaftaran?.anggota?.ktpImg}
                        fotoImg={dataPendaftaran?.anggota?.fotoImg}
                      />

                      {/* Account Info */}
                      <AccountInfoSection
                        categoryName={dataPendaftaran?.categoryAnggota?.nama}
                        noTlp={dataPendaftaran?.anggota?.no_tlp}
                        email={dataPendaftaran?.anggota?.email}
                      />

                      {/* Job Info */}
                      <JobInfoSection job={dataPendaftaran?.anggota?.job} />

                      {/* Bank Info */}
                      <BankInfoSection bank={dataPendaftaran?.anggota?.bank} />

                      {/* Approval Info */}
                      <ApprovalInfoSection
                        requestApprovals={dataPendaftaran?.RequestApproval}
                        allApproved={allApproved}
                        onNext={handleInvoiceClick}
                      />
                    </Container>
                  ) : (
                    <Alert variant="warning" className="text-center my-3">
                      Data pendaftaran tidak tersedia.
                    </Alert>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
