import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Cr as FaUserShield, Tr as FaUserTie, cr as FaTimesCircle, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
require_react();
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_jsx_runtime = require_jsx_runtime();
function ApprovalPlaceholder({ role, isApproved, isRejected, isReadyToPay, note, approverName }) {
	const IconRole = role === "PENGAWAS" || role === "Pengawas" ? FaUserShield : FaUserTie;
	const handleClick = () => {
		let statusText = "Pending";
		let iconType = "info";
		if (isRejected) {
			statusText = "Ditolak";
			iconType = "error";
		} else if (isReadyToPay) {
			statusText = "Siap Bayar";
			iconType = "success";
		} else if (isApproved) {
			statusText = "Selesai";
			iconType = "success";
		}
		import_sweetalert2_all.default.fire({
			title: `Detail Persetujuan - ${role}`,
			html: `
        <div class="text-center" style="font-size: 14px;">
          <p class="mb-2"><strong>Status:</strong> <span class="badge ${isRejected ? "bg-danger" : isApproved || isReadyToPay ? "bg-success" : "bg-secondary"}">${statusText}</span></p>
          ${approverName ? `<p class="mb-2"><strong>Oleh:</strong> ${approverName}</p>` : ""}
          ${note ? `<div class="mt-3 p-3 bg-light rounded text-start"><strong class="d-block mb-1">Catatan:</strong> <span class="fst-italic">"${note}"</span></div>` : "<p class=\"text-muted mt-2\">Tidak ada catatan.</p>"}
        </div>
      `,
			icon: iconType,
			confirmButtonText: "Tutup",
			confirmButtonColor: "#0d9488"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		onClick: handleClick,
		style: { cursor: "pointer" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto rounded-circle d-flex align-items-center justify-content-center position-relative",
				style: {
					width: "65px",
					height: "65px",
					backgroundColor: isRejected ? "#ffebee" : isReadyToPay ? "#e3f2fd" : isApproved ? "#e8f5e9" : "#f8f9fa",
					border: isRejected ? "2px solid #f44336" : isReadyToPay ? "2px solid #2196f3" : isApproved ? "2px solid #28a745" : "2px dashed #dee2e6",
					color: isRejected ? "#f44336" : isReadyToPay ? "#2196f3" : isApproved ? "#28a745" : "#adb5bd",
					transition: "all 0.3s ease"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconRole, { size: 28 }), (isApproved || isReadyToPay || isRejected) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "position-absolute bg-white rounded-circle",
					style: {
						bottom: "-2px",
						right: "-2px",
						lineHeight: 0
					},
					children: isRejected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimesCircle, {
						size: 20,
						className: "text-danger"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
						size: 20,
						className: isReadyToPay ? "text-primary" : "text-success"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
				className: `mt-2 d-block fw-bold text-uppercase`,
				style: {
					fontSize: "10px",
					color: isRejected ? "#f44336" : isReadyToPay ? "#2196f3" : isApproved ? "#28a745" : "#6c757d",
					letterSpacing: "0.5px"
				},
				children: [role, isRejected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "d-block",
					style: { fontSize: "9px" },
					children: "DITOLAK"
				}) : isReadyToPay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "d-block",
					style: { fontSize: "9px" },
					children: "SIAP BAYAR"
				}) : isApproved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "d-block",
					style: { fontSize: "9px" },
					children: "SELESAI"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "d-block",
					style: { fontSize: "9px" },
					children: "PENDING"
				})]
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 text-muted",
				style: {
					fontSize: "10px",
					maxWidth: "120px",
					margin: "0 auto",
					wordWrap: "break-word"
				},
				children: [approverName && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "d-block fw-bold text-dark mb-1",
					style: { fontSize: "9px" },
					children: approverName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "fst-italic",
					children: [
						"\"",
						note,
						"\""
					]
				})]
			})
		]
	});
}
//#endregion
export { ApprovalPlaceholder as t };
