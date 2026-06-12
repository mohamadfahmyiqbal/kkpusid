import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{At as t,B as n,Dt as r,E as i,Er as a,Fr as o,Ft as s,G as c,Gn as l,Hn as u,Ht as d,K as f,Kn as p,Lt as m,M as h,N as g,Q as _,R as v,Sn as y,T as b,Vt as ee,W as te,Wt as x,X as ne,Zn as S,_t as re,ar as C,at as ie,br as ae,f as oe,fn as se,h as w,in as T,jr as E,k as D,lt as O,m as ce,nt as k,or as le,pt as A,qt as ue,rn as j,sr as M,tt as N,ut as de,w as P,y as F,yn as fe}from"./vendor-tRETzk3e.js";import{n as I}from"./ProfileContext-DSOIulaa.js";import{s as L}from"./index-C0k8FiYk.js";import{t as pe}from"./sanitization-Dcpq2Jck.js";import{t as R}from"./useRegistrationStatus-ByHTlOt4.js";import{t as z}from"./UGlobal-DeObQJOR.js";var B=e(o()),V={CALON_ANGGOTA:`1`,PENGAWAS:`2`,KETUA:`3`,BENDAHARA:`4`,ANGGOTA_PENUH:`5`,ANGGOTA_PENUH_ALB:`6`};V.CALON_ANGGOTA,V.PENGAWAS,V.KETUA,V.BENDAHARA,V.ANGGOTA_PENUH,V.ANGGOTA_PENUH_ALB;var H=e=>e===V.CALON_ANGGOTA,U=e=>e===V.ANGGOTA_PENUH||e===V.ANGGOTA_PENUH_ALB,W=e=>e===V.ANGGOTA_PENUH_ALB,me=e=>e===V.PENGAWAS,G=e=>e===V.KETUA,K=e=>e===V.BENDAHARA,q=50,J=new Map,he=()=>{if(J.size>q){let e=J.keys().next().value;J.delete(e)}},ge=e=>{let t=String(e);return{roleId:t,isCandidate:H(t),isFullMember:U(t),isALB:W(t),isPengawas:me(t),isKetua:G(t),isBendahara:K(t)}},_e=e=>(0,B.useMemo)(()=>{if(!e)return null;let t=e.status_id;if(J.has(t))return J.get(t);let n=ge(e.status_id);return he(),J.set(t,n),n},[e]),ve=()=>z.getFinancialSummary(),Y=a(),X=({title:e,icon:t,amount:n,showBalance:r,onToggleBalance:i,isRefreshing:a,onRefresh:o,onDetail:s,memberDisplayId:c,accountNo:l,subItems:u,gradient:d,formattedAmount:f})=>(0,Y.jsxs)(`div`,{className:`card border-0 shadow-sm overflow-hidden`,style:{background:d,borderRadius:`20px`,color:`white`,boxShadow:`0 10px 25px -5px rgba(0,0,0, 0.2)`,minHeight:`220px`,minWidth:`320px`,maxWidth:`350px`,scrollSnapAlign:`start`,flexShrink:0},children:[(0,Y.jsx)(`div`,{style:{position:`absolute`,top:`-20px`,right:`-20px`,width:`120px`,height:`120px`,background:`rgba(255, 255, 255, 0.05)`,borderRadius:`50%`,zIndex:0}}),(0,Y.jsx)(`div`,{style:{position:`absolute`,bottom:`-40px`,left:`10%`,width:`180px`,height:`180px`,background:`rgba(255, 255, 255, 0.03)`,borderRadius:`50%`,zIndex:0}}),(0,Y.jsxs)(`div`,{className:`card-body p-4 position-relative`,style:{zIndex:1},children:[(0,Y.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-1`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Y.jsx)(`div`,{className:`bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center`,style:{width:`32px`,height:`32px`,background:`rgba(255,255,255,0.2)`},children:(0,Y.jsx)(t,{size:16})}),(0,Y.jsx)(`h6`,{className:`fw-semibold mb-0 opacity-90`,style:{fontSize:`0.85rem`,letterSpacing:`0.5px`},children:e})]}),(0,Y.jsxs)(`div`,{className:`d-flex gap-2`,children:[s&&(0,Y.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all`,onClick:s,"aria-label":`Detail`,children:(0,Y.jsx)(fe,{size:16})}),(0,Y.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${a?`fa-spin`:``}`,onClick:o,disabled:a,"aria-label":`Refresh`,children:(0,Y.jsx)(S,{size:16})}),(0,Y.jsx)(`button`,{type:`button`,className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all`,onClick:i,"aria-label":`Toggle`,children:r?(0,Y.jsx)(T,{size:18}):(0,Y.jsx)(j,{size:18})})]})]}),(0,Y.jsx)(`div`,{className:`py-3`,children:(0,Y.jsx)(`h2`,{className:`fw-bold mb-0 d-flex align-items-baseline`,style:{letterSpacing:`-0.5px`},children:r?f:(0,Y.jsx)(`span`,{style:{fontSize:`1.8rem`,opacity:.9},children:`Rp ••••••••`})})}),(0,Y.jsx)(`div`,{className:`row g-2 mt-0`,children:u&&(0,Y.jsx)(`div`,{className:`col-12`,children:(0,Y.jsx)(`div`,{className:`d-flex flex-column gap-2 text-white mt-1`,children:u.map((e,t)=>(0,Y.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center ${t===u.length-1?``:`border-bottom border-white border-opacity-10 pb-2`}`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[e.icon&&(0,Y.jsx)(e.icon,{size:12,className:`opacity-75`}),(0,Y.jsx)(`div`,{className:`opacity-75 fw-bold`,style:{fontSize:`10px`,textTransform:`uppercase`,letterSpacing:`0.8px`},children:e.label})]}),(0,Y.jsx)(`div`,{className:`fw-bold`,style:{fontSize:`13px`,letterSpacing:`0.5px`},children:r?e.formattedAmount:`Rp ••••••••`})]},t))})})})]})]}),Z=B.memo(()=>{let{userData:e}=I(),t=(0,B.useRef)(null),[n,r]=(0,B.useState)(0),[i,a]=(0,B.useState)([]),[o,c]=(0,B.useState)(0),[f,m]=(0,B.useState)(0),[h,g]=(0,B.useState)(0),[_,v]=(0,B.useState)(0),[b,te]=(0,B.useState)(0),[x,ne]=(0,B.useState)(0),[S,re]=(0,B.useState)(0),[ie,w]=(0,B.useState)(0),[T,E]=(0,B.useState)(0),[O,ce]=(0,B.useState)(0),[k,le]=(0,B.useState)(0),[A,ue]=(0,B.useState)(0),[j,M]=(0,B.useState)(0),[N,de]=(0,B.useState)(0),[P,fe]=(0,B.useState)(0),[L,pe]=(0,B.useState)([]),[R,z]=(0,B.useState)(!1),[V,H]=(0,B.useState)(!0),[U,W]=(0,B.useState)(!1),[me,G]=(0,B.useState)(!1),K=(0,B.useCallback)(async(t=!1)=>{if(e?.member_id){t?W(!0):H(!0);try{let e=await ve();if(e.data?.success){let t=e.data.data.details||[];pe(t),a(t.filter(e=>e.type&&e.type.startsWith(`TABUNGAN_`)));let n=t.find(e=>e.type===`SW_POKOK`);n&&E(n.balance);let i=t.find(e=>e.type===`SW_WAJIB`);i&&ce(i.balance);let o=t.find(e=>e.type===`SS_SUKARELA`);o&&le(o.balance),r((n?.balance||0)+(i?.balance||0)+(o?.balance||0)),c(e.data.data.totalJualBeli||0),m(e.data.data.sisaCicilanJualBeli||0),g(e.data.data.jumlahCicilanBelumDibayar||0),v(e.data.data.totalLoanDebt||0),te(e.data.data.sisaCicilanPinjaman||0),ne(e.data.data.totalNominalPinjaman||0),re(e.data.data.totalNominalCicilanPinjaman||0),w(e.data.data.terbayarPinjaman||0),ue(e.data.data.totalArisanTagihan||0),M(e.data.data.arisanDiikutiCount||0),de(e.data.data.sisaCicilanArisan||0),fe(e.data.data.terbayarArisan||0)}}catch(e){console.error(`Gagal memuat saldo:`,e)}finally{H(!1),W(!1)}}},[e]);(0,B.useEffect)(()=>{K()},[K]);let q=e=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(e||0),J=(0,B.useMemo)(()=>q(n),[n]),he=(0,B.useMemo)(()=>q(T),[T]),ge=(0,B.useMemo)(()=>q(O),[O]),_e=(0,B.useMemo)(()=>q(k),[k]),Z=(0,B.useMemo)(()=>i.reduce((e,t)=>e+(t.balance||0),0),[i]),ye=(0,B.useMemo)(()=>q(Z),[Z]),be=(0,B.useMemo)(()=>{let e=i.find(e=>e.name?.toLowerCase().includes(`haji`))?.balance||0,t=i.find(e=>e.name?.toLowerCase().includes(`umroh`))?.balance||0,n=i.find(e=>e.name?.toLowerCase().includes(`pendidikan`))?.balance||0,r=i.find(e=>e.name?.toLowerCase().includes(`qurban`))?.balance||0;return[{label:`Haji`,formattedAmount:q(e),icon:C},{label:`Umroh`,formattedAmount:q(t),icon:C},{label:`Pendidikan`,formattedAmount:q(n),icon:C},{label:`Qurban`,formattedAmount:q(r),icon:C}]},[i]),xe=(0,B.useMemo)(()=>q(o),[o]),Se=(0,B.useMemo)(()=>[{label:`Sisa Cicilan`,formattedAmount:q(f),icon:p},{label:`Total Pengajuan`,formattedAmount:q(o),icon:p},{label:`Belum Dibayar`,formattedAmount:`${h} Cicilan`,icon:p}],[f,o,h]),Ce=(0,B.useMemo)(()=>q(x),[x]),we=(0,B.useMemo)(()=>[{label:`Nominal Pinjaman`,formattedAmount:q(x),icon:y},{label:`Nominal Cicilan`,formattedAmount:q(S),icon:y},{label:`Sudah Dibayar`,formattedAmount:q(ie),icon:y}],[S,ie,x]),Te=(0,B.useMemo)(()=>q(P),[P]),Ee=(0,B.useMemo)(()=>[{label:`Total Arisan Diikuti`,formattedAmount:`${j} Program`,icon:y},{label:`Total Tagihan`,formattedAmount:q(A),icon:y},{label:`Belum Dibayar`,formattedAmount:q(N),icon:u}],[j,A,N]),De=q(0),Q=e?.member_no||e?.member_id||`-`,$=e?.bank_account_no||e?.bank_info?.bank_account_no||`0000000000000`;return V?(0,Y.jsx)(`div`,{className:`financial-section mb-4`,children:(0,Y.jsx)(`div`,{className:`placeholder-glow p-4 rounded-4`,style:{minHeight:`220px`,background:`linear-gradient(135deg, #075985 0%, #0369a1 100%)`}})}):(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsxs)(`div`,{className:`financial-section mb-4 dash-fade-in position-relative`,children:[(0,Y.jsx)(`button`,{onClick:()=>{t.current&&t.current.scrollBy({left:-350,behavior:`smooth`})},className:`btn btn-light rounded-circle shadow-sm position-absolute start-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center`,style:{width:`40px`,height:`40px`,marginLeft:`-20px`,opacity:.9},children:(0,Y.jsx)(ee,{})}),(0,Y.jsx)(`button`,{onClick:()=>{t.current&&t.current.scrollBy({left:350,behavior:`smooth`})},className:`btn btn-light rounded-circle shadow-sm position-absolute end-0 top-50 translate-middle-y z-3 d-none d-md-flex align-items-center justify-content-center`,style:{width:`40px`,height:`40px`,marginRight:`-20px`,opacity:.9},children:(0,Y.jsx)(d,{})}),(0,Y.jsxs)(`div`,{ref:t,className:`d-flex flex-nowrap overflow-auto gap-3 pb-3 custom-scrollbar`,style:{scrollSnapType:`x mandatory`,paddingBottom:`10px`},children:[(0,Y.jsx)(X,{title:`TOTAL SIMPANAN`,icon:ae,amount:n,formattedAmount:J,showBalance:R,onToggleBalance:()=>z(!R),isRefreshing:U,onRefresh:()=>K(!0),onDetail:()=>G(!0),subItems:[{label:`Pokok`,formattedAmount:he,icon:l},{label:`Wajib`,formattedAmount:ge,icon:u},{label:`Sukarela`,formattedAmount:_e,icon:se}],gradient:`linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)`}),(0,Y.jsx)(X,{title:`TOTAL TABUNGAN`,icon:C,amount:Z,formattedAmount:ye,showBalance:R,onToggleBalance:()=>z(!R),isRefreshing:U,onRefresh:()=>K(!0),memberDisplayId:Q,accountNo:$,subItems:be,gradient:`linear-gradient(135deg, #166534 0%, #15803d 40%, #22c55e 100%)`}),(0,Y.jsx)(X,{title:`TOTAL JUAL BELI`,icon:p,amount:o,formattedAmount:xe,showBalance:R,onToggleBalance:()=>z(!R),isRefreshing:U,onRefresh:()=>K(!0),subItems:Se,gradient:`linear-gradient(135deg, #7e22ce 0%, #9333ea 40%, #a855f7 100%)`}),(0,Y.jsx)(X,{title:`TOTAL PINJAMAN`,icon:y,amount:x,formattedAmount:Ce,showBalance:R,onToggleBalance:()=>z(!R),isRefreshing:U,onRefresh:()=>K(!0),subItems:we,gradient:`linear-gradient(135deg, #b45309 0%, #d97706 40%, #f59e0b 100%)`}),(0,Y.jsx)(X,{title:`TOTAL ARISAN`,icon:y,amount:P,formattedAmount:Te,showBalance:R,onToggleBalance:()=>z(!R),isRefreshing:U,onRefresh:()=>K(!0),memberDisplayId:Q,accountNo:$,subItems:Ee,gradient:`linear-gradient(135deg, #d946ef 0%, #c026d3 40%, #a21caf 100%)`}),(0,Y.jsx)(X,{title:`TOTAL INVESTASI`,icon:s,amount:0,formattedAmount:De,showBalance:R,onToggleBalance:()=>z(!R),isRefreshing:U,onRefresh:()=>K(!0),memberDisplayId:Q,accountNo:$,gradient:`linear-gradient(135deg, #be123c 0%, #e11d48 40%, #f43f5e 100%)`})]}),(0,Y.jsx)(`style`,{children:`
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
          .custom-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1; 
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1; 
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8; 
          }
        `})]}),(0,Y.jsxs)(F,{show:me,onHide:()=>G(!1),centered:!0,children:[(0,Y.jsx)(F.Header,{closeButton:!0,children:(0,Y.jsx)(F.Title,{children:`Rekap Simpanan & Tabungan`})}),(0,Y.jsx)(F.Body,{children:L.length>0?(0,Y.jsxs)(oe,{responsive:!0,hover:!0,children:[(0,Y.jsx)(`thead`,{children:(0,Y.jsxs)(`tr`,{children:[(0,Y.jsx)(`th`,{children:`Jenis`}),(0,Y.jsx)(`th`,{className:`text-end`,children:`Saldo`})]})}),(0,Y.jsx)(`tbody`,{children:L.map((e,t)=>(0,Y.jsxs)(`tr`,{children:[(0,Y.jsx)(`td`,{children:e.name}),(0,Y.jsx)(`td`,{className:`text-end fw-semibold text-primary`,children:q(e.balance)})]},t))})]}):(0,Y.jsx)(`div`,{className:`text-center text-muted py-4`,children:`Belum ada data simpanan.`})}),(0,Y.jsx)(F.Footer,{children:(0,Y.jsx)(D,{variant:`secondary`,onClick:()=>G(!1),children:`Tutup`})})]})]})}),ye=[{id:`simpanan`,label:`Simpanan`,icon:ae,pageKey:`simpananPage`,gradient:`linear-gradient(135deg, #10b981 0%, #059669 100%)`,shadow:`rgba(16, 185, 129, 0.2)`},{id:`program`,label:`Program`,icon:ne,pageKey:`programPage`,gradient:`linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)`,shadow:`rgba(139, 92, 246, 0.2)`},{id:`tabungan`,label:`Tabungan`,icon:g,pageKey:`tabunganPage`,gradient:`linear-gradient(135deg, #f59e0b 0%, #d97706 100%)`,shadow:`rgba(245, 158, 11, 0.2)`},{id:`investasi`,label:`Investasi`,icon:n,pageKey:`investasiPage`,gradient:`linear-gradient(135deg, #ec4899 0%, #db2777 100%)`,shadow:`rgba(236, 72, 153, 0.2)`},{id:`training`,label:`Training`,icon:A,pageKey:`trainingPage`,gradient:`linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)`,shadow:`rgba(6, 182, 212, 0.2)`},{id:`jual-beli`,label:`Jual Beli`,icon:re,pageKey:`jualBeliPage`,gradient:`linear-gradient(135deg, #f97316 0%, #ea580c 100%)`,shadow:`rgba(249, 115, 22, 0.2)`},{id:`transaksi`,label:`Riwayat`,icon:_,pageKey:`billingPage`,gradient:`linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)`,shadow:`rgba(59, 130, 246, 0.2)`}],be=B.memo(({isALB:e,isCandidate:t})=>{let n=E(),r=(0,B.useCallback)(e=>{!e||t||n(`/${L({page:e})}`)},[n,t]),i=(0,B.useMemo)(()=>ye.filter(t=>e?![`transaksi`,`program`,`investasi`].includes(t.id):!0),[e]);return(0,Y.jsxs)(`section`,{className:`mb-4 dc-main-menu-section animate-fade-in`,children:[(0,Y.jsx)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:(0,Y.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Menu Utama`})}),(0,Y.jsx)(`div`,{className:`dc-menu-grid`,children:i.map(e=>{let n=e.icon;return(0,Y.jsxs)(`button`,{type:`button`,className:`dc-menu-item ${t?`is-disabled`:``}`,onClick:()=>r(e.pageKey),disabled:t,"aria-label":`Buka menu ${e.label}`,children:[(0,Y.jsx)(`div`,{className:`dc-menu-icon-wrapper`,style:{background:e.gradient,boxShadow:`0 8px 16px ${e.shadow}`},children:(0,Y.jsx)(n,{size:24})}),(0,Y.jsx)(`span`,{className:`dc-menu-label`,children:e.label})]},e.id)})}),(0,Y.jsx)(`style`,{children:`
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
      `})]})}),xe=B.memo(({item:e,onPay:t})=>{let n=(0,B.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(Number(e.amount)||0),[e.amount]);return(0,Y.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Y.jsxs)(`div`,{className:`dc-bill-card`,onClick:()=>t(e.bill_id),children:[(0,Y.jsxs)(`div`,{className:`dc-bill-card-header`,children:[(0,Y.jsx)(`div`,{className:`dc-bill-icon-bg`,children:(0,Y.jsx)(de,{size:18})}),(0,Y.jsx)(`span`,{className:`dc-bill-type`,children:e.tx_type||`TAGIHAN`})]}),(0,Y.jsxs)(`div`,{className:`dc-bill-card-body`,children:[(0,Y.jsx)(`strong`,{className:`dc-bill-desc`,children:e.description||`Pembayaran Tagihan`}),(0,Y.jsx)(`div`,{className:`dc-bill-amount`,children:n})]}),(0,Y.jsxs)(`div`,{className:`dc-bill-card-footer`,children:[(0,Y.jsx)(`span`,{className:`dc-bill-action-text`,children:`Bayar Sekarang`}),(0,Y.jsx)(c,{size:18})]})]})})}),Se=()=>(0,Y.jsx)(`div`,{className:`dc-bill-item-wrapper`,children:(0,Y.jsx)(`div`,{className:`dc-bill-card skeleton`,children:(0,Y.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Y.jsx)(`div`,{className:`placeholder col-4 mb-3 rounded`,style:{height:`24px`}}),(0,Y.jsx)(`div`,{className:`placeholder col-10 mb-2 rounded`,style:{height:`16px`}}),(0,Y.jsx)(`div`,{className:`placeholder col-8 rounded`,style:{height:`20px`}})]})})}),Ce=()=>{let e=E(),{bills:t,loading:n}=I(),r=(0,B.useCallback)(t=>{t&&e(`/${L({page:`invoicePage`,billId:t,return:`dashboard`})}`)},[e]),i=(0,B.useMemo)(()=>t?.reduce((e,t)=>e+(Number(t.amount)||0),0)||0,[t]),a=(0,B.useMemo)(()=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(i),[i]);return n?(0,Y.jsxs)(`section`,{className:`mb-4 dc-bill-section px-3`,children:[(0,Y.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Y.jsx)(`div`,{className:`placeholder col-5 rounded`,style:{height:`24px`}})}),(0,Y.jsxs)(`div`,{className:`dc-bill-scroll-container`,children:[(0,Y.jsx)(Se,{}),(0,Y.jsx)(Se,{})]})]}):(0,Y.jsxs)(`section`,{className:`mb-4 dc-bill-section`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-3`,children:[(0,Y.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Tagihan Perlu Dibayar`}),t&&t.length>0&&(0,Y.jsxs)(`span`,{className:`badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2 fw-bold`,style:{fontSize:`11px`},children:[t.length,` Tagihan`]})]}),t&&t.length>0?(0,Y.jsxs)(Y.Fragment,{children:[(0,Y.jsx)(`div`,{className:`px-3 mb-3`,children:(0,Y.jsx)(`div`,{className:`dc-bill-summary-card`,children:(0,Y.jsxs)(`div`,{className:`d-flex align-items-center gap-3`,children:[(0,Y.jsx)(`div`,{className:`dc-summary-icon`,children:(0,Y.jsx)(ie,{size:20})}),(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`div`,{className:`text-uppercase opacity-70 fw-bold`,style:{fontSize:`10px`,letterSpacing:`0.5px`},children:`TOTAL TUNGGAKAN`}),(0,Y.jsx)(`div`,{className:`fw-bold h5 mb-0 text-danger`,children:a})]})]})})}),(0,Y.jsx)(`div`,{className:`dc-bill-scroll-container`,children:(0,Y.jsxs)(`div`,{className:`dc-bill-scroll-content`,children:[t.map((e,t)=>(0,Y.jsx)(xe,{item:e,onPay:r},`${e.bill_id??`bill`}-${t}`)),(0,Y.jsx)(`div`,{style:{width:`16px`,flexShrink:0}})]})})]}):(0,Y.jsx)(`div`,{className:`px-3`,children:(0,Y.jsxs)(`div`,{className:`dc-empty-bill-card`,children:[(0,Y.jsx)(`div`,{className:`dc-empty-icon-wrapper`,children:(0,Y.jsx)(te,{size:32})}),(0,Y.jsx)(`h6`,{className:`fw-bold mb-1`,children:`Semua Tagihan Terbayar`}),(0,Y.jsx)(`p`,{className:`text-muted mb-0`,style:{fontSize:`12.5px`},children:`Alhamdulillah, Anda tidak memiliki tagihan yang tertunda saat ini.`})]})}),(0,Y.jsx)(`style`,{children:`
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
      `})]})},we=()=>(0,Y.jsxs)(`div`,{className:`container-fluid pb-5`,children:[(0,Y.jsx)(`div`,{className:`mb-4`,children:(0,Y.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Y.jsx)(`div`,{className:`placeholder col-6 mb-2`,style:{height:`2rem`}}),(0,Y.jsx)(`div`,{className:`placeholder col-4 mb-3`,style:{height:`1.5rem`}})]})}),(0,Y.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Y.jsx)(`div`,{className:`card-body`,children:(0,Y.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Y.jsx)(`div`,{className:`placeholder col-12 mb-3`,style:{height:`1.5rem`}}),(0,Y.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`1rem`}}),(0,Y.jsx)(`div`,{className:`placeholder col-10 mb-3`,style:{height:`1rem`}}),(0,Y.jsx)(`div`,{className:`placeholder col-6`,style:{height:`2.5rem`}})]})})}),(0,Y.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Y.jsx)(`div`,{className:`card-body p-3`,children:(0,Y.jsxs)(`div`,{className:`d-flex align-items-center`,children:[(0,Y.jsx)(`div`,{className:`placeholder me-2`,style:{width:`1rem`,height:`1rem`}}),(0,Y.jsx)(`div`,{className:`placeholder-glow flex-grow-1`,children:(0,Y.jsx)(`div`,{className:`placeholder col-12`,style:{height:`1.2rem`}})})]})})}),(0,Y.jsxs)(`div`,{className:`row g-4 mb-4`,children:[(0,Y.jsxs)(`div`,{className:`col-lg-8`,children:[(0,Y.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Y.jsxs)(`div`,{className:`card-body`,children:[(0,Y.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Y.jsx)(`div`,{className:`placeholder col-4`,style:{height:`1.5rem`}})}),(0,Y.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4].map(e=>(0,Y.jsx)(`div`,{className:`col-md-6`,children:(0,Y.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Y.jsx)(`div`,{className:`placeholder col-8 mb-2`,style:{height:`0.8rem`}}),(0,Y.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})]})},e))})]})}),(0,Y.jsx)(`div`,{className:`card border-0 shadow-sm mb-4`,children:(0,Y.jsxs)(`div`,{className:`card-body`,children:[(0,Y.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Y.jsx)(`div`,{className:`placeholder col-6`,style:{height:`1.5rem`}})}),(0,Y.jsx)(`div`,{className:`row g-3`,children:[1,2,3,4,5,6].map(e=>(0,Y.jsx)(`div`,{className:`col-md-4 col-6`,children:(0,Y.jsx)(`div`,{className:`placeholder-glow`,children:(0,Y.jsx)(`div`,{className:`placeholder`,style:{height:`4rem`}})})},e))})]})})]}),(0,Y.jsx)(`div`,{className:`col-lg-4`,children:(0,Y.jsx)(`div`,{className:`card border-0 shadow-sm`,children:(0,Y.jsxs)(`div`,{className:`card-body`,children:[(0,Y.jsx)(`div`,{className:`placeholder-glow mb-3`,children:(0,Y.jsx)(`div`,{className:`placeholder col-8`,style:{height:`1.5rem`}})}),[1,2,3].map(e=>(0,Y.jsx)(`div`,{className:`mb-3`,children:(0,Y.jsxs)(`div`,{className:`placeholder-glow`,children:[(0,Y.jsx)(`div`,{className:`placeholder col-12 mb-2`,style:{height:`2rem`}}),(0,Y.jsx)(`div`,{className:`placeholder col-10 mb-1`,style:{height:`0.8rem`}}),(0,Y.jsx)(`div`,{className:`placeholder col-8`,style:{height:`0.8rem`}})]})},e))]})})})]}),(0,Y.jsxs)(`div`,{className:`text-center py-3`,children:[(0,Y.jsx)(ce,{animation:`border`,variant:`primary`,size:`sm`}),(0,Y.jsx)(`small`,{className:`d-block mt-2 text-muted`,children:`Memuat dashboard...`})]})]}),Te=B.memo(()=>{let[e,n]=(0,B.useState)(new Date);return(0,B.useEffect)(()=>{let e=setInterval(()=>{n(new Date)},1e3);return()=>clearInterval(e)},[]),(0,Y.jsx)(i,{className:`dc-date-card border-0`,children:(0,Y.jsxs)(i.Body,{className:`d-flex align-items-center gap-3 p-0`,children:[(0,Y.jsx)(t,{}),(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`p`,{className:`mb-1`,children:(e=>e.toLocaleDateString(`id-ID`,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`}))(e)}),(0,Y.jsx)(`strong`,{children:(e=>e.toLocaleTimeString(`id-ID`,{hour:`2-digit`,minute:`2-digit`,second:`2-digit`,hour12:!1})+` WIB`)(e)})]})]})})}),Ee=B.memo(({steps:e,onNavigate:t})=>(0,Y.jsxs)(i,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:[(0,Y.jsxs)(i.Header,{className:`bg-transparent border-0 pt-3 px-4 d-flex justify-content-between align-items-center`,children:[(0,Y.jsx)(`h5`,{className:`fw-bold mb-0 text-dark`,style:{fontSize:`15px`},children:`Status Pendaftaran Anggota`}),(0,Y.jsx)(D,{variant:`link`,className:`p-0 text-decoration-none fw-bold`,style:{fontSize:`12px`},onClick:()=>t(`registrationPage`),children:`Lihat Detail`})]}),(0,Y.jsxs)(i.Body,{className:`px-4 pb-3 pt-1`,children:[(0,Y.jsx)(`p`,{className:`text-muted small mb-0`,style:{fontSize:`12px`},children:`Lengkapi semua tahapan untuk menjadi anggota koperasi secara resmi.`}),(0,Y.jsxs)(`div`,{className:`dc-info-box`,style:{padding:`10px 14px`,marginTop:`12px`},children:[(0,Y.jsx)(m,{style:{fontSize:`14px`}}),(0,Y.jsx)(`span`,{style:{fontSize:`11px`,lineHeight:`1.4`},children:`Untuk dapat mengakses keseluruhan fitur. (*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)`})]}),(0,Y.jsx)(`div`,{className:`dc-steps`,style:{marginTop:`16px`},children:e.map(e=>(0,Y.jsxs)(`div`,{className:`dc-step ${e.status}`,style:{padding:`12px 6px`,cursor:e.status===`pending`?`default`:`pointer`},onClick:()=>{e.status!==`pending`&&t(`registrationPage`)},children:[(0,Y.jsx)(`div`,{className:`dc-step-icon`,style:{width:`34px`,height:`34px`,fontSize:`14px`},children:e.icon}),(0,Y.jsx)(`strong`,{className:`fw-bold mt-1 text-center`,style:{fontSize:`11px`,lineHeight:`1.2`,minHeight:`26px`,display:`flex`,alignItems:`center`,justifyContent:`center`},children:e.title}),e.no===2&&e.status===`active`?(0,Y.jsx)(D,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Daftar Sekarang`}):e.no===3&&e.status===`active`?(0,Y.jsx)(D,{size:`sm`,variant:`primary`,className:`mt-2 py-1 px-2 fw-bold text-nowrap`,style:{fontSize:`9px`,borderRadius:`6px`},onClick:e=>{e.stopPropagation(),t(`registrationPage`)},children:`Lihat Detail`}):(0,Y.jsx)(`small`,{style:{fontSize:`10px`},className:`opacity-75`,children:e.desc})]},e.no))})]})]})),De=B.memo(({item:e,onViewMateri:t,onStartEvaluasi:n})=>{let r=e.label===`Program Wajib`,a=(0,B.useMemo)(()=>{switch(e.status){case`Aktif`:return{bg:`#dcfce7`,color:`#15803d`,label:`Tersedia`};case`Selesai`:return{bg:`#dbeafe`,color:`#1e40af`,label:`Selesai`};default:return{bg:`#f1f5f9`,color:`#475569`,label:`Belum Mulai`}}},[e.status]);return(0,Y.jsx)(`div`,{className:`dc-train-card-wrapper h-100`,children:(0,Y.jsx)(i,{className:`dc-train-card-v2 h-100 border-0 shadow-sm`,children:(0,Y.jsxs)(i.Body,{className:`p-4 d-flex flex-column`,children:[(0,Y.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-3`,children:[(0,Y.jsx)(`span`,{className:`dc-badge-program ${r?`wajib`:`pilihan`}`,children:e.label}),(0,Y.jsx)(`span`,{className:`dc-status-pill`,style:{backgroundColor:a.bg,color:a.color},children:a.label})]}),(0,Y.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,Y.jsxs)(`div`,{className:`dc-train-code d-flex align-items-center gap-1 mb-1`,children:[(0,Y.jsx)(k,{size:14,className:`opacity-50`}),(0,Y.jsx)(`span`,{children:e.code})]}),(0,Y.jsx)(`h5`,{className:`dc-train-title mb-3`,children:e.title}),(0,Y.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4`,children:[(0,Y.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Y.jsx)(N,{size:16}),(0,Y.jsx)(`span`,{children:`1 Materi`})]}),(0,Y.jsxs)(`div`,{className:`dc-meta-info`,children:[(0,Y.jsx)(h,{size:16}),(0,Y.jsx)(`span`,{children:`15 Soal`})]})]})]}),(0,Y.jsxs)(`div`,{className:`d-grid gap-2`,children:[(0,Y.jsxs)(D,{variant:`outline-primary`,className:`dc-btn-secondary d-flex align-items-center justify-content-center gap-2`,onClick:()=>t(e.id,e.type),children:[(0,Y.jsx)(N,{size:18}),(0,Y.jsx)(`span`,{children:`Baca Materi`})]}),(0,Y.jsxs)(D,{variant:`primary`,className:`dc-btn-primary d-flex align-items-center justify-content-center gap-2`,onClick:()=>n(e.id,e.type),children:[(0,Y.jsx)(O,{size:20}),(0,Y.jsx)(`span`,{children:`Mulai Evaluasi`})]})]})]})})})}),Q=B.memo(({trainingData:e,onSeeAll:t,onViewMateri:n,onStartEvaluasi:r})=>(0,Y.jsxs)(`section`,{className:`mb-4 dc-training-section`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Y.jsx)(`div`,{className:`dc-section-icon bg-primary bg-opacity-10 text-primary`,children:(0,Y.jsx)(A,{size:20})}),(0,Y.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Evaluasi (Training)`})]}),(0,Y.jsxs)(D,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:t,children:[`Lihat Semua `,(0,Y.jsx)(c,{size:18})]})]}),(0,Y.jsx)(w,{className:`g-4`,children:e.slice(0,2).map(e=>(0,Y.jsx)(b,{xs:12,md:6,children:(0,Y.jsx)(De,{item:e,onViewMateri:n,onStartEvaluasi:r})},e.code))}),(0,Y.jsx)(`style`,{children:`
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
      `})]})),$=B.memo(({articleData:e,onSeeAll:t})=>{let n=[`linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)`,`linear-gradient(135deg, #34d399 0%, #10b981 100%)`,`linear-gradient(135deg, #f472b6 0%, #db2777 100%)`];return(0,Y.jsxs)(`section`,{className:`mb-4 dc-article-section`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center justify-content-between mb-3 px-1`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center gap-2`,children:[(0,Y.jsx)(`div`,{className:`dc-section-icon bg-success bg-opacity-10 text-success`,children:(0,Y.jsx)(f,{size:20})}),(0,Y.jsx)(`h5`,{className:`fw-bold mb-0`,style:{fontSize:`1rem`,color:`#1e293b`},children:`Artikel Terbaru`})]}),(0,Y.jsxs)(D,{variant:`link`,className:`p-0 text-decoration-none fw-bold d-flex align-items-center`,style:{fontSize:`13px`},onClick:t,children:[`Lihat Semua `,(0,Y.jsx)(c,{size:18})]})]}),(0,Y.jsx)(i,{className:`border-0 shadow-sm dc-card-modern overflow-hidden`,children:(0,Y.jsx)(i.Body,{className:`p-0`,children:e.map((e,r)=>(0,Y.jsxs)(`div`,{className:`dc-article-row-v2`,onClick:t,children:[(0,Y.jsx)(`div`,{className:`dc-article-thumb`,style:{background:n[r%n.length]},children:(0,Y.jsx)(v,{size:28,color:`white`})}),(0,Y.jsxs)(`div`,{className:`dc-article-body`,children:[(0,Y.jsx)(`div`,{className:`d-flex justify-content-between align-items-start mb-1`,children:(0,Y.jsx)(`h6`,{className:`dc-article-title mb-0`,children:e.title})}),(0,Y.jsx)(`p`,{className:`dc-article-desc mb-2 text-muted`,children:e.desc}),(0,Y.jsxs)(`div`,{className:`dc-article-meta d-flex align-items-center gap-3`,children:[(0,Y.jsxs)(`div`,{className:`d-flex align-items-center gap-1`,children:[(0,Y.jsx)(h,{size:14,className:`opacity-50`}),(0,Y.jsx)(`span`,{children:e.date})]}),(0,Y.jsxs)(`div`,{className:`dc-read-more`,children:[(0,Y.jsx)(`span`,{children:`Baca Selengkapnya`}),(0,Y.jsx)(c,{size:16})]})]})]})]},r))})}),(0,Y.jsx)(`style`,{children:`
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
      `})]})}),Oe=B.memo(({nextSteps:e,onNavigate:t})=>(0,Y.jsx)(i,{className:`mb-4 border-0 shadow-sm dc-card-modern`,children:(0,Y.jsxs)(i.Body,{className:`p-4`,children:[(0,Y.jsx)(`h4`,{className:`fw-bold mb-4 text-dark`,children:`Langkah Selanjutnya`}),e.map((e,n)=>(0,Y.jsxs)(`div`,{className:`dc-next-row`,onClick:()=>t(e.pageKey,e.link),children:[(0,Y.jsxs)(`div`,{className:`dc-next-left`,children:[(0,Y.jsx)(`div`,{className:`dc-next-icon`,children:e.icon}),(0,Y.jsxs)(`div`,{children:[(0,Y.jsx)(`strong`,{children:e.title}),(0,Y.jsx)(`small`,{children:e.desc})]})]}),(0,Y.jsx)(d,{className:`text-muted`,size:14})]},n))]})})),ke=[{id:1,label:`Program Wajib`,status:`Aktif`,code:`QA.EM01`,title:`Pembahasan Akad Jual Beli`,type:`wajib`},{id:2,label:`Program Wajib`,status:`Belum Mulai`,code:`QA.EM02`,title:`Manajemen Keuangan Syariah`,type:`wajib`},{id:3,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM03`,title:`Strategi Pemasaran Islami`,type:`pilihan`},{id:4,label:`Program Pilihan`,status:`Belum Mulai`,code:`QA.EM04`,title:`Digitalisasi Usaha Mikro`,type:`pilihan`}],Ae=[{title:`Strategi Mengembangkan Usaha Mikro di Era Digital`,desc:`Pelajari strategi praktis untuk mengembangkan usaha mikro Anda.`,date:`20 Mei 2024`},{title:`Manajemen Keuangan Syariah untuk UMKM`,desc:`Kelola keuangan usaha dengan prinsip syariah berkelanjutan.`,date:`18 Mei 2024`},{title:`Peluang dan Tantangan UMKM di Tahun 2024`,desc:`Kenali peluang pertumbuhan dan tantangan UMKM tahun ini.`,date:`15 Mei 2024`}];function je(){let e=E(),{userData:t,loading:n}=I(),a=_e(t),{isRegistered:o,registrationData:s,loading:c}=R(),u=(0,B.useMemo)(()=>a?.isCandidate??!0,[a]),d=(0,B.useMemo)(()=>a?.isALB??!1,[a]),f=(0,B.useMemo)(()=>t?.full_name?pe(t.full_name):t?.email?.split(`@`)[0]||`Anggota`,[t]),p=(0,B.useMemo)(()=>{let e=o,t=(s?.final_status||`PENDING`)===`APPROVED`;return[{no:1,title:`Buat Akun`,desc:`Selesai`,status:`done`,icon:(0,Y.jsx)(M,{})},{no:2,title:`Daftar Menjadi Anggota`,desc:e?`Selesai`:`Belum Lengkap`,status:e?`done`:`active`,icon:(0,Y.jsx)(x,{})},{no:3,title:`Approval`,desc:t?`Disetujui`:e?`Proses Verifikasi`:`Menunggu`,status:t?`done`:e?`active`:`pending`,icon:(0,Y.jsx)(l,{})},{no:4,title:`Menjadi Anggota Koperasi`,desc:t?`Selesai`:`Menunggu`,status:t?`done`:`pending`,icon:(0,Y.jsx)(M,{})}]},[o,s]),m=(0,B.useMemo)(()=>[{icon:(0,Y.jsx)(x,{}),title:`Lengkapi Data Usaha`,desc:`Isi informasi detail usaha Anda`,pageKey:u?`registrationFormDetail`:`accountPage`},{icon:(0,Y.jsx)(le,{}),title:`Unggah Dokumen`,desc:`Upload KTP, NPWP dan lainnya`,pageKey:u?`registrationFormDetail`:`accountPage`},{icon:(0,Y.jsx)(r,{}),title:`Ajukan Pembiayaan`,desc:`Ajukan pembiayaan sesuai kebutuhan`,pageKey:u?`registrationPage`:`formPengajuanTransaksi`},{icon:(0,Y.jsx)(ue,{}),title:`Konsultasi Dengan Kami`,desc:`Tim kami siap membantu Anda`,link:`https://wa.me/6281234567890`}],[u]),h=(0,B.useCallback)(t=>{if(t)try{e(`/${L({page:t})}`)}catch{e(`/${t}`)}},[e]),g=(0,B.useCallback)((e,t)=>{if(t){window.open(t,`_blank`,`noopener,noreferrer`);return}h(e)},[h]),_=(0,B.useCallback)(()=>h(`trainingPage`),[h]),v=(0,B.useCallback)((t,n)=>{try{e(`/${L({page:`detailMateri`,kurikulumId:t,type:n})}`)}catch{e(`/detailMateri`)}},[e]),y=(0,B.useCallback)((t,n)=>{try{e(`/${L({page:`evaluasi`,kurikulumId:t,type:n})}`)}catch{e(`/evaluasi`)}},[e]);return n||u&&c?(0,Y.jsx)(we,{}):(0,Y.jsxs)(`div`,{className:`dc-page-container`,children:[(0,Y.jsxs)(P,{fluid:!0,className:`px-0`,children:[(0,Y.jsxs)(w,{className:`g-4 mb-4`,children:[(0,Y.jsx)(b,{xs:12,lg:8,children:(0,Y.jsx)(i,{className:`dc-hero border-0 h-100`,children:(0,Y.jsxs)(i.Body,{className:`p-0`,children:[(0,Y.jsxs)(`h1`,{children:[`Assalamu'alaikum, `,f,`!`]}),(0,Y.jsx)(`p`,{children:`Selamat datang di Paguyuban Usaha Sukses.`}),(0,Y.jsx)(`p`,{children:u?`Lengkapi data dan mulai perjalanan usaha bersama kami.`:`Kelola tabungan, pembiayaan, dan ikuti kurikulum usaha syariah secara mandiri.`})]})})}),(0,Y.jsx)(b,{xs:12,lg:4,children:(0,Y.jsx)(Te,{})})]}),(0,Y.jsxs)(w,{className:`g-4`,children:[(0,Y.jsxs)(b,{xs:12,lg:8,children:[u&&(0,Y.jsx)(Ee,{steps:p,onNavigate:g}),!u&&(0,Y.jsx)(Z,{}),(0,Y.jsx)(be,{isALB:d,isCandidate:u}),!u&&(0,Y.jsx)(Ce,{}),(0,Y.jsx)(Q,{trainingData:ke,onSeeAll:_,onViewMateri:v,onStartEvaluasi:y}),(0,Y.jsx)($,{articleData:Ae,onSeeAll:_})]}),(0,Y.jsxs)(b,{xs:12,lg:4,children:[(0,Y.jsx)(Oe,{nextSteps:m,onNavigate:g}),(0,Y.jsx)(i,{className:`dc-support-box border-0`,children:(0,Y.jsxs)(i.Body,{className:`dc-support-content p-0`,children:[(0,Y.jsx)(`h3`,{children:`Butuh Bantuan?`}),(0,Y.jsx)(`p`,{children:`Tim kami siap membantu Anda dalam setiap langkah perjalanan usaha Anda.`}),(0,Y.jsx)(D,{variant:`primary`,onClick:()=>window.open(`https://wa.me/6281234567890`,`_blank`,`noopener,noreferrer`),children:`Hubungi Kami`})]})})]})]})]}),(0,Y.jsxs)(`section`,{className:`dc-safe-bar`,children:[(0,Y.jsx)(l,{}),(0,Y.jsx)(`strong`,{children:`Aman & Terpercaya`}),(0,Y.jsx)(`span`,{children:`Data Anda aman bersama kami dan semua transaksi sesuai prinsip syariah.`})]})]})}export{je as default};