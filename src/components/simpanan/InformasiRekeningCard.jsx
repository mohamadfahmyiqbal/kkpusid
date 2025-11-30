// src/components/simpanan/InformasiRekeningCard.jsx

import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { FaEye, FaUpload, FaDownload } from "react-icons/fa";

// Fungsi pembantu untuk memformat saldo ke IDR
const formatBalance = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

const InformasiRekeningCard = ({ data, handleActionNavigation }) => {
  // Kunci halaman saat ini, digunakan sebagai kunci kembali
  const CURRENT_PAGE_KEY = "simpananPage";

  // --- FUNGSI RENDERING TOMBOL AKSI DINAMIS ---
  const renderActionButtons = () => {
    const type = data.product;
    let buttons = [];

    // Aturan Navigasi:
    if (type === "Simpanan Pokok") {
      // Simpanan Pokok: Tombol Detail (Invoice).
      buttons.push({
        label: "Detail",
        icon: FaEye,
        key: "invoicePage",
        returnKey: CURRENT_PAGE_KEY, // Kunci untuk kembali ke SimpananPage
        variant: "info",
      });
    } else if (type === "Simpanan Wajib") {
      // Simpanan Wajib: Navigasi ke BillingPage, sertakan returnKey dan setoranType
      buttons.push({
        label: "Setoran",
        icon: FaUpload,
        key: "billingPage", // 💡 DIPERBARUI: Arahkan ke BillingPage
        returnKey: CURRENT_PAGE_KEY, // 💡 Kunci untuk kembali ke SimpananPage
        setoranType: type, // 💡 Tipe setoran untuk pre-selection
        variant: "success",
      });
    } else if (type === "Simpanan Sukarela") {
      // Simpanan Sukarela: Setoran & Pencairan
      buttons.push(
        {
          label: "Setoran",
          icon: FaUpload,
          key: "billingPage", // 💡 DIPERBARUI: Arahkan ke BillingPage
          returnKey: CURRENT_PAGE_KEY, // 💡 Kunci untuk kembali ke SimpananPage
          setoranType: type, // 💡 Tipe setoran untuk pre-selection
          variant: "success",
        },
        {
          label: "Pencairan",
          icon: FaDownload,
          key: "penarikanSimpananPage", // <--- Mengarahkan ke page baru
          returnKey: CURRENT_PAGE_KEY, // <--- Penting: Tambahkan ini untuk navigasi kembali
          variant: "danger",
        }
      );
    }

    // --- Layout untuk 1 Tombol ---
    if (buttons.length === 1) {
      const btn = buttons[0];
      const Icon = btn.icon;

      return (
        <div
          className="text-center mt-4"
          // 💡 DIPERBARUI: Panggil dengan 3 argumen (pageKey, returnKey, setoranType)
          onClick={() =>
            handleActionNavigation(btn.key, btn.returnKey, btn.setoranType)
          }
          role="button"
          style={{ cursor: "pointer" }}
        >
          <Icon size={24} className="text-white mb-1" />
          <p className="mb-0" style={{ fontSize: "0.7rem" }}>
            {btn.label}
          </p>
        </div>
      );
    }

    // --- Layout untuk 2 Tombol ---
    else if (buttons.length > 1) {
      return (
        <Row className="mt-4 gx-2">
          {buttons.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <Col key={index}>
                <Button
                  size="sm"
                  variant={btn.variant}
                  // 💡 DIPERBARUI: Panggil dengan 3 argumen (pageKey, returnKey, setoranType)
                  onClick={() =>
                    handleActionNavigation(
                      btn.key,
                      btn.returnKey,
                      btn.setoranType
                    )
                  }
                  className="w-100 fw-bold"
                >
                  <Icon className="me-1" /> {btn.label}
                </Button>
              </Col>
            );
          })}
        </Row>
      );
    }

    return null;
  };
  // --- AKHIR FUNGSI RENDERING TOMBOL AKSI DINAMIS ---

  // Detail Items (KONTEN DIJAGA SAMA)
  const detailItems = [
    { label: "Nama", value: data.nama },
    { label: "Produk", value: data.product },
    { label: "Akad", value: data.akad },
    { label: "Tanggal Buka", value: data.tanggalBuka },
    { label: "Nominal", value: formatBalance(data.nominal) },
    { label: "Saldo Akhir", value: formatBalance(data.saldoAkhir) },
  ];

  return (
    <Card
      className="text-white shadow-sm"
      style={{ backgroundColor: "#005a8d", borderRadius: "5px" }}
    >
      <Card.Body className="p-3">
        <h5 className="text-center mb-4 fw-bold">Informasi Rekening</h5>
        <Container className="p-0">
          {detailItems.map((item, index) => (
            <Row key={index} className="mb-2">
              <Col xs={5}>{item.label}</Col>
              <Col xs={7} className="text-end fw-bold">
                {item.value}
              </Col>
            </Row>
          ))}
        </Container>

        {renderActionButtons()}
      </Card.Body>
    </Card>
  );
};

export default InformasiRekeningCard;
