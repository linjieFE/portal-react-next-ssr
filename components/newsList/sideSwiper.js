import React, { useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import styles from './sideSwiper.module.scss'
import { Carousel } from 'antd'
export default function SideSwiper({ gameList, ...props }) {
  const swiperRef = useRef()
  const [cur, setCur] = useState(0) // swiper-index
  const dotHandler = function (current) {
    swiperRef.current.goTo(current)
  }
  const setChangeDot = function (from, to) {
    setCur(to)
  }
  const swiperList = useMemo(() => {
    return gameList.filter(item => item.is_hot).slice(0, 3)
  }, [gameList])
  return (
    <div className={styles.swiperOut}>
      <div className={['full-width', 'flex-row', 'flex-jst-center', 'flex-ali-center', styles.dotContainer].join(' ')}>
        {
          swiperList.map((item, idx) => {
            return (
              <div className={[styles.cusDot, cur === idx ? styles.curDot : ''].join(' ')} key={item.id} onClick={() => dotHandler(idx)}></div>
            )
          })
        }
      </div>
      <Carousel effect="fade" dots={false} autoplay={true} ref={swiperRef} beforeChange={(from, to) => setChangeDot(from, to)} autoplaySpeed={5000}>
        {swiperList.map(item => {
          return (
            <Link href='/productCenter' key={item.id}>
              <div className={styles.swiperItem}>
                <img src={item.poster} alt="" />
              </div>
            </Link>
          )
        })}
      </Carousel>
    </div>
  )
}