import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';
import styles from './ChartsPage_DonutChart.module.css';
import type { ApexOptions } from 'apexcharts';

const ChartsPage_DonutChart = () => {
  const [state, setState] = useState<{
    series: number[];
    options: ApexOptions;
  }>({
    series: [44, 55, 13, 33],
    options: {
      chart: {
        width: 380,
        type: 'donut' as const,
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 250 },
            legend: { show: false },
          },
        },
      ],
      legend: {
        position: 'right',
        offsetY: 0,
        height: 230,
      },
    },
  });

  const appendData = () =>
    setState((prev) => ({
      ...prev,
      series: [...prev.series, Math.floor(Math.random() * 100) + 1],
    }));

  const removeData = () =>
    setState((prev) => ({
      ...prev,
      series: prev.series.length > 1 ? prev.series.slice(0, -1) : prev.series,
    }));

  const randomize = () =>
    setState((prev) => ({
      ...prev,
      series: prev.series.map(() => Math.floor(Math.random() * 100) + 1),
    }));

  const reset = () =>
    setState((prev) => ({
      ...prev,
      series: [44, 55, 13, 33],
    }));

  return (
    <ChartCardWrapper title="Device Usage (Donut Chart)" customHeight="550px">

      <div className={styles.cardContent}>
        <div className={styles.chartContainer}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            // width="100%"
          />
        </div>
        <div className={styles.actionButtons}>
            <button className={styles.button} onClick={appendData}>+ ADD</button>
            <button className={styles.button} onClick={removeData}>- REMOVE</button>
            <button className={styles.button} onClick={randomize}>RANDOMIZE</button>
            <button className={styles.button} onClick={reset}>RESET</button>
        </div>

      </div>

    </ChartCardWrapper>
  );
};

export default ChartsPage_DonutChart;
