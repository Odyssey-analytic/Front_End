import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
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
} from "chart.js";
import ChartCardWrapper from "../ChartsPage_CardWrapper/ChartsPage_CardWrapper";
import styles from "./ActiveUsersKPI.module.css";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AreaChartKPI = () => {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [
      {
        label: "تعداد کاربران",
        data: [],
        borderColor: "rgb(122,103,218,0.75)",
        backgroundColor: "rgba(227, 231, 242)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  });

  const { id: productId } = useParams();
  const sseRef = useRef<EventSource | null>(null);

  // useEffect(() => {
  //   const labels: string[] = [];
  //   const values: number[] = [];

  // for (let i = 0; i < 24; i++) {
  //   const label = `${i.toString().padStart(2, '0')}:00`;
  //   labels.push(label);
  //   values.push(0);
  // }

  //   setChartData(prev => ({
  //     labels,
  //     datasets: [
  //       {
  //         ...prev.datasets[0],
  //         data: values,
  //       },
  //     ],
  //   }));

  //   const searchParams = new URLSearchParams(window.location.search);
  //   const token = searchParams.get('token') || '';

  //   const interval = 30; // 10 ,30 ,60
  //   const now = new Date();
  //   const utcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  //   const isoMidnight = utcMidnight.toISOString().split('.')[0] + 'Z';
  //   sseRef.current = new EventSource(
  //   `https://odysseyanalytics.ir/api/kpi/sse/EventCount?product_id=${productId}&start_time=${isoMidnight}&update_interval=${interval}&token=${token}`
  // );

  //   sseRef.current.onmessage = (event: MessageEvent) => {
  //     const { timestamp, value } = JSON.parse(event.data);
  //     const date = new Date(timestamp);
  //     const hour = date.getHours();
  //     const minute = date.getMinutes();
  //     const index = hour;

  //     setChartData(prev => {
  //       const updatedData = [...(prev.datasets[0].data || [])];
  //       updatedData[index] = value;

  //       return {
  //         ...prev,
  //         datasets: [
  //           {
  //             ...prev.datasets[0],
  //             data: updatedData,
  //           },
  //         ],
  //       };
  //     });
  //   };

  //   sseRef.current.onerror = (err) => {
  //     console.error('خطا در SSE:', err);
  //     if (sseRef.current) sseRef.current.close();
  //   };

  //   return () => {
  //     if (sseRef.current) sseRef.current.close();
  //   };
  // }, []);

  useEffect(() => {
    const labels: string[] = [];
    const values: (number | null)[] = [];

    const currentHour = new Date().getHours(); // ساعت فعلی سیستم

    for (let i = 0; i < 24; i++) {
      const label = `${i.toString().padStart(2, "0")}:00`;
      labels.push(label);

      if (i <= currentHour) {
        values.push(Math.floor(Math.random() * 100));
      } else {
        values.push(null);
      }
    }

    setChartData((prev) => ({
      labels,
      datasets: [
        {
          ...prev.datasets[0],
          data: values,
        },
      ],
    }));
  }, []);

  const movingDotPlugin = {
    id: "movingDot",
    afterDraw(chart: Chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const points = meta.data;

      if (!points || points.length === 0) return;

      const currentHour = new Date().getHours();
      const maxIndex = Math.min(currentHour, points.length - 1);

      if (maxIndex < 1) return; // اگر فقط یک نقطه هست، انیمیشن لازم نیست

      const duration = 6000;
      // console.log(Date.now())
      const progress = ((Date.now() % duration) / duration) * maxIndex;

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
      ctx.fillStyle = "#00C4FF";
      ctx.shadowColor = "#00C4FF";
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.restore();
    },
  };

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const chartInstance = Chart.getChart("myAnimatedChartId") as
        | Chart
        | undefined;
      if (chartInstance) {
        chartInstance.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200,
      easing: "easeInOutQuart",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffffff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#00C4FF",
        borderWidth: 1,
        callbacks: {
          title: (tooltipItems) => {
            const hourLabel = tooltipItems[0].label;
            const [h, m] = hourLabel.split(":").map(Number);
            const endHour = m === 0 ? h : (h + 1) % 24;
            const endMin = m === 0 ? 30 : 0;

            const format = (num: number) => num.toString().padStart(2, "0");
            const start = `${format(h)}:${format(m)}`;
            const end = `${format(endHour)}:${format(endMin)}`;

            return `ساعت: ${start} تا ${end}`;
          },
          label: (context) => `تعداد کاربران: ${context.formattedValue}`,
        },
      },
      ...({ movingDot: {} } as Record<string, any>),
    },
    scales: {
      x: {
        ticks: {
          color: "#ccc",
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          callback: function (val, index) {
            const label = this.getLabelForValue(val as number);
            const [h, m] = label.split(":").map(Number);
            return m === 0 ? label : "";
          },
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ccc",
        },
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
  };

  return (
    <ChartCardWrapper title="نمودار تعداد کاربران" customHeight="500px">
      <div className={styles.glassChart}>
        <Line
          id="myAnimatedChartId"
          data={chartData}
          options={options}
          plugins={[movingDotPlugin]}
        />
      </div>
    </ChartCardWrapper>
  );
};

export default AreaChartKPI;
