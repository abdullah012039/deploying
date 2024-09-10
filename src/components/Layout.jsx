// import outlet to render nested routes
import { Outlet } from 'react-router-dom';

// import components
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

// import styles
import styles from '../styles/layout/Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navbar className={styles.navbar} />
      <main className={styles.body}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
