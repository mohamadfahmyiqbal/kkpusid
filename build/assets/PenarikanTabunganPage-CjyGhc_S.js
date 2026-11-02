import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Pr as useNavigate, S as Card_default, b as Container, c as Spinner, g as Form_default, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { i as useSocket, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as profileService } from "./profileService-CtUrDUsl.js";
import { t as formatRupiah } from "./formatRupiah-x0ZMkhue.js";
import { a as MethodSelector_default, i as TransferDetails_default, n as HistoryList_default, r as CashDetails_default, t as SaldoHeader_default } from "./SaldoHeader-DQfd_zEx.js";
//#region src/pages/tabungan/PenarikanTabunganPage/components/WithdrawalTabunganForm.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_jsx_runtime = require_jsx_runtime();
var WithdrawalTabunganForm = ({ balance, tabunganId, product, onSuccess, userData }) => {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)({
		method: "TRANSFER",
		cashDetails: {
			cashName: userData?.full_name || "",
			cashLocation: "",
			cashTime: ""
		}
	});
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
		if (!balance || balance <= 0) {
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: "Saldo tabungan tidak mencukupi untuk dicairkan.",
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
			const payload = {
				method: formData.method,
				bank_name: formData.method === "TRANSFER" ? userData?.bank_info?.bank_name : null,
				bank_account_no: formData.method === "TRANSFER" ? userData?.bank_info?.bank_account_no : null,
				cash_name: formData.method === "TUNAI" ? formData.cashDetails.cashName : null,
				cash_time: formData.method === "TUNAI" ? formData.cashDetails.cashTime : null,
				cash_location: formData.method === "TUNAI" ? formData.cashDetails.cashLocation : null
			};
			const res = await api.post(`/tabungan/pengajuan/${tabunganId}/withdraw`, payload);
			if (res.data?.status) {
				onSuccess();
				const withdrawalId = res.data.data.withdrawal_id || res.data.data.id;
				import_sweetalert2_all.default.fire({
					title: "Berhasil",
					text: "Pengajuan pencairan tabungan berhasil dikirim. Menunggu persetujuan.",
					icon: "success"
				}).then(() => {
					navigate(`/${jwtEncode({
						page: "transactionDetailPage",
						withdrawalId,
						return: "tabunganPage",
						product: product || "Tabungan"
					})}`);
				});
			}
		} catch (err) {
			const errorMessage = err.response?.data?.message || "Gagal memproses penarikan. Silahkan cek koneksi.";
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: errorMessage,
				icon: "warning"
			});
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
		onSubmit: handleSubmit,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				className: "mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
						className: "fw-bold small text-muted",
						children: "Total Pencairan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "input-group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "input-group-text bg-light border-end-0 fw-bold",
							children: "Rp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							className: "border-start-0 ps-0 fw-bold text-success fs-5 bg-light",
							value: formatRupiah(balance),
							readOnly: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
						className: "text-muted",
						children: "Pencairan tabungan akan menarik seluruh target saldo yang telah terkumpul."
					})
				]
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
				disabled: loading || balance <= 0,
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
var WithdrawalTabunganForm_default = import_react.memo(WithdrawalTabunganForm);
//#endregion
//#region src/pages/tabungan/PenarikanTabunganPage/hooks/useWithdrawalTabunganData.js
var useWithdrawalTabunganData = (tabunganId) => {
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
			console.warn("Fallback fetch profile in useWithdrawalTabunganData:", err.message);
		});
	}, [userData?.bank_info, fallbackBankInfo]);
	const bankInfo = (0, import_react.useMemo)(() => {
		return userData?.bank_info || fallbackBankInfo || null;
	}, [userData?.bank_info, fallbackBankInfo]);
	const requestWithdrawals = (0, import_react.useCallback)(() => {
		if (socket?.connected && tabunganId) socket.emit("withdrawals:request", { category: `TAB_DEP_${tabunganId}` });
	}, [socket, tabunganId]);
	const fetchBalance = (0, import_react.useCallback)(async () => {
		if (!tabunganId) return;
		try {
			const response = await api.get(`/tabungan/pengajuan/detail/${tabunganId}`);
			if (response.data?.status) setBalance(response.data.data.current_balance || 0);
		} catch (err) {
			console.error("Error fetching balance", err);
		} finally {
			setLoading((prev) => ({
				...prev,
				balance: false
			}));
		}
	}, [tabunganId]);
	(0, import_react.useEffect)(() => {
		fetchBalance();
	}, [fetchBalance]);
	(0, import_react.useEffect)(() => {
		if (socket && tabunganId) {
			const handleWithdrawalsUpdate = (data) => {
				if (data.category === `TAB_DEP_${tabunganId}`) {
					setHistory(data.withdrawals || []);
					setLoading((prev) => ({
						...prev,
						history: false
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
		tabunganId,
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
//#region src/pages/tabungan/PenarikanTabunganPage/PenarikanTabunganPage.jsx
var PenarikanTabunganPage = ({ decodedToken }) => {
	const navigate = useNavigate();
	const { tabunganId, product } = decodedToken || {};
	const { balance, history, loading, refreshHistory, userData } = useWithdrawalTabunganData(tabunganId);
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
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
									className: "fw-bold mb-0 text-dark",
									children: ["Form Pengajuan Pencairan ", product || "Tabungan"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawalTabunganForm_default, {
								balance,
								tabunganId,
								product,
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
var PenarikanTabunganPage_default = import_react.memo(PenarikanTabunganPage);
//#endregion
export { PenarikanTabunganPage_default as default };
