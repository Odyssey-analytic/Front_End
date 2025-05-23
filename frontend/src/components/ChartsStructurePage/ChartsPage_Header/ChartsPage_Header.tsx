// import styles from './ChartsPage_Header.module.css';

// const ChartsPage_Header = () => (
//   <header className={styles.header}>
//     <div className={styles.inner}>
//       <h1 className={styles.title}>Overview</h1>
//       <div className={styles.buttons}>
//         <button>Filters</button>
//         <button>No Split</button>
//       </div>
//     </div>
//   </header>
// );

// export default ChartsPage_Header;


import styles from './ChartsPage_Header.module.css';
import { FiFilter, FiColumns, FiCalendar } from 'react-icons/fi';
import { useState } from 'react';

const ChartsPage_Header = () => {
  const [dateRange, setDateRange] = useState('۱۴۰۳/۰۲/۰۵ - ۱۴۰۳/۰۲/۱۲');

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>نمای کلی</h1>
        <div className={styles.buttons}>
          <button className={styles.button}>
            <FiFilter className={styles.icon} />
            فیلترها
          </button>
          {/* <button className={styles.button}>
            <FiColumns className={styles.icon} />
            نمایش بدون تفکیک
          </button> */}
          <button className={styles.button}>
            <FiCalendar className={styles.icon} />
            <span>{dateRange}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChartsPage_Header;
