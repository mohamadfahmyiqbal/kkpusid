import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Pr as useNavigate, b as Container } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
//#region src/pages/global/SplashPage/service/splashService.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var DEFAULT_SPLASH_DELAY = 5e3;
var getSplashDelay = (delay) => {
	const parsed = Number(delay);
	return Number.isFinite(parsed) ? Math.max(300, parsed) : DEFAULT_SPLASH_DELAY;
};
var getLandingRoute = () => {
	return `/${jwtEncode({ page: "landingPage" })}`;
};
//#endregion
//#region src/pages/global/SplashPage/hooks/useSplashRedirect.js
var useSplashRedirect = (delay) => {
	const navigate = useNavigate();
	const timeoutRef = (0, import_react.useRef)(null);
	const skip = (0, import_react.useCallback)(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		navigate(getLandingRoute(), { replace: true });
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		const wait = getSplashDelay(delay);
		timeoutRef.current = setTimeout(() => {
			skip();
		}, wait);
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [delay, skip]);
	return { skip };
};
//#endregion
//#region src/pages/global/SplashPage/page/SplashPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var LOADING_MESSAGES = [
	"Memuat pengalaman terbaik...",
	"Menyiapkan antarmuka syariah...",
	"Menghubungkan ke layanan...",
	"Hampir selesai..."
];
/**
* SplashPage - Halaman awal aplikasi Paguyuban Usaha Sukses
*/
function SplashPage({ delay = DEFAULT_SPLASH_DELAY, className = "" }) {
	const [logoError, setLogoError] = (0, import_react.useState)(false);
	const [messageIndex, setMessageIndex] = (0, import_react.useState)(0);
	const { skip } = useSplashRedirect(delay);
	const handleLogoError = (0, import_react.useCallback)(() => {
		setLogoError(true);
	}, []);
	(0, import_react.useEffect)(() => {
		const checkCacheVersion = async () => {
			const currentVersion = import.meta && "1.0.0" || "1.0.0";
			if (localStorage.getItem("app_version") !== currentVersion) {
				localStorage.clear();
				sessionStorage.clear();
				try {
					const cookies = document.cookie.split(";");
					for (let i = 0; i < cookies.length; i++) {
						const cookie = cookies[i];
						const eqPos = cookie.indexOf("=");
						const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
						if (name) {
							document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
							document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
						}
					}
				} catch (e) {
					console.error("Error clearing cookies:", e);
				}
				if ("caches" in window) try {
					const cacheNames = await caches.keys();
					await Promise.all(cacheNames.map((name) => caches.delete(name)));
				} catch (e) {
					console.error("Error clearing caches:", e);
				}
				if ("serviceWorker" in navigator) try {
					const registrations = await navigator.serviceWorker.getRegistrations();
					for (const reg of registrations) await reg.unregister();
				} catch (e) {
					console.error("Error unregistering service workers:", e);
				}
				localStorage.setItem("app_version", currentVersion);
			}
		};
		checkCacheVersion();
	}, []);
	(0, import_react.useEffect)(() => {
		const interval = setInterval(() => {
			setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
		}, 1200);
		return () => clearInterval(interval);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `splashx-screen ${className}`,
		role: "status",
		"aria-live": "polite",
		"aria-label": "Memuat aplikasi Paguyuban Usaha Sukses",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "splashx-stars",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "splashx-noise",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "splashx-orb splashx-orb-left",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "splashx-orb splashx-orb-right",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				className: "splashx-wrap",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "splashx-content text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "splashx-title",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "splashx-title-white d-block",
								children: "Paguyuban Usaha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "splashx-title-green d-block",
								children: "Sukses"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "splashx-subtitle",
							children: [
								"Koperasi & Layanan Pembiayaan",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Usaha Syariah"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "splashx-logo-container",
							children: logoError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "splashx-logo-fallback",
								"aria-label": "Logo PUS",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "splashx-fallback-text",
									children: "PUS"
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/icons/PUSlogo.png",
								alt: "Logo PUS",
								className: "splashx-logo-image",
								loading: "eager",
								fetchpriority: "high",
								onError: handleLogoError
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "splashx-loading-container",
							role: "progressbar",
							"aria-valuetext": "Memuat aplikasi",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "splashx-loading-bar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "splashx-loading-progress",
									"aria-hidden": "true"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "splashx-loading-text",
								children: LOADING_MESSAGES[messageIndex]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "splashx-skip-btn",
							onClick: skip,
							"aria-label": "Lewati halaman pembuka",
							children: "Lewati"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "splashx-copyright",
							children: "© 2025 Paguyuban Usaha Sukses. All rights reserved."
						})
					]
				})
			})
		]
	});
}
var SplashPage_default = import_react.memo(SplashPage);
//#endregion
export { SplashPage_default as default };
