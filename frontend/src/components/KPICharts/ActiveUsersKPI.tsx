import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const RealTimeChart = () => {
    const [chartData, setChartData] = useState({
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
        token: "jGsqgVxz5FpEVAVo6tTcde3giUYR24r2HE5iT1AUmYBCNZcCXhVAhTJ2ZY60kgUm"
    });

    useEffect(() => {
        const source = new EventSource(`http://127.0.0.1:8000/kpi/sse/?kpi=${initialPayload.kpi}&token=${initialPayload.token}`);

        // Define event handlers
        const handleMessage = (event) => {
            const newData = JSON.parse(event.data); // Assuming the data is in JSON format
            console.log("SSE message:", newData);

            // Update chart data
            setChartData(prevData => {
                const updatedLabels = [...prevData.labels, newData.timestamp]; // Assuming your data has a timestamp field
                const updatedData = [...prevData.datasets[0].data, newData.value]; // Assuming your data has a value field

                // Keep only the latest 10 entries
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

        const handleError = (error) => {
            console.error("SSE connection error:", error);
            source.close();
        };

        // Attach event listeners
        source.onmessage = handleMessage;
        source.onerror = handleError;

        // Cleanup function to close the EventSource when the component unmounts
        return () => {
            source.close();
        };
    }, [initialPayload]);

    return (
        <div>
            <h2>Real-Time Data Chart</h2>
            <Line width={1500} height={550}  data={chartData} />
        </div>
    );
};

export default RealTimeChart;
