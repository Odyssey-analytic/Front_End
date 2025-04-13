import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend, ChartData } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const RealTimeChart = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [
      {
        label: 'Random Data',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });
    const [initialPayload] = useState({
        kpi: "current_active_users",
        token: "j87dpMSJg7pMVd7VKxjBR1Qo6Uu86DiCNf8PwI3GHZxgZOO2827SsDWxsfjHVTQH"
    });
  useEffect(() => {
    const source = new EventSource(`http://127.0.0.1:8000/kpi/sse/?kpi=${initialPayload.kpi}&token=${initialPayload.token}`);

    const handleMessage = (event: MessageEvent) => {
      const newData = JSON.parse(event.data);
      console.log("SSE message:", newData);

      setChartData(prevData => {
        const updatedLabels = [...(prevData.labels || []), newData.timestamp];
        const updatedData = [...(prevData.datasets[0].data || []), newData.value];

        if (updatedLabels.length > 10) {
          updatedLabels.shift();
          updatedData.shift();
        }

        return {
          labels: updatedLabels,
          datasets: [{
            ...prevData.datasets[0],
            data: updatedData,
          }],
        };
      });
    };

    const handleError = (error: Event) => {
      console.error("SSE connection error:", error);
      source.close();
    };

    source.onmessage = handleMessage;
    source.onerror = handleError;

    return () => {
      source.close();
    };
  }, [initialPayload]);

  return (
    <div>
      <h2>Real-Time Data Chart</h2>
      <Line width={1500} height={550} data={chartData} />
    </div>
  );
};

export default RealTimeChart;
