import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { O as Alert_default } from "./vendor-react-D5pUDmay.js";
//#region src/components/ui/SwalAlert.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_jsx_runtime = require_jsx_runtime();
var SwalAlert = ({ variant = "info", children, onClose, dismissible, show = true, asSwal = false, ...props }) => {
	(0, import_react.useEffect)(() => {
		if (!show || !asSwal) return;
		const extractText = (node) => {
			if (typeof node === "string" || typeof node === "number") return String(node);
			if (Array.isArray(node)) return node.map(extractText).join(" ");
			if (node && node.props && node.props.children) return extractText(node.props.children);
			return "";
		};
		let text = extractText(children);
		if (!text && typeof children === "string") text = children;
		if (text) {
			const isError = variant === "danger" || variant === "warning";
			import_sweetalert2_all.default.fire({
				title: isError ? "Perhatian" : "Informasi",
				text,
				icon: {
					danger: "error",
					warning: "warning",
					success: "success",
					info: "info"
				}[variant] || "info",
				confirmButtonText: "Tutup"
			}).then(() => {
				if (onClose) onClose();
			});
		}
	}, [
		children,
		variant,
		onClose,
		show,
		asSwal
	]);
	if (asSwal) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert_default, {
		variant,
		onClose,
		dismissible,
		show,
		...props,
		children
	});
};
SwalAlert.Heading = Alert_default.Heading;
SwalAlert.Link = Alert_default.Link;
//#endregion
export { SwalAlert as t };
