import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const TermsConditionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container>
        <div className="mb-4 d-flex align-items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
            style={{ color: '#0d6efd' }}
          >
            <MdArrowBack size={24} className="me-2" />
            Kembali
          </button>
        </div>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body className="p-5">
                <h1 className="mb-4 text-center">Syarat & Ketentuan</h1>
                <p className="text-muted text-center mb-5">Pembaruan Terakhir: 15 Juli 2026</p>

                <div className="terms-content">
                  <h4 className="mb-3">1. Keanggotaan Koperasi</h4>
                  <p className="text-secondary mb-4">
                    Untuk menjadi anggota KKPUS, calon anggota wajib mengisi formulir pendaftaran, menyetujui anggaran dasar dan anggaran rumah tangga (AD/ART) Koperasi, serta melunasi simpanan pokok dan simpanan wajib sesuai dengan ketentuan yang berlaku.
                  </p>

                  <h4 className="mb-3">2. Prinsip Syariah</h4>
                  <p className="text-secondary mb-4">
                    Seluruh transaksi, layanan pembiayaan, simpanan, dan investasi yang dikelola oleh KKPUS berpedoman pada prinsip-prinsip syariah Islam. Segala bentuk praktik riba, gharar, dan maysir dilarang keras. Kami diawasi oleh Dewan Pengawas Syariah (DPS) untuk memastikan kepatuhan.
                  </p>

                  <h4 className="mb-3">3. Layanan Pembiayaan</h4>
                  <p className="text-secondary mb-4">
                    Anggota berhak mengajukan pembiayaan usaha setelah melalui proses verifikasi dan peninjauan kelayakan. KKPUS berhak menerima atau menolak pengajuan berdasarkan profil risiko, kemampuan bayar, dan ketersediaan dana sesuai prinsip kehati-hatian.
                  </p>

                  <h4 className="mb-3">4. Hak dan Kewajiban</h4>
                  <p className="text-secondary mb-4">
                    Anggota berhak mendapatkan sisa hasil usaha (SHU), mengikuti pelatihan usaha, dan menyampaikan pendapat dalam Rapat Anggota Tahunan (RAT). Anggota berkewajiban mematuhi peraturan koperasi, menjaga nama baik, dan memenuhi kewajiban finansial (cicilan, simpanan) tepat waktu.
                  </p>

                  <h4 className="mb-3">5. Penyelesaian Sengketa</h4>
                  <p className="text-secondary mb-4">
                    Apabila terjadi perselisihan atau sengketa antara Koperasi dan Anggota, maka penyelesaian akan diutamakan melalui musyawarah untuk mufakat (Islah). Jika tidak tercapai kesepakatan, maka sengketa diselesaikan melalui Badan Arbitrase Syariah Nasional (Basyarnas) atau pengadilan agama yang berwenang.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TermsConditionsPage;
