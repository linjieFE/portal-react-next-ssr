import React, { useRef, useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import MainLayout from '../../layouts/mainLayout'
import { httpGet } from '../../service/http'
import { Carousel } from 'antd';
import urls from '../../service/urls'
import styles from '../../styles/about.module.scss'
import Introduce from '../../components/about/introduce'
import Calture from '../../components/about/calture'
import History from '../../components/about/history'
import Employees from '../../components/about/employees'
import DevContent from '../../components/about/development'
import { useRouter } from 'next/router'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
export default function productCenter({ info, ...props }) {
  const router = useRouter()
  const swiperRef = useRef()
  const [cur, setCur] = useState(0) // swiper-index
  const [curType, setType] = useState(0) // newsType
  const preHandler = function () {
    swiperRef.current.prev()
  }
  const nextHandler = function () {
    swiperRef.current.next()
  }
  const dotHandler = function (current) {
    swiperRef.current.goTo(current)
  }
  const setChangeDot = function (from, to) {
    setCur(to)
  }
  const typeList = [
    { value: 0, label: '公司介绍', tit: '/images/logo.png', content: Introduce },
    { value: 1, label: '发展历程', tit: '/images/logo.png', content: History },
    { value: 2, label: '公司文化', tit: '/images/logo.png', content: Calture },
    { value: 3, label: '员工风采', tit: '/images/logo.png', content: Employees },
    { value: 4, label: '员工发展', tit: '/images/logo.png', content: DevContent }
  ]
  useEffect(() => {
    if (router.query.type) {
      setType(Number(router.query.type))
    }
  }, [router])
  const Content = useMemo(() => {
    return typeList.find(item => item.value === curType).content
  }, [curType])
  return (
    <div>
      <Head>
        <title>非夕-关于我们</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <main className='pages'>
          <div className={styles.swiperOut}>
            {/* 轮播方向箭头 */}
            <div className={[styles.controlContainer, 'flex-col', 'flex-ali-center', 'flex-jst-start'].join(' ')}>
              <div className={[styles.controlBar, 'flex-row', 'flex-jst-btw', 'flex-ali-center'].join(' ')}>
                <div className={['flex-row', 'flex-jst-center', 'flex-ali-center', styles.controlArrow].join(' ')} onClick={() => preHandler()}>
                  <LeftOutlined style={{fontSize:'20px'}}/>
                </div>
                {/* 向右 */}
                <div className={['flex-row', 'flex-jst-center', 'flex-ali-center', styles.controlArrow, styles.controlArrowRight].join(' ')} onClick={() => nextHandler()}>
                  <RightOutlined style={{fontSize:'20px'}}/>
                </div>
              </div>
              {/* 轮播点 */}
              <div className={['full-width', 'flex-row', 'flex-jst-center', 'flex-ali-center', styles.dotContainer].join(' ')}>
                {
                  info.banners.map((item, idx) => {
                    return (
                      <div className={[styles.cusDot, cur === idx ? styles.curDot : ''].join(' ')} key={item} onClick={() => dotHandler(idx)}></div>
                    )
                  })
                }
              </div>
            </div>
            <Carousel effect="fade" dots={false} autoplay={true} ref={swiperRef} beforeChange={(from, to) => setChangeDot(from, to)}>
              {info.banners.map(item => {
                return (
                  <div className={styles.swiperItem} key={item}>
                    <img src={item} alt="" />
                  </div>
                )
              })}
            </Carousel>
          </div>
          {/* 中间部分 */}
          <div className={styles.centerOut}>
            <div className={styles.contentContainer}>
              <div className={['flex-row', 'flex-jst-btw', 'flex-ali-start'].join(' ')}>
                {/* 面包屑导航 */}
                <div className={[styles.bread, 'flex-row', 'flex-jst-start', 'flex-ali-base', 'flex-1'].join(' ')}>
                  <div className='self-stretch title-prefix ma-rt-2'></div>
                  <Link href='/'>
                    <span className='title-font font-18 text-normal ma-rt-1 cursor-pointer font-bold'>首页</span>
                  </Link>
                  <span className='font-18 text-normal ma-rt-1'>{'>>'}</span>
                  <span className='font-18 text-red font-bold'>关于我们</span>
                </div>
                {/* 标题 */}
                <div className={['flex-col', 'flex-jst-center', 'flex-ali-center', 'flex-3'].join(' ')}>
                  <img src={typeList.find(item => item.value === curType).tit} alt="" style={{ width: '32%' }} />
                </div>
                <div className='flex-1'></div>
              </div>
              {/* 列表部分 */}
              <div className={['flex-row', 'flex-jst-btw', 'flex-ali-start', styles.listOut].join(' ')}>
                {/* 类型选择 */}
                <div className={[styles.control, 'flex-1', 'flex-col', 'flex-jst-start', 'flex-ali-start'].join(' ')}>
                  {
                    typeList.map((item, idx) => {
                      return (
                        <div className={[styles.typeButton, idx === curType ? styles.typeCur : ''].join(' ')} key={idx} onClick={() => setType(idx)}>{item.label}</div>
                      )
                    })
                  }
                </div>
                {/* 新闻列表 */}
                <div className={['flex-3', styles.listContainer, 'flex-col', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <Content/>
                </div>
                <div className='flex-1'></div>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  )
}

export async function getStaticProps(context) {
  // const { data } = await httpGet(urls.queryIndex)
  const data={
    banners:['https://www.flexiv.cn/cn/assets/solution/banner.png','https://www.flexiv.cn/cn/assets/home/card1.png','https://www.flexiv.cn/cn/assets/home/home1.jpg'],
  }
  return {
    props: {
      info: data
    }, // will be passed to the page component as props
  }
}