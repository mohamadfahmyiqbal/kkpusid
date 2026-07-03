import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{A as t,Ar as n,B as r,Bn as i,C as a,D as o,Dt as s,H as c,I as l,J as u,K as d,Mt as f,P as p,Pr as m,Pt as h,Q as g,Rt as _,S as v,Tr as y,Un as b,V as x,Vt as S,Wn as C,Wt as w,Xn as T,Z as E,ar as D,at as O,d as k,en as ee,f as A,g as j,gn as te,ir as M,j as N,l as P,ln as F,lt as I,or as L,ot as R,pt as z,tn as B,tt as V,w as H,wt as U,yn as W,yr as ne,zt as G}from"./vendor-DnQ6XDWJ.js";import{n as K}from"./ProfileContext-czfklcub.js";import{s as q}from"./index-cQEtDZB1.js";import{t as re}from"./sanitization-Dcpq2Jck.js";import{t as J}from"./useRegistrationStatus-B4ZHo2DD.js";import{t as ie}from"./UGlobal-1j6_Q__5.js";var Y=e(m()),X={CALON_ANGGOTA:`1`,PENGAWAS:`2`,KETUA:`3`,BENDAHARA:`4`,ANGGOTA_PENUH:`5`,ANGGOTA_PENUH_ALB:`6`};X.CALON_ANGGOTA,X.PENGAWAS,X.KETUA,X.BENDAHARA,X.ANGGOTA_PENUH,X.ANGGOTA_PENUH_ALB;var ae=e=>e===X.CALON_ANGGOTA,oe=e=>e===X.ANGGOTA_PENUH||e===X.ANGGOTA_PENUH_ALB,se=e=>e===X.ANGGOTA_PENUH_ALB,ce=e=>e===X.PENGAWAS,le=e=>e===X.KETUA,ue=e=>e===X.BENDAHARA,de=50,Z=new Map,fe=()=>{if(Z.size>de){let e=Z.keys().next().value;Z.delete(e)}},pe=e=>{let t=String(e);return{roleId:t,isCandidate:ae(t),isFullMember:oe(t),isALB:se(t),isPengawas:ce(t),isKetua:le(t),isBendahara:ue(t)}},me=e=>(0,Y.useMemo)(()=>{if(!e)return null;let t=e.status_id;if(Z.has(t))return Z.get(t);let n=pe(e.status_id);return fe(),Z.set(t,n),n},[e]),he=()=>ie.getFinancialSummary(),ge=e=>{let[t,n]=(0,Y.useState)({balance:0,tabunganDetails:[],jualBeliBalance:0,jualBeliSisaCicilan:0,jualBeliBelumDibayar:0,jualBeliTerbayar:0,pinjamanTagihan:0,pinjamanSisaCicilan:0,pinjamanNominal:0,pinjamanNominalCicilan:0,pinjamanTerbayar:0,simpananPokok:0,simpananWajib:0,simpananSukarela:0,simpananDeposit:0,arisanTagihan:0,arisanDiikutiCount:0,arisanSisaCicilan:0,arisanTerbayar:0,totalInvestasi:0,totalPendanaanSyariah:0,tabunganBalance:0,tabunganSubItemsData:{haji:0,umroh:0,pendidikan:0,qurban:0},details:[]}),[r,i]=(0,Y.useState)(!0),[a,o]=(0,Y.useState)(!1),s=(0,Y.useCallback)(async(t=!1)=>{if(e?.member_id){t?o(!0):i(!0);try{let e=await he();if(e.data?.success){let t=e.data.data.details||[],r=t.filter(e=>e.type&&e.type.startsWith(`TABUNGAN_`)&&e.type!==`TABUNGAN_DEPOSIT`),i=t.find(e=>e.type===`SW_POKOK`)?.balance||0,a=t.find(e=>e.type===`SW_WAJIB`)?.balance||0,o=t.find(e=>e.type===`SS_SUKARELA`)?.balance||0,s=t.find(e=>e.type===`TABUNGAN_DEPOSIT`)?.balance||0,c=i+a+o+s,l=r.reduce((e,t)=>e+(t.balance||0),0),u=e=>r.filter(t=>t.name?.toLowerCase().includes(e)).reduce((e,t)=>e+(t.balance||0),0);n({balance:c,tabunganDetails:r,tabunganBalance:l,tabunganSubItemsData:{haji:u(`haji`),umroh:u(`umroh`),pendidikan:u(`pendidikan`),qurban:u(`qurban`)},simpananPokok:i,simpananWajib:a,simpananSukarela:o,simpananDeposit:s,details:t,jualBeliBalance:e.data.data.totalJualBeli||0,jualBeliSisaCicilan:e.data.data.sisaCicilanJualBeli||0,jualBeliBelumDibayar:e.data.data.jumlahCicilanBelumDibayar||0,jualBeliTerbayar:e.data.data.terbayarJualBeli||0,pinjamanTagihan:e.data.data.totalLoanDebt||0,pinjamanSisaCicilan:e.data.data.sisaCicilanPinjaman||0,pinjamanNominal:e.data.data.totalNominalPinjaman||0,pinjamanNominalCicilan:e.data.data.totalNominalCicilanPinjaman||0,pinjamanTerbayar:e.data.data.terbayarPinjaman||0,arisanTagihan:e.data.data.totalArisanTagihan||0,arisanDiikutiCount:e.data.data.arisanDiikutiCount||0,arisanSisaCicilan:e.data.data.sisaCicilanArisan||0,arisanTerbayar:e.data.data.terbayarArisan||0,totalInvestasi:e.data.data.totalInvestasi||0,totalPendanaanSyariah:e.data.data.totalPendanaanSyariah||0})}}catch(e){console.error(`Gagal memuat saldo:`,e)}finally{i(!1),o(!1)}}},[e]);return(0,Y.useEffect)(()=>{s()},[s]),{...t,loading:r,isRefreshing:a,refresh:()=>s(!0)}},Q=y(),$=({title:e,icon:t,showBalance:n,onToggleBalance:r,isRefreshing:i,onRefresh:a,onDetail:o,subItems:s,variant:c,formattedAmount:l})=>(0,Q.jsxs)(`div`,{className:`card border-0 shadow-sm overflow-hidden financial-card ${c?`card-variant-${c}`:``}`,children:[(0,Q.jsx)(`div`,{className:`financial-card-decor-top`}),(0,Q.jsx)(`div`,{className:`financial-card-decor-bottom`}),(0,Q.jsxs)(`div`,{className:`card-body p-4 position-relative financial-card-body`,children:[(0,Q.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-1`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Q.jsx)(`div`,{className:`financial-card-icon-wrapper bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center`,children:(0,Q.jsx)(t,{size:16})}),(0,Q.jsx)(`h6`,{className:`fw-semibold mb-0 opacity-90 financial-card-title`,children:e})]}),(0,Q.jsxs)(`div`,{className:`d-flex gap-2`,children:[o&&(0,Q.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all`,onClick:o,"aria-label":`Detail`,children:(0,Q.jsx)(te,{size:16})}),(0,Q.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${i?`fa-spin`:``}`,onClick:a,disabled:i,"aria-label":`Refresh`,children:(0,Q.jsx)(T,{size:16})}),(0,Q.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all`,onClick:r,"aria-label":`Toggle`,children:n?(0,Q.jsx)(B,{size:18}):(0,Q.jsx)(ee,{size:18})})]})]}),(0,Q.jsx)(`div`,{className:`py-3`,children:(0,Q.jsx)(`h2`,{className:`fw-bold mb-0 d-flex align-items-baseline financial-card-amount`,children:n?l:(0,Q.jsx)(`span`,{className:`financial-card-amount-hidden`,children:`Rp ••••••••`})})}),(0,Q.jsx)(`div`,{className:`row g-2 mt-0`,children:s&&(0,Q.jsx)(`div`,{className:`col-12`,children:(0,Q.jsx)(`div`,{className:`d-flex flex-column gap-2 text-white mt-1`,children:s.map((e,t)=>(0,Q.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center ${t===s.length-1?``:`border-bottom border-white border-opacity-10 pb-2`}`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[e.icon&&(0,Q.jsx)(e.icon,{size:12,className:`opacity-75`}),(0,Q.jsx)(`div`,{className:`opacity-75 fw-bold financial-card-subitem-label`,children:e.label})]}),(0,Q.jsx)(`div`,{className:`fw-bold financial-card-subitem-amount`,children:n?e.formattedAmount:`Rp ••••••••`})]},t))})})})]})]}),_e=({show:e,onHide:t,details:n,formatCurrency:r})=>(0,Q.jsxs)(j,{show:e,onHide:t,centered:!0,children:[(0,Q.jsx)(j.Header,{closeButton:!0,children:(0,Q.jsx)(j.Title,{children:`Rekap Simpanan & Tabungan`})}),(0,Q.jsx)(j.Body,{children:n&&n.length>0?(0,Q.jsxs)(P,{responsive:!0,hover:!0,children:[(0,Q.jsx)(`thead`,{children:(0,Q.jsxs)(`tr`,{children:[(0,Q.jsx)(`th`,{children:`Jenis`}),(0,Q.jsx)(`th`,{className:`text-end`,children:`Saldo`})]})}),(0,Q.jsx)(`tbody`,{children:n.map((e,t)=>(0,Q.jsxs)(`tr`,{children:[(0,Q.jsx)(`td`,{children:e.name}),(0,Q.jsx)(`td`,{className:`text-end fw-semibold text-primary`,children:r(e.balance)})]},t))})]}):(0,Q.jsx)(`div`,{className:`text-center text-muted py-4`,children:`Belum ada data simpanan.`})}),(0,Q.jsx)(j.Footer,{children:(0,Q.jsx)(o,{variant:`secondary`,onClick:t,children:`Tutup`})})]}),ve=({onScrollLeft:e,onScrollRight:t})=>(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`button`,{onClick:e,className:`btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center scroll-btn scroll-btn-left`,children:(0,Q.jsx)(_,{})}),(0,Q.jsx)(`button`,{onClick:t,className:`btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center scroll-btn scroll-btn-right`,children:(0,Q.jsx)(G,{})})]}),ye=Y.memo(()=>{let{userData:e}=K(),t=(0,Y.useRef)(null),[n,r]=(0,Y.useState)(!1),[a,o]=(0,Y.useState)(!1),{balance:s,tabunganDetails:c,tabunganBalance:l,tabunganSubItemsData:u,jualBeliBalance:d,jualBeliSisaCicilan:p,jualBeliBelumDibayar:m,jualBeliTerbayar:h,pinjamanNominal:g,pinjamanNominalCicilan:_,pinjamanTerbayar:v,pinjamanTagihan:y,pinjamanSisaCicilan:x,simpananPokok:S,simpananWajib:w,simpananSukarela:T,simpananDeposit:E,arisanTagihan:D,arisanDiikutiCount:O,arisanSisaCicilan:k,arisanTerbayar:ee,totalInvestasi:A,totalPendanaanSyariah:j,details:te,loading:N,isRefreshing:P,refresh:I}=ge(e),L=e=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(e||0),R=(0,Y.useMemo)(()=>L(s),[s]),z=(0,Y.useMemo)(()=>L(S),[S]),B=(0,Y.useMemo)(()=>L(w),[w]),V=(0,Y.useMemo)(()=>L(T),[T]);(0,Y.useMemo)(()=>L(E),[E]);let H=(0,Y.useMemo)(()=>L(l),[l]),U=(0,Y.useMemo)(()=>[{label:`Haji`,formattedAmount:L(u.haji),icon:M},{label:`Umroh`,formattedAmount:L(u.umroh),icon:M},{label:`Pendidikan`,formattedAmount:L(u.pendidikan),icon:M},{label:`Qurban`,formattedAmount:L(u.qurban),icon:M}],[u]),G=(0,Y.useMemo)(()=>[{label:`Sisa Cicilan`,formattedAmount:L(p),icon:C},{label:`Sudah Dibayar`,formattedAmount:L(h),icon:C},{label:`Belum Dibayar`,formattedAmount:`${m} Cicilan`,icon:C}],[p,h,m]),q=(0,Y.useMemo)(()=>[{label:`Sisa Cicilan`,formattedAmount:L(x),icon:W},{label:`Nominal Cicilan`,formattedAmount:L(_),icon:W},{label:`Sudah Dibayar`,formattedAmount:L(v),icon:W}],[x,_,v]),re=(0,Y.useMemo)(()=>[{label:`Total Arisan Diikuti`,formattedAmount:`${O} Program`,icon:W},{label:`Total Tagihan`,formattedAmount:L(D),icon:W},{label:`Belum Dibayar`,formattedAmount:L(k),icon:i}],[O,D,k]),J=e=>{t.current&&t.current.scrollBy({left:e,behavior:`smooth`})};return N?(0,Q.jsx)(`div`,{className:`financial-section mb-4`,children:(0,Q.jsx)(`div`,{className:`financial-placeholder placeholder-glow p-4 rounded-4`})}):(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`div`,{className:`financial-section mb-4 dash-fade-in position-relative`,children:[(0,Q.jsx)(ve,{onScrollLeft:()=>J(-350),onScrollRight:()=>J(350)}),(0,Q.jsxs)(`div`,{ref:t,className:`d-flex flex-nowrap overflow-auto gap-3 pb-3 custom-scrollbar financial-scroll-container`,children:[(0,Q.jsx)($,{title:`TOTAL SIMPANAN`,icon:ne,formattedAmount:R,showBalance:n,onToggleBalance:()=>r(!n),isRefreshing:P,onRefresh:I,onDetail:()=>o(!0),subItems:[{label:`Pokok`,formattedAmount:z,icon:b},{label:`Wajib`,formattedAmount:B,icon:i},{label:`Sukarela`,formattedAmount:V,icon:F}],variant:`simpanan`}),(0,Q.jsx)($,{title:`TOTAL JUAL BELI`,icon:C,formattedAmount:L(d),showBalance:n,onToggleBalance:()=>r(!n),isRefreshing:P,onRefresh:I,subItems:G,variant:`jualbeli`}),(0,Q.jsx)($,{title:`TOTAL PINJAMAN`,icon:W,formattedAmount:L(y),showBalance:n,onToggleBalance:()=>r(!n),isRefreshing:P,onRefresh:I,subItems:q,variant:`pinjaman`}),(0,Q.jsx)($,{title:`TOTAL TABUNGAN`,icon:M,formattedAmount:H,showBalance:n,onToggleBalance:()=>r(!n),isRefreshing:P,onRefresh:I,subItems:U,variant:`tabungan`}),(0,Q.jsx)($,{title:`TOTAL ARISAN`,icon:W,formattedAmount:L(ee),showBalance:n,onToggleBalance:()=>r(!n),isRefreshing:P,onRefresh:I,subItems:re,variant:`arisan`}),(0,Q.jsx)($,{title:`TOTAL PENDANAAN SYARIAH`,icon:F,formattedAmount:L(j),showBalance:n,onToggleBalance:()=>r(!n),isRefreshing:P,onRefresh:I,variant:`investasi`}),(0,Q.jsx)($,{title:`TOTAL INVESTASI`,icon:f,formattedAmount:L(A),showBalance:n,onToggleBalance:()=>r(!n),isRefreshing:P,onRefresh:I,variant:`investasi`})]})]}),(0,Q.jsx)(_e,{show:a,onHide:()=>o(!1),details:te,formatCurrency:L})]})}),be=[{id:`simpanan`,label:`Simpanan`,icon:ne,pageKey:`simpananPage`,gradient:`linear-gradient(135deg, #10b981 0%, #059669 100%)`,shadow:`rgba(16, 185, 129, 0.2)`},{id:`program`,label:`Program`,icon:d,pageKey:`programPage`,gradient:`linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)`,shadow:`rgba(139, 92, 246, 0.2)`},{id:`tabungan`,label:`Tabungan`,icon:N,pageKey:`tabunganPage`,gradient:`linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`,shadow:`rgba(245, 158, 11, 0.2)`},{id:`investasi`,label:`Investasi`,icon:l,pageKey:`investasiPage`,gradient:`linear-gradient(135deg, #ec4899 0%, #db2777 100%)`,shadow:`rgba(236, 72, 153, 0.2)`},{id:`training`,label:`Training`,icon:I,pageKey:`trainingPage`,gradient:`linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)`,shadow:`rgba(6, 182, 212, 0.2)`},{id:`jual-beli`,label:`Jual Beli`,icon:z,pageKey:`jualBeliPage`,gradient:`linear-gradient(135deg, #f97316 0%, #ea580c 100%)`,shadow:`rgba(249, 115, 22, 0.2)`},{id:`transaksi`,label:`Riwayat`,icon:u,pageKey:`billingPage`,gradient:`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,shadow:`rgba(59, 130, 246, 0.2)`}],xe=Y.memo(({isALB:e,isCandidate:t})=>{let r=n(),i=(0,Y.useCallback)(e=>{!e||t||r(`/${q({page:e})}`)},[r,t]),a=(0,Y.useMemo)(()=>be.filter(t=>e?![`transaksi`,`program`,`investasi`].includes(t.id):!0),[e]);return(0,Q.jsxs)(`section`,{className:`mb-4 dc-main-menu-section animate-fade-in`,children:[(0,Q.jsx)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:(0,Q.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Menu Utama`})}),(0,Q.jsx)(`div`,{className:`dc-menu-grid`,children:a.map(e=>{let n=e.icon;return(0,Q.jsxs)(`button`,{type:`button`,className:`dc-menu-item ${t?`is-disabled`:``}`,onClick:()=>i(e.pageKey),disabled:t,"aria-label":`Buka menu ${e.label}`,children:[(0,Q.jsx)(`div`,{className:`dc-menu-icon-wrapper`,style:{background:e.gradient,boxShadow:`0 8px 16px ${e.shadow}`},children:(0,Q.jsx)(n,{size:24})}),(0,Q.jsx)(`span`,{className:`dc-menu-label`,children:e.label})]},e.id)})}),(0,Q.jsx)(`style`,{children:`
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
      `})]})}),Se=Y.memo(({item:e,onPay:t})=>{let n=(0,Y.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(Number(e.amount)||0),[e.amount]);return(0,Q.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Q.jsxs)(`div`,{className:`dc-bill-card`,onClick:()=>t(e.bill_id),children:[(0,Q.jsxs)(`div`,{className:`dc-bill-card-header`,children:[(0,Q.jsx)(`div`,{className:`dc-bill-icon-bg`,children:(0,Q.jsx)(R,{size:18})}),(0,Q.jsx)(`span`,{className:`dc-bill-type`,children:e.tx_type||`TAGIHAN`})]}),(0,Q.jsxs)(`div`,{className:`dc-bill-card-body`,children:[(0,Q.jsx)(`strong`,{className:`dc-bill-desc`,children:e.description||`Pembayaran Tagihan`}),(0,Q.jsx)(`div`,{className:`dc-bill-amount`,children:n})]}),(0,Q.jsxs)(`div`,{className:`dc-bill-card-footer`,children:[(0,Q.jsx)(`span`,{className:`dc-bill-action-text`,children:`Bayar Sekarang`}),(0,Q.jsx)(x,{size:18})]})]})})}),Ce=()=>(0,Q.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Q.jsx)(`div`,{className:`dc-bill-card skeleton`,children:(0,Q.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Q.jsx)(`div`,{className:`placeholder col-4 mb-3 rounded`,style:{height:`24px`}}),(0,Q.jsx)(`div`,{className:`placeholder col-10 mb-2 rounded`,style:{height:`16px`}}),(0,Q.jsx)(`div`,{className:`placeholder col-8 rounded`,style:{height:`20px`}})]})})}),we=()=>{let e=n(),{bills:t,loading:i}=K(),a=(0,Y.useCallback)(t=>{t&&e(`/${q({page:`invoicePage`,billId:t,return:`dashboard`})}`)},[e]),o=(0,Y.useMemo)(()=>t?.reduce((e,t)=>e+(Number(t.amount)||0),0)||0,[t]),s=(0,Y.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(o),[o]);return i?(0,Q.jsxs)(`section`,{className:`mb-4 dc-bill-section px-3`,children:[(0,Q.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Q.jsx)(`div`,{className:`placeholder col-5 rounded`,style:{height:`24px`}})}),(0,Q.jsxs)(`div`,{className:`dc-bill-scroll-container`,children:[(0,Q.jsx)(Ce,{}),(0,Q.jsx)(Ce,{})]})]}):(0,Q.jsxs)(`section`,{className:`mb-4 dc-bill-section`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-3`,children:[(0,Q.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Tagihan Perlu Dibayar`}),t&&t.length>0&&(0,Q.jsxs)(`span`,{className:`badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 fw-bold`,style:{fontSize:`11px`},children:[t.length,` Tagihan`]})]}),t&&t.length>0?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`div`,{className:`px-3 mb-3`,children:(0,Q.jsx)(`div`,{className:`dc-bill-summary-card`,children:(0,Q.jsxs)(`div`,{className:`d-flex align-items-center gap-3`,children:[(0,Q.jsx)(`div`,{className:`dc-summary-icon`,children:(0,Q.jsx)(V,{size:20})}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`div`,{className:`text-uppercase opacity-70 fw-bold`,style:{fontSize:`10px`,letterSpacing:`0.5px`},children:`TOTAL TUNGGAKAN`}),(0,Q.jsx)(`div`,{className:`fw-bold h5 mb-0 text-danger`,children:s})]})]})})}),(0,Q.jsx)(`div`,{className:`dc-bill-scroll-container`,children:(0,Q.jsxs)(`div`,{className:`dc-bill-scroll-content`,children:[t.map((e,t)=>(0,Q.jsx)(Se,{item:e,onPay:a},`${e.bill_id??`bill`}-${t}`)),(0,Q.jsx)(`div`,{style:{width:`16px`,flexShrink:0}})]})})]}):(0,Q.jsx)(`div`,{className:`px-3`,children:(0,Q.jsxs)(`div`,{className:`dc-empty-bill-card`,children:[(0,Q.jsx)(`div`,{className:`dc-empty-icon-wrapper`,children:(0,Q.jsx)(r,{size:32})}),(0,Q.jsx)(`h6`,{className:`fw-bold mb-1`,children:`Semua Tagihan Terbayar`}),(0,Q.jsx)(`p`,{className:`text-muted mb-0`,style:{fontSize:`12.5px`},children:`Alhamdulillah, Anda tidak memiliki tagihan yang tertunda saat ini.`})]})}),(0,Q.jsx)(`style`,{children:`
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
      `})]})},Te=()=>(0,Q.jsxs)(`div`,{className:`container-fluid pb-5`,children:[(0,Q.jsx)(`div`,{className:`mb-4`,children:(0,Q.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Q.jsx)(`div`,{className:`placeholder col-6 mb-2`,style:{height:`2rem`}}),(0,Q.jsx)(`div`,{className:`placeholder col-4 mb-3`,style:{height:`1.5rem`}})]})}),(0,Q.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Q.jsx)(`div`,{className:`card-body`,children:(0,Q.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Q.jsx)(`div`,{className:`placeholder col-12 mb-3`,style:{height:`1.5rem`}}),(0,Q.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`1rem`}}),(0,Q.jsx)(`div`,{className:`placeholder col-10 mb-3`,style:{height:`1rem`}}),(0,Q.jsx)(`div`,{className:`placeholder col-6`,style:{height:`2.5rem`}})]})})}),(0,Q.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Q.jsx)(`div`,{className:`card-body p-3`,children:(0,Q.jsxs)(`div`,{className:`d-flex align-items-center`,children:[(0,Q.jsx)(`div`,{className:`placeholder me-2`,style:{width:`1rem`,height:`1rem`}}),(0,Q.jsx)(`div`,{className:`placeholder-glow flex-grow-1`,children:(0,Q.jsx)(`div`,{className:`placeholder col-12`,style:{height:`1.2rem`}})})]})})}),(0,Q.jsxs)(`div`,{className:`row g-4 mb-4`,children:[(0,Q.jsxs)(`div`,{className:`col-lg-8`,children:[(0,Q.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Q.jsxs)(`div`,{className:`card-body`,children:[(0,Q.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Q.jsx)(`div`,{className:`placeholder col-4`,style:{height:`1.5rem`}})}),(0,Q.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4].map(e=>(0,Q.jsx)(`div`,{className:`col-md-6`,children:(0,Q.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Q.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`0.8rem`}}),(0,Q.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})]})},e))})]})}),(0,Q.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Q.jsxs)(`div`,{className:`card-body`,children:[(0,Q.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Q.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})}),(0,Q.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4,5,6].map(e=>(0,Q.jsx)(`div`,{className:`col-md-4 col-6`,children:(0,Q.jsx)(`div`,{className:`placeholder-glow`,children:(0,Q.jsx)(`div`,{className:`placeholder`,style:{height:`4rem`}})})},e))})]})})]}),(0,Q.jsx)(`div`,{className:`col-lg-4`,children:(0,Q.jsx)(`div`,{className:`card border-0 shadow-sm`,children:(0,Q.jsxs)(`div`,{className:`card-body`,children:[(0,Q.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Q.jsx)(`div`,{className:`placeholder col-8`,style:{height:`1.5rem`}})}),[1,2,3].map(e=>(0,Q.jsx)(`div`,{className:`mb-3`,children:(0,Q.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Q.jsx)(`div`,{className:`placeholder col-12 mb-2`,style:{height:`2rem`}}),(0,Q.jsx)(`div`,{className:`placeholder col-10 mb-1`,style:{height:`0.8rem`}}),(0,Q.jsx)(`div`,{className:`placeholder col-8`,style:{height:`0.8rem`}})]})},e))]})})})]}),(0,Q.jsxs)(`div`,{className:`text-center py-3`,children:[(0,Q.jsx)(k,{animation:`border`,variant:`primary`,size:`sm`}),(0,Q.jsx)(`small`,{className:`d-block mt-2 text-muted`,children:`Memuat dashboard...`})]})]}),Ee=Y.memo(()=>{let[e,t]=(0,Y.useState)(new Date);return(0,Y.useEffect)(()=>{let e=setInterval(()=>{t(new Date)},1e3);return()=>clearInterval(e)},[]),(0,Q.jsx)(H,{className:`dc-date-card border-0`,children:(0,Q.jsxs)(H.Body,{className:`d-flex align-items-center gap-3 p-0`,children:[(0,Q.jsx)(s,{}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`p`,{className:`mb-1`,children:(e=>e.toLocaleDateString(`id-ID`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}))(e)}),(0,Q.jsx)(`strong`,{children:(e=>e.toLocaleTimeString(`id-ID`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})+` WIB`)(e)})]})]})})}),De=Y.memo(({steps:e,onNavigate:t})=>(0,Q.jsxs)(H,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:[(0,Q.jsxs)(H.Header,{className:`bg-transparent border-0 pt-3 px-4 d-flex justify-content-between align-items-center`,children:[(0,Q.jsx)(`h5`,{className:`fw-bold mb-0 text-dark`,style:{fontSize:`15px`},children:`Status Pendaftaran Anggota`}),(0,Q.jsx)(o,{variant:`link`,className:`p-0 text-decoration-none fw-bold`,style:{fontSize:`12px`},onClick:()=>t(`registrationPage`),children:`Lihat Detail`})]}),(0,Q.jsxs)(H.Body,{className:`px-4 pb-3 pt-1`,children:[(0,Q.jsx)(`p`,{className:`text-muted small mb-0`,style:{fontSize:`12px`},children:`Lengkapi semua tahapan untuk menjadi anggota koperasi secara resmi.`}),(0,Q.jsxs)(`div`,{className:`dc-info-box`,style:{padding:`10px 14px`,marginTop:`12px`},children:[(0,Q.jsx)(h,{style:{fontSize:`14px`}}),(0,Q.jsx)(`span`,{style:{fontSize:`11px`,lineHeight:`1.4`},children:`Untuk dapat mengakses keseluruhan fitur. (*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)`})]}),(0,Q.jsx)(`div`,{className:`dc-steps`,style:{marginTop:`16px`},children:e.map(e=>(0,Q.jsxs)(`div`,{className:`dc-step ${e.status}`,style:{padding:`12px 6px`,cursor:e.status===`pending`?`default`:`pointer`},onClick:()=>{e.status!==`pending`&&t(`registrationPage`)},children:[(0,Q.jsx)(`div`,{className:`dc-step-icon`,style:{width:`34px`,height:`34px`,fontSize:`14px`},children:e.icon}),(0,Q.jsx)(`strong`,{className:`fw-bold mt-1 text-center`,style:{fontSize:`11px`,lineHeight:`1.2`,minHeight:`26px`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:e.title}),e.no===2&&e.status===`active`?(0,Q.jsx)(o,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Daftar Sekarang`}):e.no===3&&e.status===`active`?(0,Q.jsx)(o,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Lihat Detail`}):(0,Q.jsx)(`small`,{style:{fontSize:`10px`},className:`opacity-75`,children:e.desc})]},e.no))})]})]})),Oe=Y.memo(({item:e,onViewMateri:n,onStartEvaluasi:r})=>{let i=e.label===`Program Wajib`,a=(0,Y.useMemo)(()=>{switch(e.status){case`Aktif`:return{bg:`#dcfce7`,color:`#15803d`,label:`Tersedia`};case`Selesai`:return{bg:`#dbeafe`,color:`#1e40af`,label:`Selesai`};default:return{bg:`#f1f5f9`,color:`#475569`,label:`Belum Mulai`}}},[e.status]);return(0,Q.jsx)(`div`,{className:`dc-train-card-wrapper h-100`,children:(0,Q.jsx)(H,{className:`dc-train-card-v2 h-100 border-0 shadow-sm`,children:(0,Q.jsxs)(H.Body,{className:`p-4 d-flex flex-column`,children:[(0,Q.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-3`,children:[(0,Q.jsx)(`span`,{className:`dc-badge-program ${i?`wajib`:`pilihan`}`,children:e.label}),(0,Q.jsx)(`span`,{className:`dc-status-pill`,style:{backgroundColor:a.bg,color:a.color},children:a.label})]}),(0,Q.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,Q.jsxs)(`div`,{className:`dc-train-code d-flex align-items-center gap-1 mb-1`,children:[(0,Q.jsx)(g,{size:14,className:`opacity-50`}),(0,Q.jsx)(`span`,{children:e.code})]}),(0,Q.jsx)(`h5`,{className:`dc-train-title mb-3`,children:e.title}),(0,Q.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4`,children:[(0,Q.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Q.jsx)(E,{size:16}),(0,Q.jsx)(`span`,{children:`1 Materi`})]}),(0,Q.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Q.jsx)(t,{size:16}),(0,Q.jsx)(`span`,{children:`15 Soal`})]})]})]}),(0,Q.jsxs)(`div`,{className:`d-grid gap-2`,children:[(0,Q.jsxs)(o,{variant:`outline-primary`,className:`dc-btn-secondary d-flex align-items-center justify-content-center gap-2`,onClick:()=>n(e.id,e.type),children:[(0,Q.jsx)(E,{size:18}),(0,Q.jsx)(`span`,{children:`Baca Materi`})]}),(0,Q.jsxs)(o,{variant:`primary`,className:`dc-btn-primary d-flex align-items-center justify-content-center gap-2`,onClick:()=>r(e.id,e.type),children:[(0,Q.jsx)(O,{size:20}),(0,Q.jsx)(`span`,{children:`Mulai Evaluasi`})]})]})]})})})}),ke=Y.memo(({trainingData:e,onSeeAll:t,onViewMateri:n,onStartEvaluasi:r})=>(0,Q.jsxs)(`section`,{className:`mb-4 dc-training-section`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Q.jsx)(`div`,{className:`dc-section-icon bg-primary bg-opacity-10 text-primary`,children:(0,Q.jsx)(I,{size:20})}),(0,Q.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Evaluasi (Training)`})]}),(0,Q.jsxs)(o,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:t,children:[`Lihat Semua `,(0,Q.jsx)(x,{size:18})]})]}),(0,Q.jsx)(A,{className:`g-4`,children:e.slice(0,2).map(e=>(0,Q.jsx)(a,{xs:12,md:6,children:(0,Q.jsx)(Oe,{item:e,onViewMateri:n,onStartEvaluasi:r})},e.code))}),(0,Q.jsx)(`style`,{children:`
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
      `})]})),Ae=Y.memo(({articleData:e,onSeeAll:n})=>{let r=[`linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)`,`linear-gradient(135deg, #34d399 0%, #10b981 100%)`,`linear-gradient(135deg, #f472b6 0%, #db2777 100%)`];return(0,Q.jsxs)(`section`,{className:`mb-4 dc-article-section`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Q.jsx)(`div`,{className:`dc-section-icon bg-success bg-opacity-10 text-success`,children:(0,Q.jsx)(c,{size:20})}),(0,Q.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Artikel Terbaru`})]}),(0,Q.jsxs)(o,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:n,children:[`Lihat Semua `,(0,Q.jsx)(x,{size:18})]})]}),(0,Q.jsx)(H,{className:`border-0 shadow-sm dc-card-modern overflow-hidden`,children:(0,Q.jsx)(H.Body,{className:`p-0`,children:e.map((e,i)=>(0,Q.jsxs)(`div`,{className:`dc-article-row-v2`,onClick:n,children:[(0,Q.jsx)(`div`,{className:`dc-article-thumb`,style:{background:r[i%r.length]},children:(0,Q.jsx)(p,{size:28,color:`white`})}),(0,Q.jsxs)(`div`,{className:`dc-article-body`,children:[(0,Q.jsx)(`div`,{className:`d-flex justify-content-between align-items-start mb-1`,children:(0,Q.jsx)(`h6`,{className:`dc-article-title mb-0`,children:e.title})}),(0,Q.jsx)(`p`,{className:`dc-article-desc mb-2 text-muted`,children:e.desc}),(0,Q.jsxs)(`div`,{className:`dc-article-meta d-flex align-items-center gap-3`,children:[(0,Q.jsxs)(`div`,{className:`d-flex align-items-center gap-1`,children:[(0,Q.jsx)(t,{size:14,className:`opacity-50`}),(0,Q.jsx)(`span`,{children:e.date})]}),(0,Q.jsxs)(`div`,{className:`dc-read-more`,children:[(0,Q.jsx)(`span`,{children:`Baca Selengkapnya`}),(0,Q.jsx)(x,{size:16})]})]})]})]},i))})}),(0,Q.jsx)(`style`,{children:`
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
      `})]})}),je=Y.memo(({nextSteps:e,onNavigate:t})=>(0,Q.jsx)(H,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:(0,Q.jsxs)(H.Body,{className:`p-4`,children:[(0,Q.jsx)(`h4`,{className:`fw-bold mb-4 text-dark`,children:`Langkah Selanjutnya`}),e.map((e,n)=>(0,Q.jsxs)(`div`,{className:`dc-next-row`,onClick:()=>t(e.pageKey,e.link),children:[(0,Q.jsxs)(`div`,{className:`dc-next-left`,children:[(0,Q.jsx)(`div`,{className:`dc-next-icon`,children:e.icon}),(0,Q.jsxs)(`div`,{children:[(0,Q.jsx)(`strong`,{children:e.title}),(0,Q.jsx)(`small`,{children:e.desc})]})]}),(0,Q.jsx)(G,{className:`text-muted`,size:14})]},n))]})})),Me=[{id:1,label:`Program Wajib`,status:`Aktif`,code:`QA.EM01`,title:`Pembahasan Akad Jual Beli`,type:`wajib`},{id:2,label:`Program Wajib`,status:`Belum Mulai`,code:`QA.EM02`,title:`Manajemen Keuangan Syariah`,type:`wajib`},{id:3,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM03`,title:`Strategi Pemasaran Islami`,type:`pilihan`},{id:4,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM04`,title:`Digitalisasi Usaha Mikro`,type:`pilihan`}],Ne=[{title:`Strategi Mengembangkan Usaha Mikro di Era Digital`,desc:`Pelajari strategi praktis untuk mengembangkan usaha mikro Anda.`,date:`20 Mei 2024`},{title:`Manajemen Keuangan Syariah untuk UMKM`,desc:`Kelola keuangan usaha dengan prinsip syariah berkelanjutan.`,date:`18 Mei 2024`},{title:`Peluang dan Tantangan UMKM di Tahun 2024`,desc:`Kenali peluang pertumbuhan dan tantangan UMKM tahun ini.`,date:`15 Mei 2024`}];function Pe(){let e=n(),{userData:t,loading:r}=K(),i=me(t),{isRegistered:s,registrationData:c,loading:l}=J(),u=(0,Y.useMemo)(()=>i?.isCandidate??!0,[i]),d=(0,Y.useMemo)(()=>i?.isALB??!1,[i]),f=(0,Y.useMemo)(()=>t?.full_name?re(t.full_name):t?.email?.split(`@`)[0]||`Anggota`,[t]),p=(0,Y.useMemo)(()=>{let e=s,t=(c?.final_status||`PENDING`)===`APPROVED`;return[{no:1,title:`Buat Akun`,desc:`Selesai`,status:`done`,icon:(0,Q.jsx)(L,{})},{no:2,title:`Daftar Menjadi Anggota`,desc:e?`Selesai`:`Belum Lengkap`,status:e?`done`:`active`,icon:(0,Q.jsx)(S,{})},{no:3,title:`Approval`,desc:t?`Disetujui`:e?`Proses Verifikasi`:`Menunggu`,status:t?`done`:e?`active`:`pending`,icon:(0,Q.jsx)(b,{})},{no:4,title:`Menjadi Anggota Koperasi`,desc:t?`Selesai`:`Menunggu`,status:t?`done`:`pending`,icon:(0,Q.jsx)(L,{})}]},[s,c]),m=(0,Y.useMemo)(()=>[{icon:(0,Q.jsx)(S,{}),title:`Lengkapi Data Usaha`,desc:`Isi informasi detail usaha Anda`,pageKey:u?`registrationFormDetail`:`accountPage`},{icon:(0,Q.jsx)(D,{}),title:`Unggah Dokumen`,desc:`Upload KTP, NPWP dan lainnya`,pageKey:u?`registrationFormDetail`:`accountPage`},{icon:(0,Q.jsx)(U,{}),title:`Ajukan Pembiayaan`,desc:`Ajukan pembiayaan sesuai kebutuhan`,pageKey:u?`registrationPage`:`formPengajuanTransaksi`},{icon:(0,Q.jsx)(w,{}),title:`Konsultasi Dengan Kami`,desc:`Tim kami siap membantu Anda`,link:`https://wa.me/6281234567890`}],[u]),h=(0,Y.useCallback)(t=>{if(t)try{e(`/${q({page:t})}`)}catch{e(`/${t}`)}},[e]),g=(0,Y.useCallback)((e,t)=>{if(t){window.open(t,`_blank`,`noopener,noreferrer`);return}h(e)},[h]),_=(0,Y.useCallback)(()=>h(`trainingPage`),[h]),y=(0,Y.useCallback)((t,n)=>{try{e(`/${q({page:`detailMateri`,kurikulumId:t,type:n})}`)}catch{e(`/detailMateri`)}},[e]),x=(0,Y.useCallback)((t,n)=>{try{e(`/${q({page:`evaluasi`,kurikulumId:t,type:n})}`)}catch{e(`/evaluasi`)}},[e]);return r||u&&l?(0,Q.jsx)(Te,{}):(0,Q.jsxs)(`div`,{className:`dc-page-container`,children:[(0,Q.jsxs)(v,{fluid:!0,className:`px-0`,children:[(0,Q.jsxs)(A,{className:`g-4 mb-4`,children:[(0,Q.jsx)(a,{xs:12,lg:8,children:(0,Q.jsx)(H,{className:`dc-hero border-0 h-100`,children:(0,Q.jsxs)(H.Body,{className:`p-0`,children:[(0,Q.jsxs)(`h1`,{children:[`Assalamu'alaikum, `,f,`!`]}),(0,Q.jsx)(`p`,{children:`Selamat datang di Paguyuban Usaha Sukses.`}),(0,Q.jsx)(`p`,{children:u?`Lengkapi data dan mulai perjalanan usaha bersama kami.`:`Kelola tabungan, pembiayaan, dan ikuti kurikulum usaha syariah secara mandiri.`})]})})}),(0,Q.jsx)(a,{xs:12,lg:4,children:(0,Q.jsx)(Ee,{})})]}),(0,Q.jsxs)(A,{className:`g-4`,children:[(0,Q.jsxs)(a,{xs:12,lg:8,children:[u&&(0,Q.jsx)(De,{steps:p,onNavigate:g}),!u&&(0,Q.jsx)(ye,{}),(0,Q.jsx)(xe,{isALB:d,isCandidate:u}),!u&&(0,Q.jsx)(we,{}),(0,Q.jsx)(ke,{trainingData:Me,onSeeAll:_,onViewMateri:y,onStartEvaluasi:x}),(0,Q.jsx)(Ae,{articleData:Ne,onSeeAll:_})]}),(0,Q.jsxs)(a,{xs:12,lg:4,children:[(0,Q.jsx)(je,{nextSteps:m,onNavigate:g}),(0,Q.jsx)(H,{className:`dc-support-box border-0`,children:(0,Q.jsxs)(H.Body,{className:`dc-support-content p-0`,children:[(0,Q.jsx)(`h3`,{children:`Butuh Bantuan?`}),(0,Q.jsx)(`p`,{children:`Tim kami siap membantu Anda dalam setiap langkah perjalanan usaha Anda.`}),(0,Q.jsx)(o,{variant:`primary`,onClick:()=>window.open(`https://wa.me/6281234567890`,`_blank`,`noopener,noreferrer`),children:`Hubungi Kami`})]})})]})]})]}),(0,Q.jsxs)(`section`,{className:`dc-safe-bar`,children:[(0,Q.jsx)(b,{}),(0,Q.jsx)(`strong`,{children:`Aman & Terpercaya`}),(0,Q.jsx)(`span`,{children:`Data Anda aman bersama kami dan semua transaksi sesuai prinsip syariah.`})]})]})}export{Pe as default};