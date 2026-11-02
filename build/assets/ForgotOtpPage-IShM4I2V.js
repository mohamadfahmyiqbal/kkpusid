import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, E as Button, Er as FaUsers, Pr as useNavigate, Qn as FaShieldAlt, S as Card_default, ar as FaSyncAlt, b as Container, g as Form_default, l as Row, mn as FaGift, qt as FaClock, x as Col, yn as FaHeadset } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as forgotPasswordService } from "./forgotPasswordService-Ck-dGQVz.js";
import { n as AUTH_CONSTANTS, t as logger } from "./logger-DtTEP2Aj.js";
//#region src/features/auth/forgot-password/hooks/useOtpVerification.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var OTP_CONSTANTS = {
	LENGTH: 6,
	EXPIRY_MINUTES: 10,
	MAX_ATTEMPTS: 3,
	COOLDOWN_SECONDS: 60,
	RESEND_DELAY: 1500
};
var ERROR_TYPES = {
	EXPIRED_OTP: "OTP sudah kadaluarsa. Silakan kirim ulang.",
	INVALID_OTP: "Kode OTP tidak valid. Periksa kembali kode Anda.",
	MAX_ATTEMPTS: "Terlalu banyak percobaan. Silakan kirim ulang OTP.",
	SESSION_EXPIRED: "Session sudah kadaluarsa. Silakan mulai ulang proses."
};
var RESET_PASSWORD_PATH = `/${jwtEncode({ page: "authResetPassword" })}`;
var LOGIN_PATH$1 = `/${jwtEncode({ page: "authLogin" })}`;
var useCountdown = (initialTime, onExpire) => {
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(initialTime);
	const [isExpired, setIsExpired] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (timeLeft <= 0) {
			setIsExpired(true);
			onExpire?.();
			return;
		}
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					setIsExpired(true);
					onExpire?.();
					return 0;
				}
				return prev - 1;
			});
		}, 1e3);
		return () => clearInterval(timer);
	}, [timeLeft, onExpire]);
	return {
		timeLeft,
		formatTime: (0, import_react.useCallback)((seconds) => {
			const mins = Math.floor(seconds / 60);
			const secs = seconds % 60;
			return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		}, []),
		isExpired,
		reset: (0, import_react.useCallback)((newTime) => {
			setTimeLeft(newTime);
			setIsExpired(false);
		}, [])
	};
};
var useOtpVerification = () => {
	const [otpCode, setOtpCode] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [sessionData, setSessionData] = (0, import_react.useState)(null);
	const [resendLoading, setResendLoading] = (0, import_react.useState)(false);
	const [attempts, setAttempts] = (0, import_react.useState)(0);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const [isBlocked, setIsBlocked] = (0, import_react.useState)(false);
	const [blockTimeLeft, setBlockTimeLeft] = (0, import_react.useState)(0);
	const navigate = useNavigate();
	const { timeLeft, formatTime, reset: resetCountdown } = useCountdown(sessionData ? Math.max(0, Math.floor((new Date(sessionData.expiresAt) - /* @__PURE__ */ new Date()) / 1e3)) : OTP_CONSTANTS.EXPIRY_MINUTES * 60, () => {
		localStorage.removeItem("forgotPasswordSession");
		navigate(LOGIN_PATH$1, { replace: true });
	});
	const { timeLeft: blockTime, formatTime: formatBlockTime } = useCountdown(blockTimeLeft, () => {
		setIsBlocked(false);
		setBlockTimeLeft(0);
		setAttempts(0);
	});
	const triggerHaptic = (0, import_react.useCallback)(() => {
		if ("vibrate" in navigator) navigator.vibrate(50);
	}, []);
	const trackOtpAttempt = (0, import_react.useCallback)((result) => {
		if (typeof window !== "undefined" && window.analytics) window.analytics.track("otp_verification_attempt", {
			success: result.success,
			error_type: result.errorType,
			session_id: sessionData?.sessionId,
			attempts: attempts + 1
		});
	}, [sessionData, attempts]);
	const handleVerifyOtp = (0, import_react.useCallback)(async (e) => {
		e.preventDefault();
		if (isBlocked) {
			setError(ERROR_TYPES.MAX_ATTEMPTS);
			return;
		}
		setError(null);
		setLoading(true);
		if (!otpCode.trim()) {
			setError(AUTH_CONSTANTS.ERROR_MESSAGES.OTP_REQUIRED);
			setLoading(false);
			trackOtpAttempt({
				success: false,
				errorType: "empty_otp"
			});
			return;
		}
		if (!validateOtp(otpCode)) {
			setError(AUTH_CONSTANTS.ERROR_MESSAGES.OTP_INVALID);
			setLoading(false);
			trackOtpAttempt({
				success: false,
				errorType: "invalid_format"
			});
			return;
		}
		const newAttempts = attempts + 1;
		setAttempts(newAttempts);
		try {
			const response = await forgotPasswordService.verifyOtp({
				otpCode: otpCode.trim(),
				sessionId: sessionData?.sessionId
			});
			if (response.success) {
				setIsSuccess(true);
				trackOtpAttempt({ success: true });
				localStorage.setItem("resetPasswordToken", JSON.stringify({
					resetToken: response.data?.resetToken,
					expiresAt: response.data?.expiresAt
				}));
				localStorage.removeItem("forgotPasswordSession");
				setOtpCode("");
				setError(null);
				setTimeout(() => {
					navigate(RESET_PASSWORD_PATH, { replace: true });
				}, 1e3);
			} else {
				const errorType = response.message?.includes("kadaluarsa") ? "expired_otp" : "invalid_otp";
				setError(response.message || AUTH_CONSTANTS.ERROR_MESSAGES.OTP_INVALID);
				trackOtpAttempt({
					success: false,
					errorType
				});
				if (newAttempts >= OTP_CONSTANTS.MAX_ATTEMPTS) {
					setIsBlocked(true);
					setBlockTimeLeft(OTP_CONSTANTS.COOLDOWN_SECONDS);
				}
			}
		} catch (err) {
			setError(err.response?.data?.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR);
			trackOtpAttempt({
				success: false,
				errorType: "network_error"
			});
			logger.error("OTP verification error:", err);
			if (newAttempts >= OTP_CONSTANTS.MAX_ATTEMPTS) {
				setIsBlocked(true);
				setBlockTimeLeft(OTP_CONSTANTS.COOLDOWN_SECONDS);
			}
		} finally {
			setLoading(false);
		}
	}, [
		isBlocked,
		otpCode,
		attempts,
		sessionData,
		trackOtpAttempt,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (otpCode.length === OTP_CONSTANTS.LENGTH && !loading && !isBlocked) {
			const timer = setTimeout(() => {
				if (validateOtp(otpCode)) handleVerifyOtp(new Event("submit", { cancelable: true }));
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [
		otpCode,
		loading,
		isBlocked,
		handleVerifyOtp
	]);
	(0, import_react.useEffect)(() => {
		try {
			const session = localStorage.getItem("forgotPasswordSession");
			if (session) {
				const parsedSession = JSON.parse(session);
				if (/* @__PURE__ */ new Date() > new Date(parsedSession.expiresAt)) {
					localStorage.removeItem("forgotPasswordSession");
					navigate(LOGIN_PATH$1, { replace: true });
					return;
				}
				setSessionData(parsedSession);
			} else navigate(LOGIN_PATH$1, { replace: true });
		} catch (err) {
			logger.error("Session loading error:", err);
			navigate(LOGIN_PATH$1, { replace: true });
		}
	}, [navigate]);
	/**
	* Validasi OTP format
	*/
	const validateOtp = (value) => {
		return new RegExp(`^\\d{${OTP_CONSTANTS.LENGTH}}$`).test(value);
	};
	/**
	* Handle OTP input change with haptic feedback
	*/
	const handleOtpChange = (0, import_react.useCallback)((value) => {
		if (isBlocked || loading) return;
		setOtpCode(value.replace(/\D/g, "").slice(0, OTP_CONSTANTS.LENGTH));
		setError(null);
		triggerHaptic();
	}, [
		isBlocked,
		loading,
		triggerHaptic
	]);
	/**
	* Handle paste for OTP
	*/
	const handlePaste = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		handleOtpChange(e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_CONSTANTS.LENGTH));
	}, [handleOtpChange]);
	/**
	* Reset form fields
	*/
	const resetForm = () => {
		setOtpCode("");
		setError(null);
	};
	/**
	* Handler untuk kirim ulang OTP
	*/
	const handleResendOtp = async () => {
		if (!sessionData || resendLoading) return;
		setResendLoading(true);
		try {
			const response = await forgotPasswordService.resendOtp({ sessionId: sessionData.sessionId });
			if (response.success) {
				const updatedSession = {
					...sessionData,
					expiresAt: new Date(Date.now() + OTP_CONSTANTS.EXPIRY_MINUTES * 60 * 1e3)
				};
				localStorage.setItem("forgotPasswordSession", JSON.stringify(updatedSession));
				setSessionData(updatedSession);
				resetCountdown(OTP_CONSTANTS.EXPIRY_MINUTES * 60);
				setError(null);
				setOtpCode("");
				setAttempts(0);
				setIsBlocked(false);
				setBlockTimeLeft(0);
				trackOtpAttempt({
					success: true,
					errorType: "resend_success"
				});
			} else {
				setError(response.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR);
				trackOtpAttempt({
					success: false,
					errorType: "resend_failed"
				});
			}
		} catch (err) {
			if (err.response?.status === 404) {
				localStorage.removeItem("forgotPasswordSession");
				navigate(LOGIN_PATH$1, { replace: true });
				return;
			}
			setError(err.response?.data?.message || AUTH_CONSTANTS.ERROR_MESSAGES.SERVER_ERROR);
			trackOtpAttempt({
				success: false,
				errorType: "resend_error"
			});
			logger.error("Resend OTP error:", err);
		} finally {
			setResendLoading(false);
		}
	};
	return {
		otpCode,
		loading,
		error,
		sessionData,
		resendLoading,
		attempts,
		isSuccess,
		isBlocked,
		timeLeft,
		blockTime,
		formatTime,
		formatBlockTime,
		setOtpCode: handleOtpChange,
		handleVerifyOtp,
		handleResendOtp,
		handlePaste,
		resetForm
	};
};
//#endregion
//#region src/features/auth/forgot-password/components/ForgotOtpTopbar.jsx
var import_jsx_runtime = require_jsx_runtime();
function ForgotOtpTopbar({ loginPath }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "pbs-register-topbar",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pbs-topbar-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pbs-topbar-brand",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `/${jwtEncode({ page: "globalSplash" })}`,
						className: "d-flex align-items-center gap-3 text-decoration-none",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `/assets/icons/PUSlogo.png`,
							alt: "PBS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Paguyuban Usaha" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sukses" })] })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pbs-topbar-login",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ingat password?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: loginPath,
						children: "Login"
					})]
				})]
			})
		})
	});
}
//#endregion
//#region src/features/auth/forgot-password/components/ForgotOtpSidebar.jsx
function ForgotOtpSidebar({ emailHp }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pbs-register-left-v2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pbs-mini-badge",
				children: "KOPERASI SYARIAH"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
				"Verifikasi",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				"Kode",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OTP" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Masukkan kode 6 digit yang telah dikirim ke",
				" ",
				emailHp || "email Anda",
				" untuk melanjutkan proses reset password."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pbs-left-illustration",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { className: "pbs-hero-icon" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pbs-feature-list",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "Informasi OTP" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pbs-feature-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Berlaku 5 Menit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kode OTP akan kadaluarsa dalam 5 menit." })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pbs-feature-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSyncAlt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Bisa Kirim Ulang" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Request ulang jika tidak menerima kode." })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pbs-feature-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUsers, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Aman & Privat" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kode hanya dikirim ke nomor terdaftar." })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pbs-feature-item",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaGift, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Proses Otomatis" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Setelah verifikasi, lanjut ke reset password." })] })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pbs-help-box",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHeadset, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Butuh bantuan?" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0812-3456-7890" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "info@pbs.co.id" })
				] })]
			})
		]
	});
}
//#endregion
//#region src/features/auth/forgot-password/components/OtpInputFields.jsx
function OtpInputFields({ useSeparateInputs, onToggleMode, otpCode, setOtpCode, inputRefs, onInputChange, onKeyDown, onSeparatePaste, onPaste, loading, isBlocked }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex justify-content-end mb-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "link",
			size: "sm",
			className: "text-decoration-none p-0",
			onClick: onToggleMode,
			children: useSeparateInputs ? "Gunakan input tunggal" : "Gunakan input terpisah"
		})
	}), useSeparateInputs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex gap-2",
		onPaste: onSeparatePaste,
		children: [
			0,
			1,
			2,
			3,
			4,
			5
		].map((index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
			ref: (el) => inputRefs.current[index] = el,
			type: "text",
			className: "text-center",
			style: {
				width: "50px",
				height: "58px",
				fontSize: "24px",
				fontWeight: "bold"
			},
			value: otpCode[index] || "",
			onChange: (e) => onInputChange(index, e.target.value),
			onKeyDown: (e) => onKeyDown(index, e),
			maxLength: 1,
			required: true,
			disabled: loading || isBlocked,
			inputMode: "numeric",
			autoComplete: "one-time-code"
		}, index))
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
		type: "text",
		placeholder: AUTH_CONSTANTS.PLACEHOLDERS.OTP_CODE,
		value: otpCode,
		onChange: (e) => setOtpCode(e.target.value),
		onPaste,
		maxLength: 6,
		required: true,
		disabled: loading || isBlocked,
		inputMode: "numeric",
		autoComplete: "one-time-code",
		style: {
			letterSpacing: "8px",
			fontSize: "24px",
			fontWeight: "bold",
			textAlign: "center"
		}
	})] });
}
//#endregion
//#region src/features/auth/forgot-password/components/OtpVerificationFormActions.jsx
function OtpVerificationFormActions({ loading, isBlocked, otpCode, resendLoading, onResendOtp, blockTime, formatBlockTime, loginPath }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "submit",
		disabled: loading || isBlocked || otpCode.replace(/\s/g, "").length !== 6,
		className: "pbs-submit-v2",
		children: loading ? "Memverifikasi..." : "Verifikasi Kode"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center mt-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 small",
				children: ["Tidak menerima kode?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onResendOtp,
					disabled: resendLoading,
					className: "btn btn-link p-0 text-decoration-none fw-bold ms-1",
					children: resendLoading ? "Mengirim..." : "Kirim Ulang"
				})]
			}),
			isBlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
				variant: "warning",
				className: "mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-2" }),
					"Terlalu banyak percobaan. Coba lagi dalam",
					" ",
					formatBlockTime(blockTime),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: loginPath,
					className: "text-decoration-none",
					children: "Batal dan Kembali ke Login"
				})
			})
		]
	})] });
}
//#endregion
//#region src/features/auth/forgot-password/components/OtpVerificationCard.jsx
function OtpVerificationCard({ sessionData, timeLeft, formatTime, isSuccess, error, attempts, useSeparateInputs, setUseSeparateInputs, otpCode, setOtpCode, inputRefs, handleInputChange, handleKeyDown, handleSeparatePaste, handlePaste, loading, isBlocked, handleVerifyOtp, resendLoading, handleResendOtp, blockTime, formatBlockTime, loginPath }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "pbs-register-card-v2 border-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pbs-form-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Verifikasi OTP" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Kode dikirim ke ", sessionData?.emailHp || "email Anda"] }),
			timeLeft > 0 && !isSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					bg: timeLeft > 120 ? "success" : timeLeft > 60 ? "warning" : "danger",
					className: "px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "me-1" }),
						"Berlaku: ",
						formatTime(timeLeft)
					]
				})
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "alert alert-danger mb-4 p-3",
				children: error
			}),
			isSuccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-success mb-3",
						style: { fontSize: "80px" },
						children: "✓"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "text-success mb-2",
						children: "OTP Berhasil!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted",
						children: "Mengalihkan ke reset password..."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
				onSubmit: handleVerifyOtp,
				noValidate: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
						md: 12,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, { children: ["Kode OTP", attempts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							bg: "secondary",
							className: "ms-2",
							pill: true,
							children: [
								"Percobaan: ",
								attempts,
								"/3"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpInputFields, {
							useSeparateInputs,
							onToggleMode: () => setUseSeparateInputs(!useSeparateInputs),
							otpCode,
							setOtpCode,
							inputRefs,
							onInputChange: handleInputChange,
							onKeyDown: handleKeyDown,
							onSeparatePaste: handleSeparatePaste,
							onPaste: handlePaste,
							loading,
							isBlocked
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 12,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpVerificationFormActions, {
							loading,
							isBlocked,
							otpCode,
							resendLoading,
							onResendOtp: handleResendOtp,
							blockTime,
							formatBlockTime,
							loginPath
						})
					})]
				})
			})
		] })
	});
}
//#endregion
//#region src/features/auth/forgot-password/page/ForgotOtpPage.jsx
var LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;
function ForgotOtpPage() {
	const inputRefs = (0, import_react.useRef)([]);
	const [useSeparateInputs, setUseSeparateInputs] = (0, import_react.useState)(true);
	const { otpCode, loading, error, sessionData, resendLoading, attempts, isSuccess, isBlocked, timeLeft, blockTime, formatTime, formatBlockTime, setOtpCode, handleVerifyOtp, handleResendOtp, handlePaste } = useOtpVerification();
	(0, import_react.useEffect)(() => {
		if (inputRefs.current[0] && !isSuccess) inputRefs.current[0].focus();
	}, [isSuccess]);
	const handleInputChange = (index, value) => {
		if (value.length > 1) {
			const pastedData = value.replace(/\D/g, "").slice(0, 6);
			setOtpCode(pastedData);
			const focusIndex = Math.min(pastedData.length, 5);
			if (inputRefs.current[focusIndex]) inputRefs.current[focusIndex].focus();
		} else {
			const newOtpCode = otpCode.split("");
			newOtpCode[index] = value;
			setOtpCode(newOtpCode.join(""));
			if (value && index < 5 && inputRefs.current[index + 1]) inputRefs.current[index + 1].focus();
		}
	};
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !otpCode[index] && index > 0) {
			if (inputRefs.current[index - 1]) inputRefs.current[index - 1].focus();
		} else if (e.key === "ArrowLeft" && index > 0) {
			if (inputRefs.current[index - 1]) inputRefs.current[index - 1].focus();
		} else if (e.key === "ArrowRight" && index < 5) {
			if (inputRefs.current[index + 1]) inputRefs.current[index + 1].focus();
		}
	};
	const handleSeparatePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
		for (let i = 0; i < pastedData.length && i < 6; i++) if (inputRefs.current[i]) inputRefs.current[i].value = pastedData[i];
		setOtpCode(pastedData);
		const focusIndex = Math.min(pastedData.length, 5);
		if (inputRefs.current[focusIndex]) inputRefs.current[focusIndex].focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pbs-register-v2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotOtpTopbar, { loginPath: LOGIN_PATH }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "pbs-register-content",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
				fluid: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-0 align-items-stretch",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 5,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotOtpSidebar, { emailHp: sessionData?.emailHp })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 7,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
							className: "pbs-register-right-v2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OtpVerificationCard, {
								sessionData,
								timeLeft,
								formatTime,
								isSuccess,
								error,
								attempts,
								useSeparateInputs,
								setUseSeparateInputs,
								otpCode,
								setOtpCode,
								inputRefs,
								handleInputChange,
								handleKeyDown,
								handleSeparatePaste,
								handlePaste,
								loading,
								isBlocked,
								handleVerifyOtp,
								resendLoading,
								handleResendOtp,
								blockTime,
								formatBlockTime,
								loginPath: LOGIN_PATH
							})
						})
					})]
				})
			})
		})]
	});
}
//#endregion
export { ForgotOtpPage as default };
