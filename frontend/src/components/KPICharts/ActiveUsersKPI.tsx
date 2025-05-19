// import { useEffect, useState, useRef } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ChartData } from 'chart.js';
// import MainLayout from '../MainLayout/MainLayout';
// import './ActiveUsersKPI.css';


// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// const RealTimeChart = () => {
//   const [chartData, setChartData] = useState<ChartData<'line'>>({
//     labels: [],
//     datasets: [
//       {
//         label: 'Average Session Length',
//         data: [],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//     ],
//   });

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Active Users Over Time',
//       },
//     },
//   };
//   const searchParams = new URLSearchParams(window.location.search);
//   const urlToken = searchParams.get('token') || '';
//   const [initialPayload] = useState({
//     kpi: "sessionTime_average",
//     token: urlToken
//   });

//   // Use a ref to store the SSE connection
//   const sseRef = useRef<EventSource | null>(null);

//   useEffect(() => {
//     // Create SSE connection
//     sseRef.current = new EventSource(`https://odysseyanalytics.ir/api/kpi/sse/SessionLengthAvr?kpi=${initialPayload.kpi}&token=${initialPayload.token}`);

//     const handleMessage = (event: MessageEvent) => {
//       const newData = JSON.parse(event.data);
//       console.log("SSE message:", newData);

//       setChartData(prevData => {
//         const updatedLabels = [...(prevData.labels || []), newData.timestamp];
//         const updatedData = [...(prevData.datasets[0].data || []), newData.value];

//         if (updatedLabels.length > 10) {
//           updatedLabels.shift();
//           updatedData.shift();
//         }

//         return {
//           labels: updatedLabels,
//           datasets: [{
//             ...prevData.datasets[0],
//             data: updatedData,
//           }],
//         };
//       });
//     };

//     const handleError = (error: Event) => {
//       console.error("SSE connection error:", error);
//       if (sseRef.current) {
//         sseRef.current.close();
//       }
//     };

//     sseRef.current.onmessage = handleMessage;
//     sseRef.current.onerror = handleError;

//     // Cleanup function for component unmount
//     return () => {
//       if (sseRef.current) {
//         sseRef.current.close();
//       }
//     };
//   }, [initialPayload]);

//   // Handle tab/window closing
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       if (sseRef.current) {
//         sseRef.current.close();
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, []);

//   return (
//     <div className="welcome-page-container vh-100 d-flex flex-column">
//       <MainLayout></MainLayout>
//         <div className='kpichart-page-container'>
//           <div className='kpi-sessionavr-main-box'>
//             <div className='kpi-chart-header'>
//               <h2 style={{fontSize: "1.5rem"}}><u>میانگین طول بازی:</u></h2>
//             </div>
//             <div className='kpi-chart-body'>
//               <Line width={1200} height={425} options={options} data={chartData} />
//             </div>
//           </div>
//         </div>
      
//     </div>
//   );
// };

// export default RealTimeChart;


// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ChartData } from 'chart.js';
// import MainLayout from '../MainLayout/MainLayout';
// import './ActiveUsersKPI.css';

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// const RealTimeChart = () => {
//   const [chartData, setChartData] = useState<ChartData<'line'>>({
//     labels: [],
//     datasets: [
//       {
//         label: 'Average Session Length',
//         data: [],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//     ],
//   });

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Active Users Over Time',
//       },
//     },
//   };

  // const searchParams = new URLSearchParams(window.location.search);
  // const urlToken = searchParams.get('token') || '';
  // const [initialPayload] = useState({
  //   kpi: "sessionTime_average",
  //   token: urlToken
  // });

  // // SSE connection
  // const sseRef = useRef<EventSource | null>(null);

  // useEffect(() => {
  //   sseRef.current = new EventSource(`https://odysseyanalytics.ir/api/kpi/sse/SessionLengthAvr?kpi=${initialPayload.kpi}&token=${initialPayload.token}`);

  //   const handleMessage = (event: MessageEvent) => {
  //     const newData = JSON.parse(event.data);
  //     console.log("SSE message:", newData);

  //     setChartData(prevData => {
  //       const updatedLabels = [...(prevData.labels || []), newData.timestamp];
  //       const updatedData = [...(prevData.datasets[0].data || []), newData.value];

  //       if (updatedLabels.length > 10) {
  //         updatedLabels.shift();
  //         updatedData.shift();
  //       }

  //       return {
  //         labels: updatedLabels,
  //         datasets: [{
  //           ...prevData.datasets[0],
  //           data: updatedData,
  //         }],
  //       };
  //     });
  //   };

  //   const handleError = (error: Event) => {
  //     console.error("SSE connection error:", error);
  //     if (sseRef.current) {
  //       sseRef.current.close();
  //     }
  //   };

  //   sseRef.current.onmessage = handleMessage;
  //   sseRef.current.onerror = handleError;

  //   return () => {
  //     if (sseRef.current) {
  //       sseRef.current.close();
  //     }
  //   };
  // }, [initialPayload]);

  // Mock data generator (for testing)
//   useEffect(() => {
//     const interval = setInterval(() => {
//       const mockData = {
//         timestamp: new Date().toLocaleTimeString(),
//         value: Math.floor(Math.random() * 100), // عدد تصادفی بین 0 تا 99
//       };

//       setChartData(prevData => {
//         const updatedLabels = [...(prevData.labels || []), mockData.timestamp];
//         const updatedData = [...(prevData.datasets[0].data || []), mockData.value];

//         if (updatedLabels.length > 10) {
//           updatedLabels.shift();
//           updatedData.shift();
//         }

//         return {
//           labels: updatedLabels,
//           datasets: [{
//             ...prevData.datasets[0],
//             data: updatedData,
//           }],
//         };
//       });
//     }, 2000); // هر دو ثانیه

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="welcome-page-container vh-100 d-flex flex-column">
//       <MainLayout />
//       <div className='kpichart-page-container'>
//         <div className='kpi-sessionavr-main-box'>
//           <div className='kpi-chart-header'>
//             <h2 style={{ fontSize: "1.5rem" }}><u>میانگین طول بازی:</u></h2>
//           </div>
//           <div className='kpi-chart-body'>
//             <Line width={1200} height={425} options={options} data={chartData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealTimeChart;

// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ChartData } from 'chart.js';
// import MainLayout from '../MainLayout/MainLayout';
// import './ActiveUsersKPI.css';

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// const RealTimeChart = () => {
//   const [chartData, setChartData] = useState<ChartData<'line'>>({
//     labels: [],
//     datasets: [
//       {
//         label: 'میانگین طول بازی (دقیقه)',
//         data: [],
//         borderColor: '#00C4FF',
//         backgroundColor: 'rgba(0, 196, 255, 0.1)',
//         tension: 0.4,
//         fill: true,
//         pointRadius: 3,
//         pointHoverRadius: 6,
//       },
//     ],
//   });

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         labels: {
//           color: '#00C4FF',
//           font: { size: 14 },
//         },
//       },
//       title: {
//         display: true,
//         text: 'میانگین زمان بازی کاربران در لحظه',
//         color: '#142d47',
//         font: { size: 18 },
//       },
//       tooltip: {
//         backgroundColor: '#1e2a38',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         borderColor: '#00C4FF',
//         borderWidth: 1,
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: '#333' },
//         grid: { color: '#eee' },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: { color: '#333' },
//         grid: { color: '#eee' },
//       },
//     },
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const mockData = {
//         timestamp: new Date().toLocaleTimeString(),
//         value: Math.floor(Math.random() * 100),
//       };

//       setChartData(prevData => {
//         const updatedLabels = [...(prevData.labels || []), mockData.timestamp];
//         const updatedData = [...(prevData.datasets[0].data || []), mockData.value];

//         if (updatedLabels.length > 10) {
//           updatedLabels.shift();
//           updatedData.shift();
//         }

//         return {
//           labels: updatedLabels,
//           datasets: [{
//             ...prevData.datasets[0],
//             data: updatedData,
//           }],
//         };
//       });
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="welcome-page-container vh-100 d-flex flex-column">
//       <MainLayout />
//       <div className='kpichart-page-container'>
//         <div className='kpi-sessionavr-main-box'>
//           <div className='kpi-chart-header'>
//             <h2 className='kpi-title'><u>میانگین طول بازی:</u></h2>
//           </div>
//           <div className='kpi-chart-body'>
//             <Line options={options} data={chartData} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RealTimeChart;
// import { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend,
//   ChartData
// } from 'chart.js';
// import MainLayout from '../MainLayout/MainLayout';
// import './ActiveUsersKPI.css';

// ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

// const RealTimeChart = () => {
//   const [chartData, setChartData] = useState<ChartData<'line'>>({
//     labels: [],
//     datasets: [
//       {
//         label: 'میانگین زمان',
//         data: [],
//         borderColor: 'rgba(0, 255, 198, 1)',
//         backgroundColor: 'rgba(0, 255, 198, 0.1)',
//         tension: 0.4,
//         fill: true,
//         pointRadius: 3,
//         pointHoverRadius: 6,
//       },
//     ],
//   });

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         backgroundColor: '#ffffff',
//         titleColor: '#000',
//         bodyColor: '#000',
//         borderColor: '#00ffc3',
//         borderWidth: 1,
//       },
//       title: {
//         display: true,
//         text: '📈 روند لحظه‌ای میانگین زمان بازی',
//         color: '#ffffff',
//         font: { size: 20, family: 'Shabnam' },
//       },
//     },
//     scales: {
//       x: {
//         ticks: { color: '#ccc' },
//         grid: { color: 'rgba(255,255,255,0.05)' },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: { color: '#ccc' },
//         grid: { color: 'rgba(255,255,255,0.05)' },
//       },
//     },
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const newPoint = {
//         timestamp: new Date().toLocaleTimeString(),
//         value: Math.floor(Math.random() * 100),
//       };

//       setChartData(prev => {
//         const updatedLabels = [...(prev.labels || []), newPoint.timestamp];
//         const updatedData = [...(prev.datasets[0].data || []), newPoint.value];

//         if (updatedLabels.length > 12) {
//           updatedLabels.shift();
//           updatedData.shift();
//         }

//         return {
//           labels: updatedLabels,
//           datasets: [{
//             ...prev.datasets[0],
//             data: updatedData,
//           }],
//         };
//       });
//     }, 2000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//     <MainLayout />
//       <div className="glass-container">
//         <div className="glass-box">
//           <div className="glass-header">
//             <h2>📊 میانگین طول بازی در لحظه</h2>
//           </div>
//           <div className="glass-chart">
//             <Line options={options} data={chartData} />
//           </div>
//         </div>
//       </div>
//     {/* </MainLayout> */}
//     </div>
//   );
// };

// export default RealTimeChart;

import { ChartOptions } from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
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
import MainLayout from '../MainLayout/MainLayout';
import './ActiveUsersKPI.css';

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
      title: {
        display: true,
        text: '📊 میانگین طول بازی - Area Chart',
        color: '#ffffff',
        font: {
          size: 20,
          family: 'Shabnam',
        },
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
    <div>
    {/* <MainLayout /> */}
      <div className="glass-container">
        <div className="glass-box">
          <div className="glass-header">
            <h2>📈 Area Chart میانگین طول بازی</h2>
          </div>
          <div className="glass-chart">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaChartKPI;
