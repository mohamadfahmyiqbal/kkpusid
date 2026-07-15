import{o as e}from"./rolldown-runtime-CMxvf4Kt.js";import{Ar as t,Br as n,C as r,D as i,O as a,T as o,p as s,w as c}from"./vendor-DorOt17f.js";import{t as l}from"./SwalAlert-BbCMOEaQ.js";import{t as u}from"./UGlobal-DeM3D_-b.js";var d=e(n()),f=t(),p=()=>(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(`style`,{children:`
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
    }
    
    .skeleton-title {
      height: 24px;
      width: 70%;
    }
    
    .skeleton-text {
      height: 16px;
      width: 100%;
    }
    
    .skeleton-text-short {
      height: 16px;
      width: 60%;
    }
    
    .skeleton-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .skeleton-menu {
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
    
    .skeleton-image {
      height: 200px;
    }
    
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  `}),(0,f.jsxs)(r,{className:`py-5`,children:[(0,f.jsx)(`h2`,{className:`pbs-title-section text-center mb-5`,children:`Artikel Terbaru`}),(0,f.jsx)(s,{className:`justify-content-center`,children:[1,2,3].map(e=>(0,f.jsx)(c,{sm:12,md:8,lg:6,className:`mb-4`,children:(0,f.jsxs)(o,{className:`shadow-lg border-0 mx-3 h-100 rounded-4`,children:[(0,f.jsxs)(i,{children:[(0,f.jsx)(`div`,{className:`skeleton skeleton-title mb-3`}),(0,f.jsx)(`div`,{className:`skeleton skeleton-text mb-2`}),(0,f.jsx)(`div`,{className:`skeleton skeleton-text mb-3`}),(0,f.jsx)(`div`,{className:`skeleton skeleton-text-short`}),e===1&&(0,f.jsxs)(`div`,{className:`d-flex justify-content-between align-items-center mb-3 pt-3`,children:[(0,f.jsxs)(`div`,{className:`d-flex`,children:[(0,f.jsx)(`span`,{className:`skeleton skeleton-dot me-1`}),(0,f.jsx)(`span`,{className:`skeleton skeleton-dot me-1`}),(0,f.jsx)(`span`,{className:`skeleton skeleton-dot`})]}),(0,f.jsx)(`div`,{className:`skeleton skeleton-menu`})]})]}),e===1&&(0,f.jsx)(`div`,{className:`p-3`,children:(0,f.jsx)(`div`,{className:`skeleton skeleton-image rounded-4 w-100`})})]})},e))})]})]}),m=(0,d.memo)(()=>{let[e,t]=(0,d.useState)([]),[n,m]=(0,d.useState)(!0),[h,g]=(0,d.useState)(null),[_,v]=(0,d.useState)(0),y=(0,d.useRef)(null),b=(0,d.useCallback)(async()=>{try{g(null);let e=(await u.getLandingArticles()).data.data||[],n=[];e.length>0&&(n=e.map(e=>({title:e.title||`Judul Artikel`,text:e.text||`Deskripsi artikel tidak tersedia.`,img:e.img||null}))),t(n),v(0)}catch(e){console.error(`Gagal mengambil data Artikel:`,e),g(e.message||`Terjadi kesalahan saat mengambil data`),t([]),_<3&&(y.current=setTimeout(()=>{v(e=>e+1),b()},5e3))}finally{m(!1)}},[_]);return(0,d.useEffect)(()=>(b(),()=>{y.current&&clearTimeout(y.current)}),[b]),n?(0,f.jsx)(p,{}):h&&_>=3?(0,f.jsx)(r,{className:`py-5`,children:(0,f.jsxs)(l,{variant:`warning`,className:`text-center`,children:[(0,f.jsx)(l.Heading,{children:`Gagal Memuat Data`}),(0,f.jsx)(`p`,{children:`Tidak dapat memuat artikel setelah beberapa percobaan.`}),(0,f.jsx)(`button`,{className:`btn btn-warning`,onClick:()=>{v(0),m(!0),b()},children:`Coba Lagi`})]})}):(0,f.jsxs)(r,{className:`article-section py-5`,id:`artikel`,children:[(0,f.jsxs)(`div`,{className:`text-center mb-5`,children:[(0,f.jsx)(`span`,{className:`pbs-badge`,children:`Berita & Informasi`}),(0,f.jsx)(`h2`,{className:`pbs-title-section mt-3 text-center`,children:`Artikel Terbaru`})]}),e.length===0?(0,f.jsx)(s,{className:`justify-content-center`,children:(0,f.jsx)(c,{md:8,className:`text-center py-5`,children:(0,f.jsxs)(`div`,{className:`pbs-card-glass p-5`,children:[(0,f.jsx)(`p`,{className:`lead text-white mb-0`,children:`Belum ada artikel yang dipublikasikan saat ini.`}),(0,f.jsx)(`p`,{className:`text-white-50 mt-2`,children:`Nantikan informasi menarik lainnya dari kami segera.`})]})})}):(0,f.jsx)(s,{className:`justify-content-center g-3 g-md-4`,children:e.map((e,t)=>(0,f.jsx)(c,{xs:6,md:6,lg:4,children:(0,f.jsxs)(o,{className:`article-card h-100 shadow-sm border-0`,children:[e.img?(0,f.jsx)(`div`,{className:`article-image-wrapper`,children:(0,f.jsx)(o.Img,{variant:`top`,src:e.img,alt:e.title,className:`article-image`})}):(0,f.jsx)(`div`,{className:`article-image-wrapper d-flex align-items-center justify-content-center bg-light`,children:(0,f.jsx)(`span`,{className:`text-muted`,children:`No Image`})}),(0,f.jsxs)(i,{className:`p-4 d-flex flex-column`,children:[(0,f.jsx)(o.Title,{className:`fw-bold`,children:e.title}),(0,f.jsx)(o.Text,{className:`flex-grow-1`,children:e.text}),(0,f.jsxs)(`a`,{href:`#`,className:`article-btn-link`,onClick:e=>e.preventDefault(),children:[`Selengkapnya `,(0,f.jsx)(`span`,{children:`→`})]})]})]})},t))}),e.length>0&&(0,f.jsx)(`div`,{className:`text-center mt-5`,children:(0,f.jsx)(a,{variant:`outline-light`,className:`rounded-pill px-5 py-2`,children:`Lihat Semua Artikel`})})]})});export{m as default};