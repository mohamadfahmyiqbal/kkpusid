import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Pr as useNavigate, S as Card_default, b as Container, c as Spinner, g as Form_default, h as InputGroup_default, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { i as useSocket, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as profileService } from "./profileService-CtUrDUsl.js";
import { t as uSimpanan } from "./USimpanan-BSasVMP7.js";
import { n as parseRawNumber, t as formatRupiah } from "./formatRupiah-x0ZMkhue.js";
import { a as MethodSelector_default, i as TransferDetails_default, n as HistoryList_default, r as CashDetails_default, t as SaldoHeader_default } from "./SaldoHeader-DQfd_zEx.js";
//#region src/pages/simpanan/PenarikanSimpananPage/hooks/useWithdrawalValidation.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useWithdrawalValidation = () => {
	const validate = (data) => {
		const { amount, balance, minAmount, method, bankAccount, cashDetails } = data;
		if (!amount || amount < minAmount) return `Minimal penarikan Rp ${minAmount.toLocaleString("id-ID")}`;
		if (amount > balance) return "Saldo tidak mencukupi.";
		if (method === "TRANSFER" && !bankAccount) return "Data rekening bank belum lengkap.";
		if (method === "TUNAI") {
			if (!cashDetails?.cashName?.trim()) return "Nama penerima harus diisi.";
			if (!cashDetails?.cashLocation?.trim()) return "Lokasi pengambilan harus diisi.";
			if (!cashDetails?.cashTime?.trim()) return "Waktu transaksi harus diisi.";
		}
		return null;
	};
	return { validate };
};
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/components/AmountInput.jsx
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_jsx_runtime = require_jsx_runtime();
var AmountInput = ({ value, onChange }) => {
	const handleChange = (e) => {
		onChange(formatRupiah(parseRawNumber(e.target.value)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "small fw-bold text-muted text-uppercase",
				style: {
					fontSize: "11px",
					letterSpacing: "0.5px"
				},
				children: "Nominal Pencairan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
				style: {
					borderRadius: "12px",
					overflow: "hidden",
					boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
					className: "bg-light border-end-0 fw-bold text-primary px-3",
					style: { border: "1px solid #E0E6ED" },
					children: "Rp"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					type: "text",
					inputMode: "numeric",
					placeholder: "0",
					value,
					onChange: handleChange,
					className: "border-start-0 fw-bold text-primary py-2",
					style: {
						fontSize: "1.2rem",
						border: "1px solid #E0E6ED",
						outline: "none"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
				className: "text-muted",
				style: { fontSize: "11px" },
				children: "*Minimal penarikan Rp 10.000"
			})
		]
	});
};
var AmountInput_default = import_react.memo(AmountInput);
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/components/WithdrawalForm.jsx
var WithdrawalForm = ({ balance, categoryCode, validate, onSuccess, userData }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		amount: "",
		method: "TRANSFER",
		cashDetails: {
			cashName: userData?.full_name || "",
			cashLocation: "",
			cashTime: ""
		}
	});
	const handleAmountChange = (0, import_react.useCallback)((val) => {
		setFormData((prev) => ({
			...prev,
			amount: val
		}));
	}, []);
	const handleMethodChange = (0, import_react.useCallback)((val) => {
		setFormData((prev) => ({
			...prev,
			method: val
		}));
	}, []);
	const handleCashDetailsChange = (0, import_react.useCallback)((val) => {
		setFormData((prev) => ({
			...prev,
			cashDetails: val
		}));
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const numericAmount = Number(parseRawNumber(formData.amount)) || 0;
		const error = validate({
			amount: numericAmount,
			balance,
			minAmount: 1e4,
			method: formData.method,
			bankAccount: userData?.bank_info?.bank_account_no,
			cashDetails: formData.cashDetails
		});
		if (error) {
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: error,
				icon: "warning"
			});
			return;
		}
		try {
			setLoading(true);
			if (formData.method === "TRANSFER" && !userData?.bank_info?.bank_account_no) {
				import_sweetalert2_all.default.fire({
					title: "Perhatian",
					text: "Data rekening bank belum diatur. Silahkan hubungi admin.",
					icon: "warning"
				});
				setLoading(false);
				return;
			}
			/**
			* PAYLOAD FINAL:
			* Diselaraskan dengan skema tabel fisik database kkpus.id:
			* - amount: numeric (clean)
			* - method: string
			* - bank_name & bank_account_no: string flat (bukan nested object)
			* - description: Digunakan untuk menyimpan detail penarikan tunai karena kolom fisik terbatas
			*/
			const payload = {
				amount: numericAmount,
				category: categoryCode,
				method: formData.method,
				bank_name: formData.method === "TRANSFER" ? userData?.bank_info?.bank_name : null,
				bank_account_no: formData.method === "TRANSFER" ? userData?.bank_info?.bank_account_no : null,
				cash_name: formData.method === "TUNAI" ? formData.cashDetails.cashName : null,
				cash_time: formData.method === "TUNAI" ? formData.cashDetails.cashTime : null,
				cash_location: formData.method === "TUNAI" ? formData.cashDetails.cashLocation : null
			};
			const res = await uSimpanan.requestWithdrawal(payload);
			if (res.data.status) {
				onSuccess();
				setFormData((prev) => ({
					...prev,
					amount: ""
				}));
				navigate(`/${jwtEncode({
					page: "transactionDetailPage",
					withdrawalId: res.data.data.withdrawal_id || res.data.data.id
				})}`);
			}
		} catch (err) {
			const errorMessage = err.response?.data?.message || "Gagal memproses penarikan. Silahkan cek koneksi.";
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: errorMessage,
				icon: "warning"
			});
			console.error("Submit Error Context:", err.response?.data);
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmountInput_default, {
				value: formData.amount,
				onChange: handleAmountChange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodSelector_default, {
				value: formData.method,
				onChange: handleMethodChange
			}),
			formData.method === "TRANSFER" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransferDetails_default, { bankInfo: userData?.bank_info }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CashDetails_default, {
				cashDetails: formData.cashDetails,
				onChange: handleCashDetailsChange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: loading,
				className: "w-100 fw-bold py-3 mt-3 border-0",
				style: {
					backgroundColor: "#1565C0",
					borderRadius: "12px",
					boxShadow: "0 4px 12px rgba(21, 101, 192, 0.2)"
				},
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					animation: "border",
					size: "sm",
					className: "me-2"
				}), "MEMPROSES..."] }) : "PROSES PENCAIRAN"
			})
		]
	});
};
var WithdrawalForm_default = import_react.memo(WithdrawalForm);
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/hooks/useWithdrawalData.js
var useWithdrawalData = (categoryCode) => {
	const [history, setHistory] = (0, import_react.useState)([]);
	const [balance, setBalance] = (0, import_react.useState)(0);
	const [loading, setLoading] = (0, import_react.useState)({
		balance: true,
		history: true
	});
	const [fallbackBankInfo, setFallbackBankInfo] = (0, import_react.useState)(null);
	const { userData } = useProfile();
	const { socket } = useSocket();
	(0, import_react.useEffect)(() => {
		if (!userData?.bank_info?.bank_account_no && !fallbackBankInfo) profileService.getProfile().then((res) => {
			if (res?.data?.bank_info) setFallbackBankInfo(res.data.bank_info);
		}).catch((err) => {
			console.warn("Fallback fetch profile in useWithdrawalData:", err.message);
		});
	}, [userData?.bank_info, fallbackBankInfo]);
	const bankInfo = (0, import_react.useMemo)(() => {
		return userData?.bank_info || fallbackBankInfo || null;
	}, [userData?.bank_info, fallbackBankInfo]);
	const requestWithdrawals = (0, import_react.useCallback)(() => {
		if (socket?.connected) socket.emit("withdrawals:request", { category: categoryCode || "SS_SUKARELA" });
		else console.warn("Socket belum terhubung");
	}, [socket, categoryCode]);
	(0, import_react.useEffect)(() => {
		if (socket) {
			const handleWithdrawalsUpdate = (data) => {
				if (data.category === categoryCode) {
					setHistory(data.withdrawals || []);
					setBalance(data.balance || 0);
					setLoading((prev) => ({
						...prev,
						history: false,
						balance: false
					}));
				}
			};
			socket.on("withdrawals:update", handleWithdrawalsUpdate);
			if (socket.connected) requestWithdrawals();
			else socket.once("connect", requestWithdrawals);
			return () => {
				socket.off("withdrawals:update", handleWithdrawalsUpdate);
				socket.off("connect", requestWithdrawals);
			};
		}
	}, [
		socket,
		categoryCode,
		requestWithdrawals
	]);
	return {
		balance,
		history,
		loading,
		userData: {
			...userData,
			bank_info: bankInfo,
			full_name: userData?.full_name || ""
		},
		refreshHistory: requestWithdrawals
	};
};
//#endregion
//#region src/pages/simpanan/PenarikanSimpananPage/PenarikanSimpananPage.jsx
var PenarikanSimpananPage = ({ decodedToken }) => {
	const navigate = useNavigate();
	const { categoryCode } = decodedToken || {};
	const effectiveCategory = (0, import_react.useMemo)(() => categoryCode || "SS_SUKARELA", [categoryCode]);
	const { balance, history, loading, refreshHistory, userData } = useWithdrawalData(effectiveCategory);
	const { validate } = useWithdrawalValidation();
	const handleItemClick = (item) => {
		navigate(`/${jwtEncode({
			page: "transactionDetailPage",
			withdrawalId: item.withdrawal_id || item.id
		})}`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		fluid: true,
		className: "p-0 bg-light min-vh-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-white pb-4 px-3 pt-2 shadow-sm mb-4",
			style: { borderRadius: "0 0 30px 30px" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaldoHeader_default, {
				balance,
				loading: loading.balance
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "g-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 7,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "border-0 shadow-sm overflow-hidden",
						style: { borderRadius: "20px" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex align-items-center mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-primary-subtle p-2 rounded-3 me-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "bi bi-wallet2 text-primary fs-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
									className: "fw-bold mb-0 text-dark",
									children: "Form Pengajuan Pencairan"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawalForm_default, {
								balance,
								categoryCode: effectiveCategory,
								validate,
								onSuccess: refreshHistory,
								userData
							})]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 5,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "border-0 shadow-sm",
						style: { borderRadius: "20px" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Header, {
							className: "bg-white border-0 pt-4 px-4 pb-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex justify-content-between align-items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
									className: "fw-bold mb-0 text-dark",
									children: "Riwayat Transaksi"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "badge bg-light text-primary rounded-pill px-3",
									children: "Terbaru"
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
							className: "px-4 pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryList_default, {
								history,
								loading: loading.history,
								onItemClick: handleItemClick
							})
						})]
					})
				})]
			})
		})]
	});
};
var PenarikanSimpananPage_default = import_react.memo(PenarikanSimpananPage);
//#endregion
export { PenarikanSimpananPage_default as default };
