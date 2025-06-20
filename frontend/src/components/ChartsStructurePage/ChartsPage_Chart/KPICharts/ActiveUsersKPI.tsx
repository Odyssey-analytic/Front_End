// import { Line } from 'react-chartjs-2';
// import { useEffect, useState } from 'react';
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

// useEffect(() => {
//   const labels: string[] = [];
//   const values: number[] = [];

//   const now = new Date();
//   const currentMinutes = now.getHours() * 60 + now.getMinutes();

//   for (let i = 0; i < 144; i++) { // 24 ساعت × 6 بازه ده‌دقیقه‌ای = 144 نقطه
//     const totalMinutes = i * 10;
//     const hour = Math.floor(totalMinutes / 60);
//     const minute = totalMinutes % 60;
//     const label = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
//     labels.push(label);

//     if (totalMinutes <= currentMinutes) {
//       const lastValue = values.length > 0 ? values[values.length - 1] : Math.random() * 30 + 20;
//       const variation = (Math.random() - 0.5) * 10;
//       const newValue = Math.max(0, Math.min(100, lastValue + variation));
//       values.push(Math.round(newValue));
//     } else {
//       values.push(0); // آینده
//     }
//   }

//   setChartData((prev) => ({
//     labels,
//     datasets: [
//       {
//         ...prev.datasets[0],
//         data: values,
//       },
//     ],
//   }));
// }, []);


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
//       legend: { display: false },
//       tooltip: {
//         enabled: true,
//         backgroundColor: '#ffffff',
//         titleColor: '#000',
//         bodyColor: '#000',
//         borderColor: '#00C4FF',
//         borderWidth: 1,
//         callbacks: {
//   title: (tooltipItems) => {
//     const hour = tooltipItems[0].label;
//     const [h, m] = hour.split(':').map(Number);

//     const startMin = m;
//     const endMin = (m + 10) % 60;
//     const endHour = h + Math.floor((m + 10) / 60);

//     const format = (num: number) => num.toString().padStart(2, '0');
//     const start = `${format(h)}:${format(startMin)}`;
//     const end = `${format(endHour % 24)}:${format(endMin)}`;

//     return `ساعت: ${start} تا ${end}`;
//   },
//   label: (context) => `تعداد کاربران: ${context.formattedValue}`,
// },

//       },
//       // movingDot: {},
//        ...( { movingDot: {} } as Record<string, any> )
//     },
//     scales: {
//   x: {
//   ticks: {
//     color: '#ccc',
//     maxRotation: 0,
//     minRotation: 0,
//     autoSkip: false, // ✅ تیک‌ها رو خودکار حذف نکن
//     callback: function (val, index) {
//       const label = this.getLabelForValue(val as number);
//       const [h, m] = label.split(':').map(Number);
//       return m % 60 === 0 ? label : ''; // فقط دقیقه‌های ۰ یا ۳۰
//     },
//   },
//   grid: {
//     color: 'rgba(255,255,255,0.05)',
//   },
// }
// ,
//   y: {
//     beginAtZero: true,
//     ticks: {
//       color: '#ccc',
//     },
//     grid: {
//       color: 'rgba(255,255,255,0.05)',
//     },
//   },
// },
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


import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
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
  const sseRef = useRef<EventSource | null>(null);
  const {gameId} = useParams();

  useEffect(() => {
    const labels: string[] = [];
    const values: number[] = [];

  for (let i = 0; i < 24; i++) {
    const label = `${i.toString().padStart(2, '0')}:00`;
    labels.push(label);
    values.push(0);
  }


    setChartData(prev => ({
      labels,
      datasets: [
        {
          ...(prev.datasets?.[0] ?? {
            label: 'Event Count',
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: [],
          }),
          data: values,
        },
      ],
    }));

    const searchParams = new URLSearchParams(window.location.search);
    const interval = 10; // 10 ,30 ,60 
    const now = new Date();
    const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const isoMidnight = utcMidnight.toISOString().split('.')[0] + 'Z';
    sseRef.current = new EventSource(
    `https://odysseyanalytics.ir/api/kpi/sse/EventCount?product_id=${gameId}&start_time=${isoMidnight}&update_interval=${interval}`
  );



    // sseRef.current = new EventSource(`https://odysseyanalytics.ir/api/kpi/sse/SessionLengthAvr?kpi=sessionTime_average&token=${token}`);
sseRef.current.onmessage = (event: MessageEvent) => {
  try {
    const parsed = JSON.parse(event.data);

    // If the first event is an array (historical data)
    if (Array.isArray(parsed)) {
      const updatedValues = Array(24).fill(0);

      parsed.forEach(({ bucket, event_count }) => {
        const date = new Date(bucket);
        const hour = date.getHours();
        updatedValues[hour] = event_count;
      });

      setChartData(prev => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: updatedValues,
          },
        ],
      }));
    }
    // Real-time single event update
    else if (parsed.bucket) {
      const { bucket, event_count } = parsed;
      const date = new Date(bucket);
      const hour = date.getHours();

      setChartData(prev => {
        const updatedData = [...(prev.datasets[0].data || [])];
        updatedData[hour] = event_count;

        return {
          ...prev,
          datasets: [
            {
              ...prev.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    } else {
      console.warn("Unexpected event format", parsed);
    }
  } catch (err) {
    console.error("Failed to parse SSE event", err);
  }
};


    sseRef.current.onerror = (err) => {
      console.error('خطا در SSE:', err);
      if (sseRef.current) sseRef.current.close();
    };

    return () => {
      if (sseRef.current) sseRef.current.close();
    };
  }, [gameId]);

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
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#ffffff',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#00C4FF',
        borderWidth: 1,
        callbacks: {
        title: (tooltipItems) => {
          const hourLabel = tooltipItems[0].label;
          const [h, m] = hourLabel.split(':').map(Number);
          const endHour = m === 0 ? h : (h + 1) % 24;
          const endMin = m === 0 ? 30 : 0;

          const format = (num: number) => num.toString().padStart(2, '0');
          const start = `${format(h)}:${format(m)}`;
          const end = `${format(endHour)}:${format(endMin)}`;

          return `ساعت: ${start} تا ${end}`;
        },
          label: (context) => `تعداد کاربران: ${context.formattedValue}`,
        },
      },
      ...( { movingDot: {} } as Record<string, any> )
    },
    scales: {
      x: {
        ticks: {
          color: '#ccc',
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          callback: function (val, index) {
            const label = this.getLabelForValue(val as number);
            const [h, m] = label.split(':').map(Number);
            return m === 0 ? label : '';
          },
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
