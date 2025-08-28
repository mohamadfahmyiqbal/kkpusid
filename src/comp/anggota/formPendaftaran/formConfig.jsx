export const STEP_CONFIGS = [
  {
    title: "Pilih Jenis Anggota",
    fields: [
      {
        label: "Jenis Anggota",
        name: "jenis_anggota",
        as: "select",
        options: [
          { value: "", label: "-- Pilih Jenis Anggota --" },
          { value: "luar_biasa", label: "Anggota Luar Biasa" },
          { value: "reguler", label: "Anggota Reguler" },
        ],
        required: true,
      },
    ],
  },
  {
    title: "Personal Info",
    fields: [
      {
        label: "Nomor Induk Kependudukan",
        name: "nik",
        type: "text",
        required: true,
      },
      { label: "Nama", name: "nama", type: "text", required: true },
      {
        label: "Nomor Handphone",
        name: "no_tlp",
        type: "text",
        required: true,
      },
      { label: "Email", name: "email", type: "email", required: true },
      {
        label: "Alamat Tempat Tinggal Saat Ini",
        name: "alamat",
        as: "textarea",
        rows: 3,
        required: true,
      },
      { label: "No Telepon 2", name: "no_tlp2", type: "number" required: true 
      },
      {
        label: "Foto KTP",
        name: "ktp",
        type: "file",
        accept: "image/*",
        required: true,
      },
    ],
  },
  {
    title: "Job Info",
    fields: [
      { label: "Pekerjaan", name: "pekerjaan", type: "text", required: true },
      {
        label: "Tempat Kerja",
        name: "tempat_kerja",
        type: "text",
        required: true,
      },
      {
        label: "Alamat Tempat Kerja",
        name: "alamat_kerja",
        as: "textarea",
        rows: 3,
        required: true,
      },
    ],
  },
  {
    title: "Bank Info",
    fields: [
      { label: "Bank", name: "bank", type: "text", required: true },
      {
        label: "No Rekening",
        name: "no_rekening",
        type: "text",
        required: true,
      },
      {
        label: "Nama Nasabah",
        name: "nama_nasabah",
        type: "text",
        required: true,
      },
    ],
  },
  { title: "Ambil Foto", fields: [] },
  { title: "Summary", fields: [] },
];
