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
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Average Session Length',
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
//     sseRef.current = new EventSource(`https://odysseyanalytics.ir/test/api/kpi/sse/SessionLengthAvr?kpi=${initialPayload.kpi}&token=${initialPayload.token}`);

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
//               <Line width={1100} height={350} options={options} data={chartData} />
//             </div>
//           </div>
//         </div>
      
//     </div>
//   );
// };

// export default RealTimeChart;
