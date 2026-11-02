import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Mn as FaMapMarkedAlt, Rn as FaPhoneAlt, b as Container, l as Row, tn as FaEnvelope, x as Col } from "./vendor-react-D5pUDmay.js";
//#region src/pages/global/LandingPage/component/LandingFooter.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LandingFooter = ({ contact = null }) => {
	if (!contact) return null;
	const handlePhoneClick = () => {
		window.location.href = `tel:${contact.phone.replace(/[-\s]/g, "")}`;
	};
	const handleEmailClick = () => {
		window.location.href = `mailto:${contact.email}`;
	};
	const handleMapClick = () => {
		window.open(`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`, "_blank");
	};
	const handleScrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "pbs-footer",
		id: "footer-kontak",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "gy-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						xs: 12,
						md: 6,
						lg: 4,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "text-white",
							children: "Paguyuban Usaha Sukses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Membangun ekonomi umat yang kuat, amanah, dan penuh keberkahan." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						xs: 12,
						md: 6,
						lg: 4,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
								className: "text-white",
								children: "Layanan"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { cursor: "pointer" },
								onClick: () => handleScrollToSection("layanan"),
								children: "Pinjaman Lunak"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { cursor: "pointer" },
								onClick: () => handleScrollToSection("layanan"),
								children: "Pelatihan Usaha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { cursor: "pointer" },
								onClick: () => handleScrollToSection("layanan"),
								children: "Kemitraan Produk"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						xs: 12,
						md: 6,
						lg: 4,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
								className: "text-white",
								children: "Hubungi Kami"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: { cursor: "pointer" },
								onClick: handlePhoneClick,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPhoneAlt, {}),
									" ",
									contact.phone
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: { cursor: "pointer" },
								onClick: handleEmailClick,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, {}),
									" ",
									contact.email
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								style: { cursor: "pointer" },
								onClick: handleMapClick,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMapMarkedAlt, {}),
									" ",
									contact.address
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-light opacity-25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center mb-0",
				children: "© 2025 Paguyuban Usaha Sukses"
			})
		] })
	});
};
var LandingFooter_default = import_react.memo(LandingFooter);
//#endregion
export { LandingFooter_default as default };
