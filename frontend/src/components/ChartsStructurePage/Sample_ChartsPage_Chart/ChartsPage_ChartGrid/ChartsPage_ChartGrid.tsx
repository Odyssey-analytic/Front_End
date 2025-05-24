import ChartsPage_AverageGameLength from '../ChartsPage_LineChart/ChartsPage_LineChart';
import ChartsPage_BarChart from '../ChartsPage_BarChart/ChartsPage_BarChart';
import ChartsPage_PieChart from '../ChartsPage_PieChart/ChartsPage_PieChart';
import ChartsPage_CustomizedPieChart from '../ChartsPage_DonutChart/ChartsPage_DonutChart'

import styles from './ChartsPage_ChartGrid.module.css';

const ChartsPage_ChartGrid = () => {
  return (
    <div className={styles.grid}>
      <ChartsPage_AverageGameLength />
      <ChartsPage_BarChart />
      <ChartsPage_PieChart />
      <ChartsPage_CustomizedPieChart />
    </div>
  );
};

export default ChartsPage_ChartGrid;
