import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Ut as FaChevronLeft, Wt as FaChevronRight } from "./vendor-react-D5pUDmay.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
	if (totalPages <= 1 && totalItems === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex justify-content-between align-items-center mt-3 pt-3 border-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
			className: "text-muted",
			children: [
				"Menampilkan ",
				totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1,
				" - ",
				Math.min(currentPage * itemsPerPage, totalItems),
				" dari ",
				totalItems,
				" data"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex gap-2 align-items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-secondary",
					size: "sm",
					onClick: () => onPageChange(Math.max(1, currentPage - 1)),
					disabled: currentPage === 1,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronLeft, {
						className: "me-1",
						size: 10
					}), " Sebelumnya"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted small px-2",
					children: [
						"Halaman ",
						currentPage,
						" dari ",
						Math.max(1, totalPages)
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-primary",
					size: "sm",
					onClick: () => onPageChange(Math.min(totalPages, currentPage + 1)),
					disabled: currentPage === totalPages || totalPages === 0,
					children: ["Selanjutnya ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, {
						className: "ms-1",
						size: 10
					})]
				})
			]
		})]
	});
};
//#endregion
export { Pagination as t };
