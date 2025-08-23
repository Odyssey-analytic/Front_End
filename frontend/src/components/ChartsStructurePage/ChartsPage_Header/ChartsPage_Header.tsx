import styles from "./ChartsPage_Header.module.css";
import { FiFilter, FiColumns, FiCalendar } from "react-icons/fi";
import { useState } from "react";
import DateRangeSelector from "./Calendar";

// تایپ پراپس‌ها
interface ChartsPage_HeaderProps {
  setSelectedTime: (time: string | null) => void;
  selectedTab: string | null;
}

const ChartsPage_Header: React.FC<ChartsPage_HeaderProps> = ({ setSelectedTime, selectedTab }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>{selectedTab ? "نمای کلی" : ""}</h1>

        {selectedTab && (
          <div className={styles.calendarbox}>
            <DateRangeSelector setSelectedTime={setSelectedTime} />
          </div>
        )}
      </div>
    </header>
  );
};

export default ChartsPage_Header;
