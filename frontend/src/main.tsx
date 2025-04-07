import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.rtl.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

import './index.css'
// import ActiveUsersKPI from "./components/KPICharts/ActiveUsersKPI.tsx";
import LoginPage from "./components/LoginPage/LoginPage";
import './styles/fonts.css';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>,
)
