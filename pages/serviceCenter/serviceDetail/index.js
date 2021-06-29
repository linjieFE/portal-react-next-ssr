import React, { useRef, useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import MainLayout from '../../../layouts/mainLayout'
import { httpGet } from '../../../service/http'
import { Carousel } from 'antd';
import urls from '../../../service/urls'
import styles from '../../../styles/serviceDetail.module.scss'
import { useRouter } from 'next/router'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
export default function productCenter({ info, questions, ...props }) {

  const router = useRouter()
  const swiperRef = useRef()
  const [cur, setCur] = useState(0) // swiper-index
  const [curType, setType] = useState(1)
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
  useEffect(() => {
    if (router.query.type) {
      setType(Number(router.query.type))
    }
  }, [router])
  const curList = useMemo(() => {
    return questions.filter(item => item.type === curType)
  })
  const typeList = [
    { value: 1, label: '充值问题' },
    { value: 2, label: '账号问题' },
    { value: 3, label: '售后问题' },
    { value: 4, label: '产品申诉' },
    { value: 5, label: '投诉建议' }
  ]
  const OPEN_KF_HANDLER = () => {
    window.open('tencent://message/?uin=800183557&Site=在线QQ&amp;Menu=yes')
  }
  return (
    <div>
      <Head>
        <title>非夕-客服中心</title>
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
              <div className={['flex-row', 'flex-jst-start', 'flex-ali-start'].join(' ')}>
                {/* 面包屑导航 */}
                <div className={[styles.bread, 'flex-row', 'flex-jst-start', 'flex-ali-base', 'flex-1'].join(' ')}>
                  <div className='self-stretch title-prefix ma-rt-2'></div>
                  <Link href='/'>
                    <span className='title-font font-18 text-normal ma-rt-1 cursor-pointer font-bold'>首页</span>
                  </Link>
                  <span className='font-18 text-normal ma-rt-1'>{'>>'}</span>
                  <Link href='/serviceCenter'>
                    <span className='font-18 text-red font-bold cursor-pointer'>客服中心</span>
                  </Link>
                </div>
              </div>
              {/* 正文 */}
              <div className={['flex-row', 'flex-jst-btw', 'flex-ali-start', styles.listOut].join(' ')}>
                {/* 类型选择 */}
                <div className={[styles.control, 'flex-1', 'flex-col', 'flex-jst-start', 'flex-ali-start'].join(' ')}>
                  {
                    typeList.map((item, idx) => {
                      return (
                        <div className={[styles.typeButton, item.value === curType ? styles.typeCur : ''].join(' ')} key={idx} onClick={() => setType(item.value)}>{item.label}</div>
                      )
                    })
                  }
                </div>
                {/* 新闻列表 */}
                <div className={['flex-3', styles.listContainer, 'flex-col', 'flex-jst-start', 'flex-ali-start'].join(' ')}>
                  {
                    curList.map(item => {
                      return (
                        <div className={[styles.listItem, 'flex-col', 'flex-jst-start', 'flex-ali-start', 'full-width'].join(' ')} key={item.id}>
                          <p className={['font-bold', 'font-16', 'text-blk', styles.itemTit].join(' ')}>{item.title}</p>
                          <div className='full-width'>
                            <div dangerouslySetInnerHTML={{__html: item.content}}></div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className='flex-1 flex-row flex-jst-center flex-ali-start'>
                  <img src="/images/logo.png" alt="" style={{width: '40%'}} onClick={() => OPEN_KF_HANDLER()} className='cursor-pointer'/>
                </div>
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
  const data = await {
    banners:['https://www.flexiv.cn/cn/assets/solution/banner.png','https://www.flexiv.cn/cn/assets/home/card1.png','https://www.flexiv.cn/cn/assets/home/home1.jpg'],
  }
  const questions = await httpGet(urls.queryQuestions)
  return {
    props: {
      info: data,
      questions: questions.data
    }, // will be passed to the page component as props
  }
}