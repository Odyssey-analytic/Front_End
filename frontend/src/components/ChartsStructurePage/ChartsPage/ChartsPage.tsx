import Sidebar from '../ChartsPage_SideBar/ChartsPage_SideBar';
import Header from '../ChartsPage_Header/ChartsPage_Header';
import ChartsGrid from '../ChartsPage_Chart/ChartsPage_ChartGrid/ChartsPage_ChartGrid';
import styles from './ChartsPage.module.css';
import {useState} from "react";
const ChartsPage = () => {
const [selectedTime,setSelectedTime]= useState()
  return(
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Header setSelectedTime={setSelectedTime} />
        <ChartsGrid selectedTime={selectedTime} />
      </div>
    </div>
  );
};

export default ChartsPage;
