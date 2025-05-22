// // import AverageGameLengthChart from '../ChartsPage_AverageGameLength/ChartsPage_AverageGameLength';
// // import styles from './ChartsPage_ChartGrid.module.css';

// // const ChartsPage_ChartGrid = () => (
// //   <div className={styles.grid}>
// //     <AverageGameLengthChart title="New Users" value={2382} />
// //     <AverageGameLengthChart title="DAU" value={11830} />
// //     <AverageGameLengthChart title="Session Length" value="396.67s" />
// //     <AverageGameLengthChart title="Retention" value="39.68%" />
// //     {/* می‌تونی چارت هم داخل هر Card بیاری */}
// //   </div>
// // );

// // export default ChartsPage_ChartGrid;


// import AverageGameLengthChart from '../ChartsPage_AverageGameLength/ChartsPage_AverageGameLength';
// import styles from './ChartsPage_ChartGrid.module.css';

// const ChartsPage_ChartGrid = () => (
//   <div className={styles.grid}>
//     <AverageGameLengthChart
//       title="New Users"
//       data={[2, 5.5, 2, 8.5, 1.5, 5]}
//     />
//     <AverageGameLengthChart
//       title="DAU"
//       data={[1, 2, 4, 3, 6, 7]}
//     />
//     <AverageGameLengthChart
//       title="Session Length"
//       data={[300, 310, 305, 320, 298, 330]}
//     />
//     <AverageGameLengthChart
//       title="Retention"
//       data={[40, 42, 39, 45, 43, 44]}
//     />
//   </div>
// );

// export default ChartsPage_ChartGrid;


// import ChartCardWrapper from '../ChartCardWrapper/ChartCardWrapper';
// import AreaChartGDP from '../AreaChartGDP/AreaChartGDP';
// import BarChartWeather from '../BarChartWeather/BarChartWeather';
// import PieChartOSUsage from '../PieChartOSUsage/PieChartOSUsage';
// import styles from './ChartsPage_ChartGrid.module.css';

// const ChartsPage_ChartGrid = () => {
//   return (
//     <div className={styles.grid}>
//       <ChartCardWrapper title="GDP per Capita (Area Chart)">
//         <AreaChartGDP />
//       </ChartCardWrapper>

//       <ChartCardWrapper title="Weather Data (Bar Chart)">
//         <BarChartWeather />
//       </ChartCardWrapper>

//       <ChartCardWrapper title="OS Usage (Pie Chart)">
//         <PieChartOSUsage />
//       </ChartCardWrapper>
//     </div>
//   );
// };

// export default ChartsPage_ChartGrid;


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
