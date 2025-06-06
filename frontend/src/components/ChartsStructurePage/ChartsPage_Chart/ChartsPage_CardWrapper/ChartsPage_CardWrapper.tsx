import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import styles from './ChartsPage_CardWrapper.module.css';

type ChartCardWrapperProps = {
  title: string;
  children: React.ReactNode;
  customHeight?: string | number;
};


const ChartCardWrapper = ({ title, children, customHeight }: ChartCardWrapperProps) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      style={{ height: customHeight || 'auto' }}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className={styles.header}>
        <h3>{title}</h3>
      </div>
      <div className={styles.chartWrapper}>{children}</div>
    </motion.div>
  );
};

export default ChartCardWrapper;
