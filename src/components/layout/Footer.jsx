import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/layout/Footer.module.css';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a onClick={() => navigate('/home')}>Home</a>
          <a onClick={() => navigate('/Watchlists')}>About</a>
        </div>
        <div className={styles.footerSocial}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <div className={styles.footerCopyright}>
          &copy; 2023 Movies App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;