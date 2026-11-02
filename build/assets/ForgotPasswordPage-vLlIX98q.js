import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, En as FaKey, Er as FaUsers, In as FaPaperPlane, Lt as FaChartLine, O as Alert_default, Pr as useNavigate, Qn as FaShieldAlt, S as Card_default, _ as FloatingLabel, b as Container, bt as FaArrowLeft, c as Spinner, g as Form_default, l as Row, x as Col, yn as FaHeadset } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as forgotPasswordService } from "./forgotPasswordService-Ck-dGQVz.js";
import { n as AUTH_CONSTANTS, t as logger } from "./logger-DtTEP2Aj.js";
//#region src/features/auth/forgot-password/hooks/useForgotPassword.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var FORGOT_OTP_PATH = `/${jwtEncode({ page: "authForgotOtp" })}`;
var useForgotPassword = () => {
	const [emailHp, setEmailHp] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	/**
	* Validasi format email
	*/
	const validateEmail = (value) => {
		if (!value || value.trim() === "") return false;
		const trimmedValue = value.trim();
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue);
	};
	/**
	* Get specific error message based on error type
	*/
	const getErrorMessage = (error) => {
		if (!error) return null;
		if (error.code === "NETWORK_ERROR" || error.message === "Network Error") return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
		if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) return "Server terlalu lama merespons. Silakan coba lagi.";
		if (error.response) {
			const status = error.response.status;
			const message = error.response.data?.message;
			switch (status) {
				case 400: return message || "Data yang dimasukkan tidak valid.";
				case 404: return "Email tidak terdaftar dalam sistem.";
				case 429: return "Terlalu banyak percobaan. Silakan tunggu beberapa saat.";
				case 500: return "Server sedang bermasalah. Silakan coba lagi nanti.";
				default: return message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR;
			}
		}
		return error.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR;
	};
	/**
	* Reset form fields
	*/
	const resetForm = () => {
		setEmailHp("");
		setError(null);
	};
	/**
	* Handler untuk kirim OTP
	*/
	const handleSendOtp = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const normalizedEmailHp = emailHp.trim();
		if (!normalizedEmailHp) {
			setError("Email wajib diisi.");
			setLoading(false);
			return;
		}
		if (!validateEmail(normalizedEmailHp)) {
			setError("Format email tidak valid.");
			setLoading(false);
			return;
		}
		try {
			const response = await forgotPasswordService.sendOtp({ emailHp: normalizedEmailHp });
			if (response.success) {
				localStorage.setItem("forgotPasswordSession", JSON.stringify({
					emailHp: normalizedEmailHp,
					sessionId: response.data?.sessionId,
					expiresAt: response.data?.expiresAt
				}));
				resetForm();
				navigate(FORGOT_OTP_PATH, { replace: true });
			} else setError(response.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR);
		} catch (err) {
			setError(getErrorMessage(err));
			logger.error("Send OTP error:", err);
		} finally {
			setLoading(false);
		}
	};
	return {
		emailHp,
		error,
		loading,
		setEmailHp,
		handleSendOtp,
		resetForm,
		validateEmail
	};
};
//#endregion
//#region src/features/auth/forgot-password/page/ForgotPasswordPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;
function ForgotPasswordPage() {
	const { emailHp, error, loading, setEmailHp, handleSendOtp } = useForgotPassword();
	const handleInputChange = (e) => {
		setEmailHp(e.target.value);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pbs-register-v2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "pbs-register-topbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				fluid: true,
				className: "px-4 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pbs-topbar-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `/${jwtEncode({ page: "globalSplash" })}`,
							className: "d-flex text-white align-items-center gap-3 text-decoration-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: `/assets/icons/PUSlogo.png`,
								alt: "PBS",
								width: "45",
								height: "45",
								className: "object-fit-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex flex-column text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "fs-5 lh-1 fw-bold",
									children: "Paguyuban Usaha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white-50 small fw-medium",
									style: { letterSpacing: "1px" },
									children: "Sukses"
								})]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white d-none d-md-inline fw-medium",
							children: "Ingat password?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: LOGIN_PATH,
							className: "btn btn-outline-primary px-4 rounded-pill fw-semibold",
							style: { transition: "all 0.3s ease" },
							children: "Masuk"
						})]
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "pbs-register-content",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				fluid: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-0 align-items-stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 5,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "pbs-register-left-v2 h-100 d-flex flex-column justify-content-center p-5 position-relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "z-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "badge bg-white bg-opacity-25 text-white mb-4 px-3 py-2 rounded-pill fw-semibold letter-spacing-1",
										children: "KOPERASI SYARIAH"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "text-white fw-bold display-5 mb-4",
										children: [
											"Lupa",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Password?",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white-50 fs-2 d-block mt-2",
												children: "Jangan Khawatir"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white-50 fs-5 mb-5 lh-lg",
										style: { maxWidth: "400px" },
										children: "Kami akan membantu Anda mereset password. Masukkan email yang terdaftar untuk menerima kode OTP."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pbs-left-illustration mb-5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg",
											style: {
												width: "80px",
												height: "80px",
												fontSize: "2.5rem"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKey, {})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pbs-feature-list bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur shadow-sm border border-white border-opacity-25 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-white fw-semibold mb-4 fs-5",
											children: "Keamanan Akun Anda"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex flex-column gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "d-flex align-items-start gap-3 text-white",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-white bg-opacity-25 p-2 rounded text-white mt-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { size: 18 })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "d-block fw-semibold",
														children: "Verifikasi Aman"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-white-50 small",
														children: "OTP dikirim ke email terdaftar."
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "d-flex align-items-start gap-3 text-white",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-white bg-opacity-25 p-2 rounded text-white mt-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, { size: 18 })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "d-block fw-semibold",
														children: "Privasi Terjaga"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-white-50 small",
														children: "Data Anda aman dan terenkripsi."
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "d-flex align-items-start gap-3 text-white",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-white bg-opacity-25 p-2 rounded text-white mt-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChartLine, { size: 18 })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
														className: "d-block fw-semibold",
														children: "Proses Cepat"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-white-50 small",
														children: "Reset password dalam hitungan menit."
													})] })]
												})
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-3 text-white mt-auto pt-4 border-top border-white border-opacity-25",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white text-primary rounded-circle p-3 shadow-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHeadset, { size: 24 })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "d-block fw-semibold mb-1",
											children: "Butuh bantuan?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex align-items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "fw-bold",
													children: "0812-3456-7890"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white-50 mx-1",
													children: "•"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
													className: "text-white-50",
													children: "info@pbs.co.id"
												})
											]
										})] })]
									})
								]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 7,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "pbs-register-right-v2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
								className: "pbs-register-card-v2 border-0 shadow-lg",
								style: { borderRadius: "1.5rem" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
									className: "p-4 p-md-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pbs-form-icon mb-4 text-primary",
											style: { fontSize: "2rem" },
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKey, {})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "fw-bold mb-2",
											children: "Reset Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted mb-4",
											children: "Masukkan email Anda untuk menerima kode OTP"
										}),
										error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert_default, {
											variant: "danger",
											className: "mb-4 shadow-sm border-0",
											style: { borderRadius: "10px" },
											children: error
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
											onSubmit: handleSendOtp,
											noValidate: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
												className: "g-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
													md: 12,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FloatingLabel, {
														controlId: "floatingInput",
														label: "Email",
														className: "mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
															value: emailHp,
															onChange: handleInputChange,
															isInvalid: !!error,
															placeholder: "Masukkan alamat email Anda",
															type: "email",
															autoFocus: true,
															className: "shadow-none border-secondary-subtle",
															style: { borderRadius: "10px" }
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
															type: "invalid",
															children: error && error.includes("Email") ? error : "Format email tidak valid."
														})]
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
													md: 12,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "submit",
														disabled: loading,
														className: "pbs-submit-v2 w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm",
														style: {
															padding: "14px",
															fontWeight: "600",
															borderRadius: "10px",
															transition: "all 0.3s ease"
														},
														children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
															animation: "border",
															size: "sm"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mengirim OTP..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kirim OTP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPaperPlane, {})] })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-center mt-4 pt-2 border-top",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: LOGIN_PATH,
															className: "text-decoration-none text-muted d-inline-flex align-items-center gap-2 pbs-back-link",
															style: { transition: "color 0.2s" },
															onMouseEnter: (e) => e.currentTarget.className = "text-decoration-none text-primary d-inline-flex align-items-center gap-2",
															onMouseLeave: (e) => e.currentTarget.className = "text-decoration-none text-muted d-inline-flex align-items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kembali ke Login" })]
														})
													})]
												})]
											})
										})
									]
								})
							})
						})
					})]
				})
			})
		})]
	});
}
//#endregion
export { ForgotPasswordPage as default };
