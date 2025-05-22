// // import { LineChart } from '@mui/x-charts/LineChart';
// // import styles from './ChartsPage_AverageGameLength.module.css';

// // type AverageGameLengthChartProps = {
// //   title: string;
// //   data: number[];
// //   xData?: (string | number)[];
// // };

// // const ChartsPage_AverageGameLength = ({
// //   title,
// //   data,
// //   xData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// // }: AverageGameLengthChartProps) => {
// //   return (
// //     <div className={styles.card}>
// //       <div className={styles.header}>
// //         <h3>{title}</h3>
// //       </div>
// //       <LineChart
// //         xAxis={[{ data: xData }]}
// //         series={[{ data: data, area: true }]}
// //         height={300}
// //       />
// //     </div>
// //   );
// // };

// // export default ChartsPage_AverageGameLength;




// // const ChartsPage_AverageGameLength = ({
// //   title,
// //   data,
// //   xData = [1, 2, 3, 4, 5, 6],
// // }: AverageGameLengthChartProps) => {
// //   const containerRef = useRef<HTMLDivElement>(null);
// //   const [chartWidth, setChartWidth] = useState<number>(600);

// //   useEffect(() => {
// //     if (containerRef.current) {
// //       setChartWidth(containerRef.current.offsetWidth);
// //     }

// //     const handleResize = () => {
// //       if (containerRef.current) {
// //         setChartWidth(containerRef.current.offsetWidth);
// //       }
// //     };

// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   return (
// //     <div ref={containerRef} className={styles.card}>
// //       <div className={styles.header}>
// //         <h3>{title}</h3>
// //       </div>

// //       <div className={styles.chartWrapper}>
// //         <LineChart
// //           xAxis={[{ data: xData }]}
// //           series={[{ data: data, area: true }]}
// //           height={300}
// //           width={chartWidth}
// //         />
// //       </div>


// //       {/* <LineChart
// //         xAxis={[{ data: xData }]}
// //         series={[{ data: data, area: true }]}
// //         height={300}
// //         width={chartWidth}
// //       /> */}
// //     </div>
// //   );
// // };

// // export default ChartsPage_AverageGameLength;


// // import { motion, useAnimation } from 'framer-motion';
// // import { useInView } from 'react-intersection-observer';

// // import { motion, useAnimation, useInView } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { motion, useAnimation } from 'framer-motion';



// import React, { useRef, useState, useEffect } from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';
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
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

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

//   // return (
//   //   <motion.div
//   //     // ref={(el) => {
//   //     //   containerRef.current = el;
//   //     //   ref(el); // combine refs
//   //     // }}

//   //     // ref={(el) => {
//   //     //   containerRef.current = el;
//   //     //   if (el) ref(el); // فقط اگر el موجود بود، به useInView بده
//   //     // }}
      
//   //     ref={(el) => {
//   //       containerRef.current = el;
//   //       ref?.(el);
//   //     }}
      


//   //     className={styles.card}
//   //     initial="hidden"
//   //     animate={controls}
//   //     variants={{
//   //       hidden: { opacity: 0, y: 30 },
//   //       visible: { opacity: 1, y: 0 },
//   //     }}
//   //     transition={{ duration: 0.6, ease: 'easeOut' }}
//   //   >
//   //     <div className={styles.header}>
//   //       <h3>{title}</h3>
//   //     </div>
//   //     <div className={styles.chartWrapper}>
//   //       <LineChart
//   //         xAxis={[{ data: xData }]}
//   //         series={[{ data: data, area: true }]}
//   //         height={300}
//   //         width={chartWidth}
//   //       />
//   //     </div>
//   //   </motion.div>
//   // );


//   return (
//     <motion.div
//       ref={(el) => {
//         containerRef.current = el;
//         ref?.(el);
//       }}
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
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './ChartsPage_AverageGameLength.module.css';

type AverageGameLengthChartProps = {
  title: string;
  data: number[];
  xData?: (string | number)[];
};

const ChartsPage_AverageGameLength = ({
  title,
  data,
  xData = [1, 2, 3, 4, 5, 6],
}: AverageGameLengthChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState<number>(600);

  // 👇 انیمیشن در اسکرول
  const controls = useAnimation();
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // ترکیب دو ref
  const setRefs = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    inViewRef(el);
  };

  useEffect(() => {
    if (containerRef.current) {
      setChartWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setChartWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView]);

  return (
    <motion.div
      ref={setRefs}
      className={styles.card}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      <div className={styles.chartWrapper}>
        <LineChart
          xAxis={[{ data: xData }]}
          series={[{ data: data, area: true }]}
          height={300}
          width={chartWidth}
        />
      </div>
    </motion.div>
  );
};

export default ChartsPage_AverageGameLength;
