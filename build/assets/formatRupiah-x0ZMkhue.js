//#region src/utils/helper/formatRupiah.js
/**
* Mengubah angka murni menjadi format Rupiah dengan titik ribuan
* Contoh: 50000 -> 50.000
*/
var formatRupiah = (value) => {
	if (value == null || value === void 0 || value === "") return "";
	const split = (typeof value === "number" ? Math.floor(value).toString() : value.toString().split(".")[0]).replace(/[^,\d]/g, "").split(",");
	const sisa = split[0].length % 3;
	let rupiah = split[0].substr(0, sisa);
	const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
	if (ribuan) rupiah += (sisa ? "." : "") + ribuan.join(".");
	return split[1] !== void 0 ? rupiah + "," + split[1] : rupiah;
};
/**
* Mengubah string format Rupiah kembali menjadi angka murni
* Contoh: "50.000" -> "50000"
*/
var parseRawNumber = (rupiahString) => {
	if (!rupiahString) return "";
	return rupiahString.toString().replace(/[^\d]/g, "");
};
//#endregion
export { parseRawNumber as n, formatRupiah as t };
