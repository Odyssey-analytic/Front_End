import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.rtl.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './styles/fonts.css';
import './index.css'

import LoginPage from "./components/AuthPages/LoginPage";
import SignupPage from "./components/AuthPages/SignupPage";
import ForgotpasswordPage from "./components/ForgotpasswordPage/ForgotpasswordPage";
import ResetpasswordPage from "./components/ResetpasswordPage/ResetpasswordPage";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import LandingPage from "./components/LandingPage/LandingPage/LandingPage";

import ChartsPage from './components/ChartsStructurePage/ChartsPage/ChartsPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotpasswordPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/reset-password/:token" element={<ResetpasswordPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/panel" element={<DashboardPage />} />
        <Route path="/dashboard/:gameId" element={<ChartsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);