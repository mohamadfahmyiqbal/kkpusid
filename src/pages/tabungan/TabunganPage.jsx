// pages/tabungan/TabunganPage.jsx

import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../../components/layout/DashboardLayout';
import ProgramStatusCard from '../../components/program/ProgramStatusCard'; // Menggunakan komponen status card yang sudah ada
import { jwtEncode } from '../../routes/helpers';

// --- DATA MOCKUP SUB-MENU TABUNGAN ---
const TABUNGAN_OPTIONS = [
 { label: 'Tabungan Haji', key: 'haji', color: 'primary' },
 { label: 'Tabungan Umrah', key: 'umrah', color: 'secondary' },
 { label: 'Tabungan Pendidikan', key: 'pendidikan', color: 'secondary' },
 { label: 'Tabungan Qurban', key: 'qurban', color: 'secondary' },
];

// --- KOMPONEN PEMBANTU: Menu Tab Vertikal ---
const TabunganMenu = ({ options, activeKey, onChange }) => (
 <div className="d-grid gap-2 mb-4">
  {options.map((option) => (
   <Button
    key={option.key}
    variant={option.key === activeKey ? 'primary' : 'outline-secondary'}
    className={`fw-bold ${option.key === activeKey ? 'bg-primary text-white' : 'text-dark border-secondary'}`}
    onClick={() => onChange(option.key)}
    style={{ 
        height: '50px', 
        borderColor: option.key === activeKey ? '#004d99' : '#ced4da', 
        backgroundColor: option.key === activeKey ? '#004d99' : 'white'
    }}
   >
    {option.label}
   </Button>
  ))}
 </div>
);

export default function TabunganPage() {
 const navigate = useNavigate();
 
 // State default adalah Tabungan Haji
 const [activeProduct, setActiveProduct] = useState('haji');
 // STATE KONDISIONAL: Ganti 'true' (OK) atau 'false' (NG)
 const [hasActiveAccount] = useState(false); // Sesuai Haji_List_NG.png

 // Handler untuk navigasi ke halaman Pengajuan Tabungan Baru
 const handlePengajuan = useCallback(() => {
  // Key navigasi baru: "formPengajuanTabungan"
  const token = jwtEncode({ 
    page: "formPengajuanTabungan", 
    product: activeProduct 
  });
  navigate(`/${token}`);
 }, [navigate, activeProduct]);

 // Handler saat tombol menu tabungan diklik
 const handleProductChange = useCallback((key) => {
  setActiveProduct(key);
  // Logika Tambahan: Di sini Anda bisa memuat data rekening yang berbeda (OK/NG)
  // berdasarkan produk yang dipilih (misal: Cek status rekening Haji vs Umrah)
  console.log(`Produk Tabungan diubah ke: ${key}`);
 }, []);


 // Fungsi untuk merender konten (Hanya Status NG saat ini, sesuai mockup)
 const renderContent = () => {
  // Hanya menampilkan Status NG jika tidak ada rekening aktif
  if (!hasActiveAccount) {
   return (
    <ProgramStatusCard
     title="Informasi Rekening"
     message="Anda belum memiliki transaksi"
     buttonText="Pengajuan"
     onButtonClick={handlePengajuan}
     // Menggunakan warna merah (NG) sesuai mockup
     status="NG" 
    />
   );
  }
  
  // Placeholder untuk Status OK (Jika ada rekening aktif)
  // Di sini akan ada ProgramAccountCard untuk Tabungan
  return (
    <Card className="shadow-lg p-5 text-center border-0">
        <Card.Body><p className="text-muted mb-0">Memuat detail rekening Tabungan {activeProduct}...</p></Card.Body>
    </Card>
  );
 };


 return (
  <DashboardLayout title="Tabungan">
   <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
    <div className="col-12 align-self-center">
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Tabungan</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>
      
      {/* Sub-Menu Tabungan Haji, Umrah, dll. */}
      <TabunganMenu
       options={TABUNGAN_OPTIONS}
       activeKey={activeProduct}
       onChange={handleProductChange}
      />
      
      {/* Konten Status Rekening (NG / OK) */}
      {renderContent()}

     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}