import KpiChart from '../ChartsPage_KpiChart/ChartsPage_KpiChart';
import styles from './ChartsPage_ChartGrid.module.css';

const ChartsPage_ChartGrid = () => (
  <div className={styles.grid}>
    <KpiChart title="New Users" value={2382} />
    <KpiChart title="DAU" value={11830} />
    <KpiChart title="Session Length" value="396.67s" />
    <KpiChart title="Retention" value="39.68%" />
    {/* می‌تونی چارت هم داخل هر Card بیاری */}
  </div>
);

export default ChartsPage_ChartGrid;
