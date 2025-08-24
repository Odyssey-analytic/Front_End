import React, { useEffect, useState } from 'react';
// import KPI_chart from '../KPICharts/ActiveUsersKPI'; // چارت‌های شما
import ARPPUConsumerKPI from '../KPICharts/ARPPUConsumerKPI'; // چارت‌های جدید
import AverageFPSConsumerKPI from '../KPICharts/AverageFPSConsumerKPI'; 
import AverageMemoryUsageConsumerKPI from '../KPICharts/AverageMemoryUsageConsumerKPI'; 
import AverageSessionDurationConsumerKPI from '../KPICharts/AverageSessionDurationConsumerKPI'; 
// import AverageTriesPerLevelConsumerKPI from '../KPICharts/AverageTriesPerLevelConsumerKPI'; 
import CrashRateConsumerKPI from '../KPICharts/CrashRateConsumerKPI'; 
import DailyActiveUsersConsumerKPI from '../KPICharts/DailyActiveUsersConsumerKPI'; 
import GameEventSSEConsumerKPI from '../KPICharts/GameEventSSEConsumerKPI'; 
// import NetResourceFlowConsumerKPI from '../KPICharts/NetResourceFlowConsumerKPI'; 
// import ResourceSinkRatioConsumerKPI from '../KPICharts/ResourceSinkRatioConsumerKPI'; 
// import TopErrorTypesConsumerKPI from '../KPICharts/TopErrorTypesConsumerKPI'; 
import TotalRevenuePerCurrencyConsumerKPI from '../KPICharts/TotalRevenuePerCurrencyConsumerKPI'; 

import styles from './ChartsPage_ChartGrid.module.css';

// تایپ پراپس‌ها
interface ChartsPage_ChartGridProps {
  selectedTime: string | null;
  selectedTab: string | null;
  selectedSubTab: string | null;
}

const ChartsPage_ChartGrid: React.FC<ChartsPage_ChartGridProps> = ({ selectedTime, selectedTab, selectedSubTab }) => {
  // تعریف چارت‌ها
  const charts = {
    // "(AverageSessionLength)": <KPI_chart selectedTime={selectedTime} />,
    "ARPPUConsumer": <ARPPUConsumerKPI selectedTime={selectedTime} />,
    "AverageFPSConsumer": <AverageFPSConsumerKPI selectedTime={selectedTime} />,
    "AverageMemoryUsageConsumer": <AverageMemoryUsageConsumerKPI selectedTime={selectedTime} />,
    "AverageSessionDurationConsumer": <AverageSessionDurationConsumerKPI selectedTime={selectedTime} />,
    // "AverageTriesPerLevelConsumer": <AverageTriesPerLevelConsumerKPI selectedTime={selectedTime} />,
    "CrashRateConsumer": <CrashRateConsumerKPI selectedTime={selectedTime} />,
    "DailyActiveUsersConsumer": <DailyActiveUsersConsumerKPI selectedTime={selectedTime} />,
    "GameEventSSEConsumer": <GameEventSSEConsumerKPI selectedTime={selectedTime} />,
    // "NetResourceFlowConsumer": <NetResourceFlowConsumerKPI selectedTime={selectedTime} />,
    // "ResourceSinkRatioConsumer": <ResourceSinkRatioConsumerKPI selectedTime={selectedTime} />,
    // "TopErrorTypesConsumer": <TopErrorTypesConsumerKPI selectedTime={selectedTime} />,
    "TotalRevenuePerCurrencyConsumer": <TotalRevenuePerCurrencyConsumerKPI selectedTime={selectedTime} />,
  };

  useEffect(() => {
    // اگر نیاز به بارگذاری داده‌ها یا انجام عملیات جانبی داشتید، می‌توانید اینجا انجام دهید.
    if (selectedTab && selectedSubTab) {
      // انجام عملیات خاص بر اساس selectedTab و selectedSubTab
    }
  }, [selectedTab, selectedSubTab, selectedTime]);

  return (
    <div className={styles.grid}>
      {/* بررسی اگر زیرتب انتخاب شده باشد */}
      {selectedSubTab ? (
        charts[selectedSubTab] || <div>چارت مورد نظر پیدا نشد</div>
      ) : (
        <div>لطفاً یک زیرتب انتخاب کنید</div>
      )}
    </div>
  );
};

export default ChartsPage_ChartGrid;
