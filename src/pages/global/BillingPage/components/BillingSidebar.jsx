import React, { useMemo } from "react";
import {
  FaPlus,
  FaClock,
  FaShieldAlt,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";

function BillingSidebar({ bankInfo }) {
  const methods = useMemo(() => {
    if (bankInfo) {
      return [
        {
          name: `${bankInfo.bank_name || "Bank"} **** ${(bankInfo.bank_account_no || "0000").slice(-4)}`,
          owner: bankInfo.account_holder || "-",
          logo: (bankInfo.bank_name || "B")[0],
          cls: "bp-bank-bca",
          isPrimary: true,
        },
      ];
    }
    return [
      { name: "Belum ada rekening", owner: "Tambahkan rekening di profil", logo: "?", cls: "bp-bank-bca", isPrimary: false },
    ];
  }, [bankInfo]);

  const infos = [
    { icon: <FaClock size={14} />, title: "Bayar Tepat Waktu", desc: "Hindari keterlambatan dengan membayar sebelum tanggal jatuh tempo." },
    { icon: <FaShieldAlt size={14} />, title: "Transaksi Aman", desc: "Semua pembayaran Anda dijamin aman dan sesuai prinsip syariah." },
    { icon: <FaHeadset size={14} />, title: "Butuh Bantuan?", desc: "Hubungi tim kami jika ada pertanyaan terkait tagihan." },
  ];

  return (
    <>
      <div className="bp-sidebar-card">
        <div className="bp-sidebar-header">Metode Pembayaran</div>
        {methods.map((m, i) => (
          <div className="bp-payment-method" key={i}>
            <div className={`bp-bank-logo ${m.cls}`}>{m.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{m.owner}</div>
            </div>
            {m.isPrimary && <span className="bp-badge-primary-sm">Utama</span>}
          </div>
        ))}
        <button className="bp-add-method">
          <FaPlus size={11} />
          Kelola Rekening
        </button>
      </div>

      <div className="bp-sidebar-card">
        <div className="bp-sidebar-header">Informasi Penting</div>
        {infos.map((info, i) => (
          <div className="bp-info-item" key={i}>
            <div className="bp-info-icon">{info.icon}</div>
            <div>
              <div className="bp-info-title">{info.title}</div>
              <div className="bp-info-desc">{info.desc}</div>
            </div>
          </div>
        ))}
        <a href="tel:+622112345678" className="bp-hubungi-link">
          Hubungi Kami <FaArrowRight size={11} />
        </a>
      </div>
    </>
  );
}

export default React.memo(BillingSidebar);