import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { c as Spinner } from "./vendor-react-D5pUDmay.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
/**
* Reusable LoadingState component
* @param {string} message - Optional text to display beneath the spinner
* @param {string} size - Spinner size ('sm', 'md', 'lg')
* @param {string} variant - Bootstrap variant color (primary, success, light, etc.)
* @param {string|number} minHeight - Minimum container height (e.g. '200px', '50vh')
* @param {string} className - Additional CSS class names
*/
var LoadingState = ({ message = "Memuat data...", size = "md", variant = "primary", minHeight = "200px", className = "", inline = false }) => {
	if (inline) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `d-inline-flex align-items-center gap-2 ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			size: "sm",
			variant,
			role: "status"
		}), message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: message })]
	});
	const spinnerStyle = size === "lg" ? {
		width: "3rem",
		height: "3rem"
	} : size === "sm" ? {
		width: "1.25rem",
		height: "1.25rem"
	} : {
		width: "2rem",
		height: "2rem"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `d-flex flex-column align-items-center justify-content-center py-4 ${className}`,
		style: { minHeight },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant,
			style: spinnerStyle,
			role: "status"
		}), message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted mb-0 small",
			children: message
		})]
	});
};
//#endregion
export { LoadingState as t };
