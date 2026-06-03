import{t as e}from"./Alert-BrSc-Rd4.js";import{t}from"./Col-DxuYZdk2.js";import{t as n}from"./Container-DdaNF8ij.js";import{t as r}from"./Form-DM_RWhkp.js";import{t as i}from"./InputGroup-DpE28MAE.js";import{t as a}from"./Row-CzTa8_qR.js";import{$ as ee,C as te,D as o,E as s,G as ne,H as c,I as l,O as re,Q as u,R as ie,_ as d,fr as f,g as ae,hr as oe,mr as se,n as p,o as ce,q as le,rr as ue,vr as m,xr as h,z as de}from"./index-0Aj5Wkjo.js";import{t as g}from"./UTransaksi-CfesgZgm.js";import{n as _,t as v}from"./formatRupiah-Bi_98iUB.js";var y=h(m()),b=f(),x=e=>e.toLocaleString(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}),S=[`Elektronik`,`Kendaraan`,`Property`],fe=[{label:`1x Pembayaran`,value:`1`},{label:`3x Pembayaran`,value:`3`},{label:`6x Pembayaran`,value:`6`},{label:`12x Pembayaran`,value:`12`},{label:`24x Pembayaran`,value:`24`}],pe=()=>(0,b.jsxs)(a,{className:`g-4 animate-pulse`,children:[(0,b.jsx)(t,{lg:7,children:(0,b.jsxs)(p,{className:`border-0 shadow-sm rounded-4 p-4`,children:[(0,b.jsxs)(`div`,{className:`d-flex align-items-center gap-2 mb-4`,children:[(0,b.jsx)(`div`,{className:`bg-light rounded-3 animate-pulse placeholder-icon-mock`}),(0,b.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,b.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-title-mock`}),(0,b.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-subtitle-mock`})]})]}),[1,2,3,4,5].map(e=>(0,b.jsxs)(`div`,{className:`mb-3`,children:[(0,b.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-label-mock`}),(0,b.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-input-mock`})]},e))]})}),(0,b.jsx)(t,{lg:5,children:(0,b.jsxs)(p,{className:`border-0 shadow-sm rounded-4 p-4 placeholder-card-right`,children:[(0,b.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-title`}),(0,b.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-value`}),(0,b.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-term`}),(0,b.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-detail`}),(0,b.jsx)(`hr`,{className:`opacity-10`}),[1,2,3].map(e=>(0,b.jsxs)(`div`,{className:`d-flex justify-content-between mb-3`,children:[(0,b.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-label`}),(0,b.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-val`})]},e))]})})]});function C(){let f=oe(),{userData:m}=ue(),[h,C]=(0,y.useState)(``),[w,me]=(0,y.useState)(``),[T,he]=(0,y.useState)(`12`),[E,ge]=(0,y.useState)(0),[D,O]=(0,y.useState)(0),[_e,k]=(0,y.useState)([]),[A,j]=(0,y.useState)([]),[M,N]=(0,y.useState)(!0),[P,F]=(0,y.useState)(null),[I,L]=(0,y.useState)(null),[R,z]=(0,y.useState)(null),[B,V]=(0,y.useState)(``),[H,U]=(0,y.useState)(`Non Tunai`),[W,ve]=(0,y.useState)(``),[G,ye]=(0,y.useState)(``),[K,q]=(0,y.useState)(``),[J,be]=(0,y.useState)(``),[Y,xe]=(0,y.useState)(``);(0,y.useEffect)(()=>{m&&!B&&V(m.full_name||m.name||``)},[m,B]),(0,y.useEffect)(()=>{(async()=>{try{N(!0),F(null);let e=await g.getOptions();e.data?.status&&(k(e.data.data.categories||[]),j(e.data.data.terms||[]),e.data.data.categories.length>0&&C(e.data.data.categories[0]))}catch(e){console.error(e),F(`Gagal memuat opsi dari server. Menggunakan opsi default.`),k(S),j(fe),S.length>0&&C(S[0])}finally{N(!1)}})()},[]);let X=(0,y.useMemo)(()=>Math.max(0,Number(E)-Number(D)),[E,D]),Z=(0,y.useMemo)(()=>X>0?Math.ceil(X/parseInt(T||1)):0,[X,T]),Q=(0,y.useMemo)(()=>{if(E!==``&&Number(E)<0)return`Harga barang tidak boleh kurang dari 0.`;if(D!==``&&Number(D)<0)return`Uang muka (DP) tidak boleh kurang dari 0.`;if(E!==``&&D!==``&&Number(D)>Number(E))return`Uang muka (DP) tidak boleh melebihi harga barang.`;if(!B.trim())return`Nama penerima tidak boleh kosong.`;if(B.trim().length<3)return`Nama penerima minimal 3 karakter.`;if(H===`Non Tunai`){if(!W.trim())return`Nomor rekening wajib diisi.`;if(!G.trim())return`Bank tujuan wajib diisi.`;if(!/^\d{10,}$/.test(W))return`Nomor rekening minimal 10 digit dan hanya boleh angka.`}if(H===`Tunai`){if(!K.trim())return`Lokasi pencairan wajib diisi.`;if(!J)return`Tanggal pencairan wajib diisi.`;if(!Y)return`Jam pencairan wajib diisi.`;let e=new Date;if(e.setHours(0,0,0,0),new Date(J)<e)return`Tanggal pencairan tidak boleh kurang dari hari ini.`}return null},[E,D,B,H,W,G,K,J,Y]),$=(0,y.useCallback)(async e=>{e.preventDefault(),z(null),L(null);let t=Number(E);if(t<=0){z(`Harga barang harus lebih dari 0.`);return}if(!w.trim()){z(`Nama barang tidak boleh kosong.`);return}if(!h){z(`Tipe barang harus dipilih.`);return}if(Number(D)>t){z(`Uang muka tidak boleh melebihi harga barang.`);return}if(!B.trim()||B.trim().length<3){z(`Nama penerima minimal 3 karakter.`);return}if(H===`Non Tunai`){if(!W.trim()||!G.trim()||!/^\d{10,}$/.test(W)){z(`Data nomor rekening atau bank tujuan tidak valid.`);return}}else if(H===`Tunai`){if(!K.trim()||!J||!Y){z(`Data pencairan tunai wajib dilengkapi.`);return}let e=new Date;if(e.setHours(0,0,0,0),new Date(J)<e){z(`Tanggal pencairan tidak boleh kurang dari hari ini.`);return}}try{let e={category:h,item_name:w,tenure:parseInt(T),amount_requested:t,down_payment:Number(D),principal_amount:Number(X),monthly_installment:Number(Z),metode_pencairan:H,nama_nasabah:B.trim()};H===`Non Tunai`?(e.no_rekening=W,e.bank_tujuan=G.trim()):(e.lokasi_pencairan=K.trim(),e.tanggal_pencairan=J,e.jam_pencairan=Y);let n=await g.submitPengajuan(e);if(n.data?.status||n.status){let e=n.data?.data?.financing_id;f(`/${se({page:`transactionDetailPage`,financingId:e,return:`transaksiPage`})}`)}else L(`Pengajuan gagal diproses. Silakan coba lagi.`)}catch(e){console.error(`Submission error:`,e),L(e.response?.data?.message||`Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.`)}},[h,w,T,E,D,X,Z,B,H,W,G,K,J,Y,f]);return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(n,{fluid:!0,className:`px-0 py-4`,children:M?(0,b.jsx)(pe,{}):(0,b.jsxs)(a,{className:`g-4`,children:[(0,b.jsx)(t,{lg:7,children:(0,b.jsx)(p,{className:`border-0 shadow-sm rounded-4 overflow-hidden custom-card`,children:(0,b.jsxs)(p.Body,{className:`p-4`,children:[(0,b.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light`,children:[(0,b.jsx)(`div`,{className:`bg-primary-soft text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center`,children:(0,b.jsx)(le,{size:24})}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h5`,{className:`fw-bold mb-0 text-slate-800`,children:`Formulir Pengajuan`}),(0,b.jsx)(`span`,{className:`text-muted small`,children:`Lengkapi rincian pembiayaan barang Anda`})]})]}),(0,b.jsxs)(r,{onSubmit:$,children:[(0,b.jsxs)(r.Group,{className:`mb-3`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(o,{size:16}),` Tipe Barang`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Select,{className:`fw-bold text-slate-800`,value:h,onChange:e=>C(e.target.value),disabled:M,children:_e.map(e=>(0,b.jsx)(`option`,{value:e,children:e},e))})})]}),(0,b.jsxs)(r.Group,{className:`mb-3`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(ee,{size:16}),` Nama Barang`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Laptop Asus ROG, Honda Vario`,value:w,onChange:e=>me(e.target.value),required:!0})})]}),(0,b.jsxs)(r.Group,{className:`mb-3`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(te,{size:16}),` Harga Barang`]}),(0,b.jsxs)(i,{className:`custom-input-group shadow-sm`,children:[(0,b.jsx)(i.Text,{className:`fw-bold`,children:`Rp`}),(0,b.jsx)(r.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:v(E),onChange:e=>{let t=_(e.target.value);ge(t?Number(t):0)}})]})]}),(0,b.jsxs)(r.Group,{className:`mb-3`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(c,{size:16}),` Uang Muka (DP)`]}),(0,b.jsxs)(i,{className:`custom-input-group shadow-sm`,children:[(0,b.jsx)(i.Text,{className:`fw-bold`,children:`Rp`}),(0,b.jsx)(r.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:v(D),onChange:e=>{let t=_(e.target.value);O(t?Number(t):0)}})]}),Number(E)>0&&(0,b.jsx)(`div`,{className:`d-flex gap-2 mt-2.5 flex-wrap`,children:[0,10,20,30].map(e=>{let t=Math.floor(Number(E)*(e/100));return(0,b.jsxs)(`button`,{type:`button`,onClick:()=>O(t),className:`btn-quick-dp ${Number(D)===t?`active`:``}`,children:[e,`% (`,e===0?`Tanpa DP`:`Rp ${v(t)}`,`)`]},e)})})]}),(0,b.jsxs)(r.Group,{className:`mb-4`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(s,{size:16}),` Jangka Waktu (Tenor)`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Select,{className:`fw-bold text-slate-800`,value:T,onChange:e=>he(e.target.value),disabled:M,children:A.map(e=>(0,b.jsx)(`option`,{value:e.value,children:e.label},e.value))})})]}),(0,b.jsxs)(`div`,{className:`border-top pt-4 mt-4 mb-3`,children:[(0,b.jsxs)(`h6`,{className:`fw-bold text-slate-800 mb-1 d-flex align-items-center gap-2`,children:[(0,b.jsx)(u,{className:`text-primary`,size:18}),` Metode Pencairan & Penerima`]}),(0,b.jsx)(`span`,{className:`text-muted small`,children:`Tentukan rekening tujuan atau metode penyerahan dana pembiayaan`})]}),(0,b.jsxs)(r.Group,{className:`mb-4`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(ne,{size:16}),` Nama Penerima (Sesuai Identitas)`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Masukkan nama lengkap penerima...`,value:B,onChange:e=>V(e.target.value),required:!0})})]}),(0,b.jsxs)(r.Group,{className:`mb-4`,children:[(0,b.jsx)(r.Label,{className:`fw-bold mb-2 small text-muted`,children:`Metode Penerimaan Dana`}),(0,b.jsxs)(`div`,{className:`d-flex gap-2`,children:[(0,b.jsxs)(`button`,{type:`button`,onClick:()=>U(`Non Tunai`),className:`flex-grow-1 py-2.5 rounded-3 border fw-bold d-flex align-items-center justify-content-center gap-2 btn-metode ${H===`Non Tunai`?`active`:``}`,children:[(0,b.jsx)(d,{size:18}),`Non Tunai (Transfer)`]}),(0,b.jsxs)(`button`,{type:`button`,onClick:()=>U(`Tunai`),className:`flex-grow-1 py-2.5 rounded-3 border fw-bold d-flex align-items-center justify-content-center gap-2 btn-metode ${H===`Tunai`?`active`:``}`,children:[(0,b.jsx)(ie,{size:18}),`Tunai (Cash)`]})]})]}),H===`Non Tunai`?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(r.Group,{className:`mb-3`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(d,{size:16}),` Bank Tujuan`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Bank Mandiri, BCA, BRI`,value:G,onChange:e=>ye(e.target.value),required:!0})})]}),(0,b.jsxs)(r.Group,{className:`mb-3`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(c,{size:16}),` Nomor Rekening`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Hanya angka, minimal 10 digit`,value:W,onChange:e=>ve(e.target.value.replace(/[^\d]/g,``)),required:!0})})]})]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(r.Group,{className:`mb-3`,children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(de,{size:16}),` Lokasi Pencairan`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Kantor Koperasi Pusat, Cabang Malang`,value:K,onChange:e=>q(e.target.value),required:!0})})]}),(0,b.jsxs)(a,{className:`g-3 mb-3`,children:[(0,b.jsx)(t,{md:6,children:(0,b.jsxs)(r.Group,{children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(s,{size:16}),` Tanggal Pencairan`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Control,{type:`date`,className:`fw-bold text-slate-800`,value:J,onChange:e=>be(e.target.value),required:!0})})]})}),(0,b.jsx)(t,{md:6,children:(0,b.jsxs)(r.Group,{children:[(0,b.jsxs)(r.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,b.jsx)(ae,{size:16}),` Jam Pencairan`]}),(0,b.jsx)(i,{className:`custom-input-group shadow-sm`,children:(0,b.jsx)(r.Control,{type:`time`,className:`fw-bold text-slate-800`,value:Y,onChange:e=>xe(e.target.value),required:!0})})]})})]})]})]})]})})}),(0,b.jsx)(t,{lg:5,children:(0,b.jsxs)(`div`,{className:`sticky-lg-top sticky-calc-panel`,children:[(0,b.jsx)(p,{className:`border-0 shadow-sm rounded-4 overflow-hidden premium-calc-card text-white mb-4`,children:(0,b.jsxs)(p.Body,{className:`p-4 d-flex flex-column h-100`,children:[(0,b.jsxs)(`div`,{className:`d-flex align-items-center gap-2.5 mb-3 pb-3 border-bottom border-white border-opacity-10`,children:[(0,b.jsx)(u,{size:22,className:`text-warning`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h6`,{className:`fw-bold mb-0 text-white`,children:`Simulasi Pembiayaan`}),(0,b.jsx)(`span`,{className:`text-white-50 small`,children:`Prinsip Syariah (Murabahah)`})]})]}),(0,b.jsxs)(`div`,{className:`mb-4`,children:[(0,b.jsx)(`span`,{className:`sim-title d-block mb-1`,children:`Estimasi Angsuran / Bulan`}),(0,b.jsx)(`h2`,{className:`sim-value-large text-warning mb-1`,children:x(Z)}),(0,b.jsxs)(`span`,{className:`text-white-50 small`,children:[`Tenor: `,A.find(e=>String(e.value)===String(T))?.label||`${T}x Pembayaran`]})]}),(0,b.jsxs)(`div`,{className:`pt-2`,children:[(0,b.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,b.jsx)(`span`,{className:`sim-detail-label`,children:`Harga Barang`}),(0,b.jsx)(`span`,{className:`sim-detail-val`,children:x(Number(E||0))})]}),(0,b.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,b.jsx)(`span`,{className:`sim-detail-label`,children:`Uang Muka (DP)`}),(0,b.jsx)(`span`,{className:`sim-detail-val`,children:x(Number(D||0))})]}),(0,b.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,b.jsx)(`span`,{className:`sim-detail-label`,children:`Pokok Pembiayaan`}),(0,b.jsx)(`span`,{className:`sim-detail-val text-warning fw-bold`,children:x(X)})]}),(0,b.jsxs)(`div`,{className:`sim-detail-row border-top border-white border-opacity-10 pt-3 mt-2`,children:[(0,b.jsx)(`span`,{className:`sim-detail-label`,children:`Penerima`}),(0,b.jsx)(`span`,{className:`sim-detail-val text-truncate`,style:{maxWidth:`160px`},children:B||`-`})]}),(0,b.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,b.jsx)(`span`,{className:`sim-detail-label`,children:`Metode`}),(0,b.jsx)(`span`,{className:`sim-detail-val`,children:H})]}),H===`Non Tunai`&&(G||W)&&(0,b.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,b.jsx)(`span`,{className:`sim-detail-label`,children:`Rekening`}),(0,b.jsxs)(`span`,{className:`sim-detail-val text-truncate`,style:{maxWidth:`160px`},children:[G,` `,W?`(${W})`:``]})]}),H===`Tunai`&&K&&(0,b.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,b.jsx)(`span`,{className:`sim-detail-label`,children:`Lokasi`}),(0,b.jsx)(`span`,{className:`sim-detail-val text-truncate`,style:{maxWidth:`160px`},children:K})]})]})]})}),Q&&(0,b.jsxs)(e,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,b.jsx)(l,{className:`flex-shrink-0`,size:20}),(0,b.jsx)(`span`,{className:`small fw-semibold`,children:Q})]}),R&&(0,b.jsxs)(e,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,b.jsx)(l,{className:`flex-shrink-0`,size:20}),(0,b.jsx)(`span`,{className:`small fw-semibold`,children:R})]}),I&&(0,b.jsxs)(e,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,b.jsx)(l,{className:`flex-shrink-0`,size:20}),(0,b.jsx)(`span`,{className:`small fw-semibold`,children:I})]}),P&&(0,b.jsxs)(e,{variant:`warning`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,b.jsx)(l,{className:`flex-shrink-0`,size:20}),(0,b.jsx)(`span`,{className:`small fw-semibold`,children:P})]}),(0,b.jsxs)(ce,{type:`submit`,onClick:$,className:`w-100 fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2 premium-btn-submit`,disabled:X<=0||!w||M||!!Q,children:[(0,b.jsx)(re,{size:20}),`Proses Pengajuan`]}),(0,b.jsxs)(`div`,{className:`p-3 bg-white rounded-4 shadow-sm border border-light d-flex align-items-start gap-3 mt-4`,children:[(0,b.jsx)(l,{size:24,className:`text-info flex-shrink-0 mt-0.5`}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`h6`,{className:`fw-bold text-slate-800 mb-1 info-title`,children:`Catatan Penting`}),(0,b.jsx)(`p`,{className:`text-muted mb-0 small info-desc`,children:`Perhitungan di atas merupakan estimasi sementara. Akad pembiayaan menggunakan prinsip Murabahah yang transparan tanpa bunga/riba tersembunyi.`})]})]})]})})]})}),(0,b.jsx)(`style`,{children:`
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
      `})]})}var w=(0,y.memo)(C);export{w as default};