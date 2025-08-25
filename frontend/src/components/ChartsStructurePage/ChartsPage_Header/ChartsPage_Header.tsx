import styles from "./ChartsPage_Header.module.css";
import { useState } from "react";
import DateRangeSelector from "./Calendar";

// تایپ پراپس‌ها
interface ChartsPage_HeaderProps {
  setSelectedTime: (time: string | null) => void;
  selectedTab: string | null;
  selectedSubTab: string | null;
}

const ChartsPage_Header: React.FC<ChartsPage_HeaderProps> = ({ setSelectedTime, selectedTab, selectedSubTab }) => {
  const tabTranslations: { [key: string]: string } = {
    "AverageSessionLength": "میانگین طول جلسه",
    "GameEventSSEConsumer": "رویدادهای بازی",
    "DailyActiveUsersConsumer": "کاربران فعال روزانه",
    "AverageFPSConsumer": "میانگین فریم‌برثانیه",
    "AverageMemoryUsageConsumer": "میانگین استفاده از حافظه",
    "AverageSessionDurationConsumer": "میانگین مدت زمان جلسه",
    "TotalRevenuePerCurrencyConsumer": "درآمد کل به ازای هر ارز",
    "ARPPUConsumer": "درآمد میانگین به ازای هر کاربر پرداخت‌کننده",
    "LevelCompletionRateConsumer": "نرخ تکمیل هر سطح",
    "AverageTriesPerLevelConsumer": "میانگین تلاش‌ها در هر سطح",
    "NetResourceFlowConsumer": "جریان منابع خالص",
    "CrashRateConsumer": "نرخ کرش",
    "ResourceSinkRatioConsumer": "نسبت مصرف منابع",
    "TopErrorTypesConsumer": "انواع برتر خطاها"
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          {/* نمایش نام ساب‌تب به فارسی یا "داشبوردهای کاربری" */}
          {selectedSubTab ? tabTranslations[selectedSubTab] || selectedSubTab : "داشبوردهای کاربری"}
        </h1>

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
