

import React from 'react';
import styles from '../styles/LoadingSpinner.module.css'; 

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerDot}></div>
      <div className={styles.spinnerDot}></div>
      <div className={styles.spinnerDot}></div>
    </div>
  );
};

export default LoadingSpinner;
