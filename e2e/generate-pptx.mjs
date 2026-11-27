/**
 * Generate PowerPoint presentation untuk Tutorial KKPU ID
 * Menggunakan PptxGenJS + screenshots dari e2e/screenshots/
 */

import PptxGenJS from "pptxgenjs";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOT_DIR = path.join(__dirname, "screenshots");

// ── Theme Colors ──
const PRIMARY = "1A5276";
const SECONDARY = "2980B9";
const ACCENT = "3498DB";
const LIGHT_BG = "EBF5FB";
const WHITE = "FFFFFF";
const DARK = "2C3E50";
const GREEN = "27AE60";
const ORANGE = "E67E22";
const GRAY = "95A5A6";

// ── Helper: add screenshot to slide ──
function addScreenshot(slide, imgPath, x, y, w, h) {
  const fullPath = path.join(SCREENSHOT_DIR, imgPath);
  if (fs.existsSync(fullPath)) {
    slide.addImage({ path: fullPath, x, y, w, h });
    return true;
  }
  console.warn(`[PPTX] Missing: ${imgPath}`);
  return false;
}

// ── Helper: add title bar ──
function addTitleBar(slide, title, subtitle) {
  slide.addShape("rect", {
    x: 0, y: 0, w: 13.333, h: 1.0,
    fill: { color: PRIMARY },
  });
  slide.addText(title, {
    x: 0.5, y: 0.15, w: 12, h: 0.6,
    fontSize: 28, bold: true, color: WHITE,
    fontFace: "Segoe UI",
  });
  if (subtitle) {
    slide.addText(subtitle, {
      x: 0.5, y: 0.65, w: 12, h: 0.3,
      fontSize: 12, color: "AED6F1",
      fontFace: "Segoe UI",
    });
  }
}

// ── Helper: add step box ──
function addStepBox(slide, num, title, desc, x, y, w, h) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: LIGHT_BG },
    line: { color: SECONDARY, width: 2 },
    rectRadius: 0.1,
  });
  slide.addShape("ellipse", {
    x: x + 0.1, y: y + 0.1, w: 0.4, h: 0.4,
    fill: { color: SECONDARY },
  });
  slide.addText(String(num), {
    x: x + 0.1, y: y + 0.1, w: 0.4, h: 0.4,
    fontSize: 14, bold: true, color: WHITE,
    align: "center", valign: "middle",
  });
  slide.addText(title, {
    x: x + 0.6, y: y + 0.1, w: w - 0.7, h: 0.35,
    fontSize: 13, bold: true, color: PRIMARY,
  });
  if (desc) {
    slide.addText(desc, {
      x: x + 0.6, y: y + 0.4, w: w - 0.7, h: h - 0.5,
      fontSize: 10, color: DARK,
    });
  }
}

// ── Helper: add flow diagram as text ──
function addFlowDiagram(slide, lines, x, y, w, h) {
  slide.addShape("roundRect", {
    x, y, w, h,
    fill: { color: "F8F9FA" },
    line: { color: SECONDARY, width: 2 },
    rectRadius: 0.1,
  });
  slide.addText(lines, {
    x: x + 0.2, y: y + 0.15, w: w - 0.4, h: h - 0.3,
    fontSize: 10, color: DARK,
    fontFace: "Consolas",
    valign: "top",
  });
}

// ── Main ──
async function generatePPTX() {
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pptx.author = "KKPU ID";
  pptx.title = "Tutorial Penggunaan KKPU ID";

  // ═══════════════════════════════════════════════════════
  // SLIDE 1: COVER
  // ═══════════════════════════════════════════════════════
  let slide = pptx.addSlide();
  slide.background = { color: PRIMARY };
  slide.addText("📖 Tutorial Penggunaan", {
    x: 0.5, y: 1.5, w: 12, h: 1,
    fontSize: 44, bold: true, color: WHITE,
    align: "center",
  });
  slide.addText("KKPU ID", {
    x: 0.5, y: 2.5, w: 12, h: 1,
    fontSize: 36, bold: true, color: "AED6F1",
    align: "center",
  });
  slide.addText("Panduan Lengkap Alur Pengguna Koperasi Digital", {
    x: 0.5, y: 3.5, w: 12, h: 0.6,
    fontSize: 18, color: "D4E6F1",
    align: "center",
  });
  slide.addShape("rect", {
    x: 3, y: 4.5, w: 7, h: 0.05,
    fill: { color: ACCENT },
  });
  slide.addText("Versi 1.0  |  November 2026  |  Mobile App", {
    x: 0.5, y: 4.8, w: 12, h: 0.5,
    fontSize: 14, color: "AED6F1",
    align: "center",
  });
  slide.addText("205+ E2E Test Screenshots", {
    x: 0.5, y: 5.3, w: 12, h: 0.5,
    fontSize: 14, color: "AED6F1",
    align: "center",
  });

  // ═══════════════════════════════════════════════════════
  // SLIDE 2: TABLE OF CONTENTS
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "📑 Daftar Isi", "Tutorial KKPU ID");
  const tocItems = [
    ["01", "Pendahuluan", "Apa itu KKPU ID"],
    ["02", "Alur Utama", "New & Returning Member"],
    ["03", "Registrasi", "Splash → Landing → Daftar"],
    ["04", "Login", "Email/HP + Password"],
    ["05", "Lupa Password", "OTP & Reset"],
    ["06", "Dashboard", "Calon Anggota & Reguler"],
    ["07", "Form 8-Step", "Data Pribadi → Ringkasan"],
    ["08", "Approval", "Pengawas → Ketua → Bendahara"],
    ["09", "Pembayaran", "Billing & Invoice"],
    ["10", "Simpanan", "Pokok / Wajib / Sukarela"],
    ["11-19", "Modul Lainnya", "Tabungan, Pinjaman, Arisan, dll"],
    ["20", "Tips", "Troubleshooting"],
  ];
  tocItems.forEach((item, i) => {
    const col = i < 6 ? 0 : 1;
    const row = i % 6;
    const x = 0.5 + col * 6.2;
    const y = 1.3 + row * 0.9;
    slide.addShape("roundRect", {
      x, y, w: 5.8, h: 0.75,
      fill: { color: i % 2 === 0 ? LIGHT_BG : WHITE },
      line: { color: "D5DBDB", width: 1 },
      rectRadius: 0.05,
    });
    slide.addText(item[0], {
      x: x + 0.1, y: y + 0.1, w: 0.8, h: 0.5,
      fontSize: 16, bold: true, color: SECONDARY,
      align: "center", valign: "middle",
    });
    slide.addText(item[1], {
      x: x + 1.0, y: y + 0.05, w: 2.5, h: 0.35,
      fontSize: 12, bold: true, color: PRIMARY,
    });
    slide.addText(item[2], {
      x: x + 1.0, y: y + 0.35, w: 4.5, h: 0.3,
      fontSize: 9, color: GRAY,
    });
  });

  // ═══════════════════════════════════════════════════════
  // SLIDE 3: ALUR PENGGUNA BARU
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Alur Pengguna Baru", "New Member Journey");
  addFlowDiagram(slide,
    "Splash (5s) → Landing → Registrasi → Login\n" +
    "     ↓\n" +
    "Dashboard Calon Anggota (status_id=1)\n" +
    "     ↓\n" +
    "Form 8-Step → Kirim Sekarang\n" +
    "     ↓\n" +
    "Approval: Pengawas → Ketua → Bendahara\n" +
    "     ↓\n" +
    "Pembayaran Tagihan (Simpanan Pokok & Wajib)\n" +
    "     ↓\n" +
    "Dashboard Anggota Reguler (status_id=5)\n" +
    "     ↓\n" +
    "Akses Semua Menu (06-15)",
    0.5, 1.3, 6, 5.5
  );
  // Screenshots
  addScreenshot(slide, "01-splash-landing/01-globalSplash-mobile.png", 7, 1.3, 2.8, 5);
  addScreenshot(slide, "01-splash-landing/02-landingpage-mobile.png", 10, 1.3, 2.8, 5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 4: ALUR PENGGUNA LAMA
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Alur Pengguna Lama", "Returning Member Journey");
  addFlowDiagram(slide,
    "Splash (5s) → Landing → Login → Dashboard\n" +
    "     ↓\n" +
    "Langsung Akses Semua Fitur\n" +
    "     ↓\n" +
    "• Simpanan (Pokok/Wajib/Sukarela)\n" +
    "• Tabungan Target\n" +
    "• Pinjaman/Pembiayaan\n" +
    "• Arisan\n" +
    "• Jual Beli\n" +
    "• Investasi\n" +
    "• Training & Evaluasi\n" +
    "• Notifikasi\n" +
    "• Akun & Profil",
    0.5, 1.3, 6, 5.5
  );
  addScreenshot(slide, "03-login/03-login-page-mobile.png", 7, 1.3, 2.8, 5);
  addScreenshot(slide, "05-dashboard/02-fulljourney-regular-member-dashboard-final-mobile.png", 10, 1.3, 2.8, 5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 5: REGISTRASI - SPLASH & LANDING
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Registrasi: Splash → Landing", "Modul 01");
  addStepBox(slide, 1, "Buka Aplikasi", "Splash screen muncul ±5 detik", 0.5, 1.3, 5.5, 1.2);
  addStepBox(slide, 2, "Landing Page", "Baca info, klik 'Daftar Sekarang'", 0.5, 2.7, 5.5, 1.2);
  addScreenshot(slide, "01-splash-landing/01-globalSplash-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "01-splash-landing/02-landingpage-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 6: REGISTRASI - FORM
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Registrasi: Form Awal", "Modul 02");
  addStepBox(slide, 1, "Isi Data", "Nama, email, password, konfirmasi", 0.5, 1.3, 5.5, 1.2);
  addStepBox(slide, 2, "Submit", "Klik submit → SweetAlert konfirmasi", 0.5, 2.7, 5.5, 1.2);
  addStepBox(slide, 3, "Ke Halaman Login", "Klik 'Ke Halaman Login'", 0.5, 4.1, 5.5, 1.2);
  addScreenshot(slide, "02-registrasi/04-register-page-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "02-registrasi/04-register-filled-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 7: LOGIN
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Login & Autentikasi", "Modul 03");
  addStepBox(slide, 1, "Buka Login", "Splash → Landing → Klik 'Masuk'", 0.5, 1.3, 5.5, 1.2);
  addStepBox(slide, 2, "Isi Kredensial", "Email/HP + Password", 0.5, 2.7, 5.5, 1.2);
  addStepBox(slide, 3, "Masuk Sekarang", "Klik 'Masuk Sekarang' → Dashboard", 0.5, 4.1, 5.5, 1.2);
  addScreenshot(slide, "03-login/03-login-page-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "03-login/03-login-success-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 8: LUPA PASSWORD
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Lupa Password & OTP", "Modul 04");
  addFlowDiagram(slide,
    "Login → Lupa Password\n" +
    "  ↓ Masukkan email\n" +
    "  ↓ Kirim OTP (6 digit via email)\n" +
    "  ↓ Masukkan OTP\n" +
    "  ↓ Password Baru + Konfirmasi\n" +
    "  ↓ Submit → Login Baru",
    0.5, 1.3, 5.5, 4
  );
  addScreenshot(slide, "04-lupa-password/04-lupa-password-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "04-lupa-password/04-lupa-password-verified-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 9: DASHBOARD CALON ANGGOTA
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Dashboard Calon Anggota", "Modul 05 — status_id=1");
  addStepBox(slide, 1, "CandidateStepsCard", "4 tahap progres pendaftaran", 0.5, 1.3, 5.5, 1.2);
  addStepBox(slide, 2, "MainMenuSection", "SEMUA MENU DINONAKTIFKAN", 0.5, 2.7, 5.5, 1.2);
  addStepBox(slide, 3, "Lihat Detail", "Tombol → registrationPage", 0.5, 4.1, 5.5, 1.2);
  addScreenshot(slide, "05-dashboard/01-dashboard-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "05-dashboard/01-dashboard-menu-disabled-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 10: FORM 8-STEP
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Formulir Keanggotaan 8 Langkah", "Modul 05 — RegistrationFormDetail");
  const steps = [
    ["1", "Data Pribadi", "NIK, nama, alamat"],
    ["2", "Akun & Kontak", "Tipe anggota"],
    ["3", "Foto KTP", "Webcam"],
    ["4", "Swafoto", "Webcam"],
    ["5", "Pekerjaan", "Perusahaan"],
    ["6", "Kontak Darurat", "Nama, HP"],
    ["7", "Rekening Bank", "Bank, no. rek"],
    ["8", "Ringkasan", "Kirim Sekarang"],
  ];
  steps.forEach((s, i) => {
    const col = i < 4 ? 0 : 1;
    const row = i % 4;
    addStepBox(slide, s[0], s[1], s[2], 0.5 + col * 3.1, 1.3 + row * 1.4, 2.9, 1.2);
  });
  addScreenshot(slide, "02-registrasi/01-reg-step-1-data-pribadi-mobile.png", 7, 1.3, 2.8, 5.5);
  addScreenshot(slide, "02-registrasi/08-reg-step-8-ringkasan-mobile.png", 10, 1.3, 2.8, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 11: APPROVAL CHAIN
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Proses Approval Berjenjang", "Modul 05 — Tahap 3");
  addFlowDiagram(slide,
    "Form 8-Step Disubmit\n" +
    "  ↓\n" +
    "[1] Pengawas APPROVE\n" +
    "  ↓\n" +
    "[2] Ketua APPROVE + Terbitkan Tagihan\n" +
    "  ↓\n" +
    "[3] Anggota Bayar + Upload Bukti\n" +
    "  ↓ PENDING_VERIFICATION\n" +
    "[4] Bendahara APPROVE (Final)\n" +
    "  ↓\n" +
    "Status: Calon Anggota → Anggota Penuh",
    0.5, 1.3, 6, 5
  );
  addScreenshot(slide, "05-dashboard/01-registration-status-mobile.png", 7, 1.3, 2.8, 5.5);
  addScreenshot(slide, "05-dashboard/01-approval-chain-final-approved-mobile.png", 10, 1.3, 2.8, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 12: PEMBAYARAN
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Pembayaran Tagihan", "Modul 05 — Billing Flow");
  addFlowDiagram(slide,
    "RegistrationSummary\n" +
    "  ↓ Klik 'BAYAR SIMPANAN SEKARANG'\n" +
    "BillingPage (BillList)\n" +
    "  ↓ Pilih tagihan → 'Bayar Sekarang'\n" +
    "InvoicePage\n" +
    "  ↓ Upload bukti transfer\n" +
    "  ↓ Kirim Bukti Pembayaran\n" +
    "Status: PENDING_VERIFICATION",
    0.5, 1.3, 6, 4.5
  );
  addScreenshot(slide, "05-dashboard/01-billingflow-billingpage-mobile.png", 7, 1.3, 2.8, 5.5);
  addScreenshot(slide, "05-dashboard/01-fulljourney-invoicepage-loaded-mobile.png", 10, 1.3, 2.8, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 13: SIMPANAN POKOK
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Simpanan Pokok", "Modul 06.1");
  addStepBox(slide, 1, "Halaman Utama", "Tab: Pokok / Wajib / Sukarela", 0.5, 1.3, 5.5, 1.2);
  addStepBox(slide, 2, "Detail Pokok", "Saldo, riwayat, tombol Setor/Tarik", 0.5, 2.7, 5.5, 1.2);
  addStepBox(slide, 3, "Setoran", "Isi nominal → Upload bukti", 0.5, 4.1, 5.5, 1.2);
  addScreenshot(slide, "06-simpanan/simpanan-pokok/01-simpanan-pokok-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "06-simpanan/simpanan-pokok/03-simpanan-pokok-setor-form-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 14: SIMPANAN WAJIB & SUKARELA
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Simpanan Wajib & Sukarela", "Modul 06.2 & 06.3");
  addStepBox(slide, 1, "Simpanan Wajib", "Setoran bulanan 12x, jadwal", 0.5, 1.3, 5.5, 1.5);
  addStepBox(slide, 2, "Simpanan Sukarela", "Setor/tarik kapan saja", 0.5, 3.0, 5.5, 1.5);
  addScreenshot(slide, "06-simpanan/simpanan-wajib/01-simpanan-wajib-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "06-simpanan/simpanan-sukarela/01-simpanan-sukarela-main-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 15: TABUNGAN TARGET
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Tabungan Target", "Modul 07 — Haji/Umrah/Pendidikan/Qurban");
  addStepBox(slide, 1, "Pilih Kategori", "Haji, Umrah, Pendidikan, Qurban", 0.5, 1.3, 5.5, 1.2);
  addStepBox(slide, 2, "Ajukan Tabungan", "Target nominal + iuran bulanan", 0.5, 2.7, 5.5, 1.2);
  addStepBox(slide, 3, "Setoran & Pencairan", "Setor berkala → Cairkan saat 100%", 0.5, 4.1, 5.5, 1.2);
  addScreenshot(slide, "07-tabungan/01-tabungan-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "07-tabungan/02-tabungan-ajuan-form-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 16: PINJAMAN + ARISAN
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Pinjaman & Arisan", "Modul 08 & 09");
  addStepBox(slide, 1, "Pinjaman", "Pilih produk → Ajukan → Isi nominal", 0.5, 1.3, 5.5, 1.5);
  addStepBox(slide, 2, "Arisan", "Pilih arisan → Gabung → Konfirmasi", 0.5, 3.0, 5.5, 1.5);
  addScreenshot(slide, "08-pinjaman/01-pinjaman-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "09-arisan/01-arisan-pengajuan-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 17: JUAL BELI + INVESTASI
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Jual Beli & Investasi", "Modul 10 & 11");
  addStepBox(slide, 1, "Jual Beli", "Ajukan transaksi → Pelunasan → Nota", 0.5, 1.3, 5.5, 1.5);
  addStepBox(slide, 2, "Investasi", "Halal, Sukuk, Pendanaan", 0.5, 3.0, 5.5, 1.5);
  addScreenshot(slide, "10-jual-beli/01-jual-beli-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "11-investasi/01-investasi-main-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 18: TRAINING + NOTIFIKASI
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Training & Notifikasi", "Modul 12 & 13");
  addStepBox(slide, 1, "Training", "Baca materi → Evaluasi → Ranking", 0.5, 1.3, 5.5, 1.5);
  addStepBox(slide, 2, "Notifikasi", "Notifikasi & riwayat transaksi", 0.5, 3.0, 5.5, 1.5);
  addScreenshot(slide, "12-training/01-training-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "13-notifikasi/01-notifikasi-main-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 19: AKUN & LOGOUT
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Akun, Profil & Logout", "Modul 14 & 15");
  addStepBox(slide, 1, "Akun & Profil", "Edit profil, status, resignasi", 0.5, 1.3, 5.5, 1.5);
  addStepBox(slide, 2, "Logout", "Menu → Keluar → Konfirmasi", 0.5, 3.0, 5.5, 1.5);
  addScreenshot(slide, "14-akun-profil/01-akun-profil-main-mobile.png", 6.5, 1.3, 3, 5.5);
  addScreenshot(slide, "15-logout/01-logout-dashboard-mobile.png", 9.8, 1.3, 3, 5.5);

  // ═══════════════════════════════════════════════════════
  // SLIDE 20: TIPS & TROUBLESHOOTING
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Tips & Troubleshooting", "Bantuan Penggunaan");
  const tips = [
    ["Login gagal", "Periksa email/HP & password. Lupa → 'Lupa Password'"],
    ["Menu terkunci", "Status Calon Anggota. Lengkapi form 8-step"],
    ["Foto KTP gagal", "Izinkan kamera. Refresh halaman"],
    ["OTP tidak masuk", "Cek spam. Klik 'Kirim Ulang OTP'"],
    ["Tagihan tidak muncul", "Tunggu approval Ketua"],
    ["Bukti ditolak", "Pastikan jelas & nominal sesuai"],
  ];
  tips.forEach((t, i) => {
    const y = 1.3 + i * 0.85;
    slide.addShape("roundRect", {
      x: 0.5, y, w: 12.3, h: 0.7,
      fill: { color: i % 2 === 0 ? LIGHT_BG : WHITE },
      line: { color: "D5DBDB", width: 1 },
      rectRadius: 0.05,
    });
    slide.addText(`⚠ ${t[0]}`, {
      x: 0.7, y: y + 0.1, w: 3.5, h: 0.5,
      fontSize: 12, bold: true, color: ORANGE,
    });
    slide.addText(t[1], {
      x: 4.3, y: y + 0.1, w: 8, h: 0.5,
      fontSize: 11, color: DARK,
    });
  });

  // ═══════════════════════════════════════════════════════
  // SLIDE 21: STATUS KEANGGOTAAN
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  addTitleBar(slide, "Status Keanggotaan", "Perbedaan Akses Menu");
  const statuses = [
    ["Calon Anggota", "status_id=1", "Menu TERKUNCI", "Hanya dashboard & status", ORANGE],
    ["Anggota Reguler", "status_id=5", "Semua menu UNLOCKED", "Akses fitur 06-15", GREEN],
    ["Anggota Luar Biasa", "—", "Semua menu + fitur tambahan", "Akses penuh", SECONDARY],
  ];
  statuses.forEach((s, i) => {
    const y = 1.5 + i * 1.8;
    slide.addShape("roundRect", {
      x: 0.5, y, w: 12.3, h: 1.5,
      fill: { color: LIGHT_BG },
      line: { color: s[4], width: 3 },
      rectRadius: 0.1,
    });
    slide.addText(s[0], {
      x: 0.8, y: y + 0.15, w: 4, h: 0.5,
      fontSize: 18, bold: true, color: s[4],
    });
    slide.addText(s[1], {
      x: 0.8, y: y + 0.65, w: 3, h: 0.3,
      fontSize: 11, color: GRAY,
    });
    slide.addText(s[2], {
      x: 5, y: y + 0.15, w: 4, h: 0.5,
      fontSize: 14, bold: true, color: DARK,
    });
    slide.addText(s[3], {
      x: 5, y: y + 0.65, w: 7, h: 0.3,
      fontSize: 11, color: GRAY,
    });
  });

  // ═══════════════════════════════════════════════════════
  // SLIDE 22: CLOSING
  // ═══════════════════════════════════════════════════════
  slide = pptx.addSlide();
  slide.background = { color: PRIMARY };
  slide.addText("Terima Kasih", {
    x: 0.5, y: 2, w: 12, h: 1,
    fontSize: 48, bold: true, color: WHITE,
    align: "center",
  });
  slide.addText("KKPU ID — Koperasi Digital", {
    x: 0.5, y: 3.2, w: 12, h: 0.6,
    fontSize: 22, color: "AED6F1",
    align: "center",
  });
  slide.addShape("rect", {
    x: 4, y: 4.2, w: 5, h: 0.05,
    fill: { color: ACCENT },
  });
  slide.addText("Hubungi Kami: WhatsApp 6281234567890", {
    x: 0.5, y: 4.6, w: 12, h: 0.5,
    fontSize: 14, color: "D4E6F1",
    align: "center",
  });
  slide.addText("205+ Screenshots | 18 Modul | E2E Tested", {
    x: 0.5, y: 5.2, w: 12, h: 0.5,
    fontSize: 12, color: "AED6F1",
    align: "center",
  });

  // ── Write file ──
  const outputPath = path.join(__dirname, "TUTORIAL-KKPU-ID.pptx");
  await pptx.writeFile({ fileName: outputPath });
  console.log(`[PPTX] ✅ Generated: ${outputPath}`);
}

generatePPTX().catch((err) => {
  console.error("[PPTX] ❌ Error:", err);
  process.exit(1);
});