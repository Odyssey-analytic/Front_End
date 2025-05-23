import styles from './ChartsPage_Header.module.css';

const ChartsPage_Header = () => (
  <header className={styles.header}>
    <div className={styles.inner}>
      <h1 className={styles.title}>Overview</h1>
      <div className={styles.buttons}>
        <button>Filters</button>
        <button>No Split</button>
      </div>
    </div>
  </header>
);

export default ChartsPage_Header;
