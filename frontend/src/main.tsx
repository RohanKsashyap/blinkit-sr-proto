import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './Pages/Home.tsx';
import './index.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap the App in BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);