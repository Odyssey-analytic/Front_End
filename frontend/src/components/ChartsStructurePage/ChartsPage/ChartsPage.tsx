import Sidebar from '../ChartsPage_SideBar/ChartsPage_SideBar';
import Header from '../ChartsPage_Header/ChartsPage_Header';
import ChartsGrid from '../ChartsPage_Chart/ChartsPage_ChartGrid/ChartsPage_ChartGrid';
import styles from './ChartsPage.module.css';

const ChartsPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <ChartsGrid />
      </div>
    </div>
  );
};

export default ChartsPage;
