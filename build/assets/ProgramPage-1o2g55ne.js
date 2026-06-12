import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{Er as t,Fr as n,N as r,X as i,et as a,j as o,jr as s,k as c}from"./vendor-tRETzk3e.js";import{t as l}from"./common-igk7ucmM.js";import{s as u}from"./index-C0k8FiYk.js";import{t as d}from"./SocketListener-CwY3u4dI.js";import{t as f}from"./ProgramAccountCard-CmViNN2w.js";import{t as p}from"./ProgramStatusCard-CQvK-XG1.js";var m=e(n()),h=t(),g=({options:e,activeKey:t,onChange:n})=>(0,h.jsxs)(`div`,{className:`dc-program-tabs-container`,children:[(0,h.jsx)(`div`,{className:`d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 scroll-hide`,children:e?.map(e=>{let r=e.icon;return(0,h.jsxs)(`button`,{onClick:()=>n(e.key),className:`dc-program-tab-btn ${t===e.key?`active`:``}`,children:[r&&(0,h.jsx)(r,{size:18}),(0,h.jsx)(`span`,{children:e.label})]},e.key)})}),(0,h.jsx)(`style`,{children:`
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .dc-program-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 99px;
          border: 1px solid #f1f5f9;
          background: white;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .dc-program-tab-btn:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #334155;
        }

        .dc-program-tab-btn.active {
          background: #005a8d;
          border-color: #005a8d;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 90, 141, 0.2);
        }

        .dc-program-tab-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 767px) {
          .dc-program-tab-btn {
            width: 100%;
          }
        }
      `})]}),_=()=>(0,h.jsxs)(`div`,{className:`animate-pulse px-1`,children:[(0,h.jsxs)(`div`,{className:`d-flex flex-column flex-md-row gap-2 overflow-hidden mb-4 px-1`,children:[(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-10 rounded-pill program-skeleton-tab`}),(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-10 rounded-pill program-skeleton-tab`})]}),(0,h.jsxs)(`div`,{className:`bg-secondary bg-opacity-10 rounded-5 w-100 p-4 animate-pulse`,style:{height:`340px`,border:`1px solid rgba(0,0,0,0.03)`},children:[(0,h.jsxs)(`div`,{className:`d-flex justify-content-between mb-4`,children:[(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-20 rounded`,style:{width:`140px`,height:`20px`}}),(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-20 rounded-pill`,style:{width:`80px`,height:`24px`}})]}),(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-25 rounded mb-4`,style:{width:`42px`,height:`30px`}}),(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-20 rounded mb-4`,style:{width:`70%`,height:`22px`}}),(0,h.jsxs)(`div`,{className:`row g-3 mb-4`,children:[(0,h.jsxs)(`div`,{className:`col-6`,children:[(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-10 rounded mb-1`,style:{width:`40px`,height:`10px`}}),(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-20 rounded`,style:{width:`90px`,height:`16px`}})]}),(0,h.jsxs)(`div`,{className:`col-6`,children:[(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-10 rounded mb-1`,style:{width:`40px`,height:`10px`}}),(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-20 rounded`,style:{width:`90px`,height:`16px`}})]})]}),(0,h.jsxs)(`div`,{className:`border-top border-secondary border-opacity-10 pt-3 d-flex justify-content-between`,children:[(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-10 rounded`,style:{width:`60px`,height:`12px`}}),(0,h.jsx)(`div`,{className:`bg-secondary bg-opacity-20 rounded`,style:{width:`120px`,height:`24px`}})]})]})]}),v=[{label:`Pinjaman Lunak`,key:`pinjaman`,icon:r},{label:`Arisan`,key:`arisan`,icon:i}];function y(){let e=s(),t=(0,m.useRef)(null),n=(0,m.useRef)(v),[y,b]=(0,m.useState)(`pinjaman`),[x,S]=(0,m.useState)(v),[C,w]=(0,m.useState)({pinjaman:null,arisan:null}),[T,E]=(0,m.useState)([]),[D,O]=(0,m.useState)(!0),[k,A]=(0,m.useState)(null);(0,m.useEffect)(()=>{n.current=x},[x]);let j=e=>new Intl.NumberFormat(`id-ID`,{style:`currency`,currency:`IDR`,minimumFractionDigits:0}).format(e||0),M=e=>{if(!e)return`-`;let t=new Date(e);return isNaN(t.getTime())?`-`:t.toLocaleDateString(`id-ID`,{day:`2-digit`,month:`long`,year:`numeric`})},N=(0,m.useCallback)(async(e,t)=>{let n=await l.get(`/program/${e}`,{signal:t});if(!n.data?.success)throw Error(n.data?.message||`Gagal mengambil data ${e}`);return n.data.data},[]),P=(0,m.useCallback)(async()=>{try{let e=await l.get(`/program/arisan/available`);e.data?.success&&E(e.data.data||[])}catch(e){console.error(`Error fetching available arisan:`,e)}},[]),F=(0,m.useCallback)((e,t)=>e?t===`pinjaman`?{nama:e.member?.name||`-`,produk:e.product?.name||`Pinjaman Lunak`,akad:e.product?.akad_type||`Murabahah`,tanggalBuka:M(e.created_at),saldoAkhir:j(e.principal_amount||e.nominal_principal),status:e.status,financingId:e.financing_id||e.loan_id,isPending:e.is_pending||e.status===`PENDING`||e.status===`WAITING_APPROVAL`||e.current_step_id!=null,isApproved:e.is_approved||e.status===`APPROVED`,statusLabel:e.status_label||(e.status===`APPROVED`?`Aktif (Disetujui)`:`Menunggu Approval`)}:t===`arisan`?{nama:e.member_name||`-`,produk:`${e.program_name||`Arisan`} - ${e.batch_name||``}`.trim(),akad:`No. Peserta: ${e.participant_no||`-`}`,tanggalBuka:M(e.created_at),saldoAkhir:j(e.current_balance),status:e.status,isPending:e.is_pending,isApproved:e.is_approved,statusLabel:e.status_label||(e.is_approved?`Aktif`:`Menunggu Approval`),financingId:e.financing_id}:null:null,[]),I=(0,m.useCallback)(async()=>{t.current&&t.current.abort();let e=new AbortController;t.current=e,O(!0),A(null);try{let[t,n,a]=await Promise.all([N(`options`,e.signal).catch(()=>v),N(`pinjaman`,e.signal).catch(()=>null),N(`arisan`,e.signal).catch(()=>null)]);e.signal.aborted||(S(t.map(e=>({...e,icon:e.key===`arisan`?i:r}))),w({pinjaman:F(n,`pinjaman`),arisan:F(a,`arisan`)}),a||P())}catch(e){e.name!==`AbortError`&&A(e.message)}finally{e.signal.aborted||O(!1)}},[N,F,P]);(0,m.useEffect)(()=>(I(),()=>{t.current&&t.current.abort()}),[I]),d((0,m.useCallback)(e=>{[`financing_applications`,`arisan`,`program`].includes(e?.entityRef)&&I()},[I]));let L=(0,m.useMemo)(()=>C[y],[C,y]),R=(0,m.useCallback)(()=>{if(L?.isPending&&L?.financingId){e(`/${u({page:y===`arisan`?`arisanDetailPage`:`pinjamanDetailPage`,financingId:L.financingId})}`);return}e(`/${u({page:y===`arisan`?`arisanPage`:`formPengajuanPinjaman`})}`)},[y,e,L]),z=(0,m.useCallback)(()=>{if(y===`pinjaman`&&L?.isPending&&L?.financingId){e(`/${u({page:`pinjamanDetailPage`,financingId:L.financingId})}`);return}if(y===`pinjaman`&&L?.isApproved&&L?.financingId){e(`/${u({page:`billingPage`,financingId:L.financingId,category:`PINJAMAN`})}`);return}e(`/${u({page:`billingPage`})}`)},[y,e,L]);return(0,h.jsxs)(`div`,{className:`program-page-container px-3 pb-5`,children:[(0,h.jsx)(`div`,{className:`mb-4`,children:(0,h.jsx)(g,{options:x,activeKey:y,onChange:b})}),D?(0,h.jsx)(_,{}):k?(0,h.jsxs)(o,{variant:`danger`,className:`shadow-sm rounded-4 border-0 animate-fade-in`,children:[(0,h.jsxs)(`div`,{className:`d-flex align-items-center gap-2 mb-2`,children:[(0,h.jsx)(a,{size:20}),(0,h.jsx)(`strong`,{className:`h6 mb-0`,children:`Gagal Memuat Data`})]}),(0,h.jsx)(`p`,{className:`small mb-3`,children:k}),(0,h.jsx)(c,{variant:`outline-danger`,size:`sm`,className:`fw-bold px-3 rounded-pill`,onClick:I,children:`Coba Lagi`})]}):L?.isPending?(0,h.jsx)(`div`,{className:`animate-fade-in`,children:(0,h.jsx)(p,{title:`Informasi ${y===`arisan`?`Arisan`:`Pinjaman`}`,message:`Pengajuan menunggu approval`,buttonText:`Lihat Detail Pengajuan`,onButtonClick:R,variant:`pending`})}):L?(0,h.jsx)(`div`,{className:`animate-fade-in`,children:(0,h.jsx)(f,{accountData:L,handleSetoran:z,handlePengajuan:R})}):(0,h.jsx)(`div`,{className:`animate-fade-in`,children:(0,h.jsx)(p,{title:`Informasi ${y===`arisan`?`Arisan`:`Pinjaman`}`,message:`Anda belum memiliki transaksi ${y} yang aktif.`,buttonText:y===`arisan`?`Daftar Sekarang`:`Pengajuan Pinjaman Baru`,onButtonClick:R,variant:`empty`})})]})}export{y as default};