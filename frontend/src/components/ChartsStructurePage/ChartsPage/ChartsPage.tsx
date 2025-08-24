import React, { useState } from "react";
import Sidebar from '../ChartsPage_SideBar/ChartsPage_SideBar';
import ChartsPage_Header from '../ChartsPage_Header/ChartsPage_Header';
import ChartsGrid from '../ChartsPage_Chart/ChartsPage_ChartGrid/ChartsPage_ChartGrid';
import styles from './ChartsPage.module.css';

// شیء برای ترجمه اسامی تب‌ها
const tabTranslations: { [key: string]: string } = {
  "AverageSessionLength": "میانگین طول جلسه",
  "GameEventSSEConsumer": "رویدادهای بازی",
  "DailyActiveUsersConsumer": "کاربران فعال روزانه",
  "AverageFPSConsumer": "میانگین فریم‌برثانیه",
  "AverageMemoryUsageConsumer": "میانگین استفاده از حافظه",
  "AverageSessionDurationConsumer": "میانگین مدت زمان جلسه",
  "TotalRevenuePerCurrencyConsumer": "درآمد کل به ازای هر ارز",
  "ARPPUConsumer": "ARPPU",
  //"LevelCompletionRateConsumer": "نرخ تکمیل هر سطح",
  //"AverageTriesPerLevelConsumer": "میانگین تلاش‌ها در هر سطح",
  //"NetResourceFlowConsumer": "جریان منابع خالص",
  "CrashRateConsumer": "نرخ کرش",
  //"ResourceSinkRatioConsumer": "نسبت مصرف منابع",
  //"TopErrorTypesConsumer": "انواع برتر خطاها"
};

const ChartsPage = () => {
  let today=new Date()
  today.setUTCHours(0,0,0,0)
  const [selectedTime, setSelectedTime] = useState<string | null>(today.toISOString());
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedSubTab, setSelectedSubTab] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      <Sidebar 
        setSelectedTab={setSelectedTab} 
        setSelectedSubTab={setSelectedSubTab} 
      />
      <div className={styles.main}>
        {/* هدر همیشه نمایش داده می‌شود */}
        <ChartsPage_Header 
          setSelectedTime={setSelectedTime} 
          selectedTab={selectedTab}
          selectedSubTab={selectedSubTab} // ارسال selectedSubTab به هدر
        />

        {/* چارت‌ها تنها زمانی که یک تب انتخاب شده باشد نمایش داده می‌شوند */}
        {selectedTab ? (
          <ChartsGrid 
            selectedTime={selectedTime} 
            selectedTab={selectedTab} 
            selectedSubTab={selectedSubTab} 
          />
        ) : (
          <div>لطفاً یک تب انتخاب کنید</div> // اگر تب انتخاب نشده، پیام نمایش می‌دهیم
        )}
      </div>
    </div>
  );
};

export default ChartsPage;
