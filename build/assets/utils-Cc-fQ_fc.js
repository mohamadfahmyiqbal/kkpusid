//#region src/pages/global/BillingPage/components/utils.js
/**
* Format angka ke format ribuan Indonesia (10.000)
*/
var formatRupiah = (value) => {
	if (!value) return "";
	const split = value.toString().replace(/[^,\d]/g, "").split(",");
	const sisa = split[0].length % 3;
	let rupiah = split[0].substr(0, sisa);
	const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
	if (ribuan) rupiah += (sisa ? "." : "") + ribuan.join(".");
	return split[1] !== void 0 ? rupiah + "," + split[1] : rupiah;
};
/**
* Format currency to IDR
*/
var formatIDR = (val) => new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	maximumFractionDigits: 0
}).format(Number(val) || 0);
/**
* Format date string to localized Indonesian date
*/
var formatDate = (dateStr, opts = {
	day: "2-digit",
	month: "short",
	year: "numeric"
}) => dateStr ? new Date(dateStr).toLocaleDateString("id-ID", opts) : "-";
/**
* Get number of days until a due date (negative = overdue)
*/
var getDaysUntilDue = (dueDate) => {
	if (!dueDate) return null;
	const diff = new Date(dueDate) - /* @__PURE__ */ new Date();
	return Math.ceil(diff / 864e5);
};
/**
* Generate invoice number: INV/YYYY/XXXXXX
*/
var formatInvoiceNumber = (id, date) => {
	return `INV/${date ? new Date(date).getFullYear() : (/* @__PURE__ */ new Date()).getFullYear()}/${String(id || 0).padStart(6, "0")}`;
};
//#endregion
export { getDaysUntilDue as a, formatRupiah as i, formatIDR as n, formatInvoiceNumber as r, formatDate as t };
