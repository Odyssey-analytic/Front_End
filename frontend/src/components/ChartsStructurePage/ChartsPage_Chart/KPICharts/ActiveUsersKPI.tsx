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
  // type ChartOptions,
  // type ChartData,
} from "chart.js";

// import type { Plugin, ScriptableContext } from "chart.js";

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
  const USE_MOCK = true; // ← وقتی true است، فقط داده‌های ماک و گرادیان نمایش داده می‌شوند

  const mockLabels = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`
  );
  const mockData = [
    70, 71, 73, 74, 76, 78, 82, 88, 92, 84, 76, 72, 70, 71, 73, 75, 77, 79, 81,
    83, 85, 80, 74, 78,
  ];

  const glowPlugin: Plugin<"line"> = {
    id: "glow",
    beforeDatasetsDraw(chart) {
      const { ctx } = chart;
      const meta = chart.getDatasetMeta(0);
      if (!meta?.dataset) return;
      ctx.save();
      ctx.shadowColor = "rgba(108,91,255,0.8)";
      ctx.shadowBlur = 18;
      (meta.dataset as any).draw(); // فقط برای افتادن سایه
      ctx.restore();
    },
  };

  const segmentedAreaFill: Plugin<"line"> = {
    id: "segmentedAreaFill",
    beforeDatasetsDraw(chart, _args, pluginOpts) {
      try {
        const meta = chart.getDatasetMeta(0);
        const { ctx, chartArea } = chart;
        if (!meta || meta.hidden || !chartArea) return;
  
        const elems = meta.data as any[];
        if (!elems || elems.length === 0) return;
  
        // مرزهای افقی بخش‌ها (۰..۱ نسبتی)
        const parts: Array<{ from: number; to: number; top: string; bottom: string }> =
          pluginOpts?.parts ?? [
            { from: 0.0,  to: 0.33, top: "#dc2e2e", bottom: "#dc2e2e" },
            { from: 0.33, to: 0.66, top: "#dc2e2e", bottom: "#dc2e2e" },
            { from: 0.66, to: 1.0,  top: "#dc2e2e",  bottom: "#dc2e2e" },
          ];
  
        // مسیر ناحیه‌ی زیر خط: از کف → روی خط → بازگشت به کف
        const first = elems[0].getProps(["x", "y"], true);
        const last  = elems[elems.length - 1].getProps(["x", "y"], true);
  
        const makePath = () => {
          ctx.beginPath();
          ctx.moveTo(first.x, chartArea.bottom);
          for (let i = 0; i < elems.length; i++) {
            const { x, y } = elems[i].getProps(["x", "y"], true);
            ctx.lineTo(x, y);
          }
          ctx.lineTo(last.x, chartArea.bottom);
          ctx.closePath();
        };
  
        parts.forEach((p) => {
          const xL = chartArea.left + (chartArea.right - chartArea.left) * p.from;
          const xR = chartArea.left + (chartArea.right - chartArea.left) * p.to;
  
          ctx.save();
          // کلیپ افقی بخش
          ctx.beginPath();
          ctx.rect(xL, chartArea.top, xR - xL, chartArea.bottom - chartArea.top);
          ctx.clip();
  
          // مسیر ناحیه و گرادیان عمودی مخصوص همین بخش
          makePath();
          const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          g.addColorStop(0, p.top);
          g.addColorStop(1, p.bottom);
          ctx.fillStyle = g;
          ctx.fill();
  
          ctx.restore();
        });
      } catch (err) {
        console.error("segmentedAreaFill error:", err);
      }
    },
  };
  
  // ثبتِ سراسری پلاگین
  // ChartJS.register(segmentedAreaFill);


  const [chartData, setChartData] = useState<ChartData<"line">>({
    // labels: [],
    labels: mockLabels,
    datasets: [
      {
        label: "تعداد کاربران",
        // data: [],
        data: mockData,

        borderColor: (ctx: ScriptableContext<"line">) => {
          const { chart } = ctx;
          const { ctx: c, chartArea } = chart;
          if (!chartArea) return "#3AA0FF";
          const g = c.createLinearGradient(
            chartArea.left,
            0,
            chartArea.right,
            0
          );
          g.addColorStop(0, "#591c8e");
          g.addColorStop(0.5, "#4e7dd4");
          g.addColorStop(1, "#1721b6");
          return g;
        },

        // backgroundColor: (ctx: ScriptableContext<"line">) => {
        //   const { chart } = ctx;
        //   const { ctx: c, chartArea } = chart;
        //   if (!chartArea) return "rgba(64,84,255,0.18)";
        //   const g = c.createLinearGradient(
        //     0,
        //     chartArea.top,
        //     0,
        //     chartArea.bottom
        //   );
        //   g.addColorStop(0, "rgba(64,84,255,0.15)");
        //   g.addColorStop(0.5, "rgba(38,53,128,0.22)");
        //   g.addColorStop(1, "rgba(21,34,86,0.35)");
        //   return g;
        // },

        tension: 0.4,
        // fill: true,
        fill: false,
        pointRadius: 0,
        pointHoverRadius: 4,
        borderWidth: 3,

      },
    ],
  });

  const { id: productId } = useParams();
  const sseRef = useRef<EventSource | null>(null);

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
          ...prev.datasets[0],
          data: values,
        },
      ],
    }));

    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token") || "";

    const interval = 30;
    const now = new Date();
    const utcMidnight = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const isoMidnight = utcMidnight.toISOString().split(".")[0] + "Z";

    sseRef.current = new EventSource(
      `https://odysseyanalytics.ir/api/kpi/sse/EventCount?product_id=${productId}&start_time=${isoMidnight}&update_interval=${interval}&token=${token}`
    );

    sseRef.current.onmessage = (event: MessageEvent) => {
      const { timestamp, value } = JSON.parse(event.data);
      const date = new Date(timestamp);
      const hour = date.getHours();
      const index = hour;

      setChartData((prev) => {
        const updatedData = [...(prev.datasets[0].data || [])];
        updatedData[index] = value;

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
    };

    sseRef.current.onerror = (err) => {
      console.error("خطا در SSE:", err);
      if (sseRef.current) sseRef.current.close();
    };

    return () => {
      if (sseRef.current) sseRef.current.close();
    };
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
      ctx.fillStyle = "#111d69";
      ctx.shadowColor = "#1f2444";
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
    <ChartCardWrapper title="نمودار تعداد کاربران">
      <div className={styles.glassChart}>
        <Line
          id="myAnimatedChartId"
          data={chartData}
          options={options}
          plugins={[movingDotPlugin]}
          // plugins={[glowPlugin, movingDotPlugin]}
        />
      </div>
    </ChartCardWrapper>
  );
};

export default AreaChartKPI;
