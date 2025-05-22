// import React, { useRef, useState, useEffect } from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';
// import { motion, useAnimation } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import styles from './ChartsPage_AverageGameLength.module.css';

// type AverageGameLengthChartProps = {
//   title: string;
//   data: number[];
//   xData?: (string | number)[];
// };

// const ChartsPage_AverageGameLength = ({
//   title,
//   data,
//   xData = [1, 2, 3, 4, 5, 6],
// }: AverageGameLengthChartProps) => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [chartWidth, setChartWidth] = useState<number>(600);

//   // 👇 انیمیشن در اسکرول
//   const controls = useAnimation();
//   const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

//   // ترکیب دو ref
//   const setRefs = (el: HTMLDivElement | null) => {
//     containerRef.current = el;
//     inViewRef(el);
//   };

//   useEffect(() => {
//     if (containerRef.current) {
//       setChartWidth(containerRef.current.offsetWidth);
//     }

//     const handleResize = () => {
//       if (containerRef.current) {
//         setChartWidth(containerRef.current.offsetWidth);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (inView) controls.start('visible');
//   }, [inView]);

//   return (
//     <motion.div
//       ref={setRefs}
//       className={styles.card}
//       initial="hidden"
//       animate={controls}
//       variants={{
//         hidden: { opacity: 0, y: 30 },
//         visible: { opacity: 1, y: 0 },
//       }}
//       transition={{ duration: 0.6, ease: 'easeOut' }}
//     >
//       <div className={styles.header}>
//         <h3>{title}</h3>
//       </div>
//       <div className={styles.chartWrapper}>
//         <LineChart
//           xAxis={[{ data: xData }]}
//           series={[{ data: data, area: true }]}
//           height={300}
//           width={chartWidth}
//         />
//       </div>
//     </motion.div>
//   );
// };

// export default ChartsPage_AverageGameLength;


import React, { useRef, useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import ChartCardWrapper from '../ChartsPage_CardWrapper/ChartsPage_CardWrapper';

const ChartsPage_AverageGameLength = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <ChartCardWrapper title="Average Game Length">
      <div ref={ref} style={{ width: '100%' }}>
        <LineChart
          width={width}
          height={300}
          xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
          series={[{ data: [300, 310, 305, 320, 298, 330], area: true }]}
        />
      </div>
    </ChartCardWrapper>
  );
};

export default ChartsPage_AverageGameLength;

