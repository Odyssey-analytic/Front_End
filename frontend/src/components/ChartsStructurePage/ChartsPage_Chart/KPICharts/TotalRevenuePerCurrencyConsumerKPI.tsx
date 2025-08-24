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
  type Plugin,
  type ScriptableContext,
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

const TotalRevenuePerCurrencyConsumer = ({selectedTime}) => {
  const USE_MOCK = false // ← وقتی true است، فقط داده‌های ماک و گرادیان نمایش داده می‌شوند

  const mockLabels = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );
  const mockData = [
    70, 71, 73, 74, 76, 78, 82, 88, 92, 84, 76, 72, 70, 71, 73, 75, 77, 79, 81,
    83, 85, 80, 74, 78,
  ];

  const colorStops = [
    { stop: 0, border: "#591c8e", fill: "rgba(89,28,142,0.25)" },
    { stop: 0.5, border: "#4e7dd4", fill: "rgba(78,125,212,0.25)" },
    { stop: 1, border: "#1721b6", fill: "rgba(23,33,182,0.25)" },
  ];

  const fadedFillPlugin: Plugin<"line"> = {
    id: "fadedFill",
    afterDatasetsDraw(chart) {
      const { ctx, chartArea, scales } = chart;
      const meta = chart.getDatasetMeta(0);

      if (!chartArea || !meta?.data?.length) return;

      // مسیر زیر نمودار را خودمان می‌سازیم
      const points = meta.data as unknown as Array<{ x: number; y: number }>;
      const yScale = scales["y"] as any;
      const baseY = yScale?.bottom ?? chartArea.bottom;

      ctx.save();

      // 1) کلیپ: مسیر area زیر خط
      ctx.beginPath();
      // شروع از خط پایه زیر اولین x
      ctx.moveTo(points[0].x, baseY);
      // رفتن روی همه‌ی نقاط خط
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        ctx.lineTo(p.x, p.y);
      }
      // برگشت روی خط پایه زیر آخرین x
      const last = points[points.length - 1];
      ctx.lineTo(last.x, baseY);
      ctx.closePath();
      ctx.clip();

      // 2) فیل افقی هم‌رنگ با بردر
      const g = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
      colorStops.forEach((cs) => g.addColorStop(cs.stop, cs.fill));
      ctx.fillStyle = g;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.width,
        chartArea.height
      );

      // 3) ماسک عمودی برای محو شدن به پایین
      const mask = ctx.createLinearGradient(
        0,
        chartArea.top,
        0,
        chartArea.bottom
      );
      mask.addColorStop(0, "rgba(0,0,0,0.9)");
      mask.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalCompositeOperation = "destination-in";
      ctx.fillStyle = mask;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.width,
        chartArea.height
      );

      ctx.restore();
    },
  };

  const [chartData, setChartData] = useState<ChartData<"line">>({
    // labels: [],
    labels: mockLabels,
    datasets: [
      {
        label: "تعداد کاربران",
        data: mockData,

        borderColor: (ctx) => {
          const { chartArea, ctx: c } = ctx.chart;
          if (!chartArea) return colorStops[colorStops.length - 1].border;
          const g = c.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );
          colorStops.forEach((cs) => g.addColorStop(cs.stop, cs.border));
          return g;
        },

        backgroundColor: "rgba(0,0,0,0)",
        fill: false,

        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 3,
      },
    ],
  });
  const sseRef = useRef<EventSource | null>(null);
  const {gameId} = useParams();
  const datee=new Date()
  datee.setUTCHours(0,0,0,0);

 
  
  
  
  
  
  
  
  
  
  useEffect(() => {
    // if we are using the mock data we make this true, so it only shows the mock
    if (USE_MOCK) return; // ← مهم

    const labels: string[] = [];
    const values: number[] = [];

    for (let i = 0; i < 24; i++) {
      const label = `${i.toString().padStart(2, "0")}:00`;
      labels.push(label);
      values.push(0);
    }

    setChartData((prev) => ({
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
  //   sseRef.current = new EventSource(
  //   `https://odysseyanalytics.ir/api/kpi/sse/EventCount?product_id=${gameId}&start_time=${selectedTime}&update_interval=${interval}`
  // );
    sseRef.current = new EventSource(
    `https://odysseyanalytics.ir/api/kpi/sse/TotalRevenuePerCurrency?product_id=${gameId}&start_time=${selectedTime}&update_interval=${interval}`
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
      const index = hour;
      setChartData((prev) => {

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
      console.error("خطا در SSE:", err);
      if (sseRef.current) sseRef.current.close();
    };

    return () => {
      if (sseRef.current) sseRef.current.close();
    };
  }, [gameId,selectedTime]);

  const movingDotPlugin = {
    id: "movingDot",
    afterDraw(chart: Chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      const points = meta.data;

      if (!points || points.length === 0) return;

      const currentHour = new Date().getHours();
      const maxIndex = Math.min(currentHour, points.length - 1);
      if (maxIndex < 1) return;

      const duration = 6000;
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
      // ctx.fillStyle = "#111d69";
      // ctx.shadowColor = "#1f2444";
      ctx.fillStyle = "#ffffffbb";
      ctx.shadowBlur = 8;
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
          color: "#9599B1",
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          callback: function (val, index) {
            const label = this.getLabelForValue(val as number);
            const screenWidth = window.innerWidth;

            if (screenWidth < 481) {
              return index % 5 === 0 ? label : "";
            } else if (screenWidth < 769) {
              return index % 3 === 0 ? label : "";
            } else if (screenWidth < 1025) {
              return index % 2 === 0 ? label : "";
            }

            return index % 1 === 0 ? label : "";
          },
        },
        grid: {
          color: "#2F304A",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#9599B1",
        },
        grid: {
          color: "#2F304A",
        },
      },
    },
  };

  return (
    <ChartCardWrapper title="TotalRevenuePerCurrencyConsumer">
      <div className={styles.glassChart}>
        <Line
          id="myAnimatedChartId"
          data={chartData}
          options={options}
          plugins={[movingDotPlugin, fadedFillPlugin]}
        />
      </div>
    </ChartCardWrapper>
  );
};

export default TotalRevenuePerCurrencyConsumer;
