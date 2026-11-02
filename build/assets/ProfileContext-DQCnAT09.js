import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, ht as jwtDecode } from "./vendor-rpDlma0K.js";
import { r as initSocket } from "./socket-CtRvCIQ2.js";
import { t as uBilling } from "./UBilling-DLTCHisI.js";
import { t as uNotification } from "./UNotification-BqEfIC9t.js";
//#region src/components/layout/contexts/ProfileContext.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ProfileContext = (0, import_react.createContext)();
/**
* Normalize notification status from DB string to numeric.
* DB stores: 'unread' | 'sent' | 'read' | 'archived'
* Frontend expects: 1 = unread, 2 = read, 3 = archived
*/
var normalizeNotificationStatus = (status) => {
	if (typeof status === "number") return status;
	return {
		unread: 1,
		sent: 1,
		read: 2,
		archived: 3
	}[status] ?? 1;
};
/** Normalize a single notification object from socket/API to frontend format */
var normalizeNotification = (n) => {
	if (!n || typeof n !== "object") return n;
	return {
		id: n.notification_id || n.id,
		title: n.title,
		body: n.content || n.body,
		sent_at: n.sent_datetime || n.sent_at || (/* @__PURE__ */ new Date()).toISOString(),
		status: normalizeNotificationStatus(n.status),
		type: n.type || "GENERAL",
		url: n.url || "/"
	};
};
var ProfileProvider = ({ children }) => {
	const [userData, setUserData] = (0, import_react.useState)(null);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [bills, setBills] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(() => !!localStorage.getItem("token"));
	const [socketConnected, setSocketConnected] = (0, import_react.useState)(false);
	const socketRef = (0, import_react.useRef)(null);
	const fetchBills = (0, import_react.useCallback)(async () => {
		try {
			const res = await uBilling.getPendingBills();
			if (res?.data?.status && Array.isArray(res.data.data)) {
				setBills(res.data.data);
				return;
			}
			setBills([]);
		} catch {
			setBills([]);
		}
	}, []);
	const fetchNotifications = (0, import_react.useCallback)(async () => {
		if (!localStorage.getItem("token")) return;
		try {
			const res = await uNotification.getNotifications({ limit: 50 });
			const list = res?.data?.list || res?.data?.data;
			if (Array.isArray(list)) setNotifications(list.map(normalizeNotification));
		} catch (err) {
			console.error("Failed to fetch notifications:", err);
		}
	}, []);
	const markNotificationAsRead = (0, import_react.useCallback)(async (id) => {
		try {
			await uNotification.markAsRead(id);
			setNotifications((prev) => prev.map((n) => (n.id || n.notification_id) === id ? {
				...n,
				status: 2
			} : n));
		} catch (err) {
			console.error("Failed to mark notification as read:", err);
		}
	}, []);
	const connectSocket = (0, import_react.useCallback)(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			setUserData(null);
			setLoading(false);
			return;
		}
		setLoading(true);
		if (socketRef.current?.connected) {
			socketRef.current.emit("profile:request");
			fetchBills();
			fetchNotifications();
			return;
		}
		if (socketRef.current) socketRef.current.disconnect();
		const socket = initSocket(token);
		const registerToSocket = () => {
			try {
				const decoded = jwtDecode(token);
				if (decoded?.member_id) socket.emit("register", decoded.member_id);
			} catch (err) {
				console.error("Gagal register socket:", err);
			}
		};
		const handleConnect = () => {
			setSocketConnected(true);
			registerToSocket();
			socket.emit("profile:request");
			fetchBills();
			fetchNotifications();
		};
		if (socket.connected) handleConnect();
		socket.on("connect", handleConnect);
		socket.on("profile:update", (data) => {
			setUserData(data);
			setLoading(false);
		});
		socket.on("registration:status_update", () => {
			window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
		});
		socket.on("notifications:update", (data) => {
			if (Array.isArray(data)) setNotifications(data.map(normalizeNotification));
			else if (data && typeof data === "object") {
				const normalizedNotif = normalizeNotification(data);
				setNotifications((prev) => {
					const safePrev = Array.isArray(prev) ? prev : [];
					if (safePrev.some((n) => (n.id || n.notification_id) === normalizedNotif.id)) return safePrev;
					return [normalizedNotif, ...safePrev].slice(0, 50);
				});
			}
		});
		socket.on("bills:update", (data) => {
			if (Array.isArray(data)) setBills(data);
			else fetchBills();
			setLoading(false);
		});
		socket.on("new_notification", (data) => {
			if (data.type === "PAYMENT_SUCCESS") window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
			const normalized = normalizeNotification(data);
			setNotifications((prev) => {
				const safePrev = Array.isArray(prev) ? prev : [];
				if (safePrev.some((n) => (n.id || n.notification_id) === normalized.id)) return safePrev;
				return [normalized, ...safePrev].slice(0, 50);
			});
		});
		socket.on("connect_error", () => {
			setSocketConnected(false);
			setLoading(false);
		});
		socket.on("auth:fail", () => {
			localStorage.removeItem("token");
			setUserData(null);
			setLoading(false);
		});
		socketRef.current = socket;
	}, [fetchBills, fetchNotifications]);
	(0, import_react.useEffect)(() => {
		const handleLoginSync = () => {
			setLoading(true);
			setUserData(null);
			connectSocket();
		};
		const handleProfileRefresh = () => {
			setLoading(true);
			if (socketRef.current?.connected) socketRef.current.emit("profile:request");
			fetchBills();
			fetchNotifications();
		};
		window.addEventListener("storage_sync", handleLoginSync);
		window.addEventListener("profileUpdated", handleProfileRefresh);
		window.addEventListener("REFRESH_REGISTRATION_STATUS", handleProfileRefresh);
		connectSocket();
		return () => {
			window.removeEventListener("storage_sync", handleLoginSync);
			window.removeEventListener("profileUpdated", handleProfileRefresh);
			window.removeEventListener("REFRESH_REGISTRATION_STATUS", handleProfileRefresh);
			if (socketRef.current) socketRef.current.disconnect();
		};
	}, [connectSocket, fetchBills]);
	const logout = (0, import_react.useCallback)(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("userData");
		setUserData(null);
		if (socketRef.current) {
			socketRef.current.disconnect();
			socketRef.current = null;
		}
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		userData,
		notifications,
		bills,
		loading,
		logout,
		socketConnected,
		socket: socketRef.current,
		markNotificationAsRead
	}), [
		userData,
		notifications,
		bills,
		loading,
		logout,
		socketConnected,
		markNotificationAsRead
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileContext.Provider, {
		value,
		children
	});
};
var useProfile = () => (0, import_react.useContext)(ProfileContext);
//#endregion
export { useProfile as n, ProfileProvider as t };
