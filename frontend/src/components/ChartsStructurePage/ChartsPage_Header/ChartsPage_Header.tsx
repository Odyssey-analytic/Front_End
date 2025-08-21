import styles from "./ChartsPage_Header.module.css";
import { FiFilter, FiColumns, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import DateRangeSelector from "./Calendar";

const ChartsPage_Header = () => {
  const [dateRange, setDateRange] = useState("۱۴۰۳/۰۲/۰۵ - ۱۴۰۳/۰۲/۱۲");

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>نمای کلی</h1>

        <div className={styles.calendarbox}>
          <DateRangeSelector />
        </div>
      </div>
    </header>
  );
};

export default ChartsPage_Header;
