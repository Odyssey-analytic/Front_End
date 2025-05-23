import React, { useRef, useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';

const dataset = [
  { month: 'Jan', seoul: 30, london: 20 },
  { month: 'Feb', seoul: 40, london: 25 },
  { month: 'Mar', seoul: 35, london: 22 },
  { month: 'Apr', seoul: 50, london: 30 },
];

const ChartsPage_BarChart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize(); // init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ChartCardWrapper title="Rainfall (Bar Chart)" customHeight="400px">
      <div ref={containerRef} style={{ width: '100%' }}>
        <BarChart
          dataset={dataset}
          xAxis={[{ dataKey: 'month' }]}
          series={[
            { dataKey: 'seoul', label: 'Seoul' },
            { dataKey: 'london', label: 'London' },
          ]}
          yAxis={[{ label: 'rainfall (mm)', width: 60 }]}
          height={300}
          width={width}
        />
      </div>
    </ChartCardWrapper>

  );
};

export default ChartsPage_BarChart;
