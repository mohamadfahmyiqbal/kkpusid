import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "./routes/RouterConfig";

const App = () => (
  <>
    <ToastContainer position="top-right" autoClose={3000} />
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </>
);

export default App;
