import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Er as FaUsers, Lt as FaChartLine, Pr as useNavigate, Qn as FaShieldAlt, S as Card_default, b as Container, cn as FaEyeSlash, er as FaSignInAlt, g as Form_default, h as InputGroup_default, hr as FaUser, jn as FaLock, l as Row, sn as FaEye, x as Col, xt as FaArrowRight, yn as FaHeadset } from "./vendor-react-D5pUDmay.js";
import { t as motion } from "./vendor-framer-fx3iiH1e.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { n as AUTH_CONSTANTS, t as logger } from "./logger-DtTEP2Aj.js";
import { t as authService } from "./authService-DNRPi6N7.js";
//#region src/features/auth/login/service/loginService.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var LoginService = class {
	/**
	* Login akun menggunakan authService
	* @param {Object} credentials - Data login {emailHp, password}
	* @returns {Promise} Response dari API
	*/
	async login(credentials) {
		return await authService.login(credentials);
	}
	/**
	* Get profile user setelah login
	* @returns {Promise} Response dari API
	*/
	async getProfile() {
		return await authService.getProfile();
	}
	/**
	* Logout user
	*/
	logout() {
		return authService.logout();
	}
};
var loginService = new LoginService();
//#endregion
//#region src/features/auth/login/hooks/useLoginForm.js
var DASHBOARD_PATH = `/${jwtEncode({ page: "dashboard" })}`;
var { ERROR_MESSAGES } = AUTH_CONSTANTS;
var useLoginForm = () => {
	const [emailHp, setEmailHp] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [emailHpInvalid, setEmailHpInvalid] = (0, import_react.useState)(false);
	const [passwordInvalid, setPasswordInvalid] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	/**
	* Validasi format email/phone
	*/
	const validateEmailPhone = (value) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^\d{10,13}$/.test(value.replace(/\D/g, ""));
	};
	/**
	* Reset form fields
	*/
	const resetForm = () => {
		setEmailHp("");
		setPassword("");
		setShowPassword(false);
		setError(null);
		setEmailHpInvalid(false);
		setPasswordInvalid(false);
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		setEmailHpInvalid(false);
		setPasswordInvalid(false);
		const normalizedEmailHp = emailHp.trim();
		const normalizedPassword = password.trim();
		if (!normalizedEmailHp || !normalizedPassword) {
			if (!normalizedEmailHp) setEmailHpInvalid(true);
			if (!normalizedPassword) setPasswordInvalid(true);
			setError(ERROR_MESSAGES.EMAIL_OR_PHONE_REQUIRED);
			return;
		}
		if (!validateEmailPhone(normalizedEmailHp)) {
			setEmailHpInvalid(true);
			setError(ERROR_MESSAGES.EMAIL_OR_PHONE_INVALID);
			return;
		}
		setLoading(true);
		try {
			const response = await loginService.login({
				emailHp: normalizedEmailHp,
				password: normalizedPassword
			});
			if (response.status === 200 && response.data.success) {
				const { token, user } = response.data.data;
				localStorage.setItem("token", token);
				localStorage.setItem("userData", JSON.stringify(user));
				window.dispatchEvent(new Event("storage_sync"));
				resetForm();
				navigate(DASHBOARD_PATH);
				return;
			}
			setError(response.data.message || ERROR_MESSAGES.LOGIN_FAILED);
		} catch (apiError) {
			setError(apiError.response?.data?.message || ERROR_MESSAGES.SERVER_ERROR);
			logger.error("Login error:", apiError);
		} finally {
			setLoading(false);
		}
	};
	return {
		emailHp,
		password,
		showPassword,
		error,
		loading,
		emailHpInvalid,
		passwordInvalid,
		setEmailHp,
		setPassword,
		setShowPassword,
		handleLogin,
		resetForm
	};
};
//#endregion
//#region src/features/auth/login/page/LoginPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var REGISTER_PATH = `/${jwtEncode({ page: "accountRegisterPage" })}`;
var FORGOT_PASSWORD_PATH = `/${jwtEncode({ page: "authForgotPassword" })}`;
function LoginPage() {
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const { emailHp, password, loading, error, emailHpInvalid, passwordInvalid, setEmailHp, setPassword, handleLogin } = useLoginForm();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pbs-login-v2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "pbs-login-topbar",
			id: "header-topbar",
			name: "header-topbar",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				fluid: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pbs-topbar-wrap py-3 d-flex justify-content-between align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pbs-topbar-brand",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `/${jwtEncode({ page: "globalSplash" })}`,
							className: "d-flex align-items-center gap-3 text-decoration-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/icons/PUSlogo.png",
								alt: "PUS Logo",
								className: "pbs-brand-logo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white d-block fs-5 mb-0 pbs-brand-title",
								children: "Paguyuban Usaha Sukses"
							}) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pbs-topbar-login d-flex align-items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "d-none d-sm-inline text-white-50 small",
							children: "Belum punya akun?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: REGISTER_PATH,
							className: "pbs-topbar-register-btn",
							children: "Daftar"
						})]
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "pbs-login-content py-5",
			id: "main-content-area",
			name: "main-content-area",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				fluid: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-5 align-items-stretch justify-content-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 6,
						className: "d-none d-lg-block",
						id: "left-side-info-benefits",
						name: "left-side-info-benefits",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "pbs-login-left-v2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mosque-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pbs-login-info-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "badge rounded-pill bg-success bg-opacity-25 text-success px-3 py-2 mb-3 pbs-login-badge",
												children: "PAGUYUBAN USAHA"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
												className: "display-5 fw-bold text-white mb-3 pbs-login-title",
												children: [
													"Selamat Datang",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													"Kembali di",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "pbs-text-highlight",
														children: "PUS Mobile"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-white-50 pbs-login-desc",
												children: "Kelola usaha, pantau simpanan, dan akses layanan pembiayaan syariah dalam satu genggaman. Bersama membangun ekonomi yang lebih berkah."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center my-5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/assets/images/login_illustration.png",
											alt: "Illustration",
											className: "img-fluid animate-float pbs-login-illustration",
											onError: (e) => {
												e.target.onerror = null;
												e.target.src = "/assets/images/register_illustration.png";
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "d-flex flex-column gap-4",
										children: [
											{
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { size: 22 }),
												title: "Transparan & Aman",
												desc: "Sistem amanah dengan pantauan real-time."
											},
											{
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, { size: 22 }),
												title: "Komunitas Solid",
												desc: "Akses jaringan pengusaha di seluruh Indonesia."
											},
											{
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChartLine, { size: 22 }),
												title: "Pantau Pertumbuhan",
												desc: "Lihat perkembangan saldo dan bagi hasil Anda."
											}
										].map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex align-items-start gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "d-flex align-items-center justify-content-center rounded-3 pbs-benefit-icon-container",
												children: item.icon
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
												className: "text-white fw-bold mb-1",
												children: item.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
												className: "text-white-50 d-block",
												children: item.desc
											})] })]
										}, idx))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-3 bg-white bg-opacity-5 p-4 rounded-4 border border-white border-opacity-10 mt-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-success bg-opacity-20 p-2 rounded-circle d-flex align-items-center justify-content-center pbs-support-icon-container",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHeadset, { className: "pbs-support-icon" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											className: "d-block text-muted",
											children: "Butuh bantuan?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-dark fw-bold small",
											children: "Hubungi kami di 0812-3456-7890"
										})] })]
									})
								]
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 6,
						md: 10,
						xs: 12,
						id: "right-side-login-form",
						name: "right-side-login-form",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .5 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
								className: "pbs-login-card-v2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pbs-login-card-body",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center mb-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle pbs-card-icon-container",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSignInAlt, { size: 30 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "fw-bold text-dark mb-1",
													children: "Masuk ke Akun"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-muted small",
													children: "Silakan masukkan detail akun Anda"
												})
											]
										}),
										error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											initial: {
												opacity: 0,
												x: -20
											},
											animate: {
												opacity: 1,
												x: 0
											},
											className: "alert alert-danger mb-4 p-3 d-flex align-items-center gap-3 border-0 rounded-4 pbs-login-error-alert",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "bg-danger bg-opacity-10 p-2 rounded-circle d-flex align-items-center justify-content-center pbs-login-error-icon-wrap",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "fw-bold",
													children: "!"
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "small fw-semibold",
												children: error
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
											onSubmit: handleLogin,
											noValidate: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
												className: "g-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
														md: 12,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Email atau Nomor WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, {}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																value: emailHp,
																onChange: (e) => setEmailHp(e.target.value),
																isInvalid: emailHpInvalid,
																placeholder: AUTH_CONSTANTS.PLACEHOLDERS.EMAIL_OR_PHONE
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
																type: "invalid",
																children: AUTH_CONSTANTS.ERROR_MESSAGES.EMAIL_OR_PHONE_INVALID
															})
														] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
														md: 12,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "d-flex justify-content-between align-items-center mb-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
																className: "mb-0",
																children: "Password"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																href: FORGOT_PASSWORD_PATH,
																className: "pbs-forgot-link",
																children: "Lupa Password?"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, {}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																value: password,
																onChange: (e) => setPassword(e.target.value),
																isInvalid: passwordInvalid,
																type: showPassword ? "text" : "password",
																placeholder: AUTH_CONSTANTS.PLACEHOLDERS.LOGIN_PASSWORD
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "light",
																className: "border border-start-0 text-muted pbs-password-eye-btn",
																onClick: () => setShowPassword(!showPassword),
																children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEyeSlash, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, {})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
																type: "invalid",
																children: AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED
															})
														] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
														md: 12,
														className: "mt-4 pt-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															type: "submit",
															disabled: loading,
															className: "pbs-submit-v2",
															children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "spinner-border spinner-border-sm",
																role: "status",
																"aria-hidden": "true"
															}), "Memproses..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Masuk Sekarang ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { size: 14 })] })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
														md: 12,
														className: "text-center mt-4 pt-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-muted small",
															children: [
																"Belum memiliki akun anggota?",
																" ",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																	href: REGISTER_PATH,
																	className: "text-decoration-none fw-bold text-primary",
																	children: "Daftar di Sini"
																})
															]
														})
													})
												]
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
export { LoginPage as default };
