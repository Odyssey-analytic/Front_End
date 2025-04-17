import './WelcomePage.css';
import odessay_logo from '/public/icons/odessay_logo.svg';
// import welcome_image from '/public/icons/welcome_icon.svg'; // آیکون welcome وسط صفحه

const WelcomePage = () => {
  return (
    <div className="welcome-container d-flex flex-column flex-lg-row vh-100">
      {/* Sidebar */}
      <div className="welcome-sidebar d-flex align-items-center px-4 py-3">
        <img src={odessay_logo} alt="Odessay Logo" className="welcome-logo me-2" />
        <span className="fw-bold text-white fs-6">ODESSAY</span>
      </div>

      {/* Main Content */}
      <div className="welcome-content d-flex flex-column justify-content-center align-items-center flex-grow-1 px-3">
        {/* <img src={welcome_image} alt="Welcome Icon" className="welcome-icon mb-4" /> */}

        <h2 className="welcome-heading mb-3">{'{نام کاربر}'} خوش اومدی!</h2>
        <p className="welcome-description text-center mb-2">
          شروع کن تا ببینی توی محصولات دقیقاً چه خبره
        </p>
        <p className="welcome-description text-center mb-4">
          و چطور می‌تونی بهترین تجربه رو برای کاربرات بسازی.
        </p>

        <button className="btn welcome-start-btn">شروع آنالیز</button>
      </div>
    </div>
  );
};

export default WelcomePage;
