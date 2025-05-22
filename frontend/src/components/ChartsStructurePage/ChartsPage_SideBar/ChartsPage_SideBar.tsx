import styles from './ChartsPage_SideBar.module.css';

const ChartsPage_SideBar = () => (
  <aside className={styles.sidebar}>
    <div className={styles.logo}>Demo Game v2</div>
    <nav className={styles.menu}>
      <ul>
        <li>Overview</li>
        <li>Engagement</li>
        <li>Monetization</li>
      </ul>
    </nav>
  </aside>
);

export default ChartsPage_SideBar;
