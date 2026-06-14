import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{B as t,Cn as n,Cr as r,E as i,G as a,Gt as o,Ht as s,It as c,Jn as l,Jt as u,K as d,M as f,N as p,Ot as m,Pr as h,Q as g,R as _,Rr as v,Rt as y,T as b,Ut as x,W as S,Wn as C,X as w,_t as T,an as E,at as D,bn as O,cr as k,er as A,f as j,h as M,in as N,jt as P,k as F,kr as I,lr as L,lt as R,m as z,nt as B,pn as ee,pt as V,qn as H,tt as U,ur as W,ut as te,w as ne,y as G}from"./vendor-Cpptq3vX.js";import{n as K}from"./ProfileContext-DcsBBjt8.js";import{s as q}from"./index-BT16Ed_l.js";import{t as re}from"./sanitization-Dcpq2Jck.js";import{t as ie}from"./useRegistrationStatus-D_OquZpF.js";import{t as ae}from"./UGlobal-_0hqwEIN.js";var J=e(v()),Y={CALON_ANGGOTA:`1`,PENGAWAS:`2`,KETUA:`3`,BENDAHARA:`4`,ANGGOTA_PENUH:`5`,ANGGOTA_PENUH_ALB:`6`};Y.CALON_ANGGOTA,Y.PENGAWAS,Y.KETUA,Y.BENDAHARA,Y.ANGGOTA_PENUH,Y.ANGGOTA_PENUH_ALB;var oe=e=>e===Y.CALON_ANGGOTA,se=e=>e===Y.ANGGOTA_PENUH||e===Y.ANGGOTA_PENUH_ALB,ce=e=>e===Y.ANGGOTA_PENUH_ALB,le=e=>e===Y.PENGAWAS,ue=e=>e===Y.KETUA,de=e=>e===Y.BENDAHARA,fe=50,X=new Map,pe=()=>{if(X.size>fe){let e=X.keys().next().value;X.delete(e)}},me=e=>{let t=String(e);return{roleId:t,isCandidate:oe(t),isFullMember:se(t),isALB:ce(t),isPengawas:le(t),isKetua:ue(t),isBendahara:de(t)}},he=e=>(0,J.useMemo)(()=>{if(!e)return null;let t=e.status_id;if(X.has(t))return X.get(t);let n=me(e.status_id);return pe(),X.set(t,n),n},[e]),ge=()=>ae.getFinancialSummary(),_e=e=>{let[t,n]=(0,J.useState)({balance:0,tabunganDetails:[],jualBeliBalance:0,jualBeliSisaCicilan:0,jualBeliBelumDibayar:0,pinjamanTagihan:0,pinjamanSisaCicilan:0,pinjamanNominal:0,pinjamanNominalCicilan:0,pinjamanTerbayar:0,simpananPokok:0,simpananWajib:0,simpananSukarela:0,simpananDeposit:0,arisanTagihan:0,arisanDiikutiCount:0,arisanSisaCicilan:0,arisanTerbayar:0,details:[]}),[r,i]=(0,J.useState)(!0),[a,o]=(0,J.useState)(!1),s=(0,J.useCallback)(async(t=!1)=>{if(e?.member_id){t?o(!0):i(!0);try{let e=await ge();if(e.data?.success){let t=e.data.data.details||[],r=t.filter(e=>e.type&&e.type.startsWith(`TABUNGAN_`)&&e.type!==`TABUNGAN_DEPOSIT`),i=t.find(e=>e.type===`SW_POKOK`)?.balance||0,a=t.find(e=>e.type===`SW_WAJIB`)?.balance||0,o=t.find(e=>e.type===`SS_SUKARELA`)?.balance||0,s=t.find(e=>e.type===`TABUNGAN_DEPOSIT`)?.balance||0;n({balance:i+a+o+s,tabunganDetails:r,simpananPokok:i,simpananWajib:a,simpananSukarela:o,simpananDeposit:s,details:t,jualBeliBalance:e.data.data.totalJualBeli||0,jualBeliSisaCicilan:e.data.data.sisaCicilanJualBeli||0,jualBeliBelumDibayar:e.data.data.jumlahCicilanBelumDibayar||0,pinjamanTagihan:e.data.data.totalLoanDebt||0,pinjamanSisaCicilan:e.data.data.sisaCicilanPinjaman||0,pinjamanNominal:e.data.data.totalNominalPinjaman||0,pinjamanNominalCicilan:e.data.data.totalNominalCicilanPinjaman||0,pinjamanTerbayar:e.data.data.terbayarPinjaman||0,arisanTagihan:e.data.data.totalArisanTagihan||0,arisanDiikutiCount:e.data.data.arisanDiikutiCount||0,arisanSisaCicilan:e.data.data.sisaCicilanArisan||0,arisanTerbayar:e.data.data.terbayarArisan||0})}}catch(e){console.error(`Gagal memuat saldo:`,e)}finally{i(!1),o(!1)}}},[e]);return(0,J.useEffect)(()=>{s()},[s]),{...t,loading:r,isRefreshing:a,refresh:()=>s(!0)}},Z=I(),Q=({title:e,icon:t,showBalance:n,onToggleBalance:r,isRefreshing:i,onRefresh:a,onDetail:o,subItems:s,variant:c,formattedAmount:l})=>(0,Z.jsxs)(`div`,{className:`card border-0 shadow-sm overflow-hidden financial-card ${c?`card-variant-${c}`:``}`,children:[(0,Z.jsx)(`div`,{className:`financial-card-decor-top`}),(0,Z.jsx)(`div`,{className:`financial-card-decor-bottom`}),(0,Z.jsxs)(`div`,{className:`card-body p-4 position-relative financial-card-body`,children:[(0,Z.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-1`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`financial-card-icon-wrapper bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center`,children:(0,Z.jsx)(t,{size:16})}),(0,Z.jsx)(`h6`,{className:`fw-semibold mb-0 opacity-90 financial-card-title`,children:e})]}),(0,Z.jsxs)(`div`,{className:`d-flex gap-2`,children:[o&&(0,Z.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all`,onClick:o,"aria-label":`Detail`,children:(0,Z.jsx)(O,{size:16})}),(0,Z.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${i?`fa-spin`:``}`,onClick:a,disabled:i,"aria-label":`Refresh`,children:(0,Z.jsx)(A,{size:16})}),(0,Z.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all`,onClick:r,"aria-label":`Toggle`,children:n?(0,Z.jsx)(E,{size:18}):(0,Z.jsx)(N,{size:18})})]})]}),(0,Z.jsx)(`div`,{className:`py-3`,children:(0,Z.jsx)(`h2`,{className:`fw-bold mb-0 d-flex align-items-baseline financial-card-amount`,children:n?l:(0,Z.jsx)(`span`,{className:`financial-card-amount-hidden`,children:`Rp ••••••••`})})}),(0,Z.jsx)(`div`,{className:`row g-2 mt-0`,children:s&&(0,Z.jsx)(`div`,{className:`col-12`,children:(0,Z.jsx)(`div`,{className:`d-flex flex-column gap-2 text-white mt-1`,children:s.map((e,t)=>(0,Z.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center ${t===s.length-1?``:`border-bottom border-white border-opacity-10 pb-2`}`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[e.icon&&(0,Z.jsx)(e.icon,{size:12,className:`opacity-75`}),(0,Z.jsx)(`div`,{className:`opacity-75 fw-bold financial-card-subitem-label`,children:e.label})]}),(0,Z.jsx)(`div`,{className:`fw-bold financial-card-subitem-amount`,children:n?e.formattedAmount:`Rp ••••••••`})]},t))})})})]})]}),ve=({show:e,onHide:t,details:n,formatCurrency:r})=>(0,Z.jsxs)(G,{show:e,onHide:t,centered:!0,children:[(0,Z.jsx)(G.Header,{closeButton:!0,children:(0,Z.jsx)(G.Title,{children:`Rekap Simpanan & Tabungan`})}),(0,Z.jsx)(G.Body,{children:n&&n.length>0?(0,Z.jsxs)(j,{responsive:!0,hover:!0,children:[(0,Z.jsx)(`thead`,{children:(0,Z.jsxs)(`tr`,{children:[(0,Z.jsx)(`th`,{children:`Jenis`}),(0,Z.jsx)(`th`,{className:`text-end`,children:`Saldo`})]})}),(0,Z.jsx)(`tbody`,{children:n.map((e,t)=>(0,Z.jsxs)(`tr`,{children:[(0,Z.jsx)(`td`,{children:e.name}),(0,Z.jsx)(`td`,{className:`text-end fw-semibold text-primary`,children:r(e.balance)})]},t))})]}):(0,Z.jsx)(`div`,{className:`text-center text-muted py-4`,children:`Belum ada data simpanan.`})}),(0,Z.jsx)(G.Footer,{children:(0,Z.jsx)(F,{variant:`secondary`,onClick:t,children:`Tutup`})})]}),ye=({onScrollLeft:e,onScrollRight:t})=>(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`button`,{onClick:e,className:`btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center scroll-btn scroll-btn-left`,children:(0,Z.jsx)(s,{})}),(0,Z.jsx)(`button`,{onClick:t,className:`btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center scroll-btn scroll-btn-right`,children:(0,Z.jsx)(x,{})})]}),be=J.memo(()=>{let{userData:e}=K(),t=(0,J.useRef)(null),[i,a]=(0,J.useState)(!1),[o,s]=(0,J.useState)(!1),{balance:u,tabunganDetails:d,jualBeliBalance:f,jualBeliSisaCicilan:p,jualBeliBelumDibayar:m,pinjamanNominal:h,pinjamanNominalCicilan:g,pinjamanTerbayar:_,simpananPokok:v,simpananWajib:y,simpananSukarela:b,simpananDeposit:x,arisanTagihan:S,arisanDiikutiCount:w,arisanSisaCicilan:T,arisanTerbayar:E,details:D,loading:O,isRefreshing:A,refresh:j}=_e(e),M=e=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(e||0),N=(0,J.useMemo)(()=>M(u),[u]),P=(0,J.useMemo)(()=>M(v),[v]),F=(0,J.useMemo)(()=>M(y),[y]),I=(0,J.useMemo)(()=>M(b),[b]);(0,J.useMemo)(()=>M(x),[x]);let L=(0,J.useMemo)(()=>d.reduce((e,t)=>e+(t.balance||0),0),[d]),R=(0,J.useMemo)(()=>M(L),[L]),z=(0,J.useMemo)(()=>{let e=e=>d.filter(t=>t.name?.toLowerCase().includes(e)).reduce((e,t)=>e+(t.balance||0),0);return[{label:`Haji`,formattedAmount:M(e(`haji`)),icon:k},{label:`Umroh`,formattedAmount:M(e(`umroh`)),icon:k},{label:`Pendidikan`,formattedAmount:M(e(`pendidikan`)),icon:k},{label:`Qurban`,formattedAmount:M(e(`qurban`)),icon:k}]},[d]),B=(0,J.useMemo)(()=>[{label:`Sisa Cicilan`,formattedAmount:M(p),icon:l},{label:`Total Pengajuan`,formattedAmount:M(f),icon:l},{label:`Belum Dibayar`,formattedAmount:`${m} Cicilan`,icon:l}],[p,f,m]),V=(0,J.useMemo)(()=>[{label:`Nominal Pinjaman`,formattedAmount:M(h),icon:n},{label:`Nominal Cicilan`,formattedAmount:M(g),icon:n},{label:`Sudah Dibayar`,formattedAmount:M(_),icon:n}],[g,_,h]),U=(0,J.useMemo)(()=>[{label:`Total Arisan Diikuti`,formattedAmount:`${w} Program`,icon:n},{label:`Total Tagihan`,formattedAmount:M(S),icon:n},{label:`Belum Dibayar`,formattedAmount:M(T),icon:C}],[w,S,T]),W=e=>{t.current&&t.current.scrollBy({left:e,behavior:`smooth`})};return O?(0,Z.jsx)(`div`,{className:`financial-section mb-4`,children:(0,Z.jsx)(`div`,{className:`financial-placeholder placeholder-glow p-4 rounded-4`})}):(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(`div`,{className:`financial-section mb-4 dash-fade-in position-relative`,children:[(0,Z.jsx)(ye,{onScrollLeft:()=>W(-350),onScrollRight:()=>W(350)}),(0,Z.jsxs)(`div`,{ref:t,className:`d-flex flex-nowrap overflow-auto gap-3 pb-3 custom-scrollbar financial-scroll-container`,children:[(0,Z.jsx)(Q,{title:`TOTAL SIMPANAN`,icon:r,formattedAmount:N,showBalance:i,onToggleBalance:()=>a(!i),isRefreshing:A,onRefresh:j,onDetail:()=>s(!0),subItems:[{label:`Pokok`,formattedAmount:P,icon:H},{label:`Wajib`,formattedAmount:F,icon:C},{label:`Sukarela`,formattedAmount:I,icon:ee}],variant:`simpanan`}),(0,Z.jsx)(Q,{title:`TOTAL JUAL BELI`,icon:l,formattedAmount:M(f),showBalance:i,onToggleBalance:()=>a(!i),isRefreshing:A,onRefresh:j,subItems:B,variant:`jualbeli`}),(0,Z.jsx)(Q,{title:`TOTAL PINJAMAN`,icon:n,formattedAmount:M(h),showBalance:i,onToggleBalance:()=>a(!i),isRefreshing:A,onRefresh:j,subItems:V,variant:`pinjaman`}),(0,Z.jsx)(Q,{title:`TOTAL TABUNGAN`,icon:k,formattedAmount:R,showBalance:i,onToggleBalance:()=>a(!i),isRefreshing:A,onRefresh:j,subItems:z,variant:`tabungan`}),(0,Z.jsx)(Q,{title:`TOTAL ARISAN`,icon:n,formattedAmount:M(E),showBalance:i,onToggleBalance:()=>a(!i),isRefreshing:A,onRefresh:j,subItems:U,variant:`arisan`}),(0,Z.jsx)(Q,{title:`TOTAL INVESTASI`,icon:c,formattedAmount:M(0),showBalance:i,onToggleBalance:()=>a(!i),isRefreshing:A,onRefresh:j,variant:`investasi`})]})]}),(0,Z.jsx)(ve,{show:o,onHide:()=>s(!1),details:D,formatCurrency:M})]})}),xe=[{id:`simpanan`,label:`Simpanan`,icon:r,pageKey:`simpananPage`,gradient:`linear-gradient(135deg, #10b981 0%, #059669 100%)`,shadow:`rgba(16, 185, 129, 0.2)`},{id:`program`,label:`Program`,icon:w,pageKey:`programPage`,gradient:`linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)`,shadow:`rgba(139, 92, 246, 0.2)`},{id:`tabungan`,label:`Tabungan`,icon:p,pageKey:`tabunganPage`,gradient:`linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`,shadow:`rgba(245, 158, 11, 0.2)`},{id:`investasi`,label:`Investasi`,icon:t,pageKey:`investasiPage`,gradient:`linear-gradient(135deg, #ec4899 0%, #db2777 100%)`,shadow:`rgba(236, 72, 153, 0.2)`},{id:`training`,label:`Training`,icon:V,pageKey:`trainingPage`,gradient:`linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)`,shadow:`rgba(6, 182, 212, 0.2)`},{id:`jual-beli`,label:`Jual Beli`,icon:T,pageKey:`jualBeliPage`,gradient:`linear-gradient(135deg, #f97316 0%, #ea580c 100%)`,shadow:`rgba(249, 115, 22, 0.2)`},{id:`transaksi`,label:`Riwayat`,icon:g,pageKey:`billingPage`,gradient:`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,shadow:`rgba(59, 130, 246, 0.2)`}],Se=J.memo(({isALB:e,isCandidate:t})=>{let n=h(),r=(0,J.useCallback)(e=>{!e||t||n(`/${q({page:e})}`)},[n,t]),i=(0,J.useMemo)(()=>xe.filter(t=>e?![`transaksi`,`program`,`investasi`].includes(t.id):!0),[e]);return(0,Z.jsxs)(`section`,{className:`mb-4 dc-main-menu-section animate-fade-in`,children:[(0,Z.jsx)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Menu Utama`})}),(0,Z.jsx)(`div`,{className:`dc-menu-grid`,children:i.map(e=>{let n=e.icon;return(0,Z.jsxs)(`button`,{type:`button`,className:`dc-menu-item ${t?`is-disabled`:``}`,onClick:()=>r(e.pageKey),disabled:t,"aria-label":`Buka menu ${e.label}`,children:[(0,Z.jsx)(`div`,{className:`dc-menu-icon-wrapper`,style:{background:e.gradient,boxShadow:`0 8px 16px ${e.shadow}`},children:(0,Z.jsx)(n,{size:24})}),(0,Z.jsx)(`span`,{className:`dc-menu-label`,children:e.label})]},e.id)})}),(0,Z.jsx)(`style`,{children:`
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
      `})]})}),Ce=J.memo(({item:e,onPay:t})=>{let n=(0,J.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(Number(e.amount)||0),[e.amount]);return(0,Z.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Z.jsxs)(`div`,{className:`dc-bill-card`,onClick:()=>t(e.bill_id),children:[(0,Z.jsxs)(`div`,{className:`dc-bill-card-header`,children:[(0,Z.jsx)(`div`,{className:`dc-bill-icon-bg`,children:(0,Z.jsx)(te,{size:18})}),(0,Z.jsx)(`span`,{className:`dc-bill-type`,children:e.tx_type||`TAGIHAN`})]}),(0,Z.jsxs)(`div`,{className:`dc-bill-card-body`,children:[(0,Z.jsx)(`strong`,{className:`dc-bill-desc`,children:e.description||`Pembayaran Tagihan`}),(0,Z.jsx)(`div`,{className:`dc-bill-amount`,children:n})]}),(0,Z.jsxs)(`div`,{className:`dc-bill-card-footer`,children:[(0,Z.jsx)(`span`,{className:`dc-bill-action-text`,children:`Bayar Sekarang`}),(0,Z.jsx)(a,{size:18})]})]})})}),$=()=>(0,Z.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Z.jsx)(`div`,{className:`dc-bill-card skeleton`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-4 mb-3 rounded`,style:{height:`24px`}}),(0,Z.jsx)(`div`,{className:`placeholder col-10 mb-2 rounded`,style:{height:`16px`}}),(0,Z.jsx)(`div`,{className:`placeholder col-8 rounded`,style:{height:`20px`}})]})})}),we=()=>{let e=h(),{bills:t,loading:n}=K(),r=(0,J.useCallback)(t=>{t&&e(`/${q({page:`invoicePage`,billId:t,return:`dashboard`})}`)},[e]),i=(0,J.useMemo)(()=>t?.reduce((e,t)=>e+(Number(t.amount)||0),0)||0,[t]),a=(0,J.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(i),[i]);return n?(0,Z.jsxs)(`section`,{className:`mb-4 dc-bill-section px-3`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-5 rounded`,style:{height:`24px`}})}),(0,Z.jsxs)(`div`,{className:`dc-bill-scroll-container`,children:[(0,Z.jsx)($,{}),(0,Z.jsx)($,{})]})]}):(0,Z.jsxs)(`section`,{className:`mb-4 dc-bill-section`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-3`,children:[(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Tagihan Perlu Dibayar`}),t&&t.length>0&&(0,Z.jsxs)(`span`,{className:`badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 fw-bold`,style:{fontSize:`11px`},children:[t.length,` Tagihan`]})]}),t&&t.length>0?(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(`div`,{className:`px-3 mb-3`,children:(0,Z.jsx)(`div`,{className:`dc-bill-summary-card`,children:(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-3`,children:[(0,Z.jsx)(`div`,{className:`dc-summary-icon`,children:(0,Z.jsx)(D,{size:20})}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`div`,{className:`text-uppercase opacity-70 fw-bold`,style:{fontSize:`10px`,letterSpacing:`0.5px`},children:`TOTAL TUNGGAKAN`}),(0,Z.jsx)(`div`,{className:`fw-bold h5 mb-0 text-danger`,children:a})]})]})})}),(0,Z.jsx)(`div`,{className:`dc-bill-scroll-container`,children:(0,Z.jsxs)(`div`,{className:`dc-bill-scroll-content`,children:[t.map((e,t)=>(0,Z.jsx)(Ce,{item:e,onPay:r},`${e.bill_id??`bill`}-${t}`)),(0,Z.jsx)(`div`,{style:{width:`16px`,flexShrink:0}})]})})]}):(0,Z.jsx)(`div`,{className:`px-3`,children:(0,Z.jsxs)(`div`,{className:`dc-empty-bill-card`,children:[(0,Z.jsx)(`div`,{className:`dc-empty-icon-wrapper`,children:(0,Z.jsx)(S,{size:32})}),(0,Z.jsx)(`h6`,{className:`fw-bold mb-1`,children:`Semua Tagihan Terbayar`}),(0,Z.jsx)(`p`,{className:`text-muted mb-0`,style:{fontSize:`12.5px`},children:`Alhamdulillah, Anda tidak memiliki tagihan yang tertunda saat ini.`})]})}),(0,Z.jsx)(`style`,{children:`
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
      `})]})},Te=()=>(0,Z.jsxs)(`div`,{className:`container-fluid pb-5`,children:[(0,Z.jsx)(`div`,{className:`mb-4`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-6 mb-2`,style:{height:`2rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-4 mb-3`,style:{height:`1.5rem`}})]})}),(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsx)(`div`,{className:`card-body`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-12 mb-3`,style:{height:`1.5rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`1rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-10 mb-3`,style:{height:`1rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-6`,style:{height:`2.5rem`}})]})})}),(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsx)(`div`,{className:`card-body p-3`,children:(0,Z.jsxs)(`div`,{className:`d-flex align-items-center`,children:[(0,Z.jsx)(`div`,{className:`placeholder me-2`,style:{width:`1rem`,height:`1rem`}}),(0,Z.jsx)(`div`,{className:`placeholder-glow flex-grow-1`,children:(0,Z.jsx)(`div`,{className:`placeholder col-12`,style:{height:`1.2rem`}})})]})})}),(0,Z.jsxs)(`div`,{className:`row g-4 mb-4`,children:[(0,Z.jsxs)(`div`,{className:`col-lg-8`,children:[(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsxs)(`div`,{className:`card-body`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-4`,style:{height:`1.5rem`}})}),(0,Z.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4].map(e=>(0,Z.jsx)(`div`,{className:`col-md-6`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`0.8rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})]})},e))})]})}),(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Z.jsxs)(`div`,{className:`card-body`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})}),(0,Z.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4,5,6].map(e=>(0,Z.jsx)(`div`,{className:`col-md-4 col-6`,children:(0,Z.jsx)(`div`,{className:`placeholder-glow`,children:(0,Z.jsx)(`div`,{className:`placeholder`,style:{height:`4rem`}})})},e))})]})})]}),(0,Z.jsx)(`div`,{className:`col-lg-4`,children:(0,Z.jsx)(`div`,{className:`card border-0 shadow-sm`,children:(0,Z.jsxs)(`div`,{className:`card-body`,children:[(0,Z.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Z.jsx)(`div`,{className:`placeholder col-8`,style:{height:`1.5rem`}})}),[1,2,3].map(e=>(0,Z.jsx)(`div`,{className:`mb-3`,children:(0,Z.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Z.jsx)(`div`,{className:`placeholder col-12 mb-2`,style:{height:`2rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-10 mb-1`,style:{height:`0.8rem`}}),(0,Z.jsx)(`div`,{className:`placeholder col-8`,style:{height:`0.8rem`}})]})},e))]})})})]}),(0,Z.jsxs)(`div`,{className:`text-center py-3`,children:[(0,Z.jsx)(z,{animation:`border`,variant:`primary`,size:`sm`}),(0,Z.jsx)(`small`,{className:`d-block mt-2 text-muted`,children:`Memuat dashboard...`})]})]}),Ee=J.memo(()=>{let[e,t]=(0,J.useState)(new Date);return(0,J.useEffect)(()=>{let e=setInterval(()=>{t(new Date)},1e3);return()=>clearInterval(e)},[]),(0,Z.jsx)(i,{className:`dc-date-card border-0`,children:(0,Z.jsxs)(i.Body,{className:`d-flex align-items-center gap-3 p-0`,children:[(0,Z.jsx)(P,{}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`p`,{className:`mb-1`,children:(e=>e.toLocaleDateString(`id-ID`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}))(e)}),(0,Z.jsx)(`strong`,{children:(e=>e.toLocaleTimeString(`id-ID`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})+` WIB`)(e)})]})]})})}),De=J.memo(({steps:e,onNavigate:t})=>(0,Z.jsxs)(i,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:[(0,Z.jsxs)(i.Header,{className:`bg-transparent border-0 pt-3 px-4 d-flex justify-content-between align-items-center`,children:[(0,Z.jsx)(`h5`,{className:`fw-bold mb-0 text-dark`,style:{fontSize:`15px`},children:`Status Pendaftaran Anggota`}),(0,Z.jsx)(F,{variant:`link`,className:`p-0 text-decoration-none fw-bold`,style:{fontSize:`12px`},onClick:()=>t(`registrationPage`),children:`Lihat Detail`})]}),(0,Z.jsxs)(i.Body,{className:`px-4 pb-3 pt-1`,children:[(0,Z.jsx)(`p`,{className:`text-muted small mb-0`,style:{fontSize:`12px`},children:`Lengkapi semua tahapan untuk menjadi anggota koperasi secara resmi.`}),(0,Z.jsxs)(`div`,{className:`dc-info-box`,style:{padding:`10px 14px`,marginTop:`12px`},children:[(0,Z.jsx)(y,{style:{fontSize:`14px`}}),(0,Z.jsx)(`span`,{style:{fontSize:`11px`,lineHeight:`1.4`},children:`Untuk dapat mengakses keseluruhan fitur. (*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)`})]}),(0,Z.jsx)(`div`,{className:`dc-steps`,style:{marginTop:`16px`},children:e.map(e=>(0,Z.jsxs)(`div`,{className:`dc-step ${e.status}`,style:{padding:`12px 6px`,cursor:e.status===`pending`?`default`:`pointer`},onClick:()=>{e.status!==`pending`&&t(`registrationPage`)},children:[(0,Z.jsx)(`div`,{className:`dc-step-icon`,style:{width:`34px`,height:`34px`,fontSize:`14px`},children:e.icon}),(0,Z.jsx)(`strong`,{className:`fw-bold mt-1 text-center`,style:{fontSize:`11px`,lineHeight:`1.2`,minHeight:`26px`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:e.title}),e.no===2&&e.status===`active`?(0,Z.jsx)(F,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Daftar Sekarang`}):e.no===3&&e.status===`active`?(0,Z.jsx)(F,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Lihat Detail`}):(0,Z.jsx)(`small`,{style:{fontSize:`10px`},className:`opacity-75`,children:e.desc})]},e.no))})]})]})),Oe=J.memo(({item:e,onViewMateri:t,onStartEvaluasi:n})=>{let r=e.label===`Program Wajib`,a=(0,J.useMemo)(()=>{switch(e.status){case`Aktif`:return{bg:`#dcfce7`,color:`#15803d`,label:`Tersedia`};case`Selesai`:return{bg:`#dbeafe`,color:`#1e40af`,label:`Selesai`};default:return{bg:`#f1f5f9`,color:`#475569`,label:`Belum Mulai`}}},[e.status]);return(0,Z.jsx)(`div`,{className:`dc-train-card-wrapper h-100`,children:(0,Z.jsx)(i,{className:`dc-train-card-v2 h-100 border-0 shadow-sm`,children:(0,Z.jsxs)(i.Body,{className:`p-4 d-flex flex-column`,children:[(0,Z.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-3`,children:[(0,Z.jsx)(`span`,{className:`dc-badge-program ${r?`wajib`:`pilihan`}`,children:e.label}),(0,Z.jsx)(`span`,{className:`dc-status-pill`,style:{backgroundColor:a.bg,color:a.color},children:a.label})]}),(0,Z.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,Z.jsxs)(`div`,{className:`dc-train-code d-flex align-items-center gap-1 mb-1`,children:[(0,Z.jsx)(B,{size:14,className:`opacity-50`}),(0,Z.jsx)(`span`,{children:e.code})]}),(0,Z.jsx)(`h5`,{className:`dc-train-title mb-3`,children:e.title}),(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4`,children:[(0,Z.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Z.jsx)(U,{size:16}),(0,Z.jsx)(`span`,{children:`1 Materi`})]}),(0,Z.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Z.jsx)(f,{size:16}),(0,Z.jsx)(`span`,{children:`15 Soal`})]})]})]}),(0,Z.jsxs)(`div`,{className:`d-grid gap-2`,children:[(0,Z.jsxs)(F,{variant:`outline-primary`,className:`dc-btn-secondary d-flex align-items-center justify-content-center gap-2`,onClick:()=>t(e.id,e.type),children:[(0,Z.jsx)(U,{size:18}),(0,Z.jsx)(`span`,{children:`Baca Materi`})]}),(0,Z.jsxs)(F,{variant:`primary`,className:`dc-btn-primary d-flex align-items-center justify-content-center gap-2`,onClick:()=>n(e.id,e.type),children:[(0,Z.jsx)(R,{size:20}),(0,Z.jsx)(`span`,{children:`Mulai Evaluasi`})]})]})]})})})}),ke=J.memo(({trainingData:e,onSeeAll:t,onViewMateri:n,onStartEvaluasi:r})=>(0,Z.jsxs)(`section`,{className:`mb-4 dc-training-section`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`dc-section-icon bg-primary bg-opacity-10 text-primary`,children:(0,Z.jsx)(V,{size:20})}),(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Evaluasi (Training)`})]}),(0,Z.jsxs)(F,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:t,children:[`Lihat Semua `,(0,Z.jsx)(a,{size:18})]})]}),(0,Z.jsx)(M,{className:`g-4`,children:e.slice(0,2).map(e=>(0,Z.jsx)(b,{xs:12,md:6,children:(0,Z.jsx)(Oe,{item:e,onViewMateri:n,onStartEvaluasi:r})},e.code))}),(0,Z.jsx)(`style`,{children:`
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
      `})]})),Ae=J.memo(({articleData:e,onSeeAll:t})=>{let n=[`linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)`,`linear-gradient(135deg, #34d399 0%, #10b981 100%)`,`linear-gradient(135deg, #f472b6 0%, #db2777 100%)`];return(0,Z.jsxs)(`section`,{className:`mb-4 dc-article-section`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Z.jsx)(`div`,{className:`dc-section-icon bg-success bg-opacity-10 text-success`,children:(0,Z.jsx)(d,{size:20})}),(0,Z.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Artikel Terbaru`})]}),(0,Z.jsxs)(F,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:t,children:[`Lihat Semua `,(0,Z.jsx)(a,{size:18})]})]}),(0,Z.jsx)(i,{className:`border-0 shadow-sm dc-card-modern overflow-hidden`,children:(0,Z.jsx)(i.Body,{className:`p-0`,children:e.map((e,r)=>(0,Z.jsxs)(`div`,{className:`dc-article-row-v2`,onClick:t,children:[(0,Z.jsx)(`div`,{className:`dc-article-thumb`,style:{background:n[r%n.length]},children:(0,Z.jsx)(_,{size:28,color:`white`})}),(0,Z.jsxs)(`div`,{className:`dc-article-body`,children:[(0,Z.jsx)(`div`,{className:`d-flex justify-content-between align-items-start mb-1`,children:(0,Z.jsx)(`h6`,{className:`dc-article-title mb-0`,children:e.title})}),(0,Z.jsx)(`p`,{className:`dc-article-desc mb-2 text-muted`,children:e.desc}),(0,Z.jsxs)(`div`,{className:`dc-article-meta d-flex align-items-center gap-3`,children:[(0,Z.jsxs)(`div`,{className:`d-flex align-items-center gap-1`,children:[(0,Z.jsx)(f,{size:14,className:`opacity-50`}),(0,Z.jsx)(`span`,{children:e.date})]}),(0,Z.jsxs)(`div`,{className:`dc-read-more`,children:[(0,Z.jsx)(`span`,{children:`Baca Selengkapnya`}),(0,Z.jsx)(a,{size:16})]})]})]})]},r))})}),(0,Z.jsx)(`style`,{children:`
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
      `})]})}),je=J.memo(({nextSteps:e,onNavigate:t})=>(0,Z.jsx)(i,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:(0,Z.jsxs)(i.Body,{className:`p-4`,children:[(0,Z.jsx)(`h4`,{className:`fw-bold mb-4 text-dark`,children:`Langkah Selanjutnya`}),e.map((e,n)=>(0,Z.jsxs)(`div`,{className:`dc-next-row`,onClick:()=>t(e.pageKey,e.link),children:[(0,Z.jsxs)(`div`,{className:`dc-next-left`,children:[(0,Z.jsx)(`div`,{className:`dc-next-icon`,children:e.icon}),(0,Z.jsxs)(`div`,{children:[(0,Z.jsx)(`strong`,{children:e.title}),(0,Z.jsx)(`small`,{children:e.desc})]})]}),(0,Z.jsx)(x,{className:`text-muted`,size:14})]},n))]})})),Me=[{id:1,label:`Program Wajib`,status:`Aktif`,code:`QA.EM01`,title:`Pembahasan Akad Jual Beli`,type:`wajib`},{id:2,label:`Program Wajib`,status:`Belum Mulai`,code:`QA.EM02`,title:`Manajemen Keuangan Syariah`,type:`wajib`},{id:3,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM03`,title:`Strategi Pemasaran Islami`,type:`pilihan`},{id:4,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM04`,title:`Digitalisasi Usaha Mikro`,type:`pilihan`}],Ne=[{title:`Strategi Mengembangkan Usaha Mikro di Era Digital`,desc:`Pelajari strategi praktis untuk mengembangkan usaha mikro Anda.`,date:`20 Mei 2024`},{title:`Manajemen Keuangan Syariah untuk UMKM`,desc:`Kelola keuangan usaha dengan prinsip syariah berkelanjutan.`,date:`18 Mei 2024`},{title:`Peluang dan Tantangan UMKM di Tahun 2024`,desc:`Kenali peluang pertumbuhan dan tantangan UMKM tahun ini.`,date:`15 Mei 2024`}];function Pe(){let e=h(),{userData:t,loading:n}=K(),r=he(t),{isRegistered:a,registrationData:s,loading:c}=ie(),l=(0,J.useMemo)(()=>r?.isCandidate??!0,[r]),d=(0,J.useMemo)(()=>r?.isALB??!1,[r]),f=(0,J.useMemo)(()=>t?.full_name?re(t.full_name):t?.email?.split(`@`)[0]||`Anggota`,[t]),p=(0,J.useMemo)(()=>{let e=a,t=(s?.final_status||`PENDING`)===`APPROVED`;return[{no:1,title:`Buat Akun`,desc:`Selesai`,status:`done`,icon:(0,Z.jsx)(W,{})},{no:2,title:`Daftar Menjadi Anggota`,desc:e?`Selesai`:`Belum Lengkap`,status:e?`done`:`active`,icon:(0,Z.jsx)(o,{})},{no:3,title:`Approval`,desc:t?`Disetujui`:e?`Proses Verifikasi`:`Menunggu`,status:t?`done`:e?`active`:`pending`,icon:(0,Z.jsx)(H,{})},{no:4,title:`Menjadi Anggota Koperasi`,desc:t?`Selesai`:`Menunggu`,status:t?`done`:`pending`,icon:(0,Z.jsx)(W,{})}]},[a,s]),g=(0,J.useMemo)(()=>[{icon:(0,Z.jsx)(o,{}),title:`Lengkapi Data Usaha`,desc:`Isi informasi detail usaha Anda`,pageKey:l?`registrationFormDetail`:`accountPage`},{icon:(0,Z.jsx)(L,{}),title:`Unggah Dokumen`,desc:`Upload KTP, NPWP dan lainnya`,pageKey:l?`registrationFormDetail`:`accountPage`},{icon:(0,Z.jsx)(m,{}),title:`Ajukan Pembiayaan`,desc:`Ajukan pembiayaan sesuai kebutuhan`,pageKey:l?`registrationPage`:`formPengajuanTransaksi`},{icon:(0,Z.jsx)(u,{}),title:`Konsultasi Dengan Kami`,desc:`Tim kami siap membantu Anda`,link:`https://wa.me/6281234567890`}],[l]),_=(0,J.useCallback)(t=>{if(t)try{e(`/${q({page:t})}`)}catch{e(`/${t}`)}},[e]),v=(0,J.useCallback)((e,t)=>{if(t){window.open(t,`_blank`,`noopener,noreferrer`);return}_(e)},[_]),y=(0,J.useCallback)(()=>_(`trainingPage`),[_]),x=(0,J.useCallback)((t,n)=>{try{e(`/${q({page:`detailMateri`,kurikulumId:t,type:n})}`)}catch{e(`/detailMateri`)}},[e]),S=(0,J.useCallback)((t,n)=>{try{e(`/${q({page:`evaluasi`,kurikulumId:t,type:n})}`)}catch{e(`/evaluasi`)}},[e]);return n||l&&c?(0,Z.jsx)(Te,{}):(0,Z.jsxs)(`div`,{className:`dc-page-container`,children:[(0,Z.jsxs)(ne,{fluid:!0,className:`px-0`,children:[(0,Z.jsxs)(M,{className:`g-4 mb-4`,children:[(0,Z.jsx)(b,{xs:12,lg:8,children:(0,Z.jsx)(i,{className:`dc-hero border-0 h-100`,children:(0,Z.jsxs)(i.Body,{className:`p-0`,children:[(0,Z.jsxs)(`h1`,{children:[`Assalamu'alaikum, `,f,`!`]}),(0,Z.jsx)(`p`,{children:`Selamat datang di Paguyuban Usaha Sukses.`}),(0,Z.jsx)(`p`,{children:l?`Lengkapi data dan mulai perjalanan usaha bersama kami.`:`Kelola tabungan, pembiayaan, dan ikuti kurikulum usaha syariah secara mandiri.`})]})})}),(0,Z.jsx)(b,{xs:12,lg:4,children:(0,Z.jsx)(Ee,{})})]}),(0,Z.jsxs)(M,{className:`g-4`,children:[(0,Z.jsxs)(b,{xs:12,lg:8,children:[l&&(0,Z.jsx)(De,{steps:p,onNavigate:v}),!l&&(0,Z.jsx)(be,{}),(0,Z.jsx)(Se,{isALB:d,isCandidate:l}),!l&&(0,Z.jsx)(we,{}),(0,Z.jsx)(ke,{trainingData:Me,onSeeAll:y,onViewMateri:x,onStartEvaluasi:S}),(0,Z.jsx)(Ae,{articleData:Ne,onSeeAll:y})]}),(0,Z.jsxs)(b,{xs:12,lg:4,children:[(0,Z.jsx)(je,{nextSteps:g,onNavigate:v}),(0,Z.jsx)(i,{className:`dc-support-box border-0`,children:(0,Z.jsxs)(i.Body,{className:`dc-support-content p-0`,children:[(0,Z.jsx)(`h3`,{children:`Butuh Bantuan?`}),(0,Z.jsx)(`p`,{children:`Tim kami siap membantu Anda dalam setiap langkah perjalanan usaha Anda.`}),(0,Z.jsx)(F,{variant:`primary`,onClick:()=>window.open(`https://wa.me/6281234567890`,`_blank`,`noopener,noreferrer`),children:`Hubungi Kami`})]})})]})]})]}),(0,Z.jsxs)(`section`,{className:`dc-safe-bar`,children:[(0,Z.jsx)(H,{}),(0,Z.jsx)(`strong`,{children:`Aman & Terpercaya`}),(0,Z.jsx)(`span`,{children:`Data Anda aman bersama kami dan semua transaksi sesuai prinsip syariah.`})]})]})}export{Pe as default};