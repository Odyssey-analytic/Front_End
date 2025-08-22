import KPI_chart from '../KPICharts/ActiveUsersKPI'

import styles from './ChartsPage_ChartGrid.module.css';

const ChartsPage_ChartGrid = ({selectedTime}) => {
  return (
    <div className={styles.grid}>
      <KPI_chart selectedTime={selectedTime}/>
    </div>
  );
};

export default ChartsPage_ChartGrid;
