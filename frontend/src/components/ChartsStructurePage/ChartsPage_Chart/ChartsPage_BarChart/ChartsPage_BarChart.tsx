import { BarChart } from '@mui/x-charts/BarChart';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';

const dataset = [
  { month: 'Jan', seoul: 30, london: 20 },
  { month: 'Feb', seoul: 40, london: 25 },
  { month: 'Mar', seoul: 35, london: 22 },
  { month: 'Apr', seoul: 50, london: 30 },
];

const ChartsPage_BarChart = () => {
  return (
    <ChartCardWrapper title="Rainfall (Bar Chart)">
      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: 'month' }]}
        series={[
          { dataKey: 'seoul', label: 'Seoul' },
          { dataKey: 'london', label: 'London' },
        ]}
        yAxis={[{ label: 'rainfall (mm)', width: 60 }]}
        height={300}
        width={600}
      />
    </ChartCardWrapper>
  );
};

export default ChartsPage_BarChart;
