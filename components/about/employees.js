import React from 'react'
import styles from './about.module.scss'

export default function Employess(props) {
  const idxs = [
    // [1, 2, 3],
    // [4, 5, 6],
    // [7, 8, 9],
    // [10, 11, 12]
    [1, 2, 3],
    [4, 5],
  ]
  return (
    <div className={[styles.wordContainer, styles.employ].join(' ')}>
      {
        idxs.map((item, idx) => {
          return (
            <div className={[styles.rows, 'flex-row', 'flex-jst-ard', 'flex-ali-center', idx % 2 === 1 ? styles.rowsDouble : ''].join(' ')} key={idx}>
              {
                item.map((ele, index) => {
                  return (
                    <img src={`/images/logo${ele}.png`} alt='' className={styles.picItem} key={index} />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}
