// pages/program/ProgramPage.jsx (Kode Final)

import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../../components/layout/DashboardLayout';
// Import komponen dari folder components/program/
import ProgramAccountCard from '../../components/program/ProgramAccountCard';
import ProgramStatusCard from '../../components/program/ProgramStatusCard';
import ProgramTabMenu from '../../components/program/ProgramTabMenu';
import { jwtEncode } from '../../routes/helpers'; // Digunakan untuk navigasi

// --- DATA MOCKUP ---
const MOCK_ACCOUNT_DATA = {
 nama: "Budi Santoso",
 produk: "Pinjaman Lunak",
 akad: "Qardh",
 tanggalBuka: "01 Februari 2023",
 saldoAkhir: "Rp 1.000.000",
};

const PROGRAM_OPTIONS = [
 { label: 'Pinjaman Lunak', key: 'pinjaman' },
 { label: 'Arisan', key: 'arisan' },
];

export default function ProgramPage() {
 const navigate = useNavigate();

 // State default adalah Pinjaman Lunak
 const [activeTab, setActiveTab] = useState('pinjaman');
 // STATE KONDISIONAL: Ganti 'true' (OK) atau 'false' (NG)
 const [hasAccountData] = useState(true);

 // Handlers Navigasi Pinjaman
 const handlePengajuan = useCallback(() => {
  const token = jwtEncode({ page: "formPengajuanPinjaman" });
  navigate(`/${token}`);
 }, [navigate]);

 const handleSetoran = useCallback(() => {
  const token = jwtEncode({ page: "billingPage" });
  navigate(`/${token}`);
 }, [navigate]);

 // Handler Tab Menu yang memicu Navigasi JWT
 const handleTabChange = useCallback((key) => {
  setActiveTab(key);

  // Tentukan kunci halaman tujuan
  const targetPageKey = key === 'arisan' ? 'arisanPage' : 'programPage';

  // Lakukan navigasi berbasis JWT
  const token = jwtEncode({ page: targetPageKey });
  navigate(`/${token}`);

 }, [navigate]);

 // Fungsi untuk merender konten spesifik Pinjaman
 const renderContent = () => {
  if (activeTab === 'pinjaman') {
   if (hasAccountData) {
    // Status OK (Pinjaman Aktif)
    return (
     <ProgramAccountCard
      accountData={MOCK_ACCOUNT_DATA}
      handleSetoran={handleSetoran}
      handlePengajuan={handlePengajuan}
     />
    );
   } else {
    // Status NG (Belum Ada Pinjaman Aktif)
    return (
     <ProgramStatusCard
      title="Informasi Rekening"
      message="Anda belum memiliki transaksi pinjaman yang aktif."
      buttonText="Pengajuan Pinjaman Baru"
      onButtonClick={handlePengajuan}
     />
    );
   }
  }

  // Konten Arisan: Hanya placeholder, karena navigasi JWT akan memindahkan ke ArisanPage.jsx
  return (
   <Card className="shadow-lg p-5 text-center border-0">
    <Card.Body><p className="text-muted mb-0">Memuat konten Arisan...</p></Card.Body>
   </Card>
  );
 };

 return (
  <DashboardLayout title="Program">
   <div className="row page-titles pt-3">
    <div className="col-12 align-self-center">
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Program</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>
      <ProgramTabMenu
       options={PROGRAM_OPTIONS}
       activeKey={activeTab}
       onChange={handleTabChange}
      />
      {renderContent()}
     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}