import { t as api } from "./common-qX05v8MF.js";
//#region src/utils/api/UNotification.jsx
var UNotification = class {
	/**
	* Mengambil list notifikasi
	* Mengarah ke: GET /notifikasi/list (via notificationRoute.js)
	*/
	getNotifications(filter = {}) {
		return api.get("/notifikasi/list", { params: filter });
	}
	/**
	* Update status baca (SENT -> READ)
	* Mengarah ke: POST /notifikasi/update-status
	*/
	markAsRead(idNotifikasi) {
		const payload = { id: Array.isArray(idNotifikasi) ? idNotifikasi : [idNotifikasi] };
		return api.post("/notifikasi/update-status", payload);
	}
	/**
	* Mengambil kunci VAPID publik dari backend
	*/
	getVapidPublicKey() {
		return api.get("/push/vapid-public-key");
	}
	/**
	* Registrasi Web-Push (Opsional jika controller tersedia)
	*/
	async subscribePush(subscription, memberId) {
		const payload = {
			member_id: memberId,
			subscription: {
				endpoint: subscription.endpoint,
				keys: {
					p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey("p256dh")))),
					auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey("auth"))))
				}
			}
		};
		return api.post("/push/subscribe", payload);
	}
};
var uNotification = new UNotification();
//#endregion
export { uNotification as t };
