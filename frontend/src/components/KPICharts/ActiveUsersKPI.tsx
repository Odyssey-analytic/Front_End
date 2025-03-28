// RealTimeChart.js
import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

const RealTimeChart = () => {
    const [data, setData] = useState({
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
    const [dataa, setdataa] = useState({});
    const [initialPayload, setInitialPayload] = useState({
        kpi: "current_active_users",
        token: "NenFqjpccgj4dL1DPmP83P40ome3cphkxIYkmnE9QxIzmhLfBW4OHcL8x39I1MeE"
    }); // Example initial payload
    const x = new URLSearchParams(initialPayload);
    useEffect(() => {
        const source = new EventSource(`http://localhost:8000/kpi/sse?${x.toString()}`);

        // Define event handlers
        const handleMessage = (event) => {
            console.log("SSE message:", event.data);
        };

        const handleError = (error) => {
            console.error("SSE connection error:", error);
            // Optionally, you can close the connection on error
            source.close();
        };

        // Attach event listeners
        source.onmessage = handleMessage;
        source.onerror = handleError;

        // Cleanup function to close the EventSource when the component unmounts or dependencies change
        return () => {
            source.close(); // Close the connection
        };
    }, [dataa, x]);

    return (
        <div>
            <h2>Real-Time Data Chart</h2>
            <Line data={data}/>
        </div>
    );
};

export default RealTimeChart;
