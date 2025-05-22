import styles from './ChartsPage_Header.module.css';

const ChartsPage_Header = () => (
  <header className={styles.header}>
    <h1>Overview</h1>
    <div>
      <button>Filters</button>
      <button>No Split</button>
    </div>
  </header>
);

export default ChartsPage_Header;
