import { Link } from 'react-router-dom';
import './LandingPage.css';



const LandingPage = () => {
    return (
      <div className="landing-container">
        <header className="landing-header">
          <h1>به اپلیکیشن ما خوش اومدی</h1>
          <p>تحلیل پیشرفته، گزارش دقیق، فقط با چند کلیک</p>
          <div className="landing-actions">
            <Link to="/login" className="btn btn-primary">ورود</Link>
            <Link to="/signup" className="btn btn-outline-primary">ثبت‌نام</Link>
          </div>
        </header>
      </div>
    );
  };
  
  export default LandingPage;
  