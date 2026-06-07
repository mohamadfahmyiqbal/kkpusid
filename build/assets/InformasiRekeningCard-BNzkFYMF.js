import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{E as t,F as n,Lr as r,Nr as i,Or as a,P as o,et as s,j as c,k as l,l as u,lt as d,m as f,pt as p,q as m}from"./vendor-BLXI4l9F.js";import{n as h}from"./socket-BGabgJo2.js";import{n as g}from"./ProfileContext-DZ4DtX_B.js";import{s as _}from"./index-FKvwYWug.js";import{t as v}from"./USimpanan-Cdp6klXJ.js";var y=e(r()),b=a(),x=(0,y.memo)(({activeType:e,displayName:r,variant:a=`primary`,showActions:x=!0,fromPage:C=`transaksiPage`})=>{let[w,T]=(0,y.useState)(null),[E,D]=(0,y.useState)(!0),[O,k]=(0,y.useState)(null),[A,j]=(0,y.useState)(!1),M=i(),{userData:N}=g(),P=(0,y.useMemo)(()=>({primary:{gradient:`linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)`,shadow:`rgba(7, 89, 133, 0.3)`},success:{gradient:`linear-gradient(135deg, #065f46 0%, #059669 40%, #10b981 100%)`,shadow:`rgba(5, 150, 105, 0.3)`},warning:{gradient:`linear-gradient(135deg, #92400e 0%, #d97706 40%, #f59e0b 100%)`,shadow:`rgba(217, 119, 6, 0.3)`}}),[]),F=(0,y.useMemo)(()=>P[a]||P.primary,[a,P]),I=(0,y.useCallback)(async(t=!1)=>{if(e){t?j(!0):D(!0),k(null);try{let t=await v.getAccountDetail({category:e});if(t.data?.status){let e=t.data.data;T({nama:e.member_name||`Anggota`,produk:r||e.product_name,saldo:parseFloat(e.balance||0),accountNo:e.account_no,billItemIds:e.billItemIds||[]})}else k(`Data simpanan tidak ditemukan`)}catch{k(`Gagal menyinkronkan saldo`)}finally{D(!1),j(!1)}}},[e,r]);(0,y.useEffect)(()=>{let t=!0;I();let n=N?.member_id,i=h();return n&&i&&i.on(`savings:balance:update`,n=>{n.category===e&&t&&(T(e=>({...e,saldo:n.balance})),u.info(`Saldo ${r} diperbarui: Rp ${n.balance.toLocaleString(`id-ID`)}`,{position:`bottom-center`,autoClose:3e3}))}),()=>{t=!1,i&&i.off(`savings:balance:update`)}},[I,e,r,N]);let L=t=>{let n={return:C,category:e,displayName:r};n=t===`PAY`&&w?.billItemIds?.length>0?{...n,page:`invoicePage`,billItemIds:w.billItemIds}:t===`WITHDRAW`?{...n,page:`penarikanSimpananPage`,maxAmount:w?.saldo,accountNo:w?.accountNo}:{...n,page:`billingPage`},M(`/${_(n)}`)};return E?(0,b.jsx)(t,{className:`border-0 shadow-sm text-center py-5 text-white`,style:{background:F.gradient,borderRadius:`24px`,minHeight:`200px`},children:(0,b.jsxs)(`div`,{className:`d-flex flex-column align-items-center justify-content-center h-100`,children:[(0,b.jsx)(f,{animation:`border`,variant:`light`,size:`sm`}),(0,b.jsx)(`p`,{className:`mt-3 mb-0 small fw-bold opacity-75`,children:`Menghitung Saldo...`})]})}):O?(0,b.jsxs)(c,{variant:`danger`,className:`py-4 text-center border-0 shadow-sm rounded-4 animate-fade-in`,children:[(0,b.jsx)(s,{size:24,className:`mb-2`}),(0,b.jsx)(`div`,{className:`fw-bold`,children:O}),(0,b.jsx)(l,{variant:`link`,size:`sm`,onClick:()=>I(),className:`text-danger p-0 mt-1`,children:`Coba Lagi`})]}):(0,b.jsxs)(t,{className:`border-0 shadow-lg text-white overflow-hidden animate-fade-in`,style:{background:F.gradient,borderRadius:`24px`,boxShadow:`0 20px 40px -10px ${F.shadow}`},children:[(0,b.jsx)(`div`,{style:{position:`absolute`,top:`-20px`,right:`-20px`,width:`140px`,height:`140px`,borderRadius:`50%`,background:`rgba(255,255,255,0.05)`,zIndex:0}}),(0,b.jsx)(`div`,{style:{position:`absolute`,bottom:`-30px`,left:`5%`,width:`100px`,height:`100px`,borderRadius:`50%`,background:`rgba(255,255,255,0.03)`,zIndex:0}}),(0,b.jsxs)(t.Body,{className:`p-4 position-relative`,style:{zIndex:1},children:[(0,b.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-4`,children:[(0,b.jsxs)(`div`,{className:`d-flex align-items-center gap-2 bg-white bg-opacity-10 px-3 py-1 rounded-pill`,children:[(0,b.jsx)(m,{size:14,className:`opacity-75`}),(0,b.jsx)(`span`,{className:`fw-bold`,style:{fontSize:`10px`,letterSpacing:`1px`},children:`INFORMASI REKENING`})]}),(0,b.jsx)(`button`,{className:`btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${A?`fa-spin`:``}`,onClick:()=>I(!0),disabled:A,children:(0,b.jsx)(p,{size:20})})]}),(0,b.jsxs)(`div`,{className:`row g-3 mb-4`,children:[(0,b.jsx)(`div`,{className:`col-7`,children:(0,b.jsxs)(`div`,{className:`d-flex align-items-start gap-2`,children:[(0,b.jsx)(d,{className:`mt-1 opacity-60`,size:16}),(0,b.jsxs)(`div`,{className:`min-w-0`,children:[(0,b.jsx)(`div`,{className:`text-uppercase opacity-60 fw-bold`,style:{fontSize:`9px`,letterSpacing:`0.8px`},children:`NAMA ANGGOTA`}),(0,b.jsx)(`div`,{className:`fw-bold text-truncate`,style:{fontSize:`15px`},children:w?.nama})]})]})}),(0,b.jsx)(`div`,{className:`col-5`,children:(0,b.jsxs)(`div`,{className:`d-flex align-items-start gap-2`,children:[(0,b.jsx)(o,{className:`mt-1 opacity-60`,size:16}),(0,b.jsxs)(`div`,{children:[(0,b.jsx)(`div`,{className:`text-uppercase opacity-60 fw-bold`,style:{fontSize:`9px`,letterSpacing:`0.8px`},children:`NO. REKENING`}),(0,b.jsx)(`div`,{className:`fw-bold`,style:{fontSize:`14px`},children:w?.accountNo||`-`})]})]})})]}),(0,b.jsx)(`div`,{className:`dc-saldo-box mb-4`,children:(0,b.jsxs)(`div`,{className:`text-center py-3 rounded-4`,style:{background:`rgba(255,255,255,0.08)`,border:`1px solid rgba(255,255,255,0.1)`},children:[(0,b.jsxs)(`div`,{className:`small opacity-75 mb-1 fw-medium`,children:[`Saldo `,w?.produk]}),(0,b.jsxs)(`h2`,{className:`mb-0 fw-bold`,style:{fontSize:`2rem`,letterSpacing:`-0.5px`},children:[`Rp `,w?.saldo?.toLocaleString(`id-ID`)]})]})}),x&&(0,b.jsxs)(`div`,{className:`dc-action-grid`,children:[e.includes(`POKOK`)&&(0,b.jsx)(S,{variant:`light`,icon:w?.billItemIds?.length>0?(0,b.jsx)(s,{}):(0,b.jsx)(n,{}),label:w?.billItemIds?.length>0?`Detail`:`Setoran`,onClick:()=>L(`PAY`),isHighlight:w?.billItemIds?.length>0}),(e.includes(`WAJIB`)||e.includes(`SUKARELA`))&&(0,b.jsx)(S,{variant:`light`,icon:(0,b.jsx)(n,{}),label:`Setoran`,onClick:()=>L(`BILL`)}),e.includes(`SUKARELA`)&&w?.saldo>0&&(0,b.jsx)(S,{variant:`light`,icon:(0,b.jsx)(o,{}),label:`Pencairan`,onClick:()=>L(`WITHDRAW`)})]})]}),(0,b.jsx)(`style`,{children:`
          .dc-action-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 12px;
          }

          .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .fa-spin {
            animation: spin 1s linear infinite;
          }

          .transition-all {
            transition: all 0.2s ease-in-out;
          }

          .hover-opacity-100:hover {
            opacity: 1 !important;
            transform: scale(1.1);
          }
        `})]})}),S=({icon:e,label:t,onClick:n,isHighlight:r=!1})=>(0,b.jsxs)(`button`,{type:`button`,onClick:n,className:`dc-action-tile ${r?`highlight`:``}`,children:[(0,b.jsx)(`div`,{className:`dc-action-tile-icon`,children:e}),(0,b.jsx)(`div`,{className:`dc-action-tile-label`,children:t}),(0,b.jsx)(`style`,{children:`
      .dc-action-tile {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 18px;
        padding: 12px 8px;
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        width: 100%;
      }

      .dc-action-tile:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      .dc-action-tile.highlight {
        background: white;
        color: #075985;
        border-color: white;
      }

      .dc-action-tile.highlight .dc-action-tile-icon {
        color: #075985;
      }

      .dc-action-tile-icon {
        font-size: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .dc-action-tile-label {
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
    `})]});export{x as t};