// pages/global/BillingPage.jsx

import React, { useState, useMemo, useCallback } from "react";
import { Button, Card, Form, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// Asumsi jwtEncode ada di sini
import { jwtEncode } from "../../../routes/helpers";
// Impor ikon
import {
  FaMoneyBillWave,
  FaListAlt,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

// Import komponen DashboardLayout
import DashboardLayout from "../../../components/layout/DashboardLayout";

// --- HELPER FUNCTIONS ---
// Helper untuk mendapatkan return key dari token
const getReturnPageKeyFromToken = (token) => {
  if (!token) return "landingPage"; // Default fallback
  try {
    const [, payload] = token.split(".");
    // Logika decode base64url
    const json = decodeURIComponent(
      escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    );
    // Mengambil key 'return' dari payload, atau default ke 'landingPage'
    return JSON.parse(json)?.return ?? "landingPage";
  } catch (err) {
    return "landingPage"; // Fallback jika decode gagal
  }
};

// Helper untuk mendapatkan setoranType dari token
const getSetoranTypeFromToken = (token) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    const json = decodeURIComponent(
      escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    );
    return JSON.parse(json)?.setoranType ?? null;
  } catch (err) {
    return null;
  }
};

// --- DATA MOCKUP TAGIHAN ---
const initialTagihan = [
  {
    id: 101,
    description: "Tagihan Simpanan Pokok periode Maret 2024",
    amount: 200000,
    isSelected: false,
  },
  {
    id: 102,
    description: "Tagihan Simpanan Wajib periode April 2024",
    amount: 500000,
    isSelected: false,
  },
  {
    id: 103,
    description: "Tagihan Iuran Anggota Mei 2024",
    amount: 150000,
    isSelected: false,
  },
  {
    id: 104,
    description: "Tagihan Simpanan Wajib periode Juni 2024",
    amount: 500000,
    isSelected: false,
  },
];

// --- DATA MOCKUP RIWAYAT & INVOICE ---
const riwayatTransaksi = [
  {
    id: 201,
    date: "22-07-2025",
    title: "Pendaftaran Anggota Regular",
    status: "Approved",
    amount: "Rp 0",
  },
  {
    id: 202,
    date: "23-07-2025",
    title: "Setoran Simpanan Pokok",
    status: "Approved",
    amount: "Rp 500.000",
  },
];
const invoiceDetail = {
  /* ... data detail invoice ... */
};

export default function BillingPage() {
  const navigate = useNavigate();
  // Ambil token dari parameter URL
  const { token } = useParams();

  // Decode returnPageKey dan setoranType dari token
  const returnPageKey = useMemo(
    () => getReturnPageKeyFromToken(token),
    [token]
  );
  const setoranType = useMemo(() => getSetoranTypeFromToken(token), [token]);

  // Logika untuk inisialisasi state berdasarkan setoranType
  const initialList = useMemo(() => {
    if (!setoranType) {
      return initialTagihan;
    }

    // Pre-select item yang mengandung setoranType di deskripsi
    return initialTagihan.map((item) => {
      const isMatch = item.description
        .toLowerCase()
        .includes(setoranType.toLowerCase());
      return {
        ...item,
        isSelected: isMatch, // Pre-select the matching item
      };
    });
  }, [setoranType]);

  // State inisialisasi menggunakan initialList yang dinamis
  const [tagihanList, setTagihanList] = useState(initialList);
  const [showModal, setShowModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleCloseModal = () => setShowModal(false);

  // HANDLER NAVIGASI KEMBALI DINAMIS
  const handleBack = useCallback(() => {
    // Menggunakan returnPageKey yang sudah didecode untuk navigasi
    const token = jwtEncode({ page: returnPageKey });
    navigate(`/${token}`);
  }, [navigate, returnPageKey]);

  // Handler untuk mengaktifkan/menonaktifkan tagihan
  const handleCheck = useCallback(
    (id) => {
      setTagihanList(
        tagihanList.map((tagihan) =>
          tagihan.id === id
            ? { ...tagihan, isSelected: !tagihan.isSelected }
            : tagihan
        )
      );
    },
    [tagihanList]
  );

  // 1. HANDLER UNTUK PROSES TAGIHAN (NAVIGASI KE INVOICE PAGE)
  const handleProses = useCallback(() => {
    const selectedItems = tagihanList.filter((t) => t.isSelected);
    if (selectedItems.length > 0) {
      const selectedIds = selectedItems.map((item) => item.id);

      // NAVIGASI KE HALAMAN INVOICE, WAJIB KIRIM KUNCI KEMBALI 'billingPage'
      const token = jwtEncode({
        page: "invoicePage",
        action: "checkout",
        ids: selectedIds,
        return: "billingPage",
      });
      navigate(`/${token}`);

      setSelectedInvoice(null);
      setShowModal(false);
    } else {
      alert("Pilih setidaknya satu tagihan untuk diproses.");
    }
  }, [tagihanList, navigate]);

  // 2. HANDLER UNTUK RIWAYAT (TAMPILKAN MODAL)
  const handleShowDetail = useCallback((transaksi) => {
    // Gunakan data mockup invoiceDetail untuk menampilkan di modal
    setSelectedInvoice(invoiceDetail);
    setShowModal(true);
  }, []);

  // Hitung total tagihan yang dipilih
  const totalDipilih = useMemo(() => {
    return tagihanList
      .filter((t) => t.isSelected)
      .reduce((sum, t) => sum + t.amount, 0);
  }, [tagihanList]);

  // --- Render Component ---
  return (
    <DashboardLayout>
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK DINAMIS */}
      <div className="row page-titles pt-3">
        <div className="col-md-6 col-4 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBack} // Menggunakan handleBack dinamis
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Pusat Tagihan {setoranType ? `(${setoranType})` : ""}
          </h3>
        </div>
        <div className="col-md-6 col-8 align-self-center text-end">
          {/* Breadcrumb atau tombol aksi di sini */}
        </div>
      </div>

      {/* Bagian 1: Tagihan Tertunda (Keranjang) */}
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <FaListAlt className="me-2" /> Tagihan
        </Card.Header>
        <Card.Body>
          <Form>
            {tagihanList.map((tagihan) => (
              <Form.Check
                key={tagihan.id}
                type="checkbox"
                id={`tagihan-${tagihan.id}`}
                label={
                  <div className="d-flex justify-content-between w-100">
                    <span>{tagihan.description}</span>
                    <span className="fw-bold">
                      Rp {tagihan.amount.toLocaleString("id-ID")}
                    </span>
                  </div>
                }
                checked={tagihan.isSelected}
                onChange={() => handleCheck(tagihan.id)}
                className="mb-2"
              />
            ))}
          </Form>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          <div className="fw-bold">
            Total Dipilih: Rp {totalDipilih.toLocaleString("id-ID")}
          </div>
          <Button
            variant="info"
            onClick={handleProses} // Pemicu navigasi ke InvoicePage
            disabled={totalDipilih === 0}
          >
            Proses <FaMoneyBillWave className="ms-1" />
          </Button>
        </Card.Footer>
      </Card>

      {/* Bagian 2: Riwayat Transaksi */}
      <Card>
        <Card.Header className="bg-success text-white">
          <FaCheckCircle className="me-2" /> Riwayat Transaksi
        </Card.Header>
        <Card.Body>
          {riwayatTransaksi.map((transaksi) => (
            <div
              key={transaksi.id}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <div>
                <h6 className="mb-0">{transaksi.title}</h6>
                <small className="text-muted">
                  {transaksi.date} | Status:{" "}
                  <span className="text-success">{transaksi.status}</span>
                </small>
              </div>
              <div className="text-end">
                <span className="fw-bold me-2">{transaksi.amount}</span>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleShowDetail(transaksi)} // Pemicu modal
                >
                  Lihat
                </Button>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* Bagian 3: Modal Invoice/Detail Riwayat */}
      {selectedInvoice && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          {/* ... Konten Modal ... */}
          {/* Menggunakan data dari mock invoiceDetail */}
        </Modal>
      )}
    </DashboardLayout>
  );
}
