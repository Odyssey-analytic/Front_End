import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  ChartData,
} from 'chart.js';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';
import styles from './ActiveUsersKPI.module.css';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

const AreaChartKPI = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: 'تعداد کاربران',
        data: [],
        borderColor: '#00C4FF',
        backgroundColor: 'rgba(0, 196, 255, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  });

  useEffect(() => {
    const hours: string[] = [];
    const values: number[] = [];

    const now = new Date();
    const currentHour = now.getHours();

    for (let i = 0; i < 24; i++) {
      const hourLabel = `${i.toString().padStart(2, '0')}:00`;
      hours.push(hourLabel);

      if (i <= currentHour) {
        const lastValue = values.length > 0 ? values[values.length - 1] : Math.random() * 30 + 20;
        const variation = (Math.random() - 0.5) * 10;
        const newValue = Math.max(0, Math.min(100, lastValue + variation));
        values.push(Math.round(newValue));
      } else {
        values.push(0);
      }
    }

    setChartData((prev) => ({
      labels: hours,
      datasets: [
        {
          ...prev.datasets[0],
          data: values,
        },
      ],
    }));
  }, []);

  const movingDotPlugin = {
    id: 'movingDot',
    afterDraw(chart: Chart) {
      const { ctx } = chart;
      const dataset = chart.data.datasets[0];
      const meta = chart.getDatasetMeta(0);
      const points = meta.data;

      if (!points || points.length === 0) return;

      const now = Date.now();
      const duration = 6000;
      const progress = ((now % duration) / duration) * (points.length - 1);

      const leftIndex = Math.floor(progress);
      const rightIndex = Math.ceil(progress);
      const t = progress - leftIndex;

      if (rightIndex >= points.length) return;

      const p1 = points[leftIndex];
      const p2 = points[rightIndex];

      const x = p1.x + (p2.x - p1.x) * t;
      const y = p1.y + (p2.y - p1.y) * t;

      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00C4FF';
      ctx.shadowColor = '#00C4FF';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    },
  };

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const chartInstance = Chart.getChart('myAnimatedChartId') as Chart | undefined;
      if (chartInstance) {
        chartInstance.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: 'easeInOutQuart',
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#00C4FF',
        borderWidth: 1,
        callbacks: {
          title: (tooltipItems) => `ساعت: ${tooltipItems[0].label}`,
          label: (context) => `تعداد کاربران: ${context.formattedValue}`,
        },
      },
      // movingDot: {},
       ...( { movingDot: {} } as Record<string, any> )
    },
    scales: {
      x: {
        ticks: {
          color: '#ccc',
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#ccc',
        },
        grid: {
          color: 'rgba(255,255,255,0.05)',
        },
      },
    },
  };

  return (
    <ChartCardWrapper title="نمودار تعداد کاربران" customHeight="500px">
      <div className={styles.glassChart}>
        <Line id="myAnimatedChartId" data={chartData} options={options} plugins={[movingDotPlugin]} />
      </div>
    </ChartCardWrapper>
  );
};

export default AreaChartKPI;

// import { useEffect, useRef, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   Chart,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   ChartOptions,
//   ChartData,
// } from 'chart.js';
// import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';
// import styles from './ActiveUsersKPI.module.css';

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, Filler);

// const AreaChartKPI = () => {
//   const [chartData, setChartData] = useState<ChartData<'line'>>({
//     labels: [],
//     datasets: [
//       {
//         label: 'تعداد کاربران',
//         data: [],
//         borderColor: '#00C4FF',
//         backgroundColor: 'rgba(0, 196, 255, 0.2)',
//         tension: 0.4,
//         fill: true,
//         pointRadius: 0,
//         pointHoverRadius: 4,
//       },
//     ],
//   });

//   const sseRef = useRef<EventSource | null>(null);

//   useEffect(() => {
//     const hours: string[] = [];
//     const values: number[] = [];

//     for (let i = 0; i < 24; i++) {
//       const hourLabel = `${i.toString().padStart(2, '0')}:00`;
//       hours.push(hourLabel);
//       values.push(0);
//     }

//     setChartData(prev => ({
//       labels: hours,
//       datasets: [
//         {
//           ...prev.datasets[0],
//           data: values,
//         },
//       ],
//     }));

//     const searchParams = new URLSearchParams(window.location.search);
//     const token = searchParams.get('token') || '';

//     sseRef.current = new EventSource(`https://odysseyanalytics.ir/api/kpi/sse/SessionLengthAvr?kpi=sessionTime_average&token=${token}`);

//     sseRef.current.onmessage = (event: MessageEvent) => {
//       const { timestamp, value } = JSON.parse(event.data);
//       const hour = new Date(timestamp).getHours();

//       setChartData(prev => {
//         const updatedData = [...(prev.datasets[0].data || [])];
//         updatedData[hour] = value;

//         return {
//           ...prev,
//           datasets: [
//             {
//               ...prev.datasets[0],
//               data: updatedData,
//             },
//           ],
//         };
//       });
//     };

//     sseRef.current.onerror = (err) => {
//       console.error('خطا در SSE:', err);
//       if (sseRef.current) sseRef.current.close();
//     };

//     return () => {
//       if (sseRef.current) sseRef.current.close();
//     };
//   }, []);

//   const movingDotPlugin = {
//     id: 'movingDot',
//     afterDraw(chart: Chart) {
//       const { ctx } = chart;
//       const dataset = chart.data.datasets[0];
//       const meta = chart.getDatasetMeta(0);
//       const points = meta.data;

//       if (!points || points.length === 0) return;

//       const now = Date.now();
//       const duration = 6000;
//       const progress = ((now % duration) / duration) * (points.length - 1);

//       const leftIndex = Math.floor(progress);
//       const rightIndex = Math.ceil(progress);
//       const t = progress - leftIndex;

//       if (rightIndex >= points.length) return;

//       const p1 = points[leftIndex];
//       const p2 = points[rightIndex];

//       const x = p1.x + (p2.x - p1.x) * t;
//       const y = p1.y + (p2.y - p1.y) * t;

//       ctx.save();
//       ctx.beginPath();
//       ctx.arc(x, y, 6, 0, Math.PI * 2);
//       ctx.fillStyle = '#00C4FF';
//       ctx.shadowColor = '#00C4FF';
//       ctx.shadowBlur = 12;
//       ctx.fill();
//       ctx.restore();
//     },
//   };

//   useEffect(() => {
//     let animationFrameId: number;

//     const animate = () => {
//       const chartInstance = Chart.getChart('myAnimatedChartId') as Chart | undefined;
//       if (chartInstance) {
//         chartInstance.draw();
//       }
//       animationFrameId = requestAnimationFrame(animate);
//     };

//     animate();

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);

//   const options: ChartOptions<'line'> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1200,
//       easing: 'easeInOutQuart',
//     },
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         enabled: true,
//         backgroundColor: '#ffffff',
//         titleColor: '#000',
//         bodyColor: '#000',
//         borderColor: '#00C4FF',
//         borderWidth: 1,
//         callbacks: {
//           title: (tooltipItems) => `ساعت: ${tooltipItems[0].label}`,
//           label: (context) => `تعداد کاربران: ${context.formattedValue}`,
//         },
//       },
//       ...( { movingDot: {} } as Record<string, any> )
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: '#ccc',
//           maxRotation: 0,
//           minRotation: 0,
//         },
//         grid: {
//           color: 'rgba(255,255,255,0.05)',
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           color: '#ccc',
//         },
//         grid: {
//           color: 'rgba(255,255,255,0.05)',
//         },
//       },
//     },
//   };

//   return (
//     <ChartCardWrapper title="نمودار تعداد کاربران" customHeight="500px">
//       <div className={styles.glassChart}>
//         <Line id="myAnimatedChartId" data={chartData} options={options} plugins={[movingDotPlugin]} />
//       </div>
//     </ChartCardWrapper>
//   );
// };

// export default AreaChartKPI;
