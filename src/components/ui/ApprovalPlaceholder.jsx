import {
  FaUserShield,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
  FaCreditCard,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "./ApprovalPlaceholder.css";

export default function ApprovalPlaceholder({
  role,
  isApproved,
  isRejected,
  isReadyToPay,
  note,
  approverName,
}) {
  const IconRole =
    role === "PENGAWAS" || role === "Pengawas" ? FaUserShield : FaUserTie;
  const status = isRejected
    ? { text: "Ditolak", type: "rejected", icon: "error" }
    : isReadyToPay
      ? { text: "Siap bayar", type: "payment", icon: "info" }
      : isApproved
        ? { text: "Selesai", type: "approved", icon: "success" }
        : { text: "Menunggu", type: "pending", icon: "info" };
  const StatusIcon = isRejected
    ? FaTimesCircle
    : isReadyToPay
      ? FaCreditCard
      : FaCheckCircle;

  const handleClick = () => {
    // SweetAlert accepts a DOM element; textContent keeps API values as text.
    const content = document.createElement("div");
    content.className = "approval-placeholder__dialog-content";
    const addField = (label, value) => {
      const paragraph = document.createElement("p");
      const heading = document.createElement("strong");
      heading.textContent = `${label}: `;
      paragraph.append(heading, document.createTextNode(value));
      content.appendChild(paragraph);
    };
    addField("Status", status.text);
    if (approverName) addField("Oleh", String(approverName));
    if (note) {
      addField("Catatan", String(note));
    } else {
      const empty = document.createElement("p");
      empty.textContent = "Tidak ada catatan.";
      content.appendChild(empty);
    }

    Swal.fire({
      titleText: `Detail Persetujuan - ${role}`,
      html: content,
      icon: status.icon,
      confirmButtonText: "Tutup",
      confirmButtonColor: "#0d9488",
      returnFocus: true,
    });
  };

  return (
    <button
      className={`approval-placeholder approval-placeholder--${status.type}`}
      type="button"
      aria-label={`Detail persetujuan ${role}, ${status.text}`}
      onClick={handleClick}
    >
      <span className="approval-placeholder__icon">
        <IconRole size={28} aria-hidden="true" focusable="false" />
        {status.type !== "pending" && (
          <span className="approval-placeholder__status-icon">
            <StatusIcon size={20} aria-hidden="true" focusable="false" />
          </span>
        )}
      </span>
      <span className="approval-placeholder__label">
        <span>{role}</span>
        <span>{status.text}</span>
      </span>
      {note && (
        <span className="approval-placeholder__note">
          {approverName && <strong>{approverName}</strong>}
          <span>&quot;{note}&quot;</span>
        </span>
      )}
    </button>
  );
}
