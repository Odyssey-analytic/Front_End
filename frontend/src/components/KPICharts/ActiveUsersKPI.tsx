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

    const searchParams = new URLSearchParams(window.location.search);
    const urlToken = searchParams.get('token') || '';
    console.log(urlToken)
    const [initialPayload] = useState({
        kpi: "sessionTime_average",
        token: urlToken
    });
  useEffect(() => {
    const source = new EventSource(`https://odysseyanalytics.ir/api/kpi/sse/SessionLengthAvr?kpi=${initialPayload.kpi}&token=${initialPayload.token}`);

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
