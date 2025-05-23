import React, { useRef, useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';

const ChartsPage_AverageGameLength = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <ChartCardWrapper title="Average Game Length" customHeight="400px">
      <div ref={ref} style={{ width: '100%' }}>
        <LineChart
          width={width}
          height={300}
          xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
          series={[{ data: [300, 310, 305, 320, 298, 330], area: true }]}
        />
      </div>
    </ChartCardWrapper>

  );
};

export default ChartsPage_AverageGameLength;

