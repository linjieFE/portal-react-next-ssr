import React, { useRef, useState, useMemo } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import MainLayout from '../../layouts/mainLayout'
import { httpGet } from '../../service/http'
import { Carousel, Pagination } from 'antd';
import urls from '../../service/urls'
import styles from '../../styles/news.module.scss'
import dayjs from 'dayjs'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
export default function productCenter({ info, newsList, ...props }) {
  const swiperRef = useRef()
  const [cur, setCur] = useState(0) // swiper-index
  const [curPage, setPage] = useState(1) // page-index
  const [curType, setType] = useState(0) // newsType
  const curList = useMemo(() => {
    let total = []
    if (curType === 0) {
      total = newsList
    } else {
      total = newsList.filter(item => item.type === curType)
    }
    const start = 25 * (curPage - 1)
    const end = 25 * curPage
    return total.slice(start, end)
  }, [curType, curPage])
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
    { value: 0, label: '综合' },
    { value: 1, label: '新闻' },
    { value: 2, label: '公告' },
    { value: 3, label: '活动' }
  ]
  return (
    <div>
      <Head>
        <title>非夕-新闻中心</title>
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
                  <span className='font-18 text-red font-bold'>新闻中心</span>
                </div>
                {/* 标题 */}
                <div className={['flex-col', 'flex-jst-center', 'flex-ali-center', 'flex-2'].join(' ')}>
                  最新动态 
                </div>
                <div className='flex-1'></div>
              </div>
              {/* 列表部分 */}
              <div className={['flex-row', 'flex-jst-btw', 'flex-ali-start', styles.listOut].join(' ')}>
                {/* 类型选择 */}
                <div className={[styles.control]}>
                  {
                    typeList.map((item, idx) => {
                      return (
                        <div className={[styles.typeButton, idx === curType ? styles.typeCur : ''].join(' ')} key={idx} onClick={() => setType(idx)}>{item.label}</div>
                      )
                    })
                  }
                </div>
                {/* 新闻列表 */}
                <div className={['flex-2', styles.listContainer, 'flex-col', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  {
                    curList.map(item => {
                      return (
                        <div className={[styles.newsItem, 'flex-row', 'flex-jst-btw', 'flex-ali-center', 'full-width', 'cursor-pointer'].join(' ')} key={item.id}>
                          <Link href={`/news/${item.id}`}>
                            <div className='flex-row flex-jst-start flex-ali-center flex-1'>
                              <span className='ma-rt-02 text-danger font-14'>【{typeList.find(ele => ele.value === item.type).label}】</span>
                              <p className={['ellipis', 'font-16', styles.newsTitle].join(' ')}>{item.title}</p>
                            </div>
                          </Link>
                          <p className={['text-blk', 'font-16', styles.newsDate].join(' ')}>{dayjs(item.created_at).format('YYYY-MM-DD')}</p>
                        </div>
                      )
                    })
                  }
                  <div className='full-width flex-row flex-jst-center flex-ali-center cus-pagenation'>
                    <Pagination defaultPageSize={25} total={curList.length} current={curPage} onChange={(page, pageSize) => setPage(page)} showSizeChanger={false}></Pagination>
                  </div>
                </div>
                {/* side */}
                <div className={[styles.rightSide, 'flex-col', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <div className={styles.sideTit}>官方公众号</div>
                  <img src="/images/logo.png" alt="" className={styles.wxCode} />
                  <div className={styles.sideTit}>快速入口</div>
                  {
                    info.games.list.slice(0, 2).map(item => {
                      return (
                        <Link href='/productCenter' key={item.id}>
                          <div className={[styles.gameItem, 'flex-row', 'flex-jst-btw', 'flex-ali-center'].join(' ')}>
                            <div className='flex-row flex-jst-start flex-ali-center'>
                              <img src={item.logo} alt="" className={styles.pLogo} />
                              <div className='flex-col flex-jst-btw flex-ali-start self-stretch'>
                                <p className={styles.pName}>{item.name}</p>
                                <p className={styles.pIntro}>{item.subtitle}</p>
                                <div className={['flex-row', 'flex-jst-start', 'flex-ali-base', styles.pDate].join(' ')}>
                                  <i className='iconfont icon-time ma-rt-02'></i>
                                  <p>{dayjs(item.created_at).format('MM月DD日')}</p>
                                </div>
                              </div>
                            </div>
                            <i className={['iconfont', 'icon-right', styles.pArrow].join(' ')}></i>
                          </div>
                        </Link>
                      )
                    })
                  }
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
    games:{
      list: [
        {
          id: 9,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1561136709',
          is_hot: 0,
          is_publish: 1,
          created_at: '2021-04-20 18:30:19',
          update_at: null
        },
        {
          id: 8,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1561921656',
          is_hot: 0,
          is_publish: 1,
          created_at: '2021-03-25 18:38:23',
          update_at: '2021-04-20 17:29:43'
        },
        {
          id: 7,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1481456070',
          is_hot: 0,
          is_publish: 1,
          created_at: '2021-03-25 18:30:46',
          update_at: '2021-04-20 13:45:00'
        },
        {
          id: 6,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1459988269',
          is_hot: 0,
          is_publish: 1,
          created_at: '2021-03-25 17:09:59',
          update_at: '2021-04-20 17:31:17'
        },
        {
          id: 5,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1517970763',
          is_hot: 0,
          is_publish: 1,
          created_at: '2021-03-25 16:52:29',
          update_at: '2021-04-20 13:46:08'
        },
        {
          id: 4,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1551263818',
          is_hot: 1,
          is_publish: 1,
          created_at: '2021-03-24 17:31:48',
          update_at: '2021-04-20 17:28:59'
        },
        {
          id: 3,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1554998683',
          is_hot: 1,
          is_publish: 1,
          created_at: '2021-03-24 17:28:59',
          update_at: '2021-04-20 13:46:37'
        },
        {
          id: 2,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1551768868',
          is_hot: 1,
          is_publish: 1,
          created_at: '2021-03-24 17:26:22',
          update_at: '2021-04-20 17:25:57'
        },
        {
          id: 1,
          name: '拂晓',
          subtitle: '自适应机器人能够创造哪些价值',
          poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          hot_background: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
          introduction: '自适应机器人能够创造哪些价值',
          domain: 'https://apps.apple.com/cn/app/id1561916878',
          is_hot: 1,
          is_publish: 1,
          created_at: '2021-03-24 17:22:08',
          update_at: '2021-04-20 17:24:18'
        }
      ],
      total: 9
    }
  }
  // const newsRes = await httpGet(urls.queryNewsList)
  const newsList = [
    {
      id: 5,
      title: 'flexiv',
      content: '<p>自适应机器人能够创造哪些价值</p>',
      type: 1,
      created_at: '2021-03-25 14:54:52',
      updated_at: '2021-04-29 10:45:20'
    },
    {
      id: 4,
      title: 'flexiv',
      content: 
        '<p>自适应机器人能够创造哪些价值</p>\n' +
        '<p>本次更新内容如下</p>',
      type: 2,
      created_at: '2021-03-25 10:23:48',
      updated_at: '2021-03-25 19:08:27'
    },
    {
      id: 3,
      title: 'flexiv',
      content: '<p>自适应机器人能够创造哪些价值</p>\n' +
        '<p>自适应机器人能够创造哪些价值</p>\n' +
        '<p>感谢各位的谅解！祝您产品愉快！</p>\n' +
        '<p>涉及区服：535-538</p>',
      type: 2,
      created_at: '2021-03-25 10:19:04',
      updated_at: '2021-04-20 21:42:36'
    },
    {
      id: 2,
      title: 'flexiv',
      content: `<p><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;"><img style="display: block; margin-left: auto; margin-right: auto;" src="http://img.web.8xgame.cn/news/6ea1e2e799f8c76bce526b565d505bd8.gif" alt="" width="400" height="388" /><br /></span></p>\n` +
        `<p style="text-align: center;"><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;">虽然炎热的天气并没有走开</span></p>\n` +
        `<p style="text-align: center;"><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;">夏天的美好幻想依然浮现在脑海中～</span></p>\n` +
        `<p style="text-align: center;"><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;">比如大海、沙滩、泳装、美女......</span></p>`,
      type: 3,
      created_at: '2021-03-24 16:49:26',
      updated_at: '2021-04-20 21:44:53'
    },
    {
      id: 1,
      title: 'flexiv',
      content: '<p>自适应机器人能够创造哪些价值</p>\n' +
        '<p>自适应机器人能够创造哪些价值</p>\n' +
        '<p>感谢各位的谅解！祝您产品愉快！</p>',
      type: 1,
      created_at: '2021-03-24 16:22:48',
      updated_at: null
    }
  ]
  return {
    props: {
      info: data,
      newsList: newsList//newsRes.data.list
    }, // will be passed to the page component as props
  }
}