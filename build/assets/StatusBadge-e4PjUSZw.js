import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge } from "./vendor-react-D5pUDmay.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/**
* Reusable StatusBadge component
* Maps common application statuses to consistent semantic colors and labels.
* 
* @param {string} status - Status code or name (e.g. 'active', 'pending', 'lunas', 'selesai', 'ditolak')
* @param {string} label - Optional explicit label override
* @param {string} size - 'sm' | 'md' | 'lg'
* @param {string} className - Optional additional CSS class
*/
var StatusBadge = ({ status = "", label, size = "md", className = "" }) => {
	const norm = String(status).toLowerCase().trim();
	let bg = "secondary";
	let displayLabel = label || status;
	if ([
		"active",
		"aktif",
		"approved",
		"disetujui",
		"lunas",
		"berhasil",
		"success"
	].includes(norm)) {
		bg = "success";
		if (!label) displayLabel = norm === "lunas" ? "Lunas" : "Aktif";
	} else if ([
		"pending",
		"tertunda",
		"menunggu",
		"waiting",
		"in_progress"
	].includes(norm)) {
		bg = "warning";
		if (!label) displayLabel = "Menunggu";
	} else if ([
		"rejected",
		"ditolak",
		"failed",
		"gagal",
		"inactive",
		"nonaktif",
		"batal"
	].includes(norm)) {
		bg = "danger";
		if (!label) displayLabel = norm === "rejected" || norm === "ditolak" ? "Ditolak" : "Gagal";
	} else if ([
		"processing",
		"diproses",
		"berjalan"
	].includes(norm)) {
		bg = "info";
		if (!label) displayLabel = "Diproses";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		bg,
		className: `fw-semibold rounded-pill align-middle ${size === "sm" ? "px-2 py-1 fs-xs" : size === "lg" ? "px-3 py-2 fs-6" : "px-2.5 py-1.5"} ${className}`,
		style: { letterSpacing: "0.3px" },
		children: displayLabel
	});
};
//#endregion
export { StatusBadge as t };
