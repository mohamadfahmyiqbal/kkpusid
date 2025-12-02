import React from "react";
import DashboardLayout from "../../../components/dashboard/DashboardLayout";
import { IoChevronForward, IoDocumentTextOutline } from "react-icons/io5";
import {
  MdOutlinePlaylistAddCheck,
  MdOutlineHourglassEmpty,
} from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";

const DashboardContent = () => {
  return (
    <div className="space-y-4">
      {/* 1. Bagian Selamat Datang */}
      <section className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-gray-600">Assalamualaikum</p>
        <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-300 pb-2 inline-block">
          Avhan Hadi Bijaksana
        </h2>
      </section>

      {/* 2. Bagian Daftar Anggota (Warna Biru) */}
      <section className="bg-blue-600 text-white rounded-lg p-4 shadow-md flex items-center justify-between cursor-pointer">
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Silahkan Daftar Anggota
          </h3>
          <p className="text-sm">
            Untuk dapat mengakses keseluruhan fitur. (*Mengaju pada UU No 4
            Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat
            inclusive loop, hanya diperuntukan untuk Anggota Koperasi
          </p>
        </div>
        <IoChevronForward className="text-3xl ml-4 flex-shrink-0" />
      </section>

      {/* 3. Bagian Evaluasi */}
      <section className="bg-white rounded-lg p-4 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
          Evaluasi
        </h3>

        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              Program Wajib
            </span>
            <span className="text-green-600 text-sm font-semibold">Aktif</span>
          </div>

          <p className="text-md font-semibold text-gray-700">QA.EM01</p>
          <p className="text-sm text-gray-600">Pembahasan Akad Jual Beli</p>

          <div className="flex justify-between items-center text-gray-500 text-sm">
            <div className="flex items-center space-x-1 border-r border-gray-200 pr-4">
              <MdOutlinePlaylistAddCheck className="text-lg" />
              <span>15 Soal</span>
            </div>
            <div className="flex items-center space-x-1 pl-4">
              <MdOutlineHourglassEmpty className="text-lg" />
              <span>Jumat, 2 Mei 2025</span>
              <span className="ml-2">30 Menit</span>
            </div>
          </div>

          <div className="flex flex-col space-y-2 pt-2">
            <button className="flex items-center justify-center space-x-2 w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition duration-200">
              <IoDocumentTextOutline className="text-lg" />
              <span>Membaca Materi</span>
            </button>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200">
              Kerjakan
            </button>
          </div>
        </div>
      </section>

      {/* 4. Bagian Artikel */}
      <section className="bg-white rounded-lg p-4 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-2">
          Artikel
        </h3>
        <div className="border border-gray-200 rounded-lg p-4 space-y-3">
          <h4 className="text-md font-semibold text-gray-700">
            Pinjaman Lunak
          </h4>
          <p className="text-sm text-gray-600">
            When you search for free CSS templates, you will notice that
            TemplateMo is one of the best websites.
          </p>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
              <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
              <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            </div>
            <HiOutlineMenu className="text-gray-500 text-xl" />
          </div>
        </div>
      </section>
    </div>
  );
};

// Bungkus konten dashboard dengan layout
const DashboardPage = () => {
  return (
    <DashboardLayout>
      <DashboardContent />
    </DashboardLayout>
  );
};

export default DashboardPage;
