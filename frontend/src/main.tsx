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
import WelcomePage from "./components/WelcomePage/WelcomePage";
import ActiveUsersKPI from "./components/KPICharts/ActiveUsersKPI";
import LandingPage from "./components/LandingPage/LandingPage";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import LandingPage_v2 from "./components/LandingPage/LandingPage_v2";
import SignIn from './components/OAuthPortal/SignIn';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotpasswordPage />} /> 
        <Route path="/kpi" element={<ActiveUsersKPI />} /> 
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/reset-password/:token" element={<ResetpasswordPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/land" element={<LandingPage_v2 />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);