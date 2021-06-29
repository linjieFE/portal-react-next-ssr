import React, { useRef, useState, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { httpGet } from '../../service/http'
import urls from '../../service/urls'
import MainLayout from '../../layouts/mainLayout'
import { Carousel } from 'antd';
import styles from '../../styles/newsDetail.module.scss'
import SideSwiper from '../../components/newsList/sideSwiper'
import Link from 'next/link'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
export default function Detail({ news, info, newsList, ...props }) {
  const swiperRef = useRef()
  const [cur, setCur] = useState(0) // swiper-index
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
  const hotList = useMemo(() => {
    return newsList.slice(0, 5)
  }, [newsList])
  const typeList = [
    { value: 0, label: '综合' },
    { value: 1, label: '新闻' },
    { value: 2, label: '公告' },
    { value: 3, label: '活动' }
  ]
  return (
    <div>
      <Head>
        <title>{news.title}</title>
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
            <Carousel effect="slide" dots={false} autoplay={true} ref={swiperRef} beforeChange={(from, to) => setChangeDot(from, to)}>
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
            <div className={[styles.contentContainer, 'flex-row', 'flex-jst-btw', 'flex-ali-start'].join(' ')}>
              {/* 新闻详情 */}
              <div className={['flex-1', styles.leftSide].join(' ')}>
                {/* 面包屑导航 */}
                <div className={[styles.bread, 'flex-row', 'flex-jst-start', 'flex-ali-base', 'flex-1'].join(' ')}>
                  <div className='self-stretch title-prefix ma-rt-2'></div>
                  <Link href='/'>
                    <span className='title-font font-18 text-normal ma-rt-1 cursor-pointer font-bold'>首页</span>
                  </Link>
                  <span className='font-18 text-normal ma-rt-1'>{'>>'}</span>
                  <Link href='/news'>
                    <span className='font-18 text-red font-bold cursor-pointer'>新闻中心</span>
                  </Link>
                </div>
                {/* 新闻标题 */}
                <div className={['flex-row', 'flex-jst-center', 'flex-ali-center', 'title-font', 'font-30', styles.newsTitle].join(' ')}>{news.title}</div>
                {/* 新闻内容 */}
                <div dangerouslySetInnerHTML={{ __html: news.content }} className={styles.detailContainer}></div>
                {/* 上下篇链接 */}
                <div className={styles.eitherLink}>
                  <div className={[styles.linkItem, 'font-14', 'text-blk', 'flex-row', 'flex-jst-start', 'flex-ali-center', 'cursor-pointer'].join(' ')}>
                    <span>上一篇：</span>
                    {
                      news.prevNews ?
                        (
                          <Link href={`/news/${news.prevNews.id}`}>
                            <div className={['flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                              <span className='ma-rt-02'>[{typeList.find(item => item.value === news.prevNews.type).label}]</span>
                              <p className='ellipis flex-1'>{news.prevNews.title}</p>
                            </div>
                          </Link>
                        ) : '无'
                    }
                  </div>
                  <div className={[styles.linkItem, 'font-14', 'text-blk', 'flex-row', 'flex-jst-start', 'flex-ali-center', 'cursor-pointer'].join(' ')}>
                    <span>下一篇：</span>
                    {
                      news.nextNews ?
                        (
                          <Link href={`/news/${news.nextNews.id}`}>
                            <div className={['flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                              <span className='ma-rt-02'>[{typeList.find(item => item.value === news.nextNews.type).label}]</span>
                              <p className='ellipis flex-1'>{news.nextNews.title}</p>
                            </div>
                          </Link>
                        ) : '无'
                    }
                  </div>
                </div>
              </div>
              {/* 右侧内容 */}
              <div className={[styles.rightSide]}>
                <div className={[styles.titBar, 'flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <div className='self-stretch title-prefix ma-rt-2'></div>
                  <div className='font-18 text-red font-bold letter-space-05'>近期热点</div>
                </div>
                {/* 右侧轮播 */}
                <SideSwiper gameList={info.games.list}></SideSwiper>
                <div className={[styles.titBar, 'flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
                  <div className='self-stretch title-prefix ma-rt-2'></div>
                  <div className='font-18 text-red font-bold letter-space-05'>热门资讯</div>
                </div>
                {/* 右侧新闻 */}
                {
                  hotList.map(item => {
                    return (
                      <Link href={`/news/${item.id}`} key={item.id}>
                        <div className={['flex-row', 'flex-jst-start', 'flex-ali-center', 'font-14', 'text-blk', styles.newsItem].join(' ')}>
                          <span className='ma-rt-02'>【资讯】</span>
                          <p className='flex-1 ellipis' style={{maxWidth: '80%', overflow: 'hidden'}}>{item.title}</p>
                        </div>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  )
}

export async function getStaticProps(params) {
  const newsId = params.params.id
  // const newsList = await httpGet(urls.queryNewsList)
  const apiNewlist =[
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
  // const { data } = await httpGet(urls.newsDetail, { id: newsId }) // detail
  const data={
    id: 2,
    title: 'flexiv！',
    content: `<p><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;"><img style="display: block; margin-left: auto; margin-right: auto;" src="http://img.web.8xgame.cn/news/6ea1e2e799f8c76bce526b565d505bd8.gif" alt="" width="400" height="388" /><br /></span></p>\n` +
      `<p style="text-align: center;"><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;">虽然立秋，但是炎热的天气并没有走开</span></p>\n` +
      `<p style="text-align: center;"><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;">夏天的美好幻想依然浮现在脑海中～</span></p>\n` +
      `<p style="text-align: center;"><span style="background-color: #ffffff; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 14px; letter-spacing: 1.5px; text-align: justify;">比如大海、沙滩、泳装、美女......</span></p>\n` +
      '<p style="text-align: center;">flexiv！</p>\n' +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;">言归正传</span></p>\n` +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;">回到现实你会发现<br style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;" /></span></p>\n` +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;">陪伴你的只有太阳公公和嘤嘤嘤的蚊子</span></p>\n` +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;">然而</span></p>\n` +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;">马上要到七夕了</span></p>\n` +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;">少年</span></p>\n` +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;">你是否还在单身？</span></p>\n` +
      `<p style="margin: 0px; padding: 0px; max-width: 100%; clear: both; min-height: 1em; color: #333333; font-family: -apple-system, system-ui, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 17px; letter-spacing: 0.544px; background-color: #ffffff; text-align: center; box-sizing: border-box !important; overflow-wrap: break-word !important; word-break: break-all !important;"><span style="margin: 0px; padding: 0px; max-width: 100%; box-sizing: border-box !important; overflow-wrap: break-word !important; font-size: 14px; word-break: break-all !important;"><img src="http://img.web.8xgame.cn/news/eb4db6c3f01e6d0e6e37486ac13d893f.gif" alt="" width="300" height="300" /></span></p>`,
    type: 3,
    created_at: '2021-03-24 16:49:26',
    updated_at: '2021-04-20 21:44:53'
  }
  // const allInfo = await httpGet(urls.queryIndex)
  const allInfo = await {
    data:{
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
  }
  // const apiNewlist = newsList.data.list
  const target = apiNewlist.find(item => item.id === data.id)
  const num = apiNewlist.indexOf(target)
  data.prevNews = num === 0 ? null : apiNewlist[num - 1]
  data.nextNews = num === apiNewlist.length - 1 ? null : apiNewlist[num + 1]
  return {
    props: {
      news: data,
      info: allInfo.data,
      newsList: apiNewlist
    }, // will be passed to the page component as props
  }
}

export async function getStaticPaths() {
  // 调用外部 API 获取博文列表
  const newsRes = await httpGet(urls.queryNewsList)
  // 根据博文列表生成所有需要预渲染的路径
  const paths = newsRes.data.list.map((item) => `/news/${item.id}`)
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}