import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{$ as t,E as n,H as r,Lr as i,M as ee,N as a,Nr as te,Or as o,S as s,T as c,U as ne,W as re,_t as l,ft as ie,h as u,j as d,k as ae,lt as oe,nt as se,ot as f,tt as ce,vt as p,w as le,x as m,z as ue}from"./vendor-BLXI4l9F.js";import{n as de}from"./ProfileContext-DZ4DtX_B.js";import{s as fe}from"./index-FKvwYWug.js";import{t as h}from"./UTransaksi-CeEt_YJP.js";import{n as g,t as _}from"./formatRupiah-Bi_98iUB.js";var v=e(i()),y=o(),b=e=>e.toLocaleString(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}),x=[`Elektronik`,`Kendaraan`,`Property`],pe=[{label:`1x Pembayaran`,value:`1`},{label:`3x Pembayaran`,value:`3`},{label:`6x Pembayaran`,value:`6`},{label:`12x Pembayaran`,value:`12`},{label:`24x Pembayaran`,value:`24`}],me=()=>(0,y.jsxs)(u,{className:`g-4 animate-pulse`,children:[(0,y.jsx)(c,{lg:7,children:(0,y.jsxs)(n,{className:`border-0 shadow-sm rounded-4 p-4`,children:[(0,y.jsxs)(`div`,{className:`d-flex align-items-center gap-2 mb-4`,children:[(0,y.jsx)(`div`,{className:`bg-light rounded-3 animate-pulse placeholder-icon-mock`}),(0,y.jsxs)(`div`,{className:`flex-grow-1`,children:[(0,y.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-title-mock`}),(0,y.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-subtitle-mock`})]})]}),[1,2,3,4,5].map(e=>(0,y.jsxs)(`div`,{className:`mb-3`,children:[(0,y.jsx)(`div`,{className:`bg-light rounded mb-2 animate-pulse placeholder-label-mock`}),(0,y.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-input-mock`})]},e))]})}),(0,y.jsx)(c,{lg:5,children:(0,y.jsxs)(n,{className:`border-0 shadow-sm rounded-4 p-4 placeholder-card-right`,children:[(0,y.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-title`}),(0,y.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-value`}),(0,y.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-term`}),(0,y.jsx)(`div`,{className:`bg-light rounded mb-4 animate-pulse placeholder-sim-detail`}),(0,y.jsx)(`hr`,{className:`opacity-10`}),[1,2,3].map(e=>(0,y.jsxs)(`div`,{className:`d-flex justify-content-between mb-3`,children:[(0,y.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-label`}),(0,y.jsx)(`div`,{className:`bg-light rounded animate-pulse placeholder-sim-val`})]},e))]})})]});function S(){let e=te(),{userData:i}=de(),[o,S]=(0,v.useState)(``),[C,he]=(0,v.useState)(``),[w,ge]=(0,v.useState)(`12`),[T,_e]=(0,v.useState)(0),[E,D]=(0,v.useState)(0),[ve,O]=(0,v.useState)([]),[k,A]=(0,v.useState)([]),[j,M]=(0,v.useState)(!0),[N,P]=(0,v.useState)(null),[F,I]=(0,v.useState)(null),[L,R]=(0,v.useState)(null),[z,B]=(0,v.useState)(``),[V,H]=(0,v.useState)(`Non Tunai`),[U,W]=(0,v.useState)(``),[G,K]=(0,v.useState)(``),[q,ye]=(0,v.useState)(``),[J,be]=(0,v.useState)(``),[Y,xe]=(0,v.useState)(``);(0,v.useEffect)(()=>{i&&(B(e=>e||i.full_name||i.name||``),i.bank_info&&(K(e=>e||i.bank_info.bank_name||``),W(e=>e||i.bank_info.bank_account_no||``)))},[i]),(0,v.useEffect)(()=>{(async()=>{try{M(!0),P(null);let e=await h.getOptions();e.data?.status&&(O(e.data.data.categories||[]),A(e.data.data.terms||[]),e.data.data.categories.length>0&&S(e.data.data.categories[0]))}catch(e){console.error(e),P(`Gagal memuat opsi dari server. Menggunakan opsi default.`),O(x),A(pe),x.length>0&&S(x[0])}finally{M(!1)}})()},[]);let X=(0,v.useMemo)(()=>Math.max(0,Number(T)-Number(E)),[T,E]),Z=(0,v.useMemo)(()=>X>0?Math.ceil(X/parseInt(w||1)):0,[X,w]),Q=(0,v.useMemo)(()=>{if(T!==``&&Number(T)<0)return`Harga barang tidak boleh kurang dari 0.`;if(E!==``&&Number(E)<0)return`Uang muka (DP) tidak boleh kurang dari 0.`;if(T!==``&&E!==``&&Number(E)>Number(T))return`Uang muka (DP) tidak boleh melebihi harga barang.`;if(!z.trim())return`Nama penerima tidak boleh kosong.`;if(z.trim().length<3)return`Nama penerima minimal 3 karakter.`;if(V===`Non Tunai`){if(!U.trim())return`Nomor rekening wajib diisi.`;if(!G.trim())return`Bank tujuan wajib diisi.`;if(!/^\d{10,}$/.test(U))return`Nomor rekening minimal 10 digit dan hanya boleh angka.`}if(V===`Tunai`){if(!q.trim())return`Lokasi pencairan wajib diisi.`;if(!J)return`Tanggal pencairan wajib diisi.`;if(!Y)return`Jam pencairan wajib diisi.`;let e=new Date;if(e.setHours(0,0,0,0),new Date(J)<e)return`Tanggal pencairan tidak boleh kurang dari hari ini.`}return null},[T,E,z,V,U,G,q,J,Y]),$=(0,v.useCallback)(async t=>{t.preventDefault(),R(null),I(null);let n=Number(T);if(n<=0){R(`Harga barang harus lebih dari 0.`);return}if(!C.trim()){R(`Nama barang tidak boleh kosong.`);return}if(!o){R(`Tipe barang harus dipilih.`);return}if(Number(E)>n){R(`Uang muka tidak boleh melebihi harga barang.`);return}if(!z.trim()||z.trim().length<3){R(`Nama penerima minimal 3 karakter.`);return}if(V===`Non Tunai`){if(!U.trim()||!G.trim()||!/^\d{10,}$/.test(U)){R(`Data nomor rekening atau bank tujuan tidak valid.`);return}}else if(V===`Tunai`){if(!q.trim()||!J||!Y){R(`Data pencairan tunai wajib dilengkapi.`);return}let e=new Date;if(e.setHours(0,0,0,0),new Date(J)<e){R(`Tanggal pencairan tidak boleh kurang dari hari ini.`);return}}try{let t={category:o,item_name:C,tenure:parseInt(w),amount_requested:n,down_payment:Number(E),principal_amount:Number(X),monthly_installment:Number(Z),metode_pencairan:V,nama_nasabah:z.trim()};V===`Non Tunai`?(t.no_rekening=U,t.bank_tujuan=G.trim()):(t.lokasi_pencairan=q.trim(),t.tanggal_pencairan=J,t.jam_pencairan=Y);let r=await h.submitPengajuan(t);if(r.data?.status||r.status){let t=r.data?.data?.financing_id;e(`/${fe({page:`transactionDetailPage`,financingId:t,return:`transaksiPage`})}`)}else I(`Pengajuan gagal diproses. Silakan coba lagi.`)}catch(e){console.error(`Submission error:`,e),I(e.response?.data?.message||`Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi.`)}},[o,C,w,T,E,X,Z,z,V,U,G,q,J,Y,e]);return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(le,{fluid:!0,className:`px-0 py-4`,children:j?(0,y.jsx)(me,{}):(0,y.jsxs)(u,{className:`g-4`,children:[(0,y.jsx)(c,{lg:7,children:(0,y.jsx)(n,{className:`border-0 shadow-sm rounded-4 overflow-hidden custom-card`,children:(0,y.jsxs)(n.Body,{className:`p-4`,children:[(0,y.jsxs)(`div`,{className:`d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-light`,children:[(0,y.jsx)(`div`,{className:`bg-primary-soft text-primary rounded-3 p-2.5 d-flex align-items-center justify-content-center`,children:(0,y.jsx)(ie,{size:24})}),(0,y.jsxs)(`div`,{children:[(0,y.jsx)(`h5`,{className:`fw-bold mb-0 text-slate-800`,children:`Formulir Pengajuan`}),(0,y.jsx)(`span`,{className:`text-muted small`,children:`Lengkapi rincian pembiayaan barang Anda`})]})]}),(0,y.jsxs)(s,{onSubmit:$,children:[(0,y.jsxs)(s.Group,{className:`mb-3`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(ne,{size:16}),` Tipe Barang`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Select,{className:`fw-bold text-slate-800`,value:o,onChange:e=>S(e.target.value),disabled:j,children:ve.map(e=>(0,y.jsx)(`option`,{value:e,children:e},e))})})]}),(0,y.jsxs)(s.Group,{className:`mb-3`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(p,{size:16}),` Nama Barang`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Laptop Asus ROG, Honda Vario`,value:C,onChange:e=>he(e.target.value),required:!0})})]}),(0,y.jsxs)(s.Group,{className:`mb-3`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(ue,{size:16}),` Harga Barang`]}),(0,y.jsxs)(m,{className:`custom-input-group shadow-sm`,children:[(0,y.jsx)(m.Text,{className:`fw-bold`,children:`Rp`}),(0,y.jsx)(s.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:_(T),onChange:e=>{let t=g(e.target.value);_e(t?Number(t):0)}})]})]}),(0,y.jsxs)(s.Group,{className:`mb-3`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(f,{size:16}),` Uang Muka (DP)`]}),(0,y.jsxs)(m,{className:`custom-input-group shadow-sm`,children:[(0,y.jsx)(m.Text,{className:`fw-bold`,children:`Rp`}),(0,y.jsx)(s.Control,{type:`text`,className:`fw-bold text-slate-800 border-start-0`,placeholder:`0`,value:_(E),onChange:e=>{let t=g(e.target.value);D(t?Number(t):0)}})]}),Number(T)>0&&(0,y.jsx)(`div`,{className:`d-flex gap-2 mt-2.5 flex-wrap`,children:[0,10,20,30].map(e=>{let t=Math.floor(Number(T)*(e/100));return(0,y.jsxs)(`button`,{type:`button`,onClick:()=>D(t),className:`btn-quick-dp ${Number(E)===t?`active`:``}`,children:[e,`% (`,e===0?`Tanpa DP`:`Rp ${_(t)}`,`)`]},e)})})]}),(0,y.jsxs)(s.Group,{className:`mb-4`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(r,{size:16}),` Jangka Waktu (Tenor)`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Select,{className:`fw-bold text-slate-800`,value:w,onChange:e=>ge(e.target.value),disabled:j,children:k.map(e=>(0,y.jsx)(`option`,{value:e.value,children:e.label},e.value))})})]}),(0,y.jsxs)(`div`,{className:`border-top pt-4 mt-4 mb-3`,children:[(0,y.jsxs)(`h6`,{className:`fw-bold text-slate-800 mb-1 d-flex align-items-center gap-2`,children:[(0,y.jsx)(l,{className:`text-primary`,size:18}),` Metode Pencairan & Penerima`]}),(0,y.jsx)(`span`,{className:`text-muted small`,children:`Tentukan rekening tujuan atau metode penyerahan dana pembiayaan`})]}),(0,y.jsxs)(s.Group,{className:`mb-4`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(oe,{size:16}),` Nama Penerima (Sesuai Identitas)`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Masukkan nama lengkap penerima...`,value:z,onChange:e=>B(e.target.value),required:!0})})]}),(0,y.jsxs)(s.Group,{className:`mb-4`,children:[(0,y.jsx)(s.Label,{className:`fw-bold mb-2 small text-muted`,children:`Metode Penerimaan Dana`}),(0,y.jsxs)(`div`,{className:`d-flex gap-2`,children:[(0,y.jsxs)(`button`,{type:`button`,onClick:()=>H(`Non Tunai`),className:`flex-grow-1 py-2.5 rounded-3 border fw-bold d-flex align-items-center justify-content-center gap-2 btn-metode ${V===`Non Tunai`?`active`:``}`,children:[(0,y.jsx)(a,{size:18}),`Non Tunai (Transfer)`]}),(0,y.jsxs)(`button`,{type:`button`,onClick:()=>H(`Tunai`),className:`flex-grow-1 py-2.5 rounded-3 border fw-bold d-flex align-items-center justify-content-center gap-2 btn-metode ${V===`Tunai`?`active`:``}`,children:[(0,y.jsx)(ce,{size:18}),`Tunai (Cash)`]})]})]}),V===`Non Tunai`?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(s.Group,{className:`mb-3`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(a,{size:16}),` Bank Tujuan`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Bank Mandiri, BCA, BRI`,value:G,onChange:e=>K(e.target.value),required:!0})})]}),(0,y.jsxs)(s.Group,{className:`mb-3`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(f,{size:16}),` Nomor Rekening`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Hanya angka, minimal 10 digit`,value:U,onChange:e=>W(e.target.value.replace(/[^\d]/g,``)),required:!0})})]})]}):(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(s.Group,{className:`mb-3`,children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(se,{size:16}),` Lokasi Pencairan`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Control,{type:`text`,className:`fw-bold text-slate-800`,placeholder:`Contoh: Kantor Koperasi Pusat, Cabang Malang`,value:q,onChange:e=>ye(e.target.value),required:!0})})]}),(0,y.jsxs)(u,{className:`g-3 mb-3`,children:[(0,y.jsx)(c,{md:6,children:(0,y.jsxs)(s.Group,{children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(r,{size:16}),` Tanggal Pencairan`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Control,{type:`date`,className:`fw-bold text-slate-800`,value:J,onChange:e=>be(e.target.value),required:!0})})]})}),(0,y.jsx)(c,{md:6,children:(0,y.jsxs)(s.Group,{children:[(0,y.jsxs)(s.Label,{className:`fw-bold mb-1.5 d-flex align-items-center gap-1.5 small text-muted`,children:[(0,y.jsx)(ee,{size:16}),` Jam Pencairan`]}),(0,y.jsx)(m,{className:`custom-input-group shadow-sm`,children:(0,y.jsx)(s.Control,{type:`time`,className:`fw-bold text-slate-800`,value:Y,onChange:e=>xe(e.target.value),required:!0})})]})})]})]})]})]})})}),(0,y.jsx)(c,{lg:5,children:(0,y.jsxs)(`div`,{className:`sticky-lg-top sticky-calc-panel`,children:[(0,y.jsx)(n,{className:`border-0 shadow-sm rounded-4 overflow-hidden premium-calc-card text-white mb-4`,children:(0,y.jsxs)(n.Body,{className:`p-4 d-flex flex-column h-100`,children:[(0,y.jsxs)(`div`,{className:`d-flex align-items-center gap-2.5 mb-3 pb-3 border-bottom border-white border-opacity-10`,children:[(0,y.jsx)(l,{size:22,className:`text-warning`}),(0,y.jsxs)(`div`,{children:[(0,y.jsx)(`h6`,{className:`fw-bold mb-0 text-white`,children:`Simulasi Pembiayaan`}),(0,y.jsx)(`span`,{className:`text-white-50 small`,children:`Prinsip Syariah (Murabahah)`})]})]}),(0,y.jsxs)(`div`,{className:`mb-4`,children:[(0,y.jsx)(`span`,{className:`sim-title d-block mb-1`,children:`Estimasi Angsuran / Bulan`}),(0,y.jsx)(`h2`,{className:`sim-value-large text-warning mb-1`,children:b(Z)}),(0,y.jsxs)(`span`,{className:`text-white-50 small`,children:[`Tenor: `,k.find(e=>String(e.value)===String(w))?.label||`${w}x Pembayaran`]})]}),(0,y.jsxs)(`div`,{className:`pt-2`,children:[(0,y.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,y.jsx)(`span`,{className:`sim-detail-label`,children:`Harga Barang`}),(0,y.jsx)(`span`,{className:`sim-detail-val`,children:b(Number(T||0))})]}),(0,y.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,y.jsx)(`span`,{className:`sim-detail-label`,children:`Uang Muka (DP)`}),(0,y.jsx)(`span`,{className:`sim-detail-val`,children:b(Number(E||0))})]}),(0,y.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,y.jsx)(`span`,{className:`sim-detail-label`,children:`Pokok Pembiayaan`}),(0,y.jsx)(`span`,{className:`sim-detail-val text-warning fw-bold`,children:b(X)})]}),(0,y.jsxs)(`div`,{className:`sim-detail-row border-top border-white border-opacity-10 pt-3 mt-2`,children:[(0,y.jsx)(`span`,{className:`sim-detail-label`,children:`Penerima`}),(0,y.jsx)(`span`,{className:`sim-detail-val text-truncate`,style:{maxWidth:`160px`},children:z||`-`})]}),(0,y.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,y.jsx)(`span`,{className:`sim-detail-label`,children:`Metode`}),(0,y.jsx)(`span`,{className:`sim-detail-val`,children:V})]}),V===`Non Tunai`&&(G||U)&&(0,y.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,y.jsx)(`span`,{className:`sim-detail-label`,children:`Rekening`}),(0,y.jsxs)(`span`,{className:`sim-detail-val text-truncate`,style:{maxWidth:`160px`},children:[G,` `,U?`(${U})`:``]})]}),V===`Tunai`&&q&&(0,y.jsxs)(`div`,{className:`sim-detail-row`,children:[(0,y.jsx)(`span`,{className:`sim-detail-label`,children:`Lokasi`}),(0,y.jsx)(`span`,{className:`sim-detail-val text-truncate`,style:{maxWidth:`160px`},children:q})]})]})]})}),Q&&(0,y.jsxs)(d,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,y.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,y.jsx)(`span`,{className:`small fw-semibold`,children:Q})]}),L&&(0,y.jsxs)(d,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,y.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,y.jsx)(`span`,{className:`small fw-semibold`,children:L})]}),F&&(0,y.jsxs)(d,{variant:`danger`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,y.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,y.jsx)(`span`,{className:`small fw-semibold`,children:F})]}),N&&(0,y.jsxs)(d,{variant:`warning`,className:`mb-3 d-flex align-items-center gap-2 rounded-3 border-0 py-2.5 px-3`,children:[(0,y.jsx)(t,{className:`flex-shrink-0`,size:20}),(0,y.jsx)(`span`,{className:`small fw-semibold`,children:N})]}),(0,y.jsxs)(ae,{type:`submit`,onClick:$,className:`w-100 fw-bold py-3 shadow d-flex align-items-center justify-content-center gap-2 premium-btn-submit`,disabled:X<=0||!C||j||!!Q,children:[(0,y.jsx)(re,{size:20}),`Proses Pengajuan`]}),(0,y.jsxs)(`div`,{className:`p-3 bg-white rounded-4 shadow-sm border border-light d-flex align-items-start gap-3 mt-4`,children:[(0,y.jsx)(t,{size:24,className:`text-info flex-shrink-0 mt-0.5`}),(0,y.jsxs)(`div`,{children:[(0,y.jsx)(`h6`,{className:`fw-bold text-slate-800 mb-1 info-title`,children:`Catatan Penting`}),(0,y.jsx)(`p`,{className:`text-muted mb-0 small info-desc`,children:`Perhitungan di atas merupakan estimasi sementara. Akad pembiayaan menggunakan prinsip Murabahah yang transparan tanpa bunga/riba tersembunyi.`})]})]})]})})]})}),(0,y.jsx)(`style`,{children:`
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
      `})]})}var C=(0,v.memo)(S);export{C as default};