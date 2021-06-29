import React, { useRef, useState, useEffect } from 'react'
import useInView from 'react-cool-inview'
import styles from './activeMode.module.scss'

export default function ActiveModule(props) {
  const { ref, inView } = useInView({
    // Stop observe when the target enters the viewport, so the "inView" only triggered once
    unobserveOnEnter: true,
    // Shrink the root margin, so the animation will be triggered once the target reach a fixed amount of visible
    rootMargin: "0px",
  });
  const [cur, setCur] = useState(0) // 轮播CUR
  const swiperRef = useRef()
  const activeList = [
    { img: '/images/logo.png', title: 'flexiv1', description: 'flexiv1' },
    { img: '/images/logo.png', title: 'flexiv2', description: 'flexiv2' },
    { img: '/images/logo.png', title: 'flexiv3', description: 'flexiv3' }
  ]
  const activeSingle = [
    { img: '/images/logo.png?v=3', title: '非夕机器人1', description: '非夕机器人1' },
    { img: '/images/logo.png?v=2', title: '非夕机器人2', description: '非夕机器人2' }
  ]
  useEffect(() => {
    const interval = setInterval(() => {
      if (cur < (activeList.length - 1)) {
        let now = cur + 1
        setCur(now)
      } else {
        setCur(0)
      }
    }, 2000)
    return function () {
      clearInterval(interval)
    }
  })
  return (
    <div className={[styles.container, 'flex-row', 'flex-jst-btw', 'flex-ali-center'].join(' ')} ref={ref}>
      <div className='flex-2 flex-col flex-jst-btw flex-ali-center'>
        {/* 滚动活动模块 */}
        <div className={[styles.activeModal, styles.activeSwiper, inView ? styles.downAni : ''].join(' ')}>
          <div>
            {
              activeList.map((item, idx) => {
                return (
                  <div className={[styles.swiperItem, cur === idx ? styles.swiperCur : '', 'cus-fade-in'].join(' ')} key={idx}>
                    <div className={[styles.itemOut, 'flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                      <img src={item.img} alt="" className={styles.swiperImg} />
                      <div className='flex-col flex-jst-ard flex-ali-start'>
                        <div className={styles.swiperTit}>{item.title}</div>
                        <div className={styles.swiperDes}>{item.description}</div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* 轮播条 */}
          <div className={['flex-row', 'flex-jst-center', 'flex-ali-center', styles.controlContainer].join(' ')}>
            {
              activeList.map((item, idx) => {
                return (
                  <div className={[styles.swiperControl, idx === cur ? styles.swiperControlCur : ''].join(' ')} key={idx}></div>
                )
              })
            }
          </div>
        </div>
        {/* 下面部分 */}
        <div className='flex-row flex-jst-btw flex-ali-center full-width'>
          {
            activeSingle.map((item, idx) => {
              return (
                <div className={[styles.activeModal, styles.actSingle, 'flex-col', 'flex-jst-center', 'flex-ali-center', inView ? styles.upAni : ''].join(' ')} key={idx}>
                  <img src={item.img} alt="" />
                  <p>{item.title}</p>
                  <span>{item.description}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={['flex-1', 'self-stretch', 'full-width', 'flex-col', 'flex-jst-start', 'flex-ali-center', styles.rightCont, styles.activeModal, inView ? 'cus-fade-in' : ''].join(' ')}>
        <img src='/images/logo.png?v=3' alt=""/>
        <p className={styles.title}>非夕机器人3</p>
        <p className={[styles.actDes, inView ? styles.actDesAni : ''].join(' ')}>
        非夕机器人3
        </p>
        <p className={[styles.actDes, inView ? styles.actDesAni1 : ''].join(' ')}>
        非夕机器人3
        </p>
      </div>
    </div>
  )
}