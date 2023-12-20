import React from 'react'
import styles  from './style.module.css'
const LoaderSpinner = () => {
  return (
<div className={styles['spinner-wrapper']}>
 <div className={styles.spinner}>
  <div className={styles["sk-folding-cube"]}>
   <div className={`${styles["sk-cube1"]} ${styles["sk-cube"]}`}></div>
   <div className={`${styles["sk-cube2"]} ${styles["sk-cube"]}`}></div>
   <div className={`${styles["sk-cube3"]} ${styles["sk-cube"]}`}></div>
   <div className={`${styles["sk-cube4"]} ${styles["sk-cube"]}`}></div>
  </div>
 </div>
</div>
  )
}

export default LoaderSpinner
