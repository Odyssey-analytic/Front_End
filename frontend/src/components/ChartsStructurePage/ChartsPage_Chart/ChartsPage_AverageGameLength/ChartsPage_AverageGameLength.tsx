// import { LineChart } from '@mui/x-charts/LineChart';
// import styles from './ChartsPage_ChartGrid.module.css';

// const ChartsPage_ChartGrid = () => {
//   const xValues = [1, 2, 3, 5, 8, 10];

//   return (
//     <div className={styles.grid}>
//       <div className={styles.chartCard}>
//         <h3>New Users</h3>
//         <LineChart
//           xAxis={[{ data: xValues }]}
//           series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5], area: true }]}
//           height={300}
//         />
//       </div>

//       <div className={styles.chartCard}>
//         <h3>DAU</h3>
//         <LineChart
//           xAxis={[{ data: xValues }]}
//           series={[{ data: [1, 2, 4, 3, 6, 7], area: true }]}
//           height={300}
//         />
//       </div>

//       <div className={styles.chartCard}>
//         <h3>Session Length</h3>
//         <LineChart
//           xAxis={[{ data: xValues }]}
//           series={[{ data: [300, 310, 305, 320, 298, 330], area: true }]}
//           height={300}
//         />
//       </div>

//       <div className={styles.chartCard}>
//         <h3>Retention</h3>
//         <LineChart
//           xAxis={[{ data: xValues }]}
//           series={[{ data: [40, 42, 39, 45, 43, 44], area: true }]}
//           height={300}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChartsPage_ChartGrid;


import { LineChart } from '@mui/x-charts/LineChart';
import styles from './ChartsPage_AverageGameLength.module.css';

type AverageGameLengthChartProps = {
  title: string;
  data: number[];
  xData?: (string | number)[]; // اختیاری اگر زمان‌ها/روزها خاص بودن
};

const ChartsPage_AverageGameLength = ({
  title,
  data,
  xData = [1, 2, 3, 5, 8, 10], // پیش‌فرض اگر فرستاده نشد
}: AverageGameLengthChartProps) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <LineChart
        xAxis={[{ data: xData }]}
        series={[{ data: data, area: true }]}
        height={300}
      />
    </div>
  );
};

export default ChartsPage_AverageGameLength;
