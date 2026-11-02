import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { c as Spinner, o as Table } from "./vendor-react-D5pUDmay.js";
import { t as Pagination } from "./Pagination-vCZxXKAR.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var DataTable = ({ columns, data, isLoading, emptyState, pagination, onRowClick, hover = true, responsive = true }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "data-table-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: responsive ? "table-responsive" : "",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				hover,
				className: "mb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: columns.map((col, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: col.headerClassName || "",
						children: col.header
					}, index)) })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
					colSpan: columns.length,
					className: "text-center py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
						animation: "border",
						variant: "primary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mt-2 mb-0",
						children: "Memuat data..."
					})]
				}) }) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: columns.length,
					className: "text-center py-5",
					children: emptyState || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted mb-0",
						children: "Tidak ada data ditemukan."
					})
				}) }) : data.map((row, rowIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					onClick: () => onRowClick && onRowClick(row),
					style: { cursor: onRowClick ? "pointer" : "default" },
					className: onRowClick ? "hover-bg-light" : "",
					children: columns.map((col, colIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: col.cellClassName || "",
						children: col.render ? col.render(row, rowIndex) : row[col.accessor]
					}, colIndex))
				}, row.id || rowIndex)) })]
			})
		}), pagination && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
			currentPage: pagination.currentPage,
			totalPages: pagination.totalPages,
			onPageChange: pagination.onPageChange,
			totalItems: pagination.totalItems,
			itemsPerPage: pagination.itemsPerPage
		})]
	});
};
//#endregion
export { DataTable as t };
