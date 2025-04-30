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
  
//   import React, { useEffect } from "react";
// import styles from "./LandingPage_v2.module.css";
// import TestimonialsCarousel from "./TestimonialsCarousel";
// import OdessayLogo from "/public/icons/odessay_logo.svg";
// import CircleAnimation from "./CircleAnimation";

// const LandingPage_v2: React.FC = () => {
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add(styles.animate);
//           }
//         });
//       },
//       {
//         threshold: 0.6,
//         rootMargin: "0px 0px -30% 0px",
//       }
//     );
//     const targets = document.querySelectorAll("." + styles.hiddenOnLoad);
//     targets.forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className={styles.landingPage}>
//       <img
//         src="/src/assets/images/Landing_Page_Background.png"
//         alt="Background"
//         className={styles.landingBackground}
//       />

//       <div className={styles.landingContent}>
//         <header className={styles.landingHeader}>
//           <div className={styles.authButtons}>
//             <button className={styles.signupBtn}>ثبت‌نام</button>
//             <button className={styles.loginBtn}>ورود</button>
//           </div>
//           <div className={styles.logo}>
//             <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImage} />
//             <span>ODESSAY</span>
//           </div>
//         </header>

//         <main className={styles.mainSection}>
//   <section className={styles.circleSection}>
//     <CircleAnimation />
//   </section>

//   <section className={styles.carouselSection}>
//     <TestimonialsCarousel />
//   </section>
// </main>


//       </div>
//     </div>
//   );
// };

// export default LandingPage_v2;
