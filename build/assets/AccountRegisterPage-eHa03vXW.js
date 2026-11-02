import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Er as FaUsers, Lt as FaChartLine, Pr as useNavigate, Qn as FaShieldAlt, S as Card_default, Sr as FaUserPlus, b as Container, cn as FaEyeSlash, g as Form_default, h as InputGroup_default, hr as FaUser, jn as FaLock, l as Row, sn as FaEye, tn as FaEnvelope, x as Col, yn as FaHeadset, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as motion } from "./vendor-framer-fx3iiH1e.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as urlBase64ToUint8Array } from "./vapidHelper-DG63SfPf.js";
import { n as AUTH_CONSTANTS, t as logger } from "./logger-DtTEP2Aj.js";
import { t as authService } from "./authService-DNRPi6N7.js";
//#region src/features/auth/hooks/useNotificationPermission.js
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_react = /* @__PURE__ */ __toESM(require_react());
var VAPID_CACHE_KEY = AUTH_CONSTANTS.VAPID_CACHE_KEY;
var VAPID_CACHE_DURATION = AUTH_CONSTANTS.VAPID_CACHE_DURATION_MS;
/**
* Hook untuk mengelola izin notifikasi dan kunci VAPID
* @returns {Object} - { notifPermission, vapidPublicKey }
*/
var useNotificationPermission = () => {
	const [notifPermission, setNotifPermission] = (0, import_react.useState)("default");
	const [vapidPublicKey, setVapidPublicKey] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if ("Notification" in window) setNotifPermission(Notification.permission);
		const getCachedVapidKey = () => {
			try {
				const cached = localStorage.getItem(VAPID_CACHE_KEY);
				if (cached) {
					const { key, timestamp } = JSON.parse(cached);
					if (Date.now() - timestamp < VAPID_CACHE_DURATION) return key;
				}
			} catch (err) {
				logger.warn("Error reading VAPID cache:", err);
			}
			return null;
		};
		const cacheVapidKey = (key) => {
			try {
				const cacheData = {
					key,
					timestamp: Date.now()
				};
				localStorage.setItem(VAPID_CACHE_KEY, JSON.stringify(cacheData));
			} catch (err) {
				logger.warn("Error caching VAPID key:", err);
			}
		};
		const fetchVapidKey = async () => {
			try {
				const cachedKey = getCachedVapidKey();
				if (cachedKey) {
					setVapidPublicKey(cachedKey);
					return;
				}
				const res = await authService.getVapidPublicKey();
				if (res.data?.success) {
					const key = res.data.vapid_public_key;
					setVapidPublicKey(key);
					cacheVapidKey(key);
				} else logger.warn("Gagal mengambil VAPID key:", res.data?.message);
			} catch (err) {
				logger.error("Error fetching VAPID key:", err);
			}
		};
		fetchVapidKey();
	}, []);
	return {
		notifPermission,
		vapidPublicKey
	};
};
//#endregion
//#region src/features/auth/hooks/usePushSubscription.js
/**
* Hook untuk mengelola push subscription
* @param {string} vapidPublicKey - Kunci VAPID publik
* @returns {Function} - Fungsi untuk handle push subscription
*/
var usePushSubscription = (vapidPublicKey) => {
	return (0, import_react.useCallback)(async (memberId) => {
		try {
			if (!("serviceWorker" in navigator) || !vapidPublicKey) {
				logger.warn("Service Worker tidak didukung atau VAPID key belum tersedia");
				return;
			}
			const registration = await navigator.serviceWorker.ready;
			let subscription = await registration.pushManager.getSubscription();
			if (subscription) try {
				if (subscription.expirationTime && Date.now() > subscription.expirationTime) {
					await subscription.unsubscribe();
					subscription = null;
				}
			} catch (err) {
				logger.warn("Existing subscription invalid, creating new one:", err);
				await subscription.unsubscribe();
				subscription = null;
			}
			if (!subscription) subscription = await registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
			});
			await authService.subscribePush(subscription, memberId);
			logger.log("✅ Sinkronisasi push notification berhasil untuk member:", memberId);
		} catch (err) {
			logger.error("⚠️ Gagal sinkronisasi push:", err.message);
		}
	}, [vapidPublicKey]);
};
//#endregion
//#region src/features/auth/hooks/useAccountRegister.js
var LOGIN_PATH$1 = `/${jwtEncode({ page: "authLogin" })}`;
var { PASSWORD_MIN_LENGTH, NAME_MIN_LENGTH, REDIRECT_DELAY_MS, ERROR_MESSAGES, SUCCESS_MESSAGES } = AUTH_CONSTANTS;
/**
* Hook untuk mengelola logika registrasi akun
* @returns {Object} - { formData, loading, notifPermission, handleInputChange, handleRegister, setFormData, errors, setErrors }
*/
var useAccountRegister = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = (0, import_react.useState)({
		nama: "",
		email: "",
		password: "",
		confirmPassword: "",
		agree: true
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { notifPermission, vapidPublicKey } = useNotificationPermission();
	usePushSubscription(vapidPublicKey);
	/**
	* Reset form data
	*/
	const resetForm = () => {
		setFormData({
			nama: "",
			email: "",
			password: "",
			confirmPassword: "",
			agree: true
		});
		setErrors({});
	};
	/**
	* Handler Perubahan Input
	*/
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		let inputValue = type === "checkbox" ? checked : value;
		if (name === "nama" && typeof value === "string") inputValue = value.replace(/[^a-zA-Z\s]/g, "");
		setFormData((prev) => ({
			...prev,
			[name]: inputValue
		}));
		if (errors[name]) setErrors((prev) => ({
			...prev,
			[name]: ""
		}));
	};
	/**
	* Validasi form sederhana
	*/
	const validateForm = () => {
		const newErrors = {};
		const namaVal = (formData.nama || "").trim();
		if (!namaVal) newErrors.nama = ERROR_MESSAGES.NAME_REQUIRED || "Nama lengkap wajib diisi.";
		else if (namaVal.length < NAME_MIN_LENGTH) newErrors.nama = ERROR_MESSAGES.NAME_MIN_LENGTH || `Nama minimal ${NAME_MIN_LENGTH} karakter.`;
		const emailVal = (formData.email || "").trim();
		if (!emailVal) newErrors.email = ERROR_MESSAGES.EMAIL_REQUIRED || "Email wajib diisi.";
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) newErrors.email = ERROR_MESSAGES.EMAIL_INVALID || "Format email tidak valid.";
		const passwordVal = formData.password || "";
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
		if (!passwordVal) newErrors.password = ERROR_MESSAGES.PASSWORD_REQUIRED || "Password wajib diisi.";
		else if (passwordVal.length < PASSWORD_MIN_LENGTH) newErrors.password = ERROR_MESSAGES.PASSWORD_MIN_LENGTH || `Password minimal ${PASSWORD_MIN_LENGTH} karakter.`;
		else if (!passwordRegex.test(passwordVal)) newErrors.password = ERROR_MESSAGES.PASSWORD_STRENGTH || "Password harus mengandung huruf besar, kecil, dan angka.";
		const confirmPasswordVal = formData.confirmPassword || "";
		if (!confirmPasswordVal) newErrors.confirmPassword = "Konfirmasi password wajib diisi.";
		else if (passwordVal !== confirmPasswordVal) newErrors.confirmPassword = "Konfirmasi password tidak cocok.";
		setErrors(newErrors);
		return {
			isValid: Object.keys(newErrors).length === 0,
			errors: newErrors
		};
	};
	/**
	* Handler Registrasi Utama
	*/
	const handleRegister = async (e) => {
		if (e) e.preventDefault();
		const { isValid, errors: valErrors } = validateForm();
		if (!isValid) {
			const firstError = Object.values(valErrors).find(Boolean);
			import_sweetalert2_all.default.fire({
				icon: "error",
				title: "Validasi Gagal",
				text: firstError || "Silakan lengkapi semua data dengan benar.",
				confirmButtonText: "Tutup",
				confirmButtonColor: "#ef4444"
			});
			return;
		}
		setLoading(true);
		try {
			if ((await authService.register({
				full_name: formData.nama.trim(),
				email: formData.email.trim().toLowerCase(),
				password: formData.password
			})).data?.success) import_sweetalert2_all.default.fire({
				icon: "success",
				title: "Registrasi Berhasil!",
				text: SUCCESS_MESSAGES.REGISTER || "Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.",
				confirmButtonText: "Ke Halaman Login",
				confirmButtonColor: "#10b981",
				allowOutsideClick: false
			}).then(() => {
				resetForm();
				navigate(LOGIN_PATH$1);
			});
		} catch (err) {
			const msg = err.response?.data?.message || "Registrasi gagal, silakan coba lagi.";
			import_sweetalert2_all.default.fire({
				icon: "error",
				title: "Registrasi Gagal",
				text: msg,
				confirmButtonText: "Tutup",
				confirmButtonColor: "#ef4444"
			});
		} finally {
			setLoading(false);
		}
	};
	return {
		formData,
		loading,
		notifPermission,
		errors,
		setErrors,
		handleInputChange,
		handleRegister,
		resetForm,
		setFormData
	};
};
//#endregion
//#region src/features/auth/page/AccountRegisterPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;
function RegisterPage() {
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirmPassword, setShowConfirmPassword] = (0, import_react.useState)(false);
	const { formData, loading, errors, handleInputChange, handleRegister } = useAccountRegister();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pbs-register-v2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "pbs-register-topbar",
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
							children: "Sudah punya akun?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: LOGIN_PATH,
							className: "pbs-topbar-login-btn",
							children: "Login"
						})]
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "pbs-register-content py-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				fluid: "lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-5 justify-content-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 5,
						className: "d-none d-lg-block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "pbs-register-left-v2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mosque-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pbs-register-info-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "badge rounded-pill bg-success bg-opacity-25 text-success px-3 py-2 mb-3 pbs-register-badge",
												children: "PAGUYUBAN USAHA"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
												className: "display-5 fw-bold text-white mb-3 pbs-register-title",
												children: [
													"Bergabung Dengan",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													"Paguyuban Usaha",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "pbs-text-highlight",
														children: "Sukses"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-white-50 pbs-register-desc",
												children: "Daftar sekarang dan kembangkan usaha Anda bersama komunitas kami. Nikmati berbagai kemudahan dan dukungan untuk kesuksesan bersama."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center my-5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: "/assets/images/register_illustration.png",
											alt: "Illustration",
											className: "img-fluid animate-float pbs-register-illustration"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "d-flex flex-column gap-4",
										children: [
											{
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { size: 22 }),
												title: "Aman & Terpercaya",
												desc: "Komunitas yang berfokus pada kesuksesan bersama."
											},
											{
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, { size: 22 }),
												title: "Jaringan Luas",
												desc: "Berhubung dengan ribuan pengusaha lainnya."
											},
											{
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChartLine, { size: 22 }),
												title: "Dukungan Usaha",
												desc: "Akses ke sumber daya dan pelatihan bisnis."
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
										className: "d-flex align-items-center gap-3 bg-light p-4 rounded-4 border mt-5 shadow-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-success bg-opacity-10 p-3 rounded-circle d-flex align-items-center justify-content-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHeadset, { className: "text-success fs-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											className: "d-block text-muted",
											children: "Butuh bantuan?"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-success fw-bold small",
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
								className: "pbs-register-card-v2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pbs-register-card-body",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-center mb-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle pbs-card-icon-container",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserPlus, { size: 30 })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "fw-bold text-dark mb-1",
												children: "Buat Akun"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-muted small",
												children: "Mulai perjalanan sukses Anda hari ini"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
										onSubmit: handleRegister,
										noValidate: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
											className: "g-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
													md: 12,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Nama Lengkap" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
														hasValidation: true,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, {}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																name: "nama",
																value: formData.nama || "",
																onChange: handleInputChange,
																isInvalid: !!errors.nama,
																placeholder: "Masukkan nama lengkap Anda"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
																type: "invalid",
																children: errors.nama
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
													md: 12,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Email Aktif" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
														hasValidation: true,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEnvelope, {}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																type: "email",
																name: "email",
																value: formData.email || "",
																onChange: handleInputChange,
																isInvalid: !!errors.email,
																placeholder: "nama@email.com"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
																type: "invalid",
																children: errors.email
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
													md: 12,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
														hasValidation: true,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, {}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																type: showPassword ? "text" : "password",
																name: "password",
																value: formData.password || "",
																onChange: handleInputChange,
																isInvalid: !!errors.password,
																placeholder: "Buat password minimal 8 karakter"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "light",
																className: "border border-start-0 text-muted pbs-password-eye-btn",
																onClick: () => setShowPassword(!showPassword),
																type: "button",
																children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEyeSlash, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, {})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
																type: "invalid",
																children: errors.password
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
													md: 12,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, { children: "Konfirmasi Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
														hasValidation: true,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, {}) }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																type: showConfirmPassword ? "text" : "password",
																name: "confirmPassword",
																value: formData.confirmPassword || "",
																onChange: handleInputChange,
																isInvalid: !!errors.confirmPassword,
																placeholder: "Masukkan kembali password Anda"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
																variant: "light",
																className: "border border-start-0 text-muted pbs-password-eye-btn",
																onClick: () => setShowConfirmPassword(!showConfirmPassword),
																type: "button",
																children: showConfirmPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEyeSlash, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, {})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
																type: "invalid",
																children: errors.confirmPassword
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
													md: 12,
													className: "mt-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														type: "submit",
														disabled: loading,
														className: "pbs-submit-v2 w-100 d-flex align-items-center justify-content-center gap-2",
														children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "spinner-border spinner-border-sm",
															role: "status",
															"aria-hidden": "true"
														}), "Memproses..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Daftar Sekarang ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {})] })
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
													md: 12,
													className: "text-center mt-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-muted pbs-terms-text",
														children: [
															"Dengan mendaftar, Anda telah menyetujui ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																href: "#",
																className: "text-decoration-none",
																children: "Syarat & Ketentuan"
															}),
															" Paguyuban Usaha Sukses."
														]
													})
												})
											]
										})
									})]
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
export { RegisterPage as default };
