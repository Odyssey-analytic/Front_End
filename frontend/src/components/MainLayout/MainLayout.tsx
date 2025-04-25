import './MainLayout.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OdessayLogo from '/public/icons/odessay_logo.svg';
import welcome_subheader_user from '/public/icons/welcome_subheader_user.svg';
import welcome_subheader_menu from '/public/icons/welcome_subheader_menu.svg';
import welcome_header_help from '/public/icons/welcome_header_help.svg';


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <div className="main-layout">

        <div className="welcome-page-header">
          <img src={welcome_header_help} alt="Help" className="welcome-page-header-help-icon" />

          <div className="welcome-page-header-search-box">
            <input
              type="text"
              className="welcome-page-header-search-box-input"
              placeholder="جستجو..."
            />
          </div>

          <div className="header-brand">
            <span className="website-brand-text english-text">ODESSAY</span>
            <img src={OdessayLogo} alt="Odessay Logo" className="website-logo-img ms-2" />
          </div>
        </div>

        <div className="welcome-page-subheader d-flex justify-content-between align-items-center py-2">
            

          <div className="d-flex align-items-center gap-3">

            <div
              className="welcome-page-menu-icon-wrapper"
              onClick={() => setMenuOpen(prev => !prev)}
            >
              <img
                src={welcome_subheader_menu}
                alt="Menu"
                className="welcome-page-subheader-menu-icon"
              />

              {menuOpen && (
                <div className="welcome-page-dropdown-menu">
                  <button className="welcome-page-dropdown-item" onClick={handleLogout}>
                    خروج از حساب کاربری
                  </button>
                </div>
              )}

            </div>

            <img src={welcome_subheader_user} alt="User" className="welcome-page-subheader-user-icon" />
          </div>

          {/* <span className="welcome-page-subheader-admin-label-container-divider"></span>
          <div className="welcome-page-subheader-admin-label-container-label-text">Admin</div> */}
          

          {/* <div className="welcome-page-subheader-admin-label-container">
            <span className="welcome-page-subheader-admin-label-container-divider"></span>
            <div className="welcome-page-subheader-admin-label-container-label-text">Admin</div>
          </div> */}

          <div className="main-layout-content-children">
            {children}
          </div>

        </div>

    </div>
  );
};

export default MainLayout;
