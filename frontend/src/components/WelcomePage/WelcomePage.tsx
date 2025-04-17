import './WelcomePage.css';
import { useEffect, useState } from 'react';

import OdessayLogo from "/public/icons/odessay_logo.svg";
import welcome_header_help from '/public/icons/welcome_header_help.svg';
import welcome_subheader_user from '/public/icons/welcome_subheader_user.svg';
import welcome_subheader_menu from '/public/icons/welcome_subheader_menu.svg';

const WelcomePage = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || '');
  }, []);

  return (
    <div className="welcome-page-container vh-100 d-flex flex-column">
        <div className="welcome-page-header d-flex justify-content-between align-items-center px-4 py-2 shadow-sm">
            <div>
                <img src={welcome_header_help} alt="Help" className="welcome-page-header-help-icon" />
            </div>
            <div className="welcome-page-header-search-box flex-grow-1 mx-4">
                <input type="text" className="welcome-page-header-search-box-input form-control text-center" placeholder="جستجو..." />
            </div>
            <div className="d-flex align-items-center">
                <span className="website-brand-text english-text">ODESSAY</span>
                <img src={OdessayLogo} alt="Odessay Logo" className="website-logo-img ms-2" />
            </div>
        </div>
        <div className="welcome-page-subheader d-flex justify-content-between align-items-center px-4 py-2">
            <div className="d-flex align-items-center gap-3">
                <img src={welcome_subheader_menu} alt="Menu" className="welcome-page-subheader-menu-icon" />
                <img src={welcome_subheader_user} alt="User" className="welcome-page-subheader-user-icon" />
            </div>
            <div className="welcome-page-subheader-admin-label-container d-flex align-items-center">
                <span className="welcome-page-subheader-admin-label-container-divider"></span>
                <div className="welcome-page-subheader-admin-label-container-label-text">Admin</div>
            </div>
        </div>
        <div className="welcome-page-body d-flex justify-content-center align-items-center flex-grow-1">
            <div className="welcome-page-main-box text-center p-4">
                <h2 className="welcome-page-main-box-heading mb-3">{username} خوش اومدی!</h2>
                <p className="welcome-page-main-box-description mb-1">
                شروع کن تا ببینی توی محصولات دقیقاً چه خبره
                </p>
                <p className="welcome-page-main-box-description mb-4">
                و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.
                </p>
                <button className="btn welcome-page-main-box-start-btn">اضافه کردن بازی</button>
            </div>
        </div>
    </div>
  );
};

export default WelcomePage;
