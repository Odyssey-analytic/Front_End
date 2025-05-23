import { ChartOptions } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import styles from './ActiveUsersKPI.module.css';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper'

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

const AreaChartKPI = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: 'میانگین زمان',
        data: [],
        borderColor: '#00C4FF',
        backgroundColor: 'rgba(0, 196, 255, 0.2)',
        tension: 0.5,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  });

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
      axis: 'x' as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#ffffff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#00C4FF',
        borderWidth: 1,
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#ccc' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const mock = {
        timestamp: new Date().toLocaleTimeString(),
        value: Math.floor(Math.random() * 100),
      };

      setChartData(prev => {
        const updatedLabels = [...(prev.labels || []), mock.timestamp];
        const updatedData = [...(prev.datasets[0].data || []), mock.value];

        if (updatedLabels.length > 12) {
          updatedLabels.shift();
          updatedData.shift();
        }

        return {
          labels: updatedLabels,
          datasets: [{
            ...prev.datasets[0],
            data: updatedData,
          }],
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ChartCardWrapper title="نمودار تعداد کاربران" customHeight="500px">
      <div className={styles.glassChart}>
        <Line data={chartData} options={options} />
      </div>
    </ChartCardWrapper>
  );
};

export default AreaChartKPI;
