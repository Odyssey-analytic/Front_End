import styles from './ChartsPage_SideBar.module.css';
import OdessayLogo from '../../../../public/icons/odessay_logo.svg';

const ChartsPage_SideBar = () => (
  <aside className={styles.sidebar}>
    <div className={styles.brand}>
      <span className={styles.brandText}>ODESSAY</span>
      <img src={OdessayLogo} alt="Odessay Logo" className={styles.logoImg} />
    </div>

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
