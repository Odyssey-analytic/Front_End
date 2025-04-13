import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.rtl.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './styles/fonts.css';
import './index.css'

// import ActiveUsersKPI from "./components/KPICharts/ActiveUsersKPI";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import ForgotpasswordPage from "./components/ForgotpasswordPage/ForgotpasswordPage"; 
import ResetpasswordPage from "./components/ResetpasswordPage/ResetpasswordPage";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotpasswordPage />} /> 
        <Route path="/forgot-password/reset-password" element={<ResetpasswordPage />} />
        {/* <Route path="/login/dashboard" element={<ActiveUsersKPI />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
