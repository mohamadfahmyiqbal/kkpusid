import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{Er as t,Fr as n,P as r,ft as i,j as a,vt as o}from"./vendor-tRETzk3e.js";import{t as s}from"./USimpanan-BGY-NLuf.js";import{t as c}from"./InformasiRekeningCard-BeGoRaYa.js";var l=e(n()),u=t(),d=()=>(0,u.jsxs)(`div`,{className:`animate-pulse`,children:[(0,u.jsx)(`div`,{className:`simpanan-tabs-container mb-4 px-2`,children:(0,u.jsx)(`div`,{className:`d-flex flex-column flex-md-row gap-2 overflow-hidden pb-2 simpanan-scroll-hide`,children:[1,2,3].map(e=>(0,u.jsx)(`div`,{className:`bg-light rounded-pill simpanan-skeleton-tab`,style:{border:`1px solid #f1f5f9`}},e))})}),(0,u.jsx)(`div`,{className:`px-2`,children:(0,u.jsx)(`div`,{className:`w-100 shadow-sm`,style:{height:`280px`,borderRadius:`24px`,background:`linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)`}})})]}),f=({decodedToken:e})=>{let[t,n]=(0,l.useState)([]),[f,p]=(0,l.useState)({code:null,name:null}),[m,h]=(0,l.useState)(!0),[g,_]=(0,l.useState)(null),v=(0,l.useRef)(new AbortController),y=(0,l.useCallback)(async()=>{let t=v.current;try{h(!0),_(null);let r=await s.getProducts({signal:t.signal});if(r.data?.status){let t=r.data.data;if(n(t),t.length>0){let n=e?.activeTab,r=n?t.find(e=>e.product_code===n):null;p(r?{code:r.product_code,name:r.product_name}:{code:t[0].product_code,name:t[0].product_name})}}else _(`Gagal memuat kategori simpanan.`)}catch(e){e.name!==`AbortError`&&(console.error(`Error Fetching Products:`,e),_(e.response?.data?.message||`Gagal terhubung ke server.`))}finally{h(!1)}},[]);(0,l.useEffect)(()=>{y();let e=v.current;return()=>{e.abort()}},[y]);let b=e=>e?.includes(`POKOK`)?(0,u.jsx)(o,{size:18}):e?.includes(`WAJIB`)?(0,u.jsx)(r,{size:18}):(0,u.jsx)(i,{size:18});return(0,u.jsxs)(`div`,{className:`simpanan-page-container pb-5`,children:[g&&(0,u.jsx)(a,{variant:`danger`,className:`mx-2 shadow-sm rounded-4 border-0 animate-fade-in`,children:g}),m?(0,u.jsx)(d,{}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`div`,{className:`simpanan-tabs-container mb-4 px-2`,children:(0,u.jsx)(`div`,{className:`d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 simpanan-scroll-hide`,children:t.map(e=>(0,u.jsxs)(`button`,{onClick:()=>p({code:e.product_code,name:e.product_name}),className:`simpanan-tab-btn ${f.code===e.product_code?`active`:``}`,children:[b(e.product_code),(0,u.jsx)(`span`,{children:e.product_name})]},e.product_code))})}),(0,u.jsx)(`div`,{className:`px-2 animate-fade-in`,children:f.code?(0,u.jsx)(c,{activeType:f.code,displayName:f.name,fromPage:`simpananPage`}):(0,u.jsxs)(`div`,{className:`text-center py-5 bg-light rounded-4 text-muted`,children:[(0,u.jsx)(i,{size:48,className:`opacity-20 mb-3`}),(0,u.jsx)(`p`,{className:`mb-0`,children:`Data simpanan tidak tersedia.`})]})})]}),(0,u.jsx)(`style`,{children:`
        .simpanan-scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .simpanan-scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .simpanan-tab-btn {
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

        .simpanan-skeleton-tab {
          width: 100%;
          height: 40px;
        }
        @media (min-width: 768px) {
          .simpanan-skeleton-tab {
            width: 120px;
          }
        }

        .simpanan-tab-btn:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #334155;
        }

        .simpanan-tab-btn.active {
          background: #005a8d;
          border-color: #005a8d;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 90, 141, 0.2);
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
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `})]})};export{f as default};