import React from 'react'
import styles from './about.module.scss'
import HisItem from './hisItem'
export default function History(props) {
  const hisList = [
    { year: '至今', word: '目前有多款手臂产品上线', img: '/images/logo.png' },
    { year: '2021年3月', word: '非夕佛山分公司成立', img: '/images/logo.png' },
    { year: '2020年2月', word: '非夕科技有限公司成立', img: '/images/logo.png' },
    { year: '2019年12月', word: '非夕科技有限公司成立', img: '/images/logo.png' },
    { year: '2018年', word: '非夕科技有限公司成立', img: '/images/logo.png' },
    { year: '2015年9月', word: '非夕科技有限公司成立', img: '/images/logo.png' },
    { year: '2015年2月', word: '非夕科技有限公司成立', img: '/images/logo.png' },
  ]
  return (
    <div className={[styles.wordContainer, styles.hisContainer, 'flex-col', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
      <div className={[styles.listItem, styles.listFirst].join(' ')}>
        <div className={[styles.titCircle]}>
          <div></div>
        </div>
      </div>
      {
        hisList.map((item, idx) => {
          return (
            <HisItem item={item} idx={idx} key={idx}></HisItem>
            // <div className={[styles.listItem, idx % 2 === 1 ? 'flex-row' : 'flex-row-reverse', 'flex-jst-start', 'flex-ali-start', styles.listItem, idx % 2 === 1 ? styles.rightSide : styles.leftSide].join(' ')} key={idx}
            // style={{animationDelay: `${(idx + 1) * 0.5}s`}}
            // >
            //   <div className={[styles.titCircle]}>
            //     <div></div>
            //   </div>
            //   <div className={[styles.listWord, 'flex-1', 'flex-col', 'flex-jst-start', idx % 2 === 1 ? 'flex-ali-start' : 'flex-ali-end'].join(' ')}>
            //     <h2 className='title-font font-20 text-normal'>{item.year}</h2>
            //     <p className='font-16 text-normal'>{item.word}</p>
            //   </div>
            //   <div className={[styles.itemImg, 'flex-row', 'flex-jst-center', 'flex-ali-center'].join(' ')}>
            //     <img src={item.img} alt="" />
            //   </div>
            // </div>
          )
        })
      }
    </div>
  )
}