import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { A as MdAccountBalance, E as Button, H as MdChevronRight, J as MdHandshake, L as MdCached, M as MdAddCircleOutline, Pr as useNavigate, V as MdCheckCircle, Y as MdHistory, Z as MdInfoOutline, dt as MdSearch, g as Form_default, gt as MdStorefront, k as MdAccessTime, st as MdReceiptLong, z as MdCancel } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as Button$1 } from "./Button-DpYzkz3l.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as uJualBeli } from "./UJualBeli-CQrsKJbc.js";
import { t as Card } from "./Card-DeCk4TVr.js";
/* empty css                               */
//#region src/pages/jualBeli/components/JualBeliSkeleton.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var JualBeliSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "animate-pulse",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-4 w-100 mb-4 skeleton-card" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "row g-3 mb-4 px-2",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "col-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-3 w-100 skeleton-stat" })
			}, i))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex flex-column gap-3 mb-4 px-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-pill w-100 skeleton-search" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-pill skeleton-filter-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-pill skeleton-filter-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-pill skeleton-filter-3" })
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "placeholder col-3 mb-3 rounded skeleton-title" }), [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-3 mb-3 p-3 bg-white rounded-3 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-circle skeleton-avatar" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-grow-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "placeholder col-8 mb-1 rounded skeleton-line-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "placeholder col-4 rounded skeleton-line-2" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "placeholder col-3 rounded skeleton-line-3" })
				]
			}, i))]
		})
	]
});
//#endregion
//#region src/pages/jualBeli/components/SummaryStateCard.jsx
var SummaryStateCard = ({ isApproved, approvedFinancing, hasPending, transactions, handleGoToSetoran, handleGoToPelunasan, handleGoToFormPembelian, handleGoToDetail }) => {
	if (isApproved) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		variant: "premium",
		theme: "primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, {
			className: "p-4 relative",
			style: { zIndex: 2 },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalance, {
							size: 14,
							className: "text-light"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold tracking-wider card-type-label",
							children: "INFORMASI PEMBIAYAAN"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "premium-status-badge",
						children: "AKTIF"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-saldo-display mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "small opacity-75 mb-1 fw-medium",
						children: "Total Terbayar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "fw-bold mb-0 text-white font-outfit card-amount-value",
						style: { fontSize: "30px" },
						children: ["Rp ", Number(approvedFinancing?.paid_amount || 0).toLocaleString("id-ID")]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "row g-3 mb-4 pt-3 border-top border-white border-opacity-10 text-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
								children: "NAMA PRODUK"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-bold small text-white-90",
								children: approvedFinancing?.description || "Item"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
								children: "CICILAN / BULAN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fw-bold small text-white-90",
								children: ["Rp ", (() => {
									const dp = Number(approvedFinancing?.down_payment || 0);
									const total = Number(approvedFinancing?.item_price || approvedFinancing?.amount_requested || 0) + Number(approvedFinancing?.operational_cost || 0) + Number(approvedFinancing?.margin_amount || 0);
									const tenure = parseInt(approvedFinancing?.tenure || approvedFinancing?.term_months || approvedFinancing?.cooperation_months || 1);
									return Math.ceil((total - dp) / tenure);
								})().toLocaleString("id-ID")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-uppercase opacity-50 fw-bold mb-1 card-grid-label",
								children: "SISA TAGIHAN"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "fw-bold small text-white-90",
								children: ["Rp ", (() => {
									const dp = Number(approvedFinancing?.down_payment || 0);
									const total = Number(approvedFinancing?.item_price || approvedFinancing?.amount_requested || 0) + Number(approvedFinancing?.operational_cost || 0) + Number(approvedFinancing?.margin_amount || 0);
									const tenure = parseInt(approvedFinancing?.tenure || approvedFinancing?.term_months || approvedFinancing?.cooperation_months || 1);
									Math.ceil((total - dp) / tenure);
									const cicilanTerbayar = approvedFinancing?.paid_installment_amount !== void 0 ? Number(approvedFinancing.paid_installment_amount) : Math.max(0, Number(approvedFinancing?.paid_amount || 0) - dp);
									return approvedFinancing?.unpaid_amount !== void 0 ? Number(approvedFinancing.unpaid_amount) : Math.max(0, total - dp - cicilanTerbayar);
								})().toLocaleString("id-ID")]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex gap-2 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "premium",
						className: "w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2",
						onClick: handleGoToSetoran,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAddCircleOutline, { size: 20 }), " Bayar Setoran"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "premium-outline",
						className: "w-100 rounded-3 py-2.5 d-flex align-items-center justify-content-center gap-2",
						onClick: handleGoToPelunasan,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalance, { size: 20 }), " Pelunasan"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "d-flex",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "link",
						className: "w-100 border-0 rounded-3 py-2 fw-semibold text-white-50 d-flex align-items-center justify-content-center gap-2 text-decoration-none",
						style: { fontSize: "0.8rem" },
						onClick: () => handleGoToDetail(approvedFinancing?.financing_id || approvedFinancing?.financingId || approvedFinancing?.id),
						children: "Lihat Detail Pengajuan"
					})
				})
			]
		})
	});
	if (hasPending) {
		const pendingTx = transactions.find((t) => t.status === "PENDING");
		const pendingId = pendingTx?.financing_id || pendingTx?.financingId || pendingTx?.id;
		const pendingDesc = pendingTx?.description || "Pengajuan Pembiayaan Murabahah";
		const pendingAmount = pendingTx?.nominal_kredit || pendingTx?.nominal_debet || 0;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			variant: "premium",
			theme: "warning",
			className: "text-center p-4 p-md-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, {
				className: "relative",
				style: { zIndex: 2 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pending-radar-pulse mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-warning bg-opacity-15 p-4 rounded-circle text-warning",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCached, {
								size: 48,
								className: "animate-spin-slow"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "fw-bold mb-2 text-white",
						children: "Pengajuan Sedang Diproses"
					}),
					pendingAmount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-3 py-2 px-4 rounded-pill d-inline-block blur-effect",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small opacity-75 d-block text-uppercase fw-bold",
							style: {
								fontSize: "9px",
								letterSpacing: "0.5px"
							},
							children: "Nominal Pengajuan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
							className: "text-warning font-outfit",
							style: { fontSize: "18px" },
							children: ["Rp ", Number(pendingAmount).toLocaleString("id-ID")]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "opacity-90 mb-4 px-3 pending-card-desc text-white-90",
						children: [pendingDesc, ". Mohon tunggu verifikasi admin koperasi. Kami sedang memproses berkas Anda secara berkala."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "stepper-container mb-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "stepper-line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stepper-line-progress",
									style: { width: "50%" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stepper-step completed",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stepper-node",
									children: "✓"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stepper-label",
									children: "Pengajuan"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stepper-step active",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stepper-node",
									children: "2"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stepper-label",
									children: "Verifikasi"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "stepper-step",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stepper-node",
									children: "3"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "stepper-label",
									children: "Pencairan"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						variant: "premium",
						className: "rounded-pill px-5 py-2",
						onClick: () => handleGoToDetail(pendingId),
						children: "Lihat Detail Pengajuan"
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		variant: "premium",
		theme: "primary",
		className: "text-center p-4 p-md-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card-decor-circle c1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "card-decor-circle c2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, {
				className: "relative",
				style: { zIndex: 2 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 text-white opacity-90",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdHandshake, {
							size: 56,
							className: "animate-pulse"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "fw-bold mb-2",
						children: "Mulai Pengajuan Pembiayaan"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "opacity-80 mb-4 px-3 empty-card-desc",
						children: "Dapatkan barang kebutuhan Anda secara syariah dengan akad Murabahah yang mudah, adil, dan transparan."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "benefits-grid mb-5 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "benefit-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-icon-wrapper",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdHandshake, { size: 22 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-title",
										children: "100% Syariah"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-desc",
										children: "Akad transparan Murabahah tanpa bunga riba."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "benefit-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-icon-wrapper",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdReceiptLong, { size: 22 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-title",
										children: "Proses Instan"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-desc",
										children: "Pengajuan online cepat langsung diverifikasi admin."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "benefit-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-icon-wrapper",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalance, { size: 22 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-title",
										children: "Limit Sesuai"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "benefit-desc",
										children: "Limit pembiayaan bersahabat kapasitas finansial Anda."
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
						variant: "premium",
						className: "rounded-pill px-5 py-2.5 d-inline-flex align-items-center gap-2",
						onClick: handleGoToFormPembelian,
						children: ["Buat Pengajuan Baru ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAddCircleOutline, { size: 18 })]
					})
				]
			})
		]
	});
};
//#endregion
//#region src/pages/jualBeli/components/SearchFilter.jsx
var SearchFilter = ({ searchQuery, setSearchQuery, activeTab, setActiveTab, tabCounts }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bg-white rounded-4 p-3 shadow-sm border-light-1",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex flex-column gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "search-wrapper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdSearch, {
					size: 22,
					className: "search-icon text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					type: "text",
					placeholder: "Cari deskripsi atau tipe transaksi...",
					value: searchQuery,
					onChange: (e) => setSearchQuery(e.target.value),
					className: "search-input border-0 py-2 ps-5 rounded-3 bg-light-soft"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "filter-tabs d-flex align-items-center gap-2 overflow-x-auto pb-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("all"),
						className: `filter-tab-btn ${activeTab === "all" ? "active" : ""}`,
						children: ["Semua", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-badge",
							children: tabCounts.all
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("active"),
						className: `filter-tab-btn ${activeTab === "active" ? "active" : ""}`,
						children: ["Berjalan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-badge",
							children: tabCounts.active
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("completed"),
						className: `filter-tab-btn ${activeTab === "completed" ? "active" : ""}`,
						children: ["Selesai", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tab-badge",
							children: tabCounts.completed
						})]
					})
				]
			})]
		})
	});
};
//#endregion
//#region src/pages/jualBeli/components/JualBeliItem.jsx
var JualBeliItem = import_react.memo(({ item, onClick }) => {
	const isCompleted = item.status === "COMPLETED" || item.status === "PAID" || item.status === "LUNAS";
	const isPending = item.status === "PENDING";
	const isRejected = item.status === "REJECTED";
	const amount = Number(item.total_tagihan || item.amount_requested || item.item_price || 0);
	const getStatusBadge = () => {
		if (isCompleted) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCheckCircle, { size: 12 }), " Selesai"]
		});
		if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "badge bg-warning bg-opacity-15 text-warning border border-warning border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccessTime, { size: 12 }), " Menunggu"]
		});
		if (isRejected) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCancel, { size: 12 }), " Ditolak"]
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "badge bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25 rounded-pill px-2 py-0.5 small d-inline-flex align-items-center gap-1",
			children: item.status || "Aktif"
		});
	};
	const formattedDate = item.created_at ? new Date(item.created_at).toLocaleDateString("id-ID", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}) : "Baru Saja";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dc-trans-row p-3 d-flex align-items-center gap-3 border-bottom cursor-pointer transition-all",
		onClick: () => onClick(item.financing_id || item.id),
		style: { textDecoration: "none" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 ${isCompleted ? "bg-success bg-opacity-10 text-success" : isPending ? "bg-warning bg-opacity-15 text-warning" : "bg-primary bg-opacity-10 text-primary"}`,
				style: {
					width: "42px",
					height: "42px"
				},
				children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCheckCircle, { size: 22 }) : isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccessTime, { size: 22 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdStorefront, { size: 22 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dc-trans-info flex-grow-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "dc-trans-title text-truncate text-dark fw-bold",
						style: { fontSize: "14px" },
						children: item.purpose || item.category || item.item_name || "Pembiayaan Jual Beli"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `dc-trans-amount fw-bold font-outfit text-nowrap ${isCompleted ? "text-success" : "text-primary"}`,
						style: { fontSize: "15px" },
						children: ["Rp ", amount.toLocaleString("id-ID")]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted small",
						style: { fontSize: "12px" },
						children: formattedDate
					}), getStatusBadge()]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdChevronRight, {
				size: 20,
				className: "text-muted opacity-40 flex-shrink-0"
			})
		]
	});
});
JualBeliItem.displayName = "JualBeliItem";
//#endregion
//#region src/pages/jualBeli/components/JualBeliHistory.jsx
var JualBeliHistory = import_react.memo(({ filteredTransactions, transactions, handleResetFilters, handleGoToDetail }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex align-items-center justify-content-between mb-3 px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdHistory, {
				size: 20,
				className: "text-primary"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 history-header-title",
				children: "Riwayat Transaksi"
			})]
		}), filteredTransactions.length !== transactions.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted small",
			children: [
				"Menampilkan ",
				filteredTransactions.length,
				" dari ",
				transactions.length
			]
		})]
	}), filteredTransactions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dc-trans-list shadow-sm rounded-4 bg-white overflow-hidden border-light-1",
		children: filteredTransactions.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JualBeliItem, {
			item: t,
			onClick: handleGoToDetail
		}, t.financing_id || t.id || idx))
	}) : transactions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-5 bg-white rounded-4 shadow-sm border border-dashed mx-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdSearch, {
				size: 48,
				className: "opacity-15 text-muted mb-2 animate-pulse"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-semibold text-muted mb-1",
				children: "Transaksi Tidak Ditemukan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted mb-3 small px-3",
				children: "Tidak ada hasil yang sesuai dengan kata kunci pencarian atau filter Anda."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline-primary",
				size: "sm",
				onClick: handleResetFilters,
				className: "rounded-pill px-4",
				children: "Reset Filter"
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-5 bg-white rounded-4 shadow-sm border border-dashed mx-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdReceiptLong, {
			size: 48,
			className: "opacity-10 mb-2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted mb-0 small",
			children: "Belum ada riwayat transaksi."
		})]
	})] });
});
//#endregion
//#region src/pages/jualBeli/JualBeliDashboardPage.jsx
var JualBeliDashboardPage = () => {
	const navigate = useNavigate();
	const [transactions, setTransactions] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("all");
	const fetchTransactionData = (0, import_react.useCallback)(async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await uJualBeli.getFinancingHistory({ type: "jualbeli" });
			if (response.data?.status) {
				const responseData = response.data.data;
				setTransactions(Array.isArray(responseData) ? responseData : responseData?.transactions || []);
			}
		} catch (err) {
			setError("Gagal memuat data transaksi. Silakan coba lagi.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchTransactionData();
	}, [fetchTransactionData]);
	const handleGoToSetoran = () => {
		navigate(`/${jwtEncode({
			page: "billingPage",
			category: "FINANCING",
			financingId: approvedFinancing?.financing_id || approvedFinancing?.id,
			productName: "pembiayaan",
			downPayment: approvedFinancing?.down_payment || 0,
			return: "jualBeliPage"
		})}`);
	};
	const handleGoToPelunasan = () => {
		const fid = approvedFinancing?.financing_id || approvedFinancing?.id;
		const pendingPelunasan = transactions.find((t) => [
			"PENDING",
			"WAITING_PAYMENT",
			"READY_TO_PAY",
			"APPROVED"
		].includes(t.status) && (t.category?.toLowerCase().includes("pelunasan") || t.keterangan?.includes(`PELUNASAN_REF:${fid}`)));
		if (pendingPelunasan) navigate(`/${jwtEncode({
			page: "transactionDetailPage",
			financingId: pendingPelunasan.financing_id || pendingPelunasan.id,
			return: "jualBeliPage"
		})}`);
		else navigate(`/${jwtEncode({
			page: "pelunasanPage",
			financingId: fid,
			return: "jualBeliPage"
		})}`);
	};
	const handleGoToFormPembelian = () => {
		navigate(`/${jwtEncode({
			page: "formPengajuanTransaksi",
			return: "jualBeliPage"
		})}`);
	};
	const handleGoToDetail = (id) => {
		if (!id) return;
		navigate(`/${jwtEncode({
			page: "transactionDetailPage",
			financingId: id,
			return: "jualBeliPage"
		})}`);
	};
	const approvedFinancing = (0, import_react.useMemo)(() => transactions.find((t) => t.status === "APPROVED" && !t.category?.toLowerCase().includes("pelunasan") && !t.keterangan?.startsWith("PELUNASAN_REF:")), [transactions]);
	const isApproved = !!approvedFinancing;
	const hasPending = transactions.some((t) => t.status === "PENDING" && !t.category?.toLowerCase().includes("pelunasan")) && !isApproved;
	const tabCounts = (0, import_react.useMemo)(() => {
		return {
			all: transactions.length,
			active: transactions.filter((t) => t.status === "APPROVED" || t.status === "PENDING").length,
			completed: transactions.filter((t) => t.status === "COMPLETED" || t.status === "PAID").length
		};
	}, [transactions]);
	const filteredTransactions = (0, import_react.useMemo)(() => {
		return transactions.filter((t) => {
			const matchesSearch = (t.purpose || t.category || t.item_name || "Pembiayaan").toLowerCase().includes(searchQuery.toLowerCase());
			let matchesTab = true;
			if (activeTab === "active") matchesTab = t.status === "APPROVED" || t.status === "PENDING";
			else if (activeTab === "completed") matchesTab = t.status === "COMPLETED" || t.status === "PAID";
			return matchesSearch && matchesTab;
		});
	}, [
		transactions,
		searchQuery,
		activeTab
	]);
	const handleResetFilters = () => {
		setSearchQuery("");
		setActiveTab("all");
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JualBeliSkeleton, {})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "trans-page-container pb-5 animate-fade-in",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
					variant: "danger",
					className: "shadow-sm rounded-4 border-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfoOutline, { className: "me-2" }),
						" ",
						error,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "link",
							size: "sm",
							onClick: fetchTransactionData,
							className: "text-danger p-0 ms-2 fw-bold",
							children: "Coba Lagi"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryStateCard, {
					isApproved,
					approvedFinancing,
					hasPending,
					transactions,
					handleGoToSetoran,
					handleGoToPelunasan,
					handleGoToFormPembelian,
					handleGoToDetail
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchFilter, {
					searchQuery,
					setSearchQuery,
					activeTab,
					setActiveTab,
					tabCounts
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JualBeliHistory, {
					filteredTransactions,
					transactions,
					handleResetFilters,
					handleGoToDetail
				})
			})
		]
	});
};
//#endregion
export { JualBeliDashboardPage as default };
