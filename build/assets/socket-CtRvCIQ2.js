import { _t as lookup } from "./vendor-rpDlma0K.js";
//#region src/utils/socket.js
var SOCKET_URL = "https://api.kkpus.id";
var socket = null;
/**
* Inisialisasi koneksi socket dengan token autentikasi
* @param {string} token - JWT token untuk autentikasi
* @returns {Socket} instance socket.io
*/
var initSocket = (token) => {
	if (socket && socket.connected) return socket;
	socket = lookup(SOCKET_URL, {
		auth: { token },
		transports: ["websocket", "polling"],
		timeout: 2e4
	});
	socket.on("connect", () => {});
	socket.on("disconnect", (reason) => {});
	socket.on("connect_error", (error) => {
		console.error("❌ Error koneksi socket:", error.message);
	});
	return socket;
};
/**
* Mendapatkan instance socket saat ini
* @returns {Socket|null}
*/
var getSocket = () => socket;
/**
* Memutus koneksi socket
*/
var disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};
/**
* Register member ke socket server untuk menerima pesan personal
* @param {string|number} memberId - ID member
*/
var registerMember = (memberId) => {
	if (socket && memberId) socket.emit("register", memberId);
};
//#endregion
export { registerMember as i, getSocket as n, initSocket as r, disconnectSocket as t };
