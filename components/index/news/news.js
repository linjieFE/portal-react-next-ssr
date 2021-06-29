import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import styles from './news.module.scss'
import Link from 'next/link'
import { filterNewsContent } from '../../../utils/utils'
import dayjs from 'dayjs'
const NewsModule = ({ gameList, newsList, ...props }) => {
  const [cur, setCur] = useState(0)
  const [hover, setHover] = useState(0)
  const router = useRouter()
  const newsDetailHandler = (id) => {
    router.push({
      pathname: '/news/[id]',
      query: { id: id }
    })
  }
  const linkPosition = useMemo(() => {
    return (cur + 0.5) * (100 / gameList.length)
  }, [cur, gameList])
  useEffect(() => {
    const interval = setInterval(() => {
      if (cur < (gameList.length - 1)) {
        setCur(current => current+1)
      } else {
        setCur(0)
      }
    }, 4000)
    return function () {
      clearInterval(interval)
    }
  }, [cur])
  const toproductCenter = () => {
    router.push({pathname: '/productCenter'})
  }
  return (
    <div className={[styles.contain, 'flex-row', 'flex-jst-btw', 'flex-ali-center', 'sm-screen-news'].join(' ')} style={{backgroundImage: `url(${gameList[cur].hot_background || gameList[cur].poster})`}}>
      {/* 左侧产品列表 */}
      <div className={[styles.leftCont, 'flex-col', 'flex-jst-start', 'flex-ali-start'].join(' ')}>
        <div className={styles.pin} style={{top: `calc(${linkPosition}%  - .1rem)`}}></div>
        {
          gameList.map((item, idx) => {
            return (
              <div className={[styles.leftItem, 'flex-row', 'full-width', 'flex-jst-start', 'flex-ali-center', 'cursor-pointer', idx === cur ? styles.curLeft: ''].join(' ')} key={idx}
              onClick={() => toproductCenter()}
              onMouseEnter={() => setCur(idx)}
              >
                <img src={item.logo} alt="" className={styles.logos}/>
                <div className={['flex-col', 'flex-jst-ard', 'flex-ali-start', 'self-stretch', styles.introCont].join(' ')}>
                  <p className={[styles.gameName, 'ellipis'].join(' ')}>{item.name}</p>
                  <p className={[styles.gameIntro, 'ellipis'].join(' ')}>{item.subtitle}</p>
                </div>
              </div>
            )
          })
        }
      </div>
      {/* 右侧新闻 */}
      <div className={[styles.rightCont]}>
        <div className={[styles.newsTitBar, 'flex-row', 'flex-jst-btw', 'flex-ali-center'].join(' ')}>
          <div className={[styles.newsLeft, 'flex-row', 'flex-jst-start', 'flex-ali-center'].join(' ')}>
            <div className={[styles.leftIcon]}></div>
            <div className={[styles.leftTit]}>新闻</div>
          </div>
          <Link href='/news'>
            <span className={[styles.more, 'cursor-pointer'].join(' ')}>更多</span>
          </Link>
        </div>
        {/* 新闻列表 */}
        <div className={[styles.newsContain]}>
          {
            newsList.map((item, idx) => {
              return (
                <div className={[styles.newsItem, hover === idx ? styles.activeNews : ''].join(' ')} key={item.id} onMouseEnter={() => setHover(idx)} onClick={() => newsDetailHandler(item.id)}>
                  <div className='flex-row flex-jst-btw flex-ali-center'>
                    <p className={styles.newsTit}>{item.title}</p>
                    <span className={styles.newsDate}>{dayjs(item.created_at).format('MM-DD')}</span>
                  </div>
                  <div className={styles.newsIntro}>{filterNewsContent(item.content, 50)}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default NewsModule