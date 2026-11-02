import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, E as Button, Fr as useParams, Gn as FaReceipt, O as Alert_default, Pr as useNavigate, S as Card_default, Un as FaPrint, Xt as FaCopy, an as FaExclamationTriangle, b as Container, bt as FaArrowLeft, c as Spinner, cr as FaTimesCircle, dn as FaFileInvoiceDollar, g as Form_default, gr as FaUserCheck, kt as FaBuilding, l as Row, mr as FaUpload, o as Table, on as FaExternalLinkAlt, qn as FaRegFileAlt, qt as FaClock, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as motion } from "./vendor-framer-fx3iiH1e.js";
import { t as uBilling } from "./UBilling-DLTCHisI.js";
import { o as jwtDecodePage, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as uJualBeli } from "./UJualBeli-CQrsKJbc.js";
//#region src/pages/global/InvoicePage/components/InvoiceHeader.jsx
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var InvoiceHeader = ({ onBack, onPrint }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: -20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		className: "d-flex justify-content-between align-items-center mb-4 d-print-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "d-flex gap-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "light",
				className: "rounded-3 shadow-sm px-3 fw-bold border-0 bg-white d-flex align-items-center gap-2",
				onClick: onPrint,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPrint, {}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cetak Invoice" })
				]
			})
		})
	});
};
//#endregion
//#region src/pages/global/InvoicePage/components/InvoiceCard.jsx
var InvoiceCard = ({ billData, totalAmount, isPaid }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			scale: .95
		},
		animate: {
			opacity: 1,
			scale: 1
		},
		transition: { duration: .4 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
			className: "border-0 shadow-lg rounded-4 overflow-hidden position-relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "position-absolute",
					style: {
						top: "-50px",
						right: "-50px",
						width: "200px",
						height: "200px",
						borderRadius: "50%",
						background: isPaid ? "rgba(40, 167, 69, 0.05)" : "rgba(0, 123, 255, 0.05)",
						zIndex: 0
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `text-center py-5 position-relative ${isPaid ? "bg-gradient-success" : "bg-gradient-primary"} text-white`,
					style: {
						background: isPaid ? "linear-gradient(45deg, #28a745, #20c997)" : "linear-gradient(45deg, #007bff, #6610f2)",
						zIndex: 1
					},
					children: isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						transition: {
							type: "spring",
							stiffness: 200,
							damping: 10
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
								size: 60,
								className: "mb-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "fw-bold mb-1",
								children: "TRANSAKSI BERHASIL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "opacity-75 mb-0",
								children: "Pembayaran telah kami terima dan diverifikasi"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, {
							size: 60,
							className: "mb-3"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "fw-bold mb-1",
							children: "DETAIL TAGIHAN"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "opacity-75 mb-0",
							children: "Silakan tinjau rincian pembayaran Anda"
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
					className: "p-4 p-md-5 position-relative",
					style: { zIndex: 1 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "mb-5 gy-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								md: 6,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											className: "text-uppercase text-muted fw-bold ls-1 d-block mb-2",
											children: "Diterbitkan Untuk:"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "fw-bold text-dark mb-1",
											children: billData?.full_name || "Anggota"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-primary fw-semibold mb-0",
											children: billData?.member_no || "ID Registrasi"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								md: 6,
								className: "text-md-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
										className: "text-uppercase text-muted fw-bold ls-1 d-block mb-2",
										children: "Nomor Invoice:"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
										className: "fw-bold text-dark mb-1",
										children: ["#", billData?.invoice_no || "INV/2024/000"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
										className: "text-muted d-block fw-medium",
										children: [
											"Tanggal:",
											" ",
											new Date(billData?.createdAt).toLocaleDateString("id-ID", { dateStyle: "long" })
										]
									})
								] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "table-responsive-custom mb-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
								borderless: true,
								className: "align-middle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-bottom border-2 border-light",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-0 text-muted small text-uppercase fw-bold ls-1",
										style: { width: "70%" },
										children: "DESKRIPSI ITEM"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-3 px-0 text-end text-muted small text-uppercase fw-bold ls-1",
										children: "SUBTOTAL"
									})]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: billData?.details?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-bottom border-light",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "py-4 px-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "fw-bold text-dark",
											children: item.description
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											className: "text-muted",
											children: "Layanan Koperasi Digital"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-4 px-0 text-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "fw-bold text-dark h5 mb-0",
											children: ["Rp ", Number(item.amount).toLocaleString("id-ID")]
										})
									})]
								}, index)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							className: "justify-content-between align-items-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								md: 6,
								className: "mb-4 mb-md-0",
								children: isPaid && billData?.payment_type && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex align-items-center gap-3 text-muted small",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-light p-2 rounded-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-success" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "fw-bold text-dark",
										children: [
											"Dibayar via",
											" ",
											billData.payment_type.replace(/_/g, " ").toUpperCase()
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: billData.settlement_time ? new Date(billData.settlement_time).toLocaleString("id-ID") : "" })] })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								md: 5,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 rounded-4 bg-light border-0 shadow-sm overflow-hidden position-relative",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "position-absolute",
											style: {
												bottom: "-10px",
												right: "-10px",
												opacity: .1,
												transform: "rotate(-15deg)"
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaRegFileAlt, { size: 80 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted mb-2 fw-bold small text-uppercase ls-1",
											children: "Total Pembayaran"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
											className: "fw-bold text-primary mb-0",
											children: ["Rp ", totalAmount.toLocaleString("id-ID")]
										})
									]
								})
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .ls-1 { letter-spacing: 1px; }
        .bg-gradient-primary { background: linear-gradient(135deg, #007bff 0%, #6610f2 100%); }
        .bg-gradient-success { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); }
        .table-responsive-custom { border-radius: 12px; }
      ` })]
	});
};
//#endregion
//#region src/pages/global/InvoicePage/components/InvoiceActions.jsx
var InvoiceActions = ({ isPaid, billData, onBack, returnPageName, totalAmount, billItemIds, category, financingId, onPaymentSubmitted }) => {
	const [bankAccounts, setBankAccounts] = (0, import_react.useState)([]);
	const [loadingBanks, setLoadingBanks] = (0, import_react.useState)(true);
	const [selectedBankId, setSelectedBankId] = (0, import_react.useState)(null);
	const [proofFile, setProofFile] = (0, import_react.useState)(null);
	const [proofPreview, setProofPreview] = (0, import_react.useState)(null);
	const [senderName, setSenderName] = (0, import_react.useState)("");
	const [senderBank, setSenderBank] = (0, import_react.useState)("");
	const [senderAccountNo, setSenderAccountNo] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [copySuccess, setCopySuccess] = (0, import_react.useState)("");
	const [submittedData, setSubmittedData] = (0, import_react.useState)(null);
	const txData = submittedData || billData?.transaction;
	const isPendingVerification = submittedData?.status === "PENDING_VERIFICATION" || billData?.status === "PENDING_VERIFICATION" || billData?.status === "pending_verification" || billData?.bill_status === "pending_verification";
	const isRejected = billData?.status === "rejected" || billData?.status === "REJECTED";
	(0, import_react.useEffect)(() => {
		const fetchBanks = async () => {
			try {
				setLoadingBanks(true);
				const res = await uBilling.getCooperativeBanks();
				if (res.data?.status && Array.isArray(res.data.data)) {
					setBankAccounts(res.data.data);
					if (res.data.data.length > 0) setSelectedBankId(res.data.data[0].id);
				}
			} catch (err) {
				console.error("Gagal memuat rekening koperasi:", err);
			} finally {
				setLoadingBanks(false);
			}
		};
		fetchBanks();
	}, []);
	const handleCopy = (text, bankId) => {
		navigator.clipboard.writeText(text);
		setCopySuccess(bankId);
		setTimeout(() => setCopySuccess(""), 2e3);
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				import_sweetalert2_all.default.fire({
					icon: "warning",
					title: "Ukuran File Terlalu Besar",
					text: "Maksimal ukuran file adalah 5MB."
				});
				return;
			}
			setProofFile(file);
			if (file.type.startsWith("image/")) setProofPreview(URL.createObjectURL(file));
			else setProofPreview(null);
		}
	};
	const handleSubmitProof = async (e) => {
		e.preventDefault();
		if (!proofFile) {
			import_sweetalert2_all.default.fire({
				icon: "warning",
				title: "Bukti Transfer Diperlukan",
				text: "Silakan pilih foto struk atau screenshot bukti transfer terlebih dahulu."
			});
			return;
		}
		try {
			setIsSubmitting(true);
			const formData = new FormData();
			formData.append("proof", proofFile);
			if (billData?.bill_id) formData.append("bill_id", billData.bill_id);
			if (billItemIds && billItemIds.length > 0) formData.append("bill_item_ids", JSON.stringify(billItemIds));
			formData.append("amount", totalAmount);
			formData.append("bank_id", selectedBankId || "");
			formData.append("sender_name", senderName);
			formData.append("sender_bank", senderBank);
			formData.append("sender_account_no", senderAccountNo);
			formData.append("tx_category", category || "SETORAN_SIMPANAN");
			if (financingId) formData.append("financing_id", financingId);
			const response = await uBilling.submitManualPayment(formData);
			if (response.data?.status) {
				const resultData = response.data.data;
				setSubmittedData({
					...resultData,
					sender_name: senderName,
					sender_bank: senderBank,
					sender_account_no: senderAccountNo,
					amount: totalAmount,
					bank_name: selectedBank?.bank_name,
					proof_of_transfer: resultData.proof_url,
					created_at: (/* @__PURE__ */ new Date()).toISOString()
				});
				import_sweetalert2_all.default.fire({
					icon: "success",
					title: "Bukti Pembayaran Terkirim!",
					text: "Data pembayaran berhasil disimpan dan diteruskan ke Bendahara Koperasi untuk verifikasi.",
					confirmButtonColor: "#007bff"
				});
				if (onPaymentSubmitted) onPaymentSubmitted(resultData);
			}
		} catch (err) {
			console.error("Upload proof error:", err);
			import_sweetalert2_all.default.fire({
				icon: "error",
				title: "Gagal Mengunggah",
				text: err.response?.data?.message || "Terjadi kendala saat mengunggah bukti transfer."
			});
		} finally {
			setIsSubmitting(false);
		}
	};
	const selectedBank = bankAccounts.find((b) => b.id === selectedBankId) || bankAccounts[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: { delay: .2 },
		className: "mt-4 d-print-none",
		children: isPaid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
				variant: "success",
				className: "rounded-4 py-4 mb-4 text-center border-0 shadow-sm bg-success bg-opacity-10 text-success",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex flex-column align-items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { size: 36 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold h5 mb-0",
							children: "Pembayaran Terverifikasi & Disetujui"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "small mb-0 opacity-75",
							children: "Tagihan ini telah diverifikasi dan dinyatakan Lunas oleh Bendahara Koperasi."
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline-primary",
				size: "lg",
				className: "w-100 py-3 fw-bold rounded-4 shadow-sm border-2 d-flex align-items-center justify-content-center gap-2",
				onClick: onBack,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["KEMBALI KE ", returnPageName ? returnPageName.toUpperCase() : "HALAMAN UTAMA"] })]
			})]
		}) : isPendingVerification ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 border rounded-4 bg-white shadow-sm mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center justify-content-between border-bottom pb-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-warning bg-opacity-10 text-warning p-3 rounded-circle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { size: 28 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
							className: "fw-bold text-dark mb-0",
							children: "Detail Proses Pembayaran"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted small",
							children: "Status: Menunggu Verifikasi & Rekonsiliasi"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						bg: "warning",
						text: "dark",
						className: "px-3 py-2 rounded-pill fs-6",
						children: "MENUNGGU VERIFIKASI"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 p-3 bg-light rounded-3 border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h6", {
						className: "fw-bold text-secondary mb-3 d-flex align-items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUserCheck, { className: "text-primary" }), "Alur Verifikasi Bendahara"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex flex-column flex-md-row gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-fill p-3 bg-white rounded-3 border border-success border-2 shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2 text-success fw-bold small mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {}), " Tahap 1: Pengiriman Bukti"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "fw-bold text-dark small",
										children: "Telah Dikirim oleh Anggota"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted",
										style: { fontSize: "11px" },
										children: "File struk transfer tersimpan di sistem"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-fill p-3 bg-white rounded-3 border border-warning border-2 shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2 text-warning fw-bold small mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, {}), " Tahap 2: Approval Bendahara"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "fw-bold text-dark small",
										children: "Pemeriksaan Mutasi Rekening"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted",
										style: { fontSize: "11px" },
										children: "Bendahara memvalidasi dana masuk ke rekening koperasi"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-fill p-3 bg-white rounded-3 border border-light-subtle shadow-xs opacity-75",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2 text-muted fw-bold small mb-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaReceipt, {}), " Tahap 3: Pembukuan Ledger"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "fw-bold text-dark small",
										children: "Penerbitan Saldo & Lunas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted",
										style: { fontSize: "11px" },
										children: "Otomatis update saldo simpanan setelah di-approve"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold text-secondary mb-3",
					children: "Ringkasan Bukti Pembayaran:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
					responsive: true,
					bordered: true,
					hover: true,
					className: "align-middle mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							style: { width: "35%" },
							children: "Nomor Referensi Transaksi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "fw-bold text-primary font-monospace",
							children: txData?.order_id || txData?.midtrans_order_id || "-"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							children: "Total Pembayaran"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "fw-bold fs-5 text-dark",
							children: ["Rp ", parseFloat(txData?.amount || totalAmount).toLocaleString("id-ID")]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							children: "Rekening Tujuan Koperasi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: txData?.bank_name || selectedBank?.bank_name || "Bank Koperasi" }) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							children: "Nama Pengirim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: txData?.sender_name || senderName || "-" })] }),
						txData?.sender_bank && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							children: "Bank Pengirim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: txData.sender_bank })] }),
						txData?.sender_account_no && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							children: "Nomor Rekening Pengirim"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: txData.sender_account_no })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							children: "Lampiran Bukti Transfer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: txData?.proof_of_transfer || txData?.proof_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: txData?.proof_of_transfer || txData?.proof_url,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 rounded-pill",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExternalLinkAlt, { size: 12 }), " Buka Bukti Struk"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted small",
							children: "Tersimpan"
						}) })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "bg-light fw-semibold text-muted",
							children: "Waktu Pengiriman"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "text-muted small",
							children: new Date(txData?.created_at || Date.now()).toLocaleString("id-ID", {
								dateStyle: "full",
								timeStyle: "medium"
							})
						})] })
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline-primary",
						className: "flex-fill py-2 rounded-3 fw-bold",
						onClick: onBack,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }),
							" Kembali ke ",
							returnPageName ? returnPageName.toUpperCase() : "Daftar Tagihan"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline-secondary",
						className: "py-2 px-3 rounded-3",
						onClick: () => window.print(),
						children: "Cetak Bukti Kirim"
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white p-4 rounded-4 shadow-sm border",
			children: [
				isRejected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
					variant: "danger",
					className: "mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimesCircle, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pembayaran Sebelumnya Ditolak oleh Bendahara" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "small",
							children: billData?.transaction?.admin_note ? `Catatan Bendahara: ${billData.transaction.admin_note}` : "Silakan pastikan Anda mentransfer ke rekening resmi koperasi dan upload foto struk yang terbaca jelas."
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center justify-content-between border-bottom pb-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
						className: "fw-bold text-primary mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBuilding, { className: "me-2" }), "Transfer Bank Manual"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-muted small",
						children: "Pilih rekening resmi koperasi di bawah dan transfer sesuai nominal pas."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted small",
							children: "Total yang Ditransfer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "fs-4 fw-bold text-primary",
							children: ["Rp ", totalAmount.toLocaleString("id-ID")]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold mb-3 text-secondary",
					children: "1. Pilih Rekening Tujuan Transfer:"
				}),
				loadingBanks ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
						animation: "border",
						variant: "primary",
						size: "sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "small text-muted mt-2",
						children: "Memuat rekening tujuan..."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					className: "g-3 mb-4",
					children: bankAccounts.map((bank) => {
						const isSelected = selectedBankId === bank.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							md: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
								as: motion.div,
								whileHover: { scale: 1.01 },
								whileTap: { scale: .99 },
								onClick: () => setSelectedBankId(bank.id),
								className: `cursor-pointer border-2 transition-all rounded-3 ${isSelected ? "border-primary bg-primary bg-opacity-10 shadow-sm" : "border-light-subtle bg-light"}`,
								style: { cursor: "pointer" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
									className: "p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex justify-content-between align-items-start mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "badge bg-primary text-uppercase px-2 py-1",
												children: bank.bank_code
											}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
												className: "text-primary",
												size: 18
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "fw-bold text-dark",
											children: bank.bank_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "d-flex align-items-center justify-content-between mt-2 pt-2 border-top",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-muted",
													style: { fontSize: "11px" },
													children: "Nomor Rekening:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "fw-bold fs-6 text-primary",
													children: bank.account_number
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-muted small",
													children: ["a.n. ", bank.account_holder]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												variant: "outline-primary",
												size: "sm",
												className: "rounded-pill px-3",
												onClick: (e) => {
													e.stopPropagation();
													handleCopy(bank.account_number, bank.id);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCopy, { className: "me-1" }), copySuccess === bank.id ? "Tersalin!" : "Salin"]
											})]
										})
									]
								})
							})
						}, bank.id);
					})
				}),
				selectedBank && selectedBank.instructions && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-light p-3 rounded-3 mb-4 border border-light-subtle small text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Catatan:" }),
						" ",
						selectedBank.instructions
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold mb-3 text-secondary",
					children: "2. Konfirmasi & Upload Bukti Pembayaran:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default, {
					onSubmit: handleSubmitProof,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
						className: "g-3 mb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								md: 6,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									controlId: "senderName",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
										className: "small fw-semibold",
										children: "Nama Pengirim (Pemilik Rekening)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
										type: "text",
										placeholder: "Contoh: Budi Santoso",
										value: senderName,
										onChange: (e) => setSenderName(e.target.value),
										required: true
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								md: 6,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									controlId: "senderBank",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
										className: "small fw-semibold",
										children: "Bank Pengirim"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
										type: "text",
										placeholder: "Contoh: BCA / Mandiri / BRI",
										value: senderBank,
										onChange: (e) => setSenderBank(e.target.value)
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
								md: 12,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
									controlId: "proofFile",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
											className: "small fw-semibold",
											children: ["Unggah Bukti Struk / Screenshot Transfer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-danger",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
											type: "file",
											accept: "image/*,application/pdf",
											onChange: handleFileChange,
											required: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Text, {
											className: "text-muted",
											children: "Format: JPG, PNG, WEBP, atau PDF (Maksimal 5MB)."
										})
									]
								}), proofPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 p-2 border rounded-3 text-center bg-light",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted small mb-1",
										children: "Pratinjau Bukti:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: proofPreview,
										alt: "Preview Bukti Transfer",
										style: {
											maxHeight: "200px",
											maxWidth: "100%",
											borderRadius: "8px"
										}
									})]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "primary",
						size: "lg",
						className: "w-100 py-3 fw-bold rounded-4 shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2",
						disabled: isSubmitting,
						children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
							animation: "border",
							size: "sm"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mengunggah Bukti Pembayaran..." })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUpload, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "KIRIM BUKTI PEMBAYARAN KE BENDAHARA" })] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "link",
					className: "w-100 text-muted text-decoration-none mt-2",
					onClick: onBack,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }), " Batal & Kembali"]
				})
			]
		})
	});
};
//#endregion
//#region src/pages/global/InvoicePage/components/InvoiceLoading.jsx
var InvoiceLoading = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex justify-content-center align-items-center vh-100 bg-light",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
				animation: "grow",
				variant: "primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted fw-semibold",
				children: "Menyiapkan Invoice Anda..."
			})]
		})
	});
};
//#endregion
//#region src/pages/global/InvoicePage/components/InvoiceError.jsx
var InvoiceError = ({ error, onBack }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert_default, {
			variant: "warning",
			className: "rounded-4 p-4 shadow-sm border-0 bg-warning bg-opacity-10 text-warning-emphasis",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, { size: 30 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold mb-1",
						children: "Data Invoice Tidak Ditemukan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-0",
						children: error || "Kami tidak dapat menemukan data tagihan yang Anda cari."
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "d-flex justify-content-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "warning",
						onClick: onBack,
						className: "rounded-3 fw-bold border-0 text-white",
						style: { backgroundColor: "#ffc107" },
						children: "Kembali ke Beranda"
					})
				})
			]
		})
	});
};
//#endregion
//#region src/pages/global/InvoicePage/components/InvoiceStatusBadge.jsx
var InvoiceStatusBadge = ({ isPaid, status }) => {
	const isPendingVerification = status === "pending_verification" || status === "PENDING_VERIFICATION";
	const isRejected = status === "rejected" || status === "REJECTED";
	let badgeBg = isPaid ? "success" : "warning";
	let badgeText = isPaid ? "white" : "dark";
	let label = isPaid ? "LUNAS / PAID" : "BELUM DIBAYAR";
	if (isPendingVerification) {
		badgeBg = "info";
		badgeText = "white";
		label = "MENUNGGU VERIFIKASI";
	} else if (isRejected) {
		badgeBg = "danger";
		badgeText = "white";
		label = "DITOLAK";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex justify-content-end mb-3 px-3 d-print-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: "mb-0 fw-bold me-2 align-self-center",
			children: "Status:"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			bg: badgeBg,
			text: badgeText,
			className: "px-3 py-2 fs-6 rounded-pill shadow-sm",
			children: label
		})]
	});
};
//#endregion
//#region src/pages/global/InvoicePage/components/InvoiceFooter.jsx
var InvoiceFooter = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center mt-5 d-print-none opacity-50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
			className: "text-muted",
			children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Koperasi Digital - System Generated Invoice"
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @media print {
          body { background: white !important; }
          .container { padding: 0 !important; max-width: 100% !important; }
          .card { border: none !important; box-shadow: none !important; }
          .bg-gradient-primary, .bg-gradient-success { 
            -webkit-print-color-adjust: exact; 
            color-adjust: exact;
          }
          .d-print-none { display: none !important; }
        }
      ` })] });
};
//#endregion
//#region src/pages/global/InvoicePage/hooks/useInvoiceData.js
var useInvoiceData = () => {
	const { token } = useParams();
	const pollingRef = (0, import_react.useRef)(null);
	const params = (0, import_react.useMemo)(() => {
		const payload = token ? jwtDecodePage(token) : {};
		let ids = payload.billItemIds || payload.billIds || [];
		return {
			billItemIds: Array.isArray(ids) ? ids : [ids],
			billId: payload.billId || null,
			returnPage: payload.return || "dashboard",
			category: payload.financing_id || payload.category === "FINANCING" ? "FINANCING" : payload.category || "GENERAL",
			financingId: payload.financingId || payload.financing_id,
			registrationId: payload.registrationId,
			categoryName: payload.categoryName,
			originalReturn: payload.originalReturn,
			status: payload.status || null,
			product: payload.product || null,
			productName: payload.productName || null,
			amount: payload.amount || null
		};
	}, [token]);
	const [billData, setBillData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const stopPolling = (0, import_react.useCallback)(() => {
		if (pollingRef.current) {
			clearInterval(pollingRef.current);
			pollingRef.current = null;
		}
	}, []);
	const [dynamicBillId, setDynamicBillIdState] = (0, import_react.useState)(params.billId);
	const dynamicBillIdRef = (0, import_react.useRef)(dynamicBillId);
	const [dynamicOrderId, setDynamicOrderId] = (0, import_react.useState)(null);
	const setDynamicBillId = (0, import_react.useCallback)((id) => {
		dynamicBillIdRef.current = id;
		setDynamicBillIdState(id);
	}, []);
	const fetchBillDetail = (0, import_react.useCallback)(async (isPolling = false) => {
		try {
			const currentBillId = dynamicBillIdRef.current;
			if (currentBillId) {
				const response = await uBilling.getInvoiceDetail(null, currentBillId);
				if (response.data?.status) {
					const newData = response.data.data;
					setBillData(newData);
					if (newData.status === "PAID") {
						stopPolling();
						if (isPolling) {
							window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
							window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
							window.dispatchEvent(new CustomEvent("PAYMENT_SUCCESSFUL", { detail: newData }));
						}
					}
				}
			} else if (params.billItemIds.length > 0) {
				const response = await uBilling.getInvoiceDetail(params.billItemIds, null);
				if (response.data?.status) {
					const newData = response.data.data;
					setBillData(newData);
					if (newData.status === "PAID") {
						stopPolling();
						if (isPolling) {
							window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
							window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
							window.dispatchEvent(new CustomEvent("PAYMENT_SUCCESSFUL", { detail: newData }));
						}
					}
				}
			} else if (params.financingId) {
				const res = await uJualBeli.getFinancingDetail(params.financingId);
				if (res.data?.status) {
					const detail = res.data.data;
					const installmentAmount = detail.cooperation_months ? Math.ceil((detail.item_price - (detail.down_payment || 0)) / detail.cooperation_months) : detail.amount || 0;
					const isPelunasan = detail?.category?.toLowerCase().includes("pelunasan") || detail?.item_name?.toLowerCase().includes("pelunasan");
					const finalAmount = isPelunasan ? params.amount || detail.total_tagihan : installmentAmount > 0 ? installmentAmount : .01;
					setBillData({
						full_name: detail?.member?.full_name || "Anggota",
						member_no: detail?.member?.member_code || "ID Registrasi",
						invoice_no: `FIN/${detail.financing_id?.substring(0, 8) || "000"}/${(/* @__PURE__ */ new Date()).getFullYear()}`,
						createdAt: detail.createdAt || detail.created_at || (/* @__PURE__ */ new Date()).toISOString(),
						details: isPelunasan && detail.discount > 0 ? [{
							description: "Total Tagihan Pelunasan",
							amount: parseFloat(detail.total_tagihan) + parseFloat(detail.discount)
						}, {
							description: "Diskon Pelunasan",
							amount: -parseFloat(detail.discount)
						}] : [{
							description: isPelunasan ? "Pembayaran Pelunasan Jual Beli" : "Down Payment / Cicilan Pembiayaan",
							amount: finalAmount
						}],
						status: detail.status === "PAID" || detail.status === "COMPLETED" || detail.settlement_time ? "PAID" : "UNPAID",
						member_id: detail?.member?.id,
						payment_type: detail.transactions?.[0]?.payment_type || detail.payment_type,
						settlement_time: detail.transactions?.[0]?.settlement_time || detail.settlement_time
					});
					if (detail.status === "PAID" || detail.status === "COMPLETED" || detail.settlement_time) {
						stopPolling();
						if (isPolling) {
							window.dispatchEvent(new Event("REFRESH_REGISTRATION_STATUS"));
							window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { timestamp: Date.now() } }));
						}
					}
				}
			}
		} catch (err) {
			console.error("Fetch invoice error:", err);
			if (!isPolling) setError("Gagal mengambil data invoice.");
		} finally {
			if (!isPolling) setLoading(false);
		}
	}, [params, stopPolling]);
	const startPolling = (0, import_react.useCallback)(() => {
		if (pollingRef.current) return;
		fetchBillDetail(true);
		pollingRef.current = setInterval(() => fetchBillDetail(true), 3e3);
	}, [fetchBillDetail]);
	(0, import_react.useEffect)(() => {
		fetchBillDetail();
		return () => stopPolling();
	}, [fetchBillDetail, stopPolling]);
	const totalAmount = (0, import_react.useMemo)(() => {
		const amount = billData?.details?.reduce((sum, item) => sum + Number(item.amount || 0), 0) || 0;
		return amount > 0 ? amount : .01;
	}, [billData]);
	return {
		...params,
		billData,
		loading,
		error,
		totalAmount,
		startPolling,
		stopPolling,
		refreshData: fetchBillDetail,
		setDynamicBillId
	};
};
//#endregion
//#region src/pages/global/InvoicePage/hooks/useInvoiceNavigation.js
var useInvoiceNavigation = ({ billData, isPaid, returnPage, registrationId, category, categoryName, originalReturn, financingId, product, productName, id }) => {
	const navigate = useNavigate();
	const isRegistrationFlow = (0, import_react.useMemo)(() => {
		return returnPage === "registrationPage" || returnPage === "billingPage" && Boolean(registrationId);
	}, [returnPage, registrationId]);
	const isSimpananFlow = (0, import_react.useMemo)(() => {
		return originalReturn === "simpananPage" || returnPage === "simpananPage" || category === "SIMPANAN" || category === "SUKARELA" || category === "WAJIB" || category === "POKOK";
	}, [
		originalReturn,
		returnPage,
		category
	]);
	const isPelunasan = (0, import_react.useMemo)(() => {
		return Boolean((productName || product || categoryName || category)?.toLowerCase().includes("pelunasan"));
	}, [
		productName,
		product,
		categoryName,
		category
	]);
	const returnPageName = (0, import_react.useMemo)(() => {
		if (isPelunasan) return "Jual Beli";
		if (isPaid && isRegistrationFlow) return "Dashboard";
		if (isSimpananFlow) return "Simpanan";
		if (isPaid && category === "FINANCING") return "Billing";
		if (isPaid && category === "TABUNGAN_DEPOSIT") return "Tabungan";
		switch (returnPage) {
			case "dashboard": return "Dashboard";
			case "billingPage": return "Billing";
			case "setoranTabungan": return "Setoran Tabungan";
			case "registrationPage": return "Registrasi";
			default: return "Kembali";
		}
	}, [
		isPelunasan,
		isPaid,
		isRegistrationFlow,
		isSimpananFlow,
		category,
		returnPage
	]);
	return {
		handleNavigateBack: (0, import_react.useCallback)(() => {
			if (isPaid && isRegistrationFlow) {
				navigate(`/${jwtEncode({ page: "dashboard" })}`);
				return;
			}
			if (isSimpananFlow) {
				const billDetailDesc = billData?.details?.map((d) => d.description).join(" ") || "";
				const targetCategory = `${categoryName || ""} ${category || ""} ${product || ""} ${productName || ""} ${billDetailDesc}`;
				let activeTabCode = "SUKARELA";
				const catUpper = targetCategory.toUpperCase();
				if (catUpper.includes("WAJIB")) activeTabCode = "WAJIB";
				else if (catUpper.includes("POKOK")) activeTabCode = "POKOK";
				else if (catUpper.includes("SUKARELA")) activeTabCode = "SUKARELA";
				navigate(`/${jwtEncode({
					page: "simpananPage",
					activeTab: activeTabCode
				})}`);
				return;
			}
			if (isPelunasan) {
				navigate(`/${jwtEncode({ page: "jualBeliPage" })}`);
				return;
			}
			if (isPaid && category === "FINANCING") {
				navigate(`/${jwtEncode({
					page: "billingPage",
					category: "FINANCING",
					financingId,
					productName: productName || product,
					return: "transaksiPage"
				})}`);
				return;
			}
			if (isPaid && category === "TABUNGAN_DEPOSIT") {
				navigate(`/${jwtEncode({ page: "tabunganPage" })}`);
				return;
			}
			if (returnPage === "billingPage") {
				navigate(`/${jwtEncode({
					page: "billingPage",
					registrationId,
					category: categoryName,
					financingId,
					productName: productName || product,
					return: originalReturn || "dashboard"
				})}`);
				return;
			}
			if (returnPage === "registrationPage") {
				navigate(`/${jwtEncode({ page: "dashboard" })}`);
				return;
			}
			if (returnPage === "dashboard") {
				navigate("/dashboard");
				return;
			}
			if (returnPage === "setoranTabungan") {
				navigate(`/${jwtEncode({
					page: "setoranTabungan",
					product,
					id
				})}`);
				return;
			}
			navigate(`/${returnPage}`);
		}, [
			navigate,
			isPaid,
			isRegistrationFlow,
			isSimpananFlow,
			billData,
			categoryName,
			category,
			product,
			productName,
			isPelunasan,
			financingId,
			returnPage,
			registrationId,
			originalReturn,
			id
		]),
		returnPageName,
		isRegistrationFlow,
		isSimpananFlow,
		isPelunasan
	};
};
//#endregion
//#region src/pages/global/InvoicePage/hooks/usePaymentEventListener.js
var usePaymentEventListener = ({ refreshData, setIsProcessing }) => {
	const hasShownSuccessSwal = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const handlePaymentComplete = () => {
			if (hasShownSuccessSwal.current) return;
			hasShownSuccessSwal.current = true;
			if (document.querySelector("#jokul-close-button") || document.querySelector(".jokul-close") || document.querySelector("iframe[src*='doku.com']")) try {
				if (typeof window.destroyJokulCheckout === "function") window.destroyJokulCheckout();
				else {
					const iframe = document.querySelector("iframe[src*='doku.com']");
					if (iframe && iframe.parentElement) iframe.parentElement.remove();
				}
			} catch (e) {
				console.warn("Failed to close DOKU modal:", e);
			}
			import_sweetalert2_all.default.fire({
				icon: "success",
				title: "Pembayaran Berhasil!",
				text: "Pembayaran Anda telah diterima dan diverifikasi oleh sistem.",
				confirmButtonText: "Selesai",
				confirmButtonColor: "#10b981",
				allowOutsideClick: false
			});
			setTimeout(async () => {
				if (window.snap && window.snap.hide) window.snap.hide();
				if (refreshData) await refreshData();
				if (setIsProcessing) setIsProcessing(false);
			}, 1500);
		};
		window.addEventListener("CLOSE_SNAP_POPUP", handlePaymentComplete);
		window.addEventListener("PAYMENT_SUCCESSFUL", handlePaymentComplete);
		return () => {
			window.removeEventListener("CLOSE_SNAP_POPUP", handlePaymentComplete);
			window.removeEventListener("PAYMENT_SUCCESSFUL", handlePaymentComplete);
		};
	}, [refreshData, setIsProcessing]);
};
//#endregion
//#region src/pages/global/InvoicePage/pages/InvoicePage.jsx
var InvoicePage = () => {
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const [paymentInstruction, setPaymentInstruction] = (0, import_react.useState)(null);
	const { billData, loading, error, totalAmount, billItemIds, financingId, category, returnPage, registrationId, categoryName, originalReturn, startPolling, stopPolling, refreshData, status, product, productName, id, setDynamicBillId } = useInvoiceData();
	usePaymentEventListener({
		refreshData,
		setIsProcessing
	});
	const isPaid = billData?.status === "PAID" || status === "success";
	const { handleNavigateBack, returnPageName } = useInvoiceNavigation({
		billData,
		isPaid,
		returnPage,
		registrationId,
		category,
		categoryName,
		originalReturn,
		financingId,
		product,
		productName,
		id
	});
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceLoading, {});
	if (error || !billData && !loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceError, {
		error,
		onBack: handleNavigateBack
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		fluid: true,
		className: "py-3 px-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceHeader, {
				onBack: handleNavigateBack,
				onPrint: () => window.print()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceStatusBadge, {
				isPaid,
				status: billData?.status
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceCard, {
				billData,
				totalAmount,
				isPaid
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceActions, {
				isPaid,
				billData,
				totalAmount,
				billItemIds,
				category,
				financingId,
				onBack: handleNavigateBack,
				returnPageName,
				onPaymentSubmitted: (result) => {
					if (result?.bill_id) setDynamicBillId(result.bill_id);
					if (refreshData) refreshData();
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvoiceFooter, {})
		]
	});
};
//#endregion
export { InvoicePage as default };
