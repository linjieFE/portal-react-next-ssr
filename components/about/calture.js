import React from 'react'
import styles from './about.module.scss'
export default function Calture(props) {
  return (
    <div className={styles.wordContainer}>
      <p className={styles.partP}>
      精神：诚信立足，创新致远；团结拼搏，高效创收。
      </p>
      <p className={styles.partP}>
      愿景：成为行业的标杆和方向标。
      </p>
      <p className={styles.partP}>
      使命：让员工在快乐工作中实现梦想。
      </p>
      <p className={styles.partP}>
      价值观：团结、诚实、学习、创新。
      </p>
    </div>
  )
}