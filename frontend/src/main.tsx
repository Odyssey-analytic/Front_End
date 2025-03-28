import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ActiveUsersKPI from "./components/KPICharts/ActiveUsersKPI.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActiveUsersKPI />
  </StrictMode>,
)
