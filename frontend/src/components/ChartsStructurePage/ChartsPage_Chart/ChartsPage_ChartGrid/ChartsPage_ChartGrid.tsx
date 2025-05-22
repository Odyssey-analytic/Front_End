// import AverageGameLengthChart from '../ChartsPage_AverageGameLength/ChartsPage_AverageGameLength';
// import styles from './ChartsPage_ChartGrid.module.css';

// const ChartsPage_ChartGrid = () => (
//   <div className={styles.grid}>
//     <AverageGameLengthChart title="New Users" value={2382} />
//     <AverageGameLengthChart title="DAU" value={11830} />
//     <AverageGameLengthChart title="Session Length" value="396.67s" />
//     <AverageGameLengthChart title="Retention" value="39.68%" />
//     {/* می‌تونی چارت هم داخل هر Card بیاری */}
//   </div>
// );

// export default ChartsPage_ChartGrid;


import AverageGameLengthChart from '../ChartsPage_AverageGameLength/ChartsPage_AverageGameLength';
import styles from './ChartsPage_ChartGrid.module.css';

const ChartsPage_ChartGrid = () => (
  <div className={styles.grid}>
    <AverageGameLengthChart
      title="New Users"
      data={[2, 5.5, 2, 8.5, 1.5, 5]}
    />
    <AverageGameLengthChart
      title="DAU"
      data={[1, 2, 4, 3, 6, 7]}
    />
    <AverageGameLengthChart
      title="Session Length"
      data={[300, 310, 305, 320, 298, 330]}
    />
    <AverageGameLengthChart
      title="Retention"
      data={[40, 42, 39, 45, 43, 44]}
    />
  </div>
);

export default ChartsPage_ChartGrid;
