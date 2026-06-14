import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{$ as t,E as n,H as r,Pr as i,Rr as a,S as o,T as s,U as c,W as l,gt as u,h as d,ht as f,it as p,j as m,k as ee,kr as h,ut as te,w as ne,x as g,z as re}from"./vendor-Cpptq3vX.js";import{n as _}from"./ProfileContext-DcsBBjt8.js";import{s as v}from"./index-BT16Ed_l.js";import{t as y}from"./UJualBeli-WD2gGJTl.js";import{n as b,t as x}from"./formatRupiah-Bi_98iUB.js";var S=e(a()),C=h(),w=e=>e.toLocaleString(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}),T=[`Elektronik`,`Kendaraan`,`Property`],E=[{label:`1x Pembayaran`,value:`1`},{label:`3x Pembayaran`,value:`3`},{label:`6x Pembayaran`,value:`6`},{label:`12x Pembayaran`,value:`12`},{label:`24x Pembayaran`,value:`24`}],ie=()=>(0,C.jsxs)(d,{className:`g-4 animate-pulse`,children:[(0,C.jsx)(s,{lg:7,children:(0,C.jsxs)(n,{className:`border-0 shadow-sm rounded-4 p-4`,children:[(0,C.jsxs)(`div`,{className:`d-flex align-items-center gap-2 mb-4`,children:[(0,C.jsx)(`div`,{className:`bg-light rounded-3 animate-pulse placeholder-icon-mock`}),(0,C.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,C.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-title-mock`}),(0,C.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-subtitle-mock`})]})]}),[1,2,3,4,5].map(e=>(0,C.jsxs)(`div`,{className:`mb-3`,children:[(0,C.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-label-mock`}),(0,C.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-input-mock`})]},e))]})}),(0,C.jsx)(s,{lg:5,children:(0,C.jsxs)(n,{className:`border-0 shadow-sm rounded-4 p-4 placeholder-card-right`,children:[(0,C.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-title`}),(0,C.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-value`}),(0,C.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-term`}),(0,C.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-detail`}),(0,C.jsx)(`hr`,{className:`opacity-10`}),[1,2,3].map(e=>(0,C.jsxs)(`div`,{className:`d-flex justify-content-between mb-3`,children:[(0,C.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-label`}),(0,C.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-val`})]},e))]})})]});function D(){let e=i(),{userData:a}=_(),[h,D]=(0,S.useState)(``),[O,k]=(0,S.useState)(``),[A,j]=(0,S.useState)(`12`),[M,N]=(0,S.useState)(0),[P,F]=(0,S.useState)(0),[ae,I]=(0,S.useState)([]),[L,R]=(0,S.useState)([]),[z,B]=(0,S.useState)(!0),[V,H]=(0,S.useState)(null),[U,W]=(0,S.useState)(null),[G,K]=(0,S.useState)(null);(0,S.useEffect)(()=>{(async()=>{try{B(!0),H(null);let e=await y.getOptions();if(e.data?.status){let t=e.data.data.categories||[],n=t.length>0?t:T,r=e.data.data.terms||[],i=r.length>0?r:E;I(n),R(i),n.length>0&&D(n[0])}}catch(e){console.error(e),H(`Gagal memuat opsi dari server. Menggunakan opsi default.`),I(T),R(E),T.length>0&&D(T[0])}finally{B(!1)}})()},[]);let q=(0,S.useMemo)(()=>Math.max(0,Number(M)-Number(P)),[M,P]),{estimasiAngsuran:J,totalTagihan:Y,marginPercent:X,keuntunganKoperasi:Z}=(0,S.useMemo)(()=>{let e=Number(M)||0,t=Number(P)||0;if(e<=0||!A)return{estimasiAngsuran:0,totalTagihan:0,marginPercent:0,keuntunganKoperasi:0};let n=parseInt(A),r=L.find(e=>String(e.value)===String(A)),i=0;r&&r.persentase_anggota!==void 0&&(i=a?.role_id&&Number(a.role_id)!==1?Number(r.persentase_anggota):Number(r.persentase_reguler));let o=i/100*e,s=e+o,c=Math.max(0,s-t);return{estimasiAngsuran:Math.ceil(c/n),totalTagihan:s,marginPercent:i,keuntunganKoperasi:o}},[M,P,A,L,a]),Q=(0,S.useMemo)(()=>M!==``&&Number(M)<0?`Harga barang tidak boleh kurang dari 0.`:P!==``&&Number(P)<0?`Uang muka (DP) tidak boleh kurang dari 0.`:M!==``&&P!==``&&Number(P)>Number(M)?`Uang muka (DP) tidak boleh melebihi harga barang.`:null,[M,P]),$=(0,S.useCallback)(async t=>{t.preventDefault(),K(null),W(null);let n=Number(M);if(n<=0){K(`Harga barang harus lebih dari 0.`);return}if(!O.trim()){K(`Nama barang tidak boleh kosong.`);return}if(!h){K(`Tipe barang harus dipilih.`);return}if(Number(P)>n){K(`Uang muka tidak boleh melebihi harga barang.`);return}try{let t={category:h,item_name:O,tenure:parseInt(A),amount_requested:n,down_payment:Number(P),principal_amount:Number(q),monthly_installment:Number(J),margin_percent:X,margin_amount:Z,total_tagihan:Y},r=await y.submitPengajuan(t);if(r.data?.status||r.status){let t=r.data?.data?.financing_id;e(`/${v({page:`transactionDetailPage`,financingId:t,return:`jualBeliPage`})}`)}else W(`Pengajuan gagal diproses. Silakan coba lagi.`)}catch(e){console.error(`Submission error:`,e),W(e.response?.data?.message||`Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.`)}},[M,O,h,P,A,q,J,X,Z,Y,e]);return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(ne,{fluid:!0,className:`px-0 py-4`,children:z?(0,C.jsx)(ie,{}):(0,C.jsxs)(d,{className:`g-4`,children:[(0,C.jsx)(s,{lg:7,children:(0,C.jsx)(n,{className:`border-0 shadow-sm rounded-4 overflow-hidden custom-card`,children:(0,C.jsxs)(n.Body,{className:`p-4`,children:[(0,C.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light`,children:[(0,C.jsx)(`div`,{className:`bg-primary-soft text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center`,children:(0,C.jsx)(te,{size:24})}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`h5`,{className:`fw-bold mb-0 text-slate-800`,children:`Formulir Pengajuan`}),(0,C.jsx)(`span`,{className:`text-muted small`,children:`Lengkapi rincian pembiayaan barang Anda`})]})]}),(0,C.jsxs)(o,{onSubmit:$,children:[(0,C.jsxs)(o.Group,{className:`mb-3`,children:[(0,C.jsxs)(o.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,C.jsx)(c,{size:16}),` Tipe Barang`]}),(0,C.jsx)(g,{className:`custom-input-group shadow-sm`,children:(0,C.jsx)(o.Select,{className:`fw-bold text-slate-800`,value:h,onChange:e=>D(e.target.value),disabled:z,children:ae.map(e=>(0,C.jsx)(`option`,{value:e,children:e},e))})})]}),(0,C.jsxs)(o.Group,{className:`mb-3`,children:[(0,C.jsxs)(o.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,C.jsx)(u,{size:16}),` Nama Barang`]}),(0,C.jsx)(g,{className:`custom-input-group shadow-sm`,children:(0,C.jsx)(o.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Laptop Asus ROG, Honda Vario`,value:O,onChange:e=>k(e.target.value),required:!0})})]}),(0,C.jsxs)(o.Group,{className:`mb-3`,children:[(0,C.jsxs)(o.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,C.jsx)(re,{size:16}),` Harga Barang`]}),(0,C.jsxs)(g,{className:`custom-input-group shadow-sm`,children:[(0,C.jsx)(g.Text,{className:`fw-bold`,children:`Rp`}),(0,C.jsx)(o.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:x(M),onChange:e=>{let t=b(e.target.value);N(t?Number(t):0)}})]})]}),(0,C.jsxs)(o.Group,{className:`mb-3`,children:[(0,C.jsxs)(o.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,C.jsx)(p,{size:16}),` Uang Muka (DP)`]}),(0,C.jsxs)(g,{className:`custom-input-group shadow-sm`,children:[(0,C.jsx)(g.Text,{className:`fw-bold`,children:`Rp`}),(0,C.jsx)(o.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:x(P),onChange:e=>{let t=b(e.target.value);F(t?Number(t):0)}})]}),Number(M)>0&&(0,C.jsx)(`div`,{className:`d-flex gap-2 mt-2.5 flex-wrap`,children:[0,10,20,30].map(e=>{let t=Math.floor(Number(M)*(e/100));return(0,C.jsxs)(`button`,{type:`button`,onClick:()=>F(t),className:`btn-quick-dp ${Number(P)===t?`active`:``}`,children:[e,`% (`,e===0?`Tanpa DP`:`Rp ${x(t)}`,`)`]},e)})})]}),(0,C.jsxs)(o.Group,{className:`mb-4`,children:[(0,C.jsxs)(o.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,C.jsx)(r,{size:16}),` Jangka Waktu (Tenor)`]}),(0,C.jsx)(g,{className:`custom-input-group shadow-sm`,children:(0,C.jsx)(o.Select,{className:`fw-bold text-slate-800`,value:A,onChange:e=>j(e.target.value),disabled:z,children:L.map(e=>(0,C.jsx)(`option`,{value:e.value,children:e.label},e.value))})})]})]})]})})}),(0,C.jsx)(s,{lg:5,children:(0,C.jsxs)(`div`,{className:`sticky-lg-top sticky-calc-panel`,children:[(0,C.jsx)(n,{className:`border-0 shadow-sm rounded-4 overflow-hidden premium-calc-card text-white mb-4`,children:(0,C.jsxs)(n.Body,{className:`p-4 d-flex flex-column h-100`,children:[(0,C.jsxs)(`div`,{className:`d-flex align-items-center gap-2.5 mb-3 pb-3 border-bottom border-white border-opacity-10`,children:[(0,C.jsx)(f,{size:22,className:`text-warning`}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`h6`,{className:`fw-bold mb-0 text-white`,children:`Simulasi Pembiayaan`}),(0,C.jsx)(`span`,{className:`text-white-50 small`,children:`Prinsip Syariah (Murabahah)`})]})]}),(0,C.jsxs)(`div`,{className:`mb-4`,children:[(0,C.jsx)(`span`,{className:`sim-title d-block mb-1`,children:`Total Tagihan (Termasuk Margin)`}),(0,C.jsx)(`h2`,{className:`sim-value-large text-warning mb-1`,children:w(Y)}),(0,C.jsxs)(`span`,{className:`text-white-50 small`,children:[`Tenor: `,L.find(e=>String(e.value)===String(A))?.label||`${A}x Pembayaran`]})]}),(0,C.jsxs)(`div`,{className:`pt-2`,children:[(0,C.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,C.jsx)(`span`,{className:`sim-detail-label`,children:`Harga Barang`}),(0,C.jsx)(`span`,{className:`sim-detail-val`,children:w(Number(M||0))})]}),(0,C.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,C.jsx)(`span`,{className:`sim-detail-label`,children:`Uang Muka (DP)`}),(0,C.jsx)(`span`,{className:`sim-detail-val`,children:w(Number(P||0))})]}),(0,C.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,C.jsx)(`span`,{className:`sim-detail-label`,children:`Pokok Pembiayaan`}),(0,C.jsx)(`span`,{className:`sim-detail-val text-warning fw-bold`,children:w(q)})]}),(0,C.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,C.jsxs)(`span`,{className:`sim-detail-label`,children:[`Keuntungan Koperasi (`,X,`%)`]}),(0,C.jsx)(`span`,{className:`sim-detail-val`,children:w(Z)})]}),(0,C.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,C.jsx)(`span`,{className:`sim-detail-label`,children:`Lama Term`}),(0,C.jsx)(`span`,{className:`sim-detail-val`,children:L.find(e=>String(e.value)===String(A))?.label||`${A}x Pembayaran`})]}),(0,C.jsxs)(`div`,{className:`sim-detail-row border-top border-white border-opacity-10 pt-3 mt-2`,children:[(0,C.jsx)(`span`,{className:`sim-detail-label`,children:`Estimasi Cicilan`}),(0,C.jsxs)(`span`,{className:`sim-detail-val text-warning fw-bold`,children:[w(J),` / Bulan`]})]})]})]})}),Q&&(0,C.jsxs)(m,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,C.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,C.jsx)(`span`,{className:`small fw-semibold`,children:Q})]}),G&&(0,C.jsxs)(m,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,C.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,C.jsx)(`span`,{className:`small fw-semibold`,children:G})]}),U&&(0,C.jsxs)(m,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,C.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,C.jsx)(`span`,{className:`small fw-semibold`,children:U})]}),V&&(0,C.jsxs)(m,{variant:`warning`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,C.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,C.jsx)(`span`,{className:`small fw-semibold`,children:V})]}),(0,C.jsxs)(ee,{type:`submit`,onClick:$,className:`w-100 fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2 premium-btn-submit`,disabled:q<=0||!O||z||!!Q,children:[(0,C.jsx)(l,{size:20}),`Proses Pengajuan`]}),(0,C.jsxs)(`div`,{className:`p-3 bg-white rounded-4 shadow-sm border border-light d-flex align-items-start gap-3 mt-4`,children:[(0,C.jsx)(t,{size:24,className:`text-info flex-shrink-0 mt-0.5`}),(0,C.jsxs)(`div`,{children:[(0,C.jsx)(`h6`,{className:`fw-bold text-slate-800 mb-1 info-title`,children:`Catatan Penting`}),(0,C.jsx)(`p`,{className:`text-muted mb-0 small info-desc`,children:`Perhitungan di atas merupakan estimasi sementara. Akad pembiayaan menggunakan prinsip Murabahah yang transparan tanpa bunga/riba tersembunyi.`})]})]})]})})]})}),(0,C.jsx)(`style`,{children:`
        .form-page-container {
          width: 100%;
          max-width: 100%;
        }
        .hover-primary {
          transition: all 0.2s ease;
        }
        .hover-primary:hover {
          color: #0369a1 !important;
          transform: translateX(-3px);
        }
        .bg-primary-soft {
          background-color: rgba(3, 105, 161, 0.1);
        }
        .custom-card {
          border: 1px solid #e2e8f0;
        }
        .custom-input-group {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #cbd5e1;
          transition: all 0.2s ease;
        }
        .custom-input-group:focus-within {
          border-color: #0369a1;
          box-shadow: 0 0 0 4px rgba(3, 105, 161, 0.1);
        }
        .custom-input-group .form-control,
        .custom-input-group .form-select {
          border: none !important;
          box-shadow: none !important;
          font-size: 14.5px;
          padding: 11px 14px;
        }
        .custom-input-group .input-group-text {
          border: none !important;
          background-color: #f8fafc;
          color: #64748b;
          font-size: 14.5px;
          padding-left: 16px;
          padding-right: 16px;
        }
        .btn-quick-dp {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-quick-dp:hover {
          background: #e2e8f0;
          color: #0f172a;
          transform: translateY(-1px);
        }
        .btn-quick-dp.active {
          background: #0369a1;
          border-color: #0369a1;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(3, 105, 161, 0.15);
        }
        .btn-metode {
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #475569;
          font-size: 13.5px;
          transition: all 0.2s ease;
        }
        .btn-metode:hover {
          background: #f1f5f9;
          color: #0f172a;
        }
        .btn-metode.active {
          background: #e0f2fe;
          border-color: #0369a1;
          color: #0369a1;
          box-shadow: 0 0 0 3px rgba(3, 105, 161, 0.15);
        }
        .premium-calc-card {
          background: linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
        }
        .premium-calc-card::before {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
          top: -50px;
          right: -50px;
          border-radius: 50%;
          pointer-events: none;
        }
        .sim-title {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.85;
          font-weight: 700;
          color: #e0f2fe;
        }
        .sim-value-large {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.5px;
          font-family: 'Outfit', 'Inter', sans-serif;
        }
        .sim-detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }
        .sim-detail-row:last-child {
          border-bottom: none;
        }
        .sim-detail-label {
          font-size: 13.5px;
          opacity: 0.9;
          color: #f0f9ff;
        }
        .sim-detail-val {
          font-size: 13.5px;
          font-weight: 700;
          color: #ffffff;
        }
        .premium-btn-submit {
          background-color: #0369a1 !important;
          border-color: #0369a1 !important;
          border-radius: 14px !important;
          padding: 12.5px !important;
          font-size: 15px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .premium-btn-submit:hover:not(:disabled) {
          background-color: #0284c7 !important;
          border-color: #0284c7 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(3, 105, 161, 0.3) !important;
        }
        .premium-btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 991px) {
          .sticky-lg-top {
            position: static !important;
          }
        }

        /* Mock Skeleton styles */
        .placeholder-icon-mock {
          width: 38px;
          height: 38px;
        }
        .placeholder-title-mock {
          width: 120px;
          height: 16px;
        }
        .placeholder-subtitle-mock {
          width: 200px;
          height: 12px;
        }
        .placeholder-label-mock {
          width: 80px;
          height: 14px;
        }
        .placeholder-input-mock {
          width: 100%;
          height: 42px;
        }
        .placeholder-card-right {
          height: 380px;
          background: #f8fafc;
        }
        .placeholder-sim-title {
          width: 120px;
          height: 14px;
        }
        .placeholder-sim-value {
          width: 200px;
          height: 28px;
        }
        .placeholder-sim-term {
          width: 100px;
          height: 12px;
        }
        .placeholder-sim-detail {
          width: 180px;
          height: 24px;
        }
        .placeholder-sim-label {
          width: 90px;
          height: 14px;
        }
        .placeholder-sim-val {
          width: 110px;
          height: 14px;
        }

        /* Sticky Calculator & Info panel */
        .sticky-calc-panel {
          top: 130px;
          z-index: 10;
        }
        .info-title {
          font-size: 13px;
        }
        .info-desc {
          line-height: 1.4;
        }
      `})]})}var O=(0,S.memo)(D);export{O as default};