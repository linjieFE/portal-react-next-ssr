import React from 'react'
import styles from './about.module.scss'
export default function Introduce(props) {
  return (
    <div className={[styles.wordContainer, styles.introduce].join(' ')}>
      <div className='flex-row flex-jst-btw flex-ali-center'>
        <img src="/images/logo.png" alt="" className={['ma-rt-2', styles.imgHalf].join(' ')} />
        <p className={[styles.normalP]}>
        Flexiv 非夕科技：自适应机器人带来的时代变革 | ChinaBang 创新企业
        </p>
      </div>
      <div className={styles.title}>
        <p className='title-font font-28 text-default'>公司简介</p>
        <span className='text-default font-16'>COMPANY INTRODUCE</span>
      </div>
      <div className='full-width'>
        <img src="/images/logo.png" alt="" className={[styles.imgHalf]} align='right' style={{marginLeft: '.15rem'}}/>
        <p className={styles.partP}>
        Flexiv 非夕科技：自适应机器人带来的时代变革 | ChinaBang 创新企业
        </p>
        <p className={styles.partP}>
        Flexiv 非夕科技：自适应机器人带来的时代变革 | ChinaBang 创新企业
        </p>
        <p className={styles.partP}>
        Flexiv 非夕科技：自适应机器人带来的时代变革 | ChinaBang 创新企业
        </p>
      </div>
    </div>
  )
}








