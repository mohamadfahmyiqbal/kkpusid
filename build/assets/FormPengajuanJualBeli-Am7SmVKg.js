import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{Ar as t,B as n,C as r,D as i,F as a,Pr as o,R as s,S as c,Tr as l,Y as u,dt as d,et as ee,f,ft as te,ot as ne,v as p,w as m,y as h,z as re}from"./vendor-DnQ6XDWJ.js";import{n as g}from"./ProfileContext-czfklcub.js";import{s as ie}from"./index-cQEtDZB1.js";import{t as _}from"./SwalAlert-BbR7dAC9.js";import{t as v}from"./UJualBeli-Dg_g4KZR.js";import{n as y,t as b}from"./formatRupiah-B3wsKMuN.js";var x=e(o()),S=l(),C=e=>e.toLocaleString(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}),w=[`Elektronik`,`Kendaraan`,`Property`],T=[{label:`1x Pembayaran`,value:`1`},{label:`3x Pembayaran`,value:`3`},{label:`6x Pembayaran`,value:`6`},{label:`12x Pembayaran`,value:`12`},{label:`24x Pembayaran`,value:`24`}],E=()=>(0,S.jsxs)(f,{className:`g-4 animate-pulse`,children:[(0,S.jsx)(r,{lg:7,children:(0,S.jsxs)(m,{className:`border-0 shadow-sm rounded-4 p-4`,children:[(0,S.jsxs)(`div`,{className:`d-flex align-items-center gap-2 mb-4`,children:[(0,S.jsx)(`div`,{className:`bg-light rounded-3 animate-pulse placeholder-icon-mock`}),(0,S.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,S.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-title-mock`}),(0,S.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-subtitle-mock`})]})]}),[1,2,3,4,5].map(e=>(0,S.jsxs)(`div`,{className:`mb-3`,children:[(0,S.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-label-mock`}),(0,S.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-input-mock`})]},e))]})}),(0,S.jsx)(r,{lg:5,children:(0,S.jsxs)(m,{className:`border-0 shadow-sm rounded-4 p-4 placeholder-card-right`,children:[(0,S.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-title`}),(0,S.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-value`}),(0,S.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-term`}),(0,S.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-detail`}),(0,S.jsx)(`hr`,{className:`opacity-10`}),[1,2,3].map(e=>(0,S.jsxs)(`div`,{className:`d-flex justify-content-between mb-3`,children:[(0,S.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-label`}),(0,S.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-val`})]},e))]})})]});function D(){let e=t(),{userData:o}=g(),[l,D]=(0,x.useState)(``),[O,ae]=(0,x.useState)(``),[k,A]=(0,x.useState)(`12`),[j,M]=(0,x.useState)(0),[N,P]=(0,x.useState)(0),[F,I]=(0,x.useState)([]),[L,R]=(0,x.useState)([]),[z,B]=(0,x.useState)(!0),[V,H]=(0,x.useState)(null),[U,W]=(0,x.useState)(null),[G,K]=(0,x.useState)(null);(0,x.useEffect)(()=>{(async()=>{try{B(!0),H(null);let e=await v.getOptions();if(e.data?.status){let t=e.data.data.categories||[],n=t.length>0?t:w,r=e.data.data.terms||[],i=r.length>0?r:T;I(n),R(i),n.length>0&&D(n[0])}}catch(e){console.error(e),H(`Gagal memuat opsi dari server. Menggunakan opsi default.`),I(w),R(T),w.length>0&&D(w[0])}finally{B(!1)}})()},[]);let q=(0,x.useMemo)(()=>Math.max(0,Number(j)-Number(N)),[j,N]),{estimasiAngsuran:J,totalTagihan:Y,marginPercent:X,keuntunganKoperasi:Z}=(0,x.useMemo)(()=>{let e=Number(j)||0,t=Number(N)||0;if(e<=0||!k)return{estimasiAngsuran:0,totalTagihan:0,marginPercent:0,keuntunganKoperasi:0};let n=parseInt(k),r=L.find(e=>String(e.value)===String(k)),i=0;r&&r.persentase_anggota!==void 0&&(i=o?.role_id&&Number(o.role_id)!==1?Number(r.persentase_anggota):Number(r.persentase_reguler));let a=i/100*e,s=e+a,c=Math.max(0,s-t);return{estimasiAngsuran:Math.ceil(c/n),totalTagihan:s,marginPercent:i,keuntunganKoperasi:a}},[j,N,k,L,o]),Q=(0,x.useMemo)(()=>j!==``&&Number(j)<0?`Harga barang tidak boleh kurang dari 0.`:N!==``&&Number(N)<0?`Uang tanda keseriusan tidak boleh kurang dari 0.`:j!==``&&N!==``&&Number(N)>Number(j)?`Uang tanda keseriusan tidak boleh melebihi harga barang.`:null,[j,N]),$=(0,x.useCallback)(async t=>{t.preventDefault(),K(null),W(null);let n=Number(j);if(n<=0){K(`Harga barang harus lebih dari 0.`);return}if(!O.trim()){K(`Nama barang tidak boleh kosong.`);return}if(!l){K(`Tipe barang harus dipilih.`);return}if(Number(N)>n){K(`Uang tanda keseriusan tidak boleh melebihi harga barang.`);return}try{let t={category:l,item_name:O,tenure:parseInt(k),amount_requested:n,down_payment:Number(N),principal_amount:Number(q),monthly_installment:Number(J),margin_percent:X,margin_amount:Z,total_tagihan:Y},r=await v.submitPengajuan(t);if(r.data?.status||r.status){let t=r.data?.data?.financing_id;e(`/${ie({page:`transactionDetailPage`,financingId:t,return:`jualBeliPage`})}`)}else W(`Pengajuan gagal diproses. Silakan coba lagi.`)}catch(e){console.error(`Submission error:`,e),W(e.response?.data?.message||`Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.`)}},[j,O,l,N,k,q,J,X,Z,Y,e]);return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(c,{fluid:!0,className:`px-0 py-4`,children:z?(0,S.jsx)(E,{}):(0,S.jsxs)(f,{className:`g-4`,children:[(0,S.jsx)(r,{lg:7,children:(0,S.jsx)(m,{className:`border-0 shadow-sm rounded-4 overflow-hidden custom-card`,children:(0,S.jsxs)(m.Body,{className:`p-4`,children:[(0,S.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light`,children:[(0,S.jsx)(`div`,{className:`bg-primary-soft text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center`,children:(0,S.jsx)(ne,{size:24})}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`h5`,{className:`fw-bold mb-0 text-slate-800`,children:`Formulir Pengajuan`}),(0,S.jsx)(`span`,{className:`text-muted small`,children:`Lengkapi rincian pembiayaan barang Anda`})]})]}),(0,S.jsxs)(h,{onSubmit:$,children:[(0,S.jsxs)(h.Group,{className:`mb-3`,children:[(0,S.jsxs)(h.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,S.jsx)(re,{size:16}),` Tipe Barang`]}),(0,S.jsx)(p,{className:`custom-input-group shadow-sm`,children:(0,S.jsx)(h.Select,{className:`fw-bold text-slate-800`,value:l,onChange:e=>D(e.target.value),disabled:z,children:F.map(e=>(0,S.jsx)(`option`,{value:e,children:e},e))})})]}),(0,S.jsxs)(h.Group,{className:`mb-3`,children:[(0,S.jsxs)(h.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,S.jsx)(te,{size:16}),` Nama Barang`]}),(0,S.jsx)(p,{className:`custom-input-group shadow-sm`,children:(0,S.jsx)(h.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Laptop Asus ROG, Honda Vario`,value:O,onChange:e=>ae(e.target.value),required:!0})})]}),(0,S.jsxs)(h.Group,{className:`mb-3`,children:[(0,S.jsxs)(h.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,S.jsx)(a,{size:16}),` Harga Barang`]}),(0,S.jsxs)(p,{className:`custom-input-group shadow-sm`,children:[(0,S.jsx)(p.Text,{className:`fw-bold`,children:`Rp`}),(0,S.jsx)(h.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:b(j),onChange:e=>{let t=y(e.target.value);M(t?Number(t):0)}})]})]}),(0,S.jsxs)(h.Group,{className:`mb-3`,children:[(0,S.jsxs)(h.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,S.jsx)(ee,{size:16}),` Uang Tanda Keseriusan`]}),(0,S.jsxs)(p,{className:`custom-input-group shadow-sm`,children:[(0,S.jsx)(p.Text,{className:`fw-bold`,children:`Rp`}),(0,S.jsx)(h.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:b(N),onChange:e=>{let t=y(e.target.value);P(t?Number(t):0)}})]}),Number(j)>0&&(0,S.jsx)(`div`,{className:`d-flex gap-2 mt-2.5 flex-wrap`,children:[0,10,20,30].map(e=>{let t=Math.floor(Number(j)*(e/100));return(0,S.jsxs)(`button`,{type:`button`,onClick:()=>P(t),className:`btn-quick-dp ${Number(N)===t?`active`:``}`,children:[e,`% (`,e===0?`Tanpa Uang Keseriusan`:`Rp ${b(t)}`,`)`]},e)})})]}),(0,S.jsxs)(h.Group,{className:`mb-4`,children:[(0,S.jsxs)(h.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,S.jsx)(s,{size:16}),` Jangka Waktu (Tenor)`]}),(0,S.jsx)(p,{className:`custom-input-group shadow-sm`,children:(0,S.jsx)(h.Select,{className:`fw-bold text-slate-800`,value:k,onChange:e=>A(e.target.value),disabled:z,children:L.map(e=>(0,S.jsx)(`option`,{value:e.value,children:e.label},e.value))})})]})]})]})})}),(0,S.jsx)(r,{lg:5,children:(0,S.jsxs)(`div`,{className:`sticky-lg-top sticky-calc-panel`,children:[(0,S.jsx)(m,{className:`border-0 shadow-sm rounded-4 overflow-hidden premium-calc-card text-white mb-4`,children:(0,S.jsxs)(m.Body,{className:`p-4 d-flex flex-column h-100`,children:[(0,S.jsxs)(`div`,{className:`d-flex align-items-center gap-2.5 mb-3 pb-3 border-bottom border-white border-opacity-10`,children:[(0,S.jsx)(d,{size:22,className:`text-warning`}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`h6`,{className:`fw-bold mb-0 text-white`,children:`Simulasi Pembiayaan`}),(0,S.jsx)(`span`,{className:`text-white-50 small`,children:`Prinsip Syariah (Murabahah)`})]})]}),(0,S.jsxs)(`div`,{className:`mb-4`,children:[(0,S.jsx)(`span`,{className:`sim-title d-block mb-1`,children:`Total Tagihan (Termasuk Margin)`}),(0,S.jsx)(`h2`,{className:`sim-value-large text-warning mb-1`,children:C(Y)}),(0,S.jsxs)(`span`,{className:`text-white-50 small`,children:[`Tenor: `,L.find(e=>String(e.value)===String(k))?.label||`${k}x Pembayaran`]})]}),(0,S.jsxs)(`div`,{className:`pt-2`,children:[(0,S.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,S.jsx)(`span`,{className:`sim-detail-label`,children:`Harga Barang`}),(0,S.jsx)(`span`,{className:`sim-detail-val`,children:C(Number(j||0))})]}),(0,S.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,S.jsx)(`span`,{className:`sim-detail-label`,children:`Uang Tanda Keseriusan`}),(0,S.jsx)(`span`,{className:`sim-detail-val`,children:C(Number(N||0))})]}),(0,S.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,S.jsx)(`span`,{className:`sim-detail-label`,children:`Pokok Pembiayaan`}),(0,S.jsx)(`span`,{className:`sim-detail-val text-warning fw-bold`,children:C(q)})]}),(0,S.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,S.jsxs)(`span`,{className:`sim-detail-label`,children:[`Keuntungan Koperasi (`,X,`%)`]}),(0,S.jsx)(`span`,{className:`sim-detail-val`,children:C(Z)})]}),(0,S.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,S.jsx)(`span`,{className:`sim-detail-label`,children:`Lama Term`}),(0,S.jsx)(`span`,{className:`sim-detail-val`,children:L.find(e=>String(e.value)===String(k))?.label||`${k}x Pembayaran`})]}),(0,S.jsxs)(`div`,{className:`sim-detail-row border-top border-white border-opacity-10 pt-3 mt-2`,children:[(0,S.jsx)(`span`,{className:`sim-detail-label`,children:`Estimasi Cicilan`}),(0,S.jsxs)(`span`,{className:`sim-detail-val text-warning fw-bold`,children:[C(J),` / Bulan`]})]})]})]})}),Q&&(0,S.jsxs)(_,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,S.jsx)(u,{className:`flex-shrink-0`,size:20}),(0,S.jsx)(`span`,{className:`small fw-semibold`,children:Q})]}),G&&(0,S.jsxs)(_,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,S.jsx)(u,{className:`flex-shrink-0`,size:20}),(0,S.jsx)(`span`,{className:`small fw-semibold`,children:G})]}),U&&(0,S.jsxs)(_,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,S.jsx)(u,{className:`flex-shrink-0`,size:20}),(0,S.jsx)(`span`,{className:`small fw-semibold`,children:U})]}),V&&(0,S.jsxs)(_,{variant:`warning`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,S.jsx)(u,{className:`flex-shrink-0`,size:20}),(0,S.jsx)(`span`,{className:`small fw-semibold`,children:V})]}),(0,S.jsxs)(i,{type:`submit`,onClick:$,className:`w-100 fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2 premium-btn-submit`,disabled:q<=0||!O||z||!!Q,children:[(0,S.jsx)(n,{size:20}),`Proses Pengajuan`]}),(0,S.jsxs)(`div`,{className:`p-3 bg-white rounded-4 shadow-sm border border-light d-flex align-items-start gap-3 mt-4`,children:[(0,S.jsx)(u,{size:24,className:`text-info flex-shrink-0 mt-0.5`}),(0,S.jsxs)(`div`,{children:[(0,S.jsx)(`h6`,{className:`fw-bold text-slate-800 mb-1 info-title`,children:`Catatan Penting`}),(0,S.jsx)(`p`,{className:`text-muted mb-0 small info-desc`,children:`Perhitungan di atas merupakan estimasi sementara. Akad pembiayaan menggunakan prinsip Murabahah yang transparan tanpa bunga/riba tersembunyi.`})]})]})]})})]})}),(0,S.jsx)(`style`,{children:`
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
      `})]})}var O=(0,x.memo)(D);export{O as default};