import{t as e}from"./Alert-BrSc-Rd4.js";import{Y as t,et as n,fr as r,v as i,vr as a,xr as o}from"./index-0Aj5Wkjo.js";import{t as s}from"./USimpanan-ure22mon.js";import{t as c}from"./InformasiRekeningCard-CtyKQ2d7.js";var l=o(a()),u=r(),d=()=>(0,u.jsxs)(`div`,{className:`animate-pulse`,children:[(0,u.jsx)(`div`,{className:`d-flex flex-column flex-md-row gap-2 overflow-hidden mb-4 px-1`,children:[1,2,3].map(e=>(0,u.jsx)(`div`,{className:`bg-light rounded-pill simpanan-skeleton-tab`},e))}),(0,u.jsx)(`div`,{className:`bg-light rounded-4 w-100`,style:{height:`280px`}})]}),f=()=>{let[r,a]=(0,l.useState)([]),[o,f]=(0,l.useState)({code:null,name:null}),[p,m]=(0,l.useState)(!0),[h,g]=(0,l.useState)(null),_=(0,l.useRef)(new AbortController),v=(0,l.useCallback)(async()=>{let e=_.current;try{m(!0),g(null);let t=await s.getProducts({signal:e.signal});if(t.data?.status){let e=t.data.data;a(e),e.length>0&&f({code:e[0].product_code,name:e[0].product_name})}else g(`Gagal memuat kategori simpanan.`)}catch(e){e.name!==`AbortError`&&(console.error(`Error Fetching Products:`,e),g(e.response?.data?.message||`Gagal terhubung ke server.`))}finally{m(!1)}},[]);(0,l.useEffect)(()=>{v();let e=_.current;return()=>{e.abort()}},[v]);let y=e=>e?.includes(`POKOK`)?(0,u.jsx)(n,{size:18}):e?.includes(`WAJIB`)?(0,u.jsx)(i,{size:18}):(0,u.jsx)(t,{size:18});return(0,u.jsxs)(`div`,{className:`simpanan-page-container pb-5`,children:[h&&(0,u.jsx)(e,{variant:`danger`,className:`mx-2 shadow-sm rounded-4 border-0 animate-fade-in`,children:h}),p?(0,u.jsx)(`div`,{className:`px-2`,children:(0,u.jsx)(d,{})}):(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`div`,{className:`simpanan-tabs-container mb-4 px-2`,children:(0,u.jsx)(`div`,{className:`d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 simpanan-scroll-hide`,children:r.map(e=>(0,u.jsxs)(`button`,{onClick:()=>f({code:e.product_code,name:e.product_name}),className:`simpanan-tab-btn ${o.code===e.product_code?`active`:``}`,children:[y(e.product_code),(0,u.jsx)(`span`,{children:e.product_name})]},e.product_code))})}),(0,u.jsx)(`div`,{className:`px-2 animate-fade-in`,children:o.code?(0,u.jsx)(c,{activeType:o.code,displayName:o.name,fromPage:`simpananPage`}):(0,u.jsxs)(`div`,{className:`text-center py-5 bg-light rounded-4 text-muted`,children:[(0,u.jsx)(t,{size:48,className:`opacity-20 mb-3`}),(0,u.jsx)(`p`,{className:`mb-0`,children:`Data simpanan tidak tersedia.`})]})})]}),(0,u.jsx)(`style`,{children:`
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