import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Menggunakan import sesuai dengan struktur folder Anda yang sudah ada: routes/RouterConfig.jsx
import routerConfig from "./routes/RouterConfig";

const App = () => (
  <>
    {/* Konfigurasi untuk notifikasi Toast */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />

    {/* Menyediakan konfigurasi router ke seluruh aplikasi */}
    <RouterProvider
      router={routerConfig}
      future={{ v7_startTransition: true }}
    />
  </>
);

export default App;
