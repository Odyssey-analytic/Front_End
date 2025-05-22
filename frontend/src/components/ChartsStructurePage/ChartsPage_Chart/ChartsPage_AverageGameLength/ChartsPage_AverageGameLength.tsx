import { LineChart } from '@mui/x-charts/LineChart';
import styles from './ChartsPage_AverageGameLength.module.css';

type AverageGameLengthChartProps = {
  title: string;
  data: number[];
  xData?: (string | number)[];
};

const ChartsPage_AverageGameLength = ({
  title,
  data,
  xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
}: AverageGameLengthChartProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      <LineChart
        xAxis={[{ data: xData }]}
        series={[{ data: data, area: true }]}
        height={300}
      />
    </div>
  );
};

export default ChartsPage_AverageGameLength;
