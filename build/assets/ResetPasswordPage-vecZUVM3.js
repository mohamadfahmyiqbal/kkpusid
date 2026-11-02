import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, En as FaKey, O as Alert_default, Pr as useNavigate, Qn as FaShieldAlt, Rt as FaCheck, S as Card_default, b as Container, bt as FaArrowLeft, c as Spinner, cn as FaEyeSlash, cr as FaTimesCircle, g as Form_default, jn as FaLock, l as Row, sn as FaEye, x as Col, yn as FaHeadset, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as forgotPasswordService } from "./forgotPasswordService-Ck-dGQVz.js";
import { n as AUTH_CONSTANTS, t as logger } from "./logger-DtTEP2Aj.js";
//#region src/features/auth/forgot-password/hooks/useResetPassword.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var LOGIN_PATH$1 = `/${jwtEncode({ page: "authLogin" })}`;
var useResetPassword = () => {
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [resetToken, setResetToken] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		try {
			const tokenData = localStorage.getItem("resetPasswordToken");
			if (tokenData) {
				const parsedToken = JSON.parse(tokenData);
				if (/* @__PURE__ */ new Date() > new Date(parsedToken.expiresAt)) {
					localStorage.removeItem("resetPasswordToken");
					navigate(LOGIN_PATH$1, { replace: true });
					return;
				}
				setResetToken(parsedToken.resetToken);
			} else navigate(LOGIN_PATH$1, { replace: true });
		} catch (err) {
			logger.error("Token loading error:", err);
			navigate(LOGIN_PATH$1, { replace: true });
		}
	}, [navigate]);
	/**
	* Validasi password strength
	*/
	const validatePassword = (password) => {
		const minLength = password.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH;
		const hasLowercase = /[a-z]/.test(password);
		const hasUppercase = /[A-Z]/.test(password);
		const hasNumber = /\d/.test(password);
		const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-~+=/\\\[\]]/.test(password);
		return minLength && hasLowercase && hasUppercase && hasNumber && hasSpecial;
	};
	/**
	* Reset form fields
	*/
	const resetForm = () => {
		setNewPassword("");
		setConfirmPassword("");
		setError(null);
		setSuccess(false);
	};
	/**
	* Handler untuk reset password
	*/
	const handleResetPassword = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		if (!newPassword || !confirmPassword) {
			setError(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_REQUIRED);
			setLoading(false);
			return;
		}
		if (newPassword !== confirmPassword) {
			setError(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_MISMATCH);
			setLoading(false);
			return;
		}
		if (!validatePassword(newPassword)) {
			setError(AUTH_CONSTANTS.ERROR_MESSAGES.PASSWORD_STRENGTH);
			setLoading(false);
			return;
		}
		try {
			const response = await forgotPasswordService.resetPassword({
				resetToken,
				newPassword: newPassword.trim()
			});
			if (response.success) {
				localStorage.removeItem("resetPasswordToken");
				setSuccess(true);
				setTimeout(() => {
					resetForm();
					navigate(LOGIN_PATH$1, { replace: true });
				}, AUTH_CONSTANTS.REDIRECT_DELAY_MS);
			} else setError(response.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR);
		} catch (err) {
			setError(err.response?.data?.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR);
			logger.error("Reset password error:", err);
		} finally {
			setLoading(false);
		}
	};
	return {
		newPassword,
		confirmPassword,
		loading,
		error,
		success,
		setNewPassword,
		setConfirmPassword,
		handleResetPassword,
		resetForm,
		validatePassword
	};
};
//#endregion
//#region src/features/auth/forgot-password/page/ResetPasswordPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;
function ResetPasswordPage() {
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const [passwordStrength, setPasswordStrength] = (0, import_react.useState)(0);
	const { newPassword, confirmPassword, loading, error, success, setNewPassword, setConfirmPassword, handleResetPassword } = useResetPassword();
	const checks = {
		minLength: newPassword.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH,
		hasLower: /[a-z]/.test(newPassword),
		hasUpper: /[A-Z]/.test(newPassword),
		hasNumber: /\d/.test(newPassword),
		hasSpecial: /[!@#$%^&*(),.?":{}|<>_\-~+=/\\\[\]]/.test(newPassword)
	};
	const calculatePasswordStrength = (password) => {
		let strength = 0;
		if (password.length >= AUTH_CONSTANTS.PASSWORD_MIN_LENGTH) strength += 20;
		if (/[a-z]/.test(password)) strength += 20;
		if (/[A-Z]/.test(password)) strength += 20;
		if (/\d/.test(password)) strength += 20;
		if (/[!@#$%^&*(),.?":{}|<>_\-~+=/\\\[\]]/.test(password)) strength += 20;
		return strength;
	};
	const getPasswordStrengthVariant = () => {
		if (passwordStrength <= 40) return "danger";
		if (passwordStrength <= 60) return "warning";
		if (passwordStrength <= 80) return "info";
		return "success";
	};
	const getPasswordStrengthText = () => {
		if (passwordStrength === 0) return "";
		if (passwordStrength <= 40) return "Lemah";
		if (passwordStrength <= 60) return "Cukup";
		if (passwordStrength <= 80) return "Kuat";
		return "Sangat Kuat";
	};
	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setNewPassword(value);
		setPasswordStrength(calculatePasswordStrength(value));
	};
	const handleConfirmChange = (e) => {
		setConfirmPassword(e.target.value);
	};
	const isPasswordValid = checks.minLength && checks.hasLower && checks.hasUpper && checks.hasNumber && checks.hasSpecial;
	const isMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
	const isMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;
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
							children: "Sudah ingat password?"
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
											"Buat Password",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Baru yang",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white-50 fs-2 d-block mt-2",
												children: "Lebih Aman"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white-50 fs-5 mb-5 lh-lg",
										style: { maxWidth: "420px" },
										children: "Perbarui kata sandi akun Anda untuk menjaga kerahasiaan dan keamanan transaksi di portal Paguyuban Usaha Sukses."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "pbs-left-illustration mb-5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center shadow-lg",
											style: {
												width: "80px",
												height: "80px",
												fontSize: "2.3rem"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, {})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pbs-feature-list bg-white bg-opacity-10 p-4 rounded-4 backdrop-blur shadow-sm border border-white border-opacity-25 mb-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-white fw-semibold mb-4 fs-5",
											children: "Standar Keamanan Kata Sandi"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex flex-column gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "d-flex align-items-start gap-3 text-white",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "bg-white bg-opacity-25 p-2 rounded text-white mt-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { size: 18 })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "d-block fw-semibold",
													children: "Enkripsi End-to-End"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white-50 small",
													children: "Kata sandi baru Anda dienkripsi secara penuh."
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "d-flex align-items-start gap-3 text-white",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "bg-white bg-opacity-25 p-2 rounded text-white mt-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaKey, { size: 18 })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "d-block fw-semibold",
													children: "Akses Eksklusif"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white-50 small",
													children: "Hanya Anda yang berhak mengetahui kata sandi akun."
												})] })]
											})]
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
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, {})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "fw-bold mb-2",
											children: "Reset Password"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted mb-4",
											children: "Silakan tentukan kata sandi baru untuk akun Anda."
										}),
										error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert_default, {
											variant: "danger",
											className: "mb-4 shadow-sm border-0 d-flex align-items-center gap-2",
											style: { borderRadius: "10px" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimesCircle, { className: "flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: error })]
										}),
										success && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert_default, {
											variant: "success",
											className: "mb-4 shadow-sm border-0 d-flex align-items-center gap-2",
											style: { borderRadius: "10px" },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "flex-shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [AUTH_CONSTANTS.SUCCESS_MESSAGES.PASSWORD_RESET, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "small text-muted mt-1",
												children: "Mengarahkan Anda ke halaman login..."
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
											onSubmit: handleResetPassword,
											noValidate: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
												className: "g-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
														md: 12,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
																className: "fw-semibold small text-secondary mb-2",
																children: ["Password Baru ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-danger",
																	children: "*"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "position-relative",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																	value: newPassword,
																	onChange: handlePasswordChange,
																	type: showPassword ? "text" : "password",
																	placeholder: AUTH_CONSTANTS.PLACEHOLDERS.NEW_PASSWORD,
																	disabled: loading || success,
																	autoFocus: true,
																	className: "shadow-none border-secondary-subtle pe-5",
																	style: {
																		borderRadius: "10px",
																		minHeight: "48px"
																	}
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	tabIndex: -1,
																	"aria-label": showPassword ? "Sembunyikan password" : "Tampilkan password",
																	onClick: () => setShowPassword(!showPassword),
																	className: "btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted pe-3 text-decoration-none border-0",
																	style: { zIndex: 5 },
																	children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEyeSlash, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, {})
																})]
															}),
															newPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "mt-2 p-3 bg-light rounded-3 border border-light-subtle",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "d-flex justify-content-between align-items-center mb-1",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "small text-muted",
																			children: "Kekuatan Password:"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: `badge bg-${getPasswordStrengthVariant()} text-white fw-semibold`,
																			children: getPasswordStrengthText()
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "progress mb-3",
																		style: {
																			height: "6px",
																			backgroundColor: "#e2e8f0"
																		},
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: `progress-bar bg-${getPasswordStrengthVariant()}`,
																			style: {
																				width: `${passwordStrength}%`,
																				transition: "width 0.3s ease"
																			}
																		})
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "row g-2 small text-muted",
																		children: [
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "col-sm-6 d-flex align-items-center gap-2",
																				children: [checks.minLength ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, { className: "text-success flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "d-inline-block rounded-circle bg-secondary-subtle",
																					style: {
																						width: "8px",
																						height: "8px"
																					}
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: checks.minLength ? "text-success fw-medium" : "",
																					children: "Min. 8 Karakter"
																				})]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "col-sm-6 d-flex align-items-center gap-2",
																				children: [checks.hasUpper ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, { className: "text-success flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "d-inline-block rounded-circle bg-secondary-subtle",
																					style: {
																						width: "8px",
																						height: "8px"
																					}
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: checks.hasUpper ? "text-success fw-medium" : "",
																					children: "Huruf Besar (A-Z)"
																				})]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "col-sm-6 d-flex align-items-center gap-2",
																				children: [checks.hasLower ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, { className: "text-success flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "d-inline-block rounded-circle bg-secondary-subtle",
																					style: {
																						width: "8px",
																						height: "8px"
																					}
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: checks.hasLower ? "text-success fw-medium" : "",
																					children: "Huruf Kecil (a-z)"
																				})]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "col-sm-6 d-flex align-items-center gap-2",
																				children: [checks.hasNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, { className: "text-success flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "d-inline-block rounded-circle bg-secondary-subtle",
																					style: {
																						width: "8px",
																						height: "8px"
																					}
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: checks.hasNumber ? "text-success fw-medium" : "",
																					children: "Angka (0-9)"
																				})]
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "col-sm-12 d-flex align-items-center gap-2",
																				children: [checks.hasSpecial ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, { className: "text-success flex-shrink-0" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "d-inline-block rounded-circle bg-secondary-subtle",
																					style: {
																						width: "8px",
																						height: "8px"
																					}
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: checks.hasSpecial ? "text-success fw-medium" : "",
																					children: "Karakter Khusus / Simbol (@$!%*?&#...)"
																				})]
																			})
																		]
																	})
																]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
														md: 12,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
																className: "fw-semibold small text-secondary mb-2",
																children: [
																	"Konfirmasi Password Baru",
																	" ",
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-danger",
																		children: "*"
																	})
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "position-relative",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
																	value: confirmPassword,
																	onChange: handleConfirmChange,
																	type: showConfirm ? "text" : "password",
																	placeholder: AUTH_CONSTANTS.PLACEHOLDERS.CONFIRM_PASSWORD,
																	disabled: loading || success,
																	isInvalid: isMismatch,
																	isValid: isMatch,
																	className: "shadow-none border-secondary-subtle pe-5",
																	style: {
																		borderRadius: "10px",
																		minHeight: "48px"
																	}
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	tabIndex: -1,
																	"aria-label": showConfirm ? "Sembunyikan konfirmasi password" : "Tampilkan konfirmasi password",
																	onClick: () => setShowConfirm(!showConfirm),
																	className: "btn btn-link position-absolute end-0 top-50 translate-middle-y text-muted pe-3 text-decoration-none border-0",
																	style: { zIndex: 5 },
																	children: showConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEyeSlash, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, {})
																})]
															}),
															confirmPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "mt-2 d-flex align-items-center gap-1 small",
																children: isMatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-success d-inline-flex align-items-center gap-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {}), " Password cocok"]
																}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-danger d-inline-flex align-items-center gap-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimesCircle, {}), " Password belum cocok"]
																})
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
														md: 12,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
															type: "submit",
															disabled: loading || success || !isPasswordValid || !isMatch,
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
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Menyimpan Password..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaLock, { size: 14 })] })
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
export { ResetPasswordPage as default };
