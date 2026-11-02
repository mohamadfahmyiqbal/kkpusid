import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime, r as require_html2pdf } from "./vendor-rpDlma0K.js";
import { $t as FaDownload, E as Button, Pr as useNavigate, S as Card_default, Un as FaPrint, b as Container, bt as FaArrowLeft, c as Spinner, l as Row, o as Table, qn as FaRegFileAlt, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as motion } from "./vendor-framer-fx3iiH1e.js";
import { t as api } from "./common-qX05v8MF.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
//#region src/pages/global/ReceiptPage/components/ReceiptHeaderActions.jsx
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_html2pdf = /* @__PURE__ */ __toESM(require_html2pdf());
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReceiptHeaderActions({ onBack, onPrint, onDownloadPDF }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex justify-content-between align-items-center mb-4 no-print flex-wrap gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "light",
			className: "rounded-pill px-4 fw-semibold border shadow-sm text-secondary d-flex align-items-center",
			onClick: onBack,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }), " Kembali"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline-secondary",
				className: "rounded-pill px-4 fw-semibold shadow-sm d-flex align-items-center",
				onClick: onPrint,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPrint, { className: "me-2" }), " Cetak Resi"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "primary",
				className: "rounded-pill px-4 fw-semibold shadow-sm d-flex align-items-center",
				onClick: onDownloadPDF,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaDownload, { className: "me-2" }), " Download PDF"]
			})]
		})]
	});
}
//#endregion
//#region src/pages/global/ReceiptPage/components/ReceiptBanner.jsx
function ReceiptBanner({ isWithdrawal, isPaid }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "position-absolute no-print",
		style: {
			top: "-50px",
			right: "-50px",
			width: "200px",
			height: "200px",
			borderRadius: "50%",
			background: isPaid ? "rgba(40, 167, 69, 0.05)" : "rgba(0, 123, 255, 0.05)",
			zIndex: 0
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-5 position-relative bg-gradient-success text-white",
		style: {
			background: "linear-gradient(45deg, #28a745, #20c997)",
			zIndex: 1
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "fw-bold mb-1 text-white",
					children: [
						"RESI ",
						isWithdrawal ? "PENARIKAN" : "PINJAMAN",
						" BERHASIL"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "opacity-75 mb-0 text-white",
					children: "Transaksi telah disetujui dan diproses oleh koperasi"
				})
			]
		})
	})] });
}
//#endregion
//#region src/pages/global/ReceiptPage/components/receiptHelpers.js
var API_BASE_URL = "https://api.kkpus.id/api";
var formatCurrency = (amount) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	}).format(amount || 0);
};
var formatDate = (dateString) => {
	if (!dateString) return "-";
	const date = new Date(dateString);
	if (isNaN(date.getTime())) return "-";
	return date.toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
};
//#endregion
//#region src/pages/global/ReceiptPage/components/ReceiptMemberInfo.jsx
function ReceiptMemberInfo({ receiptData, isWithdrawal }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
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
						children: receiptData.member?.full_name || receiptData.member?.name || "-"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-primary fw-semibold mb-0",
						children: receiptData.member?.member_no || receiptData.member?.memberId || "-"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						className: "text-muted d-block mt-1",
						children: ["Email: ", receiptData.member?.email || "-"]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			md: 6,
			className: "text-md-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-uppercase text-muted fw-bold ls-1 d-block mb-2",
					children: "Detail Transaksi:"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
					className: "fw-bold text-dark mb-1",
					children: ["#", isWithdrawal ? receiptData.id || receiptData.withdrawal_id || "-" : receiptData.financing_id || "-"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
					className: "text-muted d-block fw-medium",
					children: ["Kategori: ", isWithdrawal ? receiptData.account?.product?.name || receiptData.category || "Penarikan Simpanan" : receiptData.akad_type || "Murabahah"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
					className: "text-muted d-block fw-medium",
					children: ["Tanggal: ", formatDate(receiptData.createdAt)]
				})
			] })
		})]
	});
}
//#endregion
//#region src/pages/global/ReceiptPage/components/ReceiptDetailsTable.jsx
function ReceiptDetailsTable({ receiptData, isWithdrawal, isPendanaanSyariah }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "table-responsive-custom mb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
			borderless: true,
			className: "align-middle mb-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-bottom border-2 border-light",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-3 px-2 text-muted small text-uppercase fw-bold ls-1",
					style: { width: "60%" },
					children: "DESKRIPSI ITEM"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "py-3 px-2 text-end text-muted small text-uppercase fw-bold ls-1",
					children: "KETERANGAN"
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-bottom border-light",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold text-dark",
							children: isPendanaanSyariah ? "Target Dana yang Dibutuhkan" : `Jumlah ${isWithdrawal ? "Penarikan" : "Pinjaman"}`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: "Nominal transaksi yang diajukan"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-4 px-2 text-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold text-dark h5 mb-0",
							children: formatCurrency(isWithdrawal ? receiptData.amount : receiptData.amount_requested)
						})
					})]
				}),
				isPendanaanSyariah && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-bottom border-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark",
								children: "Nama Usaha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted",
								children: "Identitas bisnis UMKM"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-4 px-2 text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark h5 mb-0",
								children: receiptData.business_name || receiptData.business_profile?.business_name || "-"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-bottom border-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark",
								children: "Sektor Bisnis Utama"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted",
								children: "Kategori industri/bidang usaha"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-4 px-2 text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark h6 mb-0",
								children: receiptData.business_sector || receiptData.business_profile?.business_sector || "-"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-bottom border-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark",
								children: "Alamat Tempat Usaha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted",
								children: "Lokasi operasional bisnis"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-4 px-2 text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark h6 mb-0 text-wrap",
								style: {
									maxWidth: "300px",
									display: "inline-block"
								},
								children: receiptData.business_address || receiptData.business_profile?.business_address || "-"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-bottom border-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark",
								children: "Estimasi Omset Tahunan Saat Ini"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted",
								children: "Pendapatan kotor setahun"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-4 px-2 text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark h5 mb-0",
								children: formatCurrency(receiptData.estimated_yearly_turnover || receiptData.business_profile?.monthly_revenue * 12 || 0)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-bottom border-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark",
								children: "Tujuan Penggunaan Dana"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted",
								children: "Rencana alokasi dana"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-4 px-2 text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark h6 mb-0 text-wrap",
								style: {
									maxWidth: "300px",
									display: "inline-block"
								},
								children: receiptData.purpose || receiptData.funding_purpose || "-"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-bottom border-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark",
								children: "Estimasi Omset (Bulanan)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted",
								children: "Selama periode pendanaan"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-4 px-2 text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-bold text-dark h5 mb-0",
								children: formatCurrency(receiptData.estimated_monthly_turnover || receiptData.business_profile?.monthly_revenue || 0)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-bottom border-light",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-4 px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark",
								children: "Tawaran Bagi Hasil Investor"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted",
								children: "Persentase bagi hasil keuntungan"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-4 px-2 text-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-success h5 mb-0",
								children: [receiptData.investor_profit_share || receiptData.profit_share || 0, "%"]
							})
						})]
					})
				] }),
				!isWithdrawal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-bottom border-light",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold text-dark",
							children: isPendanaanSyariah ? "Periode Pengembalian Modal" : "Jangka Waktu"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: isPendanaanSyariah ? "Durasi pendanaan" : "Durasi pinjaman"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-4 px-2 text-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "fw-bold text-dark h5 mb-0",
							children: [receiptData.cooperation_months || 0, " Bulan"]
						})
					})]
				}), !isPendanaanSyariah && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-bottom border-light",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold text-dark",
							children: "Angsuran per Bulan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: "Kewajiban bulanan"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-4 px-2 text-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold text-dark h5 mb-0",
							children: formatCurrency(receiptData.monthly_installment)
						})
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-bottom border-light",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold text-dark",
							children: "Metode Pencairan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: "Cara penyaluran dana"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-4 px-2 text-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold text-dark h5 mb-0",
							children: isWithdrawal ? receiptData.method || "Transfer" : receiptData.metode_pencairan || "Tunai"
						})
					})]
				}),
				(isWithdrawal && receiptData.method !== "TUNAI" || !isWithdrawal && receiptData.metode_pencairan !== "Tunai") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-bottom border-light",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold text-dark",
							children: "Tujuan Pencairan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: "Bank dan Nomor Rekening"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 px-2 text-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold text-dark h6 mb-1",
								children: isWithdrawal ? receiptData.bank_name || receiptData.bank?.bankName || "-" : receiptData.bank_tujuan || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
								className: "text-muted d-block",
								children: isWithdrawal ? receiptData.bank_account_no || receiptData.bank?.accountNo || "-" : receiptData.no_rekening || "-"
							}),
							isWithdrawal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "text-muted d-block",
								children: ["a.n. ", receiptData.bank_account_name || receiptData.bank?.accountName || "-"]
							})
						]
					})]
				}),
				!isWithdrawal && receiptData.metode_pencairan === "Tunai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-bottom border-light",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-4 px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold text-dark",
							children: "Lokasi Pencairan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: "Tempat pengambilan dana"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-4 px-2 text-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold text-dark h5 mb-0",
							children: receiptData.lokasi_pencairan || "-"
						})
					})]
				})
			] })]
		})
	});
}
//#endregion
//#region src/pages/global/ReceiptPage/components/ProtectedFileViewer.jsx
function ProtectedFileViewer({ url, title, isImage = false, className = "", style = {} }) {
	const [blobUrl, setBlobUrl] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let objectUrl = null;
		const fetchFile = async () => {
			try {
				setLoading(true);
				const token = localStorage.getItem("token");
				const headers = token ? { Authorization: `Bearer ${token}` } : {};
				const response = await fetch(url, { headers });
				if (!response.ok) throw new Error("Gagal mengunduh berkas");
				const blob = await response.blob();
				objectUrl = URL.createObjectURL(blob);
				setBlobUrl(objectUrl);
			} catch (err) {
				console.error("Failed to load protected file:", err);
				setError(err);
			} finally {
				setLoading(false);
			}
		};
		if (url && url !== "#") fetchFile();
		else setLoading(false);
		return () => {
			if (objectUrl) URL.revokeObjectURL(objectUrl);
		};
	}, [url]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex align-items-center justify-content-center w-100 p-4 bg-light text-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			size: "sm",
			animation: "border",
			className: "me-2"
		}), " Memuat berkas..."]
	});
	if (error || !url || url === "#") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex align-items-center justify-content-center w-100 p-4 bg-light text-danger small",
		children: "Gagal memuat berkas"
	});
	if (isImage) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: blobUrl,
		alt: title,
		className,
		style
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		src: blobUrl,
		title,
		style: {
			width: "100%",
			height: "100%",
			border: "none",
			...style
		}
	});
}
//#endregion
//#region src/pages/global/ReceiptPage/components/ReceiptLegalDocuments.jsx
function ReceiptLegalDocuments({ receiptData }) {
	const getFileUrl = (transaction, type) => {
		const txId = transaction?.id || transaction?.financing_id;
		if (!txId) return "#";
		let url = `${api?.defaults?.baseURL || "https://api.kkpus.id/api"}/financing/evidence/${txId}/download`;
		if (type) url += `?type=${type}`;
		return url;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: "text-uppercase text-muted fw-bold ls-1 mb-3",
			children: "Dokumen Legalitas & Pendukung"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "gy-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					md: 4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border rounded overflow-hidden shadow-sm bg-light",
						style: { height: "300px" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedFileViewer, {
							url: receiptData.file_evidence ? getFileUrl(receiptData, "evidence") : "#",
							title: "Bukti Kepemilikan"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-2 fw-semibold text-dark small",
						children: "Bukti Kepemilikan Usaha"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					md: 4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border rounded overflow-hidden shadow-sm bg-light",
						style: { height: "300px" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedFileViewer, {
							url: receiptData.contract_proof ? getFileUrl(receiptData, "contract_proof") : "#",
							title: "Bukti Kerjasama"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-2 fw-semibold text-dark small",
						children: "Bukti Kerjasama / Kontrak"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					md: 4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border rounded overflow-hidden shadow-sm bg-light",
						style: { height: "300px" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedFileViewer, {
							url: receiptData.additional_documents ? getFileUrl(receiptData, "additional_documents") : "#",
							title: "Dokumen Pendukung"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-2 fw-semibold text-dark small",
						children: "Dokumen Pendukung Tambahan"
					})]
				})
			]
		})]
	});
}
//#endregion
//#region src/pages/global/ReceiptPage/components/ReceiptApprovalChain.jsx
function ReceiptApprovalChain({ approvalFlags }) {
	const steps = [
		{
			role: "Pengawas",
			done: approvalFlags.is_approved_pengawas
		},
		{
			role: "Ketua",
			done: approvalFlags.is_approved_ketua
		},
		{
			role: "Bendahara",
			done: approvalFlags.is_approved_bendahara
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
		className: "text-uppercase text-muted fw-bold ls-1 mb-3",
		children: "Status Persetujuan"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
		className: "mb-5 gy-3",
		children: steps.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			xs: 4,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `p-3 rounded-4 text-center h-100 d-flex flex-column justify-content-center align-items-center ${step.done ? "bg-success bg-opacity-10 border border-success border-opacity-25" : "bg-light border"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mb-2 ${step.done ? "text-success" : "text-muted"}`,
						children: step.done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "spinner-grow spinner-grow-sm",
							role: "status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "visually-hidden",
								children: "Loading..."
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "d-block fw-bold text-dark mb-1",
						children: step.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: `fw-medium ${step.done ? "text-success" : "text-muted"}`,
						children: step.done ? "Disetujui" : "Menunggu"
					})
				]
			})
		}, idx))
	})] });
}
//#endregion
//#region src/pages/global/ReceiptPage/components/ReceiptTransferProof.jsx
function ReceiptTransferProof({ receiptData, isWithdrawal }) {
	if (!(isWithdrawal && receiptData.method !== "TUNAI" || !isWithdrawal && receiptData.metode_pencairan !== "Tunai")) return null;
	const getProofUrl = () => {
		if (!receiptData?.transfer_proof_path) return null;
		let path = receiptData.transfer_proof_path;
		if (path.startsWith("/")) path = path.slice(1);
		if (path.startsWith("uploads/")) return `${API_BASE_URL}/${path.replace(/^uploads\//, "uploads/")}`;
		return `${API_BASE_URL}/${path}`;
	};
	const proofUrl = getProofUrl();
	const isProofPdf = receiptData?.transfer_proof_path?.toLowerCase().endsWith(".pdf");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 pt-4 border-top",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
			className: "text-uppercase text-muted fw-bold ls-1 mb-3",
			children: "Lampiran Bukti Transfer"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center mb-4",
			children: [proofUrl ? isProofPdf ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border rounded overflow-hidden shadow-sm bg-light w-100",
				style: { height: "800px" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedFileViewer, {
					url: proofUrl,
					title: "Bukti Transfer"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProtectedFileViewer, {
				url: proofUrl,
				title: "Bukti Transfer",
				isImage: true,
				className: "img-fluid rounded-4 border shadow-sm",
				style: {
					maxHeight: "300px",
					objectFit: "contain"
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 border rounded-4 d-inline-block bg-light shadow-sm text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-0",
					children: "Belum ada bukti transfer yang diunggah."
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-muted small",
				children: "*Bukti transfer ini diunggah oleh Bendahara saat persetujuan."
			})]
		})]
	});
}
//#endregion
//#region src/pages/global/ReceiptPage/components/ReceiptTotalSummary.jsx
function ReceiptTotalSummary({ receiptData, isWithdrawal }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
		className: "justify-content-between align-items-end mt-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			md: 6,
			className: "mb-4 mb-md-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-3 text-muted small",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-light p-2 rounded-3 no-print",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-success" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fw-bold text-dark",
					children: "Transaksi Sah & Teregistrasi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Dicetak pada: ", (/* @__PURE__ */ new Date()).toLocaleString("id-ID")] })] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			md: 5,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 rounded-4 bg-light border-0 shadow-sm overflow-hidden position-relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "position-absolute no-print",
						style: {
							bottom: "-10px",
							right: "-10px",
							opacity: .1,
							transform: "rotate(-15deg)"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaRegFileAlt, { size: 80 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted mb-2 fw-bold small text-uppercase ls-1 position-relative z-1",
						children: ["Total ", isWithdrawal ? "Pencairan" : "Pinjaman"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "fw-bold text-success mb-0 position-relative z-1",
						children: formatCurrency(isWithdrawal ? receiptData.amount : receiptData.amount_requested)
					})
				]
			})
		})]
	});
}
//#endregion
//#region src/pages/global/ReceiptPage/ReceiptPage.jsx
function ReceiptPage({ decodedToken }) {
	const navigate = useNavigate();
	const [receiptData, setReceiptData] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const receiptRef = (0, import_react.useRef)(null);
	const financingId = decodedToken?.financingId;
	const withdrawalId = decodedToken?.withdrawalId;
	const isWithdrawal = !!withdrawalId;
	const fetchReceiptData = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) throw new Error("Token tidak ditemukan. Silakan login kembali.");
			const baseUrl = "https://api.kkpus.id/api".endsWith("/api") ? API_BASE_URL.slice(0, -4) : API_BASE_URL;
			const endpoint = isWithdrawal ? `/api/simpanan/penarikan/detail/${withdrawalId}` : `/api/financing/detail/${financingId}`;
			const response = await fetch(`${baseUrl}${endpoint}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			});
			const result = await response.json();
			if (!response.ok) throw new Error(result.message || "Gagal mengambil data resi");
			return result;
		} catch (error) {
			console.error("Error fetching receipt:", error);
			throw error;
		}
	};
	(0, import_react.useEffect)(() => {
		const loadData = async () => {
			try {
				if (!financingId && !withdrawalId) throw new Error("ID Transaksi tidak ditemukan.");
				const result = await fetchReceiptData();
				const flags = result.data?.approval_status || result.data || {};
				const pengawasDone = flags.is_approved_pengawas || false;
				const ketuaDone = flags.is_approved_ketua || false;
				const bendaharaDone = flags.is_approved_bendahara || false;
				if (!(pengawasDone && ketuaDone && bendaharaDone)) throw new Error("Transaksi belum disetujui sepenuhnya.");
				setReceiptData(result.data);
			} catch (error) {
				import_sweetalert2_all.default.fire({
					icon: "error",
					title: "Gagal Memuat Resi",
					text: error.message,
					confirmButtonText: "Kembali",
					confirmButtonColor: "#dc3545"
				}).then(() => {
					navigate(`/${jwtEncode({ page: "programPage" })}`);
				});
			} finally {
				setIsLoading(false);
			}
		};
		loadData();
	}, [
		financingId,
		withdrawalId,
		isWithdrawal,
		navigate
	]);
	const handleDownloadPDF = () => {
		const element = receiptRef.current;
		if (!element) return;
		import_sweetalert2_all.default.fire({
			title: "Memproses PDF...",
			text: "Mohon tunggu sebentar",
			allowOutsideClick: false,
			didOpen: () => import_sweetalert2_all.default.showLoading()
		});
		const opt = {
			margin: .5,
			filename: `Resi_${isWithdrawal ? "Penarikan" : "Pinjaman"}_${isWithdrawal ? receiptData.id || receiptData.withdrawal_id : receiptData.financing_id}.pdf`,
			image: {
				type: "jpeg",
				quality: .98
			},
			html2canvas: {
				scale: 2,
				useCORS: true,
				logging: false
			},
			jsPDF: {
				unit: "in",
				format: "a4",
				orientation: "portrait"
			}
		};
		(0, import_html2pdf.default)().set(opt).from(element).outputPdf("bloburl").then((pdfUrl) => {
			import_sweetalert2_all.default.close();
			window.open(pdfUrl, "_blank");
		}).catch((err) => {
			import_sweetalert2_all.default.close();
			console.error(err);
			import_sweetalert2_all.default.fire("Error", "Gagal memproses PDF", "error");
		});
	};
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex justify-content-center align-items-center vh-100 bg-light",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
				animation: "grow",
				variant: "primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted fw-semibold",
				children: "Menyiapkan Resi Anda..."
			})]
		})
	});
	if (!receiptData) return null;
	const approvalFlags = receiptData.approval_status || receiptData || {};
	const isPaid = true;
	const isPendanaanSyariah = receiptData?.category === "Pendanaan Syariah UMKM" || receiptData?.category === "Pendanaan Syariah";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		fluid: true,
		className: "py-3 px-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptHeaderActions, {
				onBack: () => navigate(-1),
				onPrint: () => window.print(),
				onDownloadPDF: handleDownloadPDF
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scale: .95
				},
				animate: {
					opacity: 1,
					scale: 1
				},
				transition: { duration: .4 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: receiptRef,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "border-0 shadow-lg rounded-4 overflow-hidden position-relative print-area bg-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptBanner, {
							isWithdrawal,
							isPaid
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5 position-relative",
							style: { zIndex: 1 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptMemberInfo, {
									receiptData,
									isWithdrawal
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptDetailsTable, {
									receiptData,
									isWithdrawal,
									isPendanaanSyariah
								}),
								isPendanaanSyariah && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptLegalDocuments, { receiptData }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptApprovalChain, { approvalFlags }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptTransferProof, {
									receiptData,
									isWithdrawal
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptTotalSummary, {
									receiptData,
									isWithdrawal
								})
							]
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-5 d-print-none opacity-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
					className: "text-muted",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Koperasi Digital - System Generated Receipt"
					]
				})
			})
		]
	});
}
//#endregion
export { ReceiptPage as default };
