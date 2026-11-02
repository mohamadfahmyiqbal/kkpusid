import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button$1, c as Spinner } from "./vendor-react-D5pUDmay.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var Button = ({ variant = "primary", isLoading = false, loadingText = "Memproses...", className = "", children, disabled, ...props }) => {
	let customClass = "";
	let bsVariant = variant;
	if (variant === "premium") {
		bsVariant = "light";
		customClass = "premium-btn-hover premium-btn-text fw-bold text-teal shadow-sm border-0";
	} else if (variant === "premium-outline") {
		bsVariant = "outline-light";
		customClass = "premium-btn-hover premium-btn-text fw-bold shadow-sm btn-pencairan";
	} else if (variant === "form") {
		bsVariant = "primary";
		customClass = "btn-submit-premium shadow-md border-0 fw-bold";
	}
	const finalClassName = `${customClass} ${className}`.trim();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
		variant: bsVariant,
		className: finalClassName,
		disabled: isLoading || disabled,
		...props,
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			as: "span",
			animation: "border",
			size: "sm",
			role: "status",
			"aria-hidden": "true",
			className: "me-2"
		}), loadingText] }) : children
	});
};
//#endregion
export { Button as t };
