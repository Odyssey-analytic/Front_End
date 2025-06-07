import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // آیکون همبرگر و ضربدر
import './ChartsPage_SideBar.module.css'; // اضافه کردن فایل CSS

const ChartsPage_SideBar = () => {
  const [sidebarActive, setSidebarActive] = useState(false); // وضعیت سایدبار (باز/بسته)
  const [isSmallScreen, setIsSmallScreen] = useState(false); // وضعیت اینکه آیا صفحه کوچکتر از 480px است یا نه

  useEffect(() => {
    // چک کردن اینکه آیا صفحه کوچکتر از 480px است
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 480);
    };

    // بررسی اولیه
    checkScreenSize();

    // برای هر بار تغییر اندازه صفحه
    window.addEventListener("resize", checkScreenSize);

    // تمیزکاری (cleanup) برای وقتی که کامپوننت از صفحه خارج می‌شود
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // تابع برای باز و بسته کردن سایدبار
  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive); // تغییر وضعیت سایدبار
  };

  return (
    <div>
      {/* فقط در صورتی که عرض صفحه کوچکتر از 480px باشد، نمایش آیکون همبرگر */}
      {isSmallScreen && (
        <div
          className="hamburgerIcon"
          onClick={toggleSidebar} // با کلیک روی این آیکون، سایدبار باز یا بسته می‌شود
        >
          <FiMenu />
        </div>
      )}

      {/* برای صفحه‌های بزرگتر از 480px سایدبار ثابت */}
      {!isSmallScreen && (
        <aside className="sidebar">
          {/* محتوای ثابت سایدبار */}
          <div className="sidebarContent">
            <h2>سایدبار ثابت</h2>
            <p>محتویات سایدبار</p>
          </div>
        </aside>
      )}

      {/* اگر صفحه کوچکتر از 480px باشد، سایدبار کشویی */}
      {sidebarActive && isSmallScreen && (
        <aside className="sidebar sidebarActive">
          {/* دکمه بستن سایدبار */}
          <div className="closeSidebar" onClick={toggleSidebar}>
            <FiX />
          </div>

          {/* محتوای دیگر سایدبار */}
          <div className="sidebarContent">
            <h2>این سایدبار است!</h2>
          </div>
        </aside>
      )}
    </div>
  );
};

export default ChartsPage_SideBar;
