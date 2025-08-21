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

import WelcomePage from "./components/WelcomePage/WelcomePage_Layout";
import DashboardPage from "./components/DashboardPage/DashboardPage";
import LandingPage from "./components/LandingPage/LandingPage/LandingPage";

import ChartsPage from './components/ChartsStructurePage/ChartsPage/ChartsPage';

import DocsFrame from "./components/Docs/DocsFrame";

// import DashboardPage_AddNewGame from "./components/DashboardPage/AddNewGame/DashboardPage_AddNewGame";

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
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/charts/:gameId" element={<ChartsPage />} />
        <Route path="/docs/*" element={<DocsFrame />} />
        <Route path="/charts" element={<ChartsPage />} />
        {/* <Route path='/DateSelector' element={<DateSelector/>}/> */}
        {/* <Route path="/DashboardPage_AddNewGame" element={<DashboardPage_AddNewGame />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);