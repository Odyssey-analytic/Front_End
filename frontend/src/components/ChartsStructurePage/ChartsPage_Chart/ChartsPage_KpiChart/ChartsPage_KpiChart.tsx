import styles from './ChartsPage_KpiChart.module.css';

type ChartCardProps = {
  title: string;
  value: string | number;
  children?: React.ReactNode;
};

const ChartsPage_KpiChart = ({ title, value, children }: ChartCardProps) => (
  <div className={styles.card}>
    <h4>{title}</h4>
    <div className={styles.value}>{value}</div>
    {children && <div>{children}</div>}
  </div>
);

export default ChartsPage_KpiChart;
