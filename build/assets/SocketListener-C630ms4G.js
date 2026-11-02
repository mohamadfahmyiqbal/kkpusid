import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react } from "./vendor-rpDlma0K.js";
import { i as useSocket } from "./index-BaUN0sjk.js";
//#region src/utils/helper/SocketListener.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useSocketListener = (callback) => {
	const { socket } = useSocket();
	(0, import_react.useEffect)(() => {
		if (socket) {
			socket.on("notification", (data) => {});
			const handleUpdate = (data) => {
				if (callback && typeof callback === "function") callback(data);
				if (data.trigger) {}
			};
			socket.on("new_notification", (data) => {
				if (data.type === "PAYMENT_SUCCESS") {
					window.dispatchEvent(new CustomEvent("CLOSE_SNAP_POPUP"));
					window.dispatchEvent(new CustomEvent("REFRESH_REGISTRATION_STATUS"));
					window.dispatchEvent(new CustomEvent("PAYMENT_SUCCESSFUL", { detail: {
						notificationId: data.notification_id,
						amount: data.content?.match(/Rp ([\d,.]+)/)?.[1],
						timestamp: data.sent_datetime
					} }));
				}
				if (callback && typeof callback === "function") callback({
					type: "notification",
					data
				});
			});
			socket.on("member_registration:update", handleUpdate);
			socket.on("members:update", handleUpdate);
			socket.on("financing_applications:update", handleUpdate);
			socket.on("savings:update", handleUpdate);
			socket.on("transactions:update", handleUpdate);
			socket.on("registration:status_update", handleUpdate);
			return () => {
				socket.off("notification");
				socket.off("new_notification");
				socket.off("member_registration:update", handleUpdate);
				socket.off("members:update", handleUpdate);
				socket.off("financing_applications:update", handleUpdate);
				socket.off("savings:update", handleUpdate);
				socket.off("transactions:update", handleUpdate);
				socket.off("registration:status_update", handleUpdate);
			};
		}
	}, [socket, callback]);
};
//#endregion
export { useSocketListener as t };
