import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, sr as FaTimes, wt as FaBell } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { t as urlBase64ToUint8Array } from "./vapidHelper-DG63SfPf.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
//#region src/utils/helper/pushHelper.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var getVapidPublicKey = async () => {
	try {
		const res = await api.get("/push/vapid-public-key");
		if (res.data?.success) return res.data.vapid_public_key;
		else throw new Error("Failed to fetch VAPID key");
	} catch (error) {
		console.error("Error fetching VAPID key:", error);
		throw error;
	}
};
var subscribeUser = async (memberId) => {
	try {
		const registration = await navigator.serviceWorker.ready;
		if (await registration.pushManager.getSubscription()) return;
		const publicKey = await getVapidPublicKey();
		const dataToSend = {
			subscription: await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(publicKey)
			}),
			member_id: memberId,
			device_type: "Web Browser"
		};
		await api.post("/push/subscribe", dataToSend);
	} catch (error) {
		console.error("❌ Gagal Subscribe:", error.message);
	}
};
//#endregion
//#region src/components/ui/NotificationPrompt.jsx
var import_jsx_runtime = require_jsx_runtime();
function NotificationPrompt({ memberId }) {
	const [showPrompt, setShowPrompt] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if ("Notification" in window && "serviceWorker" in navigator && Notification.permission === "default") {
			const timer = setTimeout(() => {
				setShowPrompt(true);
			}, 2e3);
			return () => clearTimeout(timer);
		} else if (Notification.permission === "granted") subscribeUser(memberId);
	}, [memberId]);
	const handleEnable = async () => {
		setShowPrompt(false);
		if (await Notification.requestPermission() === "granted") {
			await subscribeUser(memberId);
			try {
				await api.post("/push/test-push", {
					member_id: memberId,
					title: "Notifikasi Diaktifkan",
					message: "Aktivasi notifikasi real-time berhasil! Anda akan menerima update terkini.",
					url: "/dashboard"
				});
			} catch (error) {
				console.error("❌ [NotificationPrompt] Failed to send test notification:", error);
			}
		}
	};
	if (!showPrompt) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed-bottom p-3 animate__animated animate__slideInUp",
		style: { zIndex: 1050 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
			variant: "primary",
			className: "shadow-lg border-0 rounded-4 d-flex align-items-center justify-content-between mb-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-primary text-white rounded-circle p-2 me-3 d-flex align-items-center justify-content-center",
					style: {
						width: "40px",
						height: "40px"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBell, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold mb-1",
					children: "Aktifkan Notifikasi Real-time"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small mb-0 opacity-75",
					children: "Dapatkan info status persetujuan pendaftaran langsung di perangkat Anda."
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex gap-2 ms-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					size: "sm",
					className: "fw-bold px-4 rounded-pill",
					onClick: handleEnable,
					children: "Aktifkan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "link",
					className: "text-secondary p-0 ms-2",
					onClick: () => setShowPrompt(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimes, {})
				})]
			})]
		})
	});
}
//#endregion
export { NotificationPrompt as default };
