

import Sidebar from '../ChartsPage_SideBar/ChartsPage_SideBar';
import Header from '../ChartsPage_Header/ChartsPage_Header';
import ChartsGrid from '../ChartsPage_Chart/ChartsPage_ChartGrid/ChartsPage_ChartGrid';
import styles from './ChartsPage.module.css';
import { useState } from 'react';

const ChartsPage = () => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [selectedSubTab, setSelectedSubTab] = useState<string | null>(null);  // اضافه کردن selectedSubTab

  return (
    <div className={styles.container}>
      <Sidebar 
        setSelectedTab={setSelectedTab} 
        setSelectedSubTab={setSelectedSubTab}  // ارسال setSelectedSubTab به Sidebar
      />
      <div className={styles.main}>
        <Header 
          setSelectedTime={setSelectedTime} 
          selectedTab={selectedTab} 
        />
        {/* ارسال selectedSubTab به ChartsGrid */}
        {selectedTab && <ChartsGrid selectedTime={selectedTime} selectedTab={selectedTab} selectedSubTab={selectedSubTab} />}
      </div>
    </div>
  );
};

export default ChartsPage;
