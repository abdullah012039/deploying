import React from "react";
import styles from "../../styles/layout/MainLayout.module.css";

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};

export default MainLayout;