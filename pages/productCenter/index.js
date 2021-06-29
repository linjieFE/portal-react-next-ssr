import React, { useRef, useState } from 'react'
import Head from 'next/head'
import MainLayout from '../../layouts/mainLayout'
import { httpGet } from '../../service/http'
import { Carousel } from 'antd';
import urls from '../../service/urls'
import styles from '../../styles/productCenter.module.scss'
import CenterContainer from '../../components/productCenter/centerContainer/centerContainer.js'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
export default function productCenter({ info, ...props }) {
  const swiperRef = useRef()
  const [cur, setCur] = useState(0)
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
  return (
    <div>
      <Head>
        <title>非夕-产品中心</title>
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
            <CenterContainer gameList={info.games.list} packages={info.packages}></CenterContainer>
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
    packages: [
      {
        id: 9,
        game_id: 9,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn/',
        android_link: null,
        switch: 1,
        created_at: '2021-04-20 18:31:38',
        updated_at: null
      },
      {
        id: 8,
        game_id: 8,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn/cn/',
        android_link: null,
        switch: 1,
        created_at: '2021-03-25 18:39:27',
        updated_at: '2021-04-20 17:30:44'
      },
      {
        id: 7,
        game_id: 7,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn/',
        android_link: null,
        switch: 1,
        created_at: '2021-03-25 18:33:29',
        updated_at: null
      },
      {
        id: 6,
        game_id: 6,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn/',
        android_link: null,
        switch: 1,
        created_at: '2021-03-25 17:11:56',
        updated_at: null
      },
      {
        id: 5,
        game_id: 5,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn/',
        android_link: null,
        switch: 1,
        created_at: '2021-03-25 16:58:30',
        updated_at: null
      },
      {
        id: 4,
        game_id: 2,
        package_name: '女武神降临-魔幻卡牌养成手游',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn/',
        android_link: null,
        switch: 1,
        created_at: '2021-03-24 17:51:26',
        updated_at: '2021-03-24 18:54:06'
      },
      {
        id: 3,
        game_id: 3,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn',
        android_link: null,
        switch: 1,
        created_at: '2021-03-24 17:50:21',
        updated_at: '2021-03-24 18:53:09'
      },
      {
        id: 2,
        game_id: 4,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn',
        android_link: null,
        switch: 1,
        created_at: '2021-03-24 17:48:23',
        updated_at: '2021-04-20 17:29:17'
      },
      {
        id: 1,
        game_id: 1,
        package_name: 'flexiv',
        poster: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        logo: 'https://www.flexiv.cn/cn/assets/home/home1.jpg',
        description: 'flexiv-flexiv',
        download_link: 'https://www.flexiv.cn',
        android_link: null,
        switch: 1,
        created_at: '2021-03-24 17:46:28',
        updated_at: '2021-04-20 17:25:36'
      }
    ],
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
  };
  data.packages.forEach(item => {
    item.gameName = data.games.list.find(ele => ele.id === item.game_id) ? data.games.list.find(ele => ele.id === item.game_id).name : ''
  })
  return {
    props: {
      info: data
    }, // will be passed to the page component as props
  }
}