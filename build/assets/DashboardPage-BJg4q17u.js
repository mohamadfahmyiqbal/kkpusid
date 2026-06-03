import{t as e}from"./Col-DxuYZdk2.js";import{t}from"./Container-DdaNF8ij.js";import{t as n}from"./Row-CzTa8_qR.js";import{t as r}from"./Spinner-Bus5rNKI.js";import{A as i,An as a,B as o,Bn as s,C as c,Dt as l,En as u,F as d,Ht as f,Jn as p,K as m,Mt as h,N as g,O as _,Qn as v,Rn as y,S as b,St as x,U as S,Ut as ee,V as te,X as C,Y as w,fr as T,ft as ne,g as E,hr as D,ht as O,k,kt as A,mr as j,n as M,o as N,q as re,rr as P,vr as F,w as I,xr as L,zn as R}from"./index-0Aj5Wkjo.js";import{t as z}from"./sanitization-Dcpq2Jck.js";import{t as B}from"./useRegistrationStatus-ixExSmR6.js";import{t as V}from"./UGlobal-HMscv5dw.js";var H=L(F()),U={CALON_ANGGOTA:1,PENGAWAS:2,KETUA:3,BENDAHARA:4,ANGGOTA_PENUH:5,ANGGOTA_PENUH_ALB:6};U.CALON_ANGGOTA,U.PENGAWAS,U.KETUA,U.BENDAHARA,U.ANGGOTA_PENUH,U.ANGGOTA_PENUH_ALB;var W=e=>e===U.CALON_ANGGOTA,G=e=>e===U.ANGGOTA_PENUH||e===U.ANGGOTA_PENUH_ALB,K=e=>e===U.ANGGOTA_PENUH_ALB,q=e=>e===U.PENGAWAS,J=e=>e===U.KETUA,Y=e=>e===U.BENDAHARA,ie=50,X=new Map,ae=()=>{if(X.size>ie){let e=X.keys().next().value;X.delete(e)}},oe=e=>{let t=Number.parseInt(e,10),n=Number.isNaN(t)?U.CALON_ANGGOTA:t;return{roleId:n,isCandidate:W(n),isFullMember:G(n),isALB:K(n),isPengawas:q(n),isKetua:J(n),isBendahara:Y(n)}},se=e=>(0,H.useMemo)(()=>{if(!e)return null;let t=e.status_id;if(X.has(t))return X.get(t);let n=oe(e.status_id);return ae(),X.set(t,n),n},[e]),ce=()=>V.getFinancialSummary(),Z=T(),le=H.memo(()=>{let{userData:e}=P(),[t,n]=(0,H.useState)(0),[r,i]=(0,H.useState)(!1),[o,s]=(0,H.useState)(!0),[c,l]=(0,H.useState)(!1),u=(0,H.useCallback)(async(t=!1)=>{if(e?.member_id){t?l(!0):s(!0);try{let e=await ce();e.data?.success&&n(e.data.data.totalSavings||0)}catch(e){console.error(`Gagal memuat saldo:`,e)}finally{s(!1),l(!1)}}},[e]);(0,H.useEffect)(()=>{u()},[u]);let d=(0,H.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(t||0),[t]),m=e?.member_no||e?.member_id||`-`,h=e?.bank_account_no||e?.bank_info?.bank_account_no||`0000000000000`;return o?(0,Z.jsx)(`div`,{className:`financial-section mb-4`,children:(0,Z.jsx)(`div`,{className:`card border-0 shadow-lg`,style:{background:`linear-gradient(135deg, #075985 0%, #0369a1 100%)`,borderRadius:`20px`,color:`white`,minHeight:`220px`},children:(0,Z.jsx)(`div`,{className:`card-body p-4`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsxs)(`div`,{className:`d-flex justify-content-between mb-3`,children:[(0,Z.jsx)(`span`,{className:`placeholder col-4 bg-white bg-opacity-25 rounded`}),(0,Z.jsx)(`span`,{className:`placeholder col-1 bg-white bg-opacity-25 rounded-circle`})]}),(0,Z.jsx)(`span`,{className:`placeholder col-8 mb-4 py-3 bg-white bg-opacity-25 rounded`}),(0,Z.jsxs)(`div`,{className:`mt-4`,children:[(0,Z.jsx)(`span`,{className:`placeholder col-5 mb-2 bg-white bg-opacity-25 rounded d-block`}),(0,Z.jsx)(`span`,{className:`placeholder col-7 bg-white bg-opacity-25 rounded d-block`})]})]})})})}):(0,Z.jsxs)(`div`,{className:`financial-section mb-4 dash-fade-in position-relative`,children:[(0,Z.jsxs)(`div`,{className:`card border-0 shadow-lg overflow-hidden`,style:{background:`linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)`,borderRadius:`20px`,color:`white`,boxShadow:`0 10px 25px -5px rgba(7, 89, 133, 0.4)`,minHeight:`220px`},children:[(0,Z.jsx)(`div`,{style:{position:`absolute`,top:`-20px`,right:`-20px`,width:`120px`,height:`120px`,background:`rgba(255, 255, 255, 0.05)`,borderRadius:`50%`,zIndex:0}}),(0,Z.jsx)(`div`,{style:{position:`absolute`,bottom:`-40px`,left:`10%`,width:`180px`,height:`180px`,background:`rgba(255, 255, 255, 0.03)`,borderRadius:`50%`,zIndex:0}}),(0,Z.jsxs)(`div`,{className:`card-body p-4 position-relative`,style:{zIndex:1},children:[(0,Z.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-1`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center`,style:{width:`32px`,height:`32px`},children:(0,Z.jsx)(v,{size:16})}),(0,Z.jsx)(`h6`,{className:`fw-semibold mb-0 opacity-90`,style:{fontSize:`0.85rem`,letterSpacing:`0.5px`},children:`TOTAL SALDO SIMPANAN`})]}),(0,Z.jsxs)(`div`,{className:`d-flex gap-2`,children:[(0,Z.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${c?`fa-spin`:``}`,onClick:()=>u(!0),disabled:c,"aria-label":`Refresh saldo`,children:(0,Z.jsx)(a,{size:16})}),(0,Z.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all`,onClick:()=>i(!r),"aria-label":r?`Sembunyikan saldo`:`Tampilkan saldo`,children:r?(0,Z.jsx)(ee,{size:18}):(0,Z.jsx)(f,{size:18})})]})]}),(0,Z.jsx)(`div`,{className:`py-3`,children:(0,Z.jsx)(`h2`,{className:`fw-bold mb-0 d-flex align-items-baseline`,style:{letterSpacing:`-0.5px`},children:r?d:(0,Z.jsx)(`span`,{style:{fontSize:`1.8rem`,opacity:.9},children:`Rp ••••••••`})})}),(0,Z.jsxs)(`div`,{className:`row g-3 mt-1`,children:[(0,Z.jsx)(`div`,{className:`col-6 border-end border-white border-opacity-10`,children:(0,Z.jsxs)(`div`,{className:`d-flex align-items-start gap-2`,children:[(0,Z.jsx)(p,{className:`mt-1 opacity-60`,size:14}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`div`,{className:`text-uppercase opacity-60 fw-bold`,style:{fontSize:`10px`,letterSpacing:`0.8px`},children:`ID ANGGOTA`}),(0,Z.jsx)(`div`,{className:`fw-bold`,style:{fontSize:`14px`,letterSpacing:`0.5px`},children:m})]})]})}),(0,Z.jsx)(`div`,{className:`col-6 ps-3`,children:(0,Z.jsxs)(`div`,{className:`d-flex align-items-start gap-2`,children:[(0,Z.jsx)(y,{className:`mt-1 opacity-60`,size:14}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`div`,{className:`text-uppercase opacity-60 fw-bold`,style:{fontSize:`10px`,letterSpacing:`0.8px`},children:`NO. REKENING`}),(0,Z.jsx)(`div`,{className:`fw-bold`,style:{fontSize:`14px`,letterSpacing:`0.5px`},children:h})]})]})})]})]})]}),(0,Z.jsx)(`style`,{children:`
        .transition-all {
          transition: all 0.2s ease-in-out;
        }
        .hover-opacity-100:hover {
          opacity: 1 !important;
          transform: scale(1.1);
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .fa-spin {
          animation: spin 1s linear infinite;
        }
      `})]})}),ue=[{id:`simpanan`,label:`Simpanan`,icon:w,pageKey:`simpananPage`,gradient:`linear-gradient(135deg, #10b981 0%, #059669 100%)`,shadow:`rgba(16, 185, 129, 0.2)`},{id:`transaksi`,label:`Riwayat`,icon:d,pageKey:`transaksiPage`,gradient:`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,shadow:`rgba(59, 130, 246, 0.2)`},{id:`program`,label:`Program`,icon:g,pageKey:`programPage`,gradient:`linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)`,shadow:`rgba(139, 92, 246, 0.2)`},{id:`tabungan`,label:`Tabungan`,icon:c,pageKey:`tabunganPage`,gradient:`linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`,shadow:`rgba(245, 158, 11, 0.2)`},{id:`investasi`,label:`Investasi`,icon:I,pageKey:`investasiPage`,gradient:`linear-gradient(135deg, #ec4899 0%, #db2777 100%)`,shadow:`rgba(236, 72, 153, 0.2)`},{id:`training`,label:`Training`,icon:C,pageKey:`trainingPage`,gradient:`linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)`,shadow:`rgba(6, 182, 212, 0.2)`}],de=H.memo(({isALB:e,isCandidate:t})=>{let n=D(),r=(0,H.useCallback)(e=>{!e||t||n(`/${j({page:e})}`)},[n,t]),i=(0,H.useMemo)(()=>ue.filter(t=>e?![`transaksi`,`program`,`investasi`].includes(t.id):!0),[e]);return(0,Z.jsxs)(`section`,{className:`mb-4 dc-main-menu-section animate-fade-in`,children:[(0,Z.jsx)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Menu Utama`})}),(0,Z.jsx)(`div`,{className:`dc-menu-grid`,children:i.map(e=>{let n=e.icon;return(0,Z.jsxs)(`button`,{type:`button`,className:`dc-menu-item ${t?`is-disabled`:``}`,onClick:()=>r(e.pageKey),disabled:t,"aria-label":`Buka menu ${e.label}`,children:[(0,Z.jsx)(`div`,{className:`dc-menu-icon-wrapper`,style:{background:e.gradient,boxShadow:`0 8px 16px ${e.shadow}`},children:(0,Z.jsx)(n,{size:24})}),(0,Z.jsx)(`span`,{className:`dc-menu-label`,children:e.label})]},e.id)})}),(0,Z.jsx)(`style`,{children:`
        .dc-menu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding: 4px;
        }

        @media (min-width: 992px) {
          .dc-menu-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }

        .dc-menu-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          padding: 8px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          width: 100%;
          border-radius: 16px;
        }

        .dc-menu-item:not(.is-disabled):hover {
          transform: translateY(-5px);
        }

        .dc-menu-item:not(.is-disabled):hover .dc-menu-icon-wrapper {
          transform: scale(1.1);
          filter: brightness(1.1);
        }

        .dc-menu-item.is-disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .dc-menu-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all 0.3s ease;
        }

        .dc-menu-label {
          font-size: 13px;
          font-weight: 700;
          color: #475569;
          text-align: center;
          white-space: nowrap;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .dc-menu-grid {
            gap: 12px;
          }
          .dc-menu-icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 14px;
          }
          .dc-menu-label {
            font-size: 11px;
          }
        }
      `})]})}),fe=H.memo(({item:e,onPay:t})=>{let n=(0,H.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(e.amount||0),[e.amount]);return(0,Z.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Z.jsxs)(`div`,{className:`dc-bill-card`,onClick:()=>t(e.bill_id),children:[(0,Z.jsxs)(`div`,{className:`dc-bill-card-header`,children:[(0,Z.jsx)(`div`,{className:`dc-bill-icon-bg`,children:(0,Z.jsx)(re,{size:18})}),(0,Z.jsx)(`span`,{className:`dc-bill-type`,children:e.tx_type||`TAGIHAN`})]}),(0,Z.jsxs)(`div`,{className:`dc-bill-card-body`,children:[(0,Z.jsx)(`strong`,{className:`dc-bill-desc`,children:e.description||`Pembayaran Tagihan`}),(0,Z.jsx)(`div`,{className:`dc-bill-amount`,children:n})]}),(0,Z.jsxs)(`div`,{className:`dc-bill-card-footer`,children:[(0,Z.jsx)(`span`,{className:`dc-bill-action-text`,children:`Bayar Sekarang`}),(0,Z.jsx)(k,{size:18})]})]})})}),Q=()=>(0,Z.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Z.jsx)(`div`,{className:`dc-bill-card skeleton`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-4 mb-3 rounded`,style:{height:`24px`}}),(0,Z.jsx)(`div`,{className:`placeholder col-10 mb-2 rounded`,style:{height:`16px`}}),(0,Z.jsx)(`div`,{className:`placeholder col-8 rounded`,style:{height:`20px`}})]})})}),pe=()=>{let e=D(),{bills:t,loading:n}=P(),r=(0,H.useCallback)(t=>{t&&e(`/${j({page:`invoicePage`,billId:t,return:`dashboard`})}`)},[e]),i=(0,H.useMemo)(()=>t?.reduce((e,t)=>e+(t.amount||0),0)||0,[t]),a=(0,H.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(i),[i]);return n?(0,Z.jsxs)(`section`,{className:`mb-4 dc-bill-section px-3`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-5 rounded`,style:{height:`24px`}})}),(0,Z.jsxs)(`div`,{className:`dc-bill-scroll-container`,children:[(0,Z.jsx)(Q,{}),(0,Z.jsx)(Q,{})]})]}):(0,Z.jsxs)(`section`,{className:`mb-4 dc-bill-section`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-3`,children:[(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Tagihan Perlu Dibayar`}),t&&t.length>0&&(0,Z.jsxs)(`span`,{className:`badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 fw-bold`,style:{fontSize:`11px`},children:[t.length,` Tagihan`]})]}),t&&t.length>0?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`div`,{className:`px-3 mb-3`,children:(0,Z.jsx)(`div`,{className:`dc-bill-summary-card`,children:(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-3`,children:[(0,Z.jsx)(`div`,{className:`dc-summary-icon`,children:(0,Z.jsx)(S,{size:20})}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`div`,{className:`text-uppercase opacity-70 fw-bold`,style:{fontSize:`10px`,letterSpacing:`0.5px`},children:`TOTAL TUNGGAKAN`}),(0,Z.jsx)(`div`,{className:`fw-bold h5 mb-0 text-danger`,children:a})]})]})})}),(0,Z.jsx)(`div`,{className:`dc-bill-scroll-container`,children:(0,Z.jsxs)(`div`,{className:`dc-bill-scroll-content`,children:[t.map((e,t)=>(0,Z.jsx)(fe,{item:e,onPay:r},`${e.bill_id??`bill`}-${t}`)),(0,Z.jsx)(`div`,{style:{width:`16px`,flexShrink:0}})]})})]}):(0,Z.jsx)(`div`,{className:`px-3`,children:(0,Z.jsxs)(`div`,{className:`dc-empty-bill-card`,children:[(0,Z.jsx)(`div`,{className:`dc-empty-icon-wrapper`,children:(0,Z.jsx)(_,{size:32})}),(0,Z.jsx)(`h6`,{className:`fw-bold mb-1`,children:`Semua Tagihan Terbayar`}),(0,Z.jsx)(`p`,{className:`text-muted mb-0`,style:{fontSize:`12.5px`},children:`Alhamdulillah, Anda tidak memiliki tagihan yang tertunda saat ini.`})]})}),(0,Z.jsx)(`style`,{children:`
        .dc-bill-section {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .dc-bill-scroll-container {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 12px;
          cursor: grab;
        }

        .dc-bill-scroll-container:active {
          cursor: grabbing;
        }

        /* Styled scrollbar for better visibility */
        .dc-bill-scroll-container::-webkit-scrollbar {
          height: 6px;
        }

        .dc-bill-scroll-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .dc-bill-scroll-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
          transition: background 0.2s ease;
        }

        .dc-bill-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .dc-bill-scroll-content {
          display: flex;
          padding: 0 16px;
          gap: 16px;
          width: max-content; /* Ensure content doesn't wrap and forces scroll */
        }

        .dc-bill-item-wrapper {
          flex: 0 0 240px;
          width: 240px;
        }

        .dc-bill-card {
          background: white;
          border-radius: 20px;
          padding: 20px;
          border: 1px solid #f1f5f9;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .dc-bill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border-color: #e2e8f0;
        }

        .dc-bill-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }

        .dc-bill-icon-bg {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: #f8fafc;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dc-bill-type {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dc-bill-card-body {
          flex-grow: 1;
          margin-bottom: 16px;
        }

        .dc-bill-desc {
          display: block;
          font-size: 14px;
          color: #334155;
          margin-bottom: 6px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .dc-bill-amount {
          font-size: 18px;
          font-weight: 800;
          color: #0f172a;
        }

        .dc-bill-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          border-top: 1px dashed #f1f5f9;
          color: #2563eb;
        }

        .dc-bill-action-text {
          font-size: 13px;
          font-weight: 700;
        }

        .dc-bill-summary-card {
          background: #fff5f5;
          border: 1px solid #fee2e2;
          border-radius: 16px;
          padding: 16px;
        }

        .dc-summary-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #fee2e2;
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dc-empty-bill-card {
          background: #f0fdf4;
          border: 1px dashed #bbf7d0;
          border-radius: 20px;
          padding: 32px 24px;
          text-align: center;
        }

        .dc-empty-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #dcfce7;
          color: #22c55e;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .dc-bill-card.skeleton {
          pointer-events: none;
          min-height: 160px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 576px) {
          .dc-bill-item-wrapper {
            flex: 0 0 220px;
            width: 220px;
          }
          .dc-bill-card {
            padding: 16px;
          }
          .dc-bill-amount {
            font-size: 16px;
          }
        }
      `})]})},$=()=>(0,Z.jsxs)(`div`,{className:`container-fluid pb-5`,children:[(0,Z.jsx)(`div`,{className:`mb-4`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-6 mb-2`,style:{height:`2rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-4 mb-3`,style:{height:`1.5rem`}})]})}),(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsx)(`div`,{className:`card-body`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-12 mb-3`,style:{height:`1.5rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`1rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-10 mb-3`,style:{height:`1rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-6`,style:{height:`2.5rem`}})]})})}),(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsx)(`div`,{className:`card-body p-3`,children:(0,Z.jsxs)(`div`,{className:`d-flex align-items-center`,children:[(0,Z.jsx)(`div`,{className:`placeholder me-2`,style:{width:`1rem`,height:`1rem`}}),(0,Z.jsx)(`div`,{className:`placeholder-glow flex-grow-1`,children:(0,Z.jsx)(`div`,{className:`placeholder col-12`,style:{height:`1.2rem`}})})]})})}),(0,Z.jsxs)(`div`,{className:`row g-4 mb-4`,children:[(0,Z.jsxs)(`div`,{className:`col-lg-8`,children:[(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsxs)(`div`,{className:`card-body`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-4`,style:{height:`1.5rem`}})}),(0,Z.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4].map(e=>(0,Z.jsx)(`div`,{className:`col-md-6`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`0.8rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})]})},e))})]})}),(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsxs)(`div`,{className:`card-body`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})}),(0,Z.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4,5,6].map(e=>(0,Z.jsx)(`div`,{className:`col-md-4 col-6`,children:(0,Z.jsx)(`div`,{className:`placeholder-glow`,children:(0,Z.jsx)(`div`,{className:`placeholder`,style:{height:`4rem`}})})},e))})]})})]}),(0,Z.jsx)(`div`,{className:`col-lg-4`,children:(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm`,children:(0,Z.jsxs)(`div`,{className:`card-body`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-8`,style:{height:`1.5rem`}})}),[1,2,3].map(e=>(0,Z.jsx)(`div`,{className:`mb-3`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-12 mb-2`,style:{height:`2rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-10 mb-1`,style:{height:`0.8rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-8`,style:{height:`0.8rem`}})]})},e))]})})})]}),(0,Z.jsxs)(`div`,{className:`text-center py-3`,children:[(0,Z.jsx)(r,{animation:`border`,variant:`primary`,size:`sm`}),(0,Z.jsx)(`small`,{className:`d-block mt-2 text-muted`,children:`Memuat dashboard...`})]})]}),me=H.memo(()=>{let[e,t]=(0,H.useState)(new Date);return(0,H.useEffect)(()=>{let e=setInterval(()=>{t(new Date)},1e3);return()=>clearInterval(e)},[]),(0,Z.jsx)(M,{className:`dc-date-card border-0`,children:(0,Z.jsxs)(M.Body,{className:`d-flex align-items-center gap-3 p-0`,children:[(0,Z.jsx)(O,{}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`mb-1`,children:(e=>e.toLocaleDateString(`id-ID`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}))(e)}),(0,Z.jsx)(`strong`,{children:(e=>e.toLocaleTimeString(`id-ID`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})+` WIB`)(e)})]})]})})}),he=H.memo(({steps:e,onNavigate:t})=>(0,Z.jsxs)(M,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:[(0,Z.jsxs)(M.Header,{className:`bg-transparent border-0 pt-3 px-4 d-flex justify-content-between align-items-center`,children:[(0,Z.jsx)(`h5`,{className:`fw-bold mb-0 text-dark`,style:{fontSize:`15px`},children:`Status Pendaftaran Anggota`}),(0,Z.jsx)(N,{variant:`link`,className:`p-0 text-decoration-none fw-bold`,style:{fontSize:`12px`},onClick:()=>t(`registrationPage`),children:`Lihat Detail`})]}),(0,Z.jsxs)(M.Body,{className:`px-4 pb-3 pt-1`,children:[(0,Z.jsx)(`p`,{className:`text-muted small mb-0`,style:{fontSize:`12px`},children:`Lengkapi semua tahapan untuk menjadi anggota koperasi secara resmi.`}),(0,Z.jsxs)(`div`,{className:`dc-info-box`,style:{padding:`10px 14px`,marginTop:`12px`},children:[(0,Z.jsx)(x,{style:{fontSize:`14px`}}),(0,Z.jsx)(`span`,{style:{fontSize:`11px`,lineHeight:`1.4`},children:`Untuk dapat mengakses keseluruhan fitur. (*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)`})]}),(0,Z.jsx)(`div`,{className:`dc-steps`,style:{marginTop:`16px`},children:e.map(e=>(0,Z.jsxs)(`div`,{className:`dc-step ${e.status}`,style:{padding:`12px 6px`,cursor:e.status===`pending`?`default`:`pointer`},onClick:()=>{e.status!==`pending`&&t(`registrationPage`)},children:[(0,Z.jsx)(`div`,{className:`dc-step-icon`,style:{width:`34px`,height:`34px`,fontSize:`14px`},children:e.icon}),(0,Z.jsx)(`strong`,{className:`fw-bold mt-1 text-center`,style:{fontSize:`11px`,lineHeight:`1.2`,minHeight:`26px`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:e.title}),e.no===2&&e.status===`active`?(0,Z.jsx)(N,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Daftar Sekarang`}):e.no===3&&e.status===`active`?(0,Z.jsx)(N,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Lihat Detail`}):(0,Z.jsx)(`small`,{style:{fontSize:`10px`},className:`opacity-75`,children:e.desc})]},e.no))})]})]})),ge=H.memo(({item:e,onViewMateri:t,onStartEvaluasi:n})=>{let r=e.label===`Program Wajib`,i=(0,H.useMemo)(()=>{switch(e.status){case`Aktif`:return{bg:`#dcfce7`,color:`#15803d`,label:`Tersedia`};case`Selesai`:return{bg:`#dbeafe`,color:`#1e40af`,label:`Selesai`};default:return{bg:`#f1f5f9`,color:`#475569`,label:`Belum Mulai`}}},[e.status]);return(0,Z.jsx)(`div`,{className:`dc-train-card-wrapper h-100`,children:(0,Z.jsx)(M,{className:`dc-train-card-v2 h-100 border-0 shadow-sm`,children:(0,Z.jsxs)(M.Body,{className:`p-4 d-flex flex-column`,children:[(0,Z.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-3`,children:[(0,Z.jsx)(`span`,{className:`dc-badge-program ${r?`wajib`:`pilihan`}`,children:e.label}),(0,Z.jsx)(`span`,{className:`dc-status-pill`,style:{backgroundColor:i.bg,color:i.color},children:i.label})]}),(0,Z.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,Z.jsxs)(`div`,{className:`dc-train-code d-flex align-items-center gap-1 mb-1`,children:[(0,Z.jsx)(te,{size:14,className:`opacity-50`}),(0,Z.jsx)(`span`,{children:e.code})]}),(0,Z.jsx)(`h5`,{className:`dc-train-title mb-3`,children:e.title}),(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4`,children:[(0,Z.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Z.jsx)(o,{size:16}),(0,Z.jsx)(`span`,{children:`1 Materi`})]}),(0,Z.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Z.jsx)(E,{size:16}),(0,Z.jsx)(`span`,{children:`15 Soal`})]})]})]}),(0,Z.jsxs)(`div`,{className:`d-grid gap-2`,children:[(0,Z.jsxs)(N,{variant:`outline-primary`,className:`dc-btn-secondary d-flex align-items-center justify-content-center gap-2`,onClick:()=>t(e.id,e.type),children:[(0,Z.jsx)(o,{size:18}),(0,Z.jsx)(`span`,{children:`Baca Materi`})]}),(0,Z.jsxs)(N,{variant:`primary`,className:`dc-btn-primary d-flex align-items-center justify-content-center gap-2`,onClick:()=>n(e.id,e.type),children:[(0,Z.jsx)(m,{size:20}),(0,Z.jsx)(`span`,{children:`Mulai Evaluasi`})]})]})]})})})}),_e=H.memo(({trainingData:t,onSeeAll:r,onViewMateri:i,onStartEvaluasi:a})=>(0,Z.jsxs)(`section`,{className:`mb-4 dc-training-section`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`dc-section-icon bg-primary bg-opacity-10 text-primary`,children:(0,Z.jsx)(C,{size:20})}),(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Evaluasi (Training)`})]}),(0,Z.jsxs)(N,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:r,children:[`Lihat Semua `,(0,Z.jsx)(k,{size:18})]})]}),(0,Z.jsx)(n,{className:`g-4`,children:t.slice(0,2).map(t=>(0,Z.jsx)(e,{xs:12,md:6,children:(0,Z.jsx)(ge,{item:t,onViewMateri:i,onStartEvaluasi:a})},t.code))}),(0,Z.jsx)(`style`,{children:`
        .dc-training-section {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .dc-section-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dc-train-card-v2 {
          border-radius: 20px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: white;
          border: 1px solid #f1f5f9 !important;
        }

        .dc-train-card-v2:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px -5px rgba(15, 23, 42, 0.1) !important;
          border-color: #e2e8f0 !important;
        }

        .dc-badge-program {
          font-size: 10px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .dc-badge-program.wajib {
          background: #eff6ff;
          color: #2563eb;
        }

        .dc-badge-program.pilihan {
          background: #f0fdfa;
          color: #0d9488;
        }

        .dc-status-pill {
          font-size: 11px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
        }

        .dc-train-code {
          font-size: 12px;
          font-weight: 600;
          color: #94a3b8;
          letter-spacing: 0.3px;
        }

        .dc-train-title {
          font-size: 16px;
          font-weight: 800;
          color: #1e293b;
          line-height: 1.4;
          min-height: 44px;
        }

        .dc-meta-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .dc-btn-primary {
          border-radius: 12px;
          padding: 10px;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .dc-btn-secondary {
          border-radius: 12px;
          padding: 10px;
          font-weight: 600;
          font-size: 14px;
          border-color: #e2e8f0;
          color: #475569;
          transition: all 0.2s ease;
        }

        .dc-btn-secondary:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
          color: #1e293b;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 576px) {
          .dc-train-title {
            font-size: 15px;
            min-height: auto;
          }
        }
      `})]})),ve=H.memo(({articleData:e,onSeeAll:t})=>{let n=[`linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)`,`linear-gradient(135deg, #34d399 0%, #10b981 100%)`,`linear-gradient(135deg, #f472b6 0%, #db2777 100%)`];return(0,Z.jsxs)(`section`,{className:`mb-4 dc-article-section`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`dc-section-icon bg-success bg-opacity-10 text-success`,children:(0,Z.jsx)(i,{size:20})}),(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Artikel Terbaru`})]}),(0,Z.jsxs)(N,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:t,children:[`Lihat Semua `,(0,Z.jsx)(k,{size:18})]})]}),(0,Z.jsx)(M,{className:`border-0 shadow-sm dc-card-modern overflow-hidden`,children:(0,Z.jsx)(M.Body,{className:`p-0`,children:e.map((e,r)=>(0,Z.jsxs)(`div`,{className:`dc-article-row-v2`,onClick:t,children:[(0,Z.jsx)(`div`,{className:`dc-article-thumb`,style:{background:n[r%n.length]},children:(0,Z.jsx)(b,{size:28,color:`white`})}),(0,Z.jsxs)(`div`,{className:`dc-article-body`,children:[(0,Z.jsx)(`div`,{className:`d-flex justify-content-between align-items-start mb-1`,children:(0,Z.jsx)(`h6`,{className:`dc-article-title mb-0`,children:e.title})}),(0,Z.jsx)(`p`,{className:`dc-article-desc mb-2 text-muted`,children:e.desc}),(0,Z.jsxs)(`div`,{className:`dc-article-meta d-flex align-items-center gap-3`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-1`,children:[(0,Z.jsx)(E,{size:14,className:`opacity-50`}),(0,Z.jsx)(`span`,{children:e.date})]}),(0,Z.jsxs)(`div`,{className:`dc-read-more`,children:[(0,Z.jsx)(`span`,{children:`Baca Selengkapnya`}),(0,Z.jsx)(k,{size:16})]})]})]})]},r))})}),(0,Z.jsx)(`style`,{children:`
        .dc-article-section {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .dc-article-row-v2 {
          display: flex;
          gap: 20px;
          padding: 24px;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .dc-article-row-v2:last-child {
          border-bottom: none;
        }

        .dc-article-row-v2:hover {
          background-color: #f8fafc;
        }

        .dc-article-row-v2:hover .dc-article-title {
          color: #2563eb;
        }

        .dc-article-thumb {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .dc-article-body {
          flex-grow: 1;
          min-width: 0;
        }

        .dc-article-title {
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.4;
          transition: color 0.2s ease;
        }

        .dc-article-desc {
          font-size: 13px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .dc-article-meta {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
        }

        .dc-read-more {
          color: #2563eb;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 2px;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .dc-article-row-v2:hover .dc-read-more {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 576px) {
          .dc-article-row-v2 {
            padding: 16px;
            gap: 16px;
          }
          .dc-article-thumb {
            width: 64px;
            height: 64px;
          }
          .dc-article-title {
            font-size: 14px;
          }
          .dc-read-more {
            display: none; /* Hide on mobile for cleaner look */
          }
        }
      `})]})}),ye=H.memo(({nextSteps:e,onNavigate:t})=>(0,Z.jsx)(M,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:(0,Z.jsxs)(M.Body,{className:`p-4`,children:[(0,Z.jsx)(`h4`,{className:`fw-bold mb-4 text-dark`,children:`Langkah Selanjutnya`}),e.map((e,n)=>(0,Z.jsxs)(`div`,{className:`dc-next-row`,onClick:()=>t(e.pageKey,e.link),children:[(0,Z.jsxs)(`div`,{className:`dc-next-left`,children:[(0,Z.jsx)(`div`,{className:`dc-next-icon`,children:e.icon}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`strong`,{children:e.title}),(0,Z.jsx)(`small`,{children:e.desc})]})]}),(0,Z.jsx)(l,{className:`text-muted`,size:14})]},n))]})})),be=[{id:1,label:`Program Wajib`,status:`Aktif`,code:`QA.EM01`,title:`Pembahasan Akad Jual Beli`,type:`wajib`},{id:2,label:`Program Wajib`,status:`Belum Mulai`,code:`QA.EM02`,title:`Manajemen Keuangan Syariah`,type:`wajib`},{id:3,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM03`,title:`Strategi Pemasaran Islami`,type:`pilihan`},{id:4,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM04`,title:`Digitalisasi Usaha Mikro`,type:`pilihan`}],xe=[{title:`Strategi Mengembangkan Usaha Mikro di Era Digital`,desc:`Pelajari strategi praktis untuk mengembangkan usaha mikro Anda.`,date:`20 Mei 2024`},{title:`Manajemen Keuangan Syariah untuk UMKM`,desc:`Kelola keuangan usaha dengan prinsip syariah berkelanjutan.`,date:`18 Mei 2024`},{title:`Peluang dan Tantangan UMKM di Tahun 2024`,desc:`Kenali peluang pertumbuhan dan tantangan UMKM tahun ini.`,date:`15 Mei 2024`}];function Se(){let r=D(),{userData:i,loading:a}=P(),o=se(i),{isRegistered:c,registrationData:l,loading:d}=B(),f=(0,H.useMemo)(()=>o?.isCandidate??!0,[o]),p=(0,H.useMemo)(()=>o?.isALB??!1,[o]),m=(0,H.useMemo)(()=>i?.full_name?z(i.full_name):i?.email?.split(`@`)[0]||`Anggota`,[i]),g=(0,H.useMemo)(()=>{let e=c,t=(l?.final_status||`PENDING`)===`APPROVED`;return[{no:1,title:`Buat Akun`,desc:`Selesai`,status:`done`,icon:(0,Z.jsx)(s,{})},{no:2,title:`Daftar Menjadi Anggota`,desc:e?`Selesai`:`Belum Lengkap`,status:e?`done`:`active`,icon:(0,Z.jsx)(A,{})},{no:3,title:`Approval`,desc:t?`Disetujui`:e?`Proses Verifikasi`:`Menunggu`,status:t?`done`:e?`active`:`pending`,icon:(0,Z.jsx)(u,{})},{no:4,title:`Menjadi Anggota Koperasi`,desc:t?`Selesai`:`Menunggu`,status:t?`done`:`pending`,icon:(0,Z.jsx)(s,{})}]},[c,l]),_=(0,H.useMemo)(()=>[{icon:(0,Z.jsx)(A,{}),title:`Lengkapi Data Usaha`,desc:`Isi informasi detail usaha Anda`,pageKey:f?`registrationFormDetail`:`accountPage`},{icon:(0,Z.jsx)(R,{}),title:`Unggah Dokumen`,desc:`Upload KTP, NPWP dan lainnya`,pageKey:f?`registrationFormDetail`:`accountPage`},{icon:(0,Z.jsx)(ne,{}),title:`Ajukan Pembiayaan`,desc:`Ajukan pembiayaan sesuai kebutuhan`,pageKey:f?`registrationPage`:`formPengajuanTransaksi`},{icon:(0,Z.jsx)(h,{}),title:`Konsultasi Dengan Kami`,desc:`Tim kami siap membantu Anda`,link:`https://wa.me/6281234567890`}],[f]),v=(0,H.useCallback)(e=>{if(e)try{r(`/${j({page:e})}`)}catch{r(`/${e}`)}},[r]),y=(0,H.useCallback)((e,t)=>{if(t){window.open(t,`_blank`,`noopener,noreferrer`);return}v(e)},[v]),b=(0,H.useCallback)(()=>v(`trainingPage`),[v]),x=(0,H.useCallback)((e,t)=>{try{r(`/${j({page:`detailMateri`,kurikulumId:e,type:t})}`)}catch{r(`/detailMateri`)}},[r]),S=(0,H.useCallback)((e,t)=>{try{r(`/${j({page:`evaluasi`,kurikulumId:e,type:t})}`)}catch{r(`/evaluasi`)}},[r]);return a||f&&d?(0,Z.jsx)($,{}):(0,Z.jsxs)(`div`,{className:`dc-page-container`,children:[(0,Z.jsxs)(t,{fluid:!0,className:`px-0`,children:[(0,Z.jsxs)(n,{className:`g-4 mb-4`,children:[(0,Z.jsx)(e,{xs:12,lg:8,children:(0,Z.jsx)(M,{className:`dc-hero border-0 h-100`,children:(0,Z.jsxs)(M.Body,{className:`p-0`,children:[(0,Z.jsxs)(`h1`,{children:[`Assalamu'alaikum, `,m,`!`]}),(0,Z.jsx)(`p`,{children:`Selamat datang di Paguyuban Usaha Sukses.`}),(0,Z.jsx)(`p`,{children:f?`Lengkapi data dan mulai perjalanan usaha bersama kami.`:`Kelola tabungan, pembiayaan, dan ikuti kurikulum usaha syariah secara mandiri.`})]})})}),(0,Z.jsx)(e,{xs:12,lg:4,children:(0,Z.jsx)(me,{})})]}),(0,Z.jsxs)(n,{className:`g-4`,children:[(0,Z.jsxs)(e,{xs:12,lg:8,children:[f&&(0,Z.jsx)(he,{steps:g,onNavigate:y}),!f&&(0,Z.jsx)(le,{}),(0,Z.jsx)(de,{isALB:p,isCandidate:f}),!f&&(0,Z.jsx)(pe,{}),(0,Z.jsx)(_e,{trainingData:be,onSeeAll:b,onViewMateri:x,onStartEvaluasi:S}),(0,Z.jsx)(ve,{articleData:xe,onSeeAll:b})]}),(0,Z.jsxs)(e,{xs:12,lg:4,children:[(0,Z.jsx)(ye,{nextSteps:_,onNavigate:y}),(0,Z.jsx)(M,{className:`dc-support-box border-0`,children:(0,Z.jsxs)(M.Body,{className:`dc-support-content p-0`,children:[(0,Z.jsx)(`h3`,{children:`Butuh Bantuan?`}),(0,Z.jsx)(`p`,{children:`Tim kami siap membantu Anda dalam setiap langkah perjalanan usaha Anda.`}),(0,Z.jsx)(N,{variant:`primary`,onClick:()=>window.open(`https://wa.me/6281234567890`,`_blank`,`noopener,noreferrer`),children:`Hubungi Kami`})]})})]})]})]}),(0,Z.jsxs)(`section`,{className:`dc-safe-bar`,children:[(0,Z.jsx)(u,{}),(0,Z.jsx)(`strong`,{children:`Aman & Terpercaya`}),(0,Z.jsx)(`span`,{children:`Data Anda aman bersama kami dan semua transaksi sesuai prinsip syariah.`})]})]})}export{Se as default};