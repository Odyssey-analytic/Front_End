// import React, { useState } from 'react';
// import ReactApexChart from 'react-apexcharts';
// import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';
// import type { ApexOptions } from 'apexcharts';

// const ChartsPage_DonutChart = () => {
//   const [state, setState] = useState<{
//     series: number[];
//     options: ApexOptions;
//   }>({
//     series: [44, 55, 13, 33],
//     options: {
//       chart: {
//         width: 380,
//         type: 'donut',
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       responsive: [
//         {
//           breakpoint: 480,
//           options: {
//             chart: { width: 250 },
//             legend: { show: false },
//           },
//         },
//       ],
//       legend: {
//         position: 'right',
//         offsetY: 0,
//         height: 230,
//       },
//     },
//   });

//   const appendData = () => {
//     setState((prevState) => ({
//       ...prevState,
//       series: [...prevState.series, Math.floor(Math.random() * 100) + 1],
//     }));
//   };

//   const removeData = () => {
//     setState((prevState) => ({
//       ...prevState,
//       series: prevState.series.length > 1 ? prevState.series.slice(0, -1) : prevState.series,
//     }));
//   };

//   const randomize = () => {
//     setState((prevState) => ({
//       ...prevState,
//       series: prevState.series.map(() => Math.floor(Math.random() * 100) + 1),
//     }));
//   };

//   const reset = () => {
//     setState((prevState) => ({
//       ...prevState,
//       series: [44, 55, 13, 33],
//     }));
//   };

//   return (
//     // duration={1.2}
//     <ChartCardWrapper title="Device Usage (Donut Chart)" customHeight="500px">
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <ReactApexChart options={state.options} series={state.series} type="donut" width="100%" />
//         <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
//           <button onClick={appendData}>+ ADD</button>
//           <button onClick={removeData}>- REMOVE</button>
//           <button onClick={randomize}>RANDOMIZE</button>
//           <button onClick={reset}>RESET</button>
//         </div>
//       </div>
//     </ChartCardWrapper>
//   );
// };

// export default ChartsPage_DonutChart;

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
    // duration={1.4}
    <ChartCardWrapper title="Device Usage (Donut Chart)" customHeight="550px">
      {/* <div className={styles.cardContent}>
        <ReactApexChart options={state.options} series={state.series} type="donut" width="100%" />
        <div className={styles.controls}>
          <button className={styles.button} onClick={reset}>RESET</button>
          <button className={styles.button} onClick={randomize}>RANDOMIZE</button>
          <button className={styles.button} onClick={removeData}>REMOVE -</button>
          <button className={styles.button} onClick={appendData}>ADD +</button>
        </div>
      </div> */}

      <div className={styles.cardContent}>
        <div className={styles.chartContainer}>
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="donut"
            // width="100%"
          />
        </div>
        <div className={styles.controls}>
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
