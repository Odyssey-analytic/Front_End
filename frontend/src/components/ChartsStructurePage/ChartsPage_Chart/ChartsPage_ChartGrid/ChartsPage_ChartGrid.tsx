import KPI_chart from '../KPICharts/ActiveUsersKPI'

import styles from './ChartsPage_ChartGrid.module.css';

const ChartsPage_ChartGrid = () => {
  return (
    <div className={styles.grid}>
      <KPI_chart/>
    </div>
  );
};

export default ChartsPage_ChartGrid;
