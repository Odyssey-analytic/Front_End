import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartData,
  ChartOptions,
} from 'chart.js';

import styles from './ActiveUsersChart.module.css';
import { useRealTimeUsers } from '../../hooks/useRealTimeUsers'; 

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const ActiveUsersChart = () => {
  const { userCounts, labels } = useRealTimeUsers();

  const currentUserCount = userCounts[userCounts.length - 1] ?? 0;

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Active Users Number',
        data: userCounts,
        fill: true,
        borderColor: '#00C4FF',
        backgroundColor: 'rgba(0, 196, 255, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#FFFFFF',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#B8C4E0',
        },
      },
      y: {
        ticks: {
          color: '#B8C4E0',
        },
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.kpiBox}>
        <h3 className={styles.kpiLabel}>Active Users</h3>
        <p className={styles.kpiValue}>{currentUserCount}</p>
      </div>
      <Line data={data} options={options} />
    </div>
  );
  
};

export default ActiveUsersChart;
