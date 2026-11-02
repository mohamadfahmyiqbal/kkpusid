const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/RegistrationSummary-Rm9gUOQ9.js","assets/rolldown-runtime-Cf1989ZW.js","assets/index-BaUN0sjk.js","assets/vendor-rpDlma0K.js","assets/vendor-react-D5pUDmay.js","assets/vendor-react-DVtug25g.css","assets/vendor-framer-fx3iiH1e.js","assets/ProfileContext-DQCnAT09.js","assets/UBilling-DLTCHisI.js","assets/common-qX05v8MF.js","assets/UNotification-BqEfIC9t.js","assets/socket-CtRvCIQ2.js","assets/index-38XV6del.css","assets/vendor-bootstrap-in4RVF8B.css","assets/ApprovalPlaceholder-BRIHhb7u.js","assets/usePaymentHandler-Dlr6p1nx.js","assets/SocketListener-C630ms4G.js"])))=>i.map(i=>d[i]);
import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { An as FaListAlt, Pr as useNavigate, c as Spinner, fn as FaFileSignature, xt as FaArrowRight, yn as FaHeadset } from "./vendor-react-D5pUDmay.js";
import { a as __vitePreload, s as jwtEncode } from "./index-BaUN0sjk.js";
import NotificationPrompt from "./NotificationPrompt-_svOgTTF.js";
import { t as useRegistrationStatus } from "./useRegistrationStatus-DtKOk69r.js";
import { t as usePaymentHandler } from "./usePaymentHandler-Dlr6p1nx.js";
//#region src/pages/anggota/RegistrationPage/pages/RegistrationPage.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/anggota/RegistrationPage/pages/RegistrationPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var RegistrationSummary = (0, import_react.lazy)(() => __vitePreload(() => import("./RegistrationSummary-Rm9gUOQ9.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])));
var REQUIREMENTS = [
	"Warga Negara Indonesia",
	"Melengkapi Dokumen Permohonan menjadi Anggota Koperasi",
	"Melunasi kewajiban Anggota yang ditentukan pada Anggaran Dasar / Anggaran Dasar Rumah Tangga"
];
var CLEAN_BASE_URL = "https://api.kkpus.id/api".replace(/\/api$/, "") + "/";
var SUSPENSE_FALLBACK = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "text-center p-5",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { animation: "border" })
});
var RegistrationPage = () => {
	const navigate = useNavigate();
	const { isRegistered, registrationData, loading } = useRegistrationStatus();
	const { paymentSuccess, resetPaymentState } = usePaymentHandler();
	(0, import_react.useEffect)(() => {
		if (paymentSuccess) {
			const timer = setTimeout(() => resetPaymentState(), 3e3);
			return () => clearTimeout(timer);
		}
	}, [paymentSuccess, resetPaymentState]);
	const handleBackToDashboard = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "dashboard" })}`);
	}, [navigate]);
	const handleFillForm = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "registrationFormDetail" })}`);
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex justify-content-center align-items-center rp-loading-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "grow",
			variant: "primary"
		})
	});
	if (isRegistered && registrationData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
		fallback: SUSPENSE_FALLBACK,
		children: [registrationData.final_status !== "APPROVED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationPrompt, { memberId: registrationData.registration_id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationSummary, {
			data: registrationData,
			onBackToDashboard: handleBackToDashboard,
			baseUrl: CLEAN_BASE_URL
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pb-5 dash-fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rp-wrapper",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rp-section-card mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex align-items-flex-start gap-3 mb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rp-card-icon rp-card-icon-blue",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileSignature, { size: 22 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									className: "fw-bold mb-1 rp-section-title",
									children: "Pendaftaran Anggota"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-0 text-muted rp-section-desc",
									children: "Pendaftaran menjadi calon anggota dapat dilakukan dengan cara mengunjungi kantor layanan terdekat atau secara daring (online) melalui aplikasi ini."
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted mb-4 rp-section-desc rp-section-content",
								children: "Jika anda berminat untuk mendaftar sebagai anggota, silahkan klik tombol di bawah ini."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rp-section-content",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rp-label",
									children: "Permohonan Menjadi Anggota :"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "rp-btn-cta",
									onClick: handleFillForm,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileSignature, { size: 15 }), "Isi Form Permohonan Menjadi Anggota"]
								})]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rp-section-card mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-flex-start gap-3 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rp-card-icon rp-card-icon-teal",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaListAlt, { size: 22 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "fw-bold mb-1 rp-section-title",
								children: "Ketentuan Pendaftaran Anggota"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-0 text-muted rp-section-desc",
								children: "Mengacu pada Peraturan Menteri Koperasi dan Usaha Kecil dan Menengah Republik Indonesia Nomor 10/Per/M.KUKM/IX/2015 syarat untuk menjadi anggota koperasi sebagai berikut :"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rp-section-content",
							children: REQUIREMENTS.map((req, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rp-req-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rp-req-num",
									children: idx + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rp-req-text",
									children: req
								})]
							}, idx))
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rp-bantuan-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rp-bantuan-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHeadset, { size: 20 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold mb-1 rp-bantuan-title",
							children: "Butuh Bantuan?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-0 text-muted rp-bantuan-desc",
							children: [
								"Jika Anda memiliki pertanyaan seputar pendaftaran anggota,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "d-none d-sm-block" }),
								"silakan hubungi tim layanan kami."
							]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "rp-btn-hubungi",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { size: 12 }), "Hubungi Kami"]
					})]
				})
			]
		})
	});
};
var RegistrationPage_default = import_react.memo(RegistrationPage);
//#endregion
export { RegistrationPage_default as default };
