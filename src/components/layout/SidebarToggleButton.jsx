import { FaBars, FaTimes } from "react-icons/fa";

export default function SidebarToggleButton({ sidebarShown, onClick }) {
  // Catatan: Class d-md-none memastikan tombol ini hanya terlihat pada layar mobile.

  return (
    <button
      className="
        nav-link
        nav-toggler 
        d-block 
        d-md-none 
        text-white 
        waves-effect waves-dark btn btn-link p-0"
      type="button"
      onClick={onClick}
      aria-label="Toggle sidebar"
    >
      {/* Jika sidebarShown true, tampilkan ikon X (tutup), jika tidak tampilkan ikon Menu (hamburger) */}
      {sidebarShown ? <FaTimes size={20} /> : <FaBars size={20} />}
    </button>
  );
}
